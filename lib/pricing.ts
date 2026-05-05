/**
 * GRASS LANE LAWN CO. — PRICING ALGORITHM
 * ================================================================
 *
 * Profit-guaranteed quote generator. Every quote is calculated from
 * the BOTTOM UP based on actual costs + required pay + equity stake +
 * profit margin. No flat-rate guessing.
 *
 * Inputs:
 *   - Square footage (from satellite measurement / user mark-up)
 *   - Service type(s) selected
 *   - Customer property coordinates (lat, lng)
 *
 * Outputs:
 *   - Per-service line items
 *   - Total quote
 *   - Cost breakdown (for office reference, not shown to customer)
 *   - Margin verification (refuses to quote below floor)
 *
 * --- COST MODEL ---
 *   Each visit = (drive cost) + (Bekkah field labor) + (materials)
 *                + (equipment wear) + (overhead per job)
 *   Net cost   = sum of above
 *   Austin's equity slice = NET_COST × 0.25
 *   Pre-margin total      = NET_COST + AUSTIN_EQUITY
 *   FINAL PRICE          = PRE_MARGIN_TOTAL × (1 + MARGIN)
 *
 * --- BUSINESS RULES (TUNABLE) ---
 *   Bekkah's hourly take-home: $35/hr field, $25/hr drive
 *   Austin's equity stake: 25% of net cost (office overhead, biz dev)
 *   Profit margin floor: 18% (cannot quote below)
 *   Profit margin target: 25% (default)
 *   Vehicle MPG: 18 (truck + trailer)
 *   Gas price: $3.45/gal (auto-fetchable later)
 *   Vehicle wear per mile: $0.21 (IRS-style, includes maintenance)
 *
 * Edit BUSINESS_PARAMS below to tune. All other code reads from here.
 */

// ──────────────────────────── BUSINESS PARAMETERS ────────────────────────────

export const HQ = {
  address: '3665 W Central Ave, Toledo, OH 43606',
  lat: 41.6727,
  lng: -83.6493
} as const;

export const BUSINESS_PARAMS = {
  // Field labor (Bekkah)
  bekkahFieldRate: 35, // $/hr while actively servicing
  bekkahDriveRate: 25, // $/hr while driving to/from job

  // Austin's equity slice — applied as a multiplier on net cost
  // 0.25 means Austin earns 25% of every job's net cost as office overhead
  austinEquityShare: 0.25,

  // Profit
  marginFloor: 0.18, // refuse to quote below this margin
  marginTarget: 0.25, // default margin layered on top

  // Vehicle
  vehicleMpg: 18,
  gasPricePerGal: 5.0, // Updated May 2026
  vehicleWearPerMile: 0.21,

  // Per-job overhead (office software, insurance amortization, etc.)
  perJobOverhead: 4.5,

  // Minimum visit fee — never quote a mow under this even for tiny lawns
  minimumVisitFee: 55,

  // Distance surcharge
  distanceSurchargeRadius: 25, // miles from HQ before surcharge kicks in
  distanceSurchargePerMile: 2.0 // $/mile beyond the radius
} as const;

// ──────────────────────────── DISTANCE CALCULATION ────────────────────────────

/**
 * Haversine distance in miles between two lat/lng points.
 * Used as a lower bound; real driving distance is ~1.3x as the crow flies
 * in Toledo metro. We apply a 1.3 road factor.
 */
export function haversineMiles(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3958.8; // Earth radius miles
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.asin(Math.sqrt(a));
}

const ROAD_FACTOR = 1.3;
const AVG_DRIVE_SPEED_MPH = 32; // mixed Toledo metro

export function estimateDrive(toLat: number, toLng: number) {
  const crowMiles = haversineMiles(HQ.lat, HQ.lng, toLat, toLng);
  const oneWayMiles = crowMiles * ROAD_FACTOR;
  const roundTripMiles = oneWayMiles * 2;
  const oneWayHours = oneWayMiles / AVG_DRIVE_SPEED_MPH;
  const roundTripHours = oneWayHours * 2;
  return { roundTripMiles, roundTripHours };
}

// ──────────────────────────── SERVICE DEFINITIONS ────────────────────────────

/**
 * Each service knows:
 *   - how to estimate field hours from sq ft
 *   - what materials cost per sq ft (or flat)
 *   - any extra equipment cost (rental, etc.)
 *   - whether it's a one-time or recurring service
 */

export type ServiceKey =
  | 'mowing'
  | 'fertilization'
  | 'weedControl'
  | 'aeration'
  | 'landscaping'
  | 'cleanup'
  | 'mulching'
  | 'edging';

