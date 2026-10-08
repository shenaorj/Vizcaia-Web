import type { Route } from 'next';
import Link from 'next/link';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_PHONE_E164 } from '@/lib/contact';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';
import { MarkSpark } from '../MarkSpark';

/**
 * Footer global — visible en todas las páginas.
 * 3 columnas en desktop, stack en mobile.
 * Privacy link cambia slug según locale (`/en/privacy` vs `/es/aviso-de-privacidad`).
 *
 * Email y teléfono vienen de `@/lib/contact` (única fuente).
 */
export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const privacyPath = (locale === 'en' ? '/en/privacy' : '/es/aviso-de-privacidad') as Route;

  return (
    <footer className="bg-ink-2 border-t border-rule-dark text-paper mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Brand column */}
          <div>
            <Link
              href={`/${locale}` as Route}
              className="inline-flex items-center gap-2 mb-3 text-paper hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
              aria-label="Vizcaia — home"
            >
              <MarkSpark size={24} />
              <span className="font-display text-lg font-medium tracking-tight-2">vizcaia</span>
            </Link>
            <p className="font-mono text-[10px] tracking-wide-16 uppercase opacity-70 mt-2">
              {dict.footer.tagline}
            </p>
          </div>

          {/* Links column */}
          <div>
            <p className="font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-65 mb-3">
              {dict.footer.linksLabel}
            </p>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <Link
                  href={privacyPath}
                  className="hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  {dict.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <p className="font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-65 mb-3">
              {dict.footer.contactLabel}
            </p>
            <ul className="space-y-2 font-sans text-sm">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="break-all hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT_PHONE_E164}`}
                  className="hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-rule-dark flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <p className="font-mono text-[10px] tracking-wide-16 uppercase opacity-65">
            {dict.footer.copyright}
          </p>
          <p className="font-mono text-[10px] tracking-wide-16 uppercase opacity-65">
            {dict.footer.location}
          </p>
        </div>
      </div>
    </footer>
  );
}
