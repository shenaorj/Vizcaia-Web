# [Feature] — Spec

> **Spec = el QUÉ y el POR QUÉ. Sin decisiones técnicas.** Las decisiones técnicas van en `plan.md`.

---

## Identidad

| Campo | Valor |
|---|---|
| **ID** | NNN-nombre-corto |
| **Estado** | draft \| review \| approved \| in-progress \| done |
| **Owner** | Santiago Henao |
| **Creado** | YYYY-MM-DD |
| **Última actualización** | YYYY-MM-DD |
| **Spec relacionados** | (referencias a otros specs) |

---

## Problema

> ¿Qué problema concreto resuelve esta feature? ¿Por qué existe?

Describe el problema en lenguaje de negocio, no técnico. Si esta feature no existiera, ¿qué dolor seguiría presente?

---

## Usuarios y casos de uso

¿Quién usa esto y para qué?

| Usuario / rol | Caso de uso | Frecuencia |
|---|---|---|
| Trabajador de campo | ... | Diaria |
| Agrónomo | ... | Semanal |
| Gerencia | ... | Mensual |

---

## Objetivos

Lista numerada de lo que esta feature debe lograr.

1. ...
2. ...
3. ...

---

## Criterios de aceptación

Cómo sabemos que está terminada. Cada criterio debe ser verificable (sí/no).

- [ ] El usuario puede ...
- [ ] El sistema responde ... en menos de N segundos
- [ ] Cuando ocurre X, el sistema hace Y
- [ ] Los datos se guardan en ... y son consultables desde ...

---

## Restricciones

Limitaciones reales que afectan el diseño:

- **Operativas:** (jornada de 8h, sin señal en zonas remotas, etc.)
- **Técnicas:** (compatibilidad con Postgres existente, idempotencia, etc.)
- **De negocio:** (presupuesto, roles, normativa)
- **De tiempo:** (debe estar listo antes de fecha X)

---

## No-objetivos

> Importante: aclarar qué NO está en alcance evita scope creep.

- ❌ Esta feature no resuelve ...
- ❌ No incluye ...
- ❌ No se va a integrar con ... en esta iteración

---

## Métricas de éxito

¿Cómo mediremos que esto funcionó después de lanzarlo?

- ...
- ...

---

## Preguntas abiertas

Cosas que requieren respuesta antes o durante implementación:

- [ ] ¿...?
- [ ] ¿...?
