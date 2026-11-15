# Development Guide — The Rustic Barber Shop

> **Propósito:** guía técnica para codificar el sitio desde cero a partir del cruce de **tres fuentes**: el archivo Figma (`FxlIL5bBqEC8u4aFaswGMB`, export de los layouts), el **proyecto Stitch live** (`1455616816792825881`, verificado por MCP el 2026-09-20 — fuente estructural viva) y `docs/DESIGN.md` (spec canónica). El prompt original (`docs/STITCH_PROMPT.md`) quedó como referencia histórica de intención.
>
> **Regla de autoridad:** cuando Stitch/Figma y `DESIGN.md` divergen, **gana `DESIGN.md`**. Stitch/Figma se usan como **referencia de estructura, capas, textos y medidas**; los tokens, accesibilidad y responsive se rigen por la spec, y la marca por `BUSINESS.md`. Las divergencias se documentan en §3 (visual) y §3.1 (animación).

---

## 1. Resumen de la inspección Figma

El archivo Figma contiene **6 layouts de nivel superior** (frames `Html → Body`, canvas base `1280px`). El proyecto **Stitch live agrega dos layouts que el export de Figma no trajo**: **Reserva** (`65d85d52`, §5.7) y la variante **"Equipo (Animado)"** (`2091d96d`, §3.1). **El único sin layout propio es Login** — se compone reutilizando componentes (card tipo Contacto).

| # | Node Figma | Página | Eyebrow / H1 | Alto canvas | Archivo destino |
|---|---|---|---|---|---|
| 1 | `#7:2` | Inicio | "EST. 2017 · PERU" → H1 "CORTES CON CARÁCTER. RESERVA TU SILLA." | 1254 | `index.html` *(vive en raíz, no en `pages/`)* |
| 2 | `#8:69` | Servicios | "SERVICIOS" → H1 "LO QUE HACEMOS" | 2513 | `pages/servicios.html` |
| 3 | `#8:299` | Equipo | "EQUIPO" → H1 "LAS MANOS DETRÁS DEL CORTE" | 3572 | `pages/equipo.html` |
| 4 | `#8:512` | Galería | "GALERÍA" → H1 "EL TRABAJO HABLA" | 2362 *(Stitch live: 2496)* | `pages/galeria.html` |
| 5 | `#8:1207` | Nosotros | H1 "THE RUSTIC BARBER SHOP: BARBERÍA Y ACADEMIA" | 3774 | `pages/nosotros.html` |
| 6 | `#32:9` | Contacto | H1 "CONTACTO" | 1724 | `pages/contacto.html` |
| 7 | `65d85d52` *(Stitch live)* | Reserva | sin eyebrown en Stitch → spec: eyebrow "RESERVA" + H1 "RESERVA TU TURNO" | 1248 | `pages/reserva.html` (§5.7) |
| — | *(sin diseño)* | Login | sin layout Stitch | — | `pages/login.html` (§5.8) |

> **Verificación Stitch↔Figma (MCP, 2026-09-20):** el proyecto Stitch live (`1455616816792825881`) es la fuente estructural viva. Diferencias respecto del export de Figma: **Reserva existe** (`65d85d52`), existe la variante **"Equipo (Animado)"** (`2091d96d`), y **Galería mide `2496`** (no `2362` — el Before/After usa `614px`, ver §3). Cinco layouts (Inicio, Servicios, Equipo, Nosotros, Contacto) coinciden en altura con Figma sin drift estructural.

Cada layout instancia los mismos componentes compartidos: **Header (TopAppBar)**, **Main**, **Footer** y el **Barber Pole Divider** (rectángulo gradiente de 4px). El orden de capas en Figma no es el orden DOM: el Nav aparece al final del tree pero es `position: sticky` en el render real. Reserva agrega una variante **vertical** del pole como columna decorativa entre form y horarios (§5.7).

---

## 2. Componentes compartidos (HTML5 semántico)

> Se instancian idénticos en todas las páginas. Solo cambia `aria-current="page"` en el nav activo.
>
> **Convención de rutas (links relativos):** los HTML viven en `pages/`; los enlaces entre páginas son relativos al propio archivo (`contacto.html`, `login.html`…) y los assets suben un nivel (`../styles/styles.css`, `../images/…`).
>
> **Excepción — `index.html` vive en la raíz:** usa **rutas root-relative** (`/reserva`, `/equipo`, `/servicios`…) y assets directos (`styles/styles.css`, `images/…`), alineado con las rewrites de `vercel.json` (`/servicios` → `/pages/servicios.html`). Desde `pages/*.html`, el inicio se enlaza como `../index.html` y el resto de links quedan relativos al propio archivo.

### 2.1 Header — `<header class="topbar">` (sticky, todas las páginas)

Medidas Figma (`EL-4ce87dff`): ancho `1280` fijo → fluido `max-width: 1200px`, `padding: 16px 24px`, `justify-content: space-between`, borde inferior `1px`, `z-index: 200`.

```html
<header class="topbar" role="banner">
  <div class="topbar__inner container">
    <a class="brand" href="index.html" aria-label="The Rustic Barber Shop — inicio">
      <span class="brand__pole" aria-hidden="true"></span>
      <span class="brand__wordmark">The&nbsp;Rustic&nbsp;Barber&nbsp;Shop</span>
    </a>

    <nav class="nav" aria-label="Navegación principal">
      <ul class="nav__list">
        <li><a class="nav__link" href="index.html"    aria-current="page">Inicio</a></li>
        <li><a class="nav__link" href="servicios.html">Servicios</a></li>
        <li><a class="nav__link" href="equipo.html"    >Equipo</a></li>
        <li><a class="nav__link" href="galeria.html"   >Galería</a></li>
        <li><a class="nav__link" href="reserva.html"   >Reserva</a></li>
        <li><a class="nav__link" href="contacto.html"  >Contacto</a></li>
      </ul>
    </nav>

    <a class="btn btn--primary topbar__cta" href="reserva.html">Reservar turno</a>

    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-drawer" aria-label="Abrir menú">
      <span aria-hidden="true"></span>
    </button>
  </div>
</header>
```

- Logo Figma: wordmark `THE RUSTIC BARBER SHOP` en Montserrat `700`. → escala a `clamp(16px, 2vw, 22px)` en el header real (letrero largo requiere fuente más pequeña para caber).
- Nav Figma: links `Montserrat 500 15px` `--text-primary`; hover subrayado animado `2px` en `--accent`; activo `--primary` + subrayado permanente.
- Mobile `≤768px`: hamburguesa → drawer derecho full-height, `overscroll-behavior: contain`, foco trapado, cierre `ESC`/overlay, `aria-expanded` en el toggle.

### 2.2 Footer — `<footer class="site-footer">` (todas las páginas)

Medidas Figma (`#7:23`, `#8:250`): `padding: 80px 40px 32px`, borde superior `4px`, 3 columnas.

```html
<footer class="site-footer" role="contentinfo">
  <div class="container site-footer__grid">
    <div class="site-footer__brand">
      <span class="brand__pole" aria-hidden="true"></span>
      <p class="site-footer__wordmark">The&nbsp;Rustic&nbsp;Barber&nbsp;Shop</p>
      <p class="site-footer__tagline">Cortes con carácter. Formación con alma.</p>
      <a class="site-footer__about" href="nosotros.html">Conoce la historia →</a>
    </div>
    <nav class="site-footer__nav" aria-label="Navegación secundaria">
      <ul>
        <li><a href="index.html">Inicio</a></li>
        <li><a href="servicios.html">Servicios</a></li>
        <li><a href="equipo.html">Equipo</a></li>
        <li><a href="galeria.html">Galería</a></li>
        <li><a href="reserva.html">Reserva</a></li>
        <li><a href="contacto.html">Contacto</a></li>
        <li><a href="nosotros.html">Nosotros</a></li>
        <li><a href="login.html">Ingresar</a></li>
      </ul>
    </nav>
    <address class="site-footer__contact">
      <p>Av. Siempreviva 742, Lima, Peru</p>
      <p><a href="tel:+51123456789">+51 1 234 5678</a></p>
      <p><a href="https://instagram.com/therusticbarbershop" rel="noopener noreferrer">@therusticbarbershop</a></p>
      <p class="site-footer__hours">Lun–Vie 09:00–20:00 · Sáb 10:00–18:00 · Dom cerrado</p>
    </address>
  </div>
  <div class="site-footer__legal container">
    <small>© 2025 The Rustic Barber Shop</small>
    <ul>
      <li><a href="#">Política de privacidad</a></li>
      <li><a href="#">Términos</a></li>
    </ul>
  </div>
</footer>
```

### 2.3 Barber Pole Divider (firma visual)

