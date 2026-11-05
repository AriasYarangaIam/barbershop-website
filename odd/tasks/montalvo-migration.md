# ODD — Migración de identidad Montalvo For Men (feature: montalvo-migration)

Spec autorizada: `docs/MIGRATION.md` v2. Ejecución gradual: una tarea = un commit revisable en `feature/montalvo-migration`.

## Specs

### S1 — Diccionario global de tokens de contenido

| Parámetro | Valor oficial (verbatim) |
|---|---|
| Wordmark | `Montalvo&nbsp;For&nbsp;Men` |
| aria-label logo | `aria-label="Montalvo For Men — inicio"` |
| Título drawer | `<span class="mobile-drawer__title">Montalvo For Men</span>` |
| Lema oficial | `Amenas charlas. Buenos servicios. Excelentes cortes.` |
| Enlace editorial footer | `<a class="site-footer__about" href="/nosotros">Conoce la historia →</a>` |
| Sede principal | `Av. Javier Prado Oeste 583, Magdalena del Mar, Lima` |
| Sede alternativa | `Av. Jorge Chávez 301, Miraflores, Lima` |
| Central fija | `(01) 461 4464` → `<a href="tel:+5114614464">+51 1 461 4464</a>` |
| WhatsApp reservas | `+51 945 036 190` / `+51 932 824 708`; display `945 036 190` |
| Email | `telemarketing@montalvogroup.com.pe` |
| Instagram | `@montalvoformen` → `https://www.instagram.com/montalvoformen` |
| Horario unificado | `Lun–Vie 08:30–21:30 · Sáb 09:00–21:30 · Dom 10:00–20:00` |
| Copyright | `<small>&copy; 2026 Montalvo For Men · Grupo Montalvo</small>` |
| Dominio canónico | `https://montalvoformen.com.pe` |
| Métrica Institute | `16 sedes` (mismo valor en narrativa y stats) |

### S2 — Metadatos por página

- index: title `Montalvo For Men — Cortes con carácter | Reserva tu cita en Lima`; description `Montalvo For Men: la cadena líder de barberías en Perú con 45 sedes a nivel nacional. Cortes de caballero, fades, ritual de barba con toallas calientes y cuidado facial. Reserva online.`; canonical `https://montalvoformen.com.pe/`.
- servicios: canonical `/servicios`, OG homologado.
- equipo: canonical `/equipo`, OG homologado.
- reserva: canonical `/reserva`, OG homologado.
- contacto: title `Contacto y sedes — Montalvo For Men | Lima, Perú`; canonical `/contacto`.
- login: title `Ingresar — Montalvo For Men`; canonical `https://montalvoformen.com.pe/login`.
- nosotros / galeria: canonical + OG en el dominio oficial.
- JSON-LD index: `HairSalon`, name `Montalvo For Men`, address `Av. Javier Prado Oeste 583, Magdalena del Mar, Lima`, telephone `+5114614464`, priceRange `S/ 30.00 - S/ 65.00`.
- theme-color se conserva `#0D0D0D`.

### S3 — Navegación y shell

- Topbar: exactamente 6 enlaces en este orden: `Inicio`, `Servicios`, `Equipo`, `Galería`, `Reserva`, `Contacto`; `aria-current="page"` en la página actual (topbar y drawer).
- Footer nav secundaria: exactamente 8 enlaces en este orden: `Inicio`, `Servicios`, `Equipo`, `Galería`, `Reserva`, `Contacto`, `Nosotros`, `Ingresar`.
- Wordmark, aria-label, título de drawer y tagline según S1 en las 8 páginas.
- Footer: contacto + horarios (mono) + © 2026 + `Conoce la historia →` a `/nosotros`.

### S4 — Catálogo oficial de servicios (S/)

1. Corte Caballero — `45 min` · `S/ 35.00`
2. Corte + Ritual de Barba (Destacada, pill `Más pedida`) — `75 min` · `S/ 65.00`
3. Ritual de Barba — `30 min` · `S/ 35.00`
4. Camuflaje de Canas & Color — `60 min` · `S/ 55.00`
5. Limpieza Facial & Black Mask — `45 min` · `S/ 45.00`
6. Corte de Niños (Junior) — `30 min` · `S/ 30.00`

