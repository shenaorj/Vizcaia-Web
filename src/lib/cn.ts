import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combina classNames con clsx (manejo de condicionales) + tailwind-merge
 * (resuelve conflictos de Tailwind, ej. `p-2` + `p-4` → `p-4`).
 *
 * Uso estándar:
 *   cn('p-4', condicion && 'bg-signal', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
