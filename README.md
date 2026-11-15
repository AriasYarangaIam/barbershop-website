# Montalvo For Men — Sitio web

Sitio web de **Montalvo For Men**, la red de barbería masculina del Grupo Montalvo: 45 sedes en Perú, catálogo de servicios, equipo de barberos, galería de trabajos y reserva de turnos.

Es un sitio **estático**: HTML, CSS y JavaScript sin frameworks, sin paso de build y **sin backend**. Toda la interactividad (drawer móvil, selector de horarios, comparador de imágenes, validación de formularios) ocurre en el navegador.

- **Dominio canónico** (declarado en los metadatos): `https://montalvoformen.com.pe`
- **Despliegue:** Vercel, con rutas limpias mediante `vercel.json` (ver *Despliegue*: el dominio oficial aún no sirve este proyecto)
- **Idioma del contenido público:** español (Perú)

---

## Stack

| Capa | Tecnología |
|---|---|
| Marcado | HTML5 semántico |
| Estilos | CSS puro con custom properties (`:root`) y BEM |
| Comportamiento | JavaScript vanilla, sin dependencias |
| Tipografía | Montserrat (display y cuerpo) + JetBrains Mono (datos, horarios, etiquetas) vía Google Fonts |
| Dependencias | Ninguna. No hay `package.json`, ni bundler, ni build step |

---

## Estructura del proyecto

```
.
├── index.html              Inicio (en la raíz, no en pages/)
├── pages/                  7 páginas internas
│   ├── servicios.html
│   ├── equipo.html
│   ├── galeria.html
│   ├── reserva.html
│   ├── contacto.html
│   ├── nosotros.html
│   └── login.html
├── styles/
│   └── styles.css          Hoja de estilos única del sitio
├── scripts/
│   ├── main.js             Drawer de navegación móvil
│   ├── reserva.js          Selector de horarios y modal de confirmación
│   ├── contacto.js         Validación del formulario de contacto
│   └── galeria.js          Comparador antes/después y filtros
├── images/
│   ├── hero.jpg
│   ├── barber-cut.jpg
│   └── galeria/            12 imágenes del catálogo de trabajos
└── vercel.json             Rewrites de rutas limpias
```

---

## Páginas

| Página | Archivo | Ruta publicada |
|---|---|---|
| Inicio | `index.html` | `/` |
| Servicios | `pages/servicios.html` | `/servicios` |
| Equipo | `pages/equipo.html` | `/equipo` |
| Galería | `pages/galeria.html` | `/galeria` |
| Reserva | `pages/reserva.html` | `/reserva` |
| Contacto | `pages/contacto.html` | `/contacto` |
| Nosotros | `pages/nosotros.html` | `/nosotros` |
| Ingresar | `pages/login.html` | `/login` |

Las rutas limpias (`/servicios`, `/reserva`, …) existen en producción gracias a los rewrites de `vercel.json`, que mapean cada una al HTML correspondiente dentro de `pages/`.

---

## Desarrollo local

No hay nada que instalar ni compilar. Pero **no abras los HTML con `file://`**: las páginas de `pages/` enlazan los assets con rutas absolutas (`/styles/styles.css`, `/scripts/main.js`), que el navegador resolvería contra la raíz del disco y no contra el proyecto.

### Opción A — servidor HTTP simple (sin dependencias)

```bash
python -m http.server 5500
```

Abre <http://localhost:5500/>.

> **Limitación:** este servidor no aplica los rewrites de `vercel.json`, así que los enlaces con ruta limpia (`/servicios`, `/reserva`, …) devuelven 404. Navega a las páginas internas por su archivo real: `http://localhost:5500/pages/reserva.html`. Los estilos, scripts e imágenes cargan correctamente.

### Opción B — réplica fiel del enrutado

```bash
npx vercel dev
```

Aplica los rewrites de `vercel.json`, por lo que las rutas limpias funcionan igual que en producción. Es la opción recomendada cuando el cambio toca navegación o enlaces.

### Opción C — Live Server (VS Code)

Extensión *Live Server* sobre la raíz del proyecto. Mismo comportamiento que la opción A.

---

## Despliegue

El sitio se despliega en **Vercel** como proyecto estático:

1. Importar el repositorio en Vercel.
2. No configurar comando de build ni directorio de salida: se publica la raíz del repositorio tal cual.
3. `vercel.json` aporta únicamente los rewrites de rutas limpias.

