import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Label para inputs.
 * Tipografía mono uppercase tracking-wide-16 — consistente con eyebrows + CTA labels.
 */
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

export const Label = forwardRef<HTMLLabelElement, LabelProps>(({ className, ...props }, ref) => (
  // biome-ignore lint/a11y/noLabelWithoutControl: reusable Label component — `htmlFor` y children los provee el consumer.
  <label
    ref={ref}
    className={cn(
      'font-mono text-[11px] tracking-wide-16 uppercase text-paper opacity-70',
      'block mb-2',
      className,
    )}
    {...props}
  />
));

Label.displayName = 'Label';
