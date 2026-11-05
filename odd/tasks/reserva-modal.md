# ODD — Reserva: confirmación como diálogo modal (feature: reserva-modal)

## Objetivo
Refactorizar la confirmación de reserva de `pages/reserva.html` para que deje de ser una tarjeta
estática en el flujo del formulario y pase a ser un diálogo modal accesible centrado en pantalla.

## Problema / Por qué
`#booking-success` se inserta en el flujo vertical del `<section class="booking">` (debajo de
`.booking__grid`). Al enviar, `scripts/reserva.js` ocultaba el formulario y la grilla y mostraba esa
tarjeta inline, rompiendo la coherencia visual, el espaciado del paso 4 y ofreciendo una sola salida
(un enlace a `/`).

## Alcance autorizado
- `pages/reserva.html`: retirar el bloque inline `#booking-success` y añadir la estructura del modal
  (oculto por defecto) como capa a nivel de `body`.
- `styles/styles.css`: retirar las reglas muertas `.booking__success*` y añadir el componente `.modal`
  (overlay, panel, acciones) usando tokens existentes.
- `scripts/reserva.js`: quitar la inyección inline; implementar apertura, resumen dinámico, cierre y
  ciclo de vida del modal.
- NO tocar otras páginas, NO añadir librerías, NO push, NO PR en esta fase.

## Restricciones
- Tokens de `:root`: `--surface`, `--surface-subtle`, `--border`, `--border-strong`, `--accent`,
  `--success`, `--success-surface`, `--r-control`, `--r-media`, `--r-pill`, `--shadow-3`,
  `--dur-slow`, `--ease-out`, `--z-modal`, `--sp-*`, `--fs-*`.
- BEM + banners de sección (`/* ====== Título — selectores ====== */`) como el resto del archivo.
- JS vanilla, sin dependencias. Mantener el estilo existente de `reserva.js` (IIFE + `'use strict'` + `var`).
- Copy e comentarios en el idioma ya usado por cada archivo (español neutral).
- A11y: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, focus trap, `Escape`, restauración de
  foco, bloqueo de scroll de `body`.
- Motion: solo `opacity`/`transform`; el bloque global `prefers-reduced-motion` ya neutraliza duraciones.

## Ruta (ODD)
- Cambio explícitamente autorizado → ruta **delegated direct** (writer en 3 archivos no triviales).
- Verificación funcional: parent, vía Chromium/Playwright sobre servidor estático con rewrites de URLs limpias.
- TDD: OFF (sitio estático sin runner). Checks funcionales ordinarios, no RED/GREEN.
- RDD: OFF (global) → sin ceremonia de review; solo verificación funcional.
- Delivery: `ask-on-risk`. Forecast ~250 líneas autoradas (<400) → un solo PR, decisión del usuario.

## Checklist
- [x] T1 — `reserva.html`: eliminar `#booking-success` (role=status, título, `#success-text`, enlace) del
  flujo de `.booking`.
- [x] T2 — `reserva.html`: añadir `.modal` nivel `body` (`role="dialog"`, `aria-modal="true"`,
  `aria-labelledby="booking-modal-title"`, `hidden`), con overlay, panel, cierre "X", indicador de éxito,
  resumen (servicio/barbero/fecha/hora/teléfono) y acciones "Volver al inicio" (`/`) + "Cerrar".
- [x] T3 — `styles.css`: borrar `.booking__success` y `.booking__success-title` (código muerto) y añadir
  la sección Modal (overlay con `backdrop-filter`, panel centrado con `--shadow-3`, transición
  `--dur-slow`/`--ease-out`, responsive móvil→desktop, foco visible).
- [x] T4 — `reserva.js`: reemplazar la inserción inline por `openModal()`/`closeModal()` con reflow para
  la transición de entrada, focus trap, `Escape`, restauración de foco, scroll lock y `form.reset()`.
- [x] T5 — Verificación: `node --check`, ausencia de referencias muertas, estructura del diálogo, y
  prueba funcional de las 4 vías de cierre + ciclo de foco + responsive.

## Criterios de aceptación
- La confirmación no aparece bajo el botón de reserva ni desestructura el contenedor del paso 4.
- El modal solo se abre con validación exitosa.
- Funcionan "Volver al inicio" (redirige) y "Cerrar" (cierra y resetea el formulario).
- Cierre verificado por: overlay, "Cerrar", "X" y `Escape`.
- El foco cicla dentro del modal sin fugas y vuelve al botón de envío al cerrar.
- Sin librerías externas: solo HTML5, CSS nativo y JS vanilla.

## Progreso / evidencia
- Commit work-unit `057b5a6` en `implementation/reserva-modal`: 3 archivos, 231+/23- (reserva.html 29,
  reserva.js 90, styles.css 135). Bajo el presupuesto de ~250 líneas autoradas (<400) → sin chained-pr.
