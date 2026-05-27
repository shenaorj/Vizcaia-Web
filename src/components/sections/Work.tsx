import type { Dictionary } from '@/lib/dictionaries';

/**
 * Section Work — trabajo previo. v1 menciona Quitebe sin nombrar al cliente
 * (autorización pendiente). En el futuro esta sección crece a múltiples casos.
 *
 * Diseño minimal: card grande con eyebrow + título + lead + tags + footnote.
 * No imágenes del producto en v1 (sin autorización).
 */
export function Work({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-6 items-baseline mb-16">
          <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50">
            <span className="block opacity-100 mb-2">Section</span>
            <span className="font-display font-medium text-5xl tracking-tight-4 text-signal opacity-100 leading-none">
              04
            </span>
          </p>
          <div>
            <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-6">
              {dict.work.eyebrow}
            </p>
            <h2 className="font-display font-medium tracking-tight-3 leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              {dict.work.title}
            </h2>
          </div>
        </div>

        {/* Card del caso */}
        <article className="md:ml-[132px] max-w-3xl bg-ink-2 border border-rule-dark rounded-sm p-10 sm:p-12 space-y-6">
          <p className="font-sans text-lg sm:text-xl leading-relaxed text-paper text-balance">
            {dict.work.lead}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {dict.work.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] tracking-wide-16 uppercase text-signal border border-signal/40 rounded-sm px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="font-mono text-[11px] tracking-wide-12 uppercase text-paper opacity-40 pt-4 border-t border-rule-dark">
            {dict.work.footnote}
          </p>
        </article>
      </div>
    </section>
  );
}
