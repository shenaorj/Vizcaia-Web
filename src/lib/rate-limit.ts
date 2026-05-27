/**
 * Rate limiter en memoria por IP — simple y efectivo para v1.
 *
 * Map<IP, [count, windowStartMs]>.
 * Se resetea al reiniciar el container. Aceptable: el form de contacto no es banking.
 *
 * Si v2 quiere persistencia (ej. en cluster con múltiples instancias), migrar a
 * Upstash Redis (env var URL + 5 LOC).
 */

const buckets = new Map<string, { count: number; windowStartMs: number }>();

/**
 * Devuelve `true` si la request está permitida; `false` si excede el límite.
 *
 * @param ip               clave (típicamente IP).
 * @param maxPerWindow     máximo de requests en una ventana.
 * @param windowSeconds    duración de la ventana en segundos.
 */
export function checkRateLimit(ip: string, maxPerWindow: number, windowSeconds: number): boolean {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const bucket = buckets.get(ip);

  if (!bucket || now - bucket.windowStartMs > windowMs) {
    // Primera request o ventana expirada
    buckets.set(ip, { count: 1, windowStartMs: now });
    return true;
  }

  if (bucket.count >= maxPerWindow) {
    return false;
  }

  bucket.count += 1;
  return true;
}

/**
 * Cleanup periódico de buckets viejos. Llamar opcionalmente al startup del servidor.
 * Sin cleanup el Map crece con cada IP única; no es leak grave, pero ordenado.
 */
export function cleanupRateLimitBuckets(windowSeconds: number): void {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  for (const [ip, bucket] of buckets) {
    if (now - bucket.windowStartMs > windowMs) {
      buckets.delete(ip);
    }
  }
}
