import { type NextRequest, NextResponse } from 'next/server';
import { defaultLocale } from '@/lib/i18n';

/**
 * Middleware del website.
 *
 * Responsabilidad única en v1: redirigir `/` → `/${defaultLocale}` (que es `/en`,
 * según ADR-008 — target USA primario). Las rutas `/en/*` y `/es/*` las maneja
 * el segment `[locale]`. Rutas con primer segmento que no sea locale soportado
 * caen al `not-found` de Next.
 *
 * Más adelante, esta función puede crecer para:
 *  - Detectar `Accept-Language: es*` y redirigir primer visit a `/es`.
 *  - Leer cookie `vz_locale` para persistir preferencia del LanguageSwitcher.
 *  - Geo-IP routing (probablemente innecesario).
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === '/') {
    const url = request.nextUrl.clone();
    url.pathname = `/${defaultLocale}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // No correr middleware en assets estáticos, _next, ni archivos públicos.
  matcher: ['/((?!_next|api|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\..*).*)'],
};
