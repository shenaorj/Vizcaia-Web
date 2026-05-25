# [Feature] — Tasks

> **Tasks = ejecución.** Lista ordenada de unidades de trabajo, cada una < 1 día.

---

## Identidad

| Campo | Valor |
|---|---|
| **Spec / Plan** | `specs/NNN-nombre/` |
| **Estado** | not-started \| in-progress \| done \| blocked |
| **Inicio** | YYYY-MM-DD |
| **Estimación total** | N días |

---

## Pre-requisitos

Cosas que deben estar listas antes de arrancar:

- [ ] Spec aprobado
- [ ] Plan revisado
- [ ] Dependencias instaladas
- [ ] Acceso a entornos / credenciales

---

## Tasks

> Cada task debe ser independiente y verificable. Si una task tarda > 1 día, partirla.

### T1 — [nombre corto]

- **Descripción:** ...
- **Archivos a tocar:** `src/...`
- **Criterio de done:** ...
- **Estimación:** Nh
- **Estado:** ☐
- **Notas:**

### T2 — ...

- **Descripción:** ...
- **Archivos a tocar:** ...
- **Criterio de done:** ...
- **Estimación:** Nh
- **Estado:** ☐

### T3 — ...

---

## Orden de ejecución

T1 → T2 → T3 → ...

(Si hay paralelismo posible, indicarlo: T2 y T3 pueden ir en paralelo después de T1)

---

## Verificación final

Antes de marcar la feature como done:

- [ ] Todos los criterios de aceptación del spec se cumplen
- [ ] Tests pasan (`pytest`, `npm test`, etc.)
- [ ] Lint pasa
- [ ] Documentación actualizada (CLAUDE.md, STATE-modernizacion.md, este tasks.md)
- [ ] Logs y métricas funcionando
- [ ] Deploy a staging exitoso
- [ ] Smoke test manual ok

---

## Bitácora

> Notas durante implementación. Útil para retro y para Claude en sesiones futuras.

| Fecha | Nota |
|---|---|
| YYYY-MM-DD | ... |