Figma (`#7:3`, `#8:308`, `#8:523`): rectángulo `4px` alto, full-width, gradiente lineal con bandas diagonales `--accent` / `--surface` / `--text-primary`, animación `2s linear infinite`. Se pausa con `prefers-reduced-motion`.

```html
<hr class="barber-pole" aria-hidden="true">
```

```css
.barber-pole {
  border: 0;
  height: 4px;
  width: 100%;
  background: repeating-linear-gradient(-45deg,
    var(--accent) 0 25%, var(--surface) 25% 51%, var(--text-primary) 51% 76%, var(--accent) 76% 100%);
  background-size: 200% 100%;
  animation: pole-flow 2s linear infinite;
}
@media (prefers-reduced-motion: reduce) { .barber-pole { animation: none; } }
```

### 2.4 Banda CTA (final de páginas, excepto reserva y contacto)

Figma (`#8:240` Servicios, `#8:385` Equipo, `#8:1282` Nosotros): full-width, fondo oscuro, H2 + body + botón.

```html
<aside class="cta-band" aria-labelledby="cta-title">
  <div class="container cta-band__inner">
    <div>
      <h2 class="cta-band__title" id="cta-title">¿Listo para el corte?</h2>
      <p class="cta-band__text">Reserva tu silla en 30 segundos.</p>
    </div>
    <a class="btn btn--accent" href="reserva.html">Reservar turno</a>
  </div>
</aside>
```

> **Sin `barber-pole` interno** (decisión de apply): la banda ya se separa por su fondo oscuro full-width; un divider interno no aportaba separación.

### 2.5 Botones

| Variante | Uso | Estilo (spec) |
|---|---|---|
| `.btn--primary` | acción principal (nav) | fondo `--primary`, texto `--text-on-primary`, `44px` alto, `8px` radio |
| `.btn--accent` | CTA reserva más importante | fondo `--accent`, texto `--text-on-accent` (oscuro AA) |
| `.btn--ghost` | secundaria ("Ver el trabajo") | transparente, borde `1px solid var(--border-strong)` |

Figma botón primary: `padding: 13px 32px`, `border-radius: 4px` → spec unifica a `44px` alto, `8px` radio, `padding: 0 20px`. Ghost: `padding: 12px 32px`, borde `1px`.

### 2.6 Eyebrow de sección

Figma (eyebrows "SERVICIOS", "EQUIPO", "GALERÍA", "PORTFOLIO", "RESEÑAS"): `JetBrains Mono 14px / weight 500 / letter-spacing 0.1em / UPPER`, color `--text-secondary`, con barber pole mini `16px` a la izquierda.

```html
<p class="eyebrow"><span class="eyebrow__pole" aria-hidden="true"></span>Servicios</p>
```

---

## 3. Reconciliación Stitch (Figma) vs DESIGN.md

Divergencias detectadas al cruzar capas/medidas/textos. **Decisión: sigue la columna "Aplicar".**

| Aspecto | Figma (Stitch) | DESIGN.md (canónica) | Aplicar | Nota |
|---|---|---|---|---|
| Fuente display | `Bebas Neue` 400/700/800/900 | `Montserrat` 700/800/900 | **Montserrat** | Stitch sustituyó la fuente del prompt. Las medidas (80px hero, 64px H2, 48px H3) aplican igual. |
| Primario (brass) | `#6F5300` (eyebrows/botones) y `#775A00` (footer stroke) — inconsistente | `--primary: #C5A059` | `#C5A059` | Doe Brown rico. Contraste 6.2:1 sobre #0D0D0D. Unifica a ese. |
| Fondo footer | `#EAE1D6` (crema claro) | `#0D0D0D` (oscuro) | `#0D0D0D` | Spec quiere footer oscuro unificado con canvas. Stitch lo dejó claro. |
| Fondo nav | `#FFF8F2` (blanco cálido opaco) | `rgba(13,13,13,0.95)` + `backdrop-filter: blur(8px)` | spec con blur | — |
| Links nav | Servicios, Barberos, Galería, **Productos**, **Blog**, Contacto | Inicio, Servicios, Equipo, Galería, Reserva, Contacto | spec | Stitch metió "Barberos"/"Productos"/"Blog" que no existen en el sitio. |
| Canvas | `#FAFAFA` | `#0D0D0D` | `#0D0D0D` | Spec actual: canvas oscuro unificado. |
| Anchos | `1280` / `1200` / `1152` fijos | `max-width: 1200px` fluido | fluido | Ver §7. |
| Alto hero | `705px` fijo | `min-height: calc(100vh - 64px)` | spec | — |
| Index | solo Hero | Hero + preview servicios + preview equipo + testimonial + banda CTA | spec | Stitch solo generó el hero de index; completar con §8.1 de DESIGN.md. |
| Texto footer © | "© 2024 Barbería Urbana" | "© 2025 The Rustic Barber Shop" | 2025 | — |
| **Reserva: layout propio** | *no exportado en Figma*; Stitch live `65d85d52` (1280×1248) | §8.4: form 2col + selector horario + info box | estructura Stitch + spec (§5.7) | El frame de Reserva no llegó al export de Figma. Estructura documentada en §5.7. |
| **Reserva: H1 / eyebrow** | "Asegura tu silla", sin eyebrow (Stitch) | eyebrow "RESERVA" + H1 "Reserva tu turno" (§8.4) | spec | Copy de Stitch descartado. |
| **Reserva: submit** | "Confirmar Reserva" en col. derecha, sin spinner (Stitch) | "Confirmar turno" en el form, full-width, con spinner (§8.4/§7.8) | spec | — |
| **Reserva: slots** | grilla `3col` fija; solo Libre/Ocupado tachado; **sin "Último lugar" ni leyenda** (Stitch) | **Libre / Último lugar / Ocupado** + leyenda (§7.9) | spec | — |
| **Reserva: info box** | dentro de la col. derecha, con tolerancia/cancelaciones (Stitch) | full-width `--info-surface`, "Llega 5 min antes." (§8.4) | spec | — |
| **Reserva: barber pole** | **vertical** de 4px entre form y horarios (Stitch) | no definido en spec | variante Stitch, decorativa (`aria-hidden`, solo `lg`) | Coherente con la firma §7.3; documentada en §5.7. |
| **Equipo (Animado)** | variante Stitch `2091d96d` (1280×3645) — reveal de carga, hover cards, overlay portfolio | §8.3 estructura; §4.5 motion | estructura del template §5.3 + animación por §3.1 | Intención de movimiento aprobada; medidas/easings crudos descartados. |
| **Before/After (galería)** | Figma `height: 480` → **Stitch live `614px`** | `aspect-ratio: 21/9` desktop / `4:5` mobile | spec | El `614` es reutilización de la medida ambient de Nosotros; **no** respetar altos fijos. |
| **Eyebrow Inicio** | "EST. 2019 · BUENOS AIRES" (Stitch/Figma legacy del prompt) | "EST. 2017 · PERU" (`BUSINESS.md`: Perú, fundada 2017) | **2017 · PERU** | Punto de marca; ya correcto en §1/§5.1. |
| **H1 Nosotros** | "Barbería de barrio, mentalidad de atelier" (Stitch live) | "The Rustic Barber Shop: barbería y academia" (§8.7) | spec | §7.1 quedó desactualizado — alineado en §7.1. |

---

### 3.1 Reconciliación de animación — variante Stitch "Equipo (Animado)"

La variante `2091d96d` del proyecto Stitch live es la **referencia de intención de movimiento** del sitio: reveal de carga escalonado, micro-interacciones hover y estados de cards. **La spec manda sobre los valores crudos** (durations, easings, propiedades).

| Patrón (Stitch animado) | Stitch (crudo) | Aplicar (spec §4.5) |
|---|---|---|
| Reveal de carga (cards/secciones) | `opacity` + `translateY(20px)` `0.7s`, delays `100/200/300ms`, `cubic-bezier(0.16,1,0.3,1)` | `--dur-scene` (`520ms`) base + stagger de `--dur-fast` (`120ms`), `--ease-out`. **Solo entrada al cargar**, sin scroll-triggers ni IntersectionObserver. |
| Nav underline | `width` `0.3s` hover | `transform: scaleX` (0→1), `--dur-base` (`200ms`), `--ease-out` |
| Card hover (barber/service/testimonial) | `translateY(-4px)` + shadow `0.3s` | `translateY(-2px)` + `--shadow-2`, `--dur-base`, `--ease-out` (§7.7) |
| Rating stars | `scale` + `filter: brightness` (pulso) | **solo** `transform: scale`, stagger `120ms`; sin `filter` |
| Portfolio: img + overlay | `scale(1.05)` `0.5s` + overlay `opacity` | `scale(1.02)` (§8.5), overlay `opacity`, `--dur-slow` (`320ms`) |
| Botones | `scale(.95)` + `brightness` `0.15–0.2s` | `transform: scale(.97)` + transición de colores, `--dur-fast` |
| Barber pole / pole mini | loop `background-position` `2s linear infinite` | **único loop persistente permitido** (firma); `animation: none` con reduced-motion (§7.3) |

