'use client';

import { useEffect, useRef } from 'react';
import { buildGrid, drawGrid, drawStaticGrid, stepGrid, type Vertex } from '@/lib/canvas-grid';

/**
 * Hero canvas — versión T10 interactiva.
 *
 * Features:
 *   - Grid distorsionada por la posición del cursor (gravity-well local).
 *   - 60 fps con `requestAnimationFrame`.
 *   - Auto-pause cuando el mouse está inactivo por >2s (CPU 0 idle).
 *   - Intersection observer pausa el loop cuando el hero NO está visible.
 *   - DPR aware (Retina-crisp).
 *   - Responsive con ResizeObserver.
 *   - Detecta `(hover: none)` (touch) y `prefers-reduced-motion` → render estático sin loop.
 */
export function HeroCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Estado mutable que vive solo durante la vida del effect.
    let vertices: Vertex[] = [];
    let logicalWidth = 0;
    let logicalHeight = 0;
    const mouse = { x: 0, y: 0, active: false };
    let rafId: number | null = null;
    let lastMouseMoveTs = 0;
    let isVisible = true;

    const isTouch = window.matchMedia('(hover: none)').matches;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const staticMode = isTouch || reducedMotion;

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.scale(dpr, dpr);

      logicalWidth = rect.width;
      logicalHeight = rect.height;

      vertices = buildGrid(logicalWidth, logicalHeight);

      if (staticMode) {
        drawStaticGrid(ctx, logicalWidth, logicalHeight);
      }
    }

    function loop() {
      rafId = null;
      if (!ctx || !isVisible) return;

      stepGrid(vertices, mouse);
      drawGrid(ctx, logicalWidth, logicalHeight, vertices, mouse);

      // Si el mouse lleva inactivo >2s y los vértices ya casi regresaron a home,
      // pausamos el loop. Se reactiva al próximo mousemove.
      const now = performance.now();
      const idleMs = now - lastMouseMoveTs;
      if (!mouse.active && idleMs > 2000) {
        return; // no schedulea otro frame
      }
      if (mouse.active && idleMs > 100) {
        // Pasaron >100ms sin mouse move → consideramos cursor "soltado" pero seguimos
        // animando para que los vértices regresen suavemente a home.
        mouse.active = false;
      }
      rafId = requestAnimationFrame(loop);
    }

    function kick() {
      if (rafId !== null) return;
      rafId = requestAnimationFrame(loop);
    }

    function onMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      // Solo react al cursor cuando está sobre el canvas (no globalmente).
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        mouse.active = false;
        return;
      }
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
      lastMouseMoveTs = performance.now();
      kick();
    }

    function onMouseLeave() {
      mouse.active = false;
      lastMouseMoveTs = performance.now();
      kick(); // que decay regrese vértices a home
    }

    resize();

    // En modo estático no enganchamos mouse ni rAF.
    if (!staticMode) {
      window.addEventListener('mousemove', onMouseMove);
      canvas.addEventListener('mouseleave', onMouseLeave);
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (!staticMode) kick();
    });
    resizeObserver.observe(canvas);

    // IntersectionObserver pausa el loop cuando el hero no está visible.
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        // biome-ignore lint/style/noNonNullAssertion: el observer siempre llama con al menos 1 entry.
        isVisible = entries[0]!.isIntersecting;
        if (isVisible && !staticMode) kick();
      },
      { threshold: 0.01 },
    );
    intersectionObserver.observe(canvas);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
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
