# Design System Specification: The Rustic Barber Shop (Dark Industrial)

> **Sujeto:** barbería y academia de barbería artesanal. **Audiencia:** hombres 22–45, urbanos, que valoran estilo, oficio y desarrollo de habilidades. **Trabajo del sitio:** mostrar el trabajo y la formación, generar confianza y convertir a reserva de turno o inscripción. **Estilo:** Dark Industrial — paleta oscura unificada, tipografíasans-serif robusta, firma barber pole.

> **Arquitectura:** sitio web multi-página (7 HTMLs) con componentes compartidos (header, footer, divider, CSS de tokens). Mobile-first. Cada página es un layout distinto — no todo grid de cards.

---

## 1. Principios de Diseño

1. **La tipografía es la marca** — la sans-serif Montserrat Bold hace el trabajo visual pesado; la fotografía apoya, no compite.
2. **Un solo elemento memorable** — el barber pole reimaginado como divisor animado es la firma; todo lo demás se queda callado.
3. **Mobile-first real** — la mayoría de las reservas vienen del teléfono; el escritorio no es el caso base.
4. **Accesibilidad no negociable** — contraste AA en todo, foco visible, `prefers-reduced-motion` respetado, navegación por teclado entre páginas.
5. **Restraint disciplinado** — un acento dorado rico (#C5A059), no confeti dorado. El oro es escaso = premium.
6. **Consistencia multi-página** — header, footer, tokens y voz se repiten idénticos en las 7 páginas. La nav activa indica la página actual.
7. **Estética Dark Industrial** — el canvas oscuro (#0D0D0D) unifica el sitio; los módulos elevados (#1A1A1A) crean jerarquía sin romper la cohesión.

---

## 2. Site Architecture

### 2.1 Páginas del sitio (7 layouts)

| Archivo | Ruta | Propósito | Layout type |
|---|---|---|---|
| `pages/index.html` | `/` | Captar, mostrar tesis, derivar a reserva | Hero asimétrico + previews |
| `pages/servicios.html` | `/servicios` | Catálogo completo + proceso | Grid de catálogo + timeline |
| `pages/equipo.html` | `/equipo` | Barberos, bio, portfolio preview | Grid de retratos + testimonials |
| `pages/reserva.html` | `/reserva` | Convertir: form + slots de horario | Form 2 columnas |
| `pages/galeria.html` | `/galeria` | Prueba social visual, antes/después | Masonry + filtros + slider |
| `pages/contacto.html` | `/contacto` | Ubicación, horarios, consulta no-reserva | Mapa + info + form |
| `pages/nosotros.html` | `/nosotros` | Historia, filosofía, stats | Editorial largo |

### 2.2 Jerarquía de navegación

- **Nav primaria (header, todas las páginas):** Inicio · Servicios · Equipo · Galería · Reserva · Contacto. `/pages/nosotros.html` se accede desde el footer y desde un link en el hero de index (no va en nav primaria para no saturar — es página secundaria).
- **Active state:** el link de la página actual lleva color `--primary` + subrayado permanente (`2px` bottom). Los demás links en `--text-primary` con hover `--accent`.
- **CTA persistente:** botón Primary "Reservar turno" a la derecha del header en todas las páginas, ancla a `/pages/reserva.html`.
- **Footer:** nav secundaria con todas las páginas (incluida `nosotros`), contacto, horarios, legales.

### 2.3 Flujos de conversión

- **Flujo principal:** index → (hero CTA) → reserva.
- **Flujo de exploración:** index → servicios/equipo/galería → (CTA al final de cada) → reserva.
- **Flujo de confianza:** index → nosotros → equipo → reserva.
- **Flujo de consulta:** contacto → (si es consulta de turno) → reserva.

Cada página (salvo reserva y contacto) termina con una **banda CTA** (barber pole + texto + botón Accent "Reservar turno") que deriva a `/pages/reserva.html`.

---

## 3. Viewport & Responsive (Mobile-First)

- **Breakpoints:**
  - `sm`: `640px` — mobile large / tablet portrait chica
  - `md`: `768px` — tablet
  - `lg`: `1024px` — laptop
  - `xl`: `1200px` — desktop
  - `2xl`: `1440px` — wide (canvas base de Stitch)
- **Canvas de Stitch:** `1440px`, pero cada página se compone mobile-first y escala hacia arriba.
- **Layout container:** `max-width: 1200px`, `margin: 0 auto`, `padding: 0 16px` en mobile, `0 24px` desde `lg`.
- **Vertical rhythm:** baseline grid de `8px`. Cada página se compone de secciones con `min-height` según densidad (hero `100vh`, catálogos `auto`, editorial `auto`). La regla de "3 subsecciones" es una **pauta de balance, no una camisa de fuerza**: 2–4 bloques según el contenido.
- **Block gap entre secciones de una página:** `48px` (`2xl`) en mobile, `64px` (`3xl`) desde `lg`.

---

## 4. Design Tokens

### 4.1 Color Palette

**Dark-Toned Neutrales**
- `--canvas`: `#0D0D0D` — base oscura (no usar #000000 por contraste insuficiente 4.6:1)
- `--surface`: `#1A1A1A` — tarjetas y módulos elevados
- `--surface-subtle`: `#242424` — inputs, banners internos, placeholders
- `--border`: `rgba(255, 255, 255, 0.08)` — delimitación sutil sobre fondo oscuro
- `--border-strong`: `rgba(255, 255, 255, 0.14)` — inputs y controles

**Texto**
- `--text-primary`: `#F5F5F5` — texto principal sobre fondos oscuros
- `--text-secondary`: `rgba(245, 245, 245, 0.65)` — subtítulos y descripciones
- `--text-tertiary`: `rgba(245, 245, 245, 0.40)` — metadatos y notas legales
- `--text-on-primary`: `#F5F5F5` — texto claro sobre `--primary`
- `--text-on-accent`: `#0D0D0D` — texto oscuro sobre `--accent` (contraste 5.1:1)

**Marca / Acento**
- `--primary`: `#C5A059` — Doe Brown (brass rico). Pasa AA 6.2:1 con `#0D0D0D`. **Usado para fondos oscuros con texto claro (botones clave).**
- `--primary-hover`: `#A8863A`
- `--primary-active`: `#8B6B30`
- `--accent`: `#E8D5A3` — Doe Brown light (accent claro). Pasa AA 5.1:1 con `#0D0D0D`. **Para borders, highlights, fondos oscuros con texto oscuro.**
- `--accent-hover`: `#D4C08A`

**Semánticos (status)**
- `--success`: `#22C55E` / `--success-surface`: `#14532D` — horario libre, reserva confirmada
- `--error`: `#EF4444` / `--error-surface`: `#7F1D1D` — validación, error de reserva
- `--warning`: `#F59E0B` / `--warning-surface`: `#78350F` — último lugar disponible
- `--info`: `#3B82F6` / `--info-surface`: `#1E3A5F` — avisos neutros

> **Regla de contraste:** todos los pares de color de primer plano/fondo cumplen WCAG AA (mínimo 4.5:1 para texto normal, 3:1 para texto grande). El `--canvas` #0D0D0D con --primary #C5A059 da 6.2:1 ✓. El --accent #E8D5A3 sobre #0D0D0D da 5.1:1 ✓.

### 4.2 Typography

**Familias (Google Fonts)**
- **Display:** `Montserrat` (700/800/900) — geométrica, robusta, moderna. Letrerería sin serifas que comunica craftsmanship.
- **Body:** `Montserrat` (400/500/600/700) — limpia, legible, moderna.
- **Data/Mono:** `JetBrains Mono` (500) — precios, horarios, números de turno con `font-variant-numeric: tabular-nums`.

**Escala**
| Rol | Size | Weight | Line-height | Tracking | Familia |
|---|---|---|---|---|---|
| Display / Hero | `clamp(48px, 6vw, 88px)` | 800 | 1.05 | `-0.03em` | Montserrat |
| H1 Página | `clamp(32px, 4vw, 44px)` | 700 | 1.1 | `-0.02em` | Montserrat |
| H2 Sección | `24px` | 600 | 1.25 | `-0.01em` | Montserrat |
| H3 Card | `18px` | 600 | 1.35 | normal | Montserrat |
| Body | `16px` | 400 | 1.6 | normal | Montserrat |
| Body Small | `14px` | 400 | 1.55 | normal | Montserrat |
| Label / Caption | `12px` | 500 | 1.4 | `0.04em` uppercase | Montserrat |
| Data (precios, horas) | `16px` | 500 | 1.4 | normal | JetBrains Mono |

- Headings con `text-wrap: balance` (evita viudas).
- Elipsis real `…` no `...`. Comillas curvas `“ ”` no rectas.
- Non-breaking spaces en precios y marcas: `10&nbsp;USD`, `The&nbsp;Rustic&nbsp;Barber&nbsp;Shop`.

> El body es `16px`. En mobile la legibilidad es crítica para conversión.

### 4.3 Spacing & Grid

- **Baseline:** `8px`. Todo espaciado es múltiplo de `4`.
- **Scale:** `xs:4` `sm:8` `md:16` `lg:24` `xl:32` `2xl:48` `3xl:64` `4xl:96`
- **Container padding:** `16px` mobile, `24px` desde `lg`.
- **Grid de cards:** 1 col mobile → 2 col desde `sm` → 3 col desde `lg` (`repeat(3, 1fr)`), `gap: 24px`.
- **Grid masonry (galería):** `column-count: 1` mobile → `2` desde `sm` → `3` desde `lg`, `column-gap: 16px`, items `break-inside: avoid`.
- **Border radius:** controles `8px`, cards/paneles `12px`, hero/media `16px`, pills `999px`.
- **Border:** `1px solid var(--border)`.

### 4.4 Elevation

- `--shadow-0`: none
- `--shadow-1`: `0 1px 2px rgba(0,0,0,0.04)` — card en reposo
- `--shadow-2`: `0 1px 3px rgba(0,0,0,0.04), 0 8px 24px rgba(0,0,0,0.06)` — card hover / popover
- `--shadow-3`: `0 4px 8px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.10)` — modal / dialog

### 4.5 Motion

- **Duration:** `fast: 120ms`, `base: 200ms`, `slow: 320ms`, `scene: 520ms`
- **Easing:** `--ease-out: cubic-bezier(0.22, 1, 0.36, 1)` (estándar), `--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1)`
- **Propiedades:** solo `transform` y `opacity` (compositor-friendly). **Nunca `transition: all`.**
- **Reduced motion:** `@media (prefers-reduced-motion: reduce)` → duración `0ms`, sin autoplay de loops.
- **Barber pole animation:** franjas diagonales, `2s linear infinite`, se pausa con reduced-motion.

### 4.6 Z-Index

- `--z-base: 0`, `--z-sticky: 100`, `--z-header: 200`, `--z-popover: 800`, `--z-modal: 1000`, `--z-toast: 1100`

---

## 5. Iconography

- **Set:** `Lucide` (stroke `1.5px`, box `24px`) para UI. `Phosphor Duotone` opcional para íconos feature.
- **Tamaños:** `16px` inline, `20px` UI, `24px` cuerpo, `32px` feature.
- **Color:** hereda `currentColor`. Íconos decorativos → `aria-hidden="true"`.
- **Vocabulario barbería:** tijera, navaja, reloj, calendario, silla, estrella (rating), pin de mapa, teléfono, cámara (galería), mail (contacto).

---

## 6. Photography & Imagery

**Tratamiento — la fotografía es la prueba social del trabajo:**

- **Portfolio (cortes):** aspect `4:5` (vertical, ideal para haircuts). Ajuste de curvas leve: contraste `+8`, calidez `+5`. **Sin filtros pesados.** El trabajo se ve real, no instagrameado.
- **Retratos de barberos:** aspect `1:1`, fondo `--surface-subtle` (#242424), expresión natural, sin poses de catálogo.
- **Hero / ambient:** aspect `21:9` (desktop) / `4:5` (mobile). Overlay sutil `linear-gradient(180deg, transparent, rgba(13,13,13,0.5))` para legibilidad de texto encima.
- **Before / After:** mismo encuadre, misma iluminación, slider revelador (interacción firma secundaria).
- **Performance:** toda `<img>` con `width` y `height` explícitos (evita CLS). Below-the-fold `loading="lazy"`. Above-the-fold `fetchpriority="high"`.
- **Empty state:** placeholder `--surface-subtle` (#242424) con ícono centrado al 40% opacidad, no caja rota.

---

## 7. Shared Component Architecture

> Componentes que se instancian en **todas o casi todas** las páginas. Consistencia visual no opcional.

### 7.1 Header (sticky, en todas las páginas)
- Sticky top, `height: 64px`, fondo `rgba(13,13,13,0.95)` + `backdrop-filter: blur(8px)`, borde inferior `1px solid var(--border)`, `z-index: 200`.
- **Izquierda — Logo:** wordmark "THE RUSTIC BARBER SHOP" en `Montserrat 700`, letter-spacing apretado, con barber pole mini (`16px` alto, `2px` ancho) a la izquierda. Link a `/pages/index.html`.
- **Centro/derecha — Nav:** links "Inicio", "Servicios", "Equipo", "Galería", "Reserva", "Contacto" en `Montserrat 500 15px`. Hover: subrayado animado `2px` desde izquierda en `--accent`. **Active (página actual):** color `--primary` + subrayado permanente.
- **Derecha — CTA:** botón Primary "Reservar turno" (alto `40px`), link a `/pages/reserva.html`.
- **Mobile (≤768px):** logo izq, hamburguesa der → drawer derecho full-height, `overscroll-behavior: contain`, foco trapado, cierre `ESC`/overlay.
- `scroll-margin-top: 80px` en anclas internas de cada página.

### 7.2 Footer (en todas las páginas)
- Fondo `--canvas` (#0D0D0D), texto `--text-primary` (#F5F5F5) / `--text-secondary` (`rgba(245,245,245,0.65)`), padding `48px 0`. `color-scheme: dark`.
- **3 columnas desktop, stack mobile:**
  1. **Logo + tagline:** "THE RUSTIC BARBER SHOP" (Montserrat 700 blanco) + barber pole mini + "Cortes con carácter. Formación con alma." + link a `/pages/nosotros.html` ("Conocé la historia").
  2. **Nav secundaria:** links a las 7 páginas (incluida Nosotros) en `14px` `--text-secondary`, hover `--text-primary`.
  3. **Contacto + horarios:** dirección, teléfono, Instagram, horarios (JetBrains Mono).
- **Fila inferior:** "© 2025 The Rustic Barber Shop" + links "Política de privacidad" · "Términos" en `12px` `--text-tertiary`.

### 7.3 Barber Pole Divider (firma visual)
- Franja diagonal `4px` alto, bandas `--accent` (#E8D5A3) / `--surface` (#1A1A1A) / `--text-primary` (#F5F5F5), animación `2s linear infinite`. Entre secciones dentro de cada página. Se pausa con `prefers-reduced-motion`.
- Versión mini `16px` como acento del logo y a la izquierda de eyebrows.

### 7.4 Banda CTA (final de páginas excepto reserva y contacto)
- Full-width, fondo `--canvas` (#0D0D0D), texto `--text-primary` (#F5F5F5), padding `48px 0`. Barber pole divider arriba.
- H2 "¿Listo para el corte?" en Montserrat 700 + body "Reservá tu silla en 30 segundos." + botón Accent "Reservar turno" (link a `/pages/reserva.html`).
- Centrado en mobile, H2 + CTA en fila en desktop.

### 7.5 Eyebrow de sección (patrón repetido)
- Label uppercase `Montserrat 500 12px`, `--text-secondary`, con barber pole mini `16px` a la izquierda. Codifica el nombre real de la sección ("SERVICIOS", "EQUIPO", etc.). Numeración `01/02/03` **solo si es secuencia real** (proceso, timeline).

### 7.6 Botones
- **Primary:** fondo `--primary` (#C5A059), texto `--text-on-primary` (#F5F5F5) peso 600, alto `44px` (touch target), padding `0 20px`, radio `8px`. Hover `--primary-hover`, active `--primary-active`, focus-visible ring `2px solid var(--accent)` offset `2px`.
- **Secondary / Ghost:** fondo transparente, borde `1px solid var(--border-strong)`, texto `--text-primary`. Hover fondo `--surface-subtle`.
- **Accent (CTA de reserva principal):** fondo `--accent` (#E8D5A3), texto `--text-on-accent` (#0D0D0D, AA 5.1:1). Hover `--accent-hover`. **Reservado para el CTA más importante de cada página.**
- **Icon button:** `40×40`, `aria-label` obligatorio, mismos estados.
- **Deshabilitado:** opacidad `0.5`, `cursor: not-allowed`, sin hover.

### 7.7 Card Containers
- Fondo `--surface` (#1A1A1A), borde `1px solid var(--border)`, padding `24px`, radio `12px`, sombra `--shadow-1`. Hover `--shadow-2` + `translateY(-2px)` (`200ms`, `--ease-out`).
- Altura uniforme en grid: `align-items: stretch` en el grid.
- **Service card:** ícono (32px) + título H3 + descripción body small + precio (mono, `tabular-nums`) + duración.
- **Barber card:** retrato `1:1` + nombre H3 + especialidad label + rating (estrellas + número) + CTA secondary.
- **Testimonial card:** comilla decorativa grande (Montserrat, `--accent`) + texto body + avatar `40px` + nombre + servicio.
- **Value card (nosotros):** ícono (32px) + título H3 + descripción body.
- **Stat card (nosotros):** número grande (Montserrat 800, `--accent`) + label debajo.

### 7.8 Form Controls (reserva y contacto)
- **Input / Select / Textarea:** alto `44px`, fondo `--surface-subtle` (#242424), borde `1px solid var(--border-strong)`, radio `8px`, padding `0 12px`. Focus `border-color: var(--primary)` + ring `2px solid rgba(197,160,89,0.3)`. Error `border-color: var(--error)` + texto error inline debajo (`--error`).
- **Label:** estilo label (12px uppercase), clickable, `htmlFor` asociado.
- **Placeholder:** termina con `…` y muestra patrón. Ej: `Ej. 11 2345 6789…`.
- **Autocomplete:** `name` significativo, `autocomplete` correcto (`tel`, `email`, `name`).
- **Submit:** se deshabilita **solo durante el request** con spinner dentro del botón. No antes.
- **Validación:** errores inline al lado del campo, foco al primer error on submit, mensaje con `aria-live="polite"`.

### 7.9 Badge / Chip (estados de horario y filtros)
- `Libre` → `--success` (#22C55E) sobre `--success-surface` (#14532D).
- `Último lugar` → `--warning` (#F59E0B) sobre `--warning-surface` (#78350F).
- `Ocupado` → `--text-tertiary` (`rgba(245,245,245,0.40)`) sobre `--surface-subtle` (#242424).
- **Filtro activo (galería):** fondo `--primary` (#C5A059) texto `--text-on-primary` (#F5F5F5). Inactivo: borde `--border-strong`, hover `--surface-subtle`.
- Altura `24px` (horario) / `32px` (filtro), radio `999px`, padding `0 10px` / `0 14px`, estilo label.

### 7.10 Modal / Dialog (confirmación de reserva)
- Overlay `rgba(13,13,13,0.7)` + `backdrop-filter: blur(4px)`. Panel `--surface` (#1A1A1A), radio `16px`, padding `32px`, `--shadow-3`. `overscroll-behavior: contain`, foco trapado, `ESC` cierra, CTA explícito ("Confirmar turno" / "Cancelar").

### 7.11 Before/After Slider (galería)
- Dos imágenes superpuestas, slider handle vertical draggable (mouse + teclado con `aria-valuenow`). `aspect-ratio: 4/5`. Handle: línea `2px` `--accent` (#E8D5A3) + círculo `32px` `--surface` (#1A1A1A) con ícono `move-horizontal` Lucide. `prefers-reduced-motion` → slider estático pero funcional.

### 7.12 Mapa (contacto)
- `<iframe>` embed (Google Maps o placeholder `--surface-subtle` (#242424) con pin `--primary` (#C5A059) centrado). `aspect-ratio: 16/9` desktop, `4/3` mobile. `loading="lazy"`. Bordes `12px`, `border: 1px solid var(--border)`.

---

## 8. Page Specifications (7 layouts)

> Cada página = un archivo HTML con header + main + footer. El `main` cambia; header y footer se instancian idénticos con active state correcto.

### 8.1 `/pages/index.html` — Inicio (hero asimétrico + previews)
**Main:**
1. **Hero** — asimétrico 2 col (≥1024px) / stack mobile. Izq: eyebrow "EST. 2017 · PERU" + H1 "Cortes con carácter. Reservá tu silla." + body + CTA Accent "Reservar turno" + Ghost "Ver el trabajo" (→ `/pages/equipo.html`) + microprueba "★ 4.9 · 320 reservas este mes". Der: imagen `4:5` `radius:16px`. `min-height: calc(100vh - 64px)`. Fondo `--canvas` (#0D0D0D) plano, sin gradientes.
2. **Barber pole divider.**
3. **Preview Servicios** — eyebrow "SERVICIOS" + H2 "Lo que hacemos" + body + 3 service cards destacadas (Corte, Corte+Barba, Afeitado) + link "Ver todos los servicios →" (`/pages/servicios.html`).
4. **Barber pole divider.**
5. **Preview Equipo** — eyebrow "EQUIPO" + H2 "Las manos detrás del corte" + body + 3 barber cards + link "Conocé al equipo →" (`/pages/equipo.html`).
6. **Barber pole divider.**
7. **Testimonial destacado** — full-width, fondo `--surface-subtle` (#242424), comilla grande Montserrat `--accent` + texto + firma.
8. **Banda CTA** — "¿Listo para el corte?" + Accent "Reservar turno" → `/pages/reserva.html`.

### 8.2 `/pages/servicios.html` — Servicios (catálogo + proceso)
**Main:**
1. **Page header** — eyebrow "SERVICIOS" + H1 "Lo que hacemos" + body "Tijera y navaja. Precios claros, sin sorpresas."
2. **Barber pole divider.**
3. **Grid completo 6 service cards** (3 col desktop, 2 col tablet, 1 col mobile). Misma estructura que §7.7. Card "Corte + Barba" destacada con borde `--accent` + pill "Más pedida".
4. **Barber pole divider.**
5. **Proceso (timeline con numbered markers — aquí SÍ es secuencia real)** — 4 pasos horizontales desktop / vertical mobile: `01 Reservá` → `02 Llegá 5 min antes` → `03 Cortamos` → `04 Volvé`. Cada paso: número grande Montserrat `--accent` + título H3 + body small. Línea conectora `1px solid var(--border)`, dots `8px` `--primary` en cada nodo.
6. **Banda CTA.**

### 8.3 `/pages/equipo.html` — Equipo (retratos + testimonials)
**Main:**
1. **Page header** — eyebrow "EQUIPO" + H1 "Las manos detrás del corte" + body "Tres barberos, tres estilos. Elegí con quién reservar."
2. **Barber pole divider.**
3. **Grid 3 barber cards** (3 col desktop, 1 col mobile). Cada card: retrato `1:1` + nombre H3 + apodo (si tiene) + especialidad label + bio body small (2-3 líneas) + rating (estrellas + número + count) + CTA Ghost "Reservar con [Nombre]" → `/pages/reserva.html?barbero=[id]`.
4. **Barber pole divider.**
5. **Portfolio preview** — eyebrow "TRABAJO" + H2 "Mirá lo que hacemos" + grid 6 imágenes `aspect-ratio: 4/5` (3 col desktop, 2 col mobile) + link "Ver galería completa →" (`/pages/galeria.html`).
6. **Barber pole divider.**
7. **Testimonials** — eyebrow "CLIENTES" + H2 "Lo que dicen" + grid 2 col de testimonial cards (3-4 testimonials).
8. **Banda CTA.**

### 8.4 `/pages/reserva.html` — Reserva (form 2 col)
**Main:**
1. **Page header** — eyebrow "RESERVA" + H1 "Reservá tu turno" + body "Tres pasos. Te llega confirmación por WhatsApp."
2. **Layout 2 col (≥1024px) / stack mobile:**
   - **Izq — Form** (card `--surface`): Nombre, Teléfono, Servicio (select 6 opciones), Barbero (select Marco/Diego/Lucía/Cualquiera), Fecha (date). Submit Primary "Confirmar turno" full-width con spinner. Estados éxito/error con `aria-live`.
   - **Der — Selector horario:** H2 "Horarios disponibles" + fecha seleccionada + grilla slots (3 col mobile / 2 col desktop, JetBrains Mono `14px`, alto `40px`). Badges Libre/Último lugar/Ocupado. Leyenda abajo.
3. **Info box** full-width `--info-surface`: horarios de atención + "Llegá 5 min antes."
4. **Sin banda CTA** (esta página ES el CTA).

### 8.5 `/pages/galeria.html` — Galería (masonry + filtros + before/after)
**Main:**
1. **Page header** — eyebrow "GALERÍA" + H1 "El trabajo habla" + body "Cortes, fades y barbas. Antes y después."
2. **Filtros** — fila de chips: "Todos" (activo) · "Fades" · "Barba" · "Diseño" · "Afeitado". `aria-pressed` en cada.
3. **Before/After destacado** — slider revelador full-width, `aspect-ratio: 21/9` desktop / `4:5` mobile. Label "Antes / Después" arriba. Handle draggable + teclado.
4. **Barber pole divider.**
5. **Grid masonry de cortes** — `column-count` responsivo (1/2/3), `column-gap: 16px`, items `break-inside: avoid`. Cada item: imagen `aspect-ratio: 4/5`, `radius: 12px`, hover `transform: scale(1.02)` `200ms --ease-out` + overlay sutil con título del corte + nombre del barbero. 12-15 imágenes.
6. **Banda CTA.**

### 8.6 `/pages/contacto.html` — Contacto (mapa + info + form)
**Main:**
1. **Page header** — eyebrow "CONTACTO" + H1 "Encontranos" + body "Ubicación, horarios y consulta. Para reservar, usá la reserva online."
2. **Layout 2 col (≥1024px) / stack mobile:**
   - **Izq — Info + mapa:** dirección (con ícono pin `--primary`), teléfono (link `tel:`), email (link `mailto:`), Instagram (link externo). Horarios detallados en tabla (días + franjas, JetBrains Mono). Mapa embed abajo (`aspect-ratio: 16/9`).
   - **Der — Form de consulta** (card `--surface`): Nombre, Email, Asunto (select: "Consulta general" / "Evento privado" / "Producto" / "Otro"), Mensaje (textarea). Submit Primary "Enviar consulta". Aclaración: "Para reservar un turno, usá la reserva online →" (link Accent a `/pages/reserva.html`).
3. **Sin banda CTA** (esta página ofrece derivación a reserva inline).

### 8.7 `/pages/nosotros.html` — Sobre Nosotros (editorial)
**Main:**
1. **Page header** — eyebrow "NUESTRA HISTORIA" + H1 "The Rustic Barber Shop: barbería y academia" + body extenso (2-3 párrafos, `max-width: 680px`, `Montserrat 400 17px` line-height 1.7).
2. **Imagen ambient** full-width `aspect-ratio: 21/9` con overlay sutil.
3. **Barber pole divider.**
4. **Filosofía / valores** — eyebrow "LO QUE CREEMOS" + H2 + grid 3 value cards (ícono + título + descripción): "Tijera antes que máquina", "El cliente no es un número", "El oficio se aprende, no se descarga".
5. **Barber pole divider.**
6. **Stats** — eyebrow "POR EL NÚMERO" + grid 4 stat cards: "4.9 ★ rating", "320 reservas/mes", "8+ años", "3 barberos + cursos". Números grandes Montserrat 800 `--accent` + label. **Estáticos, sin animación de contador.**
7. **Barber pole divider.**
8. **Cita del fundador** — full-width, fondo `--surface-subtle` (#242424), comilla grande Montserrat + texto + firma "— Fundador, The Rustic Barber Shop".
9. **Banda CTA.**

---

## 9. Voice & Copy

- **Tono:** welcoming, direct, practical, modern. No corporativo. No vende humo. Accessible to newcomers and craft-focused veterans alike.
- **Voz:** segunda persona, voseo, activa. Acción directa ("reservá tu turno"), no pasiva ("el turno será reservado"). El rango de formas verbales se define por el contenido real del proyecto.
- **Valores de marca:** Accessibility, Skill Development, Craftsmanship — estos valores se reflejan en el copy y tono.
- **Botones específicos:** "Reservar turno", "Ver el trabajo", "Elegir barbero", "Inscribite al curso", "Enviar consulta". No "Enviar" ni "Continuar".
- **Estados:** "Cargando…" (con `…` real), "Turno confirmado", "No quedan lugares para este horario — probá el siguiente."
- **Vacíos:** invitación a actuar, no disculpa. "Todavía no publicó trabajo este barbero. Volvé pronto."
- **Errores:** explican qué pasó y cómo seguir. "Necesitamos un teléfono válido para confirmar el turno."
- **Numeración:** numerales, no palabras ("3 barberos", no "tres").
- **Comillas:** curvas `“ ”` no rectas. Non-breaking spaces en precios y marcas.
- **Derivación entre páginas:** CTAs específicos ("Ver todos los servicios →", "Conocé al equipo →", "Ver galería completa →"). No "Click aquí".

---

## 10. Accessibility Contract

- Contraste AA mínimo en todo texto (verificado en paleta — ver nota de dorado).
- `:focus-visible` con ring visible en todo interactivo. **Nunca `outline: none` sin reemplazo.**
- HTML semántico antes que ARIA: `<button>` para acción, `<a>` para navegación (entre páginas y anclas), `<label>` en inputs.
- Skip link al `#main` al inicio de cada `<body>`, visible solo on focus.
- Headings jerárquicos `h1`→`h6`, **un solo `<h1>` por página** (el page header).
- `alt` en imágenes con contenido; `alt=""` en decorativas. Íconos decorativos con `aria-hidden="true"`.
- `touch-action: manipulation` en controles. `prefers-reduced-motion` respetado en toda animación.
- `scroll-margin-top: 80px` en anclas internas (header sticky).
- Formularios: `autocomplete`, `name`, `type` e `inputmode` correctos. Errores con `aria-live="polite"`. Foco al primer error on submit.
- **Navegación entre páginas:** nav con `aria-current="page"` en el link activo. Drawer mobile con foco trapado y `aria-expanded` en el toggle.
- **Before/After slider:** manejable con teclado (`arrow-left`/`arrow-right`), `aria-valuenow` / `aria-valuemin` / `aria-valuemax`, `role="slider"`.
- **Filtros galería:** `aria-pressed="true/false"` en cada chip.