Descripciones literales (A2): Corte Caballero = `Asesoramiento personalizado, lavado capilar, corte minucioso a tijera o máquina y peinado con productos profesionales.`; Corte + Ritual de Barba = `Nuestro servicio insignia. Corte de caballero más ritual relajante de barba con toallas calientes, doble afeitado y acabado tipo spa.`; Ritual de Barba = `Recorte completo de barba, afeitado de contorno según líneas con toallas calientes, lavado y aplicación de aceite hidratante para barba y piel.`; Camuflaje de Canas & Color = `Coloración sutil para camuflar canas en cabello o barba sin efecto artificial, o tinte sin amoniaco ideal para cuero cabelludo sensible.`; Limpieza Facial & Black Mask = `Tratamiento facial purificante con mascarilla de carbón activado (*Black Mask*) que elimina impurezas y devuelve frescura al rostro.`; Corte de Niños (Junior) = `Cortes y estilos específicos para la fisionomía de los niños con atención paciente y opción de diseños personalizados.`

### S5 — Home (A1)

- Hero eyebrow `Grupo Montalvo · 45 sedes en Perú`; H1 `Cortes con carácter. Reserva tu silla.`; lede `Montalvo For Men: nuevo concepto en barbería masculina y formación de talentos junto a Montalvo Institute. Tijera, navaja y bebida de cortesía. Reserva en 30 segundos.`; proof `★ 4.9 · 45 sedes a nivel nacional`; botones `Reservar turno` (→ `/reserva`) + `Ver el trabajo` (→ `/equipo`).
- Preview de 3 servicios: Corte Caballero, Corte + Ritual de Barba (destacada `Más pedida`), Ritual de Barba.
- Testimonio: `“El equipo es súper profesional, y no se trata solo de cortes de cabello, sino de toda una experiencia. Me ofrecieron una bebida mientras esperaba y, créanme, ¡esos detalles cuentan!”` — autor `Sebastián Alvarado` · `Cliente Montalvo For Men — Sede Lince`.
- Banda CTA final.

### S6 — Servicios (A2)

- Page header: eyebrow `SERVICIOS`, H1 `Lo que hacemos`, lede `Tijera, navaja y cuidado dermatológico masculino con las mejores marcas internacionales. Precios claros en soles.`
- Grilla de los 6 servicios de S4 + proceso de 4 pasos: `01 Reserva` (elige sede, servicio, barbero y horario online) → `02 Llega` (bebida de cortesía y buena música mientras esperas) → `03 Cortamos` (diagnóstico de imagen y ejecución con insumos premium) → `04 Vuelve` (paga con cualquier medio y agenda tu próxima visita).
- Banda CTA final.

### S7 — Equipo (A3)

- Header: eyebrow `EQUIPO`, H1 `Las manos detrás del corte`, lede `Un selecto grupo de profesionales formados en Montalvo Institute y comprometidos con tu estilo.`
- Marco — `Master Barber & Instructor`, especialidad `Fade & Corte con Diseño`, bio `Más de 10 años perfeccionando técnicas de degradado y formador de nuevos talentos en Montalvo Institute.`, `4.9/5`.
- Diego — `Senior Stylist`, `Tijera, Textura & Barber Color`, `Especialista en estructura de corte clásico a tijera, camuflaje de canas y colorimetría masculina avanzada.`, `4.8/5`.
- Lucía — `Especialista en Barbería Clásica & Cuidado Facial`, `Ritual de Barba & Skin Care`, `Experta en el ritual de afeitado tradicional con toallas calientes, perfilado a navaja y aplicación de tratamientos Black Mask.`, `5.0/5`.
- CTA por barbero → `reserva.html?barbero=[id]`; preview de portfolio 6 imágenes `4:5` + `Ver galería completa →` → `/galeria`.
- Testimonios: `“Mi barbera entendió exactamente lo que buscaba. Su atención y habilidad para trabajar con las tijeras y la navaja son insuperables. El ambiente, la música y la atención al cliente hacen que esta sea la mejor barbería premium en la que he estado.”` — `Edinson Corina (Sede Garzón)`; `“La atención al cliente es de otro nivel. Desde el saludo cálido hasta el cuidado en cada paso del proceso, se nota que se esfuerzan por la excelencia.”` — `Fernando Alfaro (Sede Castilla)`.
- Banda CTA final.

