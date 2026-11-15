# Super Prompt para Google Stitch — Barbería Urbana (Sitio Multi-Página)

> Pegá este prompt completo en Google Stitch. Genera un **sitio web de 7 páginas HTML** con componentes compartidos (header, footer, divider, CSS de tokens), navegación entre páginas, y un layout distinto por página. HTML + CSS modernos, mobile-first, sin frameworks.

---

## CONTEXTO DEL PROYECTO

Estás diseñando el sitio web completo de **Barbería Urbana**, una barbería premium de barrio con mentalidad de atelier. Audiencia: hombres 22–45, urbanos, que valoran estilo y eficiencia. El trabajo del sitio: **mostrar el trabajo, generar confianza y convertir a reserva de turno**.

Estilo visual: **Light Modular** — limpio, modular, tipografía condensada dominante, un solo acento dorado usado con restrain, y **una firma visual memorable** (barber pole reimaginado como divisor animado). No es un SaaS genérico, no es un template de barbería vintage con clipart. Es contemporáneo, urbano, con oficio.

**Riesgo estético asumido:** tipografía display condensada (`Big Shoulders Display`) haciendo el trabajo pesado + barber pole divider animado como único elemento en movimiento. Todo lo demás stays quiet.

---

## OUTPUT ESPERADO — 7 PÁGINAS + CSS COMPARTIDO

Generá **7 archivos HTML** + **1 CSS compartido** (`/styles/styles.css` con los tokens y componentes base) + CSS específico por página si hace falta. Estructura de archivos:

```
/pages/index.html        — Inicio (hero asimétrico + previews)
/pages/servicios.html    — Servicios (catálogo + proceso)
/pages/equipo.html       — Equipo (retratos + testimonials)
/pages/reserva.html      — Reserva (form 2 col + slots)
/pages/galeria.html      — Galería (masonry + filtros + before/after)
/pages/contacto.html     — Contacto (mapa + info + form)
/pages/nosotros.html     — Sobre Nosotros (editorial)
/styles/styles.css        — tokens + componentes compartidos (header, footer, divider, buttons, cards, forms)
```

**Reglas de consistencia multi-página:**
- Header, footer y barber pole divider se instancian **idénticos** en cada página. Solo cambia el `aria-current="page"` del nav link activo.
- `/styles/styles.css` se linkea desde las 7 páginas con los mismos tokens.
- Cada página tiene un **layout distinto** — no todo grid de cards. Hero asimétrico, catálogo+timeline, retratos+testimonials, form 2col, masonry+slider, mapa+info, editorial largo.
- Mobile-first real con breakpoints en `640 / 768 / 1024 / 1200 / 1440px`.
- Fuentes cargadas desde Google Fonts via `<link>` en cada `<head>`.
- Accesible: contraste AA, foco visible, `prefers-reduced-motion` respetado, HTML semántico, `aria-current="page"` en nav activa.

**Podés generar las páginas en secuencia.** Prioridad: `/pages/index.html` primero, `/pages/reserva.html` segundo (las críticas de conversión), después el resto. Mantener consistencia visual y de componentes entre todas.

---

## SISTEMA DE DISEÑO (tokens — usar literalmente en `/styles/styles.css`)

### Paleta

```css
:root {
  --canvas: #FAFAFA;
  --surface: #FFFFFF;
  --surface-subtle: #F4F4F5;
  --border: rgba(0,0,0,0.08);
  --border-strong: rgba(0,0,0,0.14);

  --text-primary: #111827;
  --text-secondary: rgba(17,24,39,0.65);
  --text-tertiary: rgba(17,24,39,0.40);
  --text-on-primary: #FFFFFF;
  --text-on-accent: #111827;

  --primary: #8B6B12;
  --primary-hover: #6B5510;
  --primary-active: #553F0C;
  --accent: #C59B27;
  --accent-hover: #A8821B;

  --success: #1F8A4C; --success-surface: #E8F5EE;
  --error: #C2362C;   --error-surface: #FBEAE8;
  --warning: #B8741A; --warning-surface: #FBF0E0;
  --info: #2C6FBB;    --info-surface: #E8F0FA;

  --space-xs:4px; --space-sm:8px; --space-md:16px; --space-lg:24px;
  --space-xl:32px; --space-2xl:48px; --space-3xl:64px; --space-4xl:96px;

  --radius-control:8px; --radius-card:12px; --radius-media:16px; --radius-pill:999px;

  --shadow-1: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-2: 0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06);
  --shadow-3: 0 4px 8px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.10);

  --ease-out: cubic-bezier(0.22,1,0.36,1);
  --ease-in-out: cubic-bezier(0.65,0,0.35,1);

  --z-header: 200; --z-popover: 800; --z-modal: 1000;
}
```

