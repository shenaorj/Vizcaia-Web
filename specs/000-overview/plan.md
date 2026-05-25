# Plan — Website Vizcaia v1

> **CÓMO** construimos lo que dice `spec.md`. Audiencia: Santiago + Claude codeando.
> Estado: borrador inicial (2026-05-25). Aprobar antes de pasar a `/tasks`.

---

## 1. Resumen ejecutivo

- **Stack**: Next.js 15 (App Router) + TypeScript estricto + Tailwind CSS 4 + nodemailer.
- **Idioma**: i18n nativo de Next.js con rutas `/en/...` y `/es/...`, default `/en`.
- **Form**: API route `/api/contact` → SMTP via Gmail App Password + POST a Outline API para crear lead.
- **Analytics**: Cloudflare Web Analytics (privacy-friendly, sin cookies, zero setup).
- **Hosting**: Coolify del VPS Vizcaia-desarrollo, deploy automático en push a `main`.
- **Dominio**: `vizcaia.com` (raíz) + `www.vizcaia.com` redirige al raíz.

Lo que esto implica en líneas de código: ~1500-2500 LOC TypeScript/TSX + ~30 commits + 1-2 semanas de trabajo intermitente.

---

## 2. Stack y versiones

| Capa | Tecnología | Versión target | Razón |
|---|---|---|---|
| Framework | Next.js | 15.x (latest stable) | App Router maduro, i18n nativo, mejor DX |
| Lenguaje | TypeScript | 5.x | `strict: true` + `noUncheckedIndexedAccess: true` |
| Estilos | Tailwind CSS | 4.x | Tokens custom del brand manual |
| Componentes | shadcn/ui (selectivos) | latest | Solo los que necesito (Button, Input, Textarea, Select, Checkbox) — copiados al repo, no como dependencia |
| Forms | react-hook-form | 7.x | Standard de facto, DX excelente |
| Validación | Zod | 3.x | Frontend + backend con mismo schema |
| Fuentes | next/font (local) | nativo | Self-hosted, subset Latin, preload |
| Email | nodemailer | 6.x | SMTP via Gmail App Password (ya configurado para Outline) |
| HTTP server | Next.js standalone output | 15.x | Mínimo footprint para Docker |
| Linting | Biome | 1.x | Más rápido que ESLint, integra format+lint |
| Tests | (sin tests automáticos en v1) | — | Landing simple, QA manual + Lighthouse en CI |
| Package manager | pnpm | 9.x | Más rápido + más eficiente con disco |

**Por qué no Vercel**: ya tenemos VPS+Coolify pagados. Cero razón de pagar Vercel para una landing.

**Por qué no Astro**: para una sola página estática Astro sería más limpio, pero queremos un API route para el form (no estático). Next.js da fullstack en mismo bundle.

**Por qué no shadcn como dependencia completa**: queremos control 100% sobre los componentes para aplicar tokens Vizcaia. Copiar 4-5 components al repo es 5 minutos.

---

## 3. Estructura de carpetas

