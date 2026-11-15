# Especificación Maestra de Migración Web: Montalvo For Men

> **Propósito:** Guía técnica exhaustiva para ejecutar la migración de identidad, contenidos, metadatos SEO, datos estructurados (JSON-LD), catálogo de servicios, precios en Soles (S/), historia editorial y puntos de contacto hacia **Montalvo For Men** (división de barbería masculina del Grupo Montalvo).
>
> **Alcance exclusivo — Montalvo For Men:** [Montalvo Institute](https://montalvoinstitute.com) es un brazo aparte del Grupo Montalvo. Este plan lo menciona **solo como texto/narración de grupo** (bios, valores, métricas, historia) en los lugares donde el contenido del sitio lo cita. **No se construyen páginas, flujos, links ni entregables web propios de Montalvo Institute** en este sitio.
>
> **Destinatarios:** Modelos de lenguaje, agentes de código (Cursor, Copilot, Windsurf) y desarrolladores frontend.
> **Fecha de corte de datos:** 2026.
> **Versión:** 2 (Auditoría revalidada sobre el estado real del repositorio; corrige la matriz original, cuyo inventario estaba desactualizado).

---

## 1. Principios e Invariantes Técnicos (Reglas Inquebrantables)

1. **Intocabilidad de la Capa de Estilos (`styles/styles.css`):**
   * **PROHIBIDO** modificar los tokens visuales en `:root`: el lienzo oscuro `--canvas: #0D0D0D`, las superficies `--surface: #1A1A1A`, el acento dorado `--primary: #C5A059`, `--accent: #E8D5A3`, los radios, las sombras y la tipografía (`Montserrat` + `JetBrains Mono`) se conservan intactos. Esta estética *Dark Industrial* es 100% compatible con los salones físicos de Montalvo For Men.
   * Las clases utilitarias y componentes BEM (`.topbar`, `.barber-pole`, `.service-card`, `.barber-card`, `.ba-slider`, `.masonry`, `.field`, `.hours-table`, `.cta-band`, `.modal`, etc.) mantienen exactamente su nomenclatura y estructura.
   * Única excepción autorizada: **anexar** (nunca reescribir) los bloques BEM faltantes definidos en §6-A5, siguiendo la convención §5.9 de `DEVELOPMENT.md`.
2. **Intocabilidad del Enrutamiento (`vercel.json`):**
   * Se conservan las 7 reglas de *rewrite* hacia rutas limpias: `/contacto`, `/servicios`, `/equipo`, `/reserva`, `/galeria`, `/login` y `/nosotros` (verificadas en el repo actual).
3. **Intocabilidad de la Lógica Base (`scripts/main.js`):**
   * El controlador del menú drawer accesible (`trapFocus`, tecla `Escape`, control de atributo `hidden` y `aria-expanded`) permanece sin alteraciones.
4. **Erradicación Total de Entidades Previas:**
   * Ningún archivo del proyecto debe conservar cadenas asociadas a prototipos anteriores: cero menciones de *"The Rustic Barber Shop"*, *"Barbería Urbana"*, *"Av. Siempreviva 742"*, *"Springfield"*, *"Buenos Aires"*, *"Martín Silva"*, dominio `therusticbarbershop.com`, dominio `barberiaurbana.com` o teléfonos con código internacional `+54`.
5. **Menciones de Montalvo Institute (sin construcción web):**
   * El Institute aparece únicamente como texto en: historia (§4), narrativa de `/nosotros`, valores (`Formación que transforma`), bio de Marco en `/equipo`, y una opción de asunto del formulario de contacto. El copy de `/login` **no promete** un "campus virtual" (no existe destino web ni link; el login queda definido como acceso de clientes a gestión de citas).
6. **Cierra con banda CTA (según `DESIGN.md` §7.4):**
   * `index`, `servicios`, `equipo`, `galeria` y `nosotros` **terminan** con la banda CTA existente (`.cta-band`: "¿Listo para el corte?" + botón Accent "Reservar turno" → `/reserva`). `reserva` y `contacto` **no** la llevan (esa página es el CTA / deriva inline).

---

## 2. Auditoría Real del Repositorio y Matriz de Acciones

> **Inventario verificado contra el árbol actual** (corrige la versión 1, que declaraba vacíos archivos ya implementados). Los tamaños constan para contextualizar.

| Archivo del Proyecto | Estado Real Verificado | Trabajo de la Migración | Ruta |
|---|---|---|---|
| `index.html` (raíz) | Implementado con contenido legacy Rustic (`title`, canonical, OG, JSON-LD, marca, dirección y precios `S/ 12–25` antiguos) | Reemplazo de contenidos sobre estructura existente (A1) | A1 |
| `pages/servicios.html` | Implementado con catálogo legacy Rustic (6 servicios `S/ 10–35`, marca y OG antiguos) | Reemplazo de contenidos: catálogo oficial de 6 servicios `S/ 30–65` (A2) | A2 |
| `pages/equipo.html` | Implementado con bios/testimonios legacy Rustic | Reemplazo de contenidos: barberos, testimonios y preview reales (A3) | A3 |
| `pages/reserva.html` | Implementado; **el modal de confirmación accesible ya existe** (`#booking-modal` con `role="dialog"`, focus trap; ver ODD previo `odd/tasks/reserva-modal.md`) | Sustitución de selección de servicios y copy; **verificar** el modal, no rehacerlo (A4) | A4 |
| `pages/contacto.html` | Implementado con datos legacy (dirección/teléfono ficticios, Springfield) y Montserrat ya cargado correctamente | Reemplazo de datos de contacto, tabla de horarios, mapa y asuntos (A5) | A5 |
| `pages/login.html` | Implementado, legacy "Barbería Urbana": canonical `barberiaurbana.com`, OG muerto, **carga `Big Shoulders Display`** en el `<head>` | Reemplazo completo de `<head>` y copy; homologar fuentes y shell (A6) | A6 |
| `pages/nosotros.html` | **Vacío (0 bytes)** | Maquetar desde cero según §6-B1 (B1) | B1 |
| `pages/galeria.html` | **Vacío (0 bytes)** | Maquetar desde cero según §6-B2 (B2) | B2 |
| `styles/styles.css` (~50 KB) | Base + Home + páginas internas implementadas; ya contiene `.narrative`, `.founder-quote`, `.masonry`, `.ba-slider`, `.hours-table`, `.cta-band`, `.modal`, `.booking__*` | Verificar y **anexar solo**: `.chip`, `.values__grid`, `.stats__grid` (A5 §6-A5) | A5 |
| `scripts/main.js` | Implementado (drawer accesible) | **Intacto** | — |
| `scripts/reserva.js` (~9 KB) | Implementado (orquesta modal + slots) | Ajuste mínimo si el select de servicios cambia de ids/precios | A4 |
| `scripts/contacto.js` | **Vacío (0 bytes)** | Implementar validación accesible (B3) | B3 |
| `scripts/galeria.js` | **Vacío (0 bytes)** | Implementar slider + filtros (B4) | B4 |
| `docs/BUSINESS.md` | Desactualizado (datos de marca previa) | Reescribir como Brand Book de Montalvo For Men (C1) | C1 |
| Documentos ODD previos (`odd/tasks/*.md`) | Contacto, reserva-modal y servicios-page | Reconciliar al inicio: marcar completado lo ya ejecutado; la migración no reabre tareas cerradas salvo por el contenido de marca | Previo |

---

## 3. Diccionario Global de Tokens de Contenido (Fuente Única)

| Parámetro Global | Valor Oficial para Reemplazo | Código HTML / Sintaxis |
|---|---|---|
| **Nombre Comercial (Wordmark)** | Montalvo For Men | `Montalvo&nbsp;For&nbsp;Men` |
| **Aria-label del Logo** | Montalvo For Men — inicio | `aria-label="Montalvo For Men — inicio"` |
| **Título en Mobile Drawer** | Montalvo For Men | `<span class="mobile-drawer__title">Montalvo For Men</span>` |
| **Lema / Tagline Oficial** | Amenas charlas. Buenos servicios. Excelentes cortes. | Usado en footer y subtítulos institucionales |
| **Enlace Editorial en Footer** | Conoce la historia → | `<a class="site-footer__about" href="/nosotros">Conoce la historia →</a>` |
| **Sede Principal (Flagship Histórica)** | Av. Javier Prado Oeste 583, Magdalena del Mar, Lima | Dirección legal y cuna de la marca |
| **Sede Alternativa (Corporativa)** | Av. Jorge Chávez 301, Miraflores, Lima | Sede de alta afluencia y atención al cliente |
| **Central Telefónica Fija** | (01) 461 4464 | `<a href="tel:+5114614464">+51 1 461 4464</a>` |
| **WhatsApp Oficial de Reservas** | +51 945 036 190 / +51 932 824 708 | Formato display: `945 036 190` |
| **Email de Atención Corporativa** | telemarketing@montalvogroup.com.pe | `<a href="mailto:telemarketing@montalvogroup.com.pe">...</a>` |
| **Instagram Oficial** | @montalvoformen | `https://www.instagram.com/montalvoformen` |
| **Horario Unificado de Atención** | Lun–Vie 08:30–21:30 · Sáb 09:00–21:30 · Dom 10:00–20:00 | Para footer y tabla de horarios |
| **Copyright Legal** | &copy; 2026 Montalvo For Men · Grupo Montalvo | `<small>&copy; 2026 Montalvo For Men · Grupo Montalvo</small>` |
| **Dominio Canónico SEO** | https://montalvobarber.com.pe | Base para etiquetas canonical y Open Graph |
| **Métrica de sedes Institute (única)** | 16 sedes | Se usa **el mismo valor** en narrativa y stats de `/nosotros` (corrige la versión 1, que mezclaba "más de 15" con "16") |

---

## 4. Fondo Corporativo e Histórico (Respaldo para `pages/nosotros.html`)

### 4.1 Trayectoria de Víctor Hugo Montalvo Blas
* **Orígenes y Venta Ambulante:** Nacido en Huari (Áncash), el tercero de once hermanos. Migró a Lima a los 11 años. A los 20 años inició como vendedor ambulante de artículos plásticos en un triciclo por las calles de Magdalena del Mar, abriendo tras año y medio su primer puesto en el mercado distrital.
* **El tropiezo inicial (1994):** Frente a su tienda operaba una concurrida peluquería. Motivado por la rotación del negocio, abrió en 1994 su primer salón llamado **Vitto's** (o Vito's). Por inexperiencia técnica y administrativa, quebró en menos de un año. Mantuvo su comercio de plásticos como sostén económico.
* **El renacimiento y consolidación (2001–2002):** En 2001 viajó a una feria internacional de belleza en Santiago de Chile, adoptando una visión integral del cuidado personal. Al regresar abrió un segundo local en Jesús María y formalizó entre 2001 y 2002 la marca **Montalvo Salón & Spa**.
* **El Grupo Hoy:** Más de 30 años de trayectoria, 120 locales en total, 8 marcas hermanas y participación activa de sus hermanos como socios societarios.
* **Montalvo For Men:** Red exclusiva de salones y barberías masculinas con **45 sedes a nivel nacional**.
* **Montalvo Institute:** Brazo de educación técnica superior con **16 sedes en Perú** e internacionalización operativa en **Bogotá y Medellín (Colombia)** desde 2023. *(Mención de texto únicamente — sin entregable web.)*

