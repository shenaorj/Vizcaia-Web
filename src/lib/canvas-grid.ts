/**
 * Algoritmo de la grid del Hero — Canvas 2D puro, sin React.
 *
 * T9: versión estática (esta).
 * T10: agrega distorsión por posición del cursor (next step).
 *
 * Diseño:
 *   - 30 columnas × 20 filas → 600 vértices (suficiente densidad sin tirar fps).
 *   - Líneas color rule-dark (rgba(255,255,255,0.04)) — apenas perceptibles,
 *     evocan "blueprint técnico" del brand manual sin gritar.
 *   - lineWidth 0.5 px — fino, no compite con el contenido del Hero.
 */

export const GRID_CONFIG = {
  cols: 30,
  rows: 20,
  lineColor: 'rgba(255, 255, 255, 0.04)',
  lineWidth: 0.5,
} as const;

/**
 * Dibuja la grid completa (líneas verticales + horizontales) sobre el contexto.
 * Asume que el caller ya hizo `clearRect` y configuró `scale` para DPR.
 */
export function drawStaticGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const { cols, rows, lineColor, lineWidth } = GRID_CONFIG;

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  // Líneas verticales
  for (let i = 0; i <= cols; i++) {
    const x = (i / cols) * width;
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
  }

  // Líneas horizontales
  for (let j = 0; j <= rows; j++) {
    const y = (j / rows) * height;
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
  }

  // Un solo stroke para todo el path — más eficiente que `stroke()` por línea.
  ctx.stroke();
}
