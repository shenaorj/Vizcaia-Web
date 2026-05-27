# syntax=docker/dockerfile:1.7

# ────────────────────────────────────────────────────────────────
# Vizcaia-Web — Dockerfile multi-stage
# Target: imagen final < 200 MB sobre node:22-alpine.
# ────────────────────────────────────────────────────────────────

# Stage 1 — install dependencies (separado para caching de capa)
FROM node:22-alpine AS deps
WORKDIR /app

# Toolchain mínima para builds nativos (sharp en runtime opcional)
RUN apk add --no-cache libc6-compat

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile

# ────────────────────────────────────────────────────────────────
# Stage 2 — build the app
# ────────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN corepack enable && pnpm build

# ────────────────────────────────────────────────────────────────
# Stage 3 — runtime (minimal)
# Solo lo necesario para correr el server standalone.
# ────────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Usuario no-root por seguridad
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Public assets (fonts, images)
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Standalone output de Next 16 — incluye node_modules pruned al mínimo
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# HEALTHCHECK con 127.0.0.1 explícito (NO `localhost`).
#
# Bug detectado en deploy a Coolify: Next.js standalone bindea a 0.0.0.0:3000 (IPv4 only).
# Alpine resuelve `localhost` → `::1` (IPv6) primero → connection refused.
# `127.0.0.1` fuerza IPv4 y wget conecta correctamente.
#
# start-period 90s tolera cold start en CX23 compartido con Outline+Coolify+Postgres.
HEALTHCHECK --interval=10s --timeout=5s --start-period=90s --retries=5 \
    CMD wget --spider --quiet http://127.0.0.1:3000/ || exit 1

# Startup logging para diagnostico futuro
CMD echo "[startup] HOSTNAME=$HOSTNAME PORT=$PORT NODE_ENV=$NODE_ENV" && \
    node server.js