### S8 — Reserva (A4)

- Header: eyebrow `RESERVA`, H1 `Reserva tu turno`, lede `Amenas charlas y excelentes cortes. Agenda en tres pasos y recibe confirmación por WhatsApp.`
- Teléfono con placeholder `Ej. 945 036 190…`; los 6 servicios de S4 con precio/duración coherentes con `scripts/reserva.js`.
- Info box: `Atención en sedes: Lun–Vie 08:30–21:30 · Sáb 09:00–21:30 · Dom 10:00–20:00. Te esperamos 5 minutos antes de tu cita.`
- Modal `#booking-modal` **se verifica, no se reescribe** (`role="dialog"`, `aria-modal="true"`, focus trap, `Escape`, restauración de foco, botones `Volver al inicio` y `Cerrar`).
- Sin banda CTA.

### S9 — Contacto (A5)

- Info: dirección sede principal S1, teléfonos `(01) 461 4464` + WhatsApp `+51 945 036 190`, email, Instagram.
- Tabla de horarios: Lunes–Viernes `08:30–21:30`, Sábados `09:00–21:30`, Domingos `10:00–20:00`.
- Mapa embed en `Av. Javier Prado Oeste 583, Magdalena del Mar`, `loading="lazy"`, 16/9 desktop · 4/3 mobile.
- Asuntos del formulario: `Consulta general de servicios y sedes`, `Cursos de Barbería — Montalvo Institute`, `Convenios corporativos / Eventos`, `Otro`.
- Derivación inline a `/reserva`; sin banda CTA. Form `id="contact-form"` con estados de error para B3.

### S10 — Login (A6)

- `<head>` solo Montserrat + JetBrains Mono (sin `Big Shoulders Display`), title/canonical/OG de S2.
- H1 `Ingresar`; lede `Accede a tu cuenta de Montalvo For Men para gestionar tus citas.` (sin campus virtual ni link a Institute).
- Campos `username`/`password` con labels asociados; botón Primary `Iniciar sesión`; header/drawer/footer homologados (footer 8 enlaces).

### S11 — Nosotros (B1)

- H1 `Montalvo For Men: barbería de excelencia y escuela de talentos`.
- Ambient 21:9, alt `Interior moderno de una sede de Montalvo For Men en Lima con sillones de barbería profesional`.
- Narrativa: los 3 párrafos literales de `docs/MIGRATION.md` §6-B1.
- Valores: `La tijera y el detalle`, `Transparencia y calidez`, `Formación que transforma` con sus descripciones literales.
- Métricas estáticas: `45` Sedes For Men en Perú · `120` Locales del Grupo Montalvo · `30+` Años de trayectoria (desde 1994) · `16` Sedes de Montalvo Institute.
- Cita: `“Crear experiencias duraderas e inolvidables a través del mejor servicio de belleza integral en manos de profesionales altamente capacitados con las mejores marcas del mundo.”` — `— Víctor Hugo Montalvo Blas, Fundador del Grupo Montalvo`.
- Banda CTA final.

### S12 — Galería (B2)

- Header: eyebrow `GALERÍA`, H1 `El trabajo habla`, lede `Cortes, fades y barbas. Antes y después.`
- Chips: `Todos` (activo) · `Fades` · `Barba` · `Diseño` · `Afeitado`, con `aria-pressed`.
- Before/After `.ba-slider`: 21:9 desktop / 4:5 mobile; `role="slider"`, `aria-valuenow/min/max`, teclado, `prefers-reduced-motion`.
- Masonry 13–15 items reutilizando `images/hero.jpg` e `images/barber-cut.jpg` con crops 4:5, `width`/`height` explícitos, `alt` descriptivo y `onerror` → `images/barber-cut.jpg`. Sin rutas inexistentes.
- Banda CTA final.

### S13 — Scripts (B3/B4)

- Convención: JS vanilla, IIFE + `'use strict'` + `var`, sin dependencias.
- `scripts/contacto.js`: validación de `#contact-form`, error inline por campo, foco al primer error al enviar, mensajes en `aria-live="polite"`, submit deshabilitado solo durante el request con spinner.
- `scripts/galeria.js`: arrastre mouse/touch + teclado (`ArrowLeft`/`ArrowRight`) del `.ba-slider` con `aria-valuenow`; filtrado por chips con `aria-pressed` y toggle de visibilidad sin animación de layout.

