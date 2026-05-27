import type { Dictionary } from '@/lib/dictionaries';

/**
 * Section Services — 3 tarjetas explicando QUÉ hace Vizcaia.
 * Hereda 3 servicios del spec organizacional + valida narrativa con Mateo antes de publicar.
 *
 * Diseño: tarjetas sobre ink-2 con bordo rule-dark. Numeración mono "01/02/03"
 * (sello del brand manual). Sin precios — los pedimos en el form.
 */
export function Services({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-6 items-baseline mb-16">
          <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50">
            <span className="block opacity-100 mb-2">Section</span>
            <span className="font-display font-medium text-5xl tracking-tight-4 text-signal opacity-100 leading-none">
              02
            </span>
          </p>
          <div>
            <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-6">
              {dict.services.eyebrow}
            </p>
            <h2 className="font-display font-medium tracking-tight-3 leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              {dict.services.title}
            </h2>
          </div>
        </div>

        {/* 3 tarjetas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:ml-[132px]">
          {dict.services.items.map((item) => (
            <article
              key={item.number}
              className="bg-ink-2 border border-rule-dark rounded-sm p-8 flex flex-col gap-6 hover:border-signal/40 transition-colors"
            >
              <p className="font-mono text-[10px] tracking-wide-18 uppercase text-signal opacity-80">
                {item.number}
              </p>

              <div className="space-y-3">
                <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-tight-3 text-paper leading-tight">
                  {item.title}
                </h3>
                <p className="font-sans text-base leading-relaxed text-paper opacity-80">
                  {item.lead}
                </p>
              </div>

              <p className="font-sans text-sm leading-relaxed text-paper opacity-50 mt-auto pt-4 border-t border-rule-dark">
                {item.body}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
