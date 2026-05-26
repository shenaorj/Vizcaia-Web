import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale, type Locale, locales } from '@/lib/i18n';

/**
 * Pre-renderiza una versión por cada locale en build (static generation).
 */
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const dict = await getDictionary(locale);
  return {
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        es: '/es',
        'x-default': '/en',
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <LocaleShell locale={locale} skipToContentLabel={dict.common.skipToContent}>
      {children}
    </LocaleShell>
  );
}

function LocaleShell({
  locale,
  skipToContentLabel,
  children,
}: {
  locale: Locale;
  skipToContentLabel: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-signal focus:text-ink focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-wide-16 focus:uppercase focus:rounded-sm"
      >
        {skipToContentLabel}
      </a>
      <Header locale={locale} />
      <div id="main">{children}</div>
      {/* Footer va en T8 */}
    </>
  );
}
