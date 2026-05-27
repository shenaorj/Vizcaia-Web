import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { cn } from '@/lib/cn';

/**
 * Button — variantes y tamaños alineados al brand manual.
 *
 * Tipografía mono uppercase con tracking ancho — sello visual del manual ("CTA labels").
 * Focus ring color signal con offset (4px) para que destaque sin tapar contenido.
 *
 * - primary:   bg-signal sobre ink. CTA principal.
 * - secondary: outline paper. CTA secundario.
 * - ghost:     solo texto signal. Links inline o navegación discreta.
 */
const buttonVariants = cva(
  [
    'inline-flex items-center justify-center gap-2',
    'font-mono uppercase tracking-wide-16 font-medium',
    'transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal',
    'disabled:opacity-40 disabled:pointer-events-none',
    'whitespace-nowrap rounded-sm',
  ].join(' '),
  {
    variants: {
      variant: {
        primary: 'bg-signal text-ink hover:bg-signal-2',
        secondary:
          'border border-paper text-paper hover:bg-paper hover:text-ink hover:border-paper',
        ghost: 'text-signal hover:text-signal-2',
      },
      size: {
        sm: 'h-8 px-3 text-[10px]',
        md: 'h-10 px-5 text-xs',
        lg: 'h-12 px-7 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, type = 'button', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  ),
);

Button.displayName = 'Button';

/**
 * Variante para anchors (`<a>`) — para CTAs que llevan a otra URL o sección
 * (smooth scroll, `mailto:`, link externo). Reusa exactamente los mismos
 * variants que Button para visual consistente.
 */
export type ButtonLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

export const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
  ({ className, variant, size, ...props }, ref) => (
    <a ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />
  ),
);

ButtonLink.displayName = 'ButtonLink';

export { buttonVariants };
