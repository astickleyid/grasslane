import Link from 'next/link';

type Variant = 'default' | 'compact' | 'large';

const GRASS_TUFTS = (
  <svg width="48" height="20" viewBox="0 0 48 20" fill="none" aria-hidden>
    {/* 5 grass blades clustered */}
    <path d="M 6 20 L 8 4" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
    <path d="M 13 20 L 15 8" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
    <path d="M 21 20 L 24 1" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
    <path d="M 30 20 L 32 7" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
    <path d="M 39 20 L 42 5" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Logo({ variant = 'default' }: { variant?: Variant }) {
  const sizes = {
    compact: { tuft: 'h-3 w-9', main: 'text-base', sub: 'text-[8px]', cap: 'text-[8px]', gap: 'gap-0.5' },
    default: { tuft: 'h-4 w-11', main: 'text-xl', sub: 'text-[9px]', cap: 'text-[9px]', gap: 'gap-1' },
    large: { tuft: 'h-5 w-14', main: 'text-3xl', sub: 'text-[11px]', cap: 'text-[10px]', gap: 'gap-1' }
  };
  const s = sizes[variant];

  return (
    <Link href="/" className={`inline-flex flex-col items-center ${s.gap} leading-none shrink-0`}>
      {/* Grass tufts */}
      <div className={s.tuft + ' overflow-hidden'} style={{ display: 'flex', alignItems: 'flex-end' }}>
        {GRASS_TUFTS}
      </div>
      {/* GRASS LANE */}
      <div className={`headline text-bone ${s.main} tracking-[0.04em] -mb-0.5`}>GRASS LANE</div>
      {/* Ornament + LAWN CO. + Ornament */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 h-px bg-bone/70" />
        <div className={`headline text-bone ${s.sub} tracking-[0.18em]`}>LAWN CO.</div>
        <div className="flex-1 h-px bg-bone/70" />
      </div>
      {/* Toledo Ohio */}
      <div className={`text-lime ${s.cap} tracking-[0.28em] font-semibold mt-0.5`}>TOLEDO, OHIO</div>
    </Link>
  );
}
