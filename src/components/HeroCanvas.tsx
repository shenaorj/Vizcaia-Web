'use client';

import { useEffect, useRef } from 'react';
import { drawStaticGrid } from '@/lib/canvas-grid';

/**
 * Canvas del hero — versión T9 estática (grid sin distorsión).
 * En T10 se agrega mouse tracking + algoritmo de distorsión local.
 *
 * Implementación:
 *   - `<canvas>` con `aria-hidden="true"` (decorativo, no contenido semántico).
 *   - `ResizeObserver` re-dibuja al cambiar el tamaño del contenedor (responsive).
 *   - DPR awareness: canvas.width = rect.width * devicePixelRatio para nitidez
 *     en pantallas Retina; scale del contexto para mantener coords lógicas.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function render() {
      // Type narrowing dentro del closure (canvas y ctx ya verificados arriba).
      if (!canvas || !ctx) return;

      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;

      // Cambiar canvas.width/height resetea TODO el estado del contexto.
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, rect.width, rect.height);
      drawStaticGrid(ctx, rect.width, rect.height);
    }

    render();

    const observer = new ResizeObserver(render);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      // Decorativo: no focusable (no interactivo) y oculto para screen readers.
      tabIndex={-1}
    />
  );
}
