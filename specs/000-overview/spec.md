# Spec — Website Vizcaia v1

> **Tipo**: spec del proyecto Vizcaia-Web, alcance v1.
> **Estado**: borrador inicial (2026-05-24). Actualizar al cerrar `/specify`.
> **Audiencia**: Santiago + Claude codeando + Mateo cuando revise.

---

## 1. ¿Qué?

Sitio web corporativo de Vizcaia Technologies. Vive en `https://vizcaia.com` (y `https://www.vizcaia.com` redirige). Es la cara pública de la empresa.

**Alcance v1**: una landing de una sola página (one-pager) **bilingüe — inglés primario, español secundario** (ver ADR-008: target USA). Selector de idioma EN/ES en header. Form de contacto al final que captura leads y los entrega a inbox + Outline.

**Fuera de alcance en v1** (explícito):
- Blog
- Casos de estudio dedicados (cuando tengamos clientes públicos)
- Multi-idioma más allá de EN+ES
- Sección "trabaja con nosotros" / careers
- Autenticación, área privada, dashboards
- e-commerce o pagos

## 2. ¿Por qué?

1. **Sin web, no existes**. Cualquier conversación de venta (warm intro, evento, LinkedIn) termina con "mándame su web". Hoy no la tenemos y se pierde momentum.
2. **Posicionamiento de marca**. La empresa tiene un brand manual sólido. La web es el primer artefacto público donde la marca vive — debe ejecutarse a alto nivel para validar la inversión en branding.
3. **Captura de leads tempranos**. Aún sin proceso comercial maduro, queremos que cualquier persona interesada deje sus datos. Sin esto, perdemos contactos warm.
4. **Disciplina de SDD aplicada**. Es el primer proyecto Vizcaia que hacemos con SDD desde el inicio. Sirve como template para los siguientes.

## 3. ¿Para quién? (ver ADR-008 — pivot USA)

**Target primario (visitante ideal del sitio):**
- Decision maker (CEO/COO/VP Operations/CTO) de US mid-market company (50–500 empleados, revenue $10M–$200M USD).
- Cross-industry: no nos limitamos a un sector al inicio. Healthcare ops, logistics, agriculture, SaaS internal tools, professional services — donde haya procesos manuales repetitivos.
- Está evaluando AI/automation pero no sabe con quién hablar — frustrado con vendors que prometen demos y no entregan producción.
- Budget tier típico: $50K–$300K USD por proyecto inicial.
- Decide en gran parte por trust y referidos, no por SEO/Ads.

**Target secundario:**
- Internal engineering teams en empresas más grandes que necesitan capacidad puntual.
- LATAM enterprises (Colombia, México, Chile) si llegan por warm intro — atendemos en español pero sin outreach activo.
- Otros estudios de software que quieren outsource AI específico.

**No target:**
- Consumer (B2C masivo).
- Empresas que buscan "el más barato" — no competimos por precio.
- Startups que pagan en equity.

## 4. Métricas de éxito

Mes 1-3 post-lanzamiento:
- **Lighthouse score > 90** en performance, accessibility, best practices, SEO.
- **Tiempo en sitio > 1 min promedio** (señal de lectura real, no bounce).
- **Bounce rate < 60%**.
- **Conversion rate visitor → lead (form completado) > 2%**.
- **5-15 leads cualificados por mes** llegando al inbox + Outline.

Cualitativas:
- Mateo y futuros colaboradores pueden compartir el link sin sentirse avergonzados.
- Brand consistency 100% entre web, deck y comunicaciones.
- Form de contacto: cero falsos positivos de spam (gracias a honeypot + rate limit).

## 5. Páginas y secciones

### Home (`/`)

Una sola página, scroll vertical. Secciones en orden:

1. **Hero**
   - Tagline tipo del brand manual: "A foundry for intelligence" (o adaptación al español).
   - Subtítulo: 1-2 líneas explicando qué hace Vizcaia (a definir en `/plan`).
   - Botón CTA primario: "Hablemos" / "Cuéntanos tu necesidad" → scroll al form.
   - Visual: fondo ink o paper según moodboard del manual, mark "The Spark" presente.

