import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
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

  // Hace que `locale` esté disponible vía contexto cuando lo necesitemos.
  // Por ahora, los components hijos reciben el dict via props del page.
  return <LocaleContent locale={locale}>{children}</LocaleContent>;
}

function LocaleContent({ children }: { locale: Locale; children: React.ReactNode }) {
  // Aquí en T5 vamos a meter Header (con LanguageSwitcher) y Footer envolviendo {children}.
  return <>{children}</>;
}
