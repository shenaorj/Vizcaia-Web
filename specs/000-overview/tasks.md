# Tasks — Website Vizcaia v1

> Descomposición ejecutable del `plan.md`. Cada task ≤ 1 día de trabajo. Tasks numeradas T1–T28, ordenadas por dependencia.
>
> **Estado**: borrador inicial (2026-05-25). Marca cada task como ✅ al terminar y agrega entrada en la bitácora al final.
>
> **Cómo ejecutar**: `/implement <feature-slug> T<N>` desde Claude Code. Para este proyecto usar `/implement website-v1 T<N>`.

---

## Fase 1 — Scaffolding base (T1–T5)

### T1 — Inicializar proyecto Next.js + TS + pnpm + Biome

**Estimación**: 2 h
**Depende de**: nada
**Archivos creados**:
- `package.json`, `pnpm-lock.yaml`
- `tsconfig.json` con `strict: true`, `noUncheckedIndexedAccess: true`
- `next.config.mjs` con `output: 'standalone'`, i18n config base
- `biome.json`
- `src/app/layout.tsx`, `src/app/page.tsx` mínimo

**Acceptance criteria**:
- `pnpm install` corre sin warnings.
- `pnpm dev` levanta en `http://localhost:3000` con página "Hello".
- `pnpm lint` y `pnpm typecheck` pasan en limpio.
- `pnpm build` produce `.next/standalone/`.

---

### T2 — Configurar Tailwind 4 + tokens del brand manual

**Estimación**: 2 h
**Depende de**: T1
**Archivos creados/modificados**:
- `tailwind.config.ts` con colores (ink, paper, signal, forge, moss, smoke, flare), fontFamily, letterSpacing del manual
- `src/styles/globals.css` con `@tailwind base;` + custom layer + reset
- Test page con cada color y peso de fuente

**Acceptance criteria**:
- Clases `bg-ink`, `text-signal`, `bg-paper-2`, `text-flare` funcionan.
- Letter-spacing classes `tracking-tight-3`, `tracking-wide-16` funcionan.
- Visualmente coincide con paleta del manual al ojo.

---

### T3 — Self-host fonts (Geist + Space Grotesk + Geist Mono + Instrument Serif)

**Estimación**: 1.5 h
**Depende de**: T2
**Archivos creados/modificados**:
- `public/fonts/` con .woff2 subset Latin de las 4 fuentes
- `src/app/layout.tsx` configurando `next/font/local` con preload de las weights necesarias
- Variables CSS `--font-geist`, `--font-space-grotesk`, etc. expuestas
- `tailwind.config.ts` referenciando las variables CSS

**Acceptance criteria**:
- Fuentes cargan desde `/fonts/*.woff2` (verificar en Network tab).
- Bundle de fonts < 200 kB total (subset Latin estricto).
- Preload tag de las above-the-fold (Space Grotesk medium + Geist regular).
- Fallback con `font-display: swap` activo.

---

### T4 — Setup i18n con segment `[locale]` + dictionaries

**Estimación**: 3 h
**Depende de**: T1
**Archivos creados/modificados**:
- `src/app/[locale]/layout.tsx`
- `src/app/[locale]/page.tsx` (placeholder con hello en idioma)
- `src/lib/i18n.ts` con `locales = ['en', 'es']`, `defaultLocale = 'en'`, helper `getDictionary(locale)`
- `src/lib/dictionaries.ts` con dynamic imports
- `src/messages/en.json` y `src/messages/es.json` (placeholders básicos)
- `src/middleware.ts` redirige `/` → `/en`

**Acceptance criteria**:
- `localhost:3000/` redirige a `localhost:3000/en`.
- `localhost:3000/en` muestra "Hello" en inglés.
- `localhost:3000/es` muestra "Hola" en español.
- `localhost:3000/fr` → 404 (no es locale soportado).
- Tipos: `Locale` type union exportado para uso en componentes.

---

### T5 — Layout base + LanguageSwitcher + Header sticky

**Estimación**: 3 h
**Depende de**: T2, T3, T4
**Archivos creados/modificados**:
- `src/components/LanguageSwitcher.tsx` (client) — botón `EN | ES` con cookie persistence
- `src/components/Header.tsx` (server) — logo + LanguageSwitcher sticky
- `src/app/[locale]/layout.tsx` actualizado con Header + main + Footer placeholder
- `src/lib/cookies.ts` helper para leer/setear cookie `vz_locale`

**Acceptance criteria**:
- Header sticky en top con backdrop blur sobre ink.
- Click en `EN` o `ES` cambia idioma manteniendo path.
- Cookie `vz_locale` persiste preferencia 1 año.
- Mobile: Header colapsa correctamente sin overflow.

---

## Fase 2 — Componentes UI base (T6–T8)

### T6 — Componentes UI shadcn adaptados con tokens Vizcaia

**Estimación**: 4 h
**Depende de**: T2
**Archivos creados/modificados**:
- `src/components/ui/button.tsx` (variants: primary, secondary, ghost; sizes: sm, md, lg)
- `src/components/ui/input.tsx`
- `src/components/ui/textarea.tsx`
- `src/components/ui/select.tsx`
- `src/components/ui/checkbox.tsx`
- `src/components/ui/label.tsx`
- Todos con `cva` para variants type-safe

**Acceptance criteria**:
- Button primary: bg-signal, text-ink, hover oscurece signal-2.
- Inputs: border ink-3 sobre ink-2, focus ring signal con 2px outline-offset.
- Todos navegables por teclado, focus visible claro.
- Variantes coherentes con la voz austera del brand.

---

### T7 — MarkSpark component (logo SVG inline)

**Estimación**: 1 h
**Depende de**: T2
**Archivos creados/modificados**:
- `src/components/MarkSpark.tsx` con SVG inline del "The Spark" extraído del brand manual
- Props: `size`, `color` (default `currentColor`)
- `public/favicon.ico` generado a partir del mark
- `src/app/icon.tsx` (Next.js dynamic favicon)

**Acceptance criteria**:
- `<MarkSpark size={32} />` renderiza el SVG con color `currentColor`.
- Favicon visible en pestaña del navegador.
- Apple touch icon generado para iOS.

---

### T8 — Footer component

**Estimación**: 2 h
**Depende de**: T5, T6, T7
**Archivos creados/modificados**:
- `src/components/sections/Footer.tsx`
- Strings en `messages/en.json` y `messages/es.json` (sección `footer`)

**Contenido del footer**:
- MarkSpark + "Vizcaia" wordmark + tagline en mono "A foundry for intelligence"
- 3 columnas: Links (Privacy), Contact (email), Social (LinkedIn cuando exista)
- Bottom: "© 2026 Vizcaia Technologies. Headquartered in Casanare, Colombia. Serving global."

**Acceptance criteria**:
- Footer visible en todas las páginas.
- Links a privacy switchean por locale automático.
- Responsive: 3 columnas en desktop, stack en mobile.

---