2. **Manifiesto / Por qué Vizcaia**
   - 3-4 párrafos cortos.
   - Hereda del spec organizacional (`~/Documents/Vizcaia/specs/000-overview/spec.md`).
   - Tono: honesto, preciso, sin magic words.

3. **Qué hacemos**
   - 3 tarjetas o bloques con servicios principales:
     - **Sitios y apps con AI integrada** (entregamos producto funcional, no solo demos)
     - **Sistemas operativos vertical-específicos** (replicamos el patrón Quitebe a otras industrias)
     - **Consultoría de arquitectura AI** (segunda opinión técnica para equipos que ya tienen IA en producción)
   - Cada tarjeta: 1 título, 2-3 líneas de descripción, sin precio (pedimos por contacto).

4. **Cómo trabajamos**
   - 4-5 principios del proceso (heredan valores del brand manual: Innovative, Intelligent, Honest, Simple, Precise).
   - Formato: bullets numerados con frase corta + 1 línea de detalle.
   - Ejemplos:
     - **01 Specs antes que código** — no sorpresas a mitad de proyecto.
     - **02 Producción desde día 1** — no demos, sistemas que funcionan en serio.
     - **03 Honestos con los límites** — decimos qué el modelo puede y qué no.
     - **04 Documentación viva** — entregamos cómo se opera, no solo cómo se construyó.

5. **Casos / Trabajo previo**
   - v1: mencionar Quitebe sin nombrar al cliente ("sistema agrícola integrado para empresa palmera, escala 1000+ hectáreas").
   - 2-3 párrafos máximo. Cuando haya clientes públicos, sección crece.

6. **Contacto / Form**
   - Form principal. Detalle abajo.

7. **Footer**
   - Logo + tagline
   - Links: `/aviso-de-privacidad`, contacto email directo `hola@vizcaia.com` (alias del corp)
   - Redes (si tienen — LinkedIn al menos)
   - "© 2026 Vizcaia Technologies. Casanare, Colombia."

### Privacy policy (`/privacy` y `/aviso-de-privacidad`)

Dos versiones (EN y ES) accesibles desde footer:

- **EN `/privacy`**: cubre CCPA (California Consumer Privacy Act) + lenguaje compatible con GDPR (visitantes EU pueden caer). Foco USA.
- **ES `/aviso-de-privacidad`**: Habeas Data colombiano (Ley 1581 de 2012) para visitantes LATAM.

Contenido mínimo en cada versión:
- Identidad del controlador / responsable del tratamiento (Vizcaia Technologies + dato de contacto)
- Qué datos recolectamos (los del form)
- Para qué se usan (responder inquiries comerciales)
- Cuánto tiempo retención
- Derechos del usuario (access, correction, deletion / consulta, rectificación, supresión)
- Cómo ejercer derechos (`privacy@vizcaia.com` y `privacidad@vizcaia.com`)

> **Decisión pendiente**: para v1 usar plantillas de ambos (Termly, Iubenda u OpenAI legal template). Antes de outreach serio: validar con abogado USA. Para LATAM, plantilla CCC + revisión local.

## 6. Form de contacto

### Campos

| Campo | Tipo | Required | Validación |
|---|---|---|---|
| Nombre | text | sí | min 2 chars |
| Email | email | sí | regex email + dominio resoluble (DNS) |
| Empresa | text | no | max 200 chars |
| Cuéntanos qué necesitas | textarea | sí | min 20 chars, max 2000 |
| ¿Cómo nos conociste? | select | no | ["referido", "evento", "redes", "búsqueda", "otro"] |
| Acepto el aviso de privacidad | checkbox | sí | true |

Campo oculto:
- **Honeypot** `website_url` — invisible al usuario, si tiene valor descartamos como bot.

