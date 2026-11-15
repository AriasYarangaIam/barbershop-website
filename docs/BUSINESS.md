# Montalvo For Men — Brand Book

> Documento de marca del sitio web. Fuente de verdad complementaria a `docs/DESIGN.md` (sistema visual), `docs/DEVELOPMENT.md` (implementación) y `docs/MIGRATION.md` (migración de contenidos).
> **Alcance:** Montalvo For Men, división de barbería masculina del Grupo Montalvo. Montalvo Institute aparece únicamente como antecedente y brazo educativo del grupo; este documento no define productos, páginas ni entregables web propios del Institute.

---

## 01. Resumen de marca

**Montalvo For Men** es la red de salones y barberías masculinas del Grupo Montalvo: **45 sedes a nivel nacional** en Perú. Combina infraestructura moderna, marcas internacionales de producto y un servicio donde la conversación y la bebida de cortesía forman parte de la experiencia.

- **Categoría:** barbería masculina premium y cuidado personal.
- **Respaldo:** Grupo Montalvo, 30+ años de trayectoria y 120 locales.
- **Promesa:** amenas charlas, buenos servicios y excelentes cortes.
- **Público:** hombres que buscan corte, barba y cuidado facial con criterio estético y atención profesional; padres que llevan a sus hijos; empresas con convenios corporativos.

---

## 02. Historia

La marca nace del esfuerzo y la perseverancia de **Víctor Hugo Montalvo Blas**, originario de Huari (Áncash) y tercero de once hermanos. Migró a Lima a los 11 años y a los 20 inició como vendedor ambulante de artículos plásticos en un triciclo por las calles de Magdalena del Mar, hasta abrir su primer puesto en el mercado distrital.

Frente a su tienda operaba una concurrida peluquería. Motivado por la rotación de ese negocio, en **1994** abrió su primer salón, **Vitto's** (o Vito's). Por inexperiencia técnica y administrativa quebró en menos de un año y mantuvo su comercio de plásticos como sostén económico.

En **2001** viajó a una feria internacional de belleza en Santiago de Chile, donde adoptó una visión integral del cuidado personal. Al regresar abrió un segundo local en Jesús María y formalizó entre **2001 y 2002** la marca **Montalvo Salón & Spa**.

Hoy el **Grupo Montalvo** supera los 30 años de trayectoria, con **120 locales**, **8 marcas hermanas** y la participación activa de sus hermanos como socios societarios. **Montalvo For Men** es su red exclusiva de barbería masculina, con **45 sedes a nivel nacional**. **Montalvo Institute** es el brazo de educación técnica superior del grupo, con **16 sedes en Perú** e internacionalización operativa en **Bogotá y Medellín (Colombia)** desde 2023.

---

## 03. Propósito, misión, visión y lema

- **Propósito:** crear experiencias duraderas e inolvidables a través del mejor servicio de belleza integral, en manos de profesionales altamente capacitados y con las mejores marcas del mundo.
- **Misión:** ofrecer barbería masculina de excelencia en cada sede, con estándares de servicio consistentes y precios claros en soles.
- **Visión:** ser la red de barbería masculina de referencia en el Perú y formar a los profesionales que la sostienen.
- **Lema oficial:** *Amenas charlas. Buenos servicios. Excelentes cortes.*
- **Firma de fundador:** — Víctor Hugo Montalvo Blas, Fundador del Grupo Montalvo.

---

## 04. Valores

### La tijera y el detalle
Precisión técnica en cada corte, trabajando con marcas líderes a nivel mundial que garantizan resultados duraderos.

### Transparencia y calidez
Ofrecemos autenticidad, diagnóstico objetivo y respeto absoluto por el estilo y tiempo de cada cliente.

### Formación que transforma
A través de Montalvo Institute impulsamos el talento y el emprendimiento peruano con programas prácticos de barbería profesional.

---

## 05. Identidad verbal

- **Tono:** directo, cálido y profesional. Cercano sin ser informal en exceso; nunca corporativo ni grandilocuente.
- **Voz:** segunda persona, activa. Acción concreta ("Reserva tu turno"), no pasiva.
- **Promesas verificables:** sedes, horarios, precios y marcas reales. No se prometen servicios ni canales que no existan.
- **Estados:** los mensajes explican qué pasó y cómo continuar; los errores no culpan al usuario.
- **Puntuación:** comillas curvas (“ ”), elipsis real (…), precios con espacio fino en soles (`S/ 35.00`) y `&nbsp;` en el wordmark.
- **Prohibido:** prometer campus virtual, entregables del Institute, promociones sin respaldo o comparaciones con competidores.

---

## 06. Identidad visual

La estética **Dark Industrial** traduce la materialidad de los salones físicos: lienzo oscuro, superficies elevadas, acento dorado y tipografía geométrica.

