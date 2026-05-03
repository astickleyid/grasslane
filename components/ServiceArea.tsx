const CITIES = [
  'Toledo',
  'Perrysburg',
  'Maumee',
  'Sylvania',
  'Waterville',
  'Holland',
  'Oregon',
  'Rossford',
  'Whitehouse',
  'Monclova',
  'Swanton',
  'Bowling Green'
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="bg-bone">
      <div className="grid lg:grid-cols-2">
        {/* Flag panel */}
        <div className="relative bg-ink min-h-[320px] lg:min-h-[540px] flex items-center justify-center overflow-hidden">
          {/* Checker pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundColor: '#F5F2EA',
              backgroundImage:
                'linear-gradient(45deg, #0A0E08 25%, transparent 25%), linear-gradient(-45deg, #0A0E08 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0A0E08 75%), linear-gradient(-45deg, transparent 75%, #0A0E08 75%)',
              backgroundSize: '64px 64px',
              backgroundPosition: '0 0, 0 32px, 32px -32px, -32px 0'
            }}
            aria-hidden
          />
          {/* Top/bottom dark gradients */}
          <div className="absolute inset-x-0 top-0 h-2/5 bg-gradient-to-b from-ink to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink to-transparent" />
          {/* Lime stripe across center */}
          <div
            className="absolute inset-x-0 h-1.5 bg-lime z-[2] top-1/2 -translate-y-1/2"
            style={{ boxShadow: '0 0 24px rgba(157,208,58,0.6)' }}
          />
          {/* Center badge */}
          <div className="relative z-[3] bg-ink/85 backdrop-blur-sm border border-bone/15 px-7 py-5 text-center">
            <div className="text-[10px] tracking-[0.25em] text-bone/50 mb-1 font-semibold">
              COVERAGE ZONE
            </div>
            <div className="headline text-bone text-3xl tracking-[0.06em]">NW OHIO</div>
            <div className="text-[11px] text-bone/50 mt-1">Toledo &amp; 11 surrounding communities</div>
          </div>
        </div>

        {/* Cities content */}
        <div className="px-6 md:px-10 py-14 lg:py-20 flex flex-col justify-center">
          <div className="text-[11px] tracking-[0.25em] text-lime-dark font-bold mb-3">
            WHERE WE RUN
          </div>
          <h2 className="headline text-ink text-4xl md:text-5xl lg:text-6xl leading-[0.95] mb-5">
            <span className="block">NW OHIO,</span>
            <span className="block text-lime-dark headline-italic">COVERED.</span>
          </h2>
          <p className="text-ink/65 text-sm md:text-base leading-relaxed max-w-md mb-7">
            Toledo and every community around it. Not sure if we reach you? Call — our zone is
            growing.
          </p>

          <div className="grid grid-cols-2 border border-ink/10 max-w-md">
            {CITIES.map((city, i) => (
              <div
                key={city}
                className={`flex items-center gap-3 px-4 py-3 text-sm text-ink/80 border-ink/10 ${
                  i % 2 === 0 ? 'border-r' : ''
                } ${i < CITIES.length - 2 ? 'border-b' : ''}`}
              >
                <span
                  className="w-2.5 h-2.5 shrink-0"
                  style={{
                    backgroundColor: '#F5F2EA',
                    backgroundImage:
                      'linear-gradient(45deg, #0A0E08 25%, transparent 25%), linear-gradient(-45deg, #0A0E08 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #0A0E08 75%), linear-gradient(-45deg, transparent 75%, #0A0E08 75%)',
                    backgroundSize: '5px 5px',
                    backgroundPosition: '0 0, 0 2.5px, 2.5px -2.5px, -2.5px 0'
                  }}
                />
                {city}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