```
Vizcaia-Web/
├── src/
│   ├── app/
│   │   ├── [locale]/                       ← rutas localizadas
│   │   │   ├── layout.tsx                  ← layout con header/footer + LanguageSwitcher
│   │   │   ├── page.tsx                    ← home (one-pager con todas las secciones)
│   │   │   ├── privacy/                    ← solo si locale=en
│   │   │   │   └── page.tsx
│   │   │   └── aviso-de-privacidad/        ← solo si locale=es
│   │   │       └── page.tsx
│   │   ├── api/
│   │   │   └── contact/
│   │   │       └── route.ts                ← POST handler del form
│   │   ├── layout.tsx                      ← root layout (redirige / → /en por default)
│   │   ├── not-found.tsx
│   │   ├── opengraph-image.tsx             ← genera OG image dinámica
│   │   ├── favicon.ico                     ← mark "The Spark" 32x32
│   │   ├── robots.ts
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Manifesto.tsx               ← "Why Vizcaia / Por qué Vizcaia"
│   │   │   ├── Services.tsx                ← 3 tarjetas
│   │   │   ├── Principles.tsx              ← 4-5 principios numerados
│   │   │   ├── Work.tsx                    ← past work (Quitebe sin nombrar)
│   │   │   ├── Contact.tsx                 ← form
│   │   │   └── Footer.tsx
│   │   ├── ui/                             ← shadcn primitives adaptados
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── select.tsx
│   │   │   └── checkbox.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── MarkSpark.tsx                   ← SVG inline del logo
│   │   └── ContactForm.tsx                 ← lógica del form (RHF + Zod)
│   ├── lib/
│   │   ├── i18n.ts                         ← config + getDictionary(locale)
│   │   ├── dictionaries.ts                 ← carga lazy de messages/<locale>.json
│   │   ├── outline-api.ts                  ← cliente para POST lead a Outline
│   │   ├── email.ts                        ← transporter nodemailer
│   │   ├── rate-limit.ts                   ← simple in-memory por IP (mejorar con Upstash si crece)
│   │   ├── format.ts                       ← Intl.DateTimeFormat / NumberFormat US
│   │   └── schemas.ts                      ← Zod schemas (ContactForm)
│   ├── messages/
│   │   ├── en.json                         ← TODOS los textos en inglés
│   │   └── es.json                         ← TODOS los textos en español
│   └── styles/
│       └── globals.css                     ← Tailwind base + custom layer
├── public/
│   ├── fonts/                              ← Geist, Space Grotesk, Geist Mono, Instrument Serif (subset Latin .woff2)
│   └── images/                             ← OG image, favicons en varios sizes
├── next.config.mjs
├── tailwind.config.ts                      ← tokens brand manual
├── tsconfig.json
├── biome.json
├── package.json
├── pnpm-lock.yaml
├── Dockerfile                              ← multi-stage para Coolify
├── .dockerignore
├── .env.local.example                      ← template (sin secrets)
└── .github/
    └── workflows/
        └── ci.yml                          ← lint + typecheck + build en cada PR
```

---

## 4. Routing y i18n

### Decisión: Next.js i18n nativo con segment `[locale]`

**Por qué este approach**:
- Sin dependencia extra (no `next-intl`, no `i18next`).
- SEO óptimo: cada idioma con su URL única (`/en/...`, `/es/...`).
- Type safety: el locale es un union type, todos los `getDictionary` retornan typed dict.

### Routing concreto

| URL | Resuelve a |
|---|---|
| `vizcaia.com/` | redirige 302 a `/en` (default, target USA) |
| `vizcaia.com/en` | home en inglés |
| `vizcaia.com/es` | home en español |
| `vizcaia.com/en/privacy` | privacy policy inglés (CCPA + GDPR) |
| `vizcaia.com/es/aviso-de-privacidad` | aviso de privacidad español (Habeas Data) |
| `vizcaia.com/en/aviso-de-privacidad` | 404 (no existe la versión EN con ese slug) |
| `vizcaia.com/es/privacy` | 404 (no existe la versión ES con ese slug) |
| `www.vizcaia.com/*` | 301 a `vizcaia.com/*` (configurado en Coolify/Traefik) |

### Detección de idioma

- **v1 simple**: NO usamos geo-IP ni `Accept-Language`. Default siempre `/en`. Si el visitante quiere ES, usa el switcher.
- **v1.1 si vale la pena**: middleware que detecta `Accept-Language: es*` → primer visit redirige a `/es`. Persistir en cookie `vz_locale`. **No bloqueamos lanzamiento por esto.**

### Selector de idioma (componente)

- Sticky en header: `EN | ES`.
- Click cambia `[locale]` manteniendo el resto del path.
- Persistir preferencia en cookie `vz_locale` con `max-age=31536000` (1 año).
- Si el path es asimétrico entre idiomas (ej. `/en/privacy` vs `/es/aviso-de-privacidad`), un map manual en el switcher resuelve.

### Diccionarios (mensajes)

Archivos JSON estáticos por locale. Cargados via dynamic import server-side (no van al cliente, salvo strings inline en componentes client).

