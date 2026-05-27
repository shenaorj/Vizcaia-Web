import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://vizcaia.com';

/**
 * `robots.txt` generado dinámicamente.
 *
 * `disallow: /api/` evita que crawlers golpeen el endpoint de contacto.
 * Las privacy pages tienen `noindex` en su `<meta robots>` — NO las pongo en
 * disallow porque los visitantes humanos sí deben poder leerlas.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
