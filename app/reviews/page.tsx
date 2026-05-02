import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ChevronRight, Star } from 'lucide-react';

// Placeholder testimonials — Austin should swap these for real Google/Facebook reviews
const REVIEWS = [
  {
    name: 'Sarah M.',
    location: 'Sylvania, OH',
    rating: 5,
    body: 'My lawn has never looked better. The team is on time every week and the stripes are perfect. Worth every dollar.'
  },
  {
    name: 'Mike T.',
    location: 'Perrysburg, OH',
    rating: 5,
    body: 'After two summers of bad service from another company, switching to Grass Lane was night and day. Real results, real fast.'
  },
  {
    name: 'Jennifer R.',
    location: 'Toledo, OH',
    rating: 5,
    body: 'Professional, friendly, and they actually care about the work. The fertilization program turned my yard around.'
  },
  {
    name: 'David K.',
    location: 'Maumee, OH',
    rating: 5,
    body: 'Best decision I made for my house this year. The quote was straightforward and the service is consistent.'
  },
  {
    name: 'Amanda L.',
    location: 'Holland, OH',
    rating: 5,
    body: 'Neighbors keep asking who does our lawn. I love bragging about Grass Lane.'
  },
  {
    name: 'Tom B.',
    location: 'Rossford, OH',
    rating: 5,
    body: 'Reliable, affordable, and they pay attention to the details other companies skip. Highly recommend.'
  }
];

export default function ReviewsPage() {
  return (
    <main>
      <Nav />

      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 bg-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">REVIEWS</div>
          <h1 className="headline text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-4xl">
            <span className="block">WHAT</span>
            <span className="block text-lime headline-italic">NEIGHBORS</span>
            <span className="block">ARE SAYING.</span>
          </h1>

          <div className="mt-10 flex flex-wrap items-center gap-6 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="#9DD03A" stroke="#9DD03A" />
                ))}
              </div>
              <div>
                <div className="text-bone font-bold">4.9 / 5</div>
                <div className="text-bone/60 text-xs">Average rating</div>
              </div>
            </div>
            <div>
              <div className="text-bone font-bold">100+ Lawns</div>
              <div className="text-bone/60 text-xs">Cared for across NW Ohio</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {REVIEWS.map((r) => (
              <div
                key={r.name}
                className="bg-white border border-ink/10 p-6 md:p-7 flex flex-col"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="#7CB342" stroke="#7CB342" />
                  ))}
                </div>
                <p className="text-ink/80 text-sm md:text-base leading-relaxed mb-6 flex-1">
                  &ldquo;{r.body}&rdquo;
                </p>
                <div className="pt-4 border-t border-ink/10">
                  <div className="font-bold text-ink text-sm">{r.name}</div>
                  <div className="text-ink/50 text-xs">{r.location}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <h3 className="headline text-ink text-3xl md:text-4xl mb-4">
              Want to be our next happy neighbor?
            </h3>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-2 px-7 py-4 bg-ink text-bone font-bold text-sm tracking-[0.1em] uppercase hover:bg-lime-dark transition-colors"
            >
              Get Your Free Quote
              <ChevronRight size={16} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
