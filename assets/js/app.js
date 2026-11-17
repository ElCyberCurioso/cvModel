/* ==========================================================================
   CV / PORTFOLIO TEMPLATE — Lógica del navegador
   Pinta la página con CVRender (assets/js/render.js) y añade interacciones:
   idioma, tema, menú, filtros, animaciones, formulario…
   ========================================================================== */
(function () {
  "use strict";

  var CV = window.CV;
  var R = window.CVRender;
  if (!CV || !R) {
    document.getElementById("main").innerHTML =
      '<p class="noscript">No se encontró data/cv.js o assets/js/render.js.</p>';
    return;
  }

  var root = document.documentElement;
  var reduceMotion = root.classList.contains("no-motion");
  var icon = R.icon;
  var esc = R.esc;
  var view; // renderizador del idioma activo
  var UI = {};
  var lang = window.__CV_LANG || (CV.meta && CV.meta.defaultLang) || "es";

  function $(sel, ctx) {
    return (ctx || document).querySelector(sel);
  }

  function $$(sel, ctx) {
    return Array.prototype.slice.call((ctx || document).querySelectorAll(sel));
  }

  function store(k, v) {
    try {
      localStorage.setItem(k, v);
    } catch (e) {}
  }

  /* ------------------------------------------------------------------------
     Montaje (se repite al cambiar de idioma)
     ------------------------------------------------------------------------ */
  function mount(instant) {
    view = R.create(CV, lang);
    lang = view.lang;
    UI = view.ui;

    $("#nav").innerHTML = view.nav();
    $("#main").innerHTML = view.main();
    $("#footer").innerHTML = view.footer();

    var cz = $("#customizer");
    if (CV.theme && CV.theme.customizer) {
      cz.className = "customizer";
      cz.innerHTML = view.customizer({ accent: root.getAttribute("data-accent"), mode: root.getAttribute("data-theme") });
    }

    setMeta();
    setupObservers(instant);
    startTyped();
    bindForm();
    onScroll();
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    store("cv-lang", next);
    try {
      var url = new URL(window.location.href);
      if (next === view.defaultLang) url.searchParams.delete("lang");
      else url.searchParams.set("lang", next);
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) {}
    mount(true);
  }

  /* ------------------------------------------------------------------------
     Metadatos, favicon y datos estructurados
     ------------------------------------------------------------------------ */
  function setMeta() {
    root.setAttribute("lang", lang);
    document.title = view.title();
    var set = function (sel, val) {
      var el = $(sel);
      if (el && val) el.setAttribute("content", val);
    };
    set('meta[name="description"]', view.description());
    set('meta[property="og:title"]', view.title());
    set('meta[property="og:description"]', view.description());
    set('meta[property="og:locale"]', String(view.locale).replace("-", "_"));

    var skip = $(".skip-link");
    if (skip) skip.textContent = UI.skipLink;
    var tt = $("#toTop");
    tt.innerHTML = icon("arrow-up");
    tt.setAttribute("aria-label", UI.toTop);

    var ld = $("#ld-json");
    if (!ld) {
      ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.id = "ld-json";
      document.head.appendChild(ld);
    }
    ld.textContent = view.jsonLd();
    updateFavicon();
  }

  function updateFavicon() {
    var p = CV.profile || {};
    var cs = getComputedStyle(root);
    var c1 = cs.getPropertyValue("--accent").trim() || "#8b5cf6";
    var c2 = cs.getPropertyValue("--accent-2").trim() || "#22d3ee";
    var txt = esc(p.initials || R.initialsOf(p.name));
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="' + c1 + '"/><stop offset="1" stop-color="' + c2 + '"/></linearGradient></defs>' +
      '<rect width="64" height="64" rx="16" fill="url(#g)"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="ui-monospace,Menlo,Consolas,monospace" font-size="26" font-weight="700" fill="#fff">' + txt + "</text></svg>";
    var link = $('link[rel="icon"]');
    if (!link) {
      link = document.createElement("link");
      link.rel = "icon";
      document.head.appendChild(link);
    }
    link.href = "data:image/svg+xml," + encodeURIComponent(svg);
    var theme = $('meta[name="theme-color"]');
    if (theme) theme.setAttribute("content", cs.getPropertyValue("--bg").trim());
  }

  /* ------------------------------------------------------------------------
     Tema y acento
     ------------------------------------------------------------------------ */
  function setMode(mode) {
    root.setAttribute("data-theme", mode);
    if (CV.theme && CV.theme.customizer) store("cv-mode", mode);
    $$("[data-mode]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === mode));
    });
    updateFavicon();
  }

  function setAccent(name) {
    root.style.removeProperty("--accent");
    root.style.removeProperty("--accent-2");
    root.setAttribute("data-accent", name);
    store("cv-accent", name);
    $$(".swatch").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-accent") === name));
    });
    updateFavicon();
  }

  /* ------------------------------------------------------------------------
     Toast y portapapeles
     ------------------------------------------------------------------------ */
  var toastTimer;
  function toast(msg, isError) {
    var el = $("#toast");
    el.className = "toast" + (isError ? " is-error" : "");
    el.innerHTML = icon(isError ? "alert-circle" : "check-circle") + "<span>" + esc(msg) + "</span>";
    void el.offsetWidth;
    el.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 3200);
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy") ? resolve() : reject();
      } catch (e) {
        reject(e);
      }
      document.body.removeChild(ta);
    });
  }

  /* ------------------------------------------------------------------------
     Eventos globales (se enlazan una sola vez, por delegación)
     ------------------------------------------------------------------------ */
  function closeMenu() {
    var nav = $("#nav");
    var toggle = $(".nav__toggle");
    nav.classList.remove("is-open");
    document.body.classList.remove("is-locked");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = icon("menu");
    }
  }

  function bindGlobal() {
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (!t.closest) return;

      var lb = t.closest("[data-lang]");
      if (lb) {
        setLang(lb.getAttribute("data-lang"));
        return;
      }

      if (t.closest("[data-theme-toggle]")) {
        setMode(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
        return;
      }

      if (t.closest("[data-print]")) {
        closeMenu();
        window.print();
        return;
      }

      var toggle = t.closest(".nav__toggle");
      if (toggle) {
        var nav = $("#nav");
        var open = !nav.classList.contains("is-open");
        nav.classList.toggle("is-open", open);
        document.body.classList.toggle("is-locked", open);
        toggle.setAttribute("aria-expanded", String(open));
        toggle.innerHTML = icon(open ? "close" : "menu");
        return;
      }

      if (t.closest(".mobile-menu a")) {
        closeMenu();
        return;
      }

      var copy = t.closest("[data-copy]");
      if (copy) {
        copyText(copy.getAttribute("data-copy")).then(
          function () {
            copy.classList.add("is-copied");
            copy.innerHTML = icon("check");
            toast(UI.copied);
            setTimeout(function () {
              copy.classList.remove("is-copied");
              copy.innerHTML = icon("copy");
            }, 2000);
          },
          function () {
            toast(copy.getAttribute("data-copy"));
          }
        );
        return;
      }

      var cz = $("#customizer");
      var czToggle = t.closest(".customizer__toggle");
      if (czToggle) {
        var isOpen = cz.classList.toggle("is-open");
        czToggle.setAttribute("aria-expanded", String(isOpen));
        return;
      }
      var sw = t.closest(".swatch");
      if (sw) {
        setAccent(sw.getAttribute("data-accent"));
        return;
      }
      var md = t.closest("[data-mode]");
      if (md) {
        setMode(md.getAttribute("data-mode"));
        return;
      }
      if (cz && cz.classList.contains("is-open") && !t.closest(".customizer")) {
        cz.classList.remove("is-open");
        var ct = $(".customizer__toggle");
        if (ct) ct.setAttribute("aria-expanded", "false");
      }

      var f = t.closest("[data-filter]");
      if (f) filterProjects(f);
    });

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      closeMenu();
      var cz = $("#customizer");
      if (cz) cz.classList.remove("is-open");
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1080) closeMenu();
    });

    $("#toTop").addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });

    // Foco de luz que sigue al cursor sobre las tarjetas
    document.addEventListener(
      "pointermove",
      function (e) {
        var card = e.target.closest && e.target.closest(".card");
        if (!card) return;
        var r = card.getBoundingClientRect();
        card.style.setProperty("--mx", e.clientX - r.left + "px");
        card.style.setProperty("--my", e.clientY - r.top + "px");
      },
      { passive: true }
    );

    // Modo "auto": seguir el sistema si el usuario no eligió manualmente
    if (CV.theme && CV.theme.mode === "auto" && window.matchMedia) {
      var mq = matchMedia("(prefers-color-scheme: light)");
      if (mq.addEventListener) {
        mq.addEventListener("change", function (ev) {
          var saved = null;
          try {
            saved = localStorage.getItem("cv-mode");
          } catch (err) {}
          if (!saved) setMode(ev.matches ? "light" : "dark");
        });
      }
    }

    // Al imprimir/guardar como PDF: todo visible y cifras finales
    // (el CSS de impresión muestra los roles completos en lugar del efecto de escritura)
    window.addEventListener("beforeprint", function () {
      typedPaused = true;
      $$(".reveal").forEach(function (r) {
        r.classList.add("is-visible");
      });
      $$("[data-count]").forEach(finishCount);
    });
    window.addEventListener("afterprint", function () {
      typedPaused = false;
    });

    window.addEventListener("scroll", requestScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     Scroll: barra de progreso, nav, volver arriba y scroll spy
     ------------------------------------------------------------------------ */
  var ticking = false;
  function requestScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }

  function onScroll() {
    var y = window.scrollY;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    $("#nav").classList.toggle("is-scrolled", y > 12);
    $("#toTop").classList.toggle("is-visible", y > window.innerHeight * 0.9);
    var bar = $(".scroll-progress span");
    if (bar) bar.style.setProperty("--progress", h > 0 ? Math.min(1, y / h).toFixed(4) : 0);
    if (h > 0 && y >= h - 4) {
      var spyLinks = $$("[data-spy]");
      spyLinks.forEach(function (l, idx) {
        l.classList.toggle("is-active", idx === spyLinks.length - 1);
      });
    }
    ticking = false;
  }

  function filterProjects(btn) {
    var val = btn.getAttribute("data-filter");
    $$("[data-filter]").forEach(function (b) {
      b.setAttribute("aria-pressed", String(b === btn));
    });
    $$(".project").forEach(function (card) {
      var cats = (card.getAttribute("data-cats") || "").split("|");
      var show = val === "*" || cats.indexOf(val) !== -1;
      card.hidden = !show;
      card.classList.remove("is-entering");
      if (show && !reduceMotion) {
        void card.offsetWidth;
        card.classList.add("is-entering");
      }
    });
    if (btn.scrollIntoView) btn.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  /* ------------------------------------------------------------------------
     Observadores: animaciones de entrada, contadores y scroll spy
     ------------------------------------------------------------------------ */
  var observers = [];

  function setupObservers(instant) {
    observers.forEach(function (o) {
      o.disconnect();
    });
    observers = [];

    var items = $$(".reveal");
    if (instant || reduceMotion || !("IntersectionObserver" in window)) {
      items.forEach(function (el) {
        el.classList.add("is-visible");
      });
      $$("[data-count]").forEach(finishCount);
      // Las líneas de código no deben volver a animarse al cambiar de idioma
      if (instant) $$(".code-line").forEach(function (l) {
        l.style.animation = "none";
        l.style.opacity = "1";
        l.style.transform = "none";
      });
    } else {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            en.target.classList.add("is-visible");
            $$("[data-count]", en.target).forEach(countUp);
            io.unobserve(en.target);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
      );
      items.forEach(function (el) {
        io.observe(el);
      });
      observers.push(io);
    }

    var links = $$("[data-spy]");
    if ("IntersectionObserver" in window && links.length) {
      var spy = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (en) {
            if (!en.isIntersecting) return;
            var id = en.target.id;
            links.forEach(function (l) {
              l.classList.toggle("is-active", l.getAttribute("data-spy") === id && id !== "top");
            });
          });
        },
        { rootMargin: "-45% 0px -50% 0px" }
      );
      view.enabledSections().forEach(function (s) {
        var el = document.getElementById(s.id);
        if (el) spy.observe(el);
      });
      var heroEl = $("#top");
      if (heroEl) spy.observe(heroEl);
      observers.push(spy);
    }
  }

  function finishCount(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var dec = +el.getAttribute("data-decimals") || 0;
    el.textContent = view.formatNum(target, dec) + (el.getAttribute("data-suffix") || "");
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count")) || 0;
    var dec = +el.getAttribute("data-decimals") || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var fmt = view.formatNum;
    var start = null;
    var dur = 1800;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min(1, (ts - start) / dur);
      var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      el.textContent = fmt(target * eased, dec) + suffix;
      if (p < 1 && el.isConnected) requestAnimationFrame(step);
    }
    el.textContent = fmt(0, dec) + suffix;
    requestAnimationFrame(step);
  }

  /* ------------------------------------------------------------------------
     Efecto de escritura del rol
     ------------------------------------------------------------------------ */
  var typedToken = 0;
  var typedPaused = false;

  function startTyped() {
    var token = ++typedToken;
    var el = $("[data-typed]");
    var roles = view.roles;
    if (!el || roles.length < 2 || reduceMotion) return;
    var r = 0;
    var c = roles[0].length;
    var deleting = true;
    function tick() {
      if (token !== typedToken) return; // se cambió de idioma
      if (typedPaused) return setTimeout(tick, 500);
      var word = roles[r];
      if (deleting) {
        c--;
        el.setAttribute("data-t", word.slice(0, c));
        if (c <= 0) {
          deleting = false;
          r = (r + 1) % roles.length;
          return setTimeout(tick, 350);
        }
        return setTimeout(tick, 32);
      }
      word = roles[r];
      c++;
      el.setAttribute("data-t", word.slice(0, c));
      if (c >= word.length) {
        deleting = true;
        return setTimeout(tick, 2200);
      }
      setTimeout(tick, 65 + Math.random() * 50);
    }
    setTimeout(tick, 2800);
  }

  /* ------------------------------------------------------------------------
     Formulario de contacto
     ------------------------------------------------------------------------ */
  function bindForm() {
    var form = $("#contactForm");
    if (!form) return;
    var endpoint = (CV.contact && CV.contact.formEndpoint) || "";
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var fields = $$("input, textarea", form);
      for (var i = 0; i < fields.length; i++) {
        if (!fields[i].checkValidity()) {
          fields[i].focus();
          fields[i].reportValidity();
          return;
        }
      }
      var data = new FormData(form);
      var btn = $("button[type=submit]", form);
      var label = $("span", btn);

      if (!endpoint) {
        var subject = view.T(CV.contact && CV.contact.subject) || "Contact";
        var body = data.get("message") + "\n\n— " + data.get("name") + " (" + data.get("email") + ")";
        toast(UI.formMailto);
        window.location.href =
          "mailto:" + (CV.profile.email || "") + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        return;
      }

      btn.disabled = true;
      label.textContent = UI.formSending;
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (res) {
          if (!res.ok) throw new Error(res.status);
          form.reset();
          toast(UI.formSuccess);
        })
        .catch(function () {
          toast(UI.formError, true);
        })
        .then(function () {
          btn.disabled = false;
          label.textContent = UI.formSend;
        });
    });
  }

  /* ------------------------------------------------------------------------
     Arranque
     ------------------------------------------------------------------------ */
  bindGlobal();
  mount(false);
})();
