import { ImageResponse } from 'next/og';

/**
 * Favicon dinámico (32×32) — Mark "The Spark" sobre fondo ink.
 * Next 16 detecta este archivo y lo sirve como `/icon` con cache.
 */
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
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
        width="22"
        height="22"
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