`messages/en.json`:
```json
{
  "hero": {
    "tagline": "A foundry for intelligence",
    "subtitle": "We build AI agents and automations that go to production. Not demos.",
    "cta": "Let's talk"
  },
  "manifesto": { "title": "Why Vizcaia", "paragraphs": [...] },
  "services": { ... },
  "form": { ... }
}
```

`messages/es.json` con mismas claves, valores en español. Excepto `hero.tagline` — se queda en EN siempre (brand asset).

---

## 5. Design system + tokens

### Tailwind config con tokens del brand manual

`tailwind.config.ts`:
```typescript
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0A0F0C',
          2: '#141A16',
          3: '#1F2722',
          4: '#2D3631',
        },
        paper: {
          DEFAULT: '#F4F1E8',
          2: '#E8E3D4',
          3: '#D7D2C2',
        },
        signal: {
          DEFAULT: '#00E37A',
          2: '#5BFFAE',
        },
        forge: '#007A45',
        moss: '#1B3328',
        smoke: '#6B7570',
        flare: '#FF5A3C',
      },
      fontFamily: {
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        serif: ['var(--font-instrument-serif)', 'Georgia', 'serif'],
      },
      letterSpacing: {
        'tight-2': '-0.02em',
        'tight-3': '-0.03em',
        'tight-5': '-0.05em',
        'wide-08': '0.08em',
        'wide-16': '0.16em',
        'wide-18': '0.18em',
      },
    },
  },
  plugins: [],
}
export default config
```

### Componentes UI (shadcn copiados y adaptados)

- **Button**: variantes `primary` (bg-signal sobre ink), `secondary` (outline sobre paper), `ghost` (text-signal). Tamaños: sm/md/lg.
- **Input/Textarea**: bordes 1px sobre ink-2, focus ring color signal.
- **Select**: igual.
- **Checkbox**: con label, accent-color signal.

Todos los componentes usan `class-variance-authority` (cva) para variantes type-safe.

### Fuentes

- **Space Grotesk** weight 500, 600 — display/headings.
- **Geist** weight 300, 400, 500 — body, UI.
- **Geist Mono** weight 400, 500 — labels, meta uppercase.
- **Instrument Serif** weight 400 italic — acentos `<em>` en color signal/forge.

Self-hosted con `next/font/local`. Subset Latin (no Cyrillic, no CJK). Cada uno ~30-50 kB woff2.

### Animaciones — minimalistas excepto en el Hero

Resto del sitio: animaciones solo con CSS (`transition`, `transform`, `opacity`). Respeta `prefers-reduced-motion`. Sin framer-motion.

**Excepción intencional**: el **Hero tiene un efecto interactivo Canvas 2D** (sección 5.bis). Es la única animación JS del sitio, contenida en su propio componente lazy-loaded, con fallback estático en mobile.

### 5.bis Hero interactivo — Grid 2D distorsionada por el mouse

**Objetivo visual**: fondo del hero es una grid de líneas finas (tipo blueprint técnico). Cuando el cursor pasa cerca, las líneas se distorsionan localmente — efecto "gravity well" o "spark ignition". Comunica el ADN "foundry for intelligence" en un solo gesto.

**Decisión técnica (ver ADR-009)**: **Canvas 2D nativo, NO Three.js**. Mismo efecto visual con +5 kB en lugar de +250 kB.

#### Componente

`src/components/HeroCanvas.tsx` (client component, lazy-loaded):

```typescript
'use client'

export function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0, active: false })

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (isTouch || reducedMotion) {
      drawStaticGrid(canvasRef.current!)   // render once, no anim loop
      return
    }

    // animation loop con mouse-driven distortion
    // grid 30×20 vertices, líneas bezier que pasan por vertices desplazados
    // displacement = (mouse - vertex) * (strength / (distance + eps))
    // ...
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />
}
```

#### Render strategy

- **Above-the-fold contenido semántico** (`<h1>` tagline + `<p>` subtitle + CTA button) está en HTML normal, **delante** del canvas. Screen readers lo leen sin problema. SEO ve el texto.
- Canvas con `aria-hidden="true"` (decorativo, no contenido).
- Canvas dynamic-imported con `next/dynamic` y `loading: () => null` → no SSR, no bloquea First Contentful Paint.
- Hero también funciona si el JS falla (fondo estático CSS con el grid del brand manual como fallback HTML).

