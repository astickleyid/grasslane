import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

const VALUES = [
  {
    title: 'PRECISION',
    body: 'Every cut, every line, every detail matters. We sweat the small stuff so your lawn looks effortless.'
  },
  {
    title: 'RELIABILITY',
    body: 'Same crew. Same day. Every week. You should never have to wonder if we\'re showing up.'
  },
  {
    title: 'RESULTS',
    body: 'Healthier turf you can see and feel. Our work shows in the lawn — not in promises.'
  }
];

export default function AboutPage() {
  return (
    <main>
      <Nav />

      <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 bg-ink overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=2400&q=85"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/40" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">ABOUT US</div>
          <h1 className="headline text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-3xl">
            <span className="block">BUILT IN TOLEDO.</span>
            <span className="block text-lime headline-italic">FOR TOLEDO.</span>
          </h1>
        </div>
      </section>

      <section className="bg-bone py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime-dark font-bold mb-4">OUR STORY</div>
          <h2 className="headline text-ink text-3xl md:text-4xl leading-tight mb-8">
            We don&apos;t just cut grass. <span className="text-lime-dark">We cultivate it.</span>
          </h2>
          <div className="space-y-5 text-ink/75 text-base md:text-lg leading-relaxed font-light">
            <p>
              Grass Lane Lawn Co. was founded on a simple belief: a great lawn is the
              difference between a house and a home. Born and raised in Toledo, we know
              the soil, the seasons, and what it takes to make a Northwest Ohio lawn
              look its absolute best.
            </p>
            <p>
              We started this company because we saw too many lawns getting the bare
              minimum — quick mows, no follow-through, and zero attention to the
              details that actually matter. We do it differently. Every property gets a
              real plan, every visit gets the same care, and every result gets your
              neighbors asking who you use.
            </p>
            <p>
              When you hire Grass Lane, you&apos;re not just hiring a mowing crew —
              you&apos;re hiring a team that takes pride in your property the way you
              take pride in your home.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">WHAT WE STAND FOR</div>
          <h2 className="headline text-bone text-3xl md:text-5xl leading-tight mb-12 max-w-3xl">
            Three things we get right.
          </h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {VALUES.map((v, i) => (
              <div key={v.title} className="border border-hairline p-6 md:p-8">
                <div className="text-lime headline text-5xl mb-4">0{i + 1}</div>
                <h3 className="headline text-bone text-2xl mb-3">{v.title}</h3>
                <p className="text-bone/70 text-sm leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 md:mt-16 flex flex-col sm:flex-row gap-3 items-start">
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
      </section>

      <Footer />
    </main>
  );
}