### Comportamiento al enviar

1. Validación frontend con Zod + react-hook-form. Errores inline.
2. POST a `/api/contact` (route handler Next.js).
3. Servidor valida nuevamente con Zod (no confiar en cliente).
4. Servidor verifica honeypot vacío + rate limit (max 3 envíos por IP por hora).
5. Servidor envía email a `vizcaia.technologies@gmail.com` (o `hola@vizcaia.com` con forwarding) via SMTP (reusar app password ya configurado para Outline).
6. Servidor opcionalmente crea entry en Outline via API (decidir en `/plan`).
7. Respuesta al usuario: pantalla de confirmación con mensaje "Gracias, te respondemos en menos de 24h hábiles" + sugerencia de seguir en LinkedIn.
8. Si falla envío: mostrar mensaje + dar opción mailto como fallback.

### Anti-spam

- **Honeypot** (campo oculto).
- **Rate limit** por IP (3/hora).
- **NO reCAPTCHA** por privacidad (tracking de Google). Si honeypot + rate limit no son suficientes, escalamos a Cloudflare Turnstile (sin tracking, gratis).
- **Validación de email**: regex + opcional MX record check (más costoso, ver en `/plan`).

## 7. Brand & UI

Heredar 100% del manual de marca:

- **Paleta**: ink `#0A0F0C` background principal, paper `#F4F1E8` para superficies claras, signal green `#00E37A` para acentos/CTA, moss/forge para variantes.
- **Tipografía**: Space Grotesk (display/headings, medium 500, letter-spacing tight), Geist (body), Geist Mono (meta/labels uppercase con tracking 0.16em), Instrument Serif italic (acentos en `<em>` color signal/forge).
- **Mark**: "The Spark" — chevron V con línea horizontal. SVG inline en header + favicon + OG image.
- **Componentes**:
  - Sección hero con grid sutil de fondo (heredado del CSS del manual).
  - Tarjetas con borde 1px `rgba(255,255,255,0.10)` sobre ink, o `rgba(10,15,12,0.12)` sobre paper.
  - Botones primarios fondo signal, texto ink. Secundarios outline.
  - Inputs con borde 1px sobre fondo ink-2.

## 8. SEO + metadata

- Title: "Vizcaia — A foundry for intelligence"
- Description: 1 línea, max 160 chars, español. Ej: "Construimos AI agents y automatizaciones para empresas en LATAM. No demos, producción real."
- OG image: PNG 1200×630 con mark + tagline sobre fondo ink.
- favicon: PNG 32×32 con mark spark.
- robots.txt: permitir todo, sitemap.
- sitemap.xml: auto-generado desde Next.js.
- Schema.org `Organization` markup con datos de Vizcaia.

## 9. Performance

- **Meta Lighthouse > 90** en las 4 métricas.
- **Fonts**: subset Latin solo (no necesitamos chino/árabe). Self-hosted via `next/font/local` con preload.
- **Imágenes**: `next/image` con AVIF + WebP fallback, `loading="lazy"` salvo above-the-fold.
- **JS bundle**: mantener el cliente < 100 kB gzipped. Animaciones con CSS, no framer-motion para el v1.
- **CSS**: Tailwind purge agresivo. No CSS-in-JS pesado.
- **Cache**: assets estáticos con max-age 1 año + immutable.

## 10. Accesibilidad

- **WCAG 2.1 AA mínimo**. Verificar con Lighthouse + axe DevTools.
- **Contraste**: paleta del manual ya pensada para AA (verificar combinaciones específicas en plan).
- **Navegación por teclado**: tab order lógico, focus visible.
- **Semántica HTML**: `<main>`, `<nav>`, `<section>`, `<h1>` único por página, jerarquía de headings.
- **Alt text**: en todas las imágenes meaningful.
- **Form**: labels asociados, mensajes de error con `aria-live="polite"`.
- **Reduced motion**: respetar `prefers-reduced-motion`.

## 11. Stack y arquitectura