---

## 5. Catálogo de Servicios y Tarifas Oficiales en Soles (S/)

Tarifas referenciales de mercado calibradas según declaraciones de la gerencia de marca ante la Cámara de Comercio de Lima (CCL) y convenios corporativos vigentes:

```
[Catálogo de Servicios Montalvo For Men]
├── 01. Corte Caballero (Básico) ───────────── S/ 35.00 (45 min)
├── 02. Corte + Ritual de Barba [Featured] ─── S/ 65.00 (75 min) [Más pedida]
├── 03. Ritual de Barba & Toalla Caliente ──── S/ 35.00 (30 min)
├── 04. Camuflaje de Canas & Color ─────────── S/ 55.00 (60 min)
├── 05. Limpieza Facial & Black Mask ───────── S/ 45.00 (45 min)
└── 06. Corte de Niños (Junior) ────────────── S/ 30.00 (30 min)
```

---

## 6. Especificación Detallada de Archivos

> **Organización del trabajo:** Bloque A (reemplazo de contenido sobre páginas existentes), Bloque B (construcción de páginas/scripts vacíos), Bloque C (documentación y verificación). Cada tarea es un commit del trabajo revisable en la rama de la feature.

### 6/Bloque A — Reemplazo de contenido sobre páginas existentes

#### A1. `index.html` (raíz)
* Estado: contenido legacy Rustic en `<head>`, marca, JSON-LD, hero, cards, testimonio y footer.
* **`<head>`:**
  * Title: `Montalvo For Men — Cortes con carácter | Reserva tu cita en Lima`
  * Meta description: `Montalvo For Men: la cadena líder de barberías en Perú con 45 sedes a nivel nacional. Cortes de caballero, fades, ritual de barba con toallas calientes y cuidado facial. Reserva online.`
  * Canonical: `https://montalvobarber.com.pe/` (reemplaza `therusticbarbershop.com` también en OG).
  * JSON-LD: Entidad `HairSalon`, nombre `Montalvo For Men`, dirección `Av. Javier Prado Oeste 583, Magdalena del Mar, Lima`, teléfono `+5114614464`, **priceRange `S/ 30.00 - S/ 65.00`** (rango real del catálogo; corrige `S/ 30 - S/ 70` de la versión 1).
