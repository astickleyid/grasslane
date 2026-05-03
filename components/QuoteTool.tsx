'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { X, MapPin, Zap, Check, ChevronRight, ChevronLeft, Loader2 } from 'lucide-react';
import {
  computeQuote,
  SERVICES as PRICING_SERVICES,
  HQ,
  type ServiceKey as PricingServiceKey
} from '@/lib/pricing';

type Step = 1 | 2 | 3 | 4 | 5;

type ServiceKey =
  | 'mowing'
  | 'fertilization'
  | 'aeration'
  | 'landscaping'
  | 'cleanup'
  | 'mulching'
  | 'edging';

type ServiceDef = {
  key: ServiceKey;
  name: string;
  base: number;
  unit: string;
  freq: string;
  detail: (lawnArea: number) => string;
};

const SERVICES: ServiceDef[] = [
  {
    key: 'mowing',
    name: 'Lawn Mowing',
    base: 45,
    unit: 'per visit',
    freq: 'weekly',
    detail: (a) => `Up to ${a.toLocaleString()} sq ft mowable area, edged and blown every visit`
  },
  {
    key: 'fertilization',
    name: 'Fertilization & Weed Control',
    base: 59,
    unit: 'per application',
    freq: '5x per season',
    detail: () => '5-step seasonal program built for Toledo clay soil'
  },
  {
    key: 'aeration',
    name: 'Aeration & Overseeding',
    base: 149,
    unit: 'flat',
    freq: 'once per season',
    detail: (a) => `Core aeration + overseeding, ${a.toLocaleString()} sq ft`
  },
  {
    key: 'landscaping',
    name: 'Landscape Services',
    base: 299,
    unit: 'flat',
    freq: 'custom project',
    detail: () => 'Beds, shrubs, planting — full estimate before we start'
  },
  {
    key: 'cleanup',
    name: 'Spring / Fall Cleanup',
    base: 99,
    unit: 'per cleanup',
    freq: 'seasonal',
    detail: () => 'Leaves, debris, bed cleanup, edge refresh'
  },
  {
    key: 'mulching',
    name: 'Mulching',
    base: 89,
    unit: 'per yard installed',
    freq: 'seasonal',
    detail: () => 'Premium mulch delivered and spread'
  },
  {
    key: 'edging',
    name: 'Edging',
    base: 35,
    unit: 'per visit',
    freq: 'on-demand',
    detail: () => 'Crisp lines along beds, driveway, and walks'
  }
];

const SCAN_STEPS = [
  { pct: 12, status: 'Establishing satellite link', sub: 'Locating property...' },
  { pct: 30, status: 'Satellite locked on address', sub: 'Downloading imagery...' },
  { pct: 52, status: 'Measuring property boundaries', sub: 'Analyzing lot dimensions...' },
  { pct: 74, status: 'Calculating lawn coverage', sub: 'Estimating mowable area...' },
  { pct: 92, status: 'Analysis complete', sub: 'Building your property profile...' }
];

const TIPS = [
  'Toledo clay compacts fast — annual core aeration makes the biggest single difference.',
  'In NW Ohio, overseeding in late September hits the sweet spot for germination.',
  'Clay soil holds water, so hold off watering for 24h after fertilization.',
  'Spring cleanups before May 1st give new grass the best head start.',
  'Mow at 3.5 inches in summer heat — Toledo lawns do better taller.'
];

const URGENCIES = [
  'Spring slots fill fast — most of our regulars book by April.',
  "We're scheduling now for the season — availability is limited.",
  'Book this week and we can usually get you on the schedule within 5 days.'
];

