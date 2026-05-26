import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Textarea para campos de texto largo (mensaje del form).
 * Mismo styling que Input, pero min-height + resize vertical opcional.
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={cn(
        'flex min-h-32 w-full bg-ink-2 border border-ink-3 px-3 py-2',
        'font-sans text-sm text-paper placeholder:text-paper placeholder:opacity-30',
        'transition-colors resize-y',
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
  ),
);

Textarea.displayName = 'Textarea';
