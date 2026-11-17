#!/usr/bin/env node
/* ==========================================================================
   BUILD — versión legible por IA, ATS y buscadores
   --------------------------------------------------------------------------
   Uso:  node tools/build.js        (sin dependencias, Node 18+)

   Lee data/cv.js y genera:
     · index.html     → contenido prerenderizado (HTML estático en el idioma
                         predeterminado), <title>, meta, hreflang y JSON-LD
     · cv.<lang>.md   → CV en Markdown limpio, uno por idioma
     · resume.<lang>.json + resume.json → formato estándar JSON Resume
     · llms.txt       → índice para agentes de IA (convención llmstxt.org)
     · robots.txt / sitemap.xml (sitemap solo si meta.url está definido)
   ========================================================================== */
"use strict";

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
const write = (f, s) => {
  fs.writeFileSync(path.join(ROOT, f), s);
  console.log("  ✓ " + f);
};

/* ---------- Cargar configuración y renderizador en un contexto aislado ---------- */
const sandbox = {};
sandbox.window = sandbox;
vm.createContext(sandbox);
vm.runInContext(read("data/cv.js"), sandbox, { filename: "data/cv.js" });
vm.runInContext(read("assets/js/render.js"), sandbox, { filename: "assets/js/render.js" });

// Copia "limpia" (objetos del contexto principal) para serializar sin sorpresas
const CV = JSON.parse(JSON.stringify(sandbox.CV));
const R = sandbox.CVRender;
const meta = CV.meta || {};
const P = CV.profile || {};
const LANGS = meta.languages && meta.languages.length ? meta.languages : ["es"];
const DEF = meta.defaultLang || LANGS[0];
const BASE = meta.url ? String(meta.url).replace(/\/?$/, "/") : "";
const abs = (f) => (BASE ? BASE + f : f);
const esc = R.esc;
const plain = R.plain;

/* ---------- Markdown ---------- */
function mdInline(s) {
  // Conserva negritas/cursivas del HTML y elimina el resto de etiquetas
  return plain(
    String(s == null ? "" : s)
      .replace(/<\/?(strong|b)>/gi, "**")
      .replace(/<\/?(em|i)>/gi, "_")
  );
}

function toMarkdown(v) {
  const { T, list, ui: UI, res: RES } = v;
  const out = [];
  const push = (...l) => out.push(...l);
  const sec = (id) => (CV.sections || []).find((s) => s.id === id && s.enabled !== false);

  push("# " + P.name, "");
  push("**" + v.roles.join(" · ") + "**", "");

  const contact = [];
  if (P.location) contact.push(UI.location + ": " + T(P.location));
  if (P.email) contact.push("Email: " + P.email);
  if (P.phone) contact.push(UI.phone + ": " + P.phone);
  if (P.website || meta.url) contact.push(UI.website + ": " + (P.website || meta.url));
  (P.socials || [])
    .filter((s) => R.isExternal(s.url))
    .forEach((s) => contact.push((T(s.label) || s.type) + ": " + s.url));
  contact.forEach((c) => push("- " + c));
  if (P.availability && T(P.availability.text)) push("- " + T(P.availability.text));
  push("");

  push("## " + RES.summary, "");
  push(mdInline(T(P.tagline)), "");
  if (sec("about")) list(CV.about && CV.about.paragraphs).forEach((p) => push(mdInline(p), ""));

  if (sec("experience") && (CV.experience || []).length) {
    push("## " + RES.experience, "");
    CV.experience.forEach((e) => {
      push("### " + T(e.role) + " — " + T(e.company));
      const metaLine = [v.fmtDate(e.start) + " – " + v.fmtDate(e.end) + " (" + v.duration(e.start, e.end) + ")"];
      if (e.location) metaLine.push(T(e.location));
      if (e.type) metaLine.push(T(e.type));
      push("_" + metaLine.join(" · ") + "_", "");
      if (e.summary) push(mdInline(T(e.summary)), "");
      list(e.achievements).forEach((a) => push("- " + mdInline(a)));
      if ((e.stack || []).length) push("", "**" + RES.stack + ":** " + e.stack.join(", "));
      push("");
    });
  }

  if (sec("skills") && (CV.skills || []).length) {
    push("## " + RES.skills, "");
    CV.skills.forEach((c) => {
      const items = (c.items || []).map((s) => s.name + (s.level != null ? " (" + v.levelLabel(s.level) + ")" : ""));
      push("- **" + T(c.category) + ":** " + items.join(", "));
    });
    push("");
  }

  if (sec("projects") && (CV.projects || []).length) {
    push("## " + RES.projects, "");
    CV.projects.forEach((p) => {
      push("### " + T(p.title), "");
      push(mdInline(T(p.description)));
      if (p.metric) push("", "- " + T(p.metric));
      if ((p.tags || []).length) push("- " + RES.stack + ": " + p.tags.join(", "));
      const l = p.links || {};
      if (l.demo) push("- " + UI.demo + ": " + l.demo);
      if (l.code) push("- " + UI.code + ": " + l.code);
      push("");
    });
  }

  if (sec("education")) {
    if ((CV.education || []).length) {
      push("## " + RES.education, "");
      CV.education.forEach((e) => {
        push("- **" + T(e.degree) + "** — " + T(e.institution) + " (" + v.fmtDate(e.start) + " – " + v.fmtDate(e.end) + ")" + (e.description ? ". " + mdInline(T(e.description)) : ""));
      });
      push("");
    }
    if ((CV.certifications || []).length) {
      push("## " + RES.certifications, "");
      CV.certifications.forEach((c) => {
        push("- **" + T(c.name) + "** — " + T(c.issuer) + (c.date ? " (" + c.date + ")" : "") + (c.url ? " · " + c.url : ""));
      });
      push("");
    }
  }

  if ((P.languages || []).length) {
    push("## " + RES.languages, "");
    P.languages.forEach((l) => push("- " + T(l.name) + ": " + T(l.level)));
    push("");
  }

  if (sec("testimonials") && (CV.testimonials || []).length) {
    push("## " + RES.references, "");
    CV.testimonials.forEach((t) => push("> " + T(t.quote), ">", "> — " + T(t.name) + ", " + T(t.role), ""));
  }

  const others = LANGS.filter((l) => l !== v.lang);
  if (others.length) {
    push("---", "");
    others.forEach((l) => push("- " + ((CV.ui[l] && CV.ui[l].langName) || l) + ": " + abs("cv." + l + ".md")));
    push("");
  }

  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim() + "\n";
}