#### Algoritmo de distorsión

- Grid de **30×20 vertices** (600 puntos). Suficiente densidad para verse bonito, suficiente sparcity para 60 fps en laptop modesta.
- Cada frame:
  1. Recalcular displacement de cada vertex: `disp = (mouse - vertex) * strength / (distance² + ε)` con `strength` ~50px y `ε` ~100.
  2. Suavizar con damping (lerp) hacia la posición original cuando mouse está lejos.
  3. Dibujar líneas conectando vertices con curvas Bezier (curva pasa por 4 vertices consecutivos).
- Colores: líneas `rgba(255,255,255,0.04)` base, `rgba(0,227,122,0.20)` (signal-green) en vertices distorsionados.
- Grosor variable: `lineWidth = 0.5 + (distortion / strength) * 1.5`.

#### Mobile / touch / reduced-motion fallback

- En `(hover: none)` → render estático del grid sin distorsión. Sin animation loop.
- En `prefers-reduced-motion: reduce` → idem (sin animación).
- Alternativa más ligera: en mobile reemplazar el `<canvas>` por un SVG estático del grid (~3 kB) generado en server-side. Decisión menor a tomar en implementación.

#### Performance targets específicos del canvas

- **No degrada Lighthouse < 92** (lazy load es crítico).
- **60 fps en MacBook Air M1** durante interacción continua.
- **40+ fps en mid-range Windows con GPU integrada**.
- **0 CPU consumido** cuando el mouse no se mueve por 2+ segundos (pausar `requestAnimationFrame`).
- **Pausar canvas** cuando el hero NO está visible (intersection observer): no animar cuando el usuario ha scrolleado abajo.

#### Testing

- Validación manual: Chrome DevTools Performance tab → verificar < 4ms scripting per frame.
- Lighthouse antes/después del componente: caída máxima aceptable -3 puntos en Performance.
- Manual en Safari mobile + iPhone para confirmar fallback estático.

---

## 6. Form de contacto: arquitectura

### Frontend (`ContactForm.tsx`, client component)

- `react-hook-form` para state + validación inline.
- Schema Zod compartido con el backend (importado desde `lib/schemas.ts`).
- Campos según spec: name, email, company, message, source (select), accepts_privacy (checkbox), honeypot (hidden).
- Estados: idle / submitting / success / error.
- On submit: POST a `/api/contact` con JSON.
- Success: muestra mensaje "Thanks, we respond within 24h" + opciones (cerrar, ir a LinkedIn).
- Error: muestra mensaje + opción mailto como fallback.

### Backend (`app/api/contact/route.ts`, server)

```typescript
// pseudocódigo
export async function POST(req: Request) {
  // 1. Parsear JSON
  const body = await req.json()
  
  // 2. Validar con Zod (mismo schema que frontend)
  const parsed = ContactSchema.safeParse(body)
  if (!parsed.success) return Response.json({ error: 'invalid' }, { status: 400 })
  
  // 3. Verificar honeypot (debe estar vacío)
  if (parsed.data.website_url) return Response.json({ ok: true }, { status: 200 }) // bot
  
  // 4. Rate limit por IP (ver lib/rate-limit.ts)
  const ip = req.headers.get('x-forwarded-for') || 'unknown'
  if (!checkRateLimit(ip, 3, 3600)) return Response.json({ error: 'rate_limited' }, { status: 429 })
  
  // 5. Verificar email tiene MX record (opcional, ver más abajo)
  
  // 6. Enviar email via SMTP
  await sendContactEmail(parsed.data)
  
  // 7. Crear lead en Outline (colección "Leads")
  await createLeadInOutline(parsed.data).catch(err => {
    // log pero no bloquear: email es lo crítico, Outline es bonus
    console.error('Outline lead failed', err)
  })
  
  // 8. Respuesta success
  return Response.json({ ok: true })
}
```

### Email transport (`lib/email.ts`)

