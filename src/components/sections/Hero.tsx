import { HeroCanvas } from '@/components/HeroCanvas';
import { ButtonLink } from '@/components/ui/button';
import type { Dictionary } from '@/lib/dictionaries';

/**
 * Hero del website Vizcaia.
 *
 * Capas (z-index implícito por orden de DOM):
 *   1. CSS fallback grid (background-image linear-gradient — funciona sin JS).
 *   2. Canvas interactivo (client component, mount post-hydration).
 *   3. Contenido semántico (eyebrow + h1 + subtitle + CTA).
 *
 * HeroCanvas tiene `'use client'` y todo su trabajo vive en `useEffect`. SSR
 * renderiza un `<canvas>` vacío (no bloquea LCP); al hidratar, el effect monta
 * el algoritmo. El bundle del componente + lib viaja en chunk separado del cliente.
 * Si JS falla, el fallback CSS grid se queda visible.
 */

const FALLBACK_GRID_STYLE: React.CSSProperties = {
  // Misma vibe que el "Faint grid behind hero" del manual de marca
  // (~/Documents/Vizcaia/Manual Marca Vizcaia/styles.css → .hero::before)
  backgroundImage:
    'linear-gradient(to right, rgba(255,255,255,0.025) 1px, transparent 1px),' +
    'linear-gradient(to bottom, rgba(255,255,255,0.025) 1px, transparent 1px)',
  backgroundSize: '80px 80px',
};

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section
      // Alto: ~viewport menos header (h-14 = 3.5rem)
      className="relative isolate min-h-[calc(100vh-3.5rem)] flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* 1. CSS fallback grid — visible sin JS / antes de hidratar canvas */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={FALLBACK_GRID_STYLE}
      />

      {/* 2. Canvas interactivo (lazy) — se monta encima del fallback */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <HeroCanvas className="w-full h-full" />
      </div>

      {/* 3. Contenido semántico */}
      <div className="relative z-10 max-w-5xl mx-auto w-full py-24">
        <p className="font-mono text-xs tracking-wide-16 uppercase text-signal opacity-70 mb-8">
          Software studio · USA · LATAM
        </p>

        <h1 className="font-display font-medium tracking-tight-5 leading-[0.95] text-[clamp(3rem,9vw,8rem)]">
          A foundry for <em className="font-serif italic text-signal">intelligence</em>.
        </h1>

        <p className="mt-8 font-sans text-lg sm:text-xl text-paper opacity-70 max-w-2xl leading-relaxed">
          {dict.hero.subtitle}
        </p>

        <div className="mt-12">
          <ButtonLink href="#contact" variant="primary" size="lg">
            {dict.hero.cta} →
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