### S14 — CSS

- `:root` intacto; no reescribir reglas existentes; solo **anexar** bloques BEM con banners de sección (`/* ====== Título — selectores ====== */`).
- Requeridos: `.chip`, `.values__grid`, `.stats__grid` (A5-anexo) **más** los bloques de Galería (`.before-after`, `.ba-slider`, `.filters`, `.masonry`) y Nosotros (`.editorial-hero`, `.ambient`, `.narrative`, `.value-card`, `.stats`, `.founder-quote`) y Login (`.login*`) que hoy son solo banners vacíos.

### S15 — Bandas CTA

- Presentes con `¿Listo para el corte?` en `index`, `servicios`, `equipo`, `galeria`, `nosotros`.
- Ausentes en `reserva` y `contacto`.

### S16 — Contrato de imágenes

- Toda `<img>` con `width`/`height` explícitos, `alt` descriptivo, `loading="lazy"` bajo el pliegue, `fetchpriority="high"` en hero, `onerror` → `images/barber-cut.jpg` (`images/hero.jpg` en media amplias). Sin rutas de imágenes inexistentes.

### S17 — Erradicación

- Cero coincidencias de `Rustic`, `Urbana`, `Siempreviva`, `Springfield`, `+54`, `Big Shoulders`, `therusticbarbershop`, `barberiaurbana`, `Martín Silva`, `Buenos Aires` en los 8 HTML, `styles/`, `scripts/` y `vercel.json`.
- `vercel.json` y `scripts/main.js` intactos.

## Tasks

| ID | Spec | Ruta | Contenido | Commit |
|---|---|---|---|---|
| T1 | S1,S2,S3,S4,S5,S13,S15,S16,S17 | A1 | `index.html`: head, JSON-LD, shell, hero, 3 cards, preview de equipo, testimonio, footer, CTA | `11880c0` |
| T2 | S1,S2,S3,S4,S6,S15,S16,S17 | A2 | `pages/servicios.html`: catálogo de 6 servicios + proceso + CTA | `4aa9661` |
| T3 | S1,S2,S3,S7,S15,S16,S17 | A3 | `pages/equipo.html`: barberos, portfolio preview (CSS `.masonry`), testimonios | `7cf6e7f` |
| T4 | S1,S2,S3,S4,S8,S16,S17 | A4 | `pages/reserva.html` + `scripts/reserva.js`: 6 servicios, horario unificado, copy; modal verificado | `207551c` |
| T5 | S1,S2,S3,S9,S17 | A5 | `pages/contacto.html`: datos, horarios, mapa, asuntos, form | `feat(contacto): reemplaza datos de contacto y sedes` |
| T6 | S13 | B3 | `scripts/contacto.js`: validación accesible | `feat(contacto): valida el formulario en cliente` |
| T7 | S1,S2,S3,S10,S14,S17 | A6 | `pages/login.html` + CSS `.login*` | `feat(login): homologa shell y metadatos` |
| T8 | S1,S2,S3,S11,S14,S15,S16 | B1 | `pages/nosotros.html` + CSS de Nosotros | `a038d0e` |
| T9 | S1,S2,S3,S12,S14,S15,S16 | B2 | `pages/galeria.html` + CSS `.before-after`/`.ba-slider`/`.filters`/`.chip` (masonry ya en T3) | `8f8fa7c` |
| T10 | S13 | B4 | `scripts/galeria.js`: slider + filtros | `d7bb63b` |
| T11 | S1,S11 | C1 | `docs/BUSINESS.md` (Brand Book; `docs/` está en `.gitignore`, no se commitea) | local, sin commit |
| T12 | S15,S17 + DoD §8 | C2 | Auditoría final: greps de erradicación, navs, precios, CTA, imágenes; reconciliar ODD previo | `123a0ff` |

## Log

