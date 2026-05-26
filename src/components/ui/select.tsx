import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Select HTML nativo styled.
 * - Mismo borde+focus que Input.
 * - Caret custom inline (SVG color signal).
 * - Para v1 evitamos Radix Select para mantener bundle bajo.
 *   Si necesitamos search/typeahead/options custom, migrar a Radix en v1.1.
 */
export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

const caret = encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path d="M3 4.5L6 7.5L9 4.5" stroke="%23F4F1E8" stroke-width="1.5" fill="none"/></svg>',
);

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, ...props }, ref) => (
    <select
      ref={ref}
      className={cn(
        'flex h-10 w-full bg-ink-2 border border-ink-3 pl-3 pr-9 py-2',
        'font-sans text-sm text-paper',
        'appearance-none cursor-pointer',
        'bg-no-repeat bg-[right_0.75rem_center]',
        'transition-colors',
        'hover:border-ink-4',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal',
        'focus:border-signal/40 focus:bg-ink',
        'disabled:opacity-40 disabled:pointer-events-none',
        'aria-invalid:border-flare aria-invalid:focus-visible:outline-flare',
        'rounded-sm',
        className,
      )}
      style={{ backgroundImage: `url("data:image/svg+xml,${caret}")` }}
      {...props}
    >
      {children}
    </select>
  ),
);

Select.displayName = 'Select';