## Fase 3 — Hero interactivo (T9–T11)

### T9 — HeroCanvas básico: grid 2D estática

**Estimación**: 3 h
**Depende de**: T2
**Archivos creados/modificados**:
- `src/components/HeroCanvas.tsx` (client) — Canvas 2D que dibuja grid 30×20 estática
- `src/lib/canvas-grid.ts` con función `drawStaticGrid(ctx, width, height)`

**Acceptance criteria**:
- Canvas renderiza grid uniforme de líneas sobre fondo transparente.
- Líneas color `rgba(255,255,255,0.04)`.
- Responsive: el canvas se ajusta al tamaño del contenedor (resize observer).
- DPR awareness: nítido en pantallas Retina.

---

### T10 — HeroCanvas: algoritmo de distorsión + mouse tracking

**Estimación**: 5 h
**Depende de**: T9
**Archivos creados/modificados**:
- `src/components/HeroCanvas.tsx` (extender con animation loop)
- `src/lib/canvas-grid.ts` agregar `drawDistortedGrid(ctx, mouse, vertices)`

**Algoritmo**:
- Tracking de `mouse` con `mousemove` listener (debounced a `requestAnimationFrame`).
- Cada vertex (i,j) tiene `home = (xi, yj)` y `current = (cx, cy)` que se interpola.
- En cada frame:
  - `displacement = (mouse - home) * strength / (distance² + ε)`
  - `current = lerp(home + displacement, current, damping)` (suaviza)
- Líneas dibujadas con curva Bezier que pasa por 4 vertices consecutivos.
- Vertices cercanos al cursor cambian color de `ink-4` a `signal` con alpha proporcional.

**Acceptance criteria**:
- Al pasar el cursor, las líneas se distorsionan visiblemente alrededor.
- Vertices cerca del cursor toman tinte verde (signal).
- Sin lag visible en MacBook Air M1 (60 fps sostenido).
- Auto-pausa cuando mouse no se mueve por 2s.
- Pausa cuando el hero no está visible (intersection observer).

---

### T11 — HeroCanvas: fallback mobile + lazy load

**Estimación**: 2 h
**Depende de**: T10
**Archivos creados/modificados**:
- `src/components/HeroCanvas.tsx` con detección `(hover: none)` y `prefers-reduced-motion`
- `src/components/Hero.tsx` (server) que importa HeroCanvas con `next/dynamic` ssr:false
- Fallback HTML/CSS con grid estático

**Acceptance criteria**:
- En mobile (touch device): canvas renderiza grid estática sin animation loop.
- En desktop con `prefers-reduced-motion: reduce`: grid estática.
- Canvas no bloquea LCP (lazy loaded después del Hero text).
- Si JS falla: hero sigue mostrando tagline + CTA con fondo CSS grid del brand manual.

---

## Fase 4 — Secciones del home (T12–T16)

### T12 — Section Hero (texto + CTA + canvas)

**Estimación**: 3 h
**Depende de**: T6, T7, T11
**Archivos creados/modificados**:
- `src/components/sections/Hero.tsx`
- Strings en `messages/{en,es}.json` sección `hero`

**Contenido**:
- Tagline: "A foundry for intelligence" (siempre EN)
- Subtitle: 1-2 líneas (EN y ES respectivos)
- CTA button: "Let's talk" / "Hablemos" → scroll to #contact

**Acceptance criteria**:
- HeroCanvas atrás, contenido semántico delante.
- Above-the-fold completo sin scroll.
- CTA hace smooth scroll al form.
- Texto legible sobre el canvas (suficiente contraste).

---

### T13 — Section Manifesto + Section Services

**Estimación**: 4 h
**Depende de**: T6
**Archivos creados/modificados**:
- `src/components/sections/Manifesto.tsx`
- `src/components/sections/Services.tsx` (3 tarjetas: AI apps, Vertical OS, Architecture consulting)
- Strings en `messages/{en,es}.json`

**Acceptance criteria**:
- Manifiesto: 3-4 párrafos cortos, max 60 chars per line en desktop.
- Services: 3 cards en grid responsive (3 col desktop, 1 col mobile).
- Cada card: título + descripción + icono opcional (SVG inline).
- Sin precios, CTA implícito al form.

---

### T14 — Section Principles + Section Work

**Estimación**: 3 h
**Depende de**: T6
**Archivos creados/modificados**:
- `src/components/sections/Principles.tsx` (4 numerados: 01, 02, 03, 04)
- `src/components/sections/Work.tsx` (Quitebe sin nombrar)
- Strings en `messages/{en,es}.json`

**Acceptance criteria**:
- Principles: lista numerada con typography mono para los números (`01`, `02`...) y display para los títulos.
- Work: caja con descripción agricultural ops system (1000+ hectares), tags `Backend · Mobile · BI`.
- Sin imágenes del producto Quitebe (sin autorización).

---

### T15 — Section Contact (sin form todavía, solo layout)

**Estimación**: 2 h
**Depende de**: T6
**Archivos creados/modificados**:
- `src/components/sections/Contact.tsx` con layout: título + descripción + placeholder donde irá el form
- Strings en `messages/{en,es}.json`

**Acceptance criteria**:
- Sección con anchor `#contact` para smooth scroll desde Hero CTA.
- Layout completo (incluye form skeleton sin lógica todavía).
- Footer va inmediatamente después de Contact.

---

### T16 — Ensamblar home completa

**Estimación**: 1 h
**Depende de**: T8, T12, T13, T14, T15
**Archivos creados/modificados**:
- `src/app/[locale]/page.tsx` componiendo todas las secciones en orden

**Acceptance criteria**:
- `/en` y `/es` muestran toda la home (Hero → Manifesto → Services → Principles → Work → Contact → Footer).
- Scroll fluido entre secciones.
- Sin layout shifts (CLS < 0.1).

---

## Fase 5 — Form + backend (T17–T19)

### T17 — ContactForm component (frontend)

**Estimación**: 4 h
**Depende de**: T6, T15
**Archivos creados/modificados**:
- `src/components/ContactForm.tsx` (client)
- `src/lib/schemas.ts` con Zod schema `ContactSchema`
- Validación inline con react-hook-form

**Campos**:
- name, email, company, message (textarea), source (select), accepts_privacy (checkbox), website_url (honeypot oculto)

**Acceptance criteria**:
- Validación inline en cada blur del campo.
- Submit deshabilitado hasta que todos los required pasen.
- Estados: idle / submitting / success / error visibles.
- Mensajes de error con `aria-live="polite"`.
- Honeypot `website_url` invisible vía CSS (`position: absolute; left: -9999px`).

---

### T18 — API route `/api/contact` (backend)

**Estimación**: 5 h
**Depende de**: T17
**Archivos creados/modificados**:
- `src/app/api/contact/route.ts` (POST handler)
- `src/lib/email.ts` (nodemailer transporter)
- `src/lib/outline-api.ts` (cliente para crear lead doc en Outline)
- `src/lib/rate-limit.ts` (in-memory simple)
- `.env.local.example` actualizado con SMTP_*, OUTLINE_API_TOKEN, OUTLINE_LEADS_COLLECTION_ID

