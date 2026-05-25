# [Feature] — Plan

> **Plan = el CÓMO técnico.** Decisiones de stack, arquitectura, modelos. Asume que `spec.md` está aprobado.

---

## Identidad

| Campo | Valor |
|---|---|
| **Spec asociado** | `specs/NNN-nombre/spec.md` |
| **Estado** | draft \| review \| approved \| implementing |
| **Última actualización** | YYYY-MM-DD |

---

## Resumen técnico

Una a tres frases: cómo se va a construir esta feature en términos técnicos.

---

## Stack y dependencias

| Capa | Tecnología | Justificación breve |
|---|---|---|
| Backend | FastAPI / Python | ... |
| DB | Postgres + PostGIS | ... |
| Otros | ... | ... |

Dependencias nuevas (paquetes, servicios, librerías) que esta feature introduce:

- `paquete==version` — para qué
- ...

---

## Arquitectura

```
[diagrama ASCII de cómo se conectan los componentes]
```

### Componentes nuevos

| Componente | Responsabilidad | Ubicación |
|---|---|---|
| ... | ... | `src/...` |

### Modificaciones a componentes existentes

| Componente | Qué cambia | Por qué |
|---|---|---|
| ... | ... | ... |

---

## Modelo de datos

### Tablas nuevas

```sql
CREATE TABLE ...
```

### Modificaciones a tablas existentes

```sql
ALTER TABLE ... ADD COLUMN ...
```

### Migraciones Alembic requeridas

- `NNN_descripcion.py` — qué hace

---

## API / Contratos

### Endpoints nuevos

| Método | Path | Auth | Descripción |
|---|---|---|---|
| POST | `/v1/...` | JWT user | ... |

### Payloads (resumen)

```json
{ ... }
```

Ver `openapi.json` para schema completo.

---

## Decisiones técnicas clave

| Decisión | Opciones consideradas | Elegida y por qué |
|---|---|---|
| ... | A, B, C | B — razón |

> Si una decisión es importante o controvertida, llévala a `decisions.md` como ADR.

---

## Riesgos técnicos y mitigaciones

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| ... | Alta/Media/Baja | ... |

---

## Plan de testing

- **Unit:** ...
- **Integración:** ...
- **End-to-end manual:** ...
- **En campo (si aplica):** ...

---

## Plan de rollout

¿Cómo se libera esta feature?

- [ ] Detrás de feature flag
- [ ] Sin flag, deploy directo
- [ ] Beta con N trabajadores antes de full rollout

---

## Observabilidad

- **Logs nuevos:** ...
- **Métricas:** ...
- **Alertas:** ...
