/**
 * T2 — Página de prueba de tokens del brand manual.
 * Esta página se reemplaza con el Hero real cuando lleguemos a T12.
 */
export default function HomePage() {
  return (
    <main className="min-h-screen p-12 font-sans">
      {/* Hero placeholder */}
      <section className="mb-16">
        <p className="font-mono text-xs tracking-wide-16 uppercase text-signal opacity-60">
          Vizcaia / Token preview · T2
        </p>
        <h1 className="font-display mt-4 text-7xl font-medium tracking-tight-5">
          vizc<em className="font-serif italic text-signal">ai</em>a
        </h1>
        <p className="mt-4 font-sans text-lg text-paper opacity-70">A foundry for intelligence.</p>
      </section>

      {/* Paleta */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Paleta
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          <Swatch name="ink" hex="#0A0F0C" className="bg-ink text-paper border border-rule-dark" />
          <Swatch
            name="ink-2"
            hex="#141A16"
            className="bg-ink-2 text-paper border border-rule-dark"
          />
          <Swatch name="ink-3" hex="#1F2722" className="bg-ink-3 text-paper" />
          <Swatch name="ink-4" hex="#2D3631" className="bg-ink-4 text-paper" />
          <Swatch name="paper" hex="#F4F1E8" className="bg-paper text-ink" />
          <Swatch name="paper-2" hex="#E8E3D4" className="bg-paper-2 text-ink" />
          <Swatch name="paper-3" hex="#D7D2C2" className="bg-paper-3 text-ink" />
          <Swatch name="signal" hex="#00E37A" className="bg-signal text-ink" />
          <Swatch name="signal-2" hex="#5BFFAE" className="bg-signal-2 text-ink" />
          <Swatch name="forge" hex="#007A45" className="bg-forge text-paper" />
          <Swatch name="moss" hex="#1B3328" className="bg-moss text-paper" />
          <Swatch name="smoke" hex="#6B7570" className="bg-smoke text-paper" />
          <Swatch name="flare" hex="#FF5A3C" className="bg-flare text-ink" />
        </div>
      </section>

      {/* Tipografías */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Tipografías
        </h2>
        <div className="space-y-4">
          <p className="font-display text-4xl tracking-tight-3">
            Display · Space Grotesk · tight-3
          </p>
          <p className="font-sans text-lg">Sans · Geist · regular weight, default body.</p>
          <p className="font-mono text-sm tracking-wide-16 uppercase text-paper opacity-60">
            Mono · Geist Mono · wide-16 · uppercase
          </p>
          <p className="font-serif italic text-3xl text-signal">
            Serif · Instrument Serif italic · color signal
          </p>
        </div>
      </section>

      {/* Letter spacing */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Letter spacing
        </h2>
        <div className="space-y-2 font-display text-2xl">
          <p className="tracking-tight-5">tracking-tight-5</p>
          <p className="tracking-tight-4">tracking-tight-4</p>
          <p className="tracking-tight-3">tracking-tight-3</p>
          <p className="tracking-tight-2">tracking-tight-2</p>
          <p className="tracking-wide-04">tracking-wide-04</p>
          <p className="tracking-wide-08">tracking-wide-08</p>
          <p className="tracking-wide-12">tracking-wide-12</p>
          <p className="tracking-wide-16">tracking-wide-16</p>
          <p className="tracking-wide-18">tracking-wide-18</p>
        </div>
      </section>

      <p className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-30">
        scaffolding · T2 done · tokens verified
      </p>
    </main>
  );
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className={`p-4 min-h-32 flex flex-col justify-between rounded-sm ${className}`}>
      <span className="font-display text-base">{name}</span>
      <div>
        <span className="font-mono text-[10px] tracking-wide-04 opacity-70 block">{hex}</span>
      </div>
    </div>
  );
}
