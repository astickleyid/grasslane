import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import QuoteForm from '@/components/QuoteForm';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <main>
      <Nav />

      <section className="relative pt-32 md:pt-40 pb-12 md:pb-16 bg-ink">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">GET A QUOTE</div>
          <h1 className="headline text-bone text-5xl md:text-7xl lg:text-8xl leading-[0.9] max-w-4xl">
            <span className="block">LET&apos;S MAKE</span>
            <span className="block text-lime headline-italic">YOUR LAWN</span>
            <span className="block">UNFORGETTABLE.</span>
          </h1>
          <p className="text-bone/70 text-base md:text-lg max-w-xl mt-6 leading-relaxed">
            Fill out the form below and we&apos;ll get back to you within one business day with a free,
            no-pressure quote.
          </p>
        </div>
      </section>

      <section className="bg-bone py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid lg:grid-cols-3 gap-8 md:gap-12">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <QuoteForm />
          </div>

          <aside className="order-1 lg:order-2 space-y-6">
            <div className="bg-ink text-bone p-6 md:p-7">
              <h3 className="headline text-2xl mb-5">CONTACT INFO</h3>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone size={16} className="text-lime mt-0.5 shrink-0" />
                  <div>
                    <div className="text-bone/50 text-[10px] tracking-[0.2em] uppercase mb-0.5">Phone</div>
                    <a href="tel:4195551234" className="hover:text-lime transition-colors">(419) 555-1234</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={16} className="text-lime mt-0.5 shrink-0" />
                  <div>
                    <div className="text-bone/50 text-[10px] tracking-[0.2em] uppercase mb-0.5">Email</div>
                    <a href="mailto:hello@grasslanelawnco.com" className="hover:text-lime transition-colors break-all">
                      hello@grasslanelawnco.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={16} className="text-lime mt-0.5 shrink-0" />
                  <div>
                    <div className="text-bone/50 text-[10px] tracking-[0.2em] uppercase mb-0.5">Service Area</div>
                    Toledo, OH &amp; surrounding communities
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock size={16} className="text-lime mt-0.5 shrink-0" />
                  <div>
                    <div className="text-bone/50 text-[10px] tracking-[0.2em] uppercase mb-0.5">Hours</div>
                    <div>Mon–Fri 7am–6pm</div>
                    <div>Sat 8am–4pm</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="border border-ink/10 p-6 md:p-7 bg-white">
              <h4 className="headline text-ink text-xl mb-3">RESPONSE TIME</h4>
              <p className="text-ink/70 text-sm leading-relaxed">
                We respond to every quote request within one business day. Most quotes go out the same afternoon.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}
