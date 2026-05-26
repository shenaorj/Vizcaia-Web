/**
 * Mark "The Spark" — logo recomendado del brand manual.
 * SVG inline para que herede `currentColor` y no necesite fetch adicional.
 *
 * En T7 se refina (versiones para favicon, OG image, etc.) — esta es la versión
 * mínima funcional para usar en el Header.
 */
export function MarkSpark({
  size = 24,
  className,
  ariaLabel,
}: {
  size?: number;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role={ariaLabel ? 'img' : undefined}
      aria-label={ariaLabel}
      aria-hidden={ariaLabel ? undefined : true}
    >
      {/* Chevron V — del brand manual */}
      <path
        d="M14 22 L60 102 L106 22"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
      {/* Spark line — la línea de ignición */}
      <line
        x1="78"
        y1="62"
        x2="106"
        y2="62"
        stroke="currentColor"
        strokeWidth="14"
        strokeLinecap="square"
      />
    </svg>
  );
}
