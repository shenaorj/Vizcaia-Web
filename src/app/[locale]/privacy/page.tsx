import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

/**
 * Privacy policy — English version.
 * Valid only at `/en/privacy`. Returns 404 if accessed at `/es/privacy`.
 *
 * Marked `noindex` until validated by US counsel before formal outreach.
 * Template covers CCPA (California) + GDPR-friendly language (EU visitors).
 *
 * Spanish translation of the same US-jurisdiction policy at `/es/aviso-de-privacidad`.
 */

export const metadata: Metadata = {
  title: 'Privacy Policy — Vizcaia',
  description: 'How Vizcaia Technologies handles personal data submitted through vizcaia.com.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  return (
    <article className="px-4 sm:px-6 lg:px-8 py-24 max-w-3xl mx-auto">
      <div className="mb-16">
        <p className="font-mono text-[11px] tracking-wide-18 uppercase text-paper opacity-50 mb-4">
          Legal · Last updated 2026-05-25
        </p>
        <h1 className="font-display font-medium tracking-tight-3 text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] text-balance">
          Privacy Policy
        </h1>
        <p className="mt-6 font-sans text-base sm:text-lg text-paper opacity-70 leading-relaxed">
          This policy explains how Vizcaia Technologies collects, uses, and protects information you
          submit through <strong>vizcaia.com</strong>. We aim for plain language; if anything is
          unclear, write to{' '}
          <a
            className="text-signal hover:text-signal-2 underline underline-offset-2"
            href="mailto:privacy@vizcaia.com"
          >
            privacy@vizcaia.com
          </a>
          .
        </p>
      </div>

      <Section title="1. Who we are">
        <p>
          Vizcaia Technologies is a software studio headquartered in Miami, Florida (United States).
          We build AI agents and production software for engineering and operations teams, primarily
          serving clients in the US.
        </p>
        <p>
          For privacy questions or data requests, contact us at{' '}
          <a className="text-signal" href="mailto:privacy@vizcaia.com">
            privacy@vizcaia.com
          </a>
          .
        </p>
      </Section>

      <Section title="2. What we collect">
        <p>When you submit the contact form on vizcaia.com, we receive:</p>
        <ul>
          <li>Your name</li>
          <li>Your email address</li>
          <li>Your company (optional)</li>
          <li>The message you wrote</li>
          <li>How you heard about us (optional)</li>
          <li>The IP address of the submission (for rate limiting and abuse prevention)</li>
        </ul>
        <p>
          We do <strong>not</strong> use cookies for tracking. If we enable analytics, we use a
          cookieless solution (Cloudflare Web Analytics) that does not identify individual visitors.
        </p>
      </Section>

      <Section title="3. Why we collect it">
        <p>The only reason we collect this information is to respond to your inquiry.</p>
        <p>
          We do not use it for advertising. We do not enrich it with third-party data. We do not
          sell it. We do not share it outside Vizcaia.
        </p>
      </Section>

      <Section title="4. How long we keep it">
        <p>
          Active leads: stored as long as the conversation is ongoing, plus 12 months for reference.
        </p>
        <p>
          Closed leads (declined, not-fit): archived 6 months after closure and deleted after 24
          months total.
        </p>
        <p>You can ask us to delete your data earlier — see "Your rights" below.</p>
      </Section>

      <Section title="5. Where it lives">
        <p>Submitted form data is processed and stored on infrastructure we operate ourselves:</p>
        <ul>
          <li>Server in Hetzner (Germany, EU jurisdiction)</li>
          <li>Email copy delivered through Google Workspace (Gmail SMTP)</li>
          <li>Lead record created in our self-hosted Outline (same server)</li>
        </ul>
      </Section>

      <Section title="6. Your rights (CCPA + GDPR)">
        <p>You have the right to:</p>
        <ul>
          <li>
            <strong>Access</strong> the personal data we have about you.
          </li>
          <li>
            <strong>Correct</strong> inaccurate information.
          </li>
          <li>
            <strong>Delete</strong> your data ("right to erasure" / "right to be forgotten").
          </li>
          <li>
            <strong>Object</strong> to or restrict processing.
          </li>
          <li>
            <strong>Receive a copy</strong> of your data in machine-readable format (data
            portability).
          </li>
          <li>
            <strong>Lodge a complaint</strong> with a supervisory authority (your local data
            protection authority for EU residents, the California AG for California residents).
          </li>
        </ul>
        <p>
          We will not sell, rent, or share your personal information with third parties for their
          marketing purposes. We do not use your data for "cross-context behavioral advertising" as
          defined by the CPRA.
        </p>
      </Section>

      <Section title="7. How to exercise your rights">
        <p>
          Email{' '}
          <a className="text-signal" href="mailto:privacy@vizcaia.com">
            privacy@vizcaia.com
          </a>{' '}
          from the email address you used in the form. We respond within 30 days.
        </p>
        <p>
          We do not charge a fee for reasonable requests. If a request is excessive or repetitive,
          we may charge a small administrative fee or decline to act.
        </p>
      </Section>

      <Section title="8. Security">
        <p>
          We use HTTPS for all transmission. Our servers are hardened (SSH key-only access,
          firewall, automated security updates). We do not require passwords from form submitters —
          there is no account to compromise.
        </p>
        <p>
          That said, no system is 100% secure. We will notify affected users within 72 hours if we
          ever detect a breach affecting their data.
        </p>
      </Section>

      <Section title="9. Children's privacy">
        <p>
          vizcaia.com is intended for B2B audiences (companies, decision makers). We do not
          knowingly collect data from anyone under 16. If you believe a minor has submitted the
          form, contact us and we will delete the data.
        </p>
      </Section>

      <Section title="10. Changes to this policy">
        <p>
          We will update the "Last updated" date at the top when we make changes. Material changes
          will be communicated to existing leads via email.
        </p>
      </Section>

      <Section title="11. Contact">
        <p>
          Vizcaia Technologies <br />
          Miami, FL · United States <br />
          <a className="text-signal" href="mailto:privacy@vizcaia.com">
            privacy@vizcaia.com
          </a>
        </p>
      </Section>

      <p className="mt-16 pt-8 border-t border-rule-dark font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-65">
        This is a v1 template. We will update it after review by qualified counsel before formal
        commercial outreach.
      </p>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-display font-medium text-2xl sm:text-3xl tracking-tight-3 mb-4 text-paper">
        {title}
      </h2>
      <div className="space-y-4 font-sans text-base leading-relaxed text-paper opacity-80 [&_a]:text-signal [&_a]:underline [&_a]:underline-offset-2 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_strong]:text-paper [&_strong]:opacity-100">
        {children}
      </div>
    </section>
  );
}