**Reglas de aplicación:**
- Solo `transform` y `opacity` para UI; `background-position` y `filter` quedan **reservados al barber pole** como firma. **Nunca `transition: all`.**
- `prefers-reduced-motion: reduce` → reveals instantáneos (estado final `opacity: 1`, sin transform), escalas y translates anulados, pole pausado. La variante animada de Stitch ya implementa el patrón completo; **la variante base no** — adoptar la animada.
- Duraciones solo de la escala `120/200/320/520ms`; easings de los tokens `--ease-out` / `--ease-in-out`.

---

## 4. Variables CSS `:root` (tokens)

> Fuente canónica: `DESIGN.md` §4. Pegar en `/styles/styles.css`. Los valores crudos de Stitch se omiten deliberadamente (ver §3).

```css
:root {
  /* === Color · Dark Neutrales === */
  --canvas:           #0D0D0D;   /* base oscura (no #000000 — contraste 4.6:1 insuficiente) */
  --surface:          #1A1A1A;   /* tarjetas y módulos elevados */
  --surface-subtle:   #242424;   /* inputs, banners internos, placeholders */
  --border:           rgba(255, 255, 255, 0.08);
  --border-strong:    rgba(255, 255, 255, 0.14);

  /* === Color · Texto === */
  --text-primary:     #F5F5F5;
  --text-secondary:   rgba(245, 245, 245, 0.65);
  --text-tertiary:    rgba(245, 245, 245, 0.40);
  --text-on-primary:  #F5F5F5;
  --text-on-accent:   #0D0D0D;   /* 5.1:1 sobre --accent */

  /* === Color · Marca / Acento === */
  --primary:          #C5A059;   /* Doe Brown — AA 6.2:1 con #0D0D0D */
  --primary-hover:    #A8863A;
  --primary-active:   #8B6B30;
  --accent:           #E8D5A3;   /* Doe Brown light — AA 5.1:1 con #0D0D0D */
  --accent-hover:     #D4C08A;

  /* === Color · Semánticos (dark) === */
  --success:          #22C55E;  --success-surface: #14532D;
  --error:            #EF4444;  --error-surface:   #7F1D1D;
  --warning:          #F59E0B;  --warning-surface: #78350F;
  --info:             #3B82F6;  --info-surface:    #1E3A5F;

  /* === Tipografía · Familias === */
  --font-display: "Montserrat", system-ui, sans-serif;
  --font-body:    "Montserrat", system-ui, -apple-system, sans-serif;
  --font-mono:    "JetBrains Mono", ui-monospace, monospace;

  /* === Tipografía · Escala (clamp fluido) === */
  --fs-hero:    clamp(48px, 6vw, 88px);   /* Display 800 */
  --fs-h1:      clamp(32px, 4vw, 44px);   /* Display 700 */
  --fs-h2:     24px;
  --fs-h3:     18px;
  --fs-body:   16px;
  --fs-small:  14px;
  --fs-label:  12px;
  --fs-data:   16px;

  /* === Spacing (baseline 8px) === */
  --sp-xs:4px; --sp-sm:8px; --sp-md:16px; --sp-lg:24px;
  --sp-xl:32px; --sp-2xl:48px; --sp-3xl:64px; --sp-4xl:96px;

  /* === Layout === */
  --container-max: 1200px;
  --container-px: 16px;     /* 24px desde lg */
  --header-h: 64px;
  --section-gap: 48px;      /* 64px desde lg */

  /* === Radius === */
  --r-control: 8px;
  --r-card:    12px;
  --r-media:   16px;
  --r-pill:    999px;

  /* === Elevation === */
  --shadow-0: none;
  --shadow-1: 0 1px 2px rgba(0,0,0,0.30);
  --shadow-2: 0 1px 3px rgba(0,0,0,0.30), 0 8px 24px rgba(0,0,0,0.40);
  --shadow-3: 0 4px 8px rgba(0,0,0,0.40), 0 24px 48px rgba(0,0,0,0.50);

  /* === Motion === */
  --dur-fast: 120ms; --dur-base: 200ms; --dur-slow: 320ms; --dur-scene: 520ms;
  --ease-out: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* === Z-index === */
  --z-base:0; --z-sticky:100; --z-header:200;
  --z-popover:800; --z-modal:1000; --z-toast:1100;
}

/* Contenedor fluido — reemplaza los anchos fijos 1280/1200/1152 de Stitch */
.container {
  width: 100%;
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-px);
}
@media (min-width: 1024px) {
  :root { --container-px: 24px; --section-gap: 64px; }
}
```

Carga de fuentes (en cada `<head>`):

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet">
```

---

## 5. Desglose por layout

### 5.1 Layout 1 — Inicio (`index.html` en raíz, node `#7:2`)

**Estructura Figma:** `Body` → `Barber Pole Divider (y=97)` → `Main (y=101)` → `Footer` → `Nav TopAppBar`.

**Main Figma (`#7:4`):** `column`, `padding: 80px 0 0`, `gap: 80px`, `width: 1280`, `align-items: center`.
**Hero (`#7:5`):** `grid 12 cols`, `rows: 705px`, `gap: 24px`, `width: 1152`.

```html
<main id="main" class="page page--home">
  <!-- HERO asimétrico (links root-relative `/…` por vivir en raíz; vercel.json rewrites a /pages/*.html) -->
  <section class="hero" aria-labelledby="hero-title">
    <div class="container hero__grid">
      <div class="hero__content">
        <p class="eyebrow"><span class="eyebrow__pole" aria-hidden="true"></span>Est. 2017 · Peru</p>
        <h1 class="hero__title" id="hero-title">Cortes con carácter. Reserva tu silla.</h1>
        <p class="hero__lede">The Rustic Barber Shop: barbería y academia. Tijera, navaja y café. Reserva en 30 segundos.</p>
        <div class="hero__actions">
          <a class="btn btn--accent" href="/reserva">Reservar turno</a>
          <a class="btn btn--ghost"   href="/equipo">Ver el trabajo</a>
        </div>
        <p class="hero__proof" aria-label="Valoración">★ 4.9 · 320 reservas este mes</p>
      </div>
      <div class="hero__media">
        <img src="images/hero.jpg" alt="Cliente recibiendo un corte de pelo en The Rustic Barber Shop" width="672" height="705" fetchpriority="high">
      </div>
    </div>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <!-- Preview Servicios: mismo card markup que §5.2, solo 3 destacadas + link -->
  <section class="services container" aria-labelledby="services-title">
    <header class="section-head">…eyebrow "Servicios" + H2 "Lo que hacemos" + lede…</header>
    <ul class="services__grid" role="list"><!-- Corte Clásico · Corte + Barba (featured) · Afeitado Tradicional --></ul>
    <a class="link-arrow" href="/servicios">Ver todos los servicios →</a>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <!-- Preview Equipo: cards de §5.3 en versión corta (sin bio), CTA Ghost por barbero, onerror fallback a images/barber-cut.jpg -->
  <section class="barbers container" aria-labelledby="team-preview-title">
    <header class="section-head">…eyebrow "Equipo" + H2 "Las manos detrás del corte" + lede…</header>
    <ul class="barbers__grid" role="list">
      <li class="barber-card">
        <img class="barber-card__photo" src="images/marco.jpg" alt="Retrato de Marco, barbero especialista en fade y barba" width="400" height="400" loading="lazy"
             onerror="if(this.src!=='images/barber-cut.jpg'){this.src='images/barber-cut.jpg';this.alt='Imagen de respaldo del equipo de The Rustic Barber Shop';}">
        <div class="barber-card__body">
          <h3 class="barber-card__name">Marco</h3>
          <p class="barber-card__spec">Especialidad: Fade &amp; Barba</p>
          <p class="barber-card__rating" aria-label="Valoración 4.9 de 5"><span aria-hidden="true">★★★★★</span> 4.9/5</p>
          <a class="btn btn--ghost" href="/reserva?barbero=marco">Reservar con Marco</a>
        </div>
      </li>
      <!-- Diego (4.8/5, Tijera & Textura) · Lucía (5.0/5, Afeitado Tradicional) -->
    </ul>
    <a class="link-arrow" href="/equipo">Conoce al equipo →</a>
  </section>

  <!-- Testimonial destacado: full-width, fondo --surface-subtle. Fluye sin barber-pole entre barbers → testimonial (decisión: ese divider no aportaba separación y rompía la fluidez) -->
  <section class="testimonial-feature" aria-label="Testimonio destacado">
    <div class="container">
      <blockquote>
        <p>"Marco entiende exactamente lo que busco. El fade es siempre impecable."</p>
        <footer><cite>Javier S.</cite> · <span>Cliente recurrente</span></footer>
      </blockquote>
    </div>
  </section>

  <aside class="cta-band" aria-labelledby="home-cta">…(ver §2.4: "¿Listo para el corte?" + Accent a `/reserva`)…</aside>
</main>
```

