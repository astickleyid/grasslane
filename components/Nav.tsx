'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronRight } from 'lucide-react';
import Logo from './Logo';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'About', href: '/about' },
  { label: 'Reviews', href: '/reviews' },
  { label: 'Contact', href: '/contact' }
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-ink/95 backdrop-blur-md border-b border-hairline' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-20 md:h-24 flex items-center justify-between gap-4">
          <Logo variant="default" />

          <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-bone/80 hover:text-lime text-[12px] font-bold tracking-[0.18em] uppercase transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center gap-2 px-5 py-3 bg-lime text-ink font-bold text-[12px] tracking-[0.15em] uppercase hover:bg-lime-glow transition-colors"
            >
              Get a Quote
              <ChevronRight size={14} strokeWidth={3} />
            </Link>

            <button
              onClick={() => setOpen(true)}
              className="lg:hidden p-2 text-bone hover:text-lime transition-colors"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 bg-ink transition-opacity duration-300 lg:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-20 px-5 flex items-center justify-between border-b border-hairline">
          <Logo variant="compact" />
          <button
            onClick={() => setOpen(false)}
            className="p-2 text-bone hover:text-lime transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="px-5 py-8 flex flex-col gap-1" aria-label="Mobile">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="group flex items-center justify-between py-4 border-b border-hairline"
            >
              <span className="headline text-bone text-3xl group-hover:text-lime transition-colors">
                {item.label}
              </span>
              <ChevronRight size={20} className="text-bone/40 group-hover:text-lime group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-8 inline-flex items-center justify-center gap-2 px-6 py-4 bg-lime text-ink font-bold tracking-[0.15em] uppercase"
          >
            Get a Quote
            <ChevronRight size={16} strokeWidth={3} />
          </Link>
          <a href="tel:4192773903" className="mt-6 text-center text-bone/80 text-sm">
            (419) 277-3903
          </a>
        </nav>
      </div>
    </>
  );
}
