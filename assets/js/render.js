/* ==========================================================================
   CV / PORTFOLIO TEMPLATE — Renderizado
   --------------------------------------------------------------------------
   Funciones puras que convierten window.CV en HTML (strings).
   No tocan el DOM: las usa el navegador (assets/js/app.js) y también el
   script de build (tools/build.js) para generar HTML estático, legible por
   lectores de IA, ATS y buscadores sin ejecutar JavaScript.
   ========================================================================== */
(function (global) {
  "use strict";

  /* Paletas (deben coincidir con styles.css → PALETAS DE ACENTO) */
  var PALETTES = {
    violet: ["#8b5cf6", "#22d3ee"],
    ocean: ["#3b82f6", "#2dd4bf"],
    emerald: ["#10b981", "#a3e635"],
    sunset: ["#f97316", "#ec4899"],
    rose: ["#f43f5e", "#a855f7"],
    amber: ["#f59e0b", "#ef4444"],
  };

  /* Gradientes para las portadas generadas de proyectos */
  var COVERS = [
    ["#7c3aed", "#06b6d4"],
    ["#2563eb", "#10b981"],
    ["#db2777", "#f97316"],
    ["#0891b2", "#8b5cf6"],
    ["#16a34a", "#eab308"],
    ["#e11d48", "#6366f1"],
  ];

  /* ------------------------------------------------------------------------
     Iconos SVG
     ------------------------------------------------------------------------ */
  var STROKE = {
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/>',
    external: '<path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    code: '<path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/>',
    "map-pin": '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    briefcase: '<rect width="20" height="14" x="2" y="7" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    calendar: '<rect width="18" height="18" x="3" y="4" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    graduation: '<path d="M22 10 12 5 2 10l10 5 10-5Z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
    award: '<circle cx="12" cy="8" r="6"/><path d="M15.48 12.89 17 22l-5-3-5 3 1.52-9.11"/>',
    copy: '<rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    "check-circle": '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    "alert-circle": '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    "arrow-right": '<path d="M5 12h14M12 5l7 7-7 7"/>',
    "arrow-up": '<path d="m5 12 7-7 7 7M12 19V5"/>',
    "arrow-up-right": '<path d="M7 17 17 7M7 7h10v10"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="M18 6 6 18M6 6l12 12"/>',
    palette:
      '<circle cx="13.5" cy="6.5" r="1.2" fill="currentColor"/><circle cx="17.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="8.5" cy="7.5" r="1.2" fill="currentColor"/><circle cx="6.5" cy="12.5" r="1.2" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.93 0 1.65-.75 1.65-1.69 0-.44-.18-.84-.44-1.13-.29-.29-.44-.65-.44-1.13a1.64 1.64 0 0 1 1.67-1.67h2c3.05 0 5.56-2.5 5.56-5.55C21.97 6.01 17.46 2 12 2Z"/>',
    layout: '<rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18M9 21V9"/>',
    server: '<rect width="20" height="8" x="2" y="2" rx="2"/><rect width="20" height="8" x="2" y="14" rx="2"/><path d="M6 6h.01M6 18h.01"/>',
    cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
    database: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
    tool: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z"/>',
    smartphone: '<rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/>',
    cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2M15 20v2M2 15h2M2 9h2M20 15h2M20 9h2M9 2v2M9 20v2"/>',
    shield: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1Z"/>',
    users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    globe: '<circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    quote:
      '<path d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/><path d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"/>',
    star: '<path d="M11.52 2.3a.53.53 0 0 1 .96 0l2.31 4.68a2.12 2.12 0 0 0 1.6 1.16l5.16.76a.53.53 0 0 1 .3.9l-3.74 3.64a2.12 2.12 0 0 0-.61 1.88l.88 5.14a.53.53 0 0 1-.77.56l-4.62-2.43a2.12 2.12 0 0 0-1.97 0L6.4 21.02a.53.53 0 0 1-.77-.56l.88-5.14a2.12 2.12 0 0 0-.61-1.88L2.16 9.8a.53.53 0 0 1 .3-.9l5.16-.76a2.12 2.12 0 0 0 1.6-1.16z"/>',
    send: '<path d="M14.54 21.69a.5.5 0 0 0 .94-.03l6.5-19a.5.5 0 0 0-.64-.64l-19 6.5a.5.5 0 0 0-.03.94l7.93 3.18a2 2 0 0 1 1.11 1.11z"/><path d="m21.85 2.15-10.94 10.94"/>',
    phone:
      '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>',
    zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
    trending: '<path d="M22 7 13.5 15.5 8.5 10.5 2 17"/><path d="M16 7h6v6"/>',
    sparkles: '<path d="M9.94 15.5A2 2 0 0 0 8.5 14.06l-6.13-1.58a.5.5 0 0 1 0-.96L8.5 9.94A2 2 0 0 0 9.94 8.5l1.58-6.13a.5.5 0 0 1 .96 0L14.06 8.5A2 2 0 0 0 15.5 9.94l6.13 1.58a.5.5 0 0 1 0 .96L15.5 14.06a2 2 0 0 0-1.44 1.44l-1.58 6.13a.5.5 0 0 1-.96 0z"/>',
    terminal: '<path d="m4 17 6-6-6-6M12 19h8"/>',
    file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4M10 9H8M16 13H8M16 17H8"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    heart: '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>',
  };

  var BRANDS = {
    github:
      "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-1.96c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.58.23 2.75.11 3.04.74.81 1.18 1.830 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z",
    linkedin:
      "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.230.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z",
    x: "M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.970 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z",
    gitlab:
      "m23.6 9.59-.03-.09L20.3.99a.85.85 0 0 0-1.62.06l-2.2 6.75H7.53L5.32 1.05a.85.85 0 0 0-1.62-.06L.43 9.5l-.03.09a6.07 6.07 0 0 0 2.01 7.01l.01.01.03.02 4.97 3.73 2.46 1.86 1.5 1.13a1.01 1.01 0 0 0 1.22 0l1.5-1.13 2.46-1.86 5-3.75.01-.01a6.07 6.07 0 0 0 2.03-7.01Z",
    dev: "M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18ZM0 4.94v14.12h24V4.94H0ZM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3Zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.64v1.29Zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.670h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.66-2.52.74-.04c.4-.02.73 0 .73.04 0 .14-1.67 6.38-1.8 6.68Z",
    youtube:
      "M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.81 3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z",
    stackoverflow:
      "M15.73 23.04v-6.39h2.13V25.2H2.13v-8.55h2.13v6.39h11.47ZM6.27 16.04l.44-2.09 10.43 2.2-.44 2.08-10.43-2.19Zm1.37-5 .9-1.95 9.65 4.51-.9 1.93-9.65-4.49Zm2.67-4.74 1.36-1.64 8.18 6.83-1.36 1.64-8.18-6.83ZM15.6.28l6.35 8.55-1.71 1.27L13.89 1.55 15.6.28ZM6.06 20.9v-2.13h10.66v2.13H6.06Z",
    dribbble:
      "M12 24C5.38 24 0 18.62 0 12S5.38 0 12 0s12 5.38 12 12-5.38 12-12 12Zm10.12-10.36c-.35-.11-3.17-.95-6.38-.44 1.34 3.68 1.88 6.67 1.99 7.29a10.27 10.27 0 0 0 4.39-6.85ZM16 21.5c-.15-.9-.75-4.03-2.19-7.77l-.07.02c-5.79 2.02-7.86 6.03-8.05 6.4A10.2 10.2 0 0 0 16 21.5ZM4.37 18.9c.23-.4 3.04-5.06 8.33-6.77.13-.05.27-.09.4-.13-.25-.58-.53-1.16-.83-1.72-5.12 1.53-10.08 1.47-10.53 1.46l-.01.31c0 2.63.99 5.03 2.64 6.85ZM1.95 9.94c.46.01 4.68.03 9.48-1.25a65.3 65.3 0 0 0-3.8-5.93 10.26 10.26 0 0 0-5.68 7.18ZM9.6 2.05c.28.38 2.15 2.92 3.84 6.01 3.65-1.37 5.2-3.45 5.38-3.71A10.24 10.24 0 0 0 9.6 2.05Zm10.34 3.49c-.22.29-1.94 2.49-5.74 4.04.24.49.47.99.68 1.49l.24.55c3.42-.43 6.82.26 7.16.33a10.24 10.24 0 0 0-2.34-6.41Z",
  };
  BRANDS.twitter = BRANDS.x;

  function icon(name, cls) {
    var c = "icon" + (cls ? " " + cls : "");
    if (BRANDS[name]) {
      return '<svg class="' + c + '" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="' + BRANDS[name] + '"/></svg>';
    }
    return (
      '<svg class="' + c + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      (STROKE[name] || STROKE.link) +
      "</svg>"
    );
  }

  /* ------------------------------------------------------------------------
     Utilidades genéricas
     ------------------------------------------------------------------------ */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  // Textos largos del config: se permite HTML básico (<strong>, <em>, <a>, <br>)
  function rich(s) {
    return String(s == null ? "" : s);
  }

  // HTML → texto plano (para Markdown, JSON y datos estructurados)
  function plain(s) {
    return String(s == null ? "" : s)
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]+>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/\s+/g, " ")
      .trim();
  }

  // Texto decorativo: se pinta con CSS (content: attr(data-t)), así no aparece en el texto
  // que extraen lectores de IA, ATS, buscadores o al copiar/pegar.
  function deco(text, cls) {
    return '<span' + (cls ? ' class="' + cls + '"' : "") + ' data-t="' + esc(text) + '"></span>';
  }

  function attrUrl(u) {
    var url = String(u || "").trim();
    if (/^\s*javascript:/i.test(url)) return "#";
    return esc(url);
  }

  function isExternal(u) {
    return /^https?:\/\//i.test(u || "");
  }

  function linkAttrs(u) {
    return 'href="' + attrUrl(u) + '"' + (isExternal(u) ? ' target="_blank" rel="noopener noreferrer"' : "");
  }

  function initialsOf(name) {
    return String(name || "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) {
        return w[0];
      })
      .join("")
      .toUpperCase();
  }

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function parseDate(s) {
    if (!s) return null;
    var p = String(s).split("-");
    return new Date(+p[0], p[1] ? +p[1] - 1 : 0, 1);
  }

  /* ------------------------------------------------------------------------
     Fábrica: crea el renderizador para un CV y un idioma concretos
     ------------------------------------------------------------------------ */
  function create(CV, requestedLang) {
    var meta = CV.meta || {};
    var LANGS = meta.languages && meta.languages.length ? meta.languages : [meta.defaultLang || "es"];
    var DEF = meta.defaultLang || LANGS[0];
    var LANG = LANGS.indexOf(requestedLang) !== -1 ? requestedLang : DEF;
    var LOCALE = (meta.locales && meta.locales[LANG]) || LANG;

    // Traduce un valor { es, en } → texto del idioma activo. Cualquier otro valor se devuelve tal cual.
    function T(v) {
      if (v && typeof v === "object" && !Array.isArray(v)) {
        var keys = Object.keys(v);
        var isLang =
          keys.length > 0 &&
          keys.every(function (k) {
            return LANGS.indexOf(k) !== -1;
          });
        if (isLang) return v[LANG] !== undefined ? v[LANG] : v[DEF];
      }
      return v;
    }

    function list(v) {
      var out = T(v);
      return Array.isArray(out) ? out.map(T) : [];
    }

    var UI = T(CV.ui) || {};
    var RES = UI.resume || {};
    var P = CV.profile || {};
    var roles = list(P.roles);

    function fmtDate(s) {
      if (!s) return UI.present || "Present";
      var d = parseDate(s);
      if (String(s).length <= 4) return String(d.getFullYear());
      try {
        var out = new Intl.DateTimeFormat(LOCALE, { month: "short", year: "numeric" }).format(d);
        return out.replace(/\.(?=\s)/, "").replace(/^\w/, function (c) {
          return c.toUpperCase();
        });
      } catch (e) {
        return s;
      }
    }

    function duration(start, end) {
      var a = parseDate(start);
      var b = end ? parseDate(end) : new Date();
      if (!a) return "";
      var months = (b.getFullYear() - a.getFullYear()) * 12 + (b.getMonth() - a.getMonth()) + 1;
      if (months < 1) months = 1;
      var y = Math.floor(months / 12);
      var m = months % 12;
      var parts = [];
      if (y) parts.push(y + " " + (y === 1 ? UI.year : UI.years));
      if (m) parts.push(m + " " + (m === 1 ? UI.month : UI.months));
      return parts.join(" ");
    }

    function levelLabel(lvl) {
      var levels = CV.skillLevels || [];
      for (var i = 0; i < levels.length; i++) {
        if (lvl >= levels[i].min) return T(levels[i].label);
      }
      return "";
    }

    function formatNum(n, dec) {
      try {
        return new Intl.NumberFormat(LOCALE, { minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n);
      } catch (e) {
        return n.toFixed(dec);
      }
    }

    function enabledSections() {
      return (CV.sections || []).filter(function (s) {
        return s.enabled !== false && RENDERERS[s.id];
      });
    }

    function resumeUrl() {
      return T(P.resumeUrl) || "";
    }

    function resumeButton(cls, label) {
      var text = label || T(CV.hero && CV.hero.ctaSecondary && CV.hero.ctaSecondary.label) || "CV";
      var url = resumeUrl();
      if (url) {
        return '<a class="btn ' + cls + '" href="' + attrUrl(url) + '" download>' + icon("download") + "<span>" + esc(text) + "</span></a>";
      }
      return '<button class="btn ' + cls + '" type="button" data-print>' + icon("download") + "<span>" + esc(text) + "</span></button>";
    }

    function socialButtons(items) {
      return (items || [])
        .map(function (s) {
          var label = T(s.label) || s.type;
          return '<a class="icon-btn" ' + linkAttrs(s.url) + ' aria-label="' + esc(label) + '" title="' + esc(label) + '">' + icon(s.type) + "</a>";
        })
        .join("");
    }

    // El <h2> incluye el nombre estándar de la sección ("Experiencia", "Habilidades"…)
    // además del titular creativo: así los ATS/IA identifican cada bloque del CV.
    function heading(s, index) {
      return (
        '<h2 class="section-heading" id="' + esc(s.id) + '-title">' +
        '<span class="eyebrow">' + deco(pad(index + 1) + ".", "eyebrow__num") + esc(T(s.eyebrow) || T(s.nav)) + "</span>" +
        '<span class="visually-hidden">: </span>' +
        '<span class="section-title">' + esc(T(s.title)) + "</span>" +
        "</h2>"
      );
    }

    function sectionHead(s, index) {
      return (
        '<header class="section-head reveal">' +
        heading(s, index) +
        (s.subtitle ? '<p class="section-sub">' + esc(T(s.subtitle)) + "</p>" : "") +
        "</header>"
      );
    }

    function wrapSection(s, index, inner, noHead) {
      return (
        '<section class="section ' + esc(s.id) + '" id="' + esc(s.id) + '" aria-labelledby="' + esc(s.id) + '-title">' +
        '<div class="container">' +
        (noHead ? "" : sectionHead(s, index)) +
        inner +
        "</div></section>"
      );
    }

    function tags(arr) {
      return (arr || []).length
        ? '<div class="tags">' +
            arr
              .map(function (t) {
                return '<span class="tag">' + esc(T(t)) + "</span>";
              })
              .join(" ") +
            "</div>"
        : "";
    }

    /* ---------------------------------------------------------------------- Navegación */
    function langSwitch() {
      if (LANGS.length < 2) return "";
      return (
        '<div class="lang-switch" role="group" aria-label="' + esc(UI.langLabel) + '">' +
        LANGS.map(function (l) {
          var name = (T(CV.ui) && CV.ui[l] && CV.ui[l].langName) || l;
          return (
            '<button type="button" data-lang="' + esc(l) + '" lang="' + esc(l) + '" aria-pressed="' + (l === LANG) + '" title="' + esc(name) + '">' +
            esc(l.toUpperCase()) +
            "</button>"
          );
        }).join(" ") +
        "</div>"
      );
    }

    function nav() {
      var initials = P.initials || initialsOf(P.name);
      var first = String(P.name || "").split(" ")[0];
      var secs = enabledSections();
      var cvLabel = T(CV.hero && CV.hero.ctaSecondary && CV.hero.ctaSecondary.label) || "CV";

      return (
        '<div class="container nav__inner">' +
        '<a class="brand" href="#top" aria-label="' + esc(P.name) + '">' +
        '<span class="brand__mark" aria-hidden="true" data-t="' + esc(initials) + '"></span>' +
        '<span class="brand__text" aria-hidden="true" data-t="' + esc(first.toLowerCase()) + '">' + deco(".dev") + "</span>" +
        "</a>" +
        '<nav class="nav__links" aria-label="' + esc(UI.mainNav || "Main") + '">' +
        secs
          .map(function (s) {
            return '<a class="nav__link" href="#' + esc(s.id) + '" data-spy="' + esc(s.id) + '">' + esc(T(s.nav)) + "</a>";
          })
          .join(" ") +
        "</nav>" +
        '<div class="nav__actions">' +
        langSwitch() +
        '<button class="icon-btn theme-toggle" type="button" data-theme-toggle aria-label="' + esc(UI.theme) + '" title="' + esc(UI.theme) + '">' +
        icon("moon", "icon--moon") + icon("sun", "icon--sun") +
        "</button>" +
        resumeButton("btn--primary btn--sm nav__cta", cvLabel) +
        '<button class="icon-btn nav__toggle" type="button" aria-expanded="false" aria-controls="mobileMenu" aria-label="' + esc(UI.menu) + '">' +
        icon("menu") +
        "</button>" +
        "</div>" +
        "</div>" +
        '<div class="mobile-menu" id="mobileMenu">' +
        secs
          .map(function (s, i) {
            return '<a href="#' + esc(s.id) + '">' + esc(T(s.nav)) + deco(pad(i + 1)) + "</a>";
          })
          .join(" ") +
        resumeButton("btn--primary", cvLabel) +
        "</div>"
      );
    }

    /* ---------------------------------------------------------------------- Hero */
    function codeLines() {
      // Todo el código es decorativo: cada token se pinta vía data-t (ver deco())
      var h = CV.hero || {};
      var _ = function (t) {
        return deco(t);
      };
      var Pn = function (t) {
        return deco(t, "tk-p");
      };
      var S = function (t) {
        return deco('"' + t + '"', "tk-s");
      };
      var K = function (t) {
        return deco(t, "tk-prop");
      };
      var stack = P.mainStack || [];
      var lines = [];

      if (h.codeComment) lines.push(deco("// " + T(h.codeComment), "tk-c"));
      lines.push(deco("const", "tk-k") + _(" ") + deco("developer", "tk-v") + _(" ") + Pn("=") + _(" ") + Pn("{"));
      lines.push(_("  ") + K("name") + Pn(":") + _(" ") + S(P.name) + Pn(","));
      lines.push(_("  ") + K("role") + Pn(":") + _(" ") + S(roles[0] || "") + Pn(","));
      if (P.location) lines.push(_("  ") + K("location") + Pn(":") + _(" ") + S(T(P.location)) + Pn(","));
      if (stack.length) {
        lines.push(_("  ") + K("stack") + Pn(":") + _(" ") + Pn("["));
        for (var i = 0; i < stack.length; i += 2) {
          lines.push(_("    ") + stack.slice(i, i + 2).map(S).join(Pn(",") + _(" ")) + Pn(","));
        }
        lines.push(_("  ") + Pn("],"));
      }
      var open = P.availability ? !!P.availability.open : true;
      lines.push(_("  ") + K("available") + Pn(":") + _(" ") + deco(String(open), "tk-b") + Pn(","));
      lines.push(_("  ") + deco("hireMe", "tk-f") + Pn("()") + _(" ") + Pn("{"));
      lines.push(_("    ") + deco("return", "tk-k") + _(" ") + S(T(h.codeReturn) || "Let's talk!") + Pn(";"));
      lines.push(_("  ") + Pn("},"));
      lines.push(Pn("};"));

      return lines
        .map(function (l, k) {
          return '<span class="code-line' + (k === lines.length - 3 ? " is-cursor" : "") + '" style="--i:' + k + '">' + l + "</span>";
        })
        .join("");
    }

    function marquee() {
      var items = [];
      if (CV.marquee && CV.marquee.length) {
        items = CV.marquee.map(function (m) {
          return typeof m === "string" ? { name: m } : m;
        });
      } else {
        (CV.skills || []).forEach(function (c) {
          (c.items || []).forEach(function (s) {
            items.push(s);
          });
        });
      }
      if (!items.length) return "";
      var group = items
        .map(function (s) {
          var ic = s.icon ? '<i class="' + esc(s.icon) + (s.colored === false ? "" : " colored") + '" aria-hidden="true"></i>' : "";
          return '<span class="marquee__item">' + ic + deco(s.name) + "</span>";
        })
        .join("");
      // Decorativa: las tecnologías ya aparecen en la sección de habilidades
      return (
        '<div class="marquee-wrap" aria-hidden="true">' +
        deco(UI.techMarquee, "marquee-wrap__label") +
        '<div class="marquee"><div class="marquee__track">' +
        '<div class="marquee__group">' + group + "</div>" +
        '<div class="marquee__group">' + group + "</div>" +
        "</div></div></div>"
      );
    }

    // Línea de contacto en texto plano para la versión impresa / PDF (en pantalla está oculta
    // porque los mismos datos aparecen en la sección de contacto y en los iconos).
    function printContact() {
      var items = [];
      if (P.email) items.push(esc(P.email));
      if (P.phone) items.push(esc(P.phone));
      if (P.location) items.push(esc(T(P.location)));
      if (P.website || meta.url) items.push(esc(String(P.website || meta.url).replace(/^https?:\/\//, "")));
      (P.socials || []).forEach(function (s) {
        if (isExternal(s.url)) items.push(esc(String(s.url).replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")));
      });
      if (!items.length) return "";
      return (
        '<ul class="hero__contact print-only">' +
        items
          .map(function (i) {
            return "<li>" + i + "</li>";
          })
          .join(" ") +
        "</ul>"
      );
    }

    function hero() {
      var h = CV.hero || {};
      var av = P.availability || {};
      var nameParts = String(P.name || "").split(" ");
      var last = nameParts.length > 1 ? nameParts.pop() : "";
      var firstNames = nameParts.join(" ");
      var primary = h.ctaPrimary || { label: "Projects", href: "#projects" };
      var avText = T(av.text);

      var badges = (h.badges || [])
        .slice(0, 3)
        .map(function (b, i) {
          return (
            '<div class="float-badge float-badge--' + (i + 1) + '">' +
            '<span class="float-badge__icon">' + icon(b.icon || "sparkles") + "</span>" +
            deco(T(b.text)) +
            "</div>"
          );
        })
        .join("");

      return (
        '<section class="hero" id="top" aria-label="' + esc(P.name) + '">' +
        '<div class="container hero__grid">' +
        '<div class="hero__content">' +
        (avText ? '<span class="pill reveal"><span class="pulse-dot' + (av.open === false ? " pulse-dot--off" : "") + '"></span>' + esc(avText) + "</span>" : "") +
        '<p class="hero__hello reveal" style="--d:80ms">' + deco("👋", "wave") + " " + esc(T(h.hello)) + "</p>" +
        '<h1 class="hero__name reveal" style="--d:140ms">' + esc(firstNames) + (last ? ' <span class="grad-text">' + esc(last) + "</span>" : "") + "</h1>" +
        // El rol completo queda en el HTML para lectores (IA, ATS, lectores de pantalla);
        // el efecto de escritura es solo visual.
        '<p class="hero__role reveal" style="--d:220ms">' + deco(">", "prompt") +
        '<span class="hero__roles-text">' + esc(roles.join(" · ")) + "</span>" +
        '<span class="typed" data-typed aria-hidden="true" data-t="' + esc(roles[0] || "") + '"></span><span class="caret" aria-hidden="true"></span></p>' +
        '<p class="hero__tagline reveal" style="--d:300ms">' + esc(T(P.tagline)) + "</p>" +
        printContact() +
        '<div class="hero__cta reveal" style="--d:380ms">' +
        '<a class="btn btn--primary" href="' + attrUrl(primary.href) + '"><span>' + esc(T(primary.label)) + "</span>" + icon("arrow-right", "icon--arrow") + "</a> " +
        resumeButton("btn--ghost") +
        "</div>" +
        '<div class="hero__socials reveal" style="--d:460ms">' +
        (UI.follow ? deco(UI.follow, "hero__socials-label") : "") +
        socialButtons(P.socials) +
        "</div>" +
        "</div>" +
        '<div class="hero__visual reveal" style="--d:250ms" aria-hidden="true">' +
        '<div class="code-window">' +
        '<div class="code-window__head"><div class="code-window__dots"><span></span><span></span><span></span></div>' +
        '<span class="code-window__tab">' + deco("TS", "ts") + deco(h.codeFile || "developer.ts") + "</span></div>" +
        '<div class="code-window__body"><code>' + codeLines() + "</code></div>" +
        '<div class="code-window__foot"><span>' + deco("●", "ok") + deco("main") + "</span>" + deco("TypeScript · UTF-8") + "</div>" +
        "</div>" +
        badges +
        "</div>" +
        "</div>" +
        '<a class="scroll-hint" href="#' + esc((enabledSections()[0] || {}).id || "main") + '" aria-hidden="true" tabindex="-1"><span class="scroll-hint__mouse"></span>' + deco(UI.scroll) + "</a>" +
        "</section>" +
        marquee()
      );
    }

    /* ---------------------------------------------------------------------- Secciones */
    var RENDERERS = {
      about: function (s, i) {
        var a = CV.about || {};
        var av = P.availability || {};
        var avText = T(av.text);
        var initials = P.initials || initialsOf(P.name);

        var media = P.photo
          ? '<img src="' + attrUrl(P.photo) + '" alt="' + esc(P.name) + '" loading="lazy" />'
          : deco(initials, "profile-card__initials");

        var facts = (a.facts || [])
          .map(function (f, k) {
            return (
              '<div class="fact card reveal" style="--d:' + k * 70 + 'ms">' +
              '<span class="fact__icon">' + icon(f.icon || "sparkles") + "</span>" +
              '<dl><dt class="fact__label">' + esc(T(f.label)) + '</dt><dd class="fact__value">' + esc(T(f.value)) + "</dd></dl>" +
              "</div>"
            );
          })
          .join("");

        var stats = (CV.stats || [])
          .map(function (st) {
            var dec = st.decimals || 0;
            return (
              '<div class="stat">' +
              '<div class="stat__value"><span class="grad-text" data-count="' + esc(st.value) + '" data-decimals="' + dec + '" data-suffix="' + esc(st.suffix || "") + '">' +
              esc(formatNum(st.value, dec)) + esc(st.suffix || "") +
              "</span></div>" +
              '<div class="stat__label">' + esc(T(st.label)) + "</div>" +
              "</div>"
            );
          })
          .join("");

        var inner =
          '<div class="about__grid">' +
          '<aside class="profile-card card reveal">' +
          '<div class="profile-card__media">' + media +
          (avText ? '<span class="profile-card__status"><span class="pulse-dot' + (av.open === false ? " pulse-dot--off" : "") + '"></span>' + esc(avText) + "</span>" : "") +
          "</div>" +
          '<div class="profile-card__body">' +
          '<p class="profile-card__name">' + esc(P.name) + "</p>" +
          '<p class="profile-card__role">' + esc(roles[0] || "") + "</p>" +
          '<div class="profile-card__socials">' + socialButtons(P.socials) + "</div>" +
          "</div>" +
          "</aside>" +
          "<div>" +
          '<div class="about__text reveal">' +
          list(a.paragraphs)
            .map(function (t) {
              return "<p>" + rich(t) + "</p>";
            })
            .join("") +
          "</div>" +
          (facts ? '<div class="facts">' + facts + "</div>" : "") +
          (stats ? '<div class="stats card reveal">' + stats + "</div>" : "") +
          "</div>" +
          "</div>";

        return wrapSection(s, i, inner);
      },

      skills: function (s, i) {
        var cards = (CV.skills || [])
          .map(function (cat, k) {
            var items = (cat.items || [])
              .map(function (it, j) {
                var logo = it.icon
                  ? '<i class="' + esc(it.icon) + (it.colored === false ? "" : " colored") + '" aria-hidden="true"></i>'
                  : deco(initialsOf(it.name).slice(0, 2), "mono");
                var has = it.level != null;
                var lvl = Math.max(0, Math.min(100, +it.level || 0));
                return (
                  '<li class="skill">' +
                  '<div class="skill__row">' +
                  '<span class="skill__logo">' + logo + "</span>" +
                  '<div class="skill__info">' +
                  '<div class="skill__top"><span class="skill__name">' + esc(it.name) + "</span>" +
                  (has ? ' <span class="skill__level">' + esc(levelLabel(lvl)) + "</span>" : "") +
                  "</div>" +
                  (has ? '<div class="skill__bar" aria-hidden="true"><span style="--w:' + lvl + "%;--d:" + (200 + j * 90) + 'ms"></span></div>' : "") +
                  "</div></div></li>"
                );
              })
              .join("");
            return (
              '<article class="skill-card card reveal" style="--d:' + k * 90 + 'ms">' +
              '<div class="skill-card__head">' +
              '<span class="skill-card__icon">' + icon(cat.icon || "code") + "</span>" +
              '<div><h3 class="skill-card__title">' + esc(T(cat.category)) + "</h3>" + deco((cat.items || []).length + " " + UI.skillsCount, "skill-card__count") + "</div>" +
              "</div>" +
              '<ul class="skill-list">' + items + "</ul>" +
              "</article>"
            );
          })
          .join("");
        return wrapSection(s, i, '<div class="skills-grid">' + cards + "</div>");
      },

      experience: function (s, i) {
        var items = (CV.experience || [])
          .map(function (e, k) {
            var current = !e.end;
            var achievements = list(e.achievements);
            var company = e.url
              ? '<a class="tl-company" ' + linkAttrs(e.url) + ">" + esc(T(e.company)) + icon("arrow-up-right") + "</a>"
              : '<span class="tl-company">' + esc(T(e.company)) + "</span>";
            return (
              '<li class="tl-item reveal' + (current ? " is-current" : "") + '" style="--d:' + k * 60 + 'ms">' +
              '<span class="tl-dot" aria-hidden="true"></span>' +
              '<article class="tl-card card">' +
              // Orden en el HTML: puesto → empresa → fechas (el orden clásico que esperan los ATS).
              // Visualmente las fechas siguen a la izquierda gracias a CSS (order).
              '<div class="tl-head">' +
              '<div class="tl-head__row"><h3 class="tl-role">' + esc(T(e.role)) + "</h3>" +
              (current ? ' <span class="tl-current"><span class="pulse-dot"></span>' + esc(UI.current) + "</span>" : "") +
              "</div> " +
              company +
              "</div> " +
              '<div class="tl-meta">' +
              '<span class="tl-date"><time datetime="' + esc(e.start) + '">' + esc(fmtDate(e.start)) + "</time> — " +
              (e.end ? '<time datetime="' + esc(e.end) + '">' + esc(fmtDate(e.end)) + "</time>" : esc(UI.present)) + "</span> " +
              '<span class="tl-duration">' + icon("clock") + esc(duration(e.start, e.end)) + "</span> " +
              (e.location ? '<span class="tl-meta__row">' + icon("map-pin") + esc(T(e.location)) + "</span> " : "") +
              (e.type ? '<span class="tl-meta__row">' + icon("briefcase") + esc(T(e.type)) + "</span>" : "") +
              "</div> " +
              '<div class="tl-content">' +
              (e.summary ? '<p class="tl-summary">' + rich(T(e.summary)) + "</p>" : "") +
              (achievements.length
                ? '<ul class="tl-achievements">' +
                  achievements
                    .map(function (a) {
                      return "<li>" + icon("check") + "<span>" + rich(a) + "</span></li>";
                    })
                    .join("") +
                  "</ul>"
                : "") +
              tags(e.stack) +
              "</div>" +
              "</article>" +
              "</li>"
            );
          })
          .join("");
        return wrapSection(s, i, '<ol class="timeline">' + items + "</ol>");
      },

      projects: function (s, i) {
        var projects = (CV.projects || []).slice().sort(function (a, b) {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        });

        var cats = [];
        projects.forEach(function (p) {
          list(p.category).forEach(function (c) {
            if (cats.indexOf(c) === -1) cats.push(c);
          });
        });

        var filters =
          cats.length > 1
            ? '<div class="filters reveal" role="toolbar" aria-label="' + esc(UI.filterProjects) + '">' +
              '<button class="filter" type="button" data-filter="*" aria-pressed="true">' + esc(UI.all) + deco(projects.length, "filter__count") + "</button> " +
              cats
                .map(function (c) {
                  var n = projects.filter(function (p) {
                    return list(p.category).indexOf(c) !== -1;
                  }).length;
                  return '<button class="filter" type="button" data-filter="' + esc(c) + '" aria-pressed="false">' + esc(c) + deco(n, "filter__count") + "</button>";
                })
                .join(" ") +
              "</div>"
            : "";

        var cards = projects
          .map(function (p, k) {
            var cv = p.cover || COVERS[k % COVERS.length];
            var c1 = Array.isArray(cv) ? cv[0] : cv.from;
            var c2 = Array.isArray(cv) ? cv[1] : cv.to;
            var title = T(p.title);
            var words = String(title || "").split(" ");
            var cover = p.image
              ? '<img src="' + attrUrl(p.image) + '" alt="' + esc(title) + '" loading="lazy" />'
              : '<div class="cover-gen" style="--c1:' + esc(c1) + ";--c2:" + esc(c2) + '" aria-hidden="true">' +
                '<div class="cover-gen__inner"></div>' +
                '<div class="cover-gen__window"><div class="cover-gen__bar"><span></span><span></span><span></span></div>' +
                '<div class="cover-gen__content"><div class="cover-gen__title">' + deco(words[0]) + deco(words.length > 1 ? "." + words.slice(1).join("").toLowerCase() : "()", "cover-gen__ext") + "</div>" +
                '<div class="cover-gen__line"></div><div class="cover-gen__line"></div><div class="cover-gen__line"></div></div></div>' +
                "</div>";

            var links = p.links || {};
            var linkHtml =
              (links.demo ? '<a class="icon-btn" ' + linkAttrs(links.demo) + ' aria-label="' + esc(UI.demo) + ": " + esc(title) + '" title="' + esc(UI.demo) + '">' + icon("external") + "</a>" : "") +
              (links.code ? '<a class="icon-btn" ' + linkAttrs(links.code) + ' aria-label="' + esc(UI.code) + ": " + esc(title) + '" title="' + esc(UI.code) + '">' + icon("github") + "</a>" : "");

            return (
              '<article class="project card reveal" style="--d:' + (k % 3) * 90 + 'ms" data-cats="' + esc(list(p.category).join("|")) + '">' +
              '<div class="project__cover">' +
              (p.featured ? '<span class="project__badge">' + icon("star") + esc(UI.featured) + "</span>" : "") +
              cover +
              "</div>" +
              '<div class="project__body">' +
              '<div class="project__top"><h3 class="project__title">' + esc(title) + "</h3>" +
              (linkHtml ? '<div class="project__links">' + linkHtml + "</div>" : "") +
              "</div>" +
              '<p class="project__desc">' + rich(T(p.description)) + "</p>" +
              (p.metric ? '<p class="project__metric">' + icon("trending") + esc(T(p.metric)) + "</p>" : "") +
              tags(p.tags) +
              "</div>" +
              "</article>"
            );
          })
          .join("");

        return wrapSection(s, i, filters + '<div class="projects-grid">' + cards + "</div>");
      },

      education: function (s, i) {
        var edu = (CV.education || [])
          .map(function (e, k) {
            return (
              '<li class="edu-item card reveal" style="--d:' + k * 80 + 'ms">' +
              '<span class="edu-item__icon">' + icon("graduation") + "</span>" +
              "<div>" +
              '<h4 class="edu-item__title">' + esc(T(e.degree)) + "</h4>" +
              '<p class="edu-item__org">' + esc(T(e.institution)) + "</p> " +
              '<span class="edu-item__date">' + esc(fmtDate(e.start)) + " — " + esc(fmtDate(e.end)) + "</span>" +
              (e.description ? '<p class="edu-item__desc">' + rich(T(e.description)) + "</p>" : "") +
              "</div></li>"
            );
          })
          .join("");

        var certs = (CV.certifications || [])
          .map(function (c, k) {
            return (
              '<li class="edu-item card reveal" style="--d:' + k * 80 + 'ms">' +
              '<span class="edu-item__icon">' + icon("award") + "</span>" +
              "<div>" +
              '<h4 class="edu-item__title">' + esc(T(c.name)) + "</h4>" +
              '<p class="edu-item__org">' + esc(T(c.issuer)) + "</p> " +
              (c.date ? '<span class="edu-item__date">' + esc(c.date) + "</span>" : "") +
              (c.url ? '<br><a class="edu-item__link" ' + linkAttrs(c.url) + ">" + esc(UI.viewCredential) + icon("arrow-up-right") + "</a>" : "") +
              "</div></li>"
            );
          })
          .join("");

        var inner =
          '<div class="edu-grid">' +
          (edu ? '<div><h3 class="edu-col__title reveal">' + icon("graduation") + esc(UI.education) + '</h3><ul class="edu-list">' + edu + "</ul></div>" : "") +
          (certs ? '<div><h3 class="edu-col__title reveal">' + icon("award") + esc(UI.certifications) + '</h3><ul class="edu-list">' + certs + "</ul></div>" : "") +
          "</div>";
        return wrapSection(s, i, inner);
      },

      testimonials: function (s, i) {
        var stars = "";
        for (var n = 0; n < 5; n++) stars += icon("star");
        var cards = (CV.testimonials || [])
          .map(function (t, k) {
            var av = t.avatar ? '<img src="' + attrUrl(t.avatar) + '" alt="" loading="lazy" />' : deco(initialsOf(T(t.name)));
            return (
              '<figure class="testimonial card reveal" style="--d:' + k * 90 + 'ms">' +
              icon("quote", "testimonial__quote-icon") +
              '<div class="testimonial__stars" aria-hidden="true">' + stars + "</div>" +
              '<blockquote class="testimonial__text">“' + esc(T(t.quote)) + "”</blockquote>" +
              '<figcaption class="testimonial__author"><span class="avatar" aria-hidden="true">' + av + "</span>" +
              '<div><div class="testimonial__name">' + esc(T(t.name)) + '</div><div class="testimonial__role">' + esc(T(t.role)) + "</div></div>" +
              "</figcaption>" +
              "</figure>"
            );
          })
          .join("");
        return wrapSection(s, i, '<div class="testimonials-grid">' + cards + "</div>");
      },

      contact: function (s, i) {
        var items = "";
        if (P.email) {
          items +=
            '<div class="contact-item contact-item--email">' +
            '<span class="contact-item__icon">' + icon("mail") + "</span>" +
            '<a class="contact-item__body" href="mailto:' + esc(P.email) + '"><div class="contact-item__label">Email</div><div class="contact-item__value">' + esc(P.email) + "</div></a>" +
            '<button class="icon-btn copy-btn" type="button" data-copy="' + esc(P.email) + '" aria-label="' + esc(UI.copy) + '" title="' + esc(UI.copy) + '">' + icon("copy") + "</button>" +
            "</div>";
        }
        if (P.phone) {
          items +=
            '<a class="contact-item" href="tel:' + esc(String(P.phone).replace(/[^\d+]/g, "")) + '">' +
            '<span class="contact-item__icon">' + icon("phone") + "</span>" +
            '<div class="contact-item__body"><div class="contact-item__label">' + esc(UI.phone) + '</div><div class="contact-item__value">' + esc(P.phone) + "</div></div>" +
            "</a>";
        }
        if (P.location) {
          items +=
            '<div class="contact-item">' +
            '<span class="contact-item__icon">' + icon("map-pin") + "</span>" +
            '<div class="contact-item__body"><div class="contact-item__label">' + esc(UI.location) + '</div><div class="contact-item__value">' + esc(T(P.location)) + "</div></div>" +
            "</div>";
        }

        var inner =
          '<div class="contact-card reveal">' +
          "<div>" +
          heading(s, i) +
          (s.subtitle ? '<p class="section-sub">' + esc(T(s.subtitle)) + "</p>" : "") +
          '<address class="contact-list">' + items + "</address>" +
          '<div class="contact-socials">' + socialButtons(P.socials) + "</div>" +
          "</div>" +
          '<form class="form" id="contactForm" novalidate>' +
          '<div class="form__row">' +
          '<div class="field"><label for="f-name">' + esc(UI.formName) + '</label><input id="f-name" name="name" type="text" autocomplete="name" required placeholder="' + esc(UI.formNamePh) + '" /></div>' +
          '<div class="field"><label for="f-email">' + esc(UI.formEmail) + '</label><input id="f-email" name="email" type="email" autocomplete="email" required placeholder="' + esc(UI.formEmailPh) + '" /></div>' +
          "</div>" +
          '<div class="field field--grow"><label for="f-msg">' + esc(UI.formMessage) + '</label><textarea id="f-msg" name="message" required placeholder="' + esc(UI.formMessagePh) + '"></textarea></div>' +
          '<div class="form__foot">' +
          '<button class="btn btn--primary" type="submit"><span>' + esc(UI.formSend) + "</span>" + icon("send", "icon--arrow") + "</button> " +
          (UI.formNote ? '<span class="form__note">' + icon("shield") + esc(UI.formNote) + "</span>" : "") +
          "</div>" +
          "</form>" +
          "</div>";

        return wrapSection(s, i, inner, true);
      },
    };

    function main() {
      var html = hero();
      enabledSections().forEach(function (s, i) {
        html += RENDERERS[s.id](s, i);
      });
      return html;
    }

    function footer() {
      var machine =
        UI.machineReadable
          ? '<p class="footer__machine">' + icon("file") + esc(UI.machineReadable) + ": " +
            '<a href="cv.' + esc(LANG) + '.md" type="text/markdown" hreflang="' + esc(LANG) + '">Markdown</a> · ' +
            '<a href="resume.' + esc(LANG) + '.json" type="application/json" hreflang="' + esc(LANG) + '">JSON Resume</a></p>'
          : "";
      return (
        '<div class="container footer__inner">' +
        '<div><p class="footer__copy">© ' + new Date().getFullYear() + " " + esc(P.name) + ". " + esc(UI.rights) + " · " + esc(UI.footer) +
        ' <span class="heart" aria-hidden="true">♥</span></p>' + machine + "</div>" +
        '<div class="footer__socials">' + socialButtons(P.socials) + "</div>" +
        "</div>"
      );
    }

    function customizer(opts) {
      opts = opts || {};
      var sw = Object.keys(PALETTES)
        .map(function (k) {
          return (
            '<button class="swatch" type="button" data-accent="' + k + '" aria-pressed="' + (k === opts.accent) + '" aria-label="' + k + '" title="' + k + '" style="--s1:' + PALETTES[k][0] + ";--s2:" + PALETTES[k][1] + '"></button>'
          );
        })
        .join("");
      return (
        '<div class="customizer__panel" id="customizerPanel" role="dialog" aria-label="' + esc(UI.customizerTitle) + '">' +
        '<p class="customizer__title">' + esc(UI.customizerTitle) + "</p>" +
        '<p class="customizer__label">' + esc(UI.customizerAccent) + "</p>" +
        '<div class="swatches">' + sw + "</div>" +
        '<p class="customizer__label">' + esc(UI.customizerMode) + "</p>" +
        '<div class="segmented">' +
        '<button type="button" data-mode="dark" aria-pressed="' + (opts.mode === "dark") + '">' + icon("moon") + esc(UI.dark) + "</button>" +
        '<button type="button" data-mode="light" aria-pressed="' + (opts.mode === "light") + '">' + icon("sun") + esc(UI.light) + "</button>" +
        "</div>" +
        '<p class="customizer__note">' + esc(UI.customizerNote) + "</p>" +
        "</div>" +
        '<button class="customizer__toggle" type="button" aria-expanded="false" aria-controls="customizerPanel" aria-label="' + esc(UI.customize) + '" title="' + esc(UI.customize) + '">' +
        icon("palette") +
        "</button>"
      );
    }

    /* ---------------------------------------------------------------------- Datos estructurados */
    function absUrl(u) {
      if (!u) return undefined;
      if (/^(https?:|mailto:)/i.test(u)) return u;
      return meta.url ? String(meta.url).replace(/\/?$/, "/") + String(u).replace(/^\.?\//, "") : undefined;
    }

    function jsonLd() {
      var current = (CV.experience || []).filter(function (e) {
        return !e.end;
      })[0];
      var knows = [];
      (CV.skills || []).forEach(function (c) {
        (c.items || []).forEach(function (s) {
          if (knows.indexOf(s.name) === -1) knows.push(s.name);
        });
      });

      var person = {
        "@type": "Person",
        name: P.name,
        jobTitle: roles[0],
        description: T(P.tagline),
        email: P.email ? "mailto:" + P.email : undefined,
        telephone: P.phone || undefined,
        url: meta.url || undefined,
        image: absUrl(P.photo),
        address: P.location ? { "@type": "PostalAddress", addressLocality: T(P.location) } : undefined,
        sameAs: (P.socials || [])
          .map(function (s) {
            return s.url;
          })
          .filter(isExternal),
        knowsAbout: knows,
        knowsLanguage: (P.languages || []).map(function (l) {
          return { "@type": "Language", name: T(l.name), alternateName: l.code };
        }),
        worksFor: current ? { "@type": "Organization", name: T(current.company), url: current.url || undefined } : undefined,
        hasOccupation: (CV.experience || []).map(function (e) {
          return {
            "@type": "Role",
            roleName: T(e.role),
            startDate: e.start,
            endDate: e.end || undefined,
            description: plain(T(e.summary)),
            memberOf: { "@type": "Organization", name: T(e.company) },
          };
        }),
        alumniOf: (CV.education || []).map(function (e) {
          return { "@type": "EducationalOrganization", name: T(e.institution) };
        }),
        hasCredential: (CV.education || [])
          .map(function (e) {
            return {
              "@type": "EducationalOccupationalCredential",
              name: T(e.degree),
              credentialCategory: "degree",
              recognizedBy: { "@type": "EducationalOrganization", name: T(e.institution) },
              dateCreated: e.end || undefined,
            };
          })
          .concat(
            (CV.certifications || []).map(function (c) {
              return {
                "@type": "EducationalOccupationalCredential",
                name: T(c.name),
                credentialCategory: "certification",
                recognizedBy: { "@type": "Organization", name: T(c.issuer) },
                dateCreated: c.date || undefined,
                url: c.url || undefined,
              };
            })
          ),
      };

      return JSON.stringify(
        {
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          inLanguage: LANG,
          name: T(meta.title),
          description: T(meta.description),
          url: meta.url || undefined,
          mainEntity: person,
        },
        null,
        2
      ).replace(/</g, "\\u003c");
    }

    return {
      lang: LANG,
      langs: LANGS,
      defaultLang: DEF,
      locale: LOCALE,
      ui: UI,
      res: RES,
      T: T,
      list: list,
      roles: roles,
      fmtDate: fmtDate,
      duration: duration,
      levelLabel: levelLabel,
      formatNum: formatNum,
      enabledSections: enabledSections,
      resumeUrl: resumeUrl,
      absUrl: absUrl,
      nav: nav,
      main: main,
      footer: footer,
      customizer: customizer,
      jsonLd: jsonLd,
      title: function () {
        return T(meta.title) || P.name;
      },
      description: function () {
        return T(meta.description) || T(P.tagline);
      },
    };
  }

  global.CVRender = {
    create: create,
    icon: icon,
    esc: esc,
    plain: plain,
    initialsOf: initialsOf,
    isExternal: isExternal,
    PALETTES: PALETTES,
  };
})(typeof window !== "undefined" ? window : globalThis);
