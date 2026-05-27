import type { ContactInput } from './schemas';

/**
 * Cliente mínimo de la API de Outline para crear leads.
 *
 * Reutiliza el API token guardado en env var `OUTLINE_API_TOKEN`.
 * Crea docs en la colección `OUTLINE_LEADS_COLLECTION_ID` (creada en T19).
 *
 * Si falta config → no falla el flujo (return silencioso). El email sí se manda.
 * Outline lead es bonus, no crítico.
 */

const OUTLINE_BASE_URL = 'https://outline.vizcaia.com/api';

function buildLeadMarkdown(input: ContactInput & { locale?: string }): string {
  const date = new Date().toISOString();
  return [
    `**Received**: ${date}`,
    `**Email**: ${input.email}`,
    `**Company**: ${input.company || '—'}`,
    `**Source**: ${input.source || '—'}`,
    `**Locale**: ${input.locale || '—'}`,
    '',
    '---',
    '',
    '## Message',
    '',
    input.message,
    '',
    '---',
    '',
    '## Follow-up',
    '',
    '- [ ] Respond within 24h',
    '- [ ] Schedule discovery call (if relevant)',
    '- [ ] Move to active pipeline / close as not-fit',
  ].join('\n');
}

export async function createLeadInOutline(
  input: ContactInput & { locale?: string },
): Promise<void> {
  const token = process.env.OUTLINE_API_TOKEN;
  const collectionId = process.env.OUTLINE_LEADS_COLLECTION_ID;

  if (!token || !collectionId) {
    // No falla — log y return silencioso. El email sí se mandó.
    console.warn(
      '[outline-api] OUTLINE_API_TOKEN o OUTLINE_LEADS_COLLECTION_ID faltan; skip lead creation.',
    );
    return;
  }

  const title = `${input.name}${input.company ? ` — ${input.company}` : ''} — ${new Date().toISOString().slice(0, 10)}`;
  const text = buildLeadMarkdown(input);

  const res = await fetch(`${OUTLINE_BASE_URL}/documents.create`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, text, collectionId, publish: true }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => '<unreadable>');
    console.error('[outline-api] failed to create lead', res.status, body.slice(0, 500));
    return; // siempre silencioso — no rompemos al usuario por fallo en Outline
  }
}
