# Decisions — ADRs del repo Vizcaia-Web

> Decisiones arquitectónicas específicas del website. ADRs umbrella (que afectan a múltiples proyectos Vizcaia) viven en `~/Documents/Vizcaia/specs/000-overview/decisions.md`.

---

## ADR-009 — Hero interactivo con Canvas 2D, NO Three.js

**Fecha**: 2026-05-25
**Estado**: aceptado
**Decisión**: implementar el efecto de "grid de líneas distorsionada por el mouse" del hero del website con **Canvas 2D nativo** (Web API estándar), no con Three.js + react-three-fiber.

**Por qué**:
- El efecto deseado es 2D — grid plana con distorsión local alrededor del cursor. No es una escena 3D real (sin cámara, sin meshes, sin luces).
- Three.js + r3f agrega ~250 kB al bundle. Canvas 2D nativo cuesta 0 kB (es Web API).
- Bundle inicial target del sitio: < 100 kB gzipped. Three.js solo se justifica si la inversión paga en valor visual ≠ posible con alternativas más ligeras. Aquí NO es el caso.
- Performance: Canvas 2D nativo maneja 600 vertices a 60 fps sin sudar. Three.js no agrega valor visible.
- Alineado con el principio del brand manual "Strip until it almost breaks. Then add back only what changes the outcome."

**Trade-off aceptado**:
- Si en el futuro Vizcaia hace efectos 3D reales (modelos GLB, escenas con luces, físicas), tendremos que agregar Three.js entonces. Por ahora no se justifica.
- La curva de aprendizaje de Canvas 2D para algoritmos de distorsión es moderada — equivalente a Three.js para casos básicos.

**Cuándo revisitar**:
- Si v2 del sitio agrega secciones con 3D real (case studies interactivos, demos de producto en 3D).
- Si Three.js se necesita para otros proyectos cliente y vale la pena unificar stack.

---

## ADR template para nuevos ADRs del website

```markdown
## ADR-NNN — <Título corto>

**Fecha**: YYYY-MM-DD
**Estado**: propuesto | aceptado | reemplazado por ADR-NNN
**Decisión**: <una o dos frases>

**Por qué**:
- punto 1
- punto 2

**Trade-off aceptado** (opcional): <lo que perdemos>

**Cuándo revisitar** (opcional): <bajo qué condición>
```