- Chequeos estáticos reproducidos por el parent: `node --check scripts/reserva.js` → exit 0; referencias
  muertas (`booking__success`/`success-text`/`booking-success`) → 0 coincidencias.
- Verificación funcional (Chromium/Playwright sobre servidor estático con rewrite `/reserva`):
  - Inline: `#booking-success`/`.booking__success` → 0 nodos; el formulario y `.booking__grid` ya NO se
    ocultan (`formStillInFlowNotHidden: true`).
  - Solo con validación exitosa: submit inválido → modal oculto + `#booking-error` visible; submit válido
    → modal abierto con `is-open`.
  - A11y: `role=dialog`, `aria-modal=true`, `aria-labelledby` → título existente, `aria-describedby` →
    lede existente. Foco inicial dentro del modal (botón "Cerrar confirmación").
  - Focus trap: 14 `Tab` + 8 `Shift+Tab` → 0 fugas.
  - 4 vías de cierre verificadas: `Escape` ✓, overlay (clic en 8,8) ✓, botón "X" ✓, botón "Cerrar" ✓.
  - Reset: tras cerrar, nombre/teléfono/fecha/hora vacíos, slots con placeholder, `sum-servicio` en
    "Corte + Barba" (default de `form.reset()`).
  - Foco restaurado al botón de envío (`.booking__submit`) tras cerrar.
  - Scroll lock: `body.style.overflow = 'hidden'` abierto y `''` cerrado.
  - Visual: overlay `rgba(13,13,13,0.72)` + `backdrop-filter: blur(6px)` + opacidad 1; panel con
    `box-shadow` idéntico a `--shadow-3`; panel centrado en el viewport (1280/1100).
  - Entrada animada real: opacidad del panel `0 → 0.48 → 0.81 → 0.94 → … → 1` con escala `0.96 → 1` y
    overlay en paralelo (confirma que el `void modal.offsetHeight` fuerza el reflow).
  - Responsive 375×667: panel `x=16 w=343` (cabe), alto 517 dentro de 667, acciones en `column`,
    sin desborde horizontal; desktop ≥600px → acciones en `row`.
  - `prefers-reduced-motion: reduce`: abre y cierra correctamente.
  - "Volver al inicio": `href="/"` y la navegación real lleva a `http://localhost:4173/`.
  - Consola: 0 errores en `reserva.html`.
- Riesgo residual no cubierto: el filtro de foco `offsetParent !== null` y el ciclo de foco se
  verificaron solo en Chromium (único motor disponible localmente); no se probó Firefox/Safari.

## Descubrimientos
- `reserva.html` es una de las páginas con rutas de assets relativas (`styles/styles.css`,
  `scripts/*.js`) mientras `contacto.html`/`login.html`/`servicios.html` usan absolutas. Bajo rewrites de
  Vercel funciona, pero cargar `pages/reserva.html` directo rompe el CSS/JS → la verificación local debe
  servirse con rewrite de URL limpia (`/reserva` → `pages/reserva.html`).
- `.summary` es un componente de sección (`dl` con `div`/`dt`/`dd`) reutilizable; se reutiliza dentro del
  modal en lugar de duplicar estilos.
- El writer delegado reportó como evidencia "no line-ending churn (files were already CRLF)", y **era
  falso**: los tres archivos eran 100% LF y su tooling los reescribió a 100% CRLF. Sin impacto en el
  repo porque `core.autocrlf=true` y no hay `.gitattributes`: los blobs commiteados son 100% LF. Lección:
  no aceptar evidencia auto-reportada por un writer sin reproducirla.
- La página de inicio (`/`) emite 3 errores 404 pre-existentes en `index.html`, ajenos a este cambio.

## Next step
- **Cerrado.** PR #10 mergeado a `main` como `451364c` (rama `implementation/reserva-modal` pusheada y
  mergeada por el usuario). El cambio está aplicado en `origin/main`.
- Sin trabajo pendiente en esta feature.
- Riesgo residual abierto: el focus trap se verificó solo en Chromium (no se probó Firefox/Safari).
- Pendiente aparte, otra tarea: 3 errores 404 en la consola de `index.html`.
- Sospecha aparte detectada aquí: `.mobile-drawer` cambia `hidden` + `.is-open` en el mismo frame y
  **no** fuerza reflow (a diferencia de este modal), por lo que su animación de entrada probablemente
  no corre. Revisar en otra tarea.


## Reconciliación (feature montalvo-migration, 2026)

Estado: **ejecutada y superada**. El trabajo de esta tarea se completó en su momento; la feature
`montalvo-migration` reemplazó después el contenido de marca sobre la misma estructura (sin reabrir
las decisiones técnicas aquí tomadas). Ver `odd/tasks/montalvo-migration.md`.
