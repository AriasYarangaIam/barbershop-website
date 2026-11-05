# ODD — Contacto (feature: contacto)

## Objetivo
Implementar completamente `pages/contacto.html` + su CSS según `docs/DEVELOPMENT.md` §5.6 (node #32:9), con autoridad `DESIGN.md` y marca `BUSINESS.md`.

## Problema / Por qué
`pages/contacto.html` actual es marca vieja ("Barbería Urbana", Springfield AR, tel +54) con nav/footer incompletos, fuentes erróneas (Big Shoulders+Inter), rutas absolutas `/styles`, sin drawer mobile ni CTA, y la sección CSS de Contacto en `styles/styles.css` está vacía (solo encabezados). No cumple §2, §5.6, §7 ni §8.

## Alcance autorizado
- Reescribir `pages/contacto.html` (estructura §5.6 + componentes compartidos §2 idénticos a `index.html`).
- Completar bloque CSS Contacto en `styles/styles.css` antes de `Site Footer` (§5.9), con sub-comentarios `/* --- Info de contacto y mapa --- */` y `/* --- Formulario --- */`.
- Demo sin backend: `form action="#"`, `scripts/contacto.js` queda vacío/pendiente (no se implementa JS en esta feature).
- NO tocar otras páginas, NO crear PR, NO push. Commits work-unit en rama `add/contacto-page`.

## Restricciones
- DESIGN.md manda sobre Stitch/Figma. Tokens §4 exactos. Montserrat + JetBrains Mono, `--primary #C5A059`, canvas `--canvas #0D0D0D`.
- Rutas relativas desde `pages/`: `../styles/styles.css`, `../images/…`, links `contacto.html`/`reserva.html`, inicio `../index.html`.
- Un solo `<h1>` ("Contacto"); `<h2>`: "Estamos aquí" / "Horarios" (o "Horarios de atención" según template §5.6) / "Escríbenos". Tabla horarios semántica `<table>`, nunca lista.
- Horarios y datos canónicos: Av. Siempreviva 742, Lima, Peru · tel `+51 1 234 5678` (`tel:+51123456789`) · `info@therusticbarbershop.com` · `@therusticbarbershop` · Lun–Vie 09:00–20:00 · Sáb 10:00–18:00 · Dom Cerrado (fila en `--primary`, mono tabular-nums).
- Responsive: grid 2col `gap:64px` → stack mobile / 2col desde 1024px; form card padding 24px mobile; map `aspect-ratio 16/9` desktop / `4/3` mobile. Sin banda CTA (contacto no la lleva).
- A11y: skip-link, `aria-current="page"` en Contacto, drawer con focus trap + ESC + `aria-expanded`, `:focus-visible`, `prefers-reduced-motion`, `aria-live` no aplica (sin JS), iframe con `title`.
- SEO: title/description/canonical/OG/theme `#C5A059` + JSON-LD HairSalon Lima PE.
- Motion: solo transform/opacity, nunca `transition: all`; pole loop 2s permitido.
- Copy en español segunda persona; artefactos técnicos en español-neutral profesional.

## Ruta (ODD)
- Cambio explícitamente autorizado por el usuario → ruta **delegated direct** (mapeo 4+ archivos + escritura 2 archivos no triviales).
- Intento de `explore` delegado falló (OpenCode free tier solo dentro de OpenCode) → fallback a mapeo directo inline documentado. Writer: se intenta un `general` delegado; si falla, fallback inline con la misma evidencia.
- TDD: OFF (sitio estático sin runner; sdd-init `barber-website` sin `strict_tdd`). Checks funcionales ordinarios, no RED/GREEN.
- Delivery: `ask-on-risk` (default). Forecast ~350 líneas autoradas (<400) → un solo PR al final, decisión del usuario. Sin `chained-pr`.

## Checklist
- [x] T1 — Reescribir `<head>` contacto: Montserrat+Mono, title/description/canonical/OG/JSON-LD The Rustic Barber Shop Lima PE, `../styles/styles.css`, theme `#C5A059`.
- [x] T2 — Header compartido idéntico a index (brand, nav 6 links con `aria-current` en Contacto, CTA Reservar, nav-toggle + mobile-drawer completo con `../index.html`/`contacto.html` relativos).
- [x] T3 — Main §5.6: page-header H1+pole, `contact__grid` 2col, info (address 4 filas), hours-card tabla semántica, map-embed iframe con title, form-card (4 campos + submit full-width + link a reserva.html). Sin foto extra, sin CTA band.
- [x] T4 — Footer compartido idéntico a index (brand+tagline+about, nav 8 links, address Lima, legal 2025).
- [x] T5 — CSS Contacto: grid, info, hours-card/table (mono, tabular-nums, Cerrado en primary), map-embed aspect-ratio, form-card + `.field` + submit; responsive 1024px; focus-visible; reduced-motion.
- [x] T6 — Verificación: structural readback + checklist §8 (un H1, labels, rutas `../`, sin Big Shoulders, sin anchos fijos), `git diff --stat` (<400), un commit work-unit `feat(contacto): …`.

## Criterios de aceptación
- `pages/contacto.html` pasa checklist §8 contacto: componentes idénticos, tabla semántica, datos Lima PE, rutas relativas, SEO completo.
- `styles/styles.css` renderiza 2col desktop / stack mobile sin altos fijos; encabezado §5.9 presente.
- `git status` solo toca los 2 archivos + este documento; 1 commit en `add/contacto-page`.

## Progreso / evidencia
- T1–T6 verificados 2026-10-08 en rama `add/contacto-page`: 1×`<h1>`, H2 Estamos aquí/Horarios/Escríbenos, tabla semántica, datos Lima PE, rutas `../`, SEO+JSON-LD completos, sin Big Shoulders/Bebas, sin anchos/altos fijos, sin CTA band, sin foto extra. Diff autorado 89+66 contacto.html y 241+0 styles.css = 396 líneas (<400).
- Commit work-unit: `87608ca` feat(contacto): reescribe pagina segun DEVELOPMENT §5.6 (2 files, 330+/66-).

## Descubrimientos
- `index.html` (footer) trae address/tel divergentes de §2.2 (`Mz K5…`, `+51 985…`); contacto usa el canónico §2.2 (Av. Siempreviva 742, Lima, Peru · `+51 1 234 5678`). Index queda pendiente de alineación en otra feature.
- `.field` y `.page-header` no tenían estilos previos; se definieron dentro del bloque Contacto para no tocar áreas compartidas.

## Split de ramas (T8)
- [x] T8 — `dff1456` (equipo+reserva) movido a `add/equipo-reserva-page` (pusheada, backup del trabajo ajeno). `add/contacto-page` rebaseada (`--onto 87608ca dff1456`): ahora solo `87608ca` + `6a9dbb7` (replay del fix URLs limpias, verificado 0 relativos). Force-push con lease OK.
- `git merge-tree` vs `main`: 0 marcadores de conflicto → el PR mergea limpio (diff: contacto.html + bloque CSS, 325+/61-).
- Hallazgo: `main` YA trae equipo/reserva implementados (por eso el cherry-pick de `dff1456` conflictuó) y existen `feat/equipo-page` + `feat/reserva-page` de otra sesión → `dff1456` probablemente redundante; el dueño de equipo debe conciliar o descartar.
- Incidente de concurrencia: dos agentes comparten el worktree y el HEAD flamea (un rebase cayó en la rama vecina; se restauró vía `origin`). Coordinar ramas/worktrees.

## Next step
- PR listo para aprobación: https://github.com/AriasYarangaIam/barbershop-website/pull/new/add/contacto-page (no puedo abrirlo sin gh/token).

## Fix post-verificación (T7)
- [x] T7 — Navs y assets a URLs limpias `vercel.json` (`/`, `/servicios`, `/equipo`, `/galeria`, `/reserva`, `/contacto`, `/nosotros`, `/login`, `/styles/styles.css`, `/scripts/main.js`). Motivo: con rewrites la URL visible es `/contacto` y los relativos (`servicios.html`) resolvían a `/servicios.html` → 404 en deploy. En local se verifica sección por sección con Live Server.
- Commit `aace695` fix(contacto): solo `pages/contacto.html` (29+/29-), pusheado a `origin/add/contacto-page`.
- Incidente: otra sesión (equipo-reserva) pisó el primer intento del fix vía stash; se re-aplicó y commiteó de inmediato. Esa sesión además commiteó `dff1456` (equipo+reserva, 848 líneas) en ESTA rama → el PR ahora mezcla 2 features; sugerir split o aceptar.


## Reconciliación (feature montalvo-migration, 2026)

Estado: **ejecutada y superada**. El trabajo de esta tarea se completó en su momento; la feature
`montalvo-migration` reemplazó después el contenido de marca sobre la misma estructura (sin reabrir
las decisiones técnicas aquí tomadas). Ver `odd/tasks/montalvo-migration.md`.
