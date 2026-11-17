# Plantilla CV / Portfolio para desarrolladores

Plantilla de currículum online pensada para perfiles de programación. Es **bilingüe (español / inglés)** y está **preparada para que la lean herramientas de IA y ATS**. Es estática y no tiene dependencias, así que funciona en **GitHub Pages**, Netlify, Vercel o cualquier hosting.

## Características

- **Todo el contenido está en un solo archivo**: `data/cv.js`
- **Bilingüe**: selector ES/EN en el menú. El idioma se elige por `?lang=en`, por la última elección guardada o por el idioma del navegador. Se pueden añadir más idiomas
- **Legible por IA / ATS**:
  - HTML estático prerenderizado: el contenido se lee aunque no se ejecute JavaScript
  - Encabezados con los nombres estándar de cada sección ("Experiencia: …", "Habilidades: …")
  - El texto decorativo (ventana de código, cinta de tecnologías, iniciales) se pinta con CSS y no aparece en el texto extraído
  - Datos estructurados JSON-LD (`ProfilePage` → `Person`): puestos, credenciales, habilidades e idiomas
  - Versiones en texto generadas automáticamente: `cv.es.md`, `cv.en.md`, `resume.es.json`, `resume.en.json` ([JSON Resume](https://jsonresume.org)) y `llms.txt`
  - Versión PDF (Descargar CV → Guardar como PDF): texto extraíble sin palabras pegadas, contacto en texto al inicio y orden puesto → empresa → fechas
- Modo oscuro y claro, con 6 paletas de color y la opción de usar colores propios
- Panel de personalización para la demo (se desactiva con una línea)
- Hero con efecto de escritura, ventana de código generada desde el perfil y cinta animada de tecnologías
- Secciones reordenables u ocultables: Sobre mí, Habilidades, Experiencia, Proyectos (con filtros), Formación, Testimonios y Contacto
- Formulario de contacto con Formspree, Getform, etc. Sin endpoint, abre el cliente de correo
- Adaptable a móvil, tablet y escritorio, y accesible (ARIA, foco visible, `prefers-reduced-motion`)

## Estructura

```
index.html             Esqueleto + HTML prerenderizado (lo rellena el build)
data/cv.js             ← CONTENIDO Y CONFIGURACIÓN (lo único que hay que editar)
assets/css/styles.css  Estilos, tokens de diseño e impresión
assets/js/render.js    Genera el HTML a partir de cv.js (lo usan el navegador y el build)
assets/js/app.js       Interacciones: idioma, tema, menú, filtros, animaciones…
tools/build.js         Genera la versión para IA/ATS (Node 18+, sin dependencias)
.github/workflows/     Publicación automática en GitHub Pages
```

Archivos generados por el build (no se editan a mano): `cv.*.md`, `resume*.json`, `llms.txt`, `robots.txt` y `sitemap.xml` (este último solo si `meta.url` está definido).

## Puesta en marcha

1. Edita `data/cv.js`.
2. Regenera la versión para IA/ATS:
   ```bash
   node tools/build.js
   ```
3. Para verla en local:
   ```bash
   python -m http.server 5173
   ```
4. Para publicarla, hay dos opciones:
   - **Recomendada**: sube el repositorio y activa *Settings → Pages → Source: GitHub Actions*. El workflow incluido ejecuta el build en cada `push` a `main`, así que no se olvida nunca.
   - *Deploy from branch*: ejecuta `node tools/build.js` antes de cada commit.

> Si editas `cv.js` y no ejecutas el build, la web se sigue viendo bien en el navegador, pero el HTML estático, el Markdown y el JSON se quedan desactualizados.

## Textos bilingües

Cualquier texto puede ser un valor simple (igual en todos los idiomas) o un objeto por idioma:

```js
location: "Madrid",                                  // igual en todos
type: { es: "Tiempo completo", en: "Full-time" },    // traducido
achievements: { es: ["Logro…"], en: ["Achievement…"] },
```

Para **añadir un idioma** (por ejemplo, portugués):

1. Añade `"pt"` a `meta.languages` y su locale a `meta.locales`.
2. Añade `ui.pt` copiando `ui.en` y traduciéndolo.
3. Añade `pt: "…"` a los textos que quieras traducir. Los que falten usan el idioma predeterminado.

Para **un solo idioma**, deja `meta.languages: ["es"]` y el selector desaparece.

## Guía de personalización (`data/cv.js`)

| Bloque | Qué controla |
| --- | --- |
| `meta` | Idiomas, idioma predeterminado, locales, URL pública (canonical, hreflang, sitemap), título, descripción e imagen OG |
| `theme` | `mode` (`dark` / `light` / `auto`), `accent` (`violet`, `ocean`, `emerald`, `sunset`, `rose`, `amber`, `custom`), `customColors`, `customizer` (**`false` al entregar al cliente**) y `animations` |
| `profile` | Nombre, foto, roles, resumen, contacto, disponibilidad, PDF del CV por idioma, idiomas que habla y redes sociales |
| `hero` | Saludo, botones, archivo de código e insignias flotantes |
| `stats` | Cifras con contador animado |
| `sections` | **Orden**, visibilidad (`enabled`) y textos. `eyebrow` debe ser el nombre estándar de la sección: es lo que identifican los ATS |
| `skills` / `skillLevels` | Categorías, tecnologías ([Devicon](https://devicon.dev)), nivel de 0 a 100 y etiquetas de nivel |
| `experience` | Puestos (fechas `AAAA-MM`; `end: null` marca el puesto actual) |
| `projects` | Proyectos con imagen opcional, categorías para los filtros, métrica y enlaces |
| `education` / `certifications` | Formación y acreditaciones |
| `testimonials` | Testimonios (en el Markdown/JSON aparecen como referencias) |
| `contact` | `formEndpoint` (vacío = `mailto:`) y asunto |
| `ui` | Textos de la interfaz por idioma. `ui.<lang>.resume` contiene los encabezados estándar del CV en texto |

### Consejos para que la IA y los ATS lean mejor el CV

- Usa en `eyebrow` nombres estándar: *Experiencia*, *Habilidades*, *Formación*, *Proyectos*.
- Escribe los logros con verbo, acción y resultado medible ("Reduje X un 40%").
- Nombra las tecnologías tal cual se buscan ("PostgreSQL", no "Postgres DB").
- Define `meta.url` para que el canonical, hreflang, sitemap y JSON-LD usen URLs absolutas.
- Comparte con los reclutadores el enlace a `cv.en.md` o el PDF si el proceso es automatizado.

### Redes sociales disponibles

`github`, `linkedin`, `x`, `twitter`, `gitlab`, `dev`, `youtube`, `stackoverflow`, `dribbble`, `mail`. Cualquier otro valor muestra un icono de enlace.

### Iconos de interfaz disponibles

`layout`, `server`, `cloud`, `database`, `tool`, `smartphone`, `cpu`, `shield`, `users`, `globe`, `clock`, `map-pin`, `briefcase`, `zap`, `star`, `sparkles`, `terminal`, `code`, `trending`, `award`, `graduation`, `heart`, `file`.

### Añadir una paleta nueva

1. En `assets/css/styles.css`, en *PALETAS DE ACENTO*, añade:
   `:root[data-accent="mipaleta"] { --accent: #hex1; --accent-2: #hex2; --on-accent: #fff; }`
2. En `assets/js/render.js`, añádela al objeto `PALETTES`.
3. Usa `theme.accent: "mipaleta"`.

### Tipografía, radios y espaciado

Son variables al principio de `styles.css` (`--font-sans`, `--font-mono`, `--radius-*`, `--container`, `--section-y`). Si cambias las fuentes, actualiza también el enlace de Google Fonts en `index.html`.
