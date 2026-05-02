import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

type Service = {
  title: string;
  blurb: string;
  image: string;
  icon: 'mower' | 'leaf' | 'target' | 'drop' | 'tree';
};

const SERVICES: Service[] = [
  {
    title: 'LAWN MOWING',
    blurb: 'Clean cuts. Sharp lines. A lawn that stands out.',
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=800&q=80',
    icon: 'mower'
  },
  {
    title: 'FERTILIZATION',
    blurb: 'Nourish your lawn from the roots up for thicker, greener grass.',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    icon: 'leaf'
  },
  {
    title: 'WEED CONTROL',
    blurb: 'Targeted solutions for a weed-free, beautiful lawn.',
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&q=80',
    icon: 'target'
  },
  {
    title: 'AERATION',
    blurb: 'Stronger roots. Better growth. Longer lasting lawns.',
    image: 'https://images.unsplash.com/photo-1444858345404-1a4a59b6cdc4?w=800&q=80',
    icon: 'drop'
  },
  {
    title: 'LANDSCAPE SERVICES',
    blurb: 'Enhance curb appeal and enjoy a property you\'re proud of.',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=800&q=80',
    icon: 'tree'
  }
];

const ServiceIcon = ({ name }: { name: Service['icon'] }) => {
  const common = { width: 22, height: 22, fill: 'none', stroke: '#0A0E08', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (name) {
    case 'mower':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <rect x="3" y="9" width="14" height="7" rx="1" />
          <circle cx="6" cy="19" r="2" />
          <circle cx="15" cy="19" r="2" />
          <path d="M17 12 L21 12 L21 7" />
        </svg>
      );
    case 'leaf':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 21 L12 11" />
          <path d="M12 11 C 12 7 15 5 19 5 C 19 9 17 12 12 11 Z" />
          <path d="M12 11 C 12 7 9 5 5 5 C 5 9 7 12 12 11 Z" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.5" fill="#0A0E08" />
        </svg>
      );
    case 'drop':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3 C 8 9 5 13 5 16 C 5 20 8 22 12 22 C 16 22 19 20 19 16 C 19 13 16 9 12 3 Z" />
        </svg>
      );
    case 'tree':
      return (
        <svg viewBox="0 0 24 24" {...common}>
          <path d="M12 3 L7 11 L9 11 L5 17 L9 17 L6 21 L18 21 L15 17 L19 17 L15 11 L17 11 Z" />
          <path d="M12 21 L12 15" />
        </svg>
      );
  }
};

export default function Services() {
  return (
    <section id="services" className="relative bg-bone py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 mb-12">
          <div className="lg:col-span-4">
            <div className="text-[11px] tracking-[0.25em] text-lime-dark font-bold mb-4">
              FULL-SERVICE LAWN CARE
            </div>
            <h2 className="headline text-ink text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-5">
              <span className="block">EVERY SERVICE.</span>
              <span className="block text-lime-dark">EVERY SEASON.</span>
              <span className="block">ONE INCREDIBLE LAWN.</span>
            </h2>
            <p className="text-ink/70 text-sm md:text-base leading-relaxed mb-6 max-w-md">
              From weekly mowing to advanced treatments, we handle everything
              your lawn needs to look its best all year long.
            </p>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 px-6 py-3 border border-ink/30 text-ink font-bold text-xs tracking-[0.15em] uppercase hover:border-lime-dark hover:text-lime-dark transition-colors"
            >
              Explore Services
              <ChevronRight size={14} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
              {SERVICES.map((s) => (
                <div
                  key={s.title}
                  className="group bg-white border border-ink/10 hover:border-lime-dark/40 transition-all overflow-hidden"
                >
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={s.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white via-white/60 to-transparent" />
                    <div className="absolute -bottom-5 left-1/2 -translate-x-1/2">
                      <div className="w-12 h-12 bg-white border border-ink/10 rounded-full flex items-center justify-center shadow-sm">
                        <ServiceIcon name={s.icon} />
                      </div>
                    </div>
                  </div>
                  <div className="px-3 pt-8 pb-5 text-center">
                    <h3 className="headline text-ink text-base md:text-lg leading-tight mb-2">
                      {s.title}
                    </h3>
                    <div className="w-8 h-px bg-lime-dark mx-auto mb-3" />
                    <p className="text-ink/60 text-[11px] md:text-xs leading-relaxed min-h-[3em]">
                      {s.blurb}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