* **Hero (`.hero`):**
  * Eyebrow: `Grupo Montalvo · 45 sedes en Perú`
  * H1: `Cortes con carácter. Reserva tu silla.`
  * Lede: `Montalvo For Men: nuevo concepto en barbería masculina y formación de talentos junto a Montalvo Institute. Tijera, navaja y bebida de cortesía. Reserva en 30 segundos.`
  * Proof: `★ 4.9 · 45 sedes a nivel nacional`
  * Conservar botones: Accent `Reservar turno` (→ `/reserva`) + Ghost `Ver el trabajo` (→ `/equipo`).
* **Preview Servicios (3 cards):**
  1. *Corte Caballero* (`45 min` · `S/ 35.00`)
  2. *Corte + Ritual de Barba* (`75 min` · `S/ 65.00`) [Destacada con pill `Más pedida`]
  3. *Ritual de Barba* (`30 min` · `S/ 35.00`)
* **Testimonio Destacado:**
  * Cita: `“El equipo es súper profesional, y no se trata solo de cortes de cabello, sino de toda una experiencia. Me ofrecieron una bebida mientras esperaba y, créanme, ¡esos detalles cuentan!”`
  * Autor: `Sebastián Alvarado` · `Cliente Montalvo For Men — Sede Lince`
* **Footer:**
  * **Topbar (nav primaria):** exactamente 6 enlaces (`Inicio`, `Servicios`, `Equipo`, `Galería`, `Reserva`, `Contacto`) con `aria-current="page"` dinámico.
  * **Footer (nav secundaria):** exactamente **8 enlaces** — según `DESIGN.md` §2.2 y `DEVELOPMENT.md` §2.2 (corrige los "6" de la versión 1): `Inicio`, `Servicios`, `Equipo`, `Galería`, `Reserva`, `Contacto`, `Nosotros`, `Ingresar`.
  * Enlace independiente a historia: `Conoce la historia →` apuntando a `/nosotros`.
  * Contacto + horarios (JetBrains Mono) + © 2026 Montalvo For Men · Grupo Montalvo.