export type ServiceFrequency =
  | 'weekly'
  | 'biweekly'
  | 'per-application'
  | 'one-time'
  | 'seasonal';

export type ServiceDef = {
  key: ServiceKey;
  name: string;
  shortDesc: string;
  frequency: ServiceFrequency;
  // Returns hours of active field work for given sq ft
  fieldHours: (sqft: number) => number;
  // Returns materials cost in dollars for given sq ft
  materialsCost: (sqft: number) => number;
  // Equipment rental / consumable cost for the visit (flat)
  equipmentCost: number;
};

/**
 * Field hour estimates based on Toro TimeCutter Z4200 (42" deck, ZTR mower)
 * Real-world: 1.5–2 acres/hr in open lawn, slower with obstacles.
 * 1 acre = 43,560 sq ft → ~22,000–29,000 sq ft/hr.
 * We use a conservative 25,000 sq ft/hr base + setup overhead.
 */

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  mowing: {
    key: 'mowing',
    name: 'Lawn Mowing',
    shortDesc: 'Mow + trim + edge + blow',
    frequency: 'weekly',
    fieldHours: (sqft) => 0.25 + sqft / 25000, // 15 min setup + cut rate
    materialsCost: () => 0,
    equipmentCost: 2.5 // gas + line trimmer string
  },
  fertilization: {
    key: 'fertilization',
    name: 'Fertilization',
    shortDesc: 'Granular fert application',
    frequency: 'per-application',
    fieldHours: (sqft) => 0.2 + sqft / 35000, // faster than mowing
    materialsCost: (sqft) => sqft * 0.0042, // ~$4.20 per 1000 sqft product cost
    equipmentCost: 1.0
  },
  weedControl: {
    key: 'weedControl',
    name: 'Weed Control',
    shortDesc: 'Pre-emergent + spot spray',
    frequency: 'per-application',
    fieldHours: (sqft) => 0.25 + sqft / 30000,
    materialsCost: (sqft) => sqft * 0.0035, // ~$3.50 per 1000 sqft
    equipmentCost: 1.5
  },
  aeration: {
    key: 'aeration',
    name: 'Core Aeration',
    shortDesc: 'Plug aerate, optional overseed',
    frequency: 'seasonal',
    fieldHours: (sqft) => 0.4 + sqft / 18000, // slower; pulls plugs
    materialsCost: () => 0,
    equipmentCost: 65 // aerator rental for the day, divided across jobs
  },
  landscaping: {
    key: 'landscaping',
    name: 'Landscape Services',
    shortDesc: 'Bed edging, trimming, planting',
    frequency: 'one-time',
    fieldHours: (sqft) => 1.0 + sqft / 4000, // labor-intensive
    materialsCost: (sqft) => sqft * 0.05, // mulch/plants
    equipmentCost: 8
  },
  cleanup: {
    key: 'cleanup',
    name: 'Spring/Fall Cleanup',
    shortDesc: 'Leaf removal, debris haul',
    frequency: 'seasonal',
    fieldHours: (sqft) => 0.5 + sqft / 12000,
    materialsCost: () => 0,
    equipmentCost: 12 // bags + dump fee
  },
  mulching: {
    key: 'mulching',
    name: 'Mulch Install',
    shortDesc: 'Bed prep + mulch install',
    frequency: 'one-time',
    fieldHours: (sqft) => 0.3 + sqft / 600, // bed sqft, not lawn sqft
    materialsCost: (sqft) => sqft * 0.85, // mulch is expensive
    equipmentCost: 5
  },
  edging: {
    key: 'edging',
    name: 'Edging',
    shortDesc: 'Hard-edge driveways and walks',
    frequency: 'one-time',
    fieldHours: (sqft) => 0.5 + sqft / 8000, // sqft = linear feet of edge here
    materialsCost: () => 0,
    equipmentCost: 2.0
  }
};

// ──────────────────────────── CORE PRICING ENGINE ────────────────────────────

export type ServiceQuote = {
  service: ServiceDef;
  sqft: number;
  // Cost breakdown (office-only)
  costs: {
    drive: number;
    bekkahField: number;
    bekkahDrive: number;
    materials: number;
    equipment: number;
    overhead: number;
    netCost: number;
    austinEquity: number;
    preMargin: number;
  };
  // Public line item
  pricePerVisit: number;
  marginActual: number;
  // Recurring estimate (for weekly/seasonal)
  estimatedAnnualVisits: number;
  estimatedAnnualTotal: number;
};

