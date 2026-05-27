import type { Dictionary } from '@/lib/dictionaries';

/**
 * Section Manifesto — "Why Vizcaia".
 *
 * Tono brand-honest: sin "we revolutionize" / "potenciamos con IA".
 * Heredado del spec organizacional (~/Documents/Vizcaia/specs/000-overview/spec.md).
 * En T16 (ensamblado) se ajusta padding/separación con el resto de secciones.
 */
export function Manifesto({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-rule-dark">
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow + sec-num pattern del brand manual */}
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-6 items-baseline mb-12">
          <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50">
            <span className="block opacity-100 mb-2">Section</span>
            <span className="font-display font-medium text-5xl tracking-tight-4 text-signal opacity-100 leading-none">
              01
            </span>
          </p>
          <div>
            <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-6">
              {dict.manifesto.eyebrow}
            </p>
            <h2 className="font-display font-medium tracking-tight-3 leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              {dict.manifesto.title}
            </h2>
          </div>
        </div>

        {/* Párrafos del manifesto */}
        <div className="md:ml-[132px] max-w-2xl space-y-6 text-paper">
          {dict.manifesto.paragraphs.map((paragraph, idx) => (
            <p
              // biome-ignore lint/suspicious/noArrayIndexKey: el array es estático del dict, el orden NUNCA cambia
              key={idx}
              className={
                idx === 0
                  ? 'font-sans text-lg sm:text-xl leading-relaxed text-balance'
                  : 'font-sans text-base sm:text-lg leading-relaxed opacity-70 text-balance'
              }
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