> **Dividers en la home (decisión de apply):** quedan **2** `barber-pole`: entre hero y services, y entre services y barbers. No hay divider entre barbers → testimonial ni dentro del CTA band — la separación visual propia de esas secciones alcanza; el divider extra no aportaba y rompía la fluidez.

**Medidas → responsive:**
- Hero grid 12 col con `span 6` / `span 6` → `display:grid; grid-template-columns: 1fr;` en mobile, `repeat(2, 1fr)` desde `1024px`, `gap: 24px → 32px`.
- `rows: 705px` fijo → `min-height: calc(100vh - var(--header-h))` (spec).
- Body Figma `width: 448` fijo → `max-width: 448px` del lede.
- H1 Figma `80px` → `var(--fs-hero)` con `clamp`.

### 5.2 Layout 2 — Servicios (`pages/servicios.html`, node `#8:69`)

**Estructura:** `Main Content Canvas` → `Header Section` → `Services Grid Section` → `Process Section` → `CTA Section` → `Footer` → `Nav`.

**Page header (`#8:71`):** `padding: 80px 24px 64px`, `width: 1200`, eyebrow "SERVICIOS", H1 "LO QUE HACEMOS", body.
**Services Grid (`#8:78`):** `grid repeat(3, 1fr)`, `rows: 376.59px 323.80px`, `gap: 32px`, `width: 1152` → 6 cards (Corte Clásico, **Corte + Barba (destacada)**, Afeitado Tradicional, Coloración, Limpieza Facial, Corte Junior).
**Process (`#8:191`):** 4 pasos en fila (`EL-5e7e5f08`: `row`, `gap: 32px`), línea conectora `1px`, nodos numerados `01–04`.
**CTA (`#8:240`):** `padding: 64px 304px`, fondo `#343029`, H2 "¿LISTO PARA UN CAMBIO?" + botón "Reservar Turno Ahora".

```html
<main id="main" class="page page--services">
  <header class="page-header container">
    <p class="eyebrow"><span class="eyebrow__pole" aria-hidden="true"></span>Servicios</p>
    <h1>Lo que hacemos</h1>
    <p class="page-header__lede">Tijera y navaja. Precios claros, sin sorpresas.</p>
  </header>

  <hr class="barber-pole" aria-hidden="true">

  <section class="services container" aria-labelledby="services-title">
    <h2 class="visually-hidden" id="services-title">Catálogo de servicios</h2>
    <ul class="services__grid" role="list">
      <!-- card normal -->
      <li class="service-card">
        <span class="service-card__icon" aria-hidden="true"><!-- Lucide scissors --></span>
        <h3 class="service-card__title">Corte Clásico</h3>
        <p class="service-card__desc">Asesoramiento personalizado, lavado, corte a tijera o máquina y peinado final.</p>
        <div class="service-card__meta">
          <span class="service-card__duration">45 min</span>
          <span class="service-card__price">S/ 15.00</span>
        </div>
      </li>
      <!-- card destacada -->
      <li class="service-card service-card--featured">
        <span class="service-card__pill" aria-label="Destacado">Más pedida</span>
        <h3>Corte + Barba</h3>
        <p>El ritual completo. Corte de cabello y perfilado de barba con toalla caliente y navaja.</p>
        <div class="service-card__meta"><span>75 min</span><span>S/ 25.00</span></div>
      </li>
      <!-- ... Afeitado Tradicional, Coloración, Limpieza Facial, Corte Junior -->
    </ul>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <section class="process container" aria-labelledby="process-title">
    <header class="section-head">
      <h2 id="process-title">El proceso urbano</h2>
      <p>Sin vueltas. Eficiencia y calidad en cuatro pasos.</p>
    </header>
    <ol class="process__steps">
      <li class="process__step"><span class="process__num" aria-hidden="true">01</span><h3>Reserva</h3><p>Elige servicio, barbero y horario.</p></li>
      <li class="process__step"><span class="process__num" aria-hidden="true">02</span><h3>Llega</h3><p>Disfruta un café mientras esperas.</p></li>
      <li class="process__step"><span class="process__num" aria-hidden="true">03</span><h3>Cortamos</h3><p>Consultoría de imagen y ejecución precisa.</p></li>
      <li class="process__step"><span class="process__num" aria-hidden="true">04</span><h3>Vuelve</h3><p>Paga fácil y agenda la próxima visita.</p></li>
    </ol>
  </section>

  <aside class="cta-band" aria-labelledby="services-cta">…</aside>
</main>
```

**Medidas → responsive:**
- Grid `repeat(3,1fr)` fijo → `1col` mobile / `2col sm` / `3col lg`, `gap: 24px`.
- Filas `376.59px 323.80px` fijas → `align-items: stretch` + `auto` rows.
- Process `row + gap 32px` → `grid-template-columns: repeat(4,1fr)` en `lg`, stack vertical en mobile.
- CTA `padding: 64px 304px` (gigante) → `padding: 48px 0` centrado.

### 5.3 Layout 3 — Equipo (`pages/equipo.html`, node `#8:299`)

**Estructura:** `Hero Section` → `Barber Cards Grid` (Marco/Diego/Lucía) → `CTA Band` → `Portfolio Preview Grid` (6 imgs) → `Testimonials` (2 cards) → `Footer` → `Nav`.

**Barber Cards Grid (`#8:309`):** `row`, `padding: 80px 0`, `gap: 32px`, `width: 1152`. Cada card (`EL-51f639b3`): `width: 362.67`, `border-radius: 8px`, retrato + nombre H2 (`style_63100c27`: display `48px/52.8px 700 UPPER`) + especialidad (mono `14px 0.05em`) + bio + 5 estrellas + rating "4.9/5".
**Portfolio Preview (`#8:396`):** `grid repeat(3,1fr)`, `rows: 373.34px 373.34px`, `gap: 16px`, 6 imágenes + link "Ver Galería Completa".
**Testimonials (`#8:413`):** 2 cards (`padding: 32px`), 5 estrellas + cita (Inter italic 18px) + nombre + rol + ícono.

```html
<main id="main" class="page page--team">
  <header class="page-header container">
    <p class="eyebrow">Equipo</p>
    <h1>Las manos detrás del corte</h1>
    <p class="page-header__lede">Tres barberos, tres estilos. Elige con quién reservar.</p>
  </header>

  <hr class="barber-pole" aria-hidden="true">

  <section class="barbers container" aria-labelledby="barbers-title">
    <h2 class="visually-hidden" id="barbers-title">Barberos</h2>
    <ul class="barbers__grid" role="list">
      <li class="barber-card">
        <img class="barber-card__photo" src="../images/marco.jpg" alt="Retrato de Marco, barbero especialista en fade y barba" width="362" height="328" loading="lazy">
        <div class="barber-card__body">
          <h3 class="barber-card__name">Marco</h3>
          <p class="barber-card__spec">Especialidad: Fade &amp; Barba</p>
          <p class="barber-card__bio">Más de 10 años perfeccionando la técnica del fade.</p>
          <p class="barber-card__rating" aria-label="Valoración 4.9 de 5"><span aria-hidden="true">★★★★★</span> 4.9/5</p>
          <a class="btn btn--ghost" href="reserva.html?barbero=marco">Reservar con Marco</a>
        </div>
      </li>
      <!-- Diego (4.8/5, Tijera & Textura) · Lucía (5.0/5, Afeitado Tradicional) -->
    </ul>
  </section>

  <aside class="cta-band">…</aside>

  <section class="portfolio-preview container" aria-labelledby="portfolio-title">
    <header class="section-head"><p class="eyebrow">Portfolio</p><h2 id="portfolio-title">Nuestro trabajo</h2></header>
    <ul class="portfolio-preview__grid" role="list"><!-- 6 <li><img alt="…"></li> --></ul>
    <a class="link-arrow" href="galeria.html">Ver galería completa →</a>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <section class="testimonials container" aria-labelledby="testi-title">
    <header class="section-head"><p class="eyebrow">Clientes</p><h2 id="testi-title">Lo que dicen</h2></header>
    <ul class="testimonials__grid" role="list">
      <li class="testimonial-card">
        <blockquote>“Marco entiende exactamente lo que busco. El fade es siempre impecable.”</blockquote>
        <figcaption><cite>Javier S.</cite> · <span>Cliente recurrente</span></figcaption>
      </li>
      <!-- Martín G. — afeitado con Lucía -->
    </ul>
  </section>

  <aside class="cta-band">…</aside>
</main>
```

