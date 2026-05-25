# CLAUDE.md — Vizcaia-Web (sitio corporativo)

> **Lectura obligatoria al inicio de cada sesión.** Contexto técnico del proyecto. Para tareas específicas abrir spec correspondiente en `specs/`.

---

## Identidad

| Campo | Valor |
|---|---|
| **Nombre** | Vizcaia-Web |
| **Tipo** | Sitio corporativo Next.js |
| **Dominio** | `vizcaia.com` (raíz) + `www.vizcaia.com` |
| **Repo umbrella** | `~/Documents/Vizcaia/` |
| **Fase** | v1 — landing + form de contacto |
| **Estado vivo (Outline)** | doc "Estado de Vizcaia-Web" |

---

## Modelo 2-capa

Heredado de Vizcaia umbrella (ADR-007). Lo estable vive aquí (GitHub). Lo vivo (qué cambió hoy, bloqueos, ideas) vive en Outline.

- **GitHub** (este repo): código, specs SDD, ADRs, configs.
- **Outline** (`outline.vizcaia.com`): STATE vivo, tareas con socio, decisiones para comunicar.
- **Vault**: NO se usa formal para este proyecto.

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | Next.js 15 (App Router) |
| Lenguaje | TypeScript estricto |
| Estilos | Tailwind CSS + tokens del brand manual |
| Componentes | shadcn/ui adaptado a tokens Vizcaia |
| Forms | react-hook-form + Zod |
| Email del form | Gmail SMTP (`vizcaia.technologies@gmail.com` con App Password — reusamos el de Outline) o Resend (decidir en plan) |
| Anti-spam | Honeypot field + rate limit por IP |
| Hosting | Coolify en VPS Vizcaia-desarrollo |
| Reverse proxy | Traefik (incluido en Coolify) |
| SSL | Let's Encrypt automático |
| Analytics | Plausible self-hosted o Cloudflare Web Analytics (decidir en plan) |

---

## Reglas críticas del proyecto

1. **Brand manual es ley.** Toda decisión visual (color, tipografía, spacing, voz) parte del manual en `~/Documents/Vizcaia/Manual Marca Vizcaia/`. Antes de inventar un componente, abrir el manual.
2. **Voz honesta, no magic words.** Sin "revolucionamos", "transformamos", "potenciamos con IA". Decir qué hace Vizcaia con frases concretas. Si no se puede defender frente a un cliente exigente, no se publica.
3. **Performance es feature, no afterthought.** Meta Lighthouse > 90 todas las métricas. Imágenes optimizadas, fonts self-hosted, sin JS innecesario.
4. **Accesibilidad WCAG 2.1 AA mínimo.** Contraste verificado con tokens del manual, navegación por teclado, alt text en imágenes, semántica correcta.
5. **Habeas Data Colombia.** Cualquier form que capture datos personales necesita aviso de privacidad + checkbox de consentimiento. No opcional.
6. **Sin tracking invasivo.** Si analytics, que sea sin cookies (Plausible o Cloudflare). No Google Analytics.
7. **Secretos en Coolify Env Vars.** Nunca en commits. `.env.local` y similares en `.gitignore`.

---

## Convenciones

- **Naming archivos**: kebab-case (`brand-tokens.ts`, `contact-form.tsx`)
- **Naming componentes React**: PascalCase
- **Branches**: `main` deployable, `feature/<slug>` para trabajo
- **Commits**: convencionales (`feat:`, `fix:`, `docs:`, `chore:`)
- **PRs**: con descripción + test plan

---

## Comandos típicos

```bash
# Desarrollo local
pnpm dev                # default puerto 3000 (si ocupado en este Mac, usar PORT=3010 pnpm dev)
PORT=3010 pnpm dev      # alternativa

# Build prod
pnpm build && pnpm start

# Lint + types
pnpm lint && pnpm typecheck

# Fix format automático
pnpm lint:fix
```

> Nota: en este Mac el puerto 3000 lo usa otro proyecto local (Quitebe). Para este repo usar 3010+.

---

## Para profundizar

- **Spec del sitio v1** (qué + por qué): `specs/000-overview/spec.md`
- **Plan técnico**: `specs/000-overview/plan.md`
- **ADRs**: `specs/000-overview/decisions.md`
- **Brand manual** (en repo umbrella): `~/Documents/Vizcaia/Manual Marca Vizcaia/Vizcaia Brand Manual.html`
- **Constitución Vizcaia**: `~/Documents/Vizcaia/CLAUDE.md`