| Token | Valor | Uso |
|---|---|---|
| `--canvas` | `#0D0D0D` | Fondo base del sitio |
| `--surface` | `#1A1A1A` | Tarjetas y módulos |
| `--surface-subtle` | `#242424` | Inputs y banners internos |
| `--primary` | `#C5A059` | Acento principal (dorado) |
| `--accent` | `#E8D5A3` | CTA de reserva y detalles |
| `--text-primary` | `#F5F5F5` | Texto principal |
| `--text-secondary` | rgba(245,245,245,0.65) | Texto de apoyo |

- **Tipografía:** Montserrat (display y cuerpo) + JetBrains Mono (datos, horarios, etiquetas técnicas).
- **Firma visual:** barber pole como divisor y como acento mini junto al logo y a los eyebrows.
- **Regla dura:** los tokens de `styles/styles.css` no se modifican; toda pieza nueva reutiliza los existentes.
- **Fotografía:** interiores de sede, sillones, detalle de tijera y navaja, retratos de barberos y resultados de corte. Mientras no exista arte propio, se usan los recursos disponibles con crops controlados y `alt` descriptivo.

---

## 07. Catálogo y tarifas oficiales

Tarifas referenciales en soles (S/). Precios claros, sin sorpresas.

| # | Servicio | Duración | Precio |
|---|---|---|---|
| 01 | Corte Caballero | 45 min | S/ 35.00 |
| 02 | Corte + Ritual de Barba *(más pedida)* | 75 min | S/ 65.00 |
| 03 | Ritual de Barba | 30 min | S/ 35.00 |
| 04 | Camuflaje de Canas & Color | 60 min | S/ 55.00 |
| 05 | Limpieza Facial & Black Mask | 45 min | S/ 45.00 |
| 06 | Corte de Niños (Junior) | 30 min | S/ 30.00 |

**Rango de precio declarado:** `S/ 30.00 - S/ 65.00` (usado en datos estructurados).

---

## 08. Sedes, contacto y horarios

- **Sede principal (flagship histórica):** Av. Javier Prado Oeste 583, Magdalena del Mar, Lima.
- **Sede alternativa (corporativa):** Av. Jorge Chávez 301, Miraflores, Lima.
- **Central telefónica:** (01) 461 4464 — `tel:+5114614464`.
- **WhatsApp de reservas:** +51 945 036 190 · +51 932 824 708 (display `945 036 190`).
- **Email de atención corporativa:** telemarketing@montalvogroup.com.pe.
- **Instagram:** [@montalvoformen](https://www.instagram.com/montalvoformen).
- **Dominio canónico:** `https://montalvoformen.com.pe` — dominio del negocio real. Este proyecto es un **clon** y declara `https://montalvobarber.com.pe` en sus metadatos para no reutilizarlo.
- **Horario unificado:** Lun–Vie 08:30–21:30 · Sáb 09:00–21:30 · Dom 10:00–20:00.

---

## 09. Arquitectura digital

- **Páginas:** Inicio, Servicios, Equipo, Galería, Reserva, Contacto (nav primaria de 6 enlaces) + Nosotros e Ingresar (nav secundaria del footer, 8 enlaces en total).
- **Flujo principal:** Inicio → Reserva; páginas de exploración → banda CTA final → Reserva.
- **Flujo de confianza:** Inicio → Nosotros → Equipo → Reserva.
- **Flujo de consulta:** Contacto → derivación inline a Reserva.
- **Banda CTA** ("¿Listo para el corte?") al final de Inicio, Servicios, Equipo, Galería y Nosotros; ausente en Reserva y Contacto.
- **Ingresar** es acceso de clientes a la gestión de citas; no es un campus virtual ni una promesa educativa.

---

## 10. Montalvo Institute (mención de grupo)

Montalvo Institute es el brazo de educación técnica superior del Grupo Montalvo: **16 sedes en Perú** e incursión operativa en **Bogotá y Medellín** desde 2023. Nació como centro de capacitación interna para perfeccionar al personal de los salones y se convirtió en una red educativa abierta, impulsada por jóvenes que se acercaban a pedir formación.

En este sitio aparece **solo como texto** en la historia, la narrativa de Nosotros, el valor "Formación que transforma", la bio de Marco y una opción de asunto del formulario de contacto. **No se construyen páginas, flujos, links ni entregables web del Institute en este proyecto.**

---

## 11. Métricas de marca

| Métrica | Valor |
|---|---|
| Sedes For Men en Perú | 45 |
| Locales del Grupo Montalvo | 120 |
| Años de trayectoria (desde 1994) | 30+ |
| Sedes de Montalvo Institute | 16 |
| Marcas hermanas del grupo | 8 |

Las métricas se presentan estáticas, sin contadores animados, y el valor de Institute es siempre el mismo (16) en narrativa y en cifras.

---

## 12. Límites y pendientes de contenido

- **Fuera de alcance:** producción y reemplazo de fotografía propia; páginas o entregables de Montalvo Institute; backend real de reservas y login.
- **Pendiente de contenido:** arte fotográfico definitivo para galería, portfolio de equipo y hero.
- **Mantenimiento:** toda pieza nueva debe referenciar este Brand Book y los tokens existentes; ninguna migración futura reabre decisiones de identidad ya cerradas.
