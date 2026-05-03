const ITEMS = [
  'LIVE LIFE IN THE GRASS LANE',
  'MOWING',
  'FERTILIZATION',
  'AERATION & OVERSEEDING',
  'WEED CONTROL',
  'LANDSCAPE SERVICES',
  'MULCHING',
  'EDGING',
  'SPRING & FALL CLEANUPS'
];

export default function Marquee() {
  // Duplicate so the loop is seamless
  const seq = [...ITEMS, ...ITEMS];

  return (
    <div className="bg-lime-dark border-y-2 border-lime overflow-hidden relative">
      <div
        className="flex whitespace-nowrap will-change-transform animate-marquee"
        style={{ width: 'max-content' }}
      >
        {seq.map((item, i) => (
          <div
            key={i}
            className="flex items-center px-9 py-3 border-r border-bone/15"
          >
            <span className="headline text-bone/95 text-sm md:text-base tracking-[0.22em]">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
