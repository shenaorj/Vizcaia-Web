import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Checkbox HTML nativo styled con accent-color signal.
 * Para checkboxes con label, envolver en `<label className="flex items-center gap-2">`.
 */
export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>;

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      type="checkbox"
      className={cn(
        'h-4 w-4 cursor-pointer',
        // accent-color es Web standard para colorear checkbox/radio nativo
        'accent-signal',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal',
        'disabled:opacity-40 disabled:pointer-events-none',
        className,
      )}
      {...props}
    />
  ),
);

Checkbox.displayName = 'Checkbox';
