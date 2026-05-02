import Link from 'next/link';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About Us', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' }
];

const SERVICE_AREAS = [
  ['Toledo', 'Holland'],
  ['Perrysburg', 'Rossford'],
  ['Sylvania', 'Waterville'],
  ['Maumee', 'Oregon']
];

export default function Footer() {
  return (
    <footer className="bg-ink2 border-t border-hairline">
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-14 pb-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <svg width="34" height="34" viewBox="0 0 40 40" fill="none">
                <path d="M8 32 L20 8 L32 32" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
                <path d="M14 32 L20 16 L26 32" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
                <path d="M6 36 L34 36" stroke="#F5F2EA" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <div>
                <div className="headline text-bone text-lg leading-none">GRASS LANE</div>
                <div className="text-[9px] tracking-[0.2em] text-bone/60 mt-0.5">LAWN CO.</div>
              </div>
            </div>
            <div className="text-[10px] tracking-[0.25em] text-lime mb-3">TOLEDO, OHIO</div>
            <p className="text-bone/60 text-xs leading-relaxed max-w-[14rem]">
              Locally owned. Quality driven. Committed to your lawn.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-bone font-bold mb-4">QUICK LINKS</h4>
            <ul className="space-y-2">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-bone/70 hover:text-lime text-sm transition-colors inline-flex items-center gap-2 group"
                  >
                    <span className="text-lime/60 group-hover:text-lime">›</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-bone font-bold mb-4">SERVICE AREAS</h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-bone/70">
              {SERVICE_AREAS.flat().map((city) => (
                <li key={city}>{city}</li>
              ))}
            </ul>
            <div className="text-bone/50 text-xs mt-3">&amp; Surrounding Areas</div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[11px] tracking-[0.25em] text-bone font-bold mb-4">LET&apos;S CONNECT</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="tel:4195551234"
                  className="text-bone/80 hover:text-lime inline-flex items-center gap-3 transition-colors"
                >
                  <Phone size={14} className="text-lime" />
                  (419) 555-1234
                </a>
              </li>
              <li>
                <a
                  href="mailto:hello@grasslanelawnco.com"
                  className="text-bone/80 hover:text-lime inline-flex items-center gap-3 transition-colors"
                >
                  <Mail size={14} className="text-lime" />
                  hello@grasslanelawnco.com
                </a>
              </li>
              <li className="text-bone/80 inline-flex items-center gap-3">
                <MapPin size={14} className="text-lime" />
                Toledo, Ohio
              </li>
            </ul>
            <div className="flex gap-3 mt-5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 border border-hairline flex items-center justify-center text-bone/70 hover:border-lime hover:text-lime transition-colors"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 border border-hairline flex items-center justify-center text-bone/70 hover:border-lime hover:text-lime transition-colors"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-hairline flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="text-bone/50 text-xs">
            © {new Date().getFullYear()} Grass Lane Lawn Co. All rights reserved.
          </div>
          <div className="text-bone/40 text-[10px] tracking-[0.3em] uppercase">
            Live Life in the Grass Lane.
          </div>
        </div>
      </div>
    </footer>
  );
}
