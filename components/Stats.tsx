const STATS = [
  { value: '500+', label: 'YARDS SERVED' },
  { value: '15', label: 'YEARS IN TOLEDO' },
  { value: '4.9★', label: 'GOOGLE RATING' },
  { value: '7', label: 'SERVICES OFFERED' }
];

export default function Stats() {
  return (
    <section className="bg-ink2 border-y border-hairline">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`py-7 md:py-8 ${
                i > 0 ? 'md:border-l border-hairline' : ''
              } ${i === 1 ? 'border-l border-hairline md:border-l' : ''} ${
                i === 2 ? 'md:border-l border-hairline border-t md:border-t-0' : ''
              } ${i === 3 ? 'border-l border-hairline border-t md:border-t-0' : ''} px-4 md:px-8`}
            >
              <div className="headline text-bone text-3xl md:text-5xl leading-none tracking-[0.04em]">
                {s.value}
              </div>
              <div className="text-bone/60 text-[10px] md:text-[11px] tracking-[0.18em] mt-2 font-semibold">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
