import { ImageResponse } from 'next/og';

/**
 * Apple touch icon (180×180) — para iOS Home Screen / Add to Home.
 * Mismo diseño que el favicon pero mayor tamaño.
 */
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        background: '#0A0F0C',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Vizcaia</title>
        <path
          d="M14 22 L60 102 L106 22"
          stroke="#00E37A"
          strokeWidth="14"
          strokeLinecap="square"
          strokeLinejoin="miter"
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
    </div>,
    { ...size },
  );
}
