import Link from 'next/link';

type Variant = 'default' | 'compact' | 'large';

const GrassBlades = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size * 2.6}
    height={size}
    viewBox="0 0 46 18"
    fill="none"
    aria-hidden
    className="block"
  >
    {/* 3 main center blades */}
    <path d="M 23 18 L 23 1" stroke="#9DD03A" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M 17 18 L 18 4" stroke="#9DD03A" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M 29 18 L 28 4" stroke="#9DD03A" strokeWidth="2.2" strokeLinecap="round" />
    {/* 2 outer shorter blades */}
    <path d="M 11 18 L 13 7" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
    <path d="M 35 18 L 33 7" stroke="#9DD03A" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default function Logo({ variant = 'default' }: { variant?: Variant }) {
  const sizes = {
    compact: { tuft: 12, main: 'text-base', sub: 'text-[8px]', cap: 'text-[8px]', gap: 'gap-0.5' },
    default: { tuft: 16, main: 'text-xl md:text-[22px]', sub: 'text-[9px]', cap: 'text-[9px]', gap: 'gap-1' },
    large: { tuft: 22, main: 'text-3xl md:text-4xl', sub: 'text-[11px]', cap: 'text-[10px]', gap: 'gap-1' }
  };
  const s = sizes[variant];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center ${s.gap} leading-none shrink-0`}
      aria-label="Grass Lane Lawn Co."
    >
      {/* Grass blades */}
      <GrassBlades size={s.tuft} />
      {/* GRASS LANE */}
      <div className={`headline text-bone ${s.main} tracking-[0.04em] -mb-0.5`}>GRASS LANE</div>
      {/* Ornament + LAWN CO. + Ornament */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex-1 h-px bg-bone/70" />
        <div className={`headline text-bone ${s.sub} tracking-[0.18em]`}>LAWN CO.</div>
        <div className="flex-1 h-px bg-bone/70" />
      </div>
      {/* Toledo Ohio */}
      <div className={`text-lime ${s.cap} tracking-[0.28em] font-semibold mt-0.5`}>
        TOLEDO, OHIO
      </div>
    </Link>
  );
}