```typescript
import nodemailer from 'nodemailer'

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,        // smtp.gmail.com
  port: Number(process.env.SMTP_PORT), // 587
  secure: false,
  auth: {
    user: process.env.SMTP_USERNAME,   // vizcaia.technologies@gmail.com
    pass: process.env.SMTP_PASSWORD,   // App password (mismo que Outline)
  },
})

export async function sendContactEmail(data: ContactInput) {
  await transporter.sendMail({
    from: `Vizcaia Web Form <${process.env.SMTP_USERNAME}>`,
    to: process.env.SMTP_USERNAME,      // a la cuenta corp
    cc: 'shenaorj@gmail.com,mateoc233@gmail.com', // ambos socios reciben copia
    subject: `[Web] ${data.name} — ${data.company || 'sin empresa'}`,
    text: formatPlainText(data),
    html: formatHtml(data),
    replyTo: data.email,                 // responder al contacto directamente
  })
}
```

### Outline lead (`lib/outline-api.ts`)

Reutilizamos el API token de Outline ya guardado en `~/.config/vizcaia/outline-api-token` (en dev) y en env var de Coolify (en prod).

Crear doc en colección **"Leads"** (hay que crearla primero en Outline manualmente o vía API):
- Title: `${data.name} — ${data.company || 'sin empresa'} — ${ISO_date}`
- Content: markdown con los campos del form formateados.
- Después de crear, los socios pueden agregar follow-ups directamente en ese doc.

### Anti-spam

1. **Honeypot field** `website_url`, hidden via CSS, si tiene valor → ignorar silenciosamente (200 OK pero no procesar).
2. **Rate limit** `lib/rate-limit.ts`: simple in-memory Map<IP, [count, windowStart]>. 3 envíos/hora por IP. Se resetea al reiniciar el container (aceptable, no es banking).
3. **NO reCAPTCHA**: por privacidad (tracking de Google).
4. **NO Turnstile** todavía: si honeypot + rate limit no alcanzan, agregamos Cloudflare Turnstile.
5. **Validación email**: regex estándar. Opcional MX record check con `dns.promises.resolveMx()` — desactivado en v1 (latencia + edge cases).

### Variables de entorno (en Coolify)

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=vizcaia.technologies@gmail.com
SMTP_PASSWORD=<gmail app password>
OUTLINE_API_TOKEN=<token con scope documents.create>
OUTLINE_LEADS_COLLECTION_ID=<UUID de la colección "Leads" después de crearla>
NEXT_PUBLIC_SITE_URL=https://vizcaia.com
```

---

## 7. Analytics

### Decisión: Cloudflare Web Analytics

Razones:
- **Gratis**, ilimitado.
- **Sin cookies** → cero implicaciones GDPR/CCPA.
- **Setup en 5 minutos**: un `<script>` en `<head>`.
- **Métricas que necesitamos**: pageviews, source, referrer, country, device, top pages, tiempo promedio. Suficiente.
- **No requiere mantener infra** (a diferencia de Plausible self-hosted).

### Alternativa que descartamos

- **Plausible self-hosted**: bonito, autoalojable, pero requiere setup adicional + mantener container. Para una landing es overkill.
- **Google Analytics**: violación frontal de los principios del brand (privacy + tracking).
- **Umami self-hosted**: igual que Plausible — overhead innecesario.

### Implementación

1. En Cloudflare → Web Analytics → Add a site → `vizcaia.com`.
2. Cloudflare genera un `<script>` tag con un beacon token.
3. Lo metemos en `app/layout.tsx` solo en producción (NODE_ENV=production).

---

## 8. SEO + metadata

### Implementación

- `app/[locale]/layout.tsx` exporta `metadata: Metadata` por locale (title, description, openGraph, robots).
- `app/opengraph-image.tsx` genera el OG image dinámicamente (Next.js soporta esto nativo) — 1200×630, fondo ink, mark spark + tagline.
- `app/sitemap.ts` genera sitemap.xml con ambas versiones EN/ES + hreflang.
- `app/robots.ts` allow all + sitemap reference.
- Schema.org `Organization` markup en root layout (JSON-LD).

### Metadata por locale

**EN**:
- title: `Vizcaia — A foundry for intelligence`
- description: `We build AI agents and automations for US mid-market companies. Production-grade, not demos.`

**ES**:
- title: `Vizcaia — A foundry for intelligence`  (slogan se queda en EN)
- description: `Construimos AI agents y automatizaciones para empresas medianas. Producción real, no demos.`

### hreflang

```html
<link rel="alternate" hreflang="en" href="https://vizcaia.com/en" />
<link rel="alternate" hreflang="es" href="https://vizcaia.com/es" />
<link rel="alternate" hreflang="x-default" href="https://vizcaia.com/en" />
```

---

## 9. Performance

### Targets duros

- **Lighthouse > 90** en Performance, Accessibility, Best Practices, SEO.
- **LCP < 2.5s** en 3G.
- **CLS < 0.1**.
- **JS bundle inicial < 100 kB gzipped** (sin contar fonts).
- **First Contentful Paint < 1.5s**.

### Cómo lo logramos

- **Fonts self-hosted** con `next/font/local` + preload del woff2 above-the-fold.
- **Imágenes**: `next/image` con AVIF + WebP fallback. `priority` solo en hero.
- **Static optimization**: Next.js detecta páginas sin data dinámica y las pre-renderiza en build.
- **Standalone output** (`output: 'standalone'` en next.config.mjs) → Docker image más pequeña.
- **Sin animaciones JS pesadas**: solo CSS.
- **Tailwind purge** en build remueve clases no usadas.
- **Code splitting automático**: cada section como componente. Lazy load donde tenga sentido (probablemente innecesario en one-pager).

### CI: Lighthouse check

En `.github/workflows/ci.yml`:
```yaml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      https://staging.vizcaia.com/en
      https://staging.vizcaia.com/es
    budgetPath: ./lighthouse-budget.json