/* ---------- JSON Resume (https://jsonresume.org/schema) ---------- */
function toJsonResume(v) {
  const { T, list } = v;
  const networks = { x: "X", twitter: "Twitter", github: "GitHub", linkedin: "LinkedIn", gitlab: "GitLab", dev: "DEV", youtube: "YouTube", stackoverflow: "Stack Overflow", dribbble: "Dribbble" };
  const clean = (o) => JSON.parse(JSON.stringify(o, (k, val) => (val === "" || val === null ? undefined : val)));
  return clean({
    $schema: "https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json",
    basics: {
      name: P.name,
      label: v.roles[0],
      image: v.absUrl(P.photo),
      email: P.email,
      phone: P.phone,
      url: P.website || meta.url,
      summary: [plain(T(P.tagline))].concat(list(CV.about && CV.about.paragraphs).map(plain)).join(" "),
      location: P.location ? { city: T(P.location) } : undefined,
      profiles: (P.socials || [])
        .filter((s) => R.isExternal(s.url))
        .map((s) => ({ network: networks[s.type] || T(s.label) || s.type, url: s.url })),
    },
    work: (CV.experience || []).map((e) => ({
      name: T(e.company),
      position: T(e.role),
      url: e.url,
      location: T(e.location),
      startDate: e.start,
      endDate: e.end || undefined,
      summary: plain(T(e.summary)),
      highlights: list(e.achievements).map(plain),
      keywords: e.stack,
    })),
    education: (CV.education || []).map((e) => ({
      institution: T(e.institution),
      studyType: T(e.degree),
      startDate: e.start,
      endDate: e.end,
      courses: e.description ? [plain(T(e.description))] : undefined,
    })),
    certificates: (CV.certifications || []).map((c) => ({ name: T(c.name), issuer: T(c.issuer), date: c.date, url: c.url })),
    skills: (CV.skills || []).map((c) => ({
      name: T(c.category),
      keywords: (c.items || []).map((s) => s.name),
    })),
    languages: (P.languages || []).map((l) => ({ language: T(l.name), fluency: T(l.level) })),
    projects: (CV.projects || []).map((p) => ({
      name: T(p.title),
      description: plain(T(p.description)),
      highlights: p.metric ? [T(p.metric)] : undefined,
      keywords: p.tags,
      url: (p.links && (p.links.demo || p.links.code)) || undefined,
    })),
    references: (CV.testimonials || []).map((t) => ({ name: T(t.name) + " — " + T(t.role), reference: T(t.quote) })),
    meta: { language: v.lang, lastModified: new Date().toISOString().slice(0, 10) },
  });
}