* **Bandas:** conservar banda CTA final (§1.6). Los tres dividers barber pole internos se mantienen.

#### A2. `pages/servicios.html`
* Estado: catálogo legacy `S/ 10–35` y marca Rustic.
* **Page Header:** Eyebrow `SERVICIOS` · H1 `Lo que hacemos` · Lede: `Tijera, navaja y cuidado dermatológico masculino con las mejores marcas internacionales. Precios claros en soles.`
* **Grilla Completa de 6 Servicios (`.services__grid`):**
  1. **Corte Caballero:** Asesoramiento personalizado, lavado capilar, corte minucioso a tijera o máquina y peinado con productos profesionales. (`45 min` · `S/ 35.00`)
  2. **Corte + Ritual de Barba (Destacada):** Nuestro servicio insignia. Corte de caballero más ritual relajante de barba con toallas calientes, doble afeitado y acabado tipo spa. (`75 min` · `S/ 65.00`)
  3. **Ritual de Barba:** Recorte completo de barba, afeitado de contorno según líneas con toallas calientes, lavado y aplicación de aceite hidratante para barba y piel. (`30 min` · `S/ 35.00`)
  4. **Camuflaje de Canas & Color:** Coloración sutil para camuflar canas en cabello o barba sin efecto artificial, o tinte sin amoniaco ideal para cuero cabelludo sensible. (`60 min` · `S/ 55.00`)
  5. **Limpieza Facial & Black Mask:** Tratamiento facial purificante con mascarilla de carbón activado (*Black Mask*) que elimina impurezas y devuelve frescura al rostro. (`45 min` · `S/ 45.00`)
  6. **Corte de Niños (Junior):** Cortes y estilos específicos para la fisionomía de los niños con atención paciente y opción de diseños personalizados. (`30 min` · `S/ 30.00`)
