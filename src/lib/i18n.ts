/**
 * i18n config para Vizcaia-Web.
 *
 * Modelo: rutas localizadas con segment `[locale]`.
 * - `vizcaia.com/en/...` → inglés (default, target USA según ADR-008)
 * - `vizcaia.com/es/...` → español (secundario, LATAM)
 *
 * El selector de idioma (T5) cambia entre estos manteniendo la cookie.
 */

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

/**
 * Type guard para validar que un string es un locale soportado.
 * Útil en `params` que viene como `string` no como `Locale`.
 */
export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/**
 * Etiqueta humana para mostrar el idioma en el selector.
 */
export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
};