/* ---------- <head> ---------- */
function headBlock(v) {
  const title = v.title();
  const desc = v.description();
  const L = [];
  L.push("<title>" + esc(title) + "</title>");
  L.push('<meta name="description" content="' + esc(desc) + '" />');
  L.push('<meta name="author" content="' + esc(P.name) + '" />');
  if (BASE) L.push('<link rel="canonical" href="' + esc(BASE) + '" />');
  LANGS.forEach((l) => {
    L.push('<link rel="alternate" hreflang="' + l + '" href="' + esc(abs(l === DEF ? "" : "?lang=" + l) || "./") + '" />');
  });
  L.push('<link rel="alternate" hreflang="x-default" href="' + esc(BASE || "./") + '" />');
  L.push('<meta property="og:type" content="profile" />');
  L.push('<meta property="og:title" content="' + esc(title) + '" />');
  L.push('<meta property="og:description" content="' + esc(desc) + '" />');
  L.push('<meta property="og:locale" content="' + esc(String(v.locale).replace("-", "_")) + '" />');
  if (BASE) L.push('<meta property="og:url" content="' + esc(BASE) + '" />');
  if (meta.ogImage) L.push('<meta property="og:image" content="' + esc(v.absUrl(meta.ogImage) || meta.ogImage) + '" />');
  L.push("<!-- Versiones en texto para IA / ATS -->");
  LANGS.forEach((l) => {
    L.push('<link rel="alternate" type="text/markdown" hreflang="' + l + '" href="cv.' + l + '.md" title="CV (Markdown, ' + l.toUpperCase() + ')" />');
    L.push('<link rel="alternate" type="application/json" hreflang="' + l + '" href="resume.' + l + '.json" title="JSON Resume (' + l.toUpperCase() + ')" />');
  });
  L.push('<script type="application/ld+json" id="ld-json">\n' + v.jsonLd() + "\n</script>");
  return "\n    " + L.join("\n    ") + "\n    ";
}

function replaceBlock(html, name, content) {
  const re = new RegExp("(<!--prerender:" + name + "-->)[\\s\\S]*?(<!--/prerender:" + name + "-->)");
  if (!re.test(html)) throw new Error("No se encontró el marcador prerender:" + name + " en index.html");
  return html.replace(re, (m, a, b) => a + content + b);
}

/* ---------- Ejecutar ---------- */
console.log("Generando versión legible por IA/ATS…");
const views = {};
LANGS.forEach((l) => (views[l] = R.create(CV, l)));
const v0 = views[DEF];

let html = read("index.html");
html = html.replace(/<html lang="[^"]*"/, '<html lang="' + DEF + '"');
html = replaceBlock(html, "head", headBlock(v0));
html = replaceBlock(html, "nav", v0.nav());
html = replaceBlock(html, "main", v0.main());
html = replaceBlock(html, "footer", v0.footer());
html = html.replace(/(<a class="skip-link" href="#main">)[^<]*(<\/a>)/, "$1" + esc(v0.ui.skipLink) + "$2");
write("index.html", html);

LANGS.forEach((l) => {
  write("cv." + l + ".md", toMarkdown(views[l]));
  write("resume." + l + ".json", JSON.stringify(toJsonResume(views[l]), null, 2) + "\n");
});
write("resume.json", JSON.stringify(toJsonResume(v0), null, 2) + "\n");

const llms = [
  "# " + P.name + " — " + v0.roles[0],
  "",
  "> " + plain(v0.T(P.tagline)),
  "",
  "Este sitio es el currículum online de " + P.name + ". / This site is the online resume of " + P.name + ".",
  "",
  "## CV",
  "",
]
  .concat(LANGS.map((l) => "- [CV · " + ((CV.ui[l] && CV.ui[l].langName) || l) + " (Markdown)](" + abs("cv." + l + ".md") + ")"))
  .concat(LANGS.map((l) => "- [JSON Resume · " + ((CV.ui[l] && CV.ui[l].langName) || l) + "](" + abs("resume." + l + ".json") + ")"))
  .concat(["", "## Contact", "", "- Email: " + (P.email || "")])
  .join("\n");
write("llms.txt", llms + "\n");

write("robots.txt", "User-agent: *\nAllow: /\n" + (BASE ? "\nSitemap: " + BASE + "sitemap.xml\n" : ""));
if (BASE) {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [""].concat(LANGS.map((l) => "cv." + l + ".md"));
  write(
    "sitemap.xml",
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls.map((u) => "  <url><loc>" + esc(BASE + u) + "</loc><lastmod>" + today + "</lastmod></url>").join("\n") +
      "\n</urlset>\n"
  );
}
console.log("Listo.");