* **Proceso en 4 Pasos (`.process__steps`):** `01 Reserva` (elige sede, servicio, barbero y horario online) → `02 Llega` (bebida de cortesía y buena música mientras esperas) → `03 Cortamos` (diagnóstico de imagen y ejecución con insumos premium) → `04 Vuelve` (paga con cualquier medio y agenda tu próxima visita).
* **Bandas:** terminar con banda CTA (§1.6).
* **Reemplazo de `<head>`:** same pattern que A1 (title, meta, canonical `/servicios`, OG).

#### A3. `pages/equipo.html`
* Estado: bios y testimonios legacy Rustic.
* **Page Header:** Eyebrow `EQUIPO` · H1 `Las manos detrás del corte` · Lede: `Un selecto grupo de profesionales formados en Montalvo Institute y comprometidos con tu estilo.`
* **Grilla de Barberos (3 cards con CTA Ghost → `reserva.html?barbero=[id]`):**
  1. **Marco:** Master Barber & Instructor. Especialidad: *Fade & Corte con Diseño*. Bio: *Más de 10 años perfeccionando técnicas de degradado y formador de nuevos talentos en Montalvo Institute.* Rating: `★★★★★ 4.9/5`.
  2. **Diego:** Senior Stylist. Especialidad: *Tijera, Textura & Barber Color*. Bio: *Especialista en estructura de corte clásico a tijera, camuflaje de canas y colorimetría masculina avanzada.* Rating: `★★★★★ 4.8/5`.
  3. **Lucía:** Especialista en Barbería Clásica & Cuidado Facial. Especialidad: *Ritual de Barba & Skin Care*. Bio: *Experta en el ritual de afeitado tradicional con toallas calientes, perfilado a navaja y aplicación de tratamientos Black Mask.* Rating: `★★★★★ 5.0/5`.
* **Preview de Portfolio:** grilla 6 imágenes `4:5` con placeholders existentes (ver §7) + link `Ver galería completa →` (→ `/galeria`).
* **Testimonios Reales Verificados:**
  1. `“Mi barbera entendió exactamente lo que buscaba. Su atención y habilidad para trabajar con las tijeras y la navaja son insuperables. El ambiente, la música y la atención al cliente hacen que esta sea la mejor barbería premium en la que he estado.”` — *Edinson Corina (Sede Garzón)*.
  2. `“La atención al cliente es de otro nivel. Desde el saludo cálido hasta el cuidado en cada paso del proceso, se nota que se esfuerzan por la excelencia.”` — *Fernando Alfaro (Sede Castilla)*.
* **Bandas:** terminar con banda CTA (§1.6).

#### A4. `pages/reserva.html` + `scripts/reserva.js`
* Estado: implementado; modal accesible **ya existe** (ODD `reserva-modal` previo). Trabajo: sustitución de contenido, no reingeneración.
* **Page Header:** Eyebrow `RESERVA` · H1 `Reserva tu turno` · Lede: `Amenas charlas y excelentes cortes. Agenda en tres pasos y recibe confirmación por WhatsApp.`
* **Formulario de Turnos:**
  * Input teléfono con placeholder local: `Ej. 945 036 190…`
  * Select `#service` con los 6 servicios oficiales en Soles (`S/ 30.00` → `S/ 65.00`). Si cambia los `value` del select, ajustar de forma coherente los ids/values esperados por `scripts/reserva.js` (solo el contrato necesario, sin refactor).
  * **Modal de Confirmación `#booking-modal`:** **Verificar** (no reescribir) que ya cumple `role="dialog"`, `aria-modal="true"`, focus trap, `Escape`, restauración de foco, botones "Volver al inicio" y "Cerrar".
* **Info Box (`.booking__info`):** `Atención en sedes: Lun–Vie 08:30–21:30 · Sáb 09:00–21:30 · Dom 10:00–20:00. Te esperamos 5 minutos antes de tu cita.`
* **Sin banda CTA** (esta página es el CTA).

