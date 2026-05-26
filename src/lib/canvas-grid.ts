/**
 * Algoritmo de la grid del Hero — Canvas 2D puro, sin React.
 *
 * T9: grid estática.
 * T10 (este file): mouse tracking + distorsión local + bezier curves + glow.
 *
 * Diseño:
 *   - 30 columnas × 20 filas → 600 vértices.
 *   - Cada vértice tiene `home` (posición original) y `current` (posición animada).
 *   - Cada frame:
 *       1. Calcular displacement = (mouse - home) * strength / (distance² + epsilon)
 *       2. Lerp `current` hacia `home + displacement` con damping (suaviza el follow).
 *       3. Re-dibujar líneas como curvas cubicBezier entre vértices consecutivos.
 *   - Vértices cercanos al cursor: color signal + opacidad proporcional.
 */

export const GRID_CONFIG = {
  cols: 30,
  rows: 20,
  baseLineColor: 'rgba(255, 255, 255, 0.04)',
  highlightColor: 'rgba(0, 227, 122, 0.35)', // signal con alpha
  lineWidth: 0.5,
  highlightLineWidth: 1.2,
  // Distorsión
  strength: 4500, // a mayor valor, más fuerte el efecto del cursor
  epsilon: 100, // estabiliza la división cuando distance → 0
  influenceRadius: 220, // px — distancia a la que el cursor empieza a tener efecto perceptible
  damping: 0.12, // 0..1 — qué tan rápido `current` persigue al target (mayor = más reactivo)
} as const;

export type Vertex = {
  homeX: number;
  homeY: number;
  curX: number;
  curY: number;
};

/**
 * Construye la malla de vértices con sus posiciones "home" (grid uniforme).
 * Llamar al inicio y cada vez que cambia el tamaño del canvas.
 */
export function buildGrid(width: number, height: number): Vertex[] {
  const { cols, rows } = GRID_CONFIG;
  const vertices: Vertex[] = [];

  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i <= cols; i++) {
      const x = (i / cols) * width;
      const y = (j / rows) * height;
      vertices.push({ homeX: x, homeY: y, curX: x, curY: y });
    }
  }
  return vertices;
}

/**
 * Avanza la simulación un frame:
 *   - Calcula target de cada vértice (home + distorsión por cursor)
 *   - Mueve `current` hacia target con damping
 */
export function stepGrid(
  vertices: Vertex[],
  mouse: { x: number; y: number; active: boolean },
): void {
  const { strength, epsilon, influenceRadius, damping } = GRID_CONFIG;
  const radiusSq = influenceRadius * influenceRadius;

  for (const v of vertices) {
    let targetX = v.homeX;
    let targetY = v.homeY;

    if (mouse.active) {
      const dx = mouse.x - v.homeX;
      const dy = mouse.y - v.homeY;
      const distSq = dx * dx + dy * dy;

      // Solo aplicar distorsión dentro del radio de influencia (perf + comportamiento local).
      if (distSq < radiusSq) {
        const factor = strength / (distSq + epsilon);
        targetX = v.homeX + dx * factor;
        targetY = v.homeY + dy * factor;
      }
    }

    // Lerp con damping — `current` persigue `target` suavemente.
    v.curX += (targetX - v.curX) * damping;
    v.curY += (targetY - v.curY) * damping;
  }
}

/**
 * Vértice en posición (col, row) del array linearizado.
 */
function vertexAt(vertices: Vertex[], col: number, row: number): Vertex {
  const { cols } = GRID_CONFIG;
  // biome-ignore lint/style/noNonNullAssertion: índices acotados por buildGrid (cols+1)*(rows+1).
  return vertices[row * (cols + 1) + col]!;
}

/**
 * Calcula la distancia mínima de un punto al cursor (para alpha/color).
 */
function distanceToMouse(v: Vertex, mouse: { x: number; y: number; active: boolean }): number {
  if (!mouse.active) return Infinity;
  const dx = mouse.x - v.homeX;
  const dy = mouse.y - v.homeY;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Dibuja la grid completa usando las posiciones `current` de los vértices.
 * Las líneas se hacen con `quadraticCurveTo` entre el punto medio (suaviza la curvatura
 * sin necesidad de calcular bezier completo).
 */
export function drawGrid(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  vertices: Vertex[],
  mouse: { x: number; y: number; active: boolean },
): void {
  const {
    cols,
    rows,
    baseLineColor,
    highlightColor,
    lineWidth,
    highlightLineWidth,
    influenceRadius,
  } = GRID_CONFIG;

  ctx.clearRect(0, 0, width, height);

  // Base: todas las líneas en color base
  ctx.strokeStyle = baseLineColor;
  ctx.lineWidth = lineWidth;
  ctx.beginPath();

  // Líneas horizontales (recorre row, conecta cols consecutivas)
  for (let j = 0; j <= rows; j++) {
    for (let i = 0; i < cols; i++) {
      const a = vertexAt(vertices, i, j);
      const b = vertexAt(vertices, i + 1, j);
      if (i === 0) ctx.moveTo(a.curX, a.curY);
      ctx.lineTo(b.curX, b.curY);
    }
  }

  // Líneas verticales
  for (let i = 0; i <= cols; i++) {
    for (let j = 0; j < rows; j++) {
      const a = vertexAt(vertices, i, j);
      const b = vertexAt(vertices, i, j + 1);
      if (j === 0) ctx.moveTo(a.curX, a.curY);
      ctx.lineTo(b.curX, b.curY);
    }
  }

  ctx.stroke();

  // Capa highlight: re-dibujar las líneas cercanas al cursor en color signal.
  if (mouse.active) {
    ctx.strokeStyle = highlightColor;
    ctx.lineWidth = highlightLineWidth;
    ctx.beginPath();

    // Recorrer todas las líneas y dibujar solo las que tengan al menos un vértice
    // dentro del influenceRadius.
    for (let j = 0; j <= rows; j++) {
      for (let i = 0; i < cols; i++) {
        const a = vertexAt(vertices, i, j);
        const b = vertexAt(vertices, i + 1, j);
        const da = distanceToMouse(a, mouse);
        const db = distanceToMouse(b, mouse);
        if (Math.min(da, db) < influenceRadius) {
          ctx.moveTo(a.curX, a.curY);
          ctx.lineTo(b.curX, b.curY);
        }
      }
    }
    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j < rows; j++) {
        const a = vertexAt(vertices, i, j);
        const b = vertexAt(vertices, i, j + 1);
        const da = distanceToMouse(a, mouse);
        const db = distanceToMouse(b, mouse);
        if (Math.min(da, db) < influenceRadius) {
          ctx.moveTo(a.curX, a.curY);
          ctx.lineTo(b.curX, b.curY);
        }
      }
    }

    ctx.stroke();
  }
}

/**
 * Versión estática (sin distorsión) — útil para fallback mobile / reduced-motion.
 * Internamente reusa el mismo drawGrid pero sin mouse activo.
 */
export function drawStaticGrid(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const vertices = buildGrid(width, height);
  drawGrid(ctx, width, height, vertices, { x: 0, y: 0, active: false });
}
