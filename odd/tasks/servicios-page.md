# ODD — Servicios (feature: servicios-page)

## Objetivo
Implementar completamente `pages/servicios.html` + su CSS en `styles/styles.css` según `docs/DEVELOPMENT.md` §5.2 (node `#8:69`) y `docs/DESIGN.md` §8.2 / §7.7, reutilizando los componentes compartidos de §2 idénticos a `pages/equipo.html`.

## Problema / Por qué
`pages/servicios.html` está vacío (0 bytes): el link de nav `/servicios` (rewrite de `vercel.json`) y los CTA "Ver todos los servicios" de la home quedan sin destino. Falta el catálogo completo (6 cards) y la sección de proceso.

## Alcance autorizado
- Crear `pages/servicios.html` (head + header/drawer + main §5.2 + footer).
- Agregar bloque CSS "Servicios Page" en `styles/styles.css` (icono de card + timeline `.process`) antes del bloque `Galería`.
- Sin JS nuevo: la página es estática y reutiliza `scripts/main.js` (drawer mobile).
- NO tocar otras páginas. NO push / NO PR (decisión del usuario).

## Restricciones
- DESIGN.md manda sobre Stitch/Figma. Tokens §4 exactos; Montserrat + JetBrains Mono; `--primary #C5A059`, `--accent #E8D5A3`, `--canvas #0D0D0D`.
- Assets y nav root-absolute (`/styles/styles.css`, `/scripts/main.js`, `/servicios`, …), alineado con el fix T7 de la feature contacto (URLs limpias `vercel.json`). `equipo.html`/`reserva.html` usan relativos: inconsistencia preexistente, no se toca.
- Un solo `<h1>` ("Lo que hacemos"); `<h2>`: "Catálogo de servicios" (`visually-hidden`) / "El proceso urbano" / CTA; `<h3>`: título de cada card + cada paso.
- Catálogo 6 cards (3col lg / 2col sm / 1col): Corte Clásico (45 min · S/ 15.00), **Corte + Barba** featured + pill "Más pedida" (75 min · S/ 25.00), Afeitado Tradicional (30 min · S/ 12.00), Coloración (60 min · S/ 35.00), Limpieza Facial (30 min · S/ 20.00), Corte Junior (30 min · S/ 10.00). Los 3 últimos no tienen precio en los docs → valores propuestos consistentes con el catálogo, **a validar por el usuario**.
- Proceso 4 pasos: `01 Reserva` → `02 Llega 5 min antes` → `03 Cortamos` → `04 Vuelve`. Número grande Montserrat en `--accent`, línea conectora `1px` + dots `8px` `--primary` en desktop; stack vertical en mobile.
- A11y: skip-link, `aria-current="page"` en Servicios (nav + drawer), SVGs `aria-hidden="true"`, `prefers-reduced-motion`.
- SEO: title / description / canonical `/servicios` / OG / theme `#0D0D0D`.
- Motion: solo `transform`/`opacity`; loop del barber pole `2s` permitido.

## Ruta (ODD)
- Cambio explícitamente autorizado → **delegated direct** (writer trigger: 2 archivos no triviales).
- TDD: OFF (sitio estático, sin runner). Checks funcionales ordinarios + render local.
- Delivery `ask-on-risk`: forecast ~300 líneas autoradas (<400) → candidato a PR único; sin `chained-pr`.

## Checklist (state: COMPLETA — commit `77b6d65`)
- [x] T1 — `pages/servicios.html`: head (Montserrat+Mono, SEO, `/styles/styles.css`) + header/drawer + footer idénticos a `equipo.html`, `aria-current="page"` en Servicios (nav + drawer).
- [x] T2 — Page head §5.2: eyebrow "Servicios" + H1 "Lo que hacemos" + lede "Tijera y navaja. Precios claros, sin sorpresas."
- [x] T3 — Grid 6 service-cards (icono SVG 32px `--primary` + título + desc + duración/precio en JetBrains Mono), card "Corte + Barba" featured + pill "Más pedida" (absolute 18/18, título padding-right 72px).
- [x] T4 — Sección proceso (timeline numerado 01–04, línea conectora 1px `--border` + dots 8px `--primary` ≥1024px, grid 4col; stack 1 col mobile) + CTA band "¿Listo para un cambio?" → `/reserva`.
- [x] T5 — CSS "Servicios Page" (`.service-card__icon`, `.process*`) insertado antes del bloque `Galería` (línea 957); variables verificadas contra styles.css.
- [x] T6 — Verificación: readback estructural del writer + render local (Python http.server :5500 + Playwright): desktop 3col/4col, mobile 1col, drawer abre/cierra (aria-modal/aria-expanded), 1 solo `<h1>`, consola limpia (solo 404 favicon.ico preexistente). Commit work-unit `77b6d65`.

## Progreso / evidencia
- Estado: COMPLETA (commit `77b6d65` en `add/servicios-page`, 3 archivos, +369 líneas).
- Verificación delegada: writer `general` (modelo default) con readback estructural completo; tier assessment `medium` (executable_change) — sin verifier extra (writer no usó perfil pequeño); spot check del parent: render real OK.
- RDD: OFF (decisión global) → sin ceremonia de review; delivery sigue política ordinaria del repo.
- Pendiente de producto: precios/duración propuestos para Coloración (S/35 · 60min), Limpieza Facial (S/20 · 30min) y Corte Junior (S/10 · 30min) — no están en los docs, VALIDAR con el usuario.
- Pendiente de decisión: push/PR de `add/servicios-page` (decisión del usuario; `ask-on-risk`: 325 líneas < 400 → PR único).
