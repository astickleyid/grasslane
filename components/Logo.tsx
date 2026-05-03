import Link from 'next/link';

type Variant = 'default' | 'compact' | 'large';

export default function Logo({ variant = 'default' }: { variant?: Variant }) {
  const sizes = {
    compact: {
      tuftW: 28,
      tuftH: 25,
      main: 'text-base',
      sub: 'text-[8px]',
      cap: 'text-[8px]',
      gap: 'gap-0.5'
    },
    default: {
      tuftW: 36,
      tuftH: 32,
      main: 'text-xl md:text-[22px]',
      sub: 'text-[9px]',
      cap: 'text-[9px]',
      gap: 'gap-1'
    },
    large: {
      tuftW: 56,
      tuftH: 50,
      main: 'text-3xl md:text-4xl',
      sub: 'text-[11px]',
      cap: 'text-[10px]',
      gap: 'gap-1'
    }
  };
  const s = sizes[variant];

  return (
    <Link
      href="/"
      className={`inline-flex flex-col items-center ${s.gap} leading-none shrink-0`}
      aria-label="Grass Lane Lawn Co."
    >
      {/* Real grass tuft from mockup */}
      <img
        src="/photos/grass-tuft.png"
        alt=""
        width={s.tuftW}
        height={s.tuftH}
        className="block select-none"
        draggable={false}
        aria-hidden
      />
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
