import type { Locale } from './i18n';

/**
 * Helpers de cookies del cliente (`document.cookie`).
 * Solo usar en client components — en server lee con `cookies()` de next/headers.
 */

const LOCALE_COOKIE = 'vz_locale';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function setLocaleCookie(locale: Locale): void {
  if (typeof document === 'undefined') return;
  // biome-ignore lint/suspicious/noDocumentCookie: Cookie Store API is experimental; document.cookie is universal and adecuado para este use case (1 cookie, no transactional).
  document.cookie = `${LOCALE_COOKIE}=${locale}; max-age=${ONE_YEAR_SECONDS}; path=/; SameSite=Lax`;
}

export function getLocaleCookie(): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`));
  return match?.[1] ? decodeURIComponent(match[1]) : null;
}
