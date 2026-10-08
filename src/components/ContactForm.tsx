'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import type { Route } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, ButtonLink } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CONTACT_EMAIL } from '@/lib/contact';
import type { Dictionary } from '@/lib/dictionaries';
import type { Locale } from '@/lib/i18n';
import { type ContactInput, ContactSchema } from '@/lib/schemas';

type SubmitState =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; reason: 'rateLimited' | 'server' };

type FormDict = Dictionary['contact']['form'];

/**
 * ContactForm — client component.
 * Validación inline con RHF + Zod (mismo schema que backend en T18).
 * POST a `/api/contact` (T18 lo implementa).
 *
 * Estados: idle → submitting → success | error.
 *   - success: muestra "Thanks…" + opción de enviar otro.
 *   - error: muestra mensaje + mailto fallback.
 *
 * Honeypot: `websiteUrl` invisible vía CSS. Si tiene valor el backend lo descarta.
 */
export function ContactForm({ locale, dict }: { locale: Locale; dict: FormDict }) {
  const [state, setState] = useState<SubmitState>({ kind: 'idle' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactInput>({
    resolver: zodResolver(ContactSchema),
    mode: 'onTouched',
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
      source: '',
      acceptsPrivacy: false,
      websiteUrl: '',
    },
  });

  async function onSubmit(values: ContactInput) {
    setState({ kind: 'submitting' });
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, locale }),
      });

      if (res.ok) {
        setState({ kind: 'success' });
        reset();
        return;
      }

      if (res.status === 429) {
        setState({ kind: 'error', reason: 'rateLimited' });
        return;
      }

      setState({ kind: 'error', reason: 'server' });
    } catch {
      setState({ kind: 'error', reason: 'server' });
    }
  }

  // ─── Success state ─────────────────────────────────────────────────────
  if (state.kind === 'success') {
    return (
      <div className="bg-ink-2 border border-signal/40 rounded-sm p-8 sm:p-10 space-y-4">
        <p className="font-mono text-[10px] tracking-wide-18 uppercase text-signal">
          ✓ {dict.successTitle.split('—')[0]?.trim() ?? dict.successTitle}
        </p>
        <h3 className="font-display text-2xl tracking-tight-3 text-paper">{dict.successTitle}</h3>
        <p className="font-sans text-base text-paper opacity-70">{dict.successBody}</p>
        <div className="pt-2">
          <Button variant="ghost" size="sm" onClick={() => setState({ kind: 'idle' })}>
            {dict.successReset} →
          </Button>
        </div>
      </div>
    );
  }

  // ─── Form ──────────────────────────────────────────────────────────────
  const privacyPath = (locale === 'en' ? '/en/privacy' : '/es/aviso-de-privacidad') as Route;
  const isSubmitting = state.kind === 'submitting';

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Name */}
      <div>
        <Label htmlFor="contact-name">{dict.name}</Label>
        <Input
          id="contact-name"
          autoComplete="name"
          placeholder={dict.namePlaceholder}
          aria-invalid={errors.name ? 'true' : undefined}
          aria-describedby={errors.name ? 'contact-name-err' : undefined}
          {...register('name')}
        />
        {errors.name && <FieldError id="contact-name-err" dict={dict} code={errors.name.message} />}
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="contact-email">{dict.email}</Label>
        <Input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={dict.emailPlaceholder}
          aria-invalid={errors.email ? 'true' : undefined}
          aria-describedby={errors.email ? 'contact-email-err' : undefined}
          {...register('email')}
        />
        {errors.email && (
          <FieldError id="contact-email-err" dict={dict} code={errors.email.message} />
        )}
      </div>

      {/* Company */}
      <div>
        <Label htmlFor="contact-company">
          {dict.company}{' '}
          <span className="opacity-70 normal-case tracking-normal">({dict.sourceOptional})</span>
        </Label>
        <Input
          id="contact-company"
          autoComplete="organization"
          placeholder={dict.companyPlaceholder}
          {...register('company')}
        />
      </div>

      {/* Message */}
      <div>
        <Label htmlFor="contact-message">{dict.message}</Label>
        <Textarea
          id="contact-message"
          rows={5}
          placeholder={dict.messagePlaceholder}
          aria-invalid={errors.message ? 'true' : undefined}
          aria-describedby={errors.message ? 'contact-message-err' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <FieldError id="contact-message-err" dict={dict} code={errors.message.message} />
        )}
      </div>

      {/* Source */}
      <div>
        <Label htmlFor="contact-source">
          {dict.source}{' '}
          <span className="opacity-70 normal-case tracking-normal">({dict.sourceOptional})</span>
        </Label>
        <Select id="contact-source" defaultValue="" {...register('source')}>
          <option value="" disabled>
            {dict.sourceOptions.placeholder}
          </option>
          <option value="referral">{dict.sourceOptions.referral}</option>
          <option value="search">{dict.sourceOptions.search}</option>
          <option value="event">{dict.sourceOptions.event}</option>
          <option value="other">{dict.sourceOptions.other}</option>
        </Select>
      </div>

      {/* Privacy accept */}
      <label htmlFor="contact-privacy" className="flex items-start gap-3 cursor-pointer pt-2">
        <Checkbox
          id="contact-privacy"
          aria-invalid={errors.acceptsPrivacy ? 'true' : undefined}
          aria-describedby={errors.acceptsPrivacy ? 'contact-privacy-err' : undefined}
          {...register('acceptsPrivacy')}
        />
        <span className="font-sans text-sm text-paper opacity-80">
          {dict.privacy}{' '}
          <Link
            href={privacyPath}
            className="text-signal hover:text-signal-2 underline underline-offset-2 transition-colors"
          >
            {dict.privacyLink}
          </Link>
          .
        </span>
      </label>
      {errors.acceptsPrivacy && (
        <FieldError id="contact-privacy-err" dict={dict} code={errors.acceptsPrivacy.message} />
      )}

      {/* Honeypot — invisible para humanos. SR users get aria-hidden + tabIndex=-1 */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: 0, height: 0, overflow: 'hidden' }}
      >
        <label htmlFor="contact-website-url">
          Don't fill this out
          <input
            id="contact-website-url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...register('websiteUrl')}
          />
        </label>
      </div>

      {/* Submit + error */}
      <div className="pt-4 flex flex-col gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={isSubmitting || !isValid}>
          {isSubmitting ? dict.submitting : `${dict.submit} →`}
        </Button>

        {state.kind === 'error' && (
          <div
            role="alert"
            aria-live="polite"
            className="bg-ink-2 border border-flare/40 rounded-sm p-4 space-y-2"
          >
            <p className="font-mono text-[10px] tracking-wide-18 uppercase text-flare">
              {dict.errorTitle}
            </p>
            <p className="font-sans text-sm text-paper opacity-80">
              {state.reason === 'rateLimited' ? dict.errors.rateLimited : dict.errorBody}{' '}
              {state.reason === 'server' && (
                <ButtonLink
                  href={`mailto:${CONTACT_EMAIL}?subject=Project%20inquiry`}
                  variant="ghost"
                  size="sm"
                  className="!inline-flex !h-auto !px-0 !text-xs"
                >
                  {CONTACT_EMAIL}
                </ButtonLink>
              )}
            </p>
          </div>
        )}
      </div>
    </form>
  );
}

/**
 * Subcomponente para mostrar errores con aria-live para SR users.
 */
function FieldError({ id, dict, code }: { id: string; dict: FormDict; code: string | undefined }) {
  // RHF + Zod manda el `message` string que pusimos en el schema ('minLength', 'email', etc.)
  // y lo mapeamos al dict para mostrar el texto localizado correcto.
  const errorsMap = dict.errors;
  const text =
    code && code in errorsMap ? errorsMap[code as keyof typeof errorsMap] : errorsMap.required;

  return (
    <p
      id={id}
      role="alert"
      aria-live="polite"
      className="mt-2 font-mono text-[10px] tracking-wide-12 uppercase text-flare"
    >
      {text}
    </p>
  );
}