- **L1 (solicitud del usuario, verbatim):** «Ejecuta el plan encargado en MIGRATION.md, dividelo en tareas para poder avanzarlo de forma gradual sin intentar realizarlo todo en una sola vuelta»
- **L2 (auditoría de requisitos):** `docs/MIGRATION.md` §2 afirma que `.narrative`, `.founder-quote`, `.masonry` y `.ba-slider` ya existen en `styles/styles.css`. Verificado: son banners de sección vacíos (líneas 1059-1082) y `.login*` no tiene ninguna regla. Sin esos bloques B1/B2 no pueden quedar "maquetadas completas" como exige el DoD §8. Criterio: anexar solo los bloques BEM que B1/B2/A6 consumen, al final de su banner de sección, sin tocar `:root` ni reglas existentes (S14).
- **L3 (conflicto de navegación):** el commit `d95fcab` eliminó `Nosotros` e `Ingresar` del footer; MIGRATION.md §6-A1 y el DoD exigen 8 enlaces. Criterio: manda MIGRATION.md v2 (8 enlaces) en las 8 páginas.
- **L4 (evidencia):** `scripts/reserva.js` usa radios `name="servicio"` (no el `select #service` que describe A4) y `HORARIOS` con domingo cerrado; se conserva la estructura y se ajustan valores/horas al S1 y S4.
- **L5 (rama):** `feature/montalvo-migration` creada desde `fix/footer-nav-standardization`, que contiene el trabajo previo no mergeado (contacto, servicios, modal de reserva) y es la única base con esos archivos implementados.
- **L6 (orden CSS):** el portfolio de A3 es el primer consumidor de `.masonry`, así que su bloque CSS se anexa en T3; T9 queda acotado a `.before-after`, `.ba-slider`, `.filters` y `.chip` más la página.
- **L7 (avance):** T1-T3 completadas y verificadas (`11880c0`, `4aa9661`, `7cf6e7f`). Próximo corte: T4 (reserva + `reserva.js`).
- **L8 (pendiente de decisión):** T11 escribe `docs/BUSINESS.md`, pero `docs/` está en `.gitignore`; el Brand Book quedará fuera de git salvo que el usuario pida forzarlo.
- **L9 (avance):** T4 completada y verificada (`207551c`): 6 servicios con `data-price`/`data-duration`, franjas en minutos con domingo abierto, mensajes de domingo cerrado retirados, modal intacto. T11 completada: `docs/BUSINESS.md` reescrito como Brand Book de Montalvo For Men (historia, valores, catálogo, sedes, métricas, límites); sigue fuera de git por `.gitignore`.
- **L10 (siguiente):** T5 (contacto) + T6 (`scripts/contacto.js`) son la siguiente unidad; luego T7 (login), T8 (nosotros), T9-T10 (galería) y T12 (auditoría).
- **L11 (delegación fallida):** el escritor `gentle-ai-worker` falló con «assistant reported an error» y **no escribió ningún archivo** (contacto.html seguía legacy y `scripts/contacto.js` en 0 bytes). T5 y T6 se hicieron inline con la misma especificación; no se reintentó la delegación.
- **L12 (auditoría final, T12):** erradicación limpia en 8 HTML + `styles/` + `scripts/` + `vercel.json`; 6 enlaces de topbar y 8 de footer en las 8 páginas; un solo `<h1>` y skip link en todas; CTA «¿Listo para el corte?» solo en index, servicios, equipo, galería y nosotros; precios únicamente en formato `S/ XX.00`; todas las `<img>` locales resuelven; `vercel.json` y `scripts/main.js` sin cambios; `node --check` OK en los 4 scripts; llaves CSS balanceadas (419/419); los 268 selectores previos siguen presentes (322 actuales, 0 faltantes).
- **L13 (defectos encontrados y corregidos en T12):** `pages/reserva.html` cargaba `scripts/main.js` y `scripts/reserva.js` con rutas relativas (404 al abrir el archivo, dependía del rewrite) y `pages/nosotros.html` tenía un drawer de 7 enlaces con `aria-current` cuando el resto usa 6. Corregido en `123a0ff`.
- **L14 (cierre):** las 12 tareas están completas. `docs/BUSINESS.md` queda fuera de git por `.gitignore`; el resto está en la rama `feature/montalvo-migration` (13 commits sobre `99395a4`), sin push ni PR, que siguen siendo decisión del usuario.
