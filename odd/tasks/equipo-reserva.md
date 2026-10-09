# ODD — Páginas Equipo y Reserva

## Objetivo
Completar `pages/equipo.html` y `pages/reserva.html` según `docs/DEVELOPMENT.md`, asegurando que ambas páginas tengan CSS incorporado, estructura semántica, navegación consistente y los componentes compartidos (header, footer, barber pole, CTA). Corregir los bugs visuales derivados de las páginas vacías.

## Problema
Al verificar el entregable se detectó que:
- `pages/equipo.html` está vacío (0 líneas) → no se renderiza la sección de barberos ni portfolio.
- `pages/reserva.html` está vacío (0 líneas) → no existe el formulario ni selector de horarios.
- `styles/styles.css` tiene placeholders vacíos para las secciones de Reserva y faltan estilos del portfolio/testimonials de Equipo.

## Alcance autorizado
- Crear/escribir `pages/equipo.html`.
- Crear/escribir `pages/reserva.html`.
- Extender `styles/styles.css` con los bloques necesarios para Equipo (portfolio, testimonials) y Reserva (grid, form, pole vertical, slots, info box).
- Corregir los enlaces internos para que usen las rutas root-relative definidas en `vercel.json` (`/equipo`, `/reserva`, `/servicios`, etc.).

## Restricciones
- Seguir la guía de `docs/DEVELOPMENT.md` §5.3 (Equipo) y §5.7 (Reserva).
- **Assets** (CSS, scripts, imágenes) usan rutas relativas desde `pages/`: `../styles/styles.css`, `../scripts/main.js`, `../images/…`.
- **Navegación interna** usa rutas root-relative (`/`, `/servicios`, `/equipo`, `/galeria`, `/reserva`, `/contacto`, `/nosotros`, `/login`) para respetar los rewrites de `vercel.json` en producción.
- Solo existen `images/hero.jpg` e `images/barber-cut.jpg`; usar `barber-cut.jpg` como imagen de respaldo para barberos y portfolio.
- Mantener `aria-current="page"` en el enlace activo de cada página.
- No agregar frameworks; HTML + CSS vanilla.
- Respetar los tokens y componentes ya definidos en `styles/styles.css`.

## Criterios de aceptación
- [x] `pages/equipo.html` renderiza header, page header, grid de barberos, CTA band, portfolio preview grid, testimonials, footer.
- [x] `pages/reserva.html` renderiza header, page header, formulario de reserva, barber pole vertical, selector de horarios, info box, footer.
- [x] `styles/styles.css` incluye estilos funcionales para `.portfolio-preview`, `.testimonials`, `.booking__grid`, `.booking__pole`, `.booking__slots`, `.slots`, `.booking__info`.
- [x] Enlaces internos en `pages/equipo.html` y `pages/reserva.html` usan root-relative URLs (`/equipo`, `/reserva`, etc.) según `vercel.json`.
- [x] Assets (`../styles/styles.css`, `../images/…`, `../scripts/…`) permanecen con rutas relativas correctas.
- [x] Ambas páginas linkean `../styles/styles.css` y `../scripts/main.js` (reserva también `../scripts/reserva.js`).
- [x] Validación visual básica: no hay contenido invisible ni roturas de layout en viewport 1280px y 375px.

## Tareas
1. [x] Crear `pages/equipo.html` con markup semántico según §5.3.
2. [x] Crear `pages/reserva.html` con markup semántico según §5.7.
3. [x] Agregar CSS de Equipo: portfolio preview y testimonials.
4. [x] Agregar CSS de Reserva: grid, form card, pole vertical, slots, info box.
5. [x] Refactorizar enlaces internos a root-relative según `vercel.json`.
6. [x] Verificar navegación, rutas y `aria-current` en ambas páginas.
7. [x] Verificar visualmente con un servidor local (1280px y 375px).

## Checks aplicables
- [x] W3C HTML validator (estructura básica: un `<h1>`, jerarquía de headings).
- [x] Consistencia de rutas relativas.
- [x] Tokens CSS (`--canvas`, `--surface`, `--primary`, `--accent`).
- [x] `prefers-reduced-motion` ya cubierto a nivel global.

## Ruta de entrega
- `ask-on-risk` (default). El cambio total estimado es < 400 líneas; una sola work-unit commit.

## Estado
- Creado: 2026-10-09
- Completado: 2026-10-09
- Commit hash: pendiente