**Regla crítica:** el ámbar `#C59B27` con texto blanco da 2.6:1 y **falla AA**. Para botones con texto blanco usá `--primary` (brass oscuro). El ámbar solo va con texto oscuro encima, en bordes, o en detalles.

### Tipografía (Google Fonts — en cada `<head>`)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

- **Display:** `Big Shoulders Display` — hero, h1, h2, comilla decorativa, logo, números de stats.
- **Body:** `Inter` — body, h3, labels, botones.
- **Data:** `JetBrains Mono` con `font-variant-numeric: tabular-nums` — precios, horarios, números.

| Rol | Size | Weight | LH | Tracking | Familia |
|---|---|---|---|---|---|
| Hero | `clamp(48px, 6vw, 88px)` | 800 | 1.05 | `-0.03em` | Big Shoulders |
| H1 página | `clamp(32px, 4vw, 44px)` | 700 | 1.1 | `-0.02em` | Big Shoulders |
| H2 sección | `24px` | 600 | 1.25 | `-0.01em` | Big Shoulders |
| H3 card | `18px` | 600 | 1.35 | normal | Inter |
| Body | `16px` | 400 | 1.6 | normal | Inter |
| Body small | `14px` | 400 | 1.55 | normal | Inter |
| Label | `12px` | 500 | 1.4 | `0.04em` uppercase | Inter |
| Data | `16px` | 500 | 1.4 | normal | JetBrains Mono |

- Headings con `text-wrap: balance`. Elipsis `…` no `...`. Comillas curvas `“ ”`. Non-breaking spaces en precios: `18&nbsp;USD`.

### Container, grid, radius

- Container: `max-width: 1200px; margin: 0 auto; padding: 0 16px` (mobile) → `0 24px` (≥1024px).
- Grid de cards: 1 col mobile → 2 col ≥640px → 3 col ≥1024px (`repeat(3, 1fr)`, `gap: 24px`).
- Grid masonry (galería): `column-count: 1` mobile → `2` ≥640px → `3` ≥1024px, `column-gap: 16px`, `break-inside: avoid`.
- Block gap entre secciones: `48px` mobile → `64px` desktop.

### Motion

- Duraciones: `fast 120ms`, `base 200ms`, `slow 320ms`, `scene 520ms`.
- Animar SOLO `transform` y `opacity`. **Nunca `transition: all`.**
- `@media (prefers-reduced-motion: reduce)` → duración `0ms`, barber pole se pausa, sin hover transforms.

---

## COMPONENTES COMPARTIDOS (en `/styles/styles.css`, instanciados en cada página)

### Header (sticky, en las 7 páginas)

```html
<header class="site-header">
  <div class="container header-inner">
    <a href="/pages/index.html" class="logo">
      <span class="barber-pole-mini" aria-hidden="true"></span>
      <span class="logo-wordmark">BARBERÍA URBANA</span>
    </a>
    <nav class="site-nav" aria-label="Principal">
      <a href="/pages/index.html" aria-current="page">Inicio</a>
      <a href="/pages/servicios.html">Servicios</a>
      <a href="/pages/equipo.html">Equipo</a>
      <a href="/pages/galeria.html">Galería</a>
      <a href="/pages/reserva.html">Reserva</a>
      <a href="/pages/contacto.html">Contacto</a>
    </nav>
    <a href="/pages/reserva.html" class="btn btn-primary btn-sm">Reservar turno</a>
    <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false" aria-controls="mobile-drawer">☰</button>
  </div>
</header>
```

- Sticky top, `height: 64px`, fondo `rgba(255,255,255,0.95)` + `backdrop-filter: blur(8px)`, borde inferior `1px solid var(--border)`, `z-index: 200`.
- Logo: wordmark `Big Shoulders 800` + barber pole mini `16px` alto × `2px` ancho a la izquierda.
- Nav links `Inter 500 15px`. Hover: subrayado `2px` animado desde izquierda en `--accent` (`200ms --ease-out`). **Active:** `aria-current="page"` → color `--primary` + subrayado permanente.
- CTA Primary "Reservar turno" `40px` alto (header), link a `/pages/reserva.html`.
- Mobile (≤768px): ocultar nav links, mostrar hamburguesa → drawer derecho full-height, `overscroll-behavior: contain`, foco trapado, `aria-expanded` en toggle, cierre `ESC`/overlay.
- `scroll-margin-top: 80px` en anclas internas de cada página.

### Footer (en las 7 páginas)