#### A5. `pages/contacto.html`
* Estado: datos legacy (Springfield) y Montserrat ya correcto; sin drawer propio que synthesize con el estándar.
* **Metadatos y Shell:**
  * Title: `Contacto y sedes — Montalvo For Men | Lima, Perú`; Canonical `/contacto` en el dominio oficial; OG reemplazado.
  * Inyectar o ajustar `<header class="topbar">` y `#mobile-drawer` homologados (Montserrat + drawer accesible de `main.js`).
* **Columna de Información (`.contact__info`):**
  * Dirección: `Av. Javier Prado Oeste 583, Magdalena del Mar, Lima (Sede Principal)`
  * Teléfonos: `(01) 461 4464` y WhatsApp `+51 945 036 190`
  * Email: `telemarketing@montalvogroup.com.pe`
  * Instagram: `@montalvoformen`
* **Tabla de Horarios (`.hours-table`):** Lunes–Viernes `08:30–21:30` · Sábados `09:00–21:30` · Domingos `10:00–20:00`.
* **Mapa Embed (`.map-embed`):** centrado en Av. Javier Prado Oeste 583, Magdalena del Mar, `loading="lazy"`, `aspect-ratio` 16/9 desktop · 4/3 mobile.
* **Formulario (`#contact-form`):** Opciones de asunto:
  * `Consulta general de servicios y sedes`
  * `Cursos de Barbería — Montalvo Institute` *(mención textual; el formulario deriva la consulta, no enlaza web del Institute)*
  * `Convenios corporativos / Eventos`
  * `Otro`
* **Derivación inline:** aclaración "Para reservar un turno, usa la reserva online →" (link a `/reserva`).
* **Sin banda CTA.**

#### A6. `pages/login.html`
* Estado: legacy "Barbería Urbana" (canonical `barberiaurbana.com`, OG muerto, carga `Big Shoulders Display`).
* **`<head>`:** Reemplazo completo — Montserrat + JetBrains Mono (mismo bloque `<link>` estándar de `DEVELOPMENT.md` §4), title `Ingresar — Montalvo For Men`, canonical `https://montalvobarber.com.pe/login`, OG homologado.
* **Page Header / Tarjeta:**
  * H1: `Ingresar`
  * Lede: `Accede a tu cuenta de Montalvo For Men para gestionar tus citas.` *(no se promete campus virtual de Montalvo Institute — §1.5)*
  * Form: campos `username`, `password` con labels asociados; botón Primary `Iniciar sesión`.
* Header y footer idénticos al shell homologado (footer de 8 enlaces).

### 6/Bloque B — Construcción de páginas y scripts vacíos

