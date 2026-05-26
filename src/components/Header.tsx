import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MarkSpark } from './MarkSpark';

/**
 * Header sticky en top con backdrop blur.
 * Server component — el LanguageSwitcher anidado es client.
 */
export function Header({ locale }: { locale: Locale }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-ink/70 border-b border-rule-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
        <Link
          href={`/${locale}`}
          aria-label="Vizcaia — home"
          className="flex items-center gap-2 text-paper hover:text-signal transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal"
        >
          <MarkSpark size={22} />
          <span className="font-display text-lg font-medium tracking-tight-2">vizcaia</span>
        </Link>
        <LanguageSwitcher current={locale} />
      </div>
    </header>
  );
}
