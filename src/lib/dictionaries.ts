import type { Locale } from './i18n';

/**
 * Diccionarios cargados dinámicamente (server-side).
 * Cada locale es un import lazy que se resuelve solo cuando se necesita.
 * Esto mantiene el bundle del cliente pequeño (no se envía el JSON al browser).
 */
const dictionaries = {
  en: () => import('@/messages/en.json').then((m) => m.default),
  es: () => import('@/messages/es.json').then((m) => m.default),
} as const;

/**
 * Forma del diccionario derivada del archivo `en.json` (la fuente de verdad
 * de la estructura — `es.json` debe matchear las mismas keys).
 */
export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['en']>>;

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
