import nodemailer from 'nodemailer';
import type { ContactInput } from './schemas';

/**
 * Transporter de SMTP — Gmail App Password de `vizcaia.technologies@gmail.com`.
 * Mismo App Password que usa Outline (centralizado en Coolify Env Vars).
 *
 * En dev local, este transporter solo funciona si las env vars están en `.env.local`:
 *   SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD
 *
 * En producción, Coolify carga las env vars del panel.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USERNAME;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !port || !user || !pass) {
    throw new Error(
      'SMTP env vars missing. Required: SMTP_HOST, SMTP_PORT, SMTP_USERNAME, SMTP_PASSWORD',
    );
  }

  return nodemailer.createTransport({
    host,
    port: Number(port),
    secure: false, // STARTTLS en puerto 587
    auth: { user, pass },
  });
}

function formatPlainText(input: ContactInput & { locale?: string }): string {
  return [
    `New contact from vizcaia.com`,
    ``,
    `Name:    ${input.name}`,
    `Email:   ${input.email}`,
    `Company: ${input.company || '—'}`,
    `Source:  ${input.source || '—'}`,
    `Locale:  ${input.locale || '—'}`,
    ``,
    `Message:`,
    input.message,
    ``,
    `---`,
    `Reply directly to this email to respond to the lead.`,
  ].join('\n');
}

function formatHtml(input: ContactInput & { locale?: string }): string {
  const safe = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

  return `<!doctype html><html><body style="font-family:system-ui,sans-serif;line-height:1.5;color:#0A0F0C">
  <h2 style="font-size:18px;margin:0 0 16px">New contact from <strong>vizcaia.com</strong></h2>
  <table style="border-collapse:collapse;font-size:14px">
    <tr><td style="padding:4px 12px 4px 0;color:#6B7570">Name</td><td>${safe(input.name)}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#6B7570">Email</td><td><a href="mailto:${safe(input.email)}">${safe(input.email)}</a></td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#6B7570">Company</td><td>${safe(input.company || '—')}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#6B7570">Source</td><td>${safe(input.source || '—')}</td></tr>
    <tr><td style="padding:4px 12px 4px 0;color:#6B7570">Locale</td><td>${safe(input.locale || '—')}</td></tr>
  </table>
  <h3 style="font-size:14px;margin:24px 0 8px;color:#6B7570">Message</h3>
  <p style="white-space:pre-wrap">${safe(input.message)}</p>
</body></html>`;
}

export async function sendContactEmail(input: ContactInput & { locale?: string }): Promise<void> {
  const transporter = getTransporter();
  const user = process.env.SMTP_USERNAME;
  if (!user) {
    throw new Error('SMTP_USERNAME missing — should have been caught by getTransporter()');
  }

  await transporter.sendMail({
    from: `Vizcaia Web Form <${user}>`,
    to: user, // a la cuenta corporativa
    cc: 'shenaorj@gmail.com, mateoc233@gmail.com', // ambos socios reciben copia
    replyTo: input.email,
    subject: `[Web] ${input.name}${input.company ? ` — ${input.company}` : ''}`,
    text: formatPlainText(input),
    html: formatHtml(input),
  });
}