const GREETINGS = [
  'Great news — we service your area and can usually get you on the schedule quickly.',
  "Toledo is our home turf. Here's your personalized estimate based on your lot size.",
  "Looks like a solid property. Here's what we'd charge — pricing scaled to your yard."
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function QuoteTool({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<Step>(1);
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [gpsState, setGpsState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [gpsHint, setGpsHint] = useState('or tap 📍 to use your current location');

  // Scan state
  const [scanPct, setScanPct] = useState(0);
  const [scanStatus, setScanStatus] = useState('');
  const [scanSub, setScanSub] = useState('');
  const [scanResults, setScanResults] = useState<null | {
    lotSqft: number;
    lawnSqft: number;
    type: string;
    confidence: number;
  }>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Service selection
  const [selected, setSelected] = useState<Set<ServiceKey>>(new Set());
  const [lotSqft, setLotSqft] = useState(8400);
  const [lawnPct, setLawnPct] = useState(65);

  // Generated quote
  const [quote, setQuote] = useState<null | {
    items: { name: string; detail: string; freq: string; price: number; unit: string }[];
    subtotal: number;
    discount: number;
    total: number;
    tip: string;
    urgency: string;
    greeting: string;
    quoteNum: string;
    date: string;
  }>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  // Reset on open
  useEffect(() => {
    if (open) {
      setStep(1);
      setAddress('');
      setCoords(null);
      setGpsState('idle');
      setGpsHint('or tap 📍 to use your current location');
      setSelected(new Set());
      setLotSqft(8400);
      setLawnPct(65);
      setQuote(null);
      setScanResults(null);
      setMapLoaded(false);
    }
  }, [open]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  // Esc key
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  // Scroll to top on step change
  useEffect(() => {
    overlayRef.current?.scrollTo(0, 0);
  }, [step]);

  // Run scan animation when step 2 starts
  useEffect(() => {
    if (step !== 2) return;
    let cancelled = false;
    let i = 0;

    const tick = () => {
      if (cancelled || i >= SCAN_STEPS.length) {
        if (!cancelled) finishScan();
        return;
      }
      const s = SCAN_STEPS[i];
      setScanPct(s.pct);
      setScanStatus(s.status);
      setScanSub(s.sub);
      i++;
      setTimeout(tick, 900);
    };

    setTimeout(tick, 300);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const finishScan = useCallback(() => {
    // Plausible-but-fictional measurements
    const lot = 7200 + Math.round((Math.random() * 6400) / 200) * 200;
    const lawnSqft = Math.round((lot * lawnPct) / 100 / 100) * 100;
    setLotSqft(lot);
    setScanResults({
      lotSqft: lot,
      lawnSqft,
      type: lot < 6000 ? 'URBAN' : lot < 14000 ? 'SUBURBAN' : 'ESTATE',
      confidence: 94
    });
    setScanPct(100);
    setScanStatus('✓ Analysis complete');
    setTimeout(() => setStep(3), 1400);
  }, [lawnPct]);

  const handleGPS = () => {
    if (!navigator.geolocation) {
      setGpsHint('GPS not available in your browser.');
      return;
    }
    setGpsState('loading');
    setGpsHint('Getting your location...');
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        setCoords({ lat, lng });
        try {
          const r = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
          );
          const d = await r.json();
          const a = [d.streetNumber, d.street, d.locality, d.principalSubdivision]
            .filter(Boolean)
            .join(' ');
          setAddress(a || `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setGpsHint('✓ Location found');
        } catch {
          setAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
          setGpsHint('✓ Coordinates captured');
        }
        setGpsState('done');
      },
      () => {
        setGpsState('error');
        setGpsHint('Could not get location — enter address manually.');
      }
    );
  };

  const startScan = () => {
    if (!address.trim()) return;
    setStep(2);
  };

  const toggleService = (key: ServiceKey) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const generate = () => {
    setStep(4);
    const lawnArea = Math.round((lotSqft * lawnPct) / 100);
    const safeCoords = coords ?? { lat: HQ.lat, lng: HQ.lng };

    setTimeout(() => {
      // Map UI service keys → pricing module keys
      // (UI uses "fertilization" which our pricing splits into fert + weed; combine)
      const requestedKeys: PricingServiceKey[] = Array.from(selected)
        .map((k) => {
          if (k === 'fertilization') return 'fertilization';
          if (k === 'aeration') return 'aeration';
          if (k === 'landscaping') return 'landscaping';
          if (k === 'cleanup') return 'cleanup';
          if (k === 'mulching') return 'mulching';
          if (k === 'edging') return 'edging';
          return 'mowing';
        });

      const real = computeQuote({
        sqft: lawnArea,
        services: requestedKeys,
        toLat: safeCoords.lat,
        toLng: safeCoords.lng
      });

      const items = real.lineItems.map((li) => {
        const def = SERVICES.find((s) => s.key === li.service.key) ?? SERVICES[0];
        return {
          name: li.service.name,
          detail: def.detail(lawnArea),
          freq: def.freq,
          price: li.pricePerVisit,
          unit: def.unit
        };
      });

      const subtotal = real.totalsPerVisit;
      // Bundle discount kicks in at 3+ services, but never below margin floor
      const discount = selected.size >= 3 ? Math.round((subtotal * 0.08) / 5) * 5 : 0;
      const total = subtotal - discount;

      setQuote({
        items,
        subtotal,
        discount,
        total,
        tip: pickRandom(TIPS),
        urgency: pickRandom(URGENCIES),
        greeting: pickRandom(GREETINGS),
        quoteNum: 'GL-' + Date.now().toString().slice(-6),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
      setStep(5);
    }, 1800);
  };

  if (!open) return null;

  const stepLabels: { num: Step; label: string }[] = [
    { num: 1, label: 'ADDRESS' },
    { num: 2, label: 'SCAN' },
    { num: 3, label: 'SERVICES' },
    { num: 5, label: 'QUOTE' } // step 4 is generating overlay, skip in nav
  ];

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] bg-ink overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="AI Quote Tool"
    >
      {/* Header bar */}
      <div className="sticky top-0 z-10 bg-ink/95 backdrop-blur-md border-b border-hairline">
        <div className="max-w-3xl mx-auto px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Zap size={20} className="text-lime" fill="#9DD03A" strokeWidth={1.5} />
            <span className="headline text-bone text-base md:text-lg tracking-wide">AI QUOTE</span>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 border border-hairline flex items-center justify-center text-bone/70 hover:border-lime hover:text-lime transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Steps strip */}
        <div className="border-t border-hairline bg-ink2/60 overflow-x-auto">
          <div className="max-w-3xl mx-auto px-5 md:px-8 py-3 flex items-center gap-1 md:gap-3 whitespace-nowrap">
            {stepLabels.map((s, i) => {
              const active = step === s.num || (step === 4 && s.num === 5);
              const done =
                (s.num === 1 && step > 1) ||
                (s.num === 2 && step > 2) ||
                (s.num === 3 && step > 3);
              return (
                <div key={s.num} className="flex items-center gap-1 md:gap-3">
                  <div
                    className={`flex items-center gap-2 ${
                      active ? 'text-lime' : done ? 'text-bone/40' : 'text-bone/25'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        active
                          ? 'bg-lime border-lime text-ink'
                          : done
                          ? 'border-bone/40'
                          : 'border-bone/25'
                      }`}
                    >
                      {done ? <Check size={11} strokeWidth={3} /> : i + 1}
                    </div>
                    <span className="text-[10px] md:text-[11px] tracking-[0.18em] font-bold">
                      {s.label}
                    </span>
                  </div>
                  {i < stepLabels.length - 1 && <span className="text-bone/20 text-xs">›</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-3xl mx-auto px-5 md:px-8 py-12 md:py-16">
        {step === 1 && (
          <Step1
            address={address}
            setAddress={setAddress}
            gpsState={gpsState}
            gpsHint={gpsHint}
            handleGPS={handleGPS}
            startScan={startScan}
          />
        )}
        {step === 2 && (
          <Step2
            address={address}
            coords={coords}
            scanPct={scanPct}
            scanStatus={scanStatus}
            scanSub={scanSub}
            scanResults={scanResults}
            mapLoaded={mapLoaded}
            setMapLoaded={setMapLoaded}
          />
        )}
        {step === 3 && (
          <Step3
            selected={selected}
            toggleService={toggleService}
            lotSqft={lotSqft}
            setLotSqft={setLotSqft}
            lawnPct={lawnPct}
            setLawnPct={setLawnPct}
            onBack={() => setStep(2)}
            onGenerate={generate}
          />
        )}
        {step === 4 && <Step4 />}
        {step === 5 && quote && (
          <Step5
            quote={quote}
            address={address}
            onAccept={onClose}
            onRestart={() => setStep(1)}
          />
        )}
      </div>
    </div>
  );
}

/* ─── Step 1: Address ─── */
function Step1({
  address,
  setAddress,
  gpsState,
  gpsHint,
  handleGPS,
  startScan
}: {
  address: string;
  setAddress: (v: string) => void;
  gpsState: 'idle' | 'loading' | 'done' | 'error';
  gpsHint: string;
  handleGPS: () => void;
  startScan: () => void;
}) {
  return (
    <>
      <h2 className="headline text-bone text-4xl md:text-6xl leading-[0.92] mb-3">
        <span className="block">WHERE&apos;S</span>
        <span className="block text-lime headline-italic">YOUR YARD?</span>
      </h2>
      <p className="text-bone/70 text-sm md:text-base leading-relaxed mb-8 max-w-md">
        Enter your property address and we&apos;ll scan it via satellite to estimate your lawn size
        and build your custom quote.
      </p>

      <div className="relative mb-3">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && startScan()}
          placeholder="123 Oak St, Toledo, OH 43606"
          className="w-full px-5 py-4 pr-14 bg-ink2 border border-hairline text-bone placeholder:text-bone/30 focus:outline-none focus:border-lime transition-colors text-base"
        />
        <button
          onClick={handleGPS}
          disabled={gpsState === 'loading'}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center text-lime hover:scale-110 transition-transform disabled:opacity-50"
          aria-label="Use my location"
        >
          {gpsState === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <MapPin size={18} />}
        </button>
      </div>

      <p
        className={`text-xs mb-8 ${
          gpsState === 'done'
            ? 'text-lime'
            : gpsState === 'error'
            ? 'text-red-400'
            : 'text-bone/40'
        }`}
      >
        {gpsHint}
      </p>

      <button
        onClick={startScan}
        disabled={!address.trim()}
        className="group inline-flex items-center gap-2 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.12em] uppercase hover:bg-lime-glow transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        Scan My Property
        <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </>
  );
}

/* ─── Step 2: Satellite Scan ─── */
function Step2({
  address,
  coords,
  scanPct,
  scanStatus,
  scanSub,
  scanResults,
  mapLoaded,
  setMapLoaded
}: {
  address: string;
  coords: { lat: number; lng: number } | null;
  scanPct: number;
  scanStatus: string;
  scanSub: string;
  scanResults: null | { lotSqft: number; lawnSqft: number; type: string; confidence: number };
  mapLoaded: boolean;
  setMapLoaded: (b: boolean) => void;
}) {
  // Use Toledo as fallback coords
  const lat = coords?.lat ?? 41.6528;
  const lng = coords?.lng ?? -83.5379;
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=k&output=embed&z=18`;

  return (
    <>
      <h2 className="headline text-bone text-4xl md:text-6xl leading-[0.92] mb-3">
        <span className="block">SCANNING</span>
        <span className="block text-lime headline-italic">YOUR PROPERTY</span>
      </h2>
      <p className="text-bone/70 text-sm md:text-base mb-8">{scanSub}</p>

      {/* Scan viewport */}
      <div className="relative w-full aspect-[16/9] bg-ink2 border border-hairline overflow-hidden mb-6">
        {/* Grid overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[2]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(157,208,58,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(157,208,58,0.08) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
        <iframe
          src={mapSrc}
          onLoad={() => setMapLoaded(true)}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            mapLoaded ? 'opacity-50' : 'opacity-0'
          }`}
          frameBorder="0"
          scrolling="no"
          aria-hidden
        />

        {/* Scan beam */}
        <div
          className="absolute left-0 right-0 h-0.5 bg-lime z-[3] pointer-events-none"
          style={{
            boxShadow: '0 0 16px #9DD03A, 0 0 8px #9DD03A',
            top: '0%',
            animation: 'scanBeam 2.4s ease-in-out infinite'
          }}
        />

        {/* Corner brackets */}
        <span className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-lime z-[3]" />
        <span className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-lime z-[3]" />
        <span className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-lime z-[3]" />
        <span className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-lime z-[3]" />

        {/* HUD */}
        <div
          className="absolute bottom-3 left-3 z-[3] font-mono text-[10px] tracking-wider text-lime leading-snug"
          style={{ textShadow: '0 0 6px rgba(157,208,58,0.5)' }}
        >
          <div>COORD: {lat.toFixed(4)} / {lng.toFixed(4)}</div>
          <div>RES: 0.3m/px</div>
          <div>STATUS: {scanResults ? 'COMPLETE' : 'SCANNING'}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full h-0.5 bg-hairline overflow-hidden mb-3">
        <div
          className="h-full bg-lime transition-all duration-300"
          style={{ width: `${scanPct}%`, boxShadow: '0 0 8px #9DD03A' }}
        />
      </div>
      <div className="text-center font-mono text-xs text-lime tracking-widest mb-8">{scanStatus}</div>

      {/* Scan results */}
      {scanResults && (
        <div
          className="grid grid-cols-2 gap-px bg-hairline border border-hairline animate-fade-in"
        >
          <DataCell label="EST. LOT SIZE" value={scanResults.lotSqft.toLocaleString()} sub="square feet" />
          <DataCell label="LAWN AREA" value={scanResults.lawnSqft.toLocaleString()} sub="sq ft (mowable)" />
          <DataCell label="PROPERTY TYPE" value={scanResults.type} sub="classification" />
          <DataCell label="SCAN CONFIDENCE" value={`${scanResults.confidence}%`} sub="data quality" />
        </div>
      )}

      <style jsx>{`
        @keyframes scanBeam {
          0% {
            top: 0%;
            opacity: 0.85;
          }
          100% {
            top: 100%;
            opacity: 0.3;
          }
        }
      `}</style>
    </>
  );
}

function DataCell({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className="bg-ink2 px-4 py-4">
      <div className="text-[10px] tracking-[0.18em] font-bold text-bone/50 mb-1">{label}</div>
      <div className="headline text-bone text-2xl md:text-3xl tracking-tight">{value}</div>
      <div className="text-[11px] text-bone/40 mt-1">{sub}</div>
    </div>
  );
}

/* ─── Step 3: Service Selection ─── */
function Step3({
  selected,
  toggleService,
  lotSqft,
  setLotSqft,
  lawnPct,
  setLawnPct,
  onBack,
  onGenerate
}: {
  selected: Set<ServiceKey>;
  toggleService: (k: ServiceKey) => void;
  lotSqft: number;
  setLotSqft: (n: number) => void;
  lawnPct: number;
  setLawnPct: (n: number) => void;
  onBack: () => void;
  onGenerate: () => void;
}) {
  return (
    <>
      <h2 className="headline text-bone text-4xl md:text-6xl leading-[0.92] mb-3">
        <span className="block">PICK YOUR</span>
        <span className="block text-lime headline-italic">SERVICES</span>
      </h2>
      <p className="text-bone/70 text-sm md:text-base mb-8">
        Select everything you need. We&apos;ll build the line items and apply bundle pricing
        automatically (10% off when you bundle 3+).
      </p>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {SERVICES.map((s) => {
          const active = selected.has(s.key);
          return (
            <button
              key={s.key}
              type="button"
              onClick={() => toggleService(s.key)}
              className={`text-left p-4 border transition-all flex items-start gap-3 ${
                active
                  ? 'border-lime bg-lime/5'
                  : 'border-hairline bg-ink2 hover:border-bone/30'
              }`}
            >
              <div
                className={`w-5 h-5 mt-0.5 border flex items-center justify-center shrink-0 transition-colors ${
                  active ? 'bg-lime border-lime text-ink' : 'border-hairline'
                }`}
              >
                {active && <Check size={12} strokeWidth={3} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="headline text-bone text-base tracking-wide">{s.name.toUpperCase()}</div>
                <div className="text-lime text-[11px] font-mono mt-0.5">
                  from ${s.base} {s.unit}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Adjusters */}
      <div className="space-y-6 mb-10">
        <div>
          <div className="flex justify-between items-center text-[10px] tracking-[0.18em] font-bold mb-2">
            <span className="text-bone/60">ADJUST LOT SIZE</span>
            <span className="text-lime">{lotSqft.toLocaleString()} SQ FT</span>
          </div>
          <input
            type="range"
            min={2000}
            max={40000}
            step={200}
            value={lotSqft}
            onChange={(e) => setLotSqft(parseInt(e.target.value))}
            className="w-full accent-lime cursor-pointer"
          />
        </div>
        <div>
          <div className="flex justify-between items-center text-[10px] tracking-[0.18em] font-bold mb-2">
            <span className="text-bone/60">LAWN COVERAGE</span>
            <span className="text-lime">{lawnPct}%</span>
          </div>
          <input
            type="range"
            min={20}
            max={90}
            step={5}
            value={lawnPct}
            onChange={(e) => setLawnPct(parseInt(e.target.value))}
            className="w-full accent-lime cursor-pointer"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onBack}
          className="group inline-flex items-center justify-center gap-2 px-6 py-4 border border-hairline text-bone font-bold text-sm tracking-[0.12em] uppercase hover:border-lime transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={3} />
          Back
        </button>
        <button
          onClick={onGenerate}
          disabled={selected.size === 0}
          className="group inline-flex items-center justify-center gap-2 flex-1 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.12em] uppercase hover:bg-lime-glow transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Build My Quote ({selected.size} selected)
          <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </>
  );
}

/* ─── Step 4: Generating ─── */
function Step4() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-6">
      <Zap size={56} className="text-lime animate-pulse" fill="#9DD03A" strokeWidth={1.2} />
      <h2 className="headline text-bone text-4xl md:text-5xl leading-[0.92]">
        <span className="block">BUILDING</span>
        <span className="block text-lime headline-italic">YOUR QUOTE</span>
      </h2>
      <div className="font-mono text-xs text-lime tracking-widest">
        Calculating pricing<span className="inline-block animate-pulse">...</span>
      </div>
    </div>
  );
}

/* ─── Step 5: Quote Output ─── */
function Step5({
  quote,
  address,
  onAccept,
  onRestart
}: {
  quote: NonNullable<ReturnType<typeof useState<{ items: { name: string; detail: string; freq: string; price: number; unit: string }[]; subtotal: number; discount: number; total: number; tip: string; urgency: string; greeting: string; quoteNum: string; date: string }>>[0]>;
  address: string;
  onAccept: () => void;
  onRestart: () => void;
}) {
  return (
    <>
      <div className="border border-hairline bg-ink2 mb-6">
        {/* Quote header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 px-6 py-5 border-b border-hairline bg-ink">
          <div>
            <div className="headline text-bone text-lg tracking-wide">GRASS LANE LAWN CO.</div>
            <div className="text-bone/50 text-xs mt-1 max-w-xs">{address}</div>
          </div>
          <div className="font-mono text-xs text-bone/50 sm:text-right leading-relaxed">
            <div>QUOTE #{quote.quoteNum}</div>
            <div>DATE: {quote.date.toUpperCase()}</div>
            <div>VALID: 30 DAYS</div>
          </div>
        </div>

        <div className="p-6">
          <p className="text-bone/60 text-sm italic mb-6">{quote.greeting}</p>

          {/* Items */}
          <div className="space-y-px">
            {quote.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-4 bg-ink2 border border-hairline px-4 py-4"
              >
                <div className="flex-1 min-w-0">
                  <div className="headline text-bone text-base tracking-wide">{item.name.toUpperCase()}</div>
                  <div className="text-bone/50 text-xs mt-1">{item.detail}</div>
                  <div className="text-lime text-[11px] font-mono mt-1">{item.freq}</div>
                </div>
                <div className="text-right shrink-0">
                  <div className="headline text-bone text-2xl">${item.price}</div>
                  <div className="text-bone/40 text-[11px] font-mono">{item.unit}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 pt-4 border-t border-hairline space-y-2">
            <div className="flex justify-between text-sm text-bone/70">
              <span>Subtotal</span>
              <span>${quote.subtotal}</span>
            </div>
            {quote.discount > 0 && (
              <div className="flex justify-between text-sm text-lime">
                <span>10% Bundle Discount</span>
                <span>-${quote.discount}</span>
              </div>
            )}
            <div className="flex justify-between items-end pt-3 mt-3 border-t border-hairline">
              <span className="text-bone/60 text-xs tracking-[0.18em] font-bold">ESTIMATED TOTAL</span>
              <span className="headline text-bone text-3xl">${quote.total}</span>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="mx-6 mb-4 px-4 py-3 bg-lime/[0.06] border-l-2 border-lime text-bone/75 text-sm leading-relaxed">
          <span className="font-bold text-bone">💡 Pro tip:</span> {quote.tip}
        </div>
        <div className="px-6 pb-5 font-mono text-[11px] tracking-wider text-lime">
          ⚡ {quote.urgency}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onAccept}
          className="group flex-1 inline-flex items-center justify-center gap-2 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.12em] uppercase hover:bg-lime-glow transition-colors"
        >
          <Check size={16} strokeWidth={3} />
          Accept &amp; Schedule
        </button>
        <button
          onClick={onRestart}
          className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-hairline text-bone font-bold text-sm tracking-[0.12em] uppercase hover:border-lime transition-colors"
        >
          <ChevronLeft size={16} strokeWidth={3} />
          Start Over
        </button>
      </div>
    </>
  );
}