```

`lighthouse-budget.json` con thresholds 90 en cada métrica → falla el CI si baja.

---

## 10. Accesibilidad

### Implementación

- **Semántica HTML correcta**: `<main>`, `<nav>`, `<section>`, `<h1>` único por página.
- **Skip link** "Skip to main content" oculto pero visible en focus (primer focus de la página).
- **Alt text** en TODAS las imágenes; vacío (`alt=""`) si es decorativa.
- **Form labels** asociados con `<label for>` o `aria-labelledby`.
- **Mensajes de error del form** con `aria-live="polite"` para que screen readers los lean.
- **Focus visible**: ring color signal en todos los elementos interactivos (Tailwind `focus-visible:ring-2 focus-visible:ring-signal`).
- **Contraste**: paleta del manual ya pensada para WCAG AA. Verificar combinaciones específicas con axe DevTools.
- **Reduced motion**: `@media (prefers-reduced-motion: reduce) { * { animation: none !important; transition: none !important; } }`.

### Verificación

- **axe DevTools** en local antes de cada commit grande.
- **Lighthouse Accessibility > 90** en CI.

---

## 11. Deploy en Coolify

### Pasos one-time

1. **Crear colección "Leads" en Outline** para que el form pueda crear docs (vía API).
2. **Crear App en Coolify**:
   - Project: `vizcaia-publicos` (nuevo, separado de `vizcaia-infra`)
   - Resource: **Application** → **Public Repository**
   - Repository URL: `https://github.com/<usuario>/Vizcaia-Web` (cuando lo creemos)
   - Branch: `main`
   - Build pack: `Dockerfile` (custom)
   - Domain: `https://vizcaia.com` + agregar redirect `www.vizcaia.com` → `vizcaia.com`
3. **Environment Variables** en Coolify (lista en sección 6).
4. **Watch paths**: para que un push solo a `infra/` no re-despliegue, dejamos `src/, public/, package.json, Dockerfile, next.config.mjs, tailwind.config.ts` etc.

### Dockerfile multi-stage

