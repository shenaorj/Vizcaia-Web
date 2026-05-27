import type { Dictionary } from '@/lib/dictionaries';

/**
 * Section Contact — destino del CTA del hero (`#contact`).
 *
 * v1 (T15): layout solo — título + descripción + skeleton donde va el form.
 * v1.1 (T17): se reemplaza el skeleton con `<ContactForm>` (RHF + Zod + API).
 *
 * `id="contact"` es el anchor para smooth scroll desde el botón "Let's talk".
 */
export function Contact({ dict }: { dict: Dictionary }) {
  return (
    <section
      id="contact"
      // scroll-margin-top compensa el header sticky (h-14) para que al hacer
      // scroll a la sección no quede tapada por el header.
      className="relative px-4 sm:px-6 lg:px-8 py-32 border-t border-rule-dark scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-x-12 gap-y-6 items-baseline mb-16">
          <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50">
            <span className="block opacity-100 mb-2">Section</span>
            <span className="font-display font-medium text-5xl tracking-tight-4 text-signal opacity-100 leading-none">
              05
            </span>
          </p>
          <div>
            <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-6">
              {dict.contact.eyebrow}
            </p>
            <h2 className="font-display font-medium tracking-tight-3 leading-[1.05] text-[clamp(2.25rem,5vw,4.5rem)] text-balance">
              {dict.contact.title}
            </h2>
            <p className="mt-6 font-sans text-lg sm:text-xl text-paper opacity-70 max-w-2xl leading-relaxed">
              {dict.contact.lead}
            </p>
          </div>
        </div>

        {/* Skeleton del form — T17 reemplaza este bloque con <ContactForm /> */}
        <div className="md:ml-[132px] max-w-xl">
          <div className="bg-ink-2 border border-dashed border-rule-dark rounded-sm p-10 text-center">
            <p className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-40">
              {dict.contact.formPlaceholder}
            </p>
            <p className="mt-4 font-sans text-sm text-paper opacity-50">
              {/* email mailto link como fallback hasta que el form esté listo */}
              <a
                href="mailto:hello@vizcaia.com?subject=Project%20inquiry"
                className="text-signal hover:text-signal-2 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                hello@vizcaia.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