- Fondo `--text-primary` (#111827), texto blanco / `rgba(255,255,255,0.65)`, padding `48px 0`, `color-scheme: dark`.
- **3 columnas desktop, stack mobile:**
  1. **Logo + tagline:** "BARBERÍA URBANA" (Big Shoulders 800 blanco) + barber pole mini + "Cortes con carácter." + link "Conocé la historia →" (`/pages/nosotros.html`).
  2. **Nav secundaria:** links a las 7 páginas (incluida Nosotros) `14px` `rgba(255,255,255,0.65)`, hover blanco.
  3. **Contacto + horarios:** "Av. Córdoba 1234, Buenos Aires" + teléfono (`tel:` link) + Instagram + horarios (JetBrains Mono: "Lun–Vie 10–20 · Sáb 10–18 · Dom cerrado").
- **Fila inferior:** "© 2025 Barbería Urbana" + links "Política de privacidad" · "Términos" `12px` `rgba(255,255,255,0.40)`.

### Barber Pole Divider (firma visual — CRÍTICO)

Franja diagonal de **4px** con bandas `--accent` / `--surface` / `--text-primary` en movimiento continuo (`2s linear infinite`). Entre secciones dentro de cada página. Único elemento animado persistente.

```css
.barber-pole {
  height: 4px;
  background: repeating-linear-gradient(-45deg,
    var(--accent) 0 12px, var(--surface) 12px 24px,
    var(--text-primary) 24px 36px, var(--surface) 36px 48px);
  background-size: 200% 100%;
  animation: barber-pole-scroll 2s linear infinite;
}
.barber-pole-mini {
  display: inline-block;
  width: 2px; height: 16px;
  background: repeating-linear-gradient(-45deg,
    var(--accent) 0 3px, var(--surface) 3px 6px,
    var(--text-primary) 6px 9px, var(--surface) 9px 12px);
  animation: barber-pole-scroll 2s linear infinite;
  vertical-align: middle;
  margin-right: 8px;
}
@keyframes barber-pole-scroll { to { background-position: 48px 0; } }
@media (prefers-reduced-motion: reduce) {
  .barber-pole, .barber-pole-mini { animation: none; }
}
```

### Banda CTA (final de index, servicios, equipo, galería, nosotros — NO en reserva ni contacto)

Full-width, fondo `--text-primary`, texto blanco, padding `48px 0`. Barber pole arriba. H2 "¿Listo para el corte?" (Big Shoulders 700 blanco) + body "Reservá tu silla en 30 segundos." + botón Accent "Reservar turno" (`/pages/reserva.html`). Centrado mobile, H2+CTA en fila desktop.

### Eyebrow de sección (patrón repetido)

Label uppercase `Inter 500 12px` `--text-secondary` con barber pole mini `16px` a la izquierda. Codifica el nombre real de la sección. Numeración `01/02/03` **solo si es secuencia real** (proceso en `/pages/servicios.html`).

### Botones
- **Primary:** fondo `--primary`, texto blanco peso 600, alto `44px`, padding `0 20px`, radio `8px`. Hover `--primary-hover`, active `--primary-active`, focus-visible `outline: 2px solid var(--accent); outline-offset: 2px`.
- **Ghost:** fondo transparente, borde `1px solid var(--border-strong)`, texto `--text-primary`. Hover fondo `--surface-subtle`.
- **Accent:** fondo `--accent`, texto `--text-on-accent` (oscuro). Hover `--accent-hover`. **Solo para el CTA más importante de cada página.**
- **Icon button:** `40×40`, `aria-label` obligatorio.

### Cards (compartidas entre páginas)
- **Service card:** fondo `--surface`, borde, padding `24px`, radio `12px`, `--shadow-1`, hover `--shadow-2` + `translateY(-2px)`. Ícono 32px + H3 + body small + precio (mono `tabular-nums`) + duración (label `--text-tertiary`). Altura uniforme con `align-items: stretch`.
- **Barber card:** retrato `1:1` + nombre H3 + apodo + especialidad label + bio body small + rating (estrellas Lucide `star` `16px` `--accent` + número mono + count) + CTA Ghost.
- **Testimonial card:** comilla grande Big Shoulders `--accent` + texto body + avatar `40px` + firma label.
- **Value card:** ícono 32px `--primary` + H3 + body small.
- **Stat card:** número Big Shoulders 800 `--accent` `clamp(40px, 5vw, 56px)` + label debajo. **Estático, sin animación.**

### Form Controls (reserva + contacto)
- Input/Select/Textarea: alto `44px`, borde `1px solid var(--border-strong)`, radio `8px`. Focus `border-color: var(--primary)` + ring `0 0 0 3px rgba(139,107,18,0.3)`. Error `border-color: var(--error)` + mensaje inline `--error` `14px`.
- Label 12px uppercase, `for`/`id` asociado. Placeholder termina `…` con patrón.
- `autocomplete`, `name`, `type`, `inputmode` correctos. Submit con spinner durante request. Errores `aria-live="polite"`, foco al primer error.

### Badges / Chips
- Horario: `Libre` (`--success`/`--success-surface`), `Último lugar` (`--warning`/`--warning-surface`), `Ocupado` (`--text-tertiary`/`--surface-subtle`). Alto `24px`, pill.
- Filtro galería: activo `--primary`/blanco, inactivo borde `--border-strong` hover `--surface-subtle`. Alto `32px`, `aria-pressed`.

---

## PÁGINA 1 — `/pages/index.html` (Inicio)

**Hero asimétrico 2 col (≥1024px) / stack mobile.** `min-height: calc(100vh - 64px)`, fondo `--canvas` plano, sin gradientes.

**Col izq:**
- Eyebrow: barber pole mini + "EST. 2019 · BUENOS AIRES".
- H1 (Big Shoulders 800, `clamp(48px, 6vw, 88px)`, `text-wrap: balance`): "Cortes con carácter. Reservá tu silla."
- Body (`Inter 400 16px`, `--text-secondary`, `max-width: 460px`): "Barbería de barrio con mentalidad de atelier. Tijera, navaja y café. Reservá en 30 segundos."
- CTA group: botón Accent "Reservar turno" (`/pages/reserva.html`) + Ghost "Ver el trabajo" (`/pages/equipo.html`).
- Microprueba: "★ 4.9 · 320 reservas este mes" `Inter 500 14px` `--text-tertiary`. **Sin animación.**

**Col der:** imagen `aspect-ratio: 4/5`, `border-radius: 16px`, `object-fit: cover`, `width`/`height` explícitos, `fetchpriority="high"`. Placeholder `--surface-subtle` + ícono tijera `--text-tertiary` 40% opacidad si no hay imagen.

**Barber pole divider.**

**Preview Servicios:** eyebrow "SERVICIOS" + H2 "Lo que hacemos" (Big Shoulders 700) + body "Tijera y navaja. Precios claros, sin sorpresas." + grid 3 service cards (Corte de cabello `18&nbsp;USD`/30 min, Corte + Barba `25&nbsp;USD`/45 min con borde `--accent` + pill "Más pedida", Afeitado clásico `20&nbsp;USD`/30 min) + link "Ver todos los servicios →" (`/pages/servicios.html`).

**Barber pole divider.**

**Preview Equipo:** eyebrow "EQUIPO" + H2 "Las manos detrás del corte" + body "Tres barberos, tres estilos." + grid 3 barber cards (Marco "El Navaja" Fade & diseño ★4.9 (128), Diego Barba & afeitado ★4.8 (94), Lucía Corte & styling ★5.0 (76)) + link "Conocé al equipo →" (`/pages/equipo.html`).

**Barber pole divider.**

**Testimonial destacado:** full-width fondo `--surface-subtle` padding `32px` radio `12px`. Comilla Big Shoulders 900 `80px` `--accent` + texto "El mejor fade que me hicieron en Buenos Aires. Marco sabe lo que hace." + firma "— Julián R., cliente desde 2021" label.

**Banda CTA.**

---

## PÁGINA 2 — `/pages/servicios.html` (Servicios — catálogo + proceso)

Active nav: Servicios.

**Page header:** eyebrow "SERVICIOS" + H1 "Lo que hacemos" + body "Tijera y navaja. Precios claros, sin sorpresas."

**Barber pole divider.**

**Grid 6 service cards** (3 col desktop, 2 col tablet, 1 col mobile):
1. Corte de cabello — tijera `scissors` `32px` `--primary`. `18&nbsp;USD`. "30 min".
2. Arreglo de barba — navaja. `12&nbsp;USD`. "20 min".
3. Corte + Barba — combo. `25&nbsp;USD`. "45 min". **Destacada:** borde `2px solid var(--accent)`, pill "Más pedida" arriba derecha (`--accent`/`--text-on-accent`).
4. Afeitado clásico — navaja + toalla. `20&nbsp;USD`. "30 min".
5. Diseño / Línea — `pen-tool`. `+5&nbsp;USD`. "15 min".
6. Corte junior (hasta 12) — niño. `12&nbsp;USD`. "25 min".

**Barber pole divider.**

**Proceso (timeline con numbered markers — aquí SÍ es secuencia real):** 4 pasos horizontales desktop / vertical mobile. Línea conectora `1px solid var(--border)`, dots `8px` `--primary` en cada nodo.
- `01` (Big Shoulders `--accent` `48px`) "Reservá" — "Elegí servicio, barbero y horario online."
- `02` "Llegá 5 min antes" — "Café y música. Relajate."
- `03` "Cortamos" — "Tijera, navaja y tu estilo."
- `04` "Volvé cuando quieras" — "Te avisamos para el próximo."

**Banda CTA.**

---

## PÁGINA 3 — `/pages/equipo.html` (Equipo — retratos + testimonials)

Active nav: Equipo.

**Page header:** eyebrow "EQUIPO" + H1 "Las manos detrás del corte" + body "Tres barberos, tres estilos. Elegí con quién reservar."

**Barber pole divider.**

**Grid 3 barber cards** (3 col desktop, 1 col mobile):
1. **Marco "El Navaja"** — retrato `1:1`. Especialidad "FADE & DISEÑO". Bio: "10 años de tijera. Fade de precisión y diseño a navaja." ★ 4.9 (128). CTA Ghost "Reservar con Marco" (`/pages/reserva.html?barbero=marco`).
2. **Diego** — "BARBA & AFEITADO CLÁSICO". Bio: "Especialista en barba y afeitado tradicional con toalla caliente." ★ 4.8 (94). CTA "Reservar con Diego".
3. **Lucía** — "CORTE & STYLING". Bio: "Corte femenino y styling. Cuidado del rizo y transformaciones." ★ 5.0 (76). CTA "Reservar con Lucía".

**Barber pole divider.**

**Portfolio preview:** eyebrow "TRABAJO" + H2 "Mirá lo que hacemos" + grid 6 imágenes `aspect-ratio: 4/5` (3 col desktop, 2 col mobile), `radius: 12px`, hover `scale(1.02)` `200ms --ease-out` + overlay título. + link "Ver galería completa →" (`/pages/galeria.html`).

**Barber pole divider.**

**Testimonials:** eyebrow "CLIENTES" + H2 "Lo que dicen" + grid 2 col (desktop) / 1 col (mobile) de 3 testimonial cards:
- "El mejor fade que me hicieron en Buenos Aires. Marco sabe lo que hace." — Julián R., corte + diseño.
- "Diego me dejó la barba perfecta. El afeitado con toalla es un lujo." — Tomás G., afeitado clásico.
- "Lucía entendió lo que quería en 5 minutos. Volví y volví." — Sofía M., corte & styling.

**Banda CTA.**

---

## PÁGINA 4 — `/pages/reserva.html` (Reserva — form 2 col + slots)

Active nav: Reserva. **Sin banda CTA** (esta página ES el CTA).

**Page header:** eyebrow "RESERVA" + H1 "Reservá tu turno" + body "Tres pasos. Te llega confirmación por WhatsApp."

**Layout 2 col (≥1024px) / stack mobile:**

**Col izq — Form** (card `--surface` borde padding `32px` radio `12px` `--shadow-1`):
1. Nombre — `text`, `name="full_name"`, `autocomplete="name"`, `placeholder="Ej. Martín López…"`, label "Tu nombre".
2. Teléfono — `tel`, `name="phone"`, `autocomplete="tel"`, `inputmode="tel"`, `placeholder="Ej. 11 2345 6789…"`, label "Teléfono (WhatsApp)".
3. Servicio — `select` (6 opciones de /pages/servicios.html). Label "Servicio".
4. Barbero — `select` (Marco / Diego / Lucía / Cualquiera). Label "Barbero".
5. Fecha — `date`, `name="date"`. Label "Fecha".

Submit Primary full-width "Confirmar turno" `48px` con spinner interno durante request. Éxito → `--success` "Turno confirmado. Te escribimos por WhatsApp." `aria-live="polite"`. Errores → borde `--error` + mensaje inline `--error` `14px`, foco al primer error.

**Col der — Selector horario:**
- H2 "Horarios disponibles" (Big Shoulders 600 `24px`).
- Sub-encabezado: fecha seleccionada `Inter 500 14px` `--text-secondary`.
- Grilla slots: 3 col mobile / 2 col desktop, `gap: 8px`. Cada slot botón `40px` alto, radio `8px`, borde `1px solid var(--border-strong)`, JetBrains Mono `14px` ("10:00", "10:30", "11:00", etc.).
- Estados: **Libre** → clickeable, hover `--surface-subtle`, seleccionado `--primary`/blanco. **Último lugar** → pill warning arriba derecha. **Ocupado** → `disabled`, `aria-disabled="true"`, opacidad `0.4`, `cursor: not-allowed`.
- Leyenda: 3 badges (Libre success, Último lugar warning, Ocupado neutral).

**Info box** full-width `--info-surface` padding `16px` radio `8px` texto `--info` `14px`: "Lun–Vie 10:00–20:00 · Sáb 10:00–18:00 · Dom cerrado. Llegá 5 min antes."

---

## PÁGINA 5 — `/pages/galeria.html` (Galería — masonry + filtros + before/after)

Active nav: Galería.

**Page header:** eyebrow "GALERÍA" + H1 "El trabajo habla" + body "Cortes, fades y barbas. Antes y después."

**Filtros:** fila de chips `32px` alto pill: "Todos" (activo, `aria-pressed="true"`) · "Fades" · "Barba" · "Diseño" · "Afeitado". Inactivos borde `--border-strong`, hover `--surface-subtle`, activo `--primary`/blanco.

**Before/After destacado** full-width: slider revelador `aspect-ratio: 21/9` desktop / `4:5` mobile. Label "Antes / Después" arriba. Handle: línea `2px` `--accent` + círculo `32px` `--surface` con ícono `move-horizontal` Lucide. Draggable (mouse) + teclado (`arrow-left`/`arrow-right`, `role="slider"`, `aria-valuenow`/`aria-valuemin`/`aria-valuemax`). Placeholder `--surface-subtle` si no hay imágenes.

**Barber pole divider.**

**Grid masonry** (`column-count` responsivo 1/2/3, `column-gap: 16px`, `break-inside: avoid`): 12-15 imágenes `aspect-ratio: 4/5`, `radius: 12px`. Hover: `transform: scale(1.02)` `200ms --ease-out` + overlay sutil con título del corte + nombre del barbero. `loading="lazy"`, `width`/`height` explícitos.

**Banda CTA.**

---

## PÁGINA 6 — `/pages/contacto.html` (Contacto — mapa + info + form)

Active nav: Contacto. **Sin banda CTA** (derivación a reserva inline).

**Page header:** eyebrow "CONTACTO" + H1 "Encontranos" + body "Ubicación, horarios y consulta. Para reservar un turno, usá la reserva online."

**Layout 2 col (≥1024px) / stack mobile:**

**Col izq — Info + mapa:**
- Lista de contacto con íconos Lucide `20px` `--primary`:
  - Pin: "Av. Córdoba 1234, Buenos Aires"
  - Teléfono: link `tel:+541112345678` "+54 11 1234-5678"
  - Mail: link `mailto:hola@barberiaurbana.com` "hola@barberiaurbana.com"
  - Instagram: link externo `@barberiaurbana`
- Tabla horarios (JetBrains Mono): Lun–Vie 10:00–20:00 · Sáb 10:00–18:00 · Dom cerrado.
- Mapa embed: `<iframe>` `aspect-ratio: 16/9` desktop / `4:3` mobile, `loading="lazy"`, `border-radius: 12px`, borde. Placeholder `--surface-subtle` + pin `--primary` si no hay embed.

**Col der — Form de consulta** (card `--surface`):
1. Nombre — `text`, `autocomplete="name"`. Label "Tu nombre".
2. Email — `email`, `autocomplete="email"`, `inputmode="email"`, `spellcheck="false"`. Label "Email".
3. Asunto — `select`: "Consulta general" / "Evento privado" / "Producto" / "Otro". Label "Asunto".
4. Mensaje — `textarea`, rows `4`. Label "Mensaje".

Submit Primary "Enviar consulta". Aclaración debajo: "Para reservar un turno, usá la reserva online →" (link Accent a `/pages/reserva.html`).

---

## PÁGINA 7 — `/pages/nosotros.html` (Sobre Nosotros — editorial)

Active nav: ninguno (se accede desde footer y hero de index). **No está en nav primaria.**

**Page header:** eyebrow "NUESTRA HISTORIA" + H1 "Barbería de barrio, mentalidad de atelier" + body extenso `max-width: 680px` `Inter 400 17px` line-height `1.7`: 2-3 párrafos sobre el origen (2019, Marco fundador, el barrio, la filosofía del oficio). Copy real, no placeholder.

**Imagen ambient** full-width `aspect-ratio: 21/9` con overlay `linear-gradient(180deg, transparent, rgba(17,24,39,0.35))`.

**Barber pole divider.**

**Filosofía / valores:** eyebrow "LO QUE CREEMOS" + H2 "Tres cosas que no negociamos" + grid 3 value cards (3 col desktop, 1 col mobile):
1. Ícono `scissors` — "Tijera antes que máquina" — "La máquina es rápida. La tijera es precisa. Nos quedamos con la precisión."
2. Ícono `user` — "El cliente no es un número" — "Cada corte empieza con una conversación. Saber qué querés es la mitad del trabajo."
3. Ícono `award` — "El oficio se aprende, no se descarga" — "Diez años de tijera. El oficio se gana arriba de la silla, no en YouTube."

**Barber pole divider.**

**Stats:** eyebrow "POR EL NÚMERO" + grid 4 stat cards (4 col desktop, 2 col tablet, 1 col mobile):
- "4.9" label "★ rating" · "320" label "reservas/mes" · "5" label "años" · "3" label "barberos".
- Números Big Shoulders 800 `--accent` `clamp(40px, 5vw, 56px)`. **Estáticos, sin animación de contador.**

**Barber pole divider.**

**Cita del fundador:** full-width `--surface-subtle` padding `48px` radio `12px`. Comilla Big Shoulders 900 `80px` `--accent` + texto "Abrí esta barbería porque no encontraba un lugar que respete el oficio y al cliente al mismo tiempo. Acá las dos cosas van juntas." + firma "— Marco, fundador" label.

**Banda CTA.**

---

## RESPONSIVIDAD (mobile-first estricto, aplica a las 7 páginas)

1. **Mobile (<640px) — caso base:** 1 columna en todos los grids. Container padding `16px`. Hero stack. Form y slots stack. Masonry 1 columna. Nav como hamburguesa → drawer.
2. **≥640px:** grids de cards 2 col. Masonry 2 col. Filtros galería siguen fila (wrap si hace falta).
3. **≥768px:** nav links visible (ocultar hamburguesa). Hero 2 col. Reserva 2 col. Contacto 2 col.
4. **≥1024px:** grids de cards 3 col. Masonry 3 col. Container padding `24px`.
5. **≥1200px:** container `max-width: 1200px` centrado.
6. **≥1440px:** canvas base de Stitch, no estirar más allá de 1200px de contenido.

`touch-action: manipulation` en todos los botones y links. `overscroll-behavior: contain` en drawer y modal.

---

## ACCESIBILIDAD (no opcional, aplica a las 7 páginas)

- Skip link `<a href="#main" class="skip">Saltar al contenido</a>` al inicio de cada `<body>`, visible solo on focus.
- HTML semántico: `<header>`, `<main id="main">`, `<section>`, `<footer>`. **Un solo `<h1>` por página** (el page header).
- **Nav activa:** `aria-current="page"` en el link de la página actual.
- `<button>` para acciones (toggle drawer, submit, slider handle). `<a>` para navegación entre páginas y anclas. **Nunca `<div onclick>`.**
- Todo interactivo con `:focus-visible` ring visible: `outline: 2px solid var(--accent); outline-offset: 2px;`. **Nunca `outline: none` sin reemplazo.**
- Inputs con `<label>` asociado, `autocomplete`, `name`, `type`, `inputmode`. Errores con `aria-live="polite"`. Foco al primer error on submit.
- Imágenes con `alt` descriptivo; decorativas `alt=""`. Íconos decorativos `aria-hidden="true"`.
- Slot ocupado: `disabled` + `aria-disabled="true"`.
- `prefers-reduced-motion: reduce` → barber pole pausado, sin hover transforms, sin drawer slide (instantáneo).
- `scroll-margin-top: 80px` en anclas internas.
- **Before/After slider:** `role="slider"`, `aria-valuenow`/`aria-valuemin`/`aria-valuemax`, manejable con `arrow-left`/`arrow-right`.
- **Filtros galería:** `aria-pressed="true/false"` en cada chip.
- Contraste AA verificado (especialmente el dorado — ver regla crítica).

---

## RESTRICCIONES — NO HACER

- **No** gradientes genéricos (morado→azul, sunset, mesh, blobs, aurora).
- **No** contadores animados en stats. Los números van estáticos.
- **No** numbered markers `01/02/03` salvo en `/pages/servicios.html` (proceso — secuencia real). En el resto, eyebrows de texto.
- **No** tipografía por default. El display ES `Big Shoulders Display`. Inter solo para body.
- **No** ámbar `#C59B27` con texto blanco. Es AA-fail. Para texto blanco usá `--primary` brass oscuro.
- **No** `transition: all`. Listá propiedades explícitas.
- **No** emojis en UI. Usar íconos Lucide.
- **No** `outline: none` sin `:focus-visible` replacement.
- **No** clipart vintage de barbería (poste de barbero literal, bigote dibujado, silla vintage ilustrada). La firma es el barber pole **geométrico abstracto**.
- **No** cards con sombras pesadas por defecto. `--shadow-1` en reposo, `--shadow-2` solo en hover.
- **No** estirar el container más allá de 1200px en desktop wide.
- **No** `user-scalable=no` ni `maximum-scale=1` (no disables zoom).
- **No** placeholders tipo "Lorem ipsum". Usá el copy real provisto.
- **No** repetir el mismo layout en todas las páginas. Cada página es un layout distinto (hero asimétrico, catálogo+timeline, retratos+testimonials, form 2col, masonry+slider, mapa+info, editorial).
- **No** generar páginas sueltas sin header/footer. Las 7 páginas comparten header y footer idénticos (solo cambia `aria-current`).

---

## COPY REAL (usar literalmente — no inventar)

- **Nombre:** Barbería Urbana
- **Tagline hero:** "Cortes con carácter. Reservá tu silla."
- **Sub hero:** "Barbería de barrio con mentalidad de atelier. Tijera, navaja y café. Reservá en 30 segundos."
- **Eyebrows:** "EST. 2019 · BUENOS AIRES" / "SERVICIOS" / "EQUIPO" / "GALERÍA" / "RESERVA" / "CONTACTO" / "NUESTRA HISTORIA" / "LO QUE CREEMOS" / "POR EL NÚMERO" / "TRABAJO" / "CLIENTES"
- **H1s por página:** index "Cortes con carácter. Reservá tu silla." / servicios "Lo que hacemos" / equipo "Las manos detrás del corte" / reserva "Reservá tu turno" / galeria "El trabajo habla" / contacto "Encontranos" / nosotros "Barbería de barrio, mentalidad de atelier"
- **CTAs:** "Reservar turno" (principal) / "Ver el trabajo" / "Reservar con [Nombre]" / "Confirmar turno" / "Enviar consulta" / "Ver todos los servicios →" / "Conocé al equipo →" / "Ver galería completa →" / "Conocé la historia →"
- **Banda CTA:** "¿Listo para el corte?" + "Reservá tu silla en 30 segundos."
- **Servicios:** 6 con precios USD y duraciones (ver `/pages/servicios.html`).
- **Barberos:** Marco "El Navaja" (Fade & diseño, 4.9, 128) / Diego (Barba & afeitado clásico, 4.8, 94) / Lucía (Corte & styling, 5.0, 76).
- **Proceso:** "01 Reservá" / "02 Llegá 5 min antes" / "03 Cortamos" / "04 Volvé cuando quieras".
- **Valores:** "Tijera antes que máquina" / "El cliente no es un número" / "El oficio se aprende, no se descarga".
- **Stats:** "4.9 ★ rating" / "320 reservas/mes" / "5 años" / "3 barberos".
- **Cita fundador:** "Abrí esta barbería porque no encontraba un lugar que respete el oficio y al cliente al mismo tiempo. Acá las dos cosas van juntas." — Marco, fundador.
- **Testimonials:** "El mejor fade que me hicieron en Buenos Aires. Marco sabe lo que hace." — Julián R. / "Diego me dejó la barba perfecta. El afeitado con toalla es un lujo." — Tomás G. / "Lucía entendió lo que quería en 5 minutos. Volví y volví." — Sofía M.
- **Horarios:** Lun–Vie 10:00–20:00 · Sáb 10:00–18:00 · Dom cerrado.
- **Dirección:** "Av. Córdoba 1234, Buenos Aires"
- **Teléfono:** "+54 11 1234-5678"
- **Email:** "hola@barberiaurbana.com"
- **Instagram:** `@barberiaurbana`
- **Estados:** "Cargando…" / "Turno confirmado. Te escribimos por WhatsApp." / "No quedan lugares para este horario — probá el siguiente." / "Necesitamos un teléfono válido para confirmar el turno."

Voz: segunda persona, voseo, activa, directa, sin humo. El rango de formas verbales se define por el contenido real del proyecto, no por una lista cerrada. Numerales no palabras. Comillas curvas. Elipsis `…` real.

---

## RESUMEN DE INTENCIÓN VISUAL

El resultado tiene que sentirse como el **sitio web completo** de una barbería premium urbana de Buenos Aires — no una landing de una sola página, no un template de SaaS light, no una barbería vintage americana con clipart. Siete páginas con layouts distintos pero visualmente consistentes: hero asimétrico, catálogo+timeline, retratos+testimonials, form de reserva, masonry con before/after, mapa+contacto, editorial de marca. La tipografía condensada `Big Shoulders Display` hace el trabajo visual pesado, la fotografía real del trabajo apoya sin competir, el dorado es escaso y disciplinado, y el barber pole divider es el único gesto animado — la firma que hace que este sitio no se confunda con ningún otro. Header, footer y tokens se repiten idénticos en las 7 páginas; la nav activa indica dónde estás. Todo lo demás es ejecución limpia de un sistema modular ligero aplicado a un sitio real, no a una única página.
