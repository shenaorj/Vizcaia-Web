import { notFound } from 'next/navigation';
import { HeroCanvas } from '@/components/HeroCanvas';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { getDictionary } from '@/lib/dictionaries';
import { isLocale } from '@/lib/i18n';

/**
 * T4 — Página localizada de prueba.
 * Mantenemos el preview de tokens del brand manual (T2/T3) y le agregamos
 * el subtitle bilingüe + footer label desde los dictionaries para validar i18n.
 * Esta página se reemplaza con el Hero real en T12.
 */
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dict = await getDictionary(locale);

  return (
    <main className="min-h-screen p-12 font-sans">
      {/* Hero placeholder */}
      <section className="mb-16">
        <p className="font-mono text-xs tracking-wide-16 uppercase text-signal opacity-60">
          Vizcaia / {dict.preview.label}
        </p>
        <h1 className="font-display mt-4 text-7xl font-medium tracking-tight-5">
          vizc<em className="font-serif italic text-signal">ai</em>a
        </h1>
        <p className="mt-4 font-sans text-lg text-paper opacity-70">{dict.hero.subtitle}</p>
        <p className="mt-2 font-mono text-[11px] tracking-wide-16 uppercase text-paper opacity-40">
          locale: {locale}
        </p>
      </section>

      {/* Paleta */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Paleta
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4 lg:grid-cols-6">
          <Swatch name="ink" hex="#0A0F0C" className="bg-ink text-paper border border-rule-dark" />
          <Swatch
            name="ink-2"
            hex="#141A16"
            className="bg-ink-2 text-paper border border-rule-dark"
          />
          <Swatch name="ink-3" hex="#1F2722" className="bg-ink-3 text-paper" />
          <Swatch name="ink-4" hex="#2D3631" className="bg-ink-4 text-paper" />
          <Swatch name="paper" hex="#F4F1E8" className="bg-paper text-ink" />
          <Swatch name="paper-2" hex="#E8E3D4" className="bg-paper-2 text-ink" />
          <Swatch name="paper-3" hex="#D7D2C2" className="bg-paper-3 text-ink" />
          <Swatch name="signal" hex="#00E37A" className="bg-signal text-ink" />
          <Swatch name="signal-2" hex="#5BFFAE" className="bg-signal-2 text-ink" />
          <Swatch name="forge" hex="#007A45" className="bg-forge text-paper" />
          <Swatch name="moss" hex="#1B3328" className="bg-moss text-paper" />
          <Swatch name="smoke" hex="#6B7570" className="bg-smoke text-paper" />
          <Swatch name="flare" hex="#FF5A3C" className="bg-flare text-ink" />
        </div>
      </section>

      {/* Tipografías */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Tipografías
        </h2>
        <div className="space-y-4">
          <p className="font-display text-4xl tracking-tight-3">
            Display · Space Grotesk · tight-3
          </p>
          <p className="font-sans text-lg">Sans · Geist · regular weight, default body.</p>
          <p className="font-mono text-sm tracking-wide-16 uppercase text-paper opacity-60">
            Mono · Geist Mono · wide-16 · uppercase
          </p>
          <p className="font-serif italic text-3xl text-signal">
            Serif · Instrument Serif italic · color signal
          </p>
        </div>
      </section>

      {/* Letter spacing */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Letter spacing
        </h2>
        <div className="space-y-2 font-display text-2xl">
          <p className="tracking-tight-5">tracking-tight-5</p>
          <p className="tracking-tight-4">tracking-tight-4</p>
          <p className="tracking-tight-3">tracking-tight-3</p>
          <p className="tracking-tight-2">tracking-tight-2</p>
          <p className="tracking-wide-04">tracking-wide-04</p>
          <p className="tracking-wide-08">tracking-wide-08</p>
          <p className="tracking-wide-12">tracking-wide-12</p>
          <p className="tracking-wide-16">tracking-wide-16</p>
          <p className="tracking-wide-18">tracking-wide-18</p>
        </div>
      </section>

      {/* Hero Canvas — T9 (estática) */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Hero canvas · T9 — estática
        </h2>
        <div className="relative w-full h-96 bg-ink-2 border border-rule-dark rounded-sm overflow-hidden">
          <HeroCanvas className="absolute inset-0 w-full h-full" />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <p className="font-mono text-[11px] tracking-wide-16 uppercase text-paper opacity-30">
              T9 · grid 30×20 · static · DPR-aware
            </p>
          </div>
        </div>
      </section>

      {/* Componentes UI — T6 */}
      <section className="mb-16">
        <h2 className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-50 mb-6">
          Componentes UI · T6
        </h2>

        {/* Buttons */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-40 mb-3">
            Buttons — variants
          </p>
          <div className="flex flex-wrap gap-3">
            <Button variant="primary">Let's talk</Button>
            <Button variant="secondary">Read more</Button>
            <Button variant="ghost">Skip →</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
          </div>
          <p className="font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-40 mt-4 mb-3">
            Buttons — sizes
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
        </div>

        {/* Form inputs */}
        <div className="mb-8 max-w-md">
          <p className="font-mono text-[10px] tracking-wide-16 uppercase text-paper opacity-40 mb-3">
            Form fields
          </p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="preview-name">Name</Label>
              <Input id="preview-name" placeholder="John Doe" />
            </div>
            <div>
              <Label htmlFor="preview-email">Email</Label>
              <Input id="preview-email" type="email" placeholder="you@company.com" />
            </div>
            <div>
              <Label htmlFor="preview-source">How did you hear about us</Label>
              <Select id="preview-source" defaultValue="">
                <option value="" disabled>
                  Select an option
                </option>
                <option value="referral">Referral</option>
                <option value="search">Search engine</option>
                <option value="event">Event / conference</option>
                <option value="other">Other</option>
              </Select>
            </div>
            <div>
              <Label htmlFor="preview-msg">Tell us what you need</Label>
              <Textarea
                id="preview-msg"
                placeholder="A few lines about the problem you want solved…"
              />
            </div>
            <label htmlFor="preview-accept" className="flex items-start gap-3 cursor-pointer">
              <Checkbox id="preview-accept" defaultChecked />
              <span className="font-sans text-xs text-paper opacity-70">
                I accept the privacy policy.
              </span>
            </label>
            <div>
              <Label htmlFor="preview-invalid">Field with error (aria-invalid)</Label>
              <Input
                id="preview-invalid"
                aria-invalid="true"
                placeholder="This field has a problem"
              />
              <p className="font-mono text-[10px] tracking-wide-12 uppercase text-flare mt-2">
                Required field
              </p>
            </div>
          </div>
        </div>
      </section>

      <p className="font-mono text-xs tracking-wide-16 uppercase text-paper opacity-30">
        {dict.preview.footer}
      </p>
    </main>
  );
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div className={`p-4 min-h-32 flex flex-col justify-between rounded-sm ${className}`}>
      <span className="font-display text-base">{name}</span>
      <div>
        <span className="font-mono text-[10px] tracking-wide-04 opacity-70 block">{hex}</span>
      </div>
    </div>
  );
}
