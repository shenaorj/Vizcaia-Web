import { NextResponse } from 'next/server';
import { sendContactEmail } from '@/lib/email';
import { createLeadInOutline } from '@/lib/outline-api';
import { checkRateLimit } from '@/lib/rate-limit';
import { ContactSchema } from '@/lib/schemas';

/**
 * POST /api/contact — recibe submit del ContactForm.
 *
 * Flow:
 *   1. Parse + validar Zod (mismo schema que frontend).
 *   2. Verificar honeypot vacío. Si tiene valor → 200 silencioso (no procesa).
 *   3. Rate limit por IP (3/hora).
 *   4. Enviar email vía Gmail SMTP a vizcaia.technologies con CC a ambos socios.
 *   5. Crear lead doc en Outline colección "Leads" (best-effort, no bloquea).
 *   6. 200 OK.
 *
 * Errors:
 *   - 400  Invalid body / schema fail.
 *   - 429  Rate limited.
 *   - 500  Email failed (no se pudo enviar SMTP).
 */
export async function POST(request: Request): Promise<Response> {
  // 1. Parse JSON
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  // 2. Validar
  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'invalid_body', issues: parsed.error.issues },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const locale =
    typeof body === 'object' && body !== null && 'locale' in body
      ? String((body as { locale?: unknown }).locale ?? '')
      : '';

  // 3. Honeypot — si tiene valor, descartar silencioso (200 falso-OK al bot).
  if (data.websiteUrl && data.websiteUrl.length > 0) {
    return NextResponse.json({ ok: true, status: 'spam_filtered' });
  }

  // 4. Rate limit por IP — 3 envíos por hora.
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(ip, 3, 3600)) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
  }

  // 5. Enviar email (crítico — si falla, devolvemos 500).
  try {
    await sendContactEmail({ ...data, locale });
  } catch (err) {
    console.error('[contact] SMTP send failed', err);
    return NextResponse.json({ ok: false, error: 'smtp_failed' }, { status: 500 });
  }

  // 6. Crear lead en Outline (bonus — no bloquea ni rompe la respuesta).
  await createLeadInOutline({ ...data, locale }).catch((err) => {
    console.error('[contact] Outline lead creation failed', err);
  });

  return NextResponse.json({ ok: true });
}
