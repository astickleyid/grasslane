'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const ExpertsBadge = () => (
  <div className="relative w-[180px] h-[180px] md:w-[220px] md:h-[220px] flex items-center justify-center">
    {/* Hexagon outline */}
    <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id="hexGlow" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#9DD03A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#9DD03A" stopOpacity="0.05" />
        </linearGradient>
      </defs>
      <polygon
        points="100,12 175,55 175,145 100,188 25,145 25,55"
        fill="url(#hexGlow)"
        stroke="#9DD03A"
        strokeWidth="1.5"
      />
      <polygon
        points="100,22 165,60 165,140 100,178 35,140 35,60"
        fill="none"
        stroke="#9DD03A"
        strokeWidth="0.5"
        opacity="0.5"
      />
    </svg>
    {/* Stars */}
    <div className="absolute top-[18%] left-1/2 -translate-x-1/2 flex gap-1.5">
      {[...Array(3)].map((_, i) => (
        <svg key={i} width="10" height="10" viewBox="0 0 10 10" fill="#9DD03A">
          <polygon points="5,0 6.2,3.5 10,3.8 7,6.2 8,10 5,7.8 2,10 3,6.2 0,3.8 3.8,3.5" />
        </svg>
      ))}
    </div>
    {/* Text */}
    <div className="relative text-center px-4">
      <div className="text-[9px] md:text-[10px] tracking-[0.3em] text-lime mb-1">TOLEDO&apos;S</div>
      <div className="headline text-bone text-2xl md:text-3xl leading-none">LAWN CARE</div>
      <div className="text-[10px] md:text-xs tracking-[0.4em] text-bone/80 mt-1">EXPERTS</div>
    </div>
    {/* Bottom grass icon */}
    <svg
      width="32"
      height="16"
      viewBox="0 0 32 16"
      className="absolute bottom-[20%] left-1/2 -translate-x-1/2"
      fill="#9DD03A"
    >
      <path d="M4 16 L6 4 M10 16 L10 2 M16 16 L18 0 M22 16 L22 3 M28 16 L26 5" stroke="#9DD03A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </div>
);

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden bg-ink pt-16 md:pt-20">
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?w=2400&q=85&auto=format&fit=crop"
          alt=""
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </div>

      {/* Subtle checker accent top-right */}
      <div
        className="absolute top-24 right-0 w-32 h-32 md:w-48 md:h-48 text-bone/[0.04] checker-sm pointer-events-none"
        aria-hidden
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 w-full py-12 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Left: Headlines + CTA */}
          <div className="lg:col-span-7">
            <h1 className="headline text-[64px] sm:text-[80px] md:text-[110px] lg:text-[128px] mb-6">
              <span className="block text-bone headline-italic">DIFFERENT</span>
              <span className="block text-bone headline-italic">LANES.</span>
              <span className="block text-lime headline-italic mt-2">BETTER</span>
              <span className="block text-lime headline-italic">LAWNS.</span>
            </h1>

            <p className="text-bone/80 text-base md:text-lg max-w-md leading-relaxed mb-8 font-light">
              Premium lawn care in Toledo, Ohio built on precision, reliability,
              and <span className="text-lime font-medium">results you can see.</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md sm:max-w-none">
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.1em] uppercase hover:bg-lime-glow transition-colors"
              >
                Get Your Free Quote
                <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/services"
                className="group inline-flex items-center justify-center gap-2 px-7 py-4 border border-bone/30 text-bone font-bold text-sm tracking-[0.1em] uppercase hover:border-lime hover:text-lime transition-colors"
              >
                View Services
                <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right: Experts Badge */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <ExpertsBadge />
          </div>
        </div>
      </div>

      {/* Bottom checker accent - desktop only */}
      <div
        className="hidden md:block absolute bottom-0 right-0 w-[320px] h-2 text-lime/30 checker-sm"
        aria-hidden
      />
    </section>
  );
}
