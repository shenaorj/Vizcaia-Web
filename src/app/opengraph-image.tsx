import { ImageResponse } from 'next/og';

/**
 * Open Graph image (1200×630) — la imagen que aparece al compartir
 * vizcaia.com en LinkedIn / Twitter / Slack / iMessage.
 *
 * Generada dinámicamente por Next 16 con `next/og` (sin necesidad de un PNG estático).
 * Composición: fondo ink + grid sutil + Mark Spark grande + tagline.
 *
 * Cache: Next sirve esto con `Cache-Control` automático (immutable durante el deploy).
 */

export const alt = 'Vizcaia — A foundry for intelligence';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OGImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#0A0F0C',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        // Grid sutil del brand manual como background image
        backgroundImage:
          'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px),' +
          'linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }}
    >
      {/* Top: eyebrow */}
      <div
        style={{
          color: '#00E37A',
          fontSize: 18,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'flex',
        }}
      >
        Vizcaia · Software studio
      </div>

      {/* Middle: Mark + Tagline */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
        }}
      >
        {/* Mark Spark */}
        <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
          <title>Vizcaia</title>
          <path
            d="M14 22 L60 102 L106 22"
            stroke="#00E37A"
            strokeWidth="14"
            strokeLinecap="square"
            strokeLinejoin="miter"
            fill="none"
          />
          <line
            x1="78"
            y1="62"
            x2="106"
            y2="62"
            stroke="#00E37A"
            strokeWidth="14"
            strokeLinecap="square"
          />
        </svg>

        <div
          style={{
            color: '#F4F1E8',
            fontSize: 96,
            letterSpacing: -3,
            lineHeight: 1.0,
            fontWeight: 500,
            display: 'flex',
          }}
        >
          A foundry for intelligence.
        </div>

        <div
          style={{
            color: '#F4F1E8',
            opacity: 0.7,
            fontSize: 32,
            letterSpacing: -0.5,
            lineHeight: 1.3,
            fontWeight: 400,
            display: 'flex',
            maxWidth: 800,
          }}
        >
          AI agents and automations that ship to production. Not demos.
        </div>
      </div>

      {/* Bottom: URL */}
      <div
        style={{
          color: '#F4F1E8',
          opacity: 0.5,
          fontSize: 18,
          letterSpacing: 4,
          textTransform: 'uppercase',
          fontWeight: 500,
          display: 'flex',
        }}
      >
        vizcaia.com
      </div>
    </div>,
    { ...size },
  );
}
