'use client';

import type { Route } from 'next';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { setLocaleCookie } from '@/lib/cookies';
import { type Locale, locales } from '@/lib/i18n';

/**
 * Switcher entre EN | ES.
 * - Cambia el primer segmento del path (`/en/...` ↔ `/es/...`).
 * - Persiste preferencia en cookie `vz_locale` por 1 año.
 * - Mantiene el resto del path (si estás en `/es/aviso-de-privacidad` y haces switch a EN,
 *   va a `/en/aviso-de-privacidad`. Si esa ruta no existe en EN, el `/en/privacy`
 *   estará en su lugar — T20 mapea slugs asimétricos).
 */
export function LanguageSwitcher({ current }: { current: Locale }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(target: Locale) {
    if (target === current) return;
    setLocaleCookie(target);
    const segments = pathname.split('/');
    if (segments[1] && (locales as readonly string[]).includes(segments[1])) {
      segments[1] = target;
    } else {
      segments.splice(1, 0, target);
    }
    const nextPath = segments.join('/') || `/${target}`;
    // typedRoutes está activo: las rutas son tipos literales (`/en`, `/es`, ...).
    // Como construimos el path dinámicamente, cast a `Route`.
    router.push(nextPath as Route);
  }

  return (
    <nav
      aria-label="Language"
      className="font-mono text-xs tracking-wide-16 uppercase flex items-center"
    >
      {locales.map((loc, i) => (
        <Fragment key={loc}>
          <button
            type="button"
            onClick={() => switchTo(loc)}
            aria-current={loc === current ? 'true' : undefined}
            aria-label={`Switch to ${loc.toUpperCase()}`}
            className={
              loc === current
                ? 'text-signal'
                : 'text-paper opacity-50 hover:opacity-100 transition-opacity focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal'
            }
          >
            {loc.toUpperCase()}
          </button>
          {i < locales.length - 1 && <span className="mx-2 opacity-30">|</span>}
        </Fragment>
      ))}
    </nav>
  );
}
