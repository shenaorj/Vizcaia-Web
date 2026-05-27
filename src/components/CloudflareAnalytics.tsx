/**
 * Cloudflare Web Analytics — cookieless, privacy-friendly, gratis.
 *
 * Se renderiza solo en producción cuando hay `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN`.
 * En dev o sin token, retorna null (no llama a ningún tercero).
 *
 * Cómo obtener el token:
 *   1. https://dash.cloudflare.com → Web Analytics → Add a site → `vizcaia.com`.
 *   2. Cloudflare genera un beacon (snippet HTML con `data-cf-beacon='{...}'`).
 *   3. Extraer el `token` del JSON y pegar como env var en Coolify:
 *      `NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN=xxxx`
 *
 * No usamos cookies → no aplica banner de cookies/consent.
 */
export function CloudflareAnalytics() {
  const token = process.env.NEXT_PUBLIC_CLOUDFLARE_ANALYTICS_TOKEN;
  const isProd = process.env.NODE_ENV === 'production';

  if (!token || !isProd) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
