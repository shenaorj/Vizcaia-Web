import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Input estándar para forms.
 * Borde 1px sobre ink-2, focus ring signal con offset 2px.
 * Placeholder con opacity baja para distinguir vs valor real.
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      'flex h-10 w-full bg-ink-2 border border-ink-3 px-3 py-2',
      'font-sans text-sm text-paper placeholder:text-paper placeholder:opacity-30',
      'transition-colors',
      'hover:border-ink-4',
      'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal',
      'focus:border-signal/40 focus:bg-ink',
      'disabled:opacity-40 disabled:pointer-events-none',
      'aria-invalid:border-flare aria-invalid:focus-visible:outline-flare',
      'rounded-sm',
      className,
    )}
    {...props}
  />
));

Input.displayName = 'Input';