**Medidas → responsive:**
- Barber grid `row gap 32px` fijo 3 col → `1col` mobile / `3col lg`.
- Card width `362.67` fija → `100%` fluida dentro de su columna.
- Portfolio grid `repeat(3,1fr) gap 16px` → `1/2/3` col.
- Testimonials `EL-5e7e5f08` row → `1col` mobile / `2col lg`.

> **Variante Stitch "Equipo (Animado)" (`2091d96d`, 1280×3645):** agrega el CTA "Reservar con [Nombre]" en cada card (ya presente en el template de arriba), eyebrows con doble pole mini, overlay con categoría/título en el portfolio (`opacity` al hover) y reveal de carga escalonado en cards. La reconciliación de movimiento con los tokens está en §3.1.

### 5.4 Layout 4 — Galería (`pages/galeria.html`, node `#8:512`)

**Estructura:** `Hero` → `Barber Pole` → `Before/After Highlight` → `Filters Section` (sticky) → `Masonry Grid` (6 items) → `CTA Band` → `Footer` → `Nav`.

**Before/After (`#8:524`):** card de alto fijo **`480` en Figma, `614` en Stitch live** (ver §3 — no respetar ninguno), dos imágenes superpuestas (`After` full + `Before` overlay `width: 575`), handle vertical `4px` `--accent` + círculo.
**Filters (`#8:597`):** `sticky`, `rgba(250,250,250,0.9)` + `backdrop-filter: blur(2px)`, chips "TODOS" (activo) · "FADES" · "BARBA" · "DISEÑO" · "AFEITADO".
**Masonry (`#8:540`):** 3 columnas absolutas (x=0/392/784), items `width: 362/368`, `border-radius: 12px`, overlay con etiqueta (FADES/BARBA/CLÁSICO/...) + título (Low Drop, Estructura, Executive, Tradicional, Geometría, Textura).

```html
<main id="main" class="page page--gallery">
  <header class="page-header container">
    <p class="eyebrow">Galería</p>
    <h1>El trabajo habla</h1>
    <p class="page-header__lede">Cortes, fades y barbas. Antes y después.</p>
  </header>

  <hr class="barber-pole" aria-hidden="true">

  <section class="before-after container" aria-labelledby="ba-title">
    <h2 id="ba-title">Transformación</h2>
    <p class="before-after__label">01 // Destacado</p>
    <div class="ba-slider" role="slider" tabindex="0" aria-label="Comparación antes y después"
         aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <img class="ba-slider__after" src="../images/after.jpg" alt="Resultado después del corte" width="1150" height="478" loading="lazy">
      <div class="ba-slider__before"><img src="../images/before.jpg" alt="Antes del corte" width="575" height="478" loading="lazy"></div>
      <span class="ba-slider__handle" aria-hidden="true"></span>
    </div>
  </section>

  <div class="filters" role="toolbar" aria-label="Filtros de galería">
    <div class="container filters__inner">
      <button class="chip" aria-pressed="true">Todos</button>
      <button class="chip" aria-pressed="false">Fades</button>
      <button class="chip" aria-pressed="false">Barba</button>
      <button class="chip" aria-pressed="false">Diseño</button>
      <button class="chip" aria-pressed="false">Afeitado</button>
    </div>
  </div>

  <section class="masonry container" aria-label="Galería de cortes">
    <figure class="masonry__item">
      <img src="../images/low-drop.jpg" alt="Corte Low Drop Fade de costado" width="368" height="auto" loading="lazy">
      <figcaption><span class="masonry__tag">Fades</span><span class="masonry__title">Low Drop</span></figcaption>
    </figure>
    <!-- 5 ítems más: Estructura (Barba), Executive (Clásico), Tradicional (Afeitado), Geometría (Diseño), Textura -->
  </section>

  <aside class="cta-band">…</aside>
</main>
```

**Medidas → responsive:**
- Before/After alto fijo (480 Figma / 614 Stitch — **ambos descartados**) → `aspect-ratio: 21/9` desktop / `4/5` mobile (spec).
- Masonry posiciones absolutas (x=0/392/784) → **NO replicar**: usar `column-count: 1/2/3` con `column-gap: 16px` e `break-inside: avoid`.
- Filtros sticky → `position: sticky; top: var(--header-h)`.

### 5.5 Layout 5 — Nosotros (`pages/nosotros.html`, node `#8:1207`)

**Estructura:** `Main` (`column`, `gap: 72px`) → `Hero/H1` → `Ambient Image Full Width` (`height: 614`) → `Narrative Text` (3 párrafos, `width: 760`) → `Value Cards` (3: La Tijera / El Cliente / El Oficio) → `Stats Grid` (4 stats, fondo `#F4F4F5`) → `Founder Quote` (grid 12, retrato + blockquote) → `CTA Band` → `Footer`.

**Stats (`#8:1248`):** `4.9` rating · `+300` reservas mensuales · `5` años · `3` barberos maestros. Números en display `64px` (style_88ef7491), labels en mono `14px` UPPER.
**Founder Quote (`#8:1270`):** grid 12 cols, retrato `gridColumn 1/span 5`, cita `gridColumn 7/span 6`, firma "— MARTÍN SILVA, FUNDADOR".

```html
<main id="main" class="page page--about">
  <section class="editorial-hero container">
    <h1>The Rustic Barber Shop: barbería y academia</h1>
  </section>

  <figure class="ambient">
    <img src="../images/ambient.jpg" alt="Interior de The Rustic Barber Shop con sillones y estaciones de trabajo" width="1280" height="614" loading="lazy">
  </figure>

  <hr class="barber-pole" aria-hidden="true">

  <article class="narrative container">
    <p>En The Rustic Barber Shop no solo cortamos el pelo; esculpimos la identidad de cada cliente con precisión técnica y respeto por el oficio…</p>
    <p>Nuestro equipo está formado por profesionales meticulosos, obsesionados con los detalles. También formamos a las nuevas generaciones a través de nuestros cursos de barbería…</p>
    <p>No creemos en la rapidez desmedida ni en los estilos genéricos…</p>
  </article>

  <section class="values container" aria-labelledby="values-title">
    <header class="section-head"><p class="eyebrow">Lo que creemos</p><h2 id="values-title">Nuestros valores</h2></header>
    <ul class="values__grid" role="list">
      <li class="value-card"><span class="value-card__icon" aria-hidden="true"><!-- tijera --></span><h3>La tijera</h3><p>Precisión quirúrgica en cada movimiento…</p></li>
      <li class="value-card"><h3>El cliente</h3><p>Asesoramiento personalizado…</p></li>
      <li class="value-card"><h3>El oficio</h3><p>Respeto absoluto por la tradición y la formación…</p></li>
    </ul>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <section class="stats" aria-labelledby="stats-title">
    <h2 class="visually-hidden" id="stats-title">Números de la barbería</h2>
    <ul class="stats__grid container" role="list">
      <li><span class="stats__num">4.9</span><span class="stats__label">Rating promedio</span></li>
      <li><span class="stats__num">+300</span><span class="stats__label">Reservas mensuales</span></li>
      <li><span class="stats__num">8+</span><span class="stats__label">Años de excelencia</span></li>
      <li><span class="stats__num">3</span><span class="stats__label">Barberos + cursos</span></li>
    </ul>
  </section>

  <hr class="barber-pole" aria-hidden="true">

  <figure class="founder-quote container">
    <div class="founder-quote__media"><img src="../images/founder.jpg" alt="Fundador de The Rustic Barber Shop" width="448" height="621" loading="lazy"></div>
    <blockquote class="founder-quote__text">
      <p>"La disciplina estética no es vanidad; es una forma de respeto hacia uno mismo y hacia los demás."</p>
      <footer><cite>— Fundador, The Rustic Barber Shop</cite></footer>
    </blockquote>
  </figure>

  <aside class="cta-band">…</aside>
</main>
```

**Medidas → responsive:**
- Ambient `height: 614` fija → `aspect-ratio: 21/9`.
- Narrative `width: 760` fija → `max-width: 680px` (spec) para legibilidad.
- Value cards `row gap 24px` → `1col` mobile / `3col lg`.
- Stats `row gap 24px` → `grid 2col sm / 4col lg`. **Estáticos, sin animación de contador** (spec).
- Founder quote grid 12 (`1/span 5` + `7/span 6`) → stack mobile, `2col` en `lg`.

