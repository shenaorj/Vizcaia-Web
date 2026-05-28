import type { Metadata } from 'next';
import { Geist, Geist_Mono, Instrument_Serif, Space_Grotesk } from 'next/font/google';
import { CloudflareAnalytics } from '@/components/CloudflareAnalytics';
import './globals.css';

/**
 * Fuentes del brand manual de Vizcaia.
 *
 * `next/font/google` descarga las fuentes en build-time desde Google Fonts y las
 * sirve desde nuestro propio bundle (self-hosted, sin runtime CDN). Subset Latin
 * estricto. `display: swap` para FCP rápido + fallback visible mientras carga.
 *
 * Las variables CSS (`--font-*-loaded`) se conectan al `@theme` en globals.css.
 */

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600'],
  variable: '--font-space-grotesk-loaded',
  display: 'swap',
});

const geist = Geist({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-geist-loaded',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-geist-mono-loaded',
  display: 'swap',
});

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['italic'],
  variable: '--font-instrument-serif-loaded',
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vizcaia.com';

export const metadata: Metadata = {
  title: 'Vizcaia — A foundry for intelligence',
  description:
    'We build AI agents and automations for US mid-market companies. Production-grade, not demos.',
  metadataBase: new URL(SITE_URL),
};

/**
 * Schema.org Organization JSON-LD — ayuda a Google a entender qué somos.
 * Aparece en Knowledge Graph cuando alguien busca "Vizcaia Technologies".
 */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Vizcaia Technologies',
  legalName: 'Vizcaia Technologies',
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  description:
    'Software studio building AI agents and production software for engineering and operations teams. Systems that ship, not pilots that stall.',
  slogan: 'A foundry for intelligence',
  foundingDate: '2026-05',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Miami',
    addressRegion: 'FL',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: 'hello@vizcaia.com',
    availableLanguage: ['en', 'es'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    spaceGrotesk.variable,
    geist.variable,
    geistMono.variable,
    instrumentSerif.variable,
  ].join(' ');

  return (
    <html lang="en" className={fontVars}>
      <head>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON.stringify is safe — no user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <CloudflareAnalytics />
      </body>
    </html>
  );
}