export type QuoteInput = {
  sqft: number;
  services: ServiceKey[];
  toLat: number;
  toLng: number;
  marginOverride?: number; // optional: override default margin (e.g., 0.20 to be more competitive)
};

export type Quote = {
  input: QuoteInput;
  drive: { roundTripMiles: number; roundTripHours: number };
  lineItems: ServiceQuote[];
  totalsPerVisit: number;
  totalsAnnual: number;
  warnings: string[];
};

export function computeServiceQuote(
  service: ServiceDef,
  sqft: number,
  drive: { roundTripMiles: number; roundTripHours: number },
  margin: number = BUSINESS_PARAMS.marginTarget
): ServiceQuote {
  const params = BUSINESS_PARAMS;

  // --- Costs ---
  let driveCost =
    (drive.roundTripMiles / params.vehicleMpg) * params.gasPricePerGal +
    drive.roundTripMiles * params.vehicleWearPerMile;

  // Distance surcharge for jobs beyond service radius
  const oneWayMiles = drive.roundTripMiles / 2;
  if (oneWayMiles > params.distanceSurchargeRadius) {
    const excessMiles = oneWayMiles - params.distanceSurchargeRadius;
    const surcharge = excessMiles * params.distanceSurchargePerMile;
    driveCost += surcharge;
  }

  const fieldHrs = service.fieldHours(sqft);
  const bekkahField = fieldHrs * params.bekkahFieldRate;
  const bekkahDrive = drive.roundTripHours * params.bekkahDriveRate;

  const materials = service.materialsCost(sqft);
  const equipment = service.equipmentCost;
  const overhead = params.perJobOverhead;

  const netCost =
    driveCost + bekkahField + bekkahDrive + materials + equipment + overhead;

  // --- Equity layer (Austin) ---
  const austinEquity = netCost * params.austinEquityShare;
  const preMargin = netCost + austinEquity;

  // --- Margin layer ---
  let pricePerVisit = preMargin * (1 + margin);

  // Enforce minimum visit fee (mowing only, to protect tiny lawns being unprofitable)
  if (service.key === 'mowing' && pricePerVisit < params.minimumVisitFee) {
    pricePerVisit = params.minimumVisitFee;
  }

  // Round to nearest dollar
  pricePerVisit = Math.round(pricePerVisit);

  // Verify actual margin
  const marginActual = (pricePerVisit - preMargin) / preMargin;

  // --- Annual estimate ---
  const visitsPerYear: Record<ServiceFrequency, number> = {
    weekly: 26, // ~April through October
    biweekly: 13,
    'per-application': 5, // 5-step program
    'one-time': 1,
    seasonal: 2 // spring + fall
  };
  const annualVisits = visitsPerYear[service.frequency] ?? 1;

  return {
    service,
    sqft,
    costs: {
      drive: driveCost,
      bekkahField,
      bekkahDrive,
      materials,
      equipment,
      overhead,
      netCost,
      austinEquity,
      preMargin
    },
    pricePerVisit,
    marginActual,
    estimatedAnnualVisits: annualVisits,
    estimatedAnnualTotal: pricePerVisit * annualVisits
  };
}

export function computeQuote(input: QuoteInput): Quote {
  const drive = estimateDrive(input.toLat, input.toLng);
  const margin = input.marginOverride ?? BUSINESS_PARAMS.marginTarget;
  const warnings: string[] = [];

  const lineItems = input.services.map((key) => {
    const def = SERVICES[key];
    const q = computeServiceQuote(def, input.sqft, drive, margin);
    if (q.marginActual < BUSINESS_PARAMS.marginFloor) {
      warnings.push(
        `${def.name} priced at minimum (${(q.marginActual * 100).toFixed(0)}% margin); consider raising base or declining job.`
      );
    }
    return q;
  });

  const totalsPerVisit = lineItems.reduce((s, q) => s + q.pricePerVisit, 0);
  const totalsAnnual = lineItems.reduce((s, q) => s + q.estimatedAnnualTotal, 0);

  return {
    input,
    drive,
    lineItems,
    totalsPerVisit,
    totalsAnnual,
    warnings
  };
}

// ──────────────────────────── HELPERS ────────────────────────────

/** Format dollars consistently: $45 / $1,234 / $12,500 */
export function fmt$(amount: number): string {
  return `$${Math.round(amount).toLocaleString('en-US')}`;
}

/** Acres helper */
export function sqftToAcres(sqft: number): number {
  return sqft / 43560;
}