### 5.6 Layout 6 — Contacto (`pages/contacto.html`, node `#32:9`)

**Estructura Figma:** `Main Content` (`padding: 80px 24px`, `gap: 64px`) → H1 "CONTACTO" + pole → fila de 2 columnas (`gap: 64px`, `align-items: flex-end`) → `Footer` → `Nav`.

**Columna izquierda — Info & Map (`#32:17`, `gap: 48px`):**
- Contact info: H2 "Estamos Aquí" (`style_d5c8327f`: display `48px/52.8px 400 UPPER`) + 4 filas ícono + label + valor: Dirección (Av. Siempreviva 742, Springfield, CP 12345), Teléfono (+54 11 5555-4444), Email (info@barberiaurbana.com), Instagram (@barberiaurbana en `--primary`).
- Hours card: fondo `--surface`, borde `--border`, radio `8px`, `padding: ~32px`: H2 "Horarios" + filas día/franja (Lun–Vie 09:00–20:00 · Sáb 10:00–18:00 · Dom Cerrado en `--primary`).
- Map embed: `height: 256` fija, fondo `--surface-subtle` con imagen placeholder.
- ⚠️ **Conversión obligada:** Stitch renderiza los horarios como filas de lista (`EL-db856a99`). Se codifica como `<table>` semántico (`table`/`tr`/`th`/`td`) según `DESIGN.md` §8.6.

**Columna derecha — Form (`#32:74`):** card formulario (radio `12px`, `--shadow-1`): H2 "Escríbenos" + párrafo con link a reserva + campos Nombre Completo, Correo Electrónico, Asunto (select), Mensaje (textarea) + botón "Enviar Mensaje" full-width.

```html
<main id="main" class="page page--contact">
  <header class="page-header container">
    <h1>Contacto</h1>
    <hr class="barber-pole" aria-hidden="true">
  </header>

  <div class="container contact__grid">
    <div class="contact__info">
      <section aria-labelledby="info-title">
        <h2 id="info-title">Estamos aquí</h2>
        <address class="contact-list">
          <p><span aria-hidden="true"><!-- pin --></span> <strong>Dirección</strong><br>Av. Siempreviva 742, Lima, Peru</p>
          <p><span aria-hidden="true"><!-- phone --></span> <strong>Teléfono</strong><br><a href="tel:+51123456789">+51 1 234 5678</a></p>
          <p><span aria-hidden="true"><!-- mail --></span> <strong>Email</strong><br><a href="mailto:info@therusticbarbershop.com">info@therusticbarbershop.com</a></p>
          <p><span aria-hidden="true"><!-- instagram --></span> <strong>Instagram</strong><br><a href="https://instagram.com/therusticbarbershop" rel="noopener noreferrer">@therusticbarbershop</a></p>
        </address>
      </section>

      <section class="hours-card" aria-labelledby="hours-title">
        <h2 id="hours-title">Horarios</h2>
        <table class="hours-table">
          <caption class="visually-hidden">Horarios de atención de The Rustic Barber Shop</caption>
          <thead>
            <tr><th scope="col">Día</th><th scope="col">Horario</th></tr>
          </thead>
          <tbody>
            <tr><th scope="row">Lunes – Viernes</th><td>09:00 – 20:00</td></tr>
            <tr><th scope="row">Sábados</th><td>10:00 – 18:00</td></tr>
            <tr><th scope="row">Domingos</th><td>Cerrado</td></tr>
          </tbody>
        </table>
      </section>

      <figure class="map-embed">
        <iframe src="https://www.google.com/maps/embed?…" title="Mapa de ubicación de The Rustic Barber Shop" loading="lazy"></iframe>
      </figure>
    </div>

    <section class="contact-form-card" aria-labelledby="form-title">
      <h2 id="form-title">Escríbenos</h2>
      <p>¿Tienes alguna duda o consulta especial? Déjanos un mensaje. Si deseas agendar, usa la <a href="reserva.html">Plataforma de Reserva Online</a>.</p>
      <form action="#" method="post">
        <div class="field">
          <label for="name">Nombre completo</label>
          <input id="name" name="name" type="text" autocomplete="name" placeholder="Juan Pérez…">
        </div>
        <div class="field">
          <label for="email">Correo electrónico</label>
          <input id="email" name="email" type="email" autocomplete="email" placeholder="juan@ejemplo.com…">
        </div>
        <div class="field">
          <label for="subject">Asunto</label>
          <select id="subject" name="subject">
            <option value="" selected disabled>Selecciona un asunto…</option>
            <option value="general">Consulta general</option>
            <option value="evento">Evento privado</option>
            <option value="producto">Producto</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div class="field">
          <label for="message">Mensaje</label>
          <textarea id="message" name="message" rows="5" placeholder="¿En qué podemos ayudarte?…"></textarea>
        </div>
        <button class="btn btn--primary contact-form-card__submit" type="submit">Enviar mensaje</button>
      </form>
    </section>
  </div>
</main>
```

**Medidas → responsive:**
- Fila 2 col `gap: 64px` → stack mobile / `2col` desde `1024px`.
- Form card `padding: 47px 48px` → `24px` mobile.
- Map `height: 256` fija → `aspect-ratio: 16/9` desktop / `4/3` mobile (spec).
- Tabla horarios en mono `14px` con `tabular-nums`; fila "Cerrado" en `--primary`.
- **Elementos semánticos clave:** tabla de horarios (`<table>` semántico) y formulario de contacto (`<form>` con campos `text`, `email`, `textarea` y botón `submit`).

### 5.7 Layout 7 — Reserva (`pages/reserva.html`, Stitch live `65d85d52`)

> El export de Figma `FxlIL5bBqEC8u4aFaswGMB` **no contiene** este layout; **existe en el proyecto Stitch live** (`65d85d52`, `1280×1248` — verificado MCP 2026-09-20). La estructura de abajo documenta el layout Stitch reconciliado con `DESIGN.md` §8.4 y `STITCH_PROMPT.md` PÁGINA 4 (ver §3).

**Estructura Stitch:** `TopAppBar` → `Page header` (H1 "Asegura tu silla", *sin* eyebrow) → `Grid 12 col` (form `span-7` · **barber pole vertical** `span-1` · horarios `span-4`) → `Info box` → `Footer` (`border-t-4` dorado). **Sin banda CTA** (esta página ES el CTA).

**Reconciliación aplicada (spec manda; Stitch = referencia):**
- **Page header:** eyebrow "RESERVA" + H1 "Reserva tu turno" + body "Tres pasos. Te llega confirmación por WhatsApp." *(Stitch: "Asegura tu silla" / "La puntualidad es nuestra firma." — descartados)*.
- **Col izq — Form** (card `--surface`, `--shadow-1`): Nombre, Teléfono (WhatsApp), Servicio (select **6 opciones** del catálogo §5.2), Barbero (Marco/Diego/Lucía/Cualquiera), Fecha + Submit Primary **"Confirmar turno"** full-width **con spinner** (§7.8). *(Stitch: labels `sr-only`, 4 servicios con precio, sin submit en el form — descartados)*.
- **Centro — barber pole vertical** `4px`, 3 bandas, loop `2s linear infinite`, decorativo (`aria-hidden`, `span-1`, **solo `lg`**). Variante vertical de la firma que Stitch introdujo; coherente con §7.3.
- **Col der — Selector horario:** H2 "Horarios disponibles" + sub-encabezado con la fecha seleccionada; grilla slots `JetBrains Mono` `14px` `tabular-nums`, alto `40px`, `3col` mobile / `2col` desktop; estados **Libre** (hover `--surface-subtle`, seleccionado `--primary`) · **Último lugar** (pill `--warning`) · **Ocupado** (`disabled` + `aria-disabled`, opacidad `0.4`); **leyenda** con 3 badges (§7.9). *(Stitch: `3col` fijo, sin "Último lugar", sin leyenda — descartados)*.
- **Info box** full-width `--info-surface`: horarios de atención + "Llega 5 min antes." *(Stitch: dentro de la col derecha con tolerancia/cancelaciones — descartado por §8.4)*.

