import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-ink flex items-center justify-center px-5">
      <div className="text-center max-w-lg">
        <div className="text-[11px] tracking-[0.25em] text-lime font-bold mb-4">404</div>
        <h1 className="headline text-bone text-5xl md:text-7xl leading-[0.9] mb-6">
          <span className="block">WRONG</span>
          <span className="block text-lime headline-italic">LANE.</span>
        </h1>
        <p className="text-bone/70 mb-8">This page doesn&apos;t exist — but your lawn still needs love.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-4 bg-lime text-ink font-bold text-sm tracking-[0.1em] uppercase hover:bg-lime-glow transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
