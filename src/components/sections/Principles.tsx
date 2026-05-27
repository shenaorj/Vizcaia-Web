import type { Dictionary } from '@/lib/dictionaries';

/**
 * Section Principles — "How we work". 4 principios numerados.
 *
 * Aplica el patrón mono `01/02/03/04` del manual de marca para los números.
 * Display medium para los títulos, sans normal para body.
 */
export function Principles({ dict }: { dict: Dictionary }) {
  return (
    <section className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-rule-dark">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-6 items-baseline mb-16">
          <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50">
            <span className="block opacity-100 mb-2">Section</span>
            <span className="font-display font-medium text-5xl tracking-tight-4 text-signal opacity-100 leading-none">
              03
            </span>
          </p>
          <div>
            <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-6">
              {dict.principles.eyebrow}
            </p>
            <h2 className="font-display font-medium tracking-tight-3 leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              {dict.principles.title}
            </h2>
          </div>
        </div>

        {/* 4 principios — grid 2×2 en md, 4×1 en xl */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:ml-[132px]">
          {dict.principles.items.map((item) => (
            <div key={item.number} className="space-y-3">
              <p className="font-mono text-[10px] tracking-wide-18 uppercase text-signal opacity-80">
                {item.number}
              </p>
              <h3 className="font-display font-medium text-xl sm:text-2xl tracking-tight-3 text-paper leading-tight">
                {item.title}
              </h3>
              <p className="font-sans text-sm leading-relaxed text-paper opacity-70">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