```html
<main id="main" class="page page--booking">
  <header class="page-header container">
    <p class="eyebrow"><span class="eyebrow__pole" aria-hidden="true"></span>Reserva</p>
    <h1>Reserva tu turno</h1>
    <p class="page-header__lede">Tres pasos. Te llega confirmación por WhatsApp.</p>
  </header>

  <hr class="barber-pole" aria-hidden="true">

  <div class="booking__grid container">
    <section class="booking__form" aria-labelledby="booking-title">
      <h2 class="visually-hidden" id="booking-title">Formulario de reserva</h2>
      <form class="form-card" action="#" method="post">
        <div class="field"><label for="name">Tu nombre</label><input id="name" name="full_name" type="text" autocomplete="name" placeholder="Ej. Martín López…" required></div>
        <div class="field"><label for="phone">Teléfono (WhatsApp)</label><input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="Ej. 11 2345 6789…" required></div>
        <div class="field"><label for="service">Servicio</label><select id="service" name="service"><!-- 6 opciones del catálogo §5.2 --></select></div>
        <div class="field"><label for="barber">Barbero</label><select id="barber" name="barber"><option>Cualquiera</option><option>Marco</option><option>Diego</option><option>Lucía</option></select></div>
        <div class="field"><label for="date">Fecha</label><input id="date" name="date" type="date" required></div>
        <button class="btn btn--primary booking__submit" type="submit" data-loading="Cargando…">Confirmar turno</button>
      </form>
    </section>

    <span class="booking__pole" aria-hidden="true"></span>

    <aside class="booking__slots" aria-labelledby="slots-title">
      <h2 id="slots-title">Horarios disponibles</h2>
      <p class="booking__slots-date">— fecha seleccionada —</p>
      <div class="slots" role="group" aria-label="Horarios"><!-- slots Mono 14px 40px con badges §7.9 --></div>
      <p class="slots__legend"><!-- Libre · Último lugar · Ocupado --></p>
    </aside>
  </div>

  <div class="booking__info container" role="status"><!-- Lun–Vie · Sáb · Dom + "Llega 5 min antes." --></div>
</main>
```

**Medidas → responsive:**
- Grid 12 col (`7 / 1 / 4`) → stack mobile (form → slots → info); `2col` desde `1024px`, **pole oculto < `lg`** (`grid-template-columns: 7fr 5fr`; el pole vertical solo en `lg` con `1fr`).
- Form card `p-6 md:p-10` del Stitch → `padding: 24px` mobile / `32px` desktop, radio `--r-card`, `--shadow-1`.
- Slots: `3col` fijo de Stitch → `3col` mobile / `2col` desktop (spec §8.4), `gap: 8px`.
- Submit con spinner (`.is-loading`) y estados éxito/error vía `aria-live="polite"` (§7.8) — el `pages/reserva.js` orquesta los slots y la validación.

### 5.8 Página Login (`pages/login.html`) — sin diseño Figma

No existe layout de Stitch ni spec en `DESIGN.md` para esta página. Se compone reutilizando componentes existentes (card de formulario como la de Contacto, `.field`, `.btn`). Es demo sin backend: el submit no procesa credenciales.

```html
<main id="main" class="page page--login">
  <section class="login container" aria-labelledby="login-title">
    <div class="login__card">
      <h1 id="login-title">Ingresar</h1>
      <p class="login__lede">Accede para gestionar tus turnos.</p>
      <form action="#" method="post">
        <div class="field">
          <label for="username">Usuario</label>
          <input id="username" name="username" type="text" autocomplete="username" required>
        </div>
        <div class="field">
          <label for="password">Contraseña</label>
          <input id="password" name="password" type="password" autocomplete="current-password" required minlength="8">
        </div>
        <button class="btn btn--primary login__submit" type="submit">Iniciar sesión</button>
      </form>
      <p class="login__note">¿No tienes cuenta? <a href="contacto.html">Escríbenos</a>.</p>
    </div>
  </section>
</main>
```

Notas:
- Card centrada `max-width: 400px`, radio `var(--r-card)`, borde `1px solid var(--border)` + `--shadow-1`. Header/footer compartidos, sin banda CTA.
- El link "Ingresar" en nav y footer garantiza la navegación bidireccional entre todas las páginas del sitio.

---

## 5.9 Convención de organización CSS (`styles/styles.css`)

> **Regla:** cada bloque de CSS lleva un comentario de sección/página antes de sus reglas. Esto permite que cualquier dev encuentre rápido dónde colocar nuevos estilos sin pisar código de otra sección.

### Encabezados de sección (ya presentes)

Los encabezados grandes agrupan componentes compartidos y secciones existentes:

```css
/* ==========================================================================
   Services Section — .services, .service-card, .link-arrow
   ========================================================================== */
```

### Nuevas secciones de página

Cuando agregues CSS para una página que aún no tiene estilos (Galería, Nosotros, Contacto, Reserva), **coloca un encabezado reconocible antes de cada bloque de reglas**, identificando a qué página y sección pertenece:

```css
/* ==========================================================================
   Galería — .before-after, .ba-slider, .filters, .masonry
   ========================================================================== */

/* --- Before/After Slider --- */
.before-after { … }
.ba-slider { … }
.ba-slider__before { … }
.ba-slider__after { … }
.ba-slider__handle { … }

/* --- Filtros Sticky --- */
.filters { … }
.filters__inner { … }
.chip { … }
.chip[aria-pressed="true"] { … }

/* --- Masonry Grid --- */
.masonry { … }
.masonry__item { … }
.masonry__tag { … }
.masonry__title { … }
```

### Sub-comentarios dentro de una sección

Para agrupaciones lógicas dentro de una misma sección, usa sub-comentarios con la forma `/* --- Sub-sección --- */`:

```css
/* ==========================================================================
   Contacto — .contact__grid, .contact-form-card, .hours-table, .map-embed
   ========================================================================== */

/* --- Info de contacto y mapa --- */
.contact__info { … }
.contact-list { … }
.hours-card { … }
.hours-table { … }
.map-embed { … }

/* --- Formulario --- */
.contact-form-card { … }
.contact-form-card__submit { … }
```

### Dónde colocar CSS nuevo

| Página | Busca en `styles.css` | Inserta antes de |
|---|---|---|
| **Galería** | final de sección Team (línea ~910) | antes de `Featured Testimonial` |
| **Nosotros** | final de sección Testimonial (línea ~955) | antes de `CTA Band` |
| **Contacto** | final de sección CTA Band (línea ~990) | antes de `Site Footer` |
| **Reserva** | final de sección CTA Band (línea ~990) | antes de `Site Footer` |

### Convención de nombres (BEM)

- **Bloque:** nombre de la sección (`.services`, `.barbers`, `.masonry`)
- **Elemento:** doble guion bajo (`.service-card__title`, `.barber-card__photo`)
- **Modificador:** doble guion (`.service-card--featured`, `.btn--accent`)
- **Nunca** uses selectores anidados de 3+ niveles; la especificidad máxima es `.bloque__elemento`.

---

## 6. Reglas de maquetación responsiva

> Reemplazo sistemático de las **medidas fijas de Stitch** por **Flexbox/Grid fluido** con `max-width: 1200px`.

### 6.1 Anchors fijos → fluidos

| Medida Stitch (fija) | Regla fluida |
|---|---|
| `width: 1280` (body/page) | `max-width: var(--container-max)` + `margin-inline: auto` |
| `width: 1200` (page-header/hero) | `.container` (1200px) con padding lateral |
| `width: 1152` (grids internos) | `width: 100%` dentro de `.container` |
| `padding: 80px 40px` (secciones) | `padding-block: clamp(48px, 8vw, 80px); padding-inline: var(--container-px)` |
| `gap: 80px` entre secciones (Main) | `gap: var(--section-gap)` (48px→64px) |
| `rows: 705px` / `height: 480` / `614` | `min-height` o `aspect-ratio` |
| `width: 362/368` (cards) | `100%` dentro de columna grid |
| `width: 448/672/760` (texto) | `max-width` en px para legibilidad |

### 6.2 Breakpoints (mobile-first)

```css
/* mobile-first base */
.grid-3 { display: grid; grid-template-columns: 1fr; gap: 24px; }
@media (min-width: 640px)  { .grid-3 { grid-template-columns: repeat(2, 1fr); } } /* sm */
@media (min-width: 1024px) { .grid-3 { grid-template-columns: repeat(3, 1fr); } } /* lg */
```

Puntos: `640` (sm) · `768` (md) · `1024` (lg) · `1200` (xl) · `1440` (2xl, canvas Stitch).

### 6.3 Patrones por componente

- **Hero asimétrico:** `grid 1col` mobile → `grid 2col` en `1024px`; media con `aspect-ratio: 4/5` mobile y `auto` desktop.
- **Catálogo de servicios:** `grid 1→2→3` col; `align-items: stretch` para altura uniforme; card destacada con `border: 2px solid var(--accent)` + pill "Más pedida".
- **Process timeline:** `grid repeat(4,1fr)` desktop con línea conectora (`::before`); stack vertical mobile con línea a la izquierda.
- **Masonry galería:** `column-count` (1→2→3), `column-gap: 16px`, `break-inside: avoid` — **nunca** posiciones absolutas como Stitch.
- **Stats:** `grid 2col → 4col`, números en `clamp(40px, 6vw, 64px)` display.
- **Founder quote:** `grid 2col` con `grid-column` spans; stack mobile invirtiendo orden si hace falta.