Detalle en `plan.md`. Resumen:

- Next.js 15 App Router
- TypeScript estricto
- Tailwind + tokens custom
- shadcn/ui adaptado
- react-hook-form + Zod
- SMTP via nodemailer (reusar app password de Outline) — o Resend según decisión
- Despliegue en Coolify del VPS Vizcaia
- Dominio: vizcaia.com con SSL Let's Encrypt
- Staging: `staging.vizcaia.com` (subdominio wildcard ya disponible)

## 12. Cosas que NO sabemos todavía (a decidir en `/plan` y antes de implementar)

- [PENDIENTE] **Texto exacto del hero y manifiesto en EN y ES**. Hay placeholders aquí; el texto final lo redactamos con Mateo antes de publicar. **El slogan "A foundry for intelligence" NO se traduce** — queda en inglés siempre (brand asset).
- [PENDIENTE] **Si el form crea entry en Outline via API** o solo manda email. (Ya tenemos el token via API — la respuesta inclina a sí, sumarlo).
- [PENDIENTE] **Email final del corp**: `hello@vizcaia.com` (formal US) + alias `hola@vizcaia.com` para LATAM. Requiere Google Workspace o Cloudflare Email Routing.
- [PENDIENTE] **Analytics**: Plausible self-hosted vs Cloudflare Web Analytics. Probable Cloudflare (zero setup).
- [PENDIENTE] **Foto/render del equipo** — opcional, decisión en `/plan`.
- [PENDIENTE] **Caso Quitebe**: cómo mencionarlo en EN sin localizarlo como LATAM-specific. Probable: "Built a production-scale agricultural operations system covering 1000+ hectares — backend, mobile, BI."
- [PENDIENTE] **Selector de idioma**: ¿persistir en cookie? ¿default por geo-IP? ¿botón EN/ES sticky en header? Decidir en `/plan`.
- [PENDIENTE] **i18n approach técnico**: Next.js i18n nativo (`app/[locale]/...`) vs librería como `next-intl`. Decisión en `/plan`.

## 13. Riesgos identificados

- **Copy débil**: el mayor riesgo es que el texto suene a "consultoría genérica" — debe ser específico, honesto, sin magic words. Mitigación: iterar copy con Mateo, leer en voz alta antes de publicar.
- **Sobre-diseño**: tentación de hacer animaciones, efectos. El brand manual pide austeridad ("strip until it almost breaks"). Mitigación: revisar cada componente contra los valores del manual.
- **Form spam**: bots scrapean forms. Mitigación: honeypot + rate limit. Si no alcanza, Cloudflare Turnstile.
- **Performance pobre por imágenes**: olvido común. Mitigación: presupuesto explícito de bundle/imágenes en CI.

## 14. Stakeholders

| Persona | Rol en este proyecto |
|---|---|
| Santiago | Arquitectura + implementación |
| Mateo | Validación de copy, marca, mensaje |
| (futuro abogado) | Validar aviso de privacidad antes de outreach serio |

## 15. Timeline tentativo

- **D+1 a D+3**: `/plan` técnico + `/tasks` descomposición.
- **D+4 a D+10**: implementación (Next.js + Tailwind + componentes + form backend).
- **D+11 a D+12**: copy final con Mateo + ajustes visuales.
- **D+13**: deploy staging, QA, validar Lighthouse > 90.
- **D+14**: deploy producción a `vizcaia.com`.

(Días hábiles, asumiendo 2-3 horas/día de trabajo en este proyecto. Total: ~3-4 horas/día por 2 semanas.)

## 16. Para profundizar

- **Plan técnico (CÓMO)**: `plan.md`
- **ADRs específicos del web**: `decisions.md`
- **Brand manual**: `~/Documents/Vizcaia/Manual Marca Vizcaia/Vizcaia Brand Manual.html`
- **Spec organizacional Vizcaia**: `~/Documents/Vizcaia/specs/000-overview/spec.md`