#### B1. `pages/nosotros.html` (vacío → editorial)
* **Hero Editorial:** H1 `Montalvo For Men: barbería de excelencia y escuela de talentos`.
* **Imagen Ambient:** full-width `21:9` con overlay sutil; `alt`: `Interior moderno de una sede de Montalvo For Men en Lima con sillones de barbería profesional`.
* **Narrativa Histórica (`.narrative`, 3 párrafos completos):**
  1. La historia de nuestra marca nace del esfuerzo y la perseverancia de Víctor Hugo Montalvo Blas. Originario de la provincia de Huari, en Áncash, dejó su hogar a los 11 años hacia Barranca y Lima, donde comenzó trabajando a los 20 años como vendedor ambulante de plásticos en el distrito de Magdalena del Mar. Fue allí, frente a su pequeño local, donde observó el dinamismo de una peluquería vecina y decidió abrir en 1994 su primer salón, Vitto's. Aunque aquel primer intento cerró antes de cumplir un año, nunca se rindió: aprendió de la experiencia y en 2001, tras un viaje revelador a una feria de belleza en Chile, fundó Montalvo Salón & Spa.
  2. Con el crecimiento del Grupo Montalvo —que hoy alcanza 120 locales y 8 marcas a nivel nacional—, nació Montalvo For Men como un concepto exclusivo diseñado para el cuidado integral del hombre moderno. En nuestras 45 sedes combinamos infraestructura de vanguardia, las mejores marcas internacionales (Redken, L'Oréal Professionnel, Revlon, Kérastase, Baor) y un ambiente donde una buena conversación y una bebida de cortesía acompañan cada corte.
  3. Nuestra vocación trasciende la barbería a través de Montalvo Institute. Lo que empezó como un centro de capacitación interna para perfeccionar a nuestro personal se convirtió, gracias a jóvenes que tocaban nuestras puertas diciendo "yo quiero estudiar", en una red educativa con 16 sedes en el Perú e incursión internacional en Colombia, formando a los mejores barberos y emprendedores de la región. *(mención textual, sin entregable web)*
* **Valores Corporativos (`.values__grid`, componente a anexar):**
  * *La tijera y el detalle:* Precisión técnica en cada corte, trabajando con marcas líderes a nivel mundial que garantizan resultados duraderos.
  * *Transparencia y calidez:* Ofrecemos autenticidad, diagnóstico objetivo y respeto absoluto por el estilo y tiempo de cada cliente.
  * *Formación que transforma:* A través de Montalvo Institute impulsamos el talento y el emprendimiento peruano con programas prácticos de barbería profesional.
* **Métricas Reales (`.stats__grid`, componente a anexar):** `45` Sedes For Men en Perú · `120` Locales del Grupo Montalvo · `30+` Años de trayectoria (desde 1994) · `16` Sedes de Montalvo Institute. Estáticos, sin contador animado (§`DESIGN.md` 8.7).
* **Cita del Fundador (`.founder-quote`, ya existe en CSS):** Texto: `“Crear experiencias duraderas e inolvidables a través del mejor servicio de belleza integral en manos de profesionales altamente capacitados con las mejores marcas del mundo.”` · Firma: `— Víctor Hugo Montalvo Blas, Fundador del Grupo Montalvo`.
* **Bandas:** terminar con banda CTA (§1.6).

#### B2. `pages/galeria.html` (vacío → masonry + filtros + slider)
* **Page Header:** Eyebrow `GALERÍA` · H1 `El trabajo habla` · Lede `Cortes, fades y barbas. Antes y después.`
* **Filtros (`.chip`, componente a anexar):** `Todos` (activo) · `Fades` · `Barba` · `Diseño` · `Afeitado`, con `aria-pressed` por chip y activo = fondo `--primary` + texto `--text-on-primary`.
* **Before/After destacado (`.ba-slider`, ya existe en CSS):** full-width `21:9` desktop / `4:5` mobile; handle draggable + teclado (`role="slider"`, `aria-valuenow/min/max`); respeta `prefers-reduced-motion`.
* **Masonry (`.masonry`, ya existe en CSS):** `column-count` 1/2/3 responsivo, items `break-inside: avoid`, hover `scale(1.02)` `200ms` + overlay con título del corte y nombre del barbero.
* **Estrategia de imágenes (definida — no existía en la versión 1):** el repo solo dispone de `images/hero.jpg` e `images/barber-cut.jpg`. Maquetar 13–15 items de masonry **como placeholders reutilizando esas dos imágenes** (con crops `object-fit: cover` `4:5`), cada `<img>` con `width`/`height` explícitos, `alt` descriptivo de estilo Montalvo For Men (p. ej. `Fade medio degradado con terminación a navaja en sede Magdalena del Mar`), `loading="lazy"` below-fold y `onerror` al fallback `images/barber-cut.jpg`. El reemplazo por arte fotográfico propio queda fuera de este plan (tarea futura de contenido).
* **Bandas:** terminar con banda CTA (§1.6).

#### B3. `scripts/contacto.js` (vacío → validación accesible)
* Validación en cliente del `#contact-form`: estados inline de error por campo, foco al primer error on submit, mensajes en `aria-live="polite"`, submit deshabilitado **solo** durante el request (spinner dentro del botón).
* Convención: JS vanilla, IIFE + `'use strict'` + `var`, sin dependencias (igual que `reserva.js`).
* Copy alineado a la definición de estados/mensajes del sitio (explica el error y cómo continuar; elipsis real `…`).

#### B4. `scripts/galeria.js` (vacío → interactividad)
* Control por arrastre (mouse/touch) y por teclado (`ArrowLeft`/`ArrowRight`) del `.ba-slider`, con `aria-valuenow` actualizado y respeto de `prefers-reduced-motion`.
* Filtrado por chips: toggle `aria-pressed`, filtrado de items de masonry vía clase utilitaria (sin animación de layout — solo `opacity`/`transform` permitidos, y `display` al final del pipeline si se necesita quitar el nodo del flujo).
* Convención: mismo estilo que B3.

#### A5-anexo (CSS). `styles/styles.css`
* Estado: base + páginas internas ya implementadas; faltan solo tres componentes.
* **Anexar** (bloques BEM nuevos al final del archivo, con banner de sección `/* ====== Título — selectores ====== */` como el resto del archivo; `:root` intacto):
  1. `.chip` — filtros de galería: altura `32px`, radio `999px`, `padding: 0 14px`, estilo label; activo: fondo `--primary` + texto `--text-on-primary`; inactivo: borde `--border-strong`, hover `--surface-subtle`.
  2. `.values__grid` — grid 3 value cards (1 col mobile → 3 col desde `lg`, `gap: 24px`) reutilizando el patrón de card `--surface` `12px`.
  3. `.stats__grid` — grid 4 stat cards 2/2 mobile → 4 col desktop; número grande `Montserrat 800` en `--accent`, label debajo (`--text-secondary`).
* No eliminar reglas existentes de otros componentes.

### 6/Bloque C — Documentación

#### C1. `docs/BUSINESS.md`
* Reescribir como Brand Book de **Montalvo For Men**: historia (§4), misión, visión, valores (§B1), lema (§3), catálogo y tarifas (§5), sedes y contacto (§3).
* Montalvo Institute aparece solo como antecedente del grupo (mención); sin oferta de productos/entregables del Institute dentro de este documento de marca web.

---

## 7. Estrategia de Imágenes (nueva — no existía en la versión 1)

* **Inventario actual:** `images/hero.jpg` e `images/barber-cut.jpg` (única arte disponible).
* **Regla:** ninguna página nueva debe inventar rutas de imágenes inexistentes. Los placeholders de `equipo` (preview) y `galeria` (masonry + before/after) reutilizan esas dos imágenes con `object-fit: cover` y crops.
* **Contrato de `<img>` (todas las páginas):** `width`/`height` explícitos (anti-CLS), `alt` representativo no genérico, `onerror` → `images/barber-cut.jpg` (o `images/hero.jpg` para media amplias), `loading="lazy"` below-the-fold, `fetchpriority="high"` en el hero por encima del pliegue.
* **Empty state:** placeholder `--surface-subtle` con ícono centrado al 40% opacidad, nunca caja rota.
* **Fuera de alcance:** producción/reemplazo de fotografía propia (task de contenido futuro).

---

## 8. Checklist de Calidad Post-Migración (Definition of Done)

- [ ] **Erradicación de marcas antiguas:** búsqueda global sin coincidencias de `Rustic`, `Urbana`, `Siempreviva`, `Springfield`, `+54`, `Big Shoulders`, `therusticbarbershop`, `barberiaurbana`, `Martín Silva` y `Buenos Aires` (en los 8 HTML, `styles/`, `scripts/` y `vercel.json`).
- [ ] **Símbolo monetario uniforme:** todos los precios en `index.html`, `servicios.html`, `reserva.html` y `equipo.html` en Soles peruanos `S/ XX.00`; el `priceRange` del JSON-LD de `index` es `S/ 30.00 - S/ 65.00`.
- [ ] **Consistencia de navegación:** topbar con idéntica lista de 6 enlaces y footer con idéntica lista de 8 enlaces (incluidos `Nosotros` e `Ingresar`) en los **8 archivos HTML**; `aria-current="page"` correcto por página.
- [ ] **Bandas CTA según la regla:** presentes y con copy "¿Listo para el corte?" en `index`, `servicios`, `equipo`, `galeria`, `nosotros`; ausentes en `reserva` y `contacto`.
- [ ] **Cierra de páginas nueva:** `nosotros.html` y `galeria.html` maquetadas completas con los sinópsis de §6-B1/§6-B2; CSS solo con los tres anexos autorizados.
- [ ] **Métrica única de Institute:** el valor `16` aparece igual en narrativa y en stats de `/nosotros` (sin mezclar "15+"/"16").
- [ ] **Imágenes seguras:** todas las `<img>` con `width`/`height`, `alt` descriptivo y `onerror` al fallback; sin rutas de imágenes inexistentes en el HTML.
- [ ] **Login limpio:** `pages/login.html` sin `Big Shoulders Display`, canonical en el dominio oficial, lede sin promesas de campus virtual.
- [ ] **Modal de reserva verificado:** `role="dialog"`, `aria-modal="true"`, focus trap, `Escape` y restauración de foco funcionales (no reescritos).
- [ ] **Validación de Accesibilidad:** foco visible en todos los interactivos, contraste WCAG AA preservado sobre `#0D0D0D`, `prefers-reduced-motion` respetado en barber pole, slider y filtros, navegación de teclado entre páginas y drawer accesible.