---

## 7. White-Hat SEO

### 7.1 Jerarquía de encabezados (un solo `<h1>` por página)

| Página | `<h1>` | `<h2>` sección | `<h3>` cards |
|---|---|---|---|
| Inicio | "Cortes con carácter. Reserva tu silla." | "Lo que hacemos" / "Las manos detrás del corte" | títulos de service/barber card |
| Servicios | "Lo que hacemos" | "El proceso urbano" | título de cada service card + paso del proceso |
| Equipo | "Las manos detrás del corte" | "Nuestro trabajo" / "Lo que dicen los clientes" | nombre de cada barbero + testimonio |
| Galería | "El trabajo habla" | "Transformación" | título de cada ítem de galería |
| Nosotros | "The Rustic Barber Shop: barbería y academia" | "Nuestros valores" / "Números" | "La tijera" / "El cliente" / "El oficio" |
| Contacto | "Contacto" | "Estamos aquí" / "Horarios" / "Escríbenos" | — |
| Reserva | "Reserva tu turno" | "Horarios disponibles" | — |
| Ingresar (login) | "Ingresar" | — | — |

- **Un único `<h1>`** = el page header. Sin saltos de nivel (h1→h2→h3).
- Eyebrows son `<p class="eyebrow">`, **no** headings (evita inflar jerarquía).
- Números de proceso (`01..04`) van en `<span aria-hidden="true">`, no en headings.

### 7.2 Metadatos `<head>` por página

```html
<title>Cortes con carácter — The Rustic Barber Shop | Reserva tu turno</title>
<meta name="description" content="Barbería y academia de barbería en Peru. Cortes, fades, barba y cursos de barbería. Reserva tu turno online en 30 segundos.">
<link rel="canonical" href="https://therusticbarbershop.com/">
<meta property="og:title" content="The Rustic Barber Shop — Cortes con carácter">
<meta property="og:description" content="Barbería y academia. Cortes, fades, barba y cursos de barbería. Reserva tu silla en 30 segundos.">
<meta property="og:image" content="https://therusticbarbershop.com/og/hero.jpg">
<meta property="og:type" content="website">
<meta name="theme-color" content="#C5A059">
```

### 7.3 Imágenes (alt + performance)

- **`alt` descriptivo** en imágenes con contenido: `alt="Retrato de Marco, barbero especialista en fade y barba"`.
- **`alt=""`** en decorativas (barber pole, íconos) + `aria-hidden="true"`.
- `width`/`height` explícitos en todo `<img>` (evita CLS).
- Above-the-fold: `fetchpriority="high"`; below-the-fold: `loading="lazy"`.
- Nombres de archivo semánticos: `corte-fade-marco.jpg`, no `IMG_3421.jpg`.

### 7.4 Formularios (labels y autocomplete)

Cada control con `<label for>` asociado, `autocomplete` correcto y `inputmode`:

```html
<div class="field">
  <label for="phone">Teléfono</label>
  <input id="phone" name="phone" type="tel" autocomplete="tel" inputmode="tel" placeholder="Ej. 11 2345 6789…">
</div>
```

### 7.5 Datos estructurados (JSON-LD) — recomendado

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HairSalon",
  "name": "The Rustic Barber Shop",
  "image": "https://therusticbarbershop.com/og/hero.jpg",
  "address": { "@type": "PostalAddress", "streetAddress": "Av. Siempreviva 742", "addressLocality": "Lima", "addressCountry": "PE" },
  "telephone": "+51123456789",
  "priceRange": "$$",
  "openingHours": "Tu-Sa 10:00-20:00"
}
</script>
```

### 7.6 Convención de voz

El sitio usa **segunda persona, voseo, tono activo y directo** con los valores de marca: **Welcoming, Direct, Practical, Modern**. La forma exacta del voseo se rige por el contenido real del proyecto:

- **Regla:** el rango permitido de formas verbales es el que aparece en el texto actual de las páginas (`pages/*.html`) y las plantillas de COMPONENTES (`DEVELOPMENT.md` §2, §5).
- **Actualización reactiva:** cuando el texto del proyecto cambia (ediciones de copy, cambio de datos de contacto, nueva sección), el rango permitido se amplía automáticamente. Las nuevas formas inferidas del texto real **no son violaciones** del contrato.
- **Coexistencia:** el texto real puede mezclar voseo y tuteo. Ambas personas gramaticales están permitidas cuando aparecen en el contenido del proyecto.
- **Edición libre:** el texto del sitio es editable; la convención de voz se adapta, no se impone. No existe una lista cerrada de formas permitidas — el contrato se actualiza reactivamente con cada cambio de copy, dirección o teléfono.
- **Valores de marca:** Accessibility, Skill Development, Craftsmanship — el copy refleja estos valores especialmente en las secciones de servicios y academia.

---

## 8. Checklist de calidad y entrega

### Estructura
- [ ] `styles/styles.css` con `:root` de tokens (§4) linkeado desde todas las páginas.
- [ ] `index.html` (raíz), `pages/servicios.html`, `equipo.html`, `galeria.html`, `nosotros.html`, `contacto.html`, `reserva.html`, `login.html` creados.
- [ ] Componentes compartidos (header/footer/divider/banda CTA) idénticos en todas las páginas.
- [ ] `aria-current="page"` en el link de nav de cada página activa.

### Responsive
- [ ] Cero anchos fijos `1280/1200/1152`: todo fluido con `.container` `max-width: 1200px`.
- [ ] Cero altos fijos en hero/media: `min-height` o `aspect-ratio`.
- [ ] Masonry con `column-count`, **sin** posiciones absolutas.
- [ ] Breakpoints `640/768/1024/1200` verificados en DevTools.

### Tipografía y tokens
- [ ] Google Fonts: `Montserrat` + `JetBrains Mono` (no `Big Shoulders Display` ni `Bebas Neue`).
- [ ] `--primary: #C5A059` (no `#6F5300` de Stitch); `--canvas: #0D0D0D`, `--surface: #1A1A1A`.
- [ ] Precios/horarios en `JetBrains Mono` con `font-variant-numeric: tabular-nums`.
- [ ] Headings con `text-wrap: balance`; precios con `&nbsp;` (`S/ 15.00`).

### Accesibilidad
- [ ] Contraste AA en todo texto (verificar `--primary` #C5A059 sobre #0D0D0D = 6.2:1 ✓; `--accent` #E8D5A3 sobre #0D0D0D = 5.1:1 ✓).
- [ ] `:focus-visible` con ring visible; sin `outline: none` sin reemplazo.
- [ ] Skip link a `#main` al inicio de cada `<body>`.
- [ ] `prefers-reduced-motion` pausa el barber pole, el slider y los reveals de §3.1.
- [ ] Drawer mobile con foco trapado y `aria-expanded`.
- [ ] Before/After slider manejable con teclado (`arrow-left/right`, `role="slider"`).
- [ ] Filtros galería con `aria-pressed`.

### SEO
- [ ] Un solo `<h1>` por página; jerarquía sin saltos.
- [ ] `<title>`, `meta description`, `canonical`, Open Graph por página.
- [ ] `alt` en todo `<img>` con contenido; `alt=""` en decorativas.
- [ ] `width`/`height` en todo `<img>`; `loading="lazy"` below-the-fold.
- [ ] JSON-LD `HairSalon` en index y contacto.

### Performance
- [ ] Sin frameworks; HTML + CSS vanilla.
- [ ] Imágenes optimizadas (WebP/AVIF con `<picture>` fallback).
- [ ] Fuentes con `display=swap` y `preconnect`.

### Verificación de voz

La barbería es una entidad peruana (The Rustic Barber Shop): el contrato de voz se ancla en la identidad del negocio y en su texto real, no en listas prescriptivas ni etiquetas regionales.

- [ ] Contrastar la "Convención de voz" (§7.6) contra el texto real de `pages/*.html` y las plantillas de COMPONENTES (§2, §5) en cada entrega.
- [ ] El texto público del proyecto (ediciones de copy, palabras, direcciones, teléfonos) define y actualiza el contrato — la convención se adapta, no se impone.

### Cross-check con Figma
- [ ] Estructura de capas de cada layout coincide con §5 (secciones y orden).
- [ ] Textos de headings/eyebrows/CTA coinciden con los strings del Figma.
- [ ] Divergencias de §3 aplicadas según la columna "Aplicar" (Montserrat en lugar de Big Shoulders Display, colores dark en lugar de light).