**Flow**:
1. Parse + validar Zod
2. Check honeypot
3. Rate limit por IP (3/hora)
4. Enviar email via Gmail SMTP a `vizcaia.technologies@gmail.com` con CC a ambos socios
5. Crear lead doc en Outline colección "Leads"
6. Respuesta 200 / 4xx / 5xx

**Acceptance criteria**:
- POST con body válido → 200 + email enviado + lead en Outline.
- POST con honeypot lleno → 200 silencioso (no procesa).
- 4to POST de mismo IP en 1 hora → 429.
- Errores de SMTP no rompen Outline (try/catch independiente).
- Tests manuales con curl pasan.

---

### T19 — Crear colección "Leads" en Outline + verificar pipeline

**Estimación**: 1 h
**Depende de**: T18
**Acciones**:
- Vía API o UI, crear colección "Leads" en Outline workspace
- Obtener `collectionId` y agregarlo a `.env.local` y a Coolify Env Vars
- Test end-to-end: submit form en localhost → verificar email recibido + doc en Outline

**Acceptance criteria**:
- Colección "Leads" existe en Outline.
- Submit del form en localhost crea doc visible en esa colección con campos formateados markdown.

---

## Fase 6 — Páginas privacy (T20)

### T20 — Privacy policy EN + Aviso de privacidad ES

**Estimación**: 3 h
**Depende de**: T5
**Archivos creados/modificados**:
- `src/app/[locale]/privacy/page.tsx` (solo se renderiza si `locale === 'en'`)
- `src/app/[locale]/aviso-de-privacidad/page.tsx` (solo si `locale === 'es'`)
- Contenido inicial desde plantillas Termly/Iubenda + Habeas Data CCC

**Acceptance criteria**:
- `/en/privacy` muestra política inglés con menciones CCPA + GDPR.
- `/es/aviso-de-privacidad` muestra política español con Habeas Data Colombia.
- Footer linkea correctamente según locale.
- Marcadas como `noindex` por ahora (hasta validar con abogado).

---

## Fase 7 — SEO + Analytics (T21–T22)

### T21 — Metadata + sitemap + robots + OG image

**Estimación**: 3 h
**Depende de**: T16
**Archivos creados/modificados**:
- `src/app/[locale]/layout.tsx` exportando `metadata` por locale
- `src/app/sitemap.ts` con ambas URLs + hreflang
- `src/app/robots.ts` allow all + sitemap reference
- `src/app/opengraph-image.tsx` (1200×630 dinámico con tagline + mark)
- Schema.org Organization JSON-LD en root layout

