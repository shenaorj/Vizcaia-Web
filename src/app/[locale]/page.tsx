import { notFound } from 'next/navigation';
import { Contact } from '@/components/sections/Contact';
import { Hero } from '@/components/sections/Hero';
import { Manifesto } from '@/components/sections/Manifesto';
import { Principles } from '@/components/sections/Principles';
import { Services } from '@/components/sections/Services';
import { Work } from '@/components/sections/Work';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale } from '@/lib/i18n';

/**
 * Home — one-pager Vizcaia v1.
 *
 * Secciones en orden:
 *   Hero → Manifesto → Services → Principles → Work → Contact → (Footer en layout)
 *
 * El Hero ocupa ~viewport. Cada sección posterior tiene padding generoso
 * (py-32) con borde superior rule-dark — efecto "capítulos" editorial.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="font-sans">
      <Hero dict={dict} />
      <Manifesto dict={dict} />
      <Services dict={dict} />
      <Principles dict={dict} />
      <Work dict={dict} />
      <Contact locale={locale} dict={dict} />
    </main>
  );
}
