import type { MetadataRoute } from 'next';

/**
 * Sitemap dinámico — solo páginas indexables.
 * Las privacy policies están `noindex` (sec T20) → NO se incluyen aquí.
 * `alternates.languages` declara las versiones EN/ES para hreflang.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vizcaia.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languages = {
    en: `${BASE_URL}/en`,
    es: `${BASE_URL}/es`,
  };

  return [
    {
      url: `${BASE_URL}/en`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 1.0,
      alternates: { languages },
    },
    {
      url: `${BASE_URL}/es`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: { languages },
    },
  ];
}
