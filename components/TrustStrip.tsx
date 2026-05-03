import { Gauge, CalendarCheck } from 'lucide-react';

// Ohio state silhouette with star marker for Toledo (NW corner)
const OhioIcon = ({ size = 28 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
    <path
      d="M 5 4 L 8 4 L 9 3 L 12 3 L 13 4 L 21 4 L 21 6 L 22 6 L 22 8 L 23 9 L 23 12 L 24 13 L 23 15 L 23 18 L 22 19 L 22 21 L 21 22 L 20 22 L 20 24 L 17 24 L 16 25 L 13 25 L 11 24 L 9 24 L 8 23 L 7 23 L 6 22 L 6 18 L 5 17 L 5 14 L 4 13 L 5 11 L 5 4 Z"
      fill="#9DD03A"
    />
    {/* Star at NW (Toledo location) */}
    <polygon
      points="9,7 9.7,8.5 11.2,8.6 10.1,9.7 10.4,11.2 9,10.4 7.6,11.2 7.9,9.7 6.8,8.6 8.3,8.5"
      fill="#0A0E08"
    />
  </svg>
);

// Real grass tuft from mockup
const GrassTuftIcon = ({ size = 32 }: { size?: number }) => (
  <img
    src="/photos/grass-tuft.png"
    alt=""
    width={size}
    height={Math.round(size * 0.88)}
    className="block select-none"
    draggable={false}
    aria-hidden
  />
);

const PILLARS = [
  {
    icon: <Gauge size={28} className="text-lime" strokeWidth={1.5} />,
    title: 'NEXT LEVEL CARE',
    body: 'Trained professionals. Quality that shows.'
  },
  {
    icon: <GrassTuftIcon size={28} />,
    title: 'HEALTHY, VIBRANT LAWNS.',
    body: 'Science-backed treatments for long-term results.'
  },
  {
    icon: <OhioIcon size={28} />,
    title: 'LOCALLY OWNED',
    body: 'Proudly serving Toledo and Northwest Ohio.'
  },
  {
    icon: <CalendarCheck size={28} className="text-lime" strokeWidth={1.5} />,
    title: 'RELIABLE & ON TIME',
    body: 'We show up. Every time.'
  }
];

export default function TrustStrip() {
  return (
    <section className="relative bg-ink2 border-y border-hairline">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 md:py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {PILLARS.map((p, i) => (
            <div
              key={p.title}
              className={`flex items-start gap-4 ${
                i > 0 ? 'lg:border-l lg:border-hairline lg:pl-6' : ''
              }`}
            >
              <div className="shrink-0 mt-1">{p.icon}</div>
              <div>
                <h3 className="headline text-bone text-base md:text-lg tracking-tight mb-1.5">
                  {p.title}
                </h3>
                <p className="text-bone/60 text-xs md:text-sm leading-relaxed">{p.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