```dockerfile
# 1. deps
FROM node:22-alpine AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# 2. build
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN corepack enable && pnpm build

# 3. runner
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

### Health check

`/api/health` route handler que retorna `{ ok: true, ts: Date.now() }`. Coolify lo usa para detectar el container listo.

---

## 12. CI/CD

### GitHub Actions (`.github/workflows/ci.yml`)

En cada PR a `main`:
- `pnpm install --frozen-lockfile`
- `pnpm lint` (Biome)
- `pnpm typecheck` (`tsc --noEmit`)
- `pnpm build` (verifica que compila)

En cada push a `main`:
- (todo lo anterior)
- Coolify webhook → triggers deploy automático.
- Lighthouse CI sobre la URL de staging (si la tenemos) o producción.

### Branches

- `main` → producción (vizcaia.com)
- `staging` → staging (staging.vizcaia.com, opcional)
- `feature/<slug>` → trabajo individual, sin auto-deploy

### Pre-commit hook (opcional)

Usar `husky` + `lint-staged` para format + lint en pre-commit. Si nos cansa: lo quitamos.

---

## 13. Decisiones que resuelven los PENDIENTES del spec

| Pendiente del spec | Decisión en plan |
|---|---|
| Texto del hero EN+ES | Placeholders en `messages/*.json`. Texto final lo escribimos con Mateo en la fase de implementación. |
| Form crea entry en Outline | **SÍ**. Reutilizamos el API token ya configurado. |
| Email del corp final | v1 con `vizcaia.technologies@gmail.com`. Cuando compre Google Workspace → cambiar a `hello@vizcaia.com`. NO bloqueante. |
| Analytics | **Cloudflare Web Analytics**. |
| Foto del equipo | **NO en v1**. Sigue principios brand (austero). Si después decidimos humanizar → v1.1. |
| Quitebe en el sitio | Mencionar como "production agricultural operations system, palm oil sector, 1000+ hectares — backend, mobile, BI dashboards". Sin nombrar cliente, sin imagen. Pedir autorización al cliente más adelante si queremos detalle. |
| Selector de idioma | Botón EN \| ES sticky en header. Persiste en cookie. Default EN. NO geo-IP en v1. |
| i18n approach | **Next.js i18n nativo con `[locale]` segment**. Sin librería externa. |

---

## 14. Riesgos técnicos

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Gmail SMTP marca mensajes como spam por volumen | Baja | App password legítimo + envíos a 2 destinatarios (no broadcast). Si crece, migrar a Resend ($20/mes 50k emails). |
| Outline API token expira inesperadamente | Media | Token actual expira ~2026-08-23. Renovar al menos 7 días antes. Health check al startup verifica que token funciona. |
| Bot spam supera honeypot + rate limit | Media | Si pasa, agregar Cloudflare Turnstile (gratis, sin tracking). |
| Lighthouse < 90 por fuentes pesadas | Baja | Subset Latin estricto + preload. Si falla, eliminar Instrument Serif (es solo decorativo). |
| Coolify se cae el día del lanzamiento | Baja | Sitio estático no crítico de uptime. Fallback: deploy temporal en Vercel free tier en 5 min si el VPS se cae. |
| Cliente USA percibe el sitio como "LATAM agency cheap" | Media | Copy preciso + diseño austero + tagline EN + cero localización LATAM en el copy. |

---

## 15. Pendientes para `/tasks`

Cosas que se concretarán al hacer la descomposición en tasks ejecutables:

- Lista exacta de componentes shadcn a copiar (Button, Input, Textarea, Select, Checkbox confirmados; ¿más?)
- Estructura concreta de `messages/en.json` y `es.json` (qué claves, anidamiento)
- Texto exacto de cada sección en EN+ES (Mateo)
- Cuándo crear la colección "Leads" en Outline (antes o durante implementación)
- Quién genera el SVG del mark "The Spark" definitivo (Santiago, a partir del path del brand manual)
- Imagen OG: ¿hecho con `app/opengraph-image.tsx` (dinámico) o PNG estático? Decisión menor.
- Si agregamos `staging.vizcaia.com` como rama separada (probable sí — cuesta 5 min en Coolify).

---

## 16. Para profundizar

- **Qué + por qué del sitio**: `spec.md`
- **ADRs del proyecto**: `decisions.md`
- **Brand manual**: `~/Documents/Vizcaia/Manual Marca Vizcaia/Vizcaia Brand Manual.html`
- **CLAUDE.md del repo**: `../../CLAUDE.md`
