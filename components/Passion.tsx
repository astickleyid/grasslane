import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function Passion() {
  return (
    <section className="relative bg-ink overflow-hidden">
      {/* Checkered flag — desktop: positioned absolutely on left edge */}
      <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-[280px] xl:w-[320px] pointer-events-none select-none z-0">
        <img
          src="/photos/checkered-flag.png"
          alt=""
          className="w-full h-auto block"
          aria-hidden
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          {/* Mobile flag inline */}
          <div className="lg:hidden col-span-12 -mx-5 md:-mx-8 mb-2">
            <img
              src="/photos/checkered-flag.png"
              alt=""
              className="w-3/5 h-auto block"
              aria-hidden
            />
          </div>

          {/* Spacer for desktop flag */}
          <div className="hidden lg:block lg:col-span-3" aria-hidden />

          <div className="lg:col-span-5">
            <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">
              BUILT ON PASSION.
            </div>
            <h2 className="headline text-bone text-4xl md:text-5xl leading-[0.95] mb-5">
              <span className="block">FOCUSED ON</span>
              <span className="block text-lime headline-italic">PERFORMANCE.</span>
            </h2>
            <p className="text-bone/70 text-sm md:text-base leading-relaxed max-w-md">
              We take pride in the details that make the biggest difference. Our process is simple:
              do the job right, treat your property like our own, and deliver results that speak
              for themselves.
            </p>
          </div>

          <div className="lg:col-span-4">
            <div className="border border-lime/40 p-6 md:p-8 bg-lime/[0.03]">
              <h3 className="headline text-bone text-2xl md:text-3xl leading-tight mb-2">
                READY FOR A LAWN
                <br />
                <span className="text-lime">THAT TURNS HEADS?</span>
              </h3>
              <p className="text-bone/70 text-sm mb-6">
                Let&apos;s make your lawn the best on the block.
              </p>
              <Link
                href="/contact"
                className="group inline-flex w-full items-center justify-center gap-2 px-6 py-4 bg-lime text-ink font-bold text-sm tracking-[0.1em] uppercase hover:bg-lime-glow transition-colors"
              >
                Get Your Free Quote
                <ChevronRight
                  size={16}
                  strokeWidth={3}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