> **Estado del dominio:** los metadatos (`canonical`, Open Graph) apuntan a `https://montalvoformen.com.pe`, pero **ese dominio no sirve este proyecto**. Hoy responde con un sitio WordPress sobre PHP 8.5 alojado en Hostinger (`platform: hostinger`, `x-powered-by: PHP/8.5.12`). El despliegue de Vercel existe solo como destino previsto: mientras el DNS no apunte a Vercel, la URL pública seguirá mostrando el sitio anterior.

---

## Convenciones del código

### Rutas

- `index.html` vive en la raíz y enlaza assets de forma relativa (`styles/styles.css`, `images/…`).
- Las páginas de `pages/` usan rutas absolutas (`/styles/styles.css`, `/servicios`), coherentes con los rewrites de Vercel.

### CSS

- Los **tokens de diseño** viven en `:root` dentro de `styles/styles.css` (colores, tipografía, espaciado, radios, sombras, motion). No se modifican: toda pieza nueva los reutiliza.
- Nomenclatura **BEM**: `.bloque`, `.bloque__elemento`, `.bloque--modificador`. La especificidad máxima es `.bloque__elemento`.
- Cada sección lleva un banner de comentario antes de sus reglas:
  ```css
  /* ==========================================================================
     Galería — .before-after, .ba-slider, .filters, .masonry
     ========================================================================== */
  ```
- Movimiento: solo `transform` y `opacity` para la interfaz; duraciones de la escala `120 / 200 / 320 / 520 ms`. El barber pole es el único bucle persistente permitido.

### JavaScript

- Sin dependencias externas. `reserva.js`, `contacto.js` y `galeria.js` siguen el patrón IIFE con `'use strict'` y `var`; `main.js` usa `const` y arrow functions sobre `DOMContentLoaded`.
- Cada script se activa solo si su elemento existe (`if (!form) return;`, `if (slider)`), por lo que se puede incluir en cualquier página sin errores.

| Script | Responsabilidad |
|---|---|
| `main.js` | Drawer móvil: trampa de foco, cierre con `Escape` y overlay, `aria-expanded` |
| `reserva.js` | Franjas horarias según la fecha elegida y modal de confirmación accesible |
| `contacto.js` | Validación del formulario, error por campo, foco al primer error y `aria-live` |
| `galeria.js` | Comparador antes/después (ratón, tacto y teclado) y filtros por `aria-pressed` |

---

## Accesibilidad y SEO

Ya implementado en las 8 páginas:

- Skip link a `#main`, un solo `<h1>` por página y jerarquía sin saltos.
- Estados de foco visibles (`:focus-visible`) y contraste AA de los tokens de color.
- `prefers-reduced-motion`: pausa el barber pole y anula revelados, escalas y desplazamientos.
- Comparador de galería operable con teclado (`role="slider"`, flechas) y filtros con `aria-pressed`.
- `<title>`, `meta description`, `canonical` y Open Graph por página.
- Datos estructurados JSON-LD `HairSalon` en Inicio y Contacto.
- `width`/`height` en todas las imágenes, `loading="lazy"` bajo el pliegue y `fetchpriority="high"` en el hero.

---

## Alcance y limitaciones conocidas

Este proyecto se entrega como **sitio estático de cara al público**. Por decisión de alcance:

- **No hay backend.** La reserva y el formulario de contacto simulan el envío en el cliente; no se persiste nada ni se notifica a nadie. Los `TODO` de envío en `scripts/reserva.js` y `scripts/contacto.js` marcan dónde iría esa integración si algún día se decide agregarla.
- **El login es una demo visual**: no autentica ni gestiona sesiones.
- **Sin favicon**: el navegador registra un 404 en consola por `favicon.ico`.
- **Sin tests automatizados ni CI**: la verificación es manual (render en navegador).
- La verificación del modal de reserva se hizo en Chromium; falta el smoke test en Firefox y Safari.

---

## Documentación

El proyecto mantiene documentación de diseño, implementación y marca en `docs/`:

| Archivo | Contenido |
|---|---|
| `docs/DESIGN.md` | Sistema visual canónico: tokens, tipografía, componentes |
| `docs/DEVELOPMENT.md` | Guía de implementación por layout, responsive, SEO y checklist de entrega |
| `docs/BUSINESS.md` | Brand Book: historia, propósito, catálogo de servicios, sedes y métricas |
| `docs/MIGRATION.md` | Plan de migración de identidad a Montalvo For Men |
| `docs/STITCH_PROMPT.md` | Prompt original de diseño (referencia histórica) |

> La documentación **está versionada en el repositorio** dentro de `docs/`, por lo que llega con cada clon.
> Las bitácoras de trabajo por feature están en `odd/tasks/` (sí versionadas).
