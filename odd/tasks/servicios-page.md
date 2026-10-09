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

## Checklist
- [ ] T1 — `pages/servicios.html`: head (Montserrat+Mono, SEO, `/styles/styles.css`) + header/drawer + footer idénticos a `equipo.html`, `aria-current` en Servicios.
- [ ] T2 — Page head §5.2: eyebrow "Servicios" + H1 "Lo que hacemos" + lede "Tijera y navaja. Precios claros, sin sorpresas."
- [ ] T3 — Grid 6 service-cards (icono SVG 32px + título + desc + duración/precio), card "Corte + Barba" featured + pill.
- [ ] T4 — Sección proceso (timeline numerado 4 pasos) + CTA band.
- [ ] T5 — CSS "Servicios Page": `.service-card__icon`, `.process*`; responsive `1024px`.
- [ ] T6 — Verificación: readback estructural + render; 1 commit work-unit.

## Criterios de aceptación
- `/servicios` renderiza catálogo + proceso + CTA; componentes compartidos idénticos; un solo `<h1>`; sin anchos/altos fijos de Stitch.
- `styles/styles.css` con bloque "Servicios Page" y encabezado §5.9.
- `git status` solo toca `pages/servicios.html`, `styles/styles.css` (+ este documento).

## Progreso / evidencia
- (pendiente)
