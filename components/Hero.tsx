import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const ExpertsBadge = () => (
  <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] flex items-center justify-center select-none">
    {/* Outer hexagon */}
    <svg viewBox="0 0 220 220" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="hexBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0A0E08" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#11160F" stopOpacity="0.95" />
        </linearGradient>
      </defs>
      <polygon
        points="110,10 195,60 195,160 110,210 25,160 25,60"
        fill="url(#hexBg)"
        stroke="#9DD03A"
        strokeWidth="2"
      />
      <polygon
        points="110,22 184,65 184,155 110,198 36,155 36,65"
        fill="none"
        stroke="#9DD03A"
        strokeWidth="0.6"
        opacity="0.55"
      />
    </svg>

    {/* Stars row */}
    <div className="absolute top-[14%] left-1/2 -translate-x-1/2 flex gap-1.5">
      {[...Array(3)].map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 10 10" fill="#9DD03A">
          <polygon points="5,0 6.2,3.5 10,3.8 7,6.2 8,10 5,7.8 2,10 3,6.2 0,3.8 3.8,3.5" />
        </svg>
      ))}
    </div>

    {/* Center text block */}
    <div className="relative text-center px-2 -mt-2">
      <div className="flex items-center justify-center gap-1.5 mb-1">
        <span className="text-lime text-xs">›</span>
        <span className="text-[10px] md:text-[11px] tracking-[0.3em] text-lime font-semibold">
          TOLEDO&apos;S
        </span>
        <span className="text-lime text-xs">‹</span>
      </div>
      <div className="headline text-bone text-2xl md:text-3xl leading-none">LAWN CARE</div>
      <div className="text-[11px] md:text-xs tracking-[0.45em] text-bone/85 mt-1.5 font-bold">
        EXPERTS
      </div>
    </div>

    {/* Bottom grass tufts */}
    <svg
      width="44"
      height="14"
      viewBox="0 0 44 14"
      className="absolute bottom-[16%] left-1/2 -translate-x-1/2"
      aria-hidden
    >
      <path d="M5 14 L7 3" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11 14 L11 1" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 14 L20 0" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M26 14 L26 2" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M34 14 L36 3" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M40 14 L40 5" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden bg-ink pt-20 md:pt-24">
      {/* Background photo */}
      <div className="absolute inset-0 z-0">
        <img
          src="/photos/hero.jpg"
          alt="Manicured lawn with mowing stripes leading to a colonial home — Grass Lane Lawn Co. Toledo, Ohio"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
          loading="eager"
          fetchPriority="high"
        />
        {/* Strong left fade so headlines pop on the dark side */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, #0A0E08 0%, rgba(10,14,8,0.95) 28%, rgba(10,14,8,0.6) 50%, rgba(10,14,8,0.2) 75%, rgba(10,14,8,0.05) 100%)'
          }}
        />
        {/* Subtle vertical fade for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 via-transparent to-ink/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Headlines + CTAs */}
          <div className="lg:col-span-7 xl:col-span-8">
            <h1 className="headline text-[68px] sm:text-[92px] md:text-[124px] lg:text-[140px] mb-6">
              <span className="block text-bone headline-italic">LIFE</span>
              <span className="block text-bone headline-italic">IN THE</span>
              <span className="block text-lime headline-italic mt-2">GRASS</span>
              <span className="block text-lime headline-italic">LANE.</span>
            </h1>

            <p className="text-bone/85 text-base md:text-lg max-w-md leading-relaxed mb-8 font-light">
              Premium lawn care in Toledo, Ohio built on precision, reliability,
              and <span className="text-lime font-medium">results you can see.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.12em] uppercase hover:bg-lime-glow transition-colors"
              >
                Get Your Free Quote
                <ChevronRight
                  size={16}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/40 text-bone font-bold text-sm tracking-[0.12em] uppercase hover:border-lime hover:text-lime transition-colors"
              >
                View Services
                <ChevronRight
                  size={16}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>

          {/* Experts Badge */}
          <div className="lg:col-span-5 xl:col-span-4 flex justify-center lg:justify-end">
            <ExpertsBadge />
          </div>
        </div>
      </div>
    </section>
  );
}
