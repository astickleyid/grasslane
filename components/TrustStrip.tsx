import { Gauge, Sprout, MapPin, CalendarCheck } from 'lucide-react';

const PILLARS = [
  {
    icon: Gauge,
    title: 'NEXT LEVEL CARE',
    body: 'Trained professionals. Quality that shows.'
  },
  {
    icon: Sprout,
    title: 'HEALTHY, VIBRANT LAWNS',
    body: 'Science-backed treatments for long-term results.'
  },
  {
    icon: MapPin,
    title: 'LOCALLY OWNED',
    body: 'Proudly serving Toledo and Northwest Ohio.'
  },
  {
    icon: CalendarCheck,
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
              <div className="shrink-0 mt-1">
                <p.icon size={28} className="text-lime" strokeWidth={1.5} />
              </div>
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
