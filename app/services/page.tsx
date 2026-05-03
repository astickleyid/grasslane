import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Check } from 'lucide-react';

const SERVICE_DETAIL = [
  {
    title: 'Lawn Mowing',
    blurb: 'Weekly or bi-weekly precision cuts that keep your lawn looking sharp.',
    image: '/photos/service-mowing.jpg',
    points: [
      'Sharp, even cuts at the optimal blade height for your grass type',
      'Crisp edges along walkways, driveways, and beds',
      'Clippings cleaned from hard surfaces every visit',
      'Consistent weekly schedule — same crew, same day'
    ]
  },
  {
    title: 'Fertilization',
    blurb: 'Season-appropriate feeding programs that build a thicker, greener lawn.',
    image: '/photos/service-fertilization.jpg',
    points: [
      'Soil-tested nutrient programs',
      'Slow-release formulas for steady growth',
      'Spring, summer, and fall applications',
      'Pet- and family-safe products'
    ]
  },
  {
    title: 'Weed Control',
    blurb: 'Targeted treatments that clear weeds without harming your grass.',
    image: '/photos/service-weed.jpg',
    points: [
      'Pre-emergent in early spring',
      'Spot treatments for broadleaf weeds',
      'Crabgrass and dandelion programs',
      'Safe re-entry windows clearly communicated'
    ]
  },
  {
    title: 'Aeration & Overseeding',
    blurb: 'Core aeration relieves compaction so roots, water, and nutrients reach deeper.',
    image: '/photos/service-aeration.jpg',
    points: [
      'Core aeration with commercial-grade equipment',
      'Premium seed blends matched to your lawn',
      'Best results in late summer / early fall',
      'Watering instructions provided after service'
    ]
  },
  {
    title: 'Landscape Services',
    blurb: 'Bed maintenance, mulching, edging, and seasonal cleanups.',
    image: '/photos/service-landscape.jpg',
    points: [
      'Spring and fall cleanups',
      'Fresh mulch installation',
      'Bed edging and shaping',
      'Shrub and small tree maintenance'
    ]
  },
  {
    title: 'Mulching',
    blurb: 'Fresh mulch delivered and installed — locks in moisture and stops weeds before they start.',
    image: '/photos/service-landscape.jpg',
    points: [
      'Premium hardwood and dyed options',
      'Delivered and spread by our crew',
      'Bed prep and weed barrier included',
      'Best applied in spring after first warm week'
    ]
  },
  {
    title: 'Edging',
    blurb: 'Hard, clean lines along every bed, driveway, and walk. Add to mowing or book standalone.',
    image: '/photos/service-mowing.jpg',
    points: [
      'Mechanical edging for crisp, deep lines',
      'Free with weekly mowing plans',
      'Standalone refresh available on-demand',
      'Cleanup of debris included'
    ]
  },
  {
    title: 'Spring & Fall Cleanups',
    blurb: 'Start the season clean. End it cleaner. Leaves, debris, bed cleanup, edge refresh.',
    image: '/photos/service-landscape.jpg',
    points: [
      'Full leaf and debris removal',
      'Bed cleanup and re-edge',
      'Tarping and haul-away service',
      'Schedule before May 1st (spring) or before first hard frost (fall)'
    ]
  }
];

export default function ServicesPage() {
  return (
    <main>
      <Nav />

      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 bg-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">OUR SERVICES</div>
          <h1 className="headline text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-4xl">
            <span className="block">EVERYTHING YOUR</span>
            <span className="block text-lime headline-italic">LAWN NEEDS.</span>
          </h1>
          <p className="text-bone/70 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
            Full-service lawn care designed for Toledo&apos;s climate and your property&apos;s
            specific needs. Every service is performed by trained professionals who treat your
            lawn like it&apos;s their own.
          </p>
        </div>
      </section>

      <section className="bg-bone py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 space-y-16 md:space-y-24">
          {SERVICE_DETAIL.map((s, i) => (
            <div
              key={s.title}
              className={`grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''
              }`}
            >
              <div className="aspect-[4/3] overflow-hidden bg-ink2 relative">
                <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-lime text-ink text-[10px] font-bold tracking-[0.2em]">
                  0{i + 1}
                </div>
              </div>
              <div>
                <h2 className="headline text-ink text-4xl md:text-5xl mb-3">{s.title.toUpperCase()}</h2>
                <p className="text-ink/70 text-base md:text-lg leading-relaxed mb-6">{s.blurb}</p>
                <ul className="space-y-3 mb-6">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-ink/80 text-sm">
                      <Check size={16} className="text-lime-dark mt-0.5 shrink-0" strokeWidth={3} />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-ink text-bone font-bold text-xs tracking-[0.15em] uppercase hover:bg-lime-dark transition-colors"
                >
                  Get a Quote
                  <ChevronRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