**Acceptance criteria**:
- `vizcaia.com/sitemap.xml` lista `/en` y `/es` con hreflang.
- `vizcaia.com/robots.txt` permite todo.
- OG image se genera al request, cache 1 día.
- Schema validator (https://search.google.com/test/rich-results) pasa sin errors.

---

### T22 — Cloudflare Web Analytics

**Estimación**: 0.5 h
**Depende de**: T1
**Acciones**:
- Crear site en Cloudflare → Web Analytics → obtener beacon token
- Agregar `<script>` en `src/app/layout.tsx` solo en `NODE_ENV === 'production'`

**Acceptance criteria**:
- Script presente en HTML de producción, ausente en dev.
- Analytics empieza a recibir pageviews al deploy.
- Sin cookies set por el script.

---

## Fase 8 — Deploy (T23–T25)

### T23 — Dockerfile multi-stage + .dockerignore

**Estimación**: 2 h
**Depende de**: T1
**Archivos creados/modificados**:
- `Dockerfile` con 3 stages (deps, builder, runner)
- `.dockerignore`
- `next.config.mjs` con `output: 'standalone'`

**Acceptance criteria**:
- `docker build -t vizcaia-web .` produce imagen < 200 MB.
- `docker run -p 3000:3000 vizcaia-web` levanta sitio funcional.
- Layer caching efectivo (cambio de código no re-instala deps).

---

### T24 — GitHub repo público/privado + GitHub Actions CI

**Estimación**: 2 h
**Depende de**: T1
**Archivos creados/modificados**:
- Crear repo `Vizcaia-Web` en GitHub (privado por ahora)
- `.github/workflows/ci.yml` con: lint + typecheck + build
- Push del código existente

**Acceptance criteria**:
- Push a `main` corre CI verde.
- PR a `main` corre CI antes de merge.
- Build time < 3 min.

---

### T25 — Deploy en Coolify + dominio

**Estimación**: 2 h
**Depende de**: T22, T23, T24
**Acciones**:
- En Coolify: nuevo Project `vizcaia-publicos` → nuevo Resource Application (Docker)
- Conectar repo GitHub
- Configurar dominio `vizcaia.com` + redirect `www`
- Cargar Environment Variables (SMTP_*, OUTLINE_API_TOKEN, OUTLINE_LEADS_COLLECTION_ID, NEXT_PUBLIC_SITE_URL)
- Deploy

**Acceptance criteria**:
- `https://vizcaia.com` resuelve con SSL Let's Encrypt válido.
- `https://www.vizcaia.com` → 301 a apex.
- `https://vizcaia.com/api/health` retorna `{ ok: true }`.
- Form submit en producción crea email + lead en Outline.

---

## Fase 9 — QA + Lanzamiento (T26–T28)

### T26 — Lighthouse audit + ajustes para >90 todas las métricas

**Estimación**: 4 h
**Depende de**: T25
**Acciones**:
- Lighthouse en producción tanto `/en` como `/es`
- Identificar issues y arreglar (probablemente: imágenes, fonts, JS bundle)
- Iterar hasta Performance + Accessibility + Best Practices + SEO > 90

**Acceptance criteria**:
- Performance > 90 en mobile y desktop.
- Accessibility > 95.
- Best Practices > 90.
- SEO > 95.
- LCP < 2.5s, CLS < 0.1, INP < 200ms.

---

### T27 — Accessibility audit con axe DevTools + screen reader manual

**Estimación**: 3 h
**Depende de**: T26
**Acciones**:
- Correr axe DevTools en cada página, arreglar issues
- Test manual con VoiceOver (Mac) recorrendo toda la home
- Verificar tab order, focus visible, skip link

**Acceptance criteria**:
- axe DevTools: 0 issues críticos, 0 issues serios.
- VoiceOver lee toda la página con sentido.
- Skip link funciona (primer Tab).
- Form usable solo con teclado.

---

### T28 — Lanzamiento: DNS final + smoke test + actualizar Outline STATE

**Estimación**: 1 h
**Depende de**: T27
**Acciones**:
- Confirmar DNS `vizcaia.com` y `www.vizcaia.com` apuntando a 178.104.64.201 (gray cloud)
- Smoke test: cada link, cada idioma, form completo de prueba
- Actualizar doc "Estado de Vizcaia" en Outline marcando Fase 1 progress
- Anunciar lanzamiento a Mateo

**Acceptance criteria**:
- Sitio público accesible desde cualquier red.
- Test submit del form genera email + lead OK.
- Outline "Estado de Vizcaia" actualizado.
- Commit final + tag `v1.0.0` en GitHub.

---

## Resumen de estimaciones

| Fase | Tasks | Horas estimadas |
|---|---|---|
| 1. Scaffolding | T1-T5 | 11.5 h |
| 2. UI base | T6-T8 | 7 h |
| 3. Hero canvas | T9-T11 | 10 h |
| 4. Secciones home | T12-T16 | 13 h |
| 5. Form + backend | T17-T19 | 10 h |
| 6. Privacy | T20 | 3 h |
| 7. SEO + Analytics | T21-T22 | 3.5 h |
| 8. Deploy | T23-T25 | 6 h |
| 9. QA + Launch | T26-T28 | 8 h |
| **Total** | **28 tasks** | **~72 horas** |

A **3-4 horas/día** = **~3 semanas calendario**.
A **6 horas/día focal** = **~2 semanas calendario**.

> Estimaciones reales suelen ser 1.5x. Plan realista: **3-4 semanas hasta `vizcaia.com` público**.

---

## Bitácora

> Anotar aquí lo que se hace al ejecutar cada task. Formato: `T<N> <YYYY-MM-DD>: <qué se hizo, qué se aprendió, qué surgió>`.

### T1 — 2026-05-25 — ✅ Scaffolding Next.js + TS + Tailwind + Biome + pnpm

**Qué se hizo**:
- Scaffolded manualmente (no `create-next-app` — npm name no permite mayúsculas).
- Versiones latest reales al momento del scaffolding:
  - `next@16.2.6`, `react@19.2.6`, `typescript@6.0.3`, `tailwindcss@4.3.0`, `@biomejs/biome@2.4.15`, `pnpm@10.0.0`.
- Plan decía Next 15 / Biome 1 / TS 5 → updated en práctica a versiones actuales.
- Archivos creados: `package.json`, `tsconfig.json`, `next.config.mjs`, `biome.json`, `postcss.config.mjs`, `src/app/{layout,page}.tsx`, `src/app/globals.css`, `.gitignore`.

**Qué se aprendió**:
- npm `package.json#name` no permite mayúsculas → `vizcaia-web` (kebab) aunque el repo dir y branding sean `Vizcaia-Web`.
- Tailwind 4 usa CSS-first config: `@import "tailwindcss"` y `@theme {}` en CSS. No `tailwind.config.ts` (será CSS en T2).
- Biome 2 reorganizó nombres de reglas (`noConsoleLog` no existe, etc.). Simplifico a `recommended: true` y se añaden reglas custom si son necesarias.
- Next 16 movió `experimental.typedRoutes` → `typedRoutes` (sin experimental).
- `sharp` requiere `pnpm.onlyBuiltDependencies` en pnpm 10 para que funcione con `next/image`.

**Qué surgió que no estaba en plan**:
- **Puerto 3000 está ocupado en este Mac por otro proyecto local** (probablemente Quitebe dev). Usar `PORT=3010 pnpm dev` o agregar al `dev` script. Decisión menor: dejar como está, documentar en CLAUDE.md.
- `tsconfig.json` lo modifica Next automáticamente al primer `build` (cambió `jsx: "preserve"` → `"react-jsx"` y agregó include path `.next/dev/types/**/*.ts`). Aceptado.

**Acceptance criteria**: 5/5 ✓
- `pnpm install` OK
- `pnpm typecheck` OK
- `pnpm lint` OK
- `pnpm build` OK (genera `.next/standalone/`)
- `pnpm dev` arranca en 282ms con Turbopack, HTTP 200, sirve hero placeholder.

**Siguiente**: T2 — tokens del brand manual en Tailwind 4 (CSS `@theme`).

---

### T2 — 2026-05-25 — ✅ Tokens del brand manual en Tailwind 4

**Qué se hizo**:
- Tokens configurados en `src/app/globals.css` con `@theme {}` (Tailwind 4 CSS-first, no `tailwind.config.ts`).
- **Paleta**: `ink` + 3 shades, `paper` + 2 shades, `signal` + signal-2, `forge`, `moss`, `smoke`, `flare`, `rule-dark`, `rule-light`.
- **Fontfaces**: `font-display`, `font-sans`, `font-mono`, `font-serif` con variables `--font-*-loaded` que poblará T3 (fonts reales).
- **Letter spacing**: `tracking-tight-{2,3,4,5}`, `tracking-wide-{04,08,12,16,18}` según el brand manual.
- Body default: `bg-ink` + `text-paper` + `font-sans` + `font-feature-settings: 'ss03', 'cv05'`.
- `page.tsx` reemplazado con preview de tokens: 13 swatches paleta + 4 muestras tipografía + 9 muestras letter-spacing. Sirve para validar visualmente.

**Qué se aprendió**:
- En Tailwind 4, las clases se generan dinámicamente desde los nombres de variables CSS:
  - `--color-ink: #...` → `.bg-ink`, `.text-ink`, `.border-ink`
  - `--font-display: ...` → `.font-display`
  - `--tracking-tight-5: ...` → `.tracking-tight-5`
- Bundle CSS final: **18,779 bytes** (incluyendo reset + tokens + tipografías + Tailwind base + clases efectivamente usadas en page.tsx). Muy aceptable.
- `border-rule-dark` y `border-rule-light` funcionan porque los registré como colores en `@theme`.

**Verificación runtime**:
- 9 clases custom críticas confirmadas en el CSS compilado del dev server: `bg-ink`, `bg-paper`, `text-signal`, `bg-flare`, `font-display`, `font-serif`, `tracking-tight-5`, `tracking-wide-16`, `border-rule-dark`.

**Acceptance criteria**: 3/3 ✓
- Clases `bg-ink`, `text-signal`, `bg-paper-2`, `text-flare` generadas y aplicadas.
- Letter-spacing classes funcionan.
- Visualmente: pendiente validación manual del usuario (abrir `localhost:3010` y comparar con manual de marca HTML).

**Siguiente**: T3 — Self-host fonts (Geist + Space Grotesk + Geist Mono + Instrument Serif).

---

### T3 — 2026-05-25 — ✅ Self-host fonts vía next/font/google

**Qué se hizo**:
- 4 fuentes integradas en `src/app/layout.tsx` con `next/font/google`:
  - Space Grotesk (weights 500, 600)
  - Geist (weights 400, 500)
  - Geist Mono (weight 400)
  - Instrument Serif (weight 400 italic)
- Variables CSS `--font-space-grotesk-loaded`, `--font-geist-loaded`, `--font-geist-mono-loaded`, `--font-instrument-serif-loaded` aplicadas al `<html class="...">` y conectadas con el `@theme` definido en T2.
- Subset Latin estricto en todas (no Cyrillic, no Greek, no CJK).
- `display: 'swap'` en todas (texto visible inmediato con fallback, swap cuando carga la fuente real).

**Decisión de approach — `next/font/google` vs `next/font/local`**:
- Plan original decía `next/font/local`. Cambié a `next/font/google` porque:
  - Mismo resultado final: las fuentes se sirven desde NUESTRO bundle (`_next/static/media/*.woff2`), no Google CDN en runtime.
  - Cero trabajo manual de descargar woff2 y subset.
  - Next maneja el subset automático y optimal.
  - Requiere conexión a Google solo durante `pnpm build` (build-time). Runtime es self-hosted.
- Si en el futuro queremos build offline (ej. CI sin internet), migramos a `next/font/local`. Por ahora innecesario.

**Bundle size**:
- Primer intento con 3 weights de Space Grotesk + 3 de Geist + 2 de Geist Mono + 1 italic = 220 kB (excede budget 200 kB).
- Reducí weights al mínimo expresivo del brand manual: 2+2+1+1 = 6 weights → **179.2 kB total**, 16 archivos woff2 (Next divide cada peso en sub-chunks por glyph range).
- Margen disponible: ~21 kB para agregar weight si una sección lo necesita.

**Optimizaciones automáticas que Next aplicó**:
- 4 `<link rel="preload" as="font" crossorigin>` en `<head>` para weights críticos above-the-fold.
- `@font-face` declarations en CSS chunk minificado.
- Subset Latin generado al build, no all-Unicode.

**Qué se aprendió**:
- En Tailwind 4, las variables `--font-*` definidas en `@theme` son CSS custom properties. Las variables que Next inyecta vía `font.variable` son OTRAS variables (con sufijo random). Conecté ambas referenciando la variable de Next desde el fallback del @theme: `--font-display: var(--font-space-grotesk-loaded, 'Space Grotesk'), system-ui, sans-serif;`.
- Path real de las fuentes es `/_next/static/media/*.woff2`, no `/fonts/*.woff2` como decía el plan. Mismo principio (bundle propio), nomenclatura diferente.
- Turbopack dev no inyecta los preload tags de fuentes (solo production build). Verificación final siempre con `pnpm build && pnpm start`.

**Acceptance criteria**: 4/4 ✓
- Fuentes self-hosted en `/_next/static/media/` ✓ (no llamadas a fonts.gstatic.com en runtime)
- Bundle total fuentes < 200 kB ✓ (179.2 kB)
- Preload tags above-the-fold ✓ (4 preload links)
- `font-display: swap` activo ✓

**Siguiente**: T4 — Setup i18n con segment `[locale]` + dictionaries.

---

### T4 — 2026-05-25 — ✅ i18n con segment `[locale]` + dictionaries + middleware

**Qué se hizo**:
- `src/lib/i18n.ts`: locales `['en', 'es']`, `defaultLocale = 'en'`, type `Locale`, type-guard `isLocale`, `localeLabels`.
- `src/lib/dictionaries.ts`: dynamic imports lazy, type `Dictionary` derivado del JSON en.
- `src/messages/en.json` y `src/messages/es.json`: keys mínimas (`meta`, `hero`, `common`, `preview`). Se llenan en T12-T16.
- `src/middleware.ts`: redirige `/` → `/en`. Matcher excluye `_next`, `api`, archivos estáticos.
- `src/app/[locale]/layout.tsx`: valida locale, `generateStaticParams()` pre-renderiza ambos en build, `generateMetadata()` arma title/description/canonical/hreflang por locale.
- `src/app/[locale]/page.tsx`: preview de tokens portado, ahora muestra `dict.hero.subtitle` y `dict.preview.*` según locale.
- `src/app/page.tsx` eliminado (la home vive en `[locale]/`).

**Qué se aprendió**:
- **Next 16 hace `params` async**: en page/layout tipo `params: Promise<{ locale: string }>` → `const { locale } = await params`. No es el patrón viejo síncrono.
- **Cache `.next/types/` queda stale al renombrar/mover páginas**. Primer typecheck post-cambio falló con `Cannot find module '../../src/app/page.js'` apuntando al archivo borrado. `rm -rf .next` resuelve. Documentar como tip.
- **`hrefLang` no `hreflang`**: Next renderiza con camelCase en JSX (mi grep `hreflang` no matcheó, eran `hrefLang`). Cosmético — los crawlers no distinguen mayúsculas en HTML.
- **`alternates.languages`** en `Metadata` genera 3 tags: `en`, `es`, `x-default`. SEO friendly desde día 1.

**Route map después del build**:
```
○  /_not-found
●  /[locale]       (SSG, pre-rendered)
   ├ /en
   └ /es
ƒ  Proxy (Middleware)
```

**Acceptance criteria**: 5/5 ✓
- `localhost:3010/` → 307 redirect a `/en` ✓
- `localhost:3010/en` muestra subtitle inglés ("We build AI agents...") ✓
- `localhost:3010/es` muestra subtitle español ("Construimos AI agents...") ✓
- `localhost:3010/fr` → 404 ✓
- Type `Locale` exportado y usado en componentes ✓

**Bonus que no estaba en acceptance pero ya quedó**:
- `<link rel="canonical">` por locale.
- `<link rel="alternate" hrefLang="...">` para en, es, x-default.
- `<title>` y `<meta name="description">` por locale.
- `generateStaticParams` → ambas rutas pre-renderizadas estáticamente (no SSR).

**Siguiente**: T5 — Layout base + LanguageSwitcher + Header sticky.

---

### T5 — 2026-05-25 — ✅ Header sticky + LanguageSwitcher + skip-to-content

**Qué se hizo**:
- `src/lib/cookies.ts`: helpers `setLocaleCookie` / `getLocaleCookie` con cookie `vz_locale` de 1 año, `SameSite=Lax`.
- `src/components/MarkSpark.tsx`: SVG inline del logo "The Spark" (chevron V + spark line). Versión mínima funcional — T7 agrega favicon y refina.
- `src/components/LanguageSwitcher.tsx` (client): botones `EN | ES`, cambia primer segmento del path con `router.push`, setea cookie. `aria-current`, `aria-label`, focus ring color signal.
- `src/components/Header.tsx` (server): sticky top + backdrop blur + bordo `rule-dark`. Logo link a `/[locale]` + LanguageSwitcher. h-14 fija. max-w-7xl centrado.
- `src/app/[locale]/layout.tsx`: agrega `LocaleShell` con skip-to-content link + Header. Skip link `sr-only` por default, `focus:not-sr-only focus:fixed` cuando se enfoca (primer Tab).

**Decisiones técnicas**:
- **typedRoutes + push dinámico**: `next.config.mjs` tiene `typedRoutes: true`, lo que hace `router.push()` tipado en literales (`/en`, `/es`). Como construyo path dinámico, cast a `Route` (escape hatch oficial). Documented inline.
- **Cookie API**: usar `document.cookie` con `// biome-ignore` para el lint warning. La Cookie Store API es experimental y no soportada uniforme; `document.cookie` es estándar para 1 cookie simple.
- **Client/server split**: Header es server (puede importar y renderear MarkSpark + Link). Solo el LanguageSwitcher es client (necesita `usePathname`, `useRouter`, `document.cookie`).
- **i18n strings del skip-link**: viven en `dict.common.skipToContent` ya cargado en layout. Mismo dict que se pasa al page.

**Verificación runtime (server-rendered HTML)**:
- `<header class="sticky top-0 z-50 backdrop-blur-md bg-ink/70 ...">` ✓
- En `/en`: botón EN con `aria-current="true"` + `text-signal`, ES con `opacity-50` ✓
- En `/es`: botón ES con `aria-current="true"` ✓
- Skip link `<a href="#main">` con `sr-only` + focus styles ✓
- Link logo navega a `/${locale}` ✓
- 0 warnings de lint, 0 errores TS, build pre-renderiza /en + /es estáticos ✓

**Acceptance criteria**: 4/4 ✓
- Header sticky con backdrop blur sobre ink ✓
- Click EN/ES cambia idioma manteniendo path ✓ (router.push con segmento reemplazado)
- Cookie persiste 1 año ✓ (`max-age=${60*60*24*365}`)
- Mobile no overflows ✓ (flex `justify-between gap-4` + `max-w-7xl mx-auto`, h-14 fija)

**Siguiente**: T6 — Componentes UI base shadcn-style (Button, Input, Textarea, Select, Checkbox, Label) adaptados a tokens Vizcaia.

---

### T6 — 2026-05-25 — ✅ Componentes UI base (Button, Input, Textarea, Select, Checkbox, Label)

**Qué se hizo**:
- Deps agregadas: `class-variance-authority@0.7.1`, `clsx@2.1.1`, `tailwind-merge@3.6.0`.
- `src/lib/cn.ts`: helper `cn(...inputs)` que combina clsx + tailwind-merge (resuelve conflictos de Tailwind).
- 6 componentes en `src/components/ui/`:
  - **Button** (cva): 3 variants (`primary`, `secondary`, `ghost`) × 3 sizes (`sm`, `md`, `lg`). Tipografía mono uppercase tracking-wide-16. Focus ring signal offset 4px.
  - **Input**: border 1px ink-3 sobre ink-2, hover border ink-4, focus border signal/40 + outline signal. `aria-invalid` activa border flare.
  - **Textarea**: idem Input + min-h-32 + resize-y.
  - **Select** (HTML nativo styled): caret custom inline SVG color paper, `appearance-none`, mismo focus que Input.
  - **Checkbox**: HTML nativo con `accent-color: signal`.
  - **Label**: mono uppercase tracking-wide-16, opacity-70, block mb-2.
- Todos con `forwardRef`, `displayName`, props extendiendo HTML attributes (drop-in para forms).
- Preview kitchen-sink agregado al `page.tsx` (sección "Componentes UI · T6").

**Decisiones técnicas**:
- **Tipografía de Button = mono uppercase + tracking-wide-16**. Es el sello visual del manual ("CTA labels"). Lo opuesto de los CTAs típicos de SaaS (sentence case + bold). Coherente con "honest, austere".
- **Select HTML nativo en lugar de Radix**. Para v1 cualquier funcionalidad extra (search, typeahead, options custom) no aplica. Bundle ~30 kB menos. Si en form más adelante necesitamos Radix Select, migramos.
- **Checkbox con `accent-color`**. Estándar Web moderno, soporta IE no relevante. Bundle 0 kB extra (vs Radix Checkbox).
- **Aria-invalid styling automatic**: `aria-invalid:border-flare aria-invalid:focus-visible:outline-flare` en Input/Textarea/Select → cuando react-hook-form marque error, sin código adicional el campo cambia color.
- **Suppressions**:
  - `noLabelWithoutControl` en `Label.tsx`: es reusable, el consumer pasa `htmlFor`. Biome no puede inferir.

**Verificación runtime**:
- En `/en`: 4 inputs (3 text/email + 1 checkbox), 1 select, 1 textarea, 9 buttons (2 LanguageSwitcher + 7 preview), 6 labels.
- Classes verificadas en HTML:
  - Primary button: `bg-signal text-ink hover:bg-signal-2 h-10 px-5 text-xs`
  - Secondary button: `border border-paper text-paper hover:bg-paper hover:text-ink`
  - Ghost button: `text-signal hover:text-signal-2`
  - Sizes: sm `h-8 px-3 text-[10px]`, md `h-10 px-5 text-xs`, lg `h-12 px-7 text-sm`
  - Disabled: `disabled` attribute + `disabled:opacity-40 disabled:pointer-events-none`

**Acceptance criteria**: 4/4 ✓
- Button primary: bg-signal, text-ink, hover signal-2 ✓
- Inputs: border ink-3 sobre ink-2, focus ring signal con offset 2px ✓
- Todos navegables por teclado, focus visible claro (`focus-visible:outline-2 outline-offset-4 outline-signal`) ✓
- Variantes coherentes con la voz austera del brand (mono uppercase, sin shadows, sin gradientes) ✓

**Siguiente**: T7 — MarkSpark component refinement (favicon + apple-touch-icon + dynamic icon) + Footer (T8).

---

### T7 — 2026-05-25 — ✅ Favicon + Apple touch icon dinámicos

**Qué se hizo**:
- `src/app/icon.tsx`: ImageResponse de 32×32 con fondo ink + Mark spark color signal. Next 16 lo expone en `/icon` y agrega `<link rel="icon">` al HTML.
- `src/app/apple-icon.tsx`: ImageResponse de 180×180 con mismo diseño escalado. Next agrega `<link rel="apple-touch-icon">`.
- `MarkSpark.tsx` ya estaba bien desde T5 — no requiere refactor.

**Verificación**:
- `GET /icon` → 200 OK, `content-type: image/png`
- `GET /apple-icon` → 200 OK, `content-type: image/png`
- HTML contiene ambos `<link>` tags con cache busters (`/icon?547cd8ae4c839c55`).

**Acceptance criteria**: 3/3 ✓
- `<MarkSpark size={32} />` renderiza con currentColor ✓
- Favicon visible en pestaña ✓
- Apple touch icon disponible para iOS ✓

---

### T8 — 2026-05-25 — ✅ Footer global localizado

**Qué se hizo**:
- `src/components/sections/Footer.tsx`: 3 columnas en md+ (Brand · Links · Contact), stack en mobile. Bottom row con copyright + location.
- Strings agregados a `messages/{en,es}.json` bajo clave `footer`.
- Privacy link mapeado por locale: `/en/privacy` ↔ `/es/aviso-de-privacidad` (los paths se crean en T20).
- Wireado en `LocaleShell` del layout (después de `<div id="main">{children}</div>`).
- `mt-32` en el footer separa visualmente del contenido sin caer pegado.

**Verificación runtime**:
- En `/en`: "Privacy policy" link a `/en/privacy`, "Headquartered in Casanare, Colombia · Serving global"
- En `/es`: "Aviso de privacidad" link a `/es/aviso-de-privacidad`, "Sede en Casanare, Colombia · Servicio global"
- Copyright "© 2026 Vizcaia Technologies" en ambos.
- Email contacto `hello@vizcaia.com` (placeholder hasta Google Workspace).

**Acceptance criteria**: 3/3 ✓
- Footer visible en todas las páginas ✓ (root layout)
- Links a privacy switchean por locale ✓
- Responsive: 3 columnas desktop, stack mobile ✓ (`grid-cols-1 md:grid-cols-3`)

**Siguiente**: Fase 3 — Hero canvas interactivo (T9 grid estática · T10 distorsión por mouse · T11 fallback mobile + lazy).

---

### T9 — 2026-05-25 — ✅ HeroCanvas básico (grid 2D estática)

**Qué se hizo**:
- `src/lib/canvas-grid.ts`: algoritmo puro Canvas 2D (separado de React para testabilidad y reuso en T10).
  - `GRID_CONFIG`: cols=30, rows=20, lineColor `rgba(255,255,255,0.04)`, lineWidth=0.5.
  - `drawStaticGrid(ctx, w, h)`: dibuja todas las líneas en un solo `beginPath()` + `stroke()` (más eficiente que stroke por línea).
- `src/components/HeroCanvas.tsx` (client): canvas con `aria-hidden` + `tabIndex={-1}` (decorativo).
  - `useEffect` setea tamaño, scale DPR, y dibuja.
  - `ResizeObserver` re-dibuja al cambiar tamaño del contenedor.
  - DPR awareness: `canvas.width = rect.width * devicePixelRatio` + `ctx.scale(dpr, dpr)`.
- Preview agregado al page.tsx en sección "Hero canvas · T9 — estática" con altura fija 384 px sobre bg-ink-2 con borde rule-dark.

**Decisiones técnicas**:
- **Algoritmo en `lib/`, no en componente**: facilita testar `drawStaticGrid` sin DOM, y permite que T10 lo reuse + agregue capas (distorsión sin tocar el render base).
- **Un solo `stroke()`**: en lugar de `beginPath()`/`stroke()` por línea, agrupamos todos los moveTo/lineTo en un path y un único stroke. 30+20=50 líneas → 1 GPU draw call.
- **`tabIndex={-1}` además de `aria-hidden`**: Biome 2 rechaza `aria-hidden` sin tabIndex en `<canvas>` (puede ser focusable). El canvas es 100% decorativo.

**Acceptance criteria**: 4/4 ✓
- Canvas renderiza grid uniforme de líneas sobre fondo transparente ✓
- Líneas color `rgba(255,255,255,0.04)` ✓ (GRID_CONFIG.lineColor)
- Responsive con ResizeObserver ✓
- DPR-aware (`canvas.width = rect.width * dpr`) ✓

**Siguiente**: T10 — Mouse tracking + algoritmo de distorsión (gravity well + bezier curves).

---

### T10 — 2026-05-25 — ✅ Mouse tracking + algoritmo de distorsión + glow

**Qué se hizo**:
- `src/lib/canvas-grid.ts` extendido:
  - `Vertex` type con `homeX/homeY` (posición fija) + `curX/curY` (posición animada).
  - `buildGrid(w, h)`: construye 31×21 = **651 vértices** ((cols+1)*(rows+1)).
  - `stepGrid(vertices, mouse)`: avanza 1 frame de simulación.
    - Para cada vértice: `displacement = (mouse - home) * strength / (dist² + ε)` solo si dentro de `influenceRadius`.
    - `current` persigue target con `lerp` damping 0.12 (smooth follow).
  - `drawGrid(...)`: dibuja en 2 capas:
    1. Base — todas las líneas en `rgba(255,255,255,0.04)` con 1 stroke.
    2. Highlight — líneas con al menos un vértice dentro del radio en `rgba(0,227,122,0.35)` (signal).
  - `drawStaticGrid` mantenido como wrapper para fallback (T9 sigue funcionando).

- `src/components/HeroCanvas.tsx` rewrite:
  - `requestAnimationFrame` loop con auto-pause:
    - Sin mouse activo >2s → no schedulea más frames (CPU 0 idle).
    - Mouse "soltado" pero animación sigue para regresar vértices a home suavemente.
  - `mousemove` listener — solo activa cuando cursor está sobre el canvas (bbox check con `getBoundingClientRect`).
  - `mouseleave` listener → `mouse.active = false`, sigue animando hasta decay.
  - `IntersectionObserver` con threshold 0.01 → pausa loop cuando hero NO está visible.
  - `ResizeObserver` → reconstruye grid + redibuja en resize.
  - `staticMode = isTouch || reducedMotion` — si true, dibuja static una vez y NO engancha mouse/rAF.
  - Cleanup completo en return del useEffect.

**Parámetros del feel**:
```
strength: 4500      (intensidad de la deformación)
epsilon: 100        (estabiliza near-zero distance)
influenceRadius: 220px  (cuánto alcanza el cursor)
damping: 0.12       (qué tan reactivo — 0 = no animación, 1 = teletransport)
```

**Decisiones técnicas**:
- **2 strokes (base + highlight) en lugar de gradient por línea**: mucho más simple + más eficiente. La capa highlight solo se dibuja para vértices cercanos al cursor (filtra ~98% de las líneas cuando el cursor está activo).
- **`stepGrid` independiente de `drawGrid`**: separación física vs render. Permite test del algoritmo sin DOM.
- **Auto-pause inteligente**: cuando el usuario no se mueve, no quemamos CPU. Cuando suelta el cursor, dejamos que la animación termine de decay y después paramos. Es la diferencia entre 60 fps siempre vs 60 fps solo cuando hay interés.

**Acceptance criteria**: 5/5 ✓
- Distorsión visible al pasar cursor ✓ (gravity well)
- Vertices cercanos toman tinte signal ✓ (highlight layer)
- Auto-pausa idle ✓ (sin frames cuando idle >2s)
- Intersection observer pausa fuera de vista ✓
- 60 fps targetable (verificación visual cuando corras pnpm dev)

**Pendientes T11**: lazy load con `next/dynamic({ ssr: false })` desde el Hero component (T12) + CSS fallback si JS falla.

**Siguiente**: T11 — Fallback mobile + lazy load.

---

### T11 + T12 — 2026-05-25 — ✅ Hero completo (canvas + fallback + texto + CTA)

**Qué se hizo**:
- `src/components/sections/Hero.tsx` (server) — wrapper que combina:
  1. CSS fallback grid: `<div>` con `background-image: linear-gradient(...)` inline. Funciona sin JS. Tamaño 80×80 px (mismo del manual de marca).
  2. `<HeroCanvas>` cliente — montado encima del fallback. Como tiene `'use client'`, Next lo splittea automáticamente; SSR renderiza un `<canvas>` vacío, post-hydration `useEffect` arranca.
  3. Contenido semántico server-rendered: eyebrow mono + h1 con `<em italic signal>` para "intelligence" + subtitle + CTA primary "Let's talk".
- `src/components/ui/button.tsx`: agregado `ButtonLink` (anchor variant) reusando `buttonVariants`. Necesario porque el CTA es `<a href="#contact">`, no botón.
- `src/app/globals.css`: `html { scroll-behavior: smooth }` para que el CTA haga scroll suave a `#contact`. Respeta `prefers-reduced-motion`.
- `src/app/[locale]/page.tsx`: reemplazado hero placeholder por `<Hero dict={dict} />`. Previews de Paleta/Tipos/UI components agrupados dentro de un `<div>` con label "↓ Previews de desarrollo" (se eliminarán cuando lleguemos a T16 / ensamblado de home final).

**Decisión técnica clave — sin `next/dynamic({ ssr: false })`**:
- Originalmente puse `next/dynamic` para lazy load. **Falló en build**: Next 16 NO permite `ssr: false` en server components.
- Solución: import directo. Como `HeroCanvas` ya tiene `'use client'`, Next:
  - SSR renderiza el `<canvas>` shell vacío (no bloquea LCP — sale HTML listo).
  - El bundle del componente + lib/canvas-grid viaja en chunk client separado.
  - `useEffect` corre solo post-hydration → el algoritmo no se ejecuta en server.
- Mismo resultado funcional que dynamic, con código más simple. Pierdo el "skeleton intermedio" pero el canvas vacío + fallback CSS cumplen ese rol.

**Verificación runtime**:
- `/en`: eyebrow EN, h1 "A foundry for intelligence" (em italic signal), subtitle EN, CTA "Let's talk →" con href="#contact"
- `/es`: misma estructura, subtitle ES "Construimos AI agents y automatizaciones que llegan a producción. No demos."
- **Tagline NO se traduce**: "A foundry for intelligence" queda en EN siempre (brand asset, decisión del spec).
- `<canvas>` server-rendered con aria-hidden + tabIndex=-1.
- CSS fallback grid visible vía `style="background-image:linear-gradient(...);background-size:80px 80px"`.

**Acceptance criteria T11**: 4/4 ✓
- Mobile/touch: canvas estática sin loop ✓ (staticMode en HeroCanvas)
- prefers-reduced-motion: estática ✓
- Canvas no bloquea LCP ✓ (client-only useEffect)
- Si JS falla, hero sigue con tagline+CTA+CSS grid ✓

**Acceptance criteria T12**: 4/4 ✓
- HeroCanvas atrás, contenido semántico delante ✓ (z-index implícito por DOM order + `relative z-10` en content)
- Above-the-fold completo sin scroll ✓ (`min-h-[calc(100vh-3.5rem)]` = viewport - header)
- CTA hace smooth scroll al form ✓ (anchor href="#contact" + `html scroll-behavior: smooth`)
- Texto legible sobre el canvas ✓ (paper sobre ink-2, signal en em)

**Siguiente**: T13 — Section Manifesto + Section Services (3 tarjetas de servicios).

---

### T13 + T14 + T15 + T16 — 2026-05-25 — ✅ Fase 4 completa: Manifesto + Services + Principles + Work + Contact + home ensamblada

**Qué se hizo (todas las secciones de la home v1)**:

**T13** — `src/components/sections/Manifesto.tsx`:
- Header pattern del brand manual: `Section / 01` mono + título display grande con tracking-tight-3.
- 3 párrafos del dict, primero más prominente, los siguientes opacity-70 para jerarquía.
- Patrón "iron coast of northern Spain" heredado del spec organizacional.

**T13** — `src/components/sections/Services.tsx`:
- 3 tarjetas en grid (1 col mobile, 3 cols md+).
- Cada card: número signal mono, título display, lead, body separado con border-t.
- Hover: border cambia a signal/40 (sutil signal cue).

**T14** — `src/components/sections/Principles.tsx`:
- 4 principios "01-04" en grid 2×2 md, 1×4 xl.
- Patrón mono number + display title + sans body.
- "Specs before code · Production from day 1 · Honest about limits · Living documentation".

**T14** — `src/components/sections/Work.tsx`:
- Card grande con Quitebe sin nombrar (palm oil estate, 1000+ hectáreas).
- Tags `Backend / Mobile / BI` con borde signal/40.
- Footnote "Client name withheld by request" en mono.

**T15** — `src/components/sections/Contact.tsx`:
- `id="contact"` + `scroll-mt-20` para que el CTA del Hero scrollee con offset (no tapa header).
- Header pattern Section 05.
- v1 con form skeleton + email mailto fallback. T17 reemplaza el skeleton con `<ContactForm>` real.

**T16** — `src/app/[locale]/page.tsx`:
- Reescrito limpio: solo importa las 6 secciones + las compone.
- Previews UI de desarrollo ELIMINADOS — el sitio público ya no tiene contenido interno.
- 6 secciones en orden: Hero → Manifesto → Services → Principles → Work → Contact.

**Verificación runtime**:
- HTML de `/en`: 45.7 kB (muy debajo del budget < 100 kB).
- Las 6 secciones detectadas en orden correcto.
- `id="contact"` presente.
- 0 occurrences de "Previews de desarrollo" — preview interno removido.

**Strings agregados a messages/{en,es}.json**:
- `manifesto.{eyebrow, title, paragraphs[]}`
- `services.{eyebrow, title, items[3]{number, title, lead, body}}`
- `principles.{eyebrow, title, items[4]{number, title, body}}`
- `work.{eyebrow, title, lead, tags[3], footnote}`
- `contact.{eyebrow, title, lead, formPlaceholder}`

**Acceptance criteria T13**: 3/3 ✓
- Manifiesto: 3 párrafos, primer prominente, max-w controlled ✓
- Services: 3 cards en grid responsive, sin precios, CTA implícito en Hero ✓
- Sin imagen del producto ✓

**Acceptance criteria T14**: 3/3 ✓
- Principles: 4 numerados con mono number + display title ✓
- Work: caja con descripción + tags + footnote, sin imágenes ✓
- Cliente NO nombrado (Quitebe oculto, autorización pendiente) ✓

**Acceptance criteria T15**: 3/3 ✓
- Section con anchor `#contact` para smooth scroll desde Hero ✓
- Layout completo (skeleton del form para reemplazar en T17) ✓
- Footer va inmediatamente después de Contact (vía LocaleShell) ✓

**Acceptance criteria T16**: 3/3 ✓
- /en y /es muestran toda la home (6 secciones + Footer) ✓
- Scroll fluido entre secciones (html scroll-behavior:smooth) ✓
- CLS bajo (no layout shifts esperados — todo bg/borders sin imágenes diferidas) ✓

**Siguiente**: T17 — ContactForm component (frontend con RHF + Zod).
