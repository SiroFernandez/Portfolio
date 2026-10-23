/* ==================================================================
   APP · idioma, render de textos y secciones, contacto y navegación
   (no hace falta tocar este archivo para cambiar contenido:
    todo está en js/content.js)
   ================================================================== */
import { CONFIG, I18N } from "./content.js";
import { createGallery } from "./gallery.js";
import { initMotion } from "./motion.js";
import { $, el, toRoman } from "./utils.js";


/* ---------- Idioma ---------- */
function getInitialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "es" || saved === "en") return saved;
  } catch (e) { /* sin almacenamiento disponible */ }
  return (navigator.language || "es").toLowerCase().startsWith("en") ? "en" : "es";
}
let lang = getInitialLang();

/* ---------- Secciones ---------- */
function renderFacts(t) {
  const ul = $("#hero-facts");
  ul.replaceChildren(...t.facts.map(([num, label]) => {
    const li = el("li");
    li.append(el("strong", null, num), el("span", null, label));
    return li;
  }));
}

function renderBalance(t) {
  const wrap = $("#balance");
  wrap.replaceChildren(...t.balance.map((side, i) => {
    const art = el("article", "balance__side");
    const h = el("h3", "balance__title", side.title);
    const small = el("small", null, toRoman(i + 1));
    small.setAttribute("aria-hidden", "true");
    h.append(small);
    const ul = el("ul", "balance__list");
    side.items.forEach(([key, val, src]) => {
      const li = el("li");
      li.append(el("span", "balance__key", key), el("span", "balance__val", val));
      if (src) li.append(el("span", "balance__src", src));
      ul.append(li);
    });
    art.append(h, ul);
    return art;
  }));
}

function renderTablets(t) {
  const ul = $("#tablets");
  ul.replaceChildren(...t.skills.map(([title, body], i) => {
    const li = el("li", "tablet reveal");
    li.style.setProperty("--reveal-delay", `${(i % 3) * 90}ms`);
    const num = el("span", "tablet__numeral", toRoman(i + 1));
    num.setAttribute("aria-hidden", "true");
    li.append(num, el("h3", "tablet__title", title), el("p", "tablet__body", body));
    return li;
  }));
}

function renderLangs(t) {
  const ul = $("#langs");
  ul.replaceChildren(...t.langs.map(([name, level, dots]) => {
    const li = el("li");
    const d = el("span", "dots");
    d.setAttribute("aria-hidden", "true");
    for (let i = 1; i <= 4; i++) d.append(el("i", i <= dots ? "on" : ""));
    li.append(el("span", "tongues__name", name), d, el("span", "tongues__level", level));
    return li;
  }));
}

function renderPrinciples(t) {
  const ul = $("#principles");
  ul.replaceChildren(...t.principles.map(([title, body]) => {
    const li = el("li");
    li.append(el("strong", null, title), el("span", null, body));
    return li;
  }));
}

/* ---------- Render general ---------- */
const gallery = createGallery({ getLang: () => lang });

function render() {
  const t = I18N[lang];
  document.documentElement.lang = lang;
  document.title = t.pageTitle;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const value = t[node.dataset.i18n];
    if (typeof value === "string") node.textContent = value;
  });
  document.querySelectorAll(".lang-switch button").forEach((b) => {
    b.setAttribute("aria-pressed", String(b.dataset.lang === lang));
  });
  $("#site-nav").setAttribute("aria-label", lang === "es" ? "Principal" : "Main");
  renderFacts(t);
  renderBalance(t);
  renderTablets(t);
  renderLangs(t);
  renderPrinciples(t);
  gallery.render();
  document.dispatchEvent(new CustomEvent("content:rendered"));
}

/* ---------- Enlaces y contacto ---------- */
function initLinks() {
  $("#link-linkedin").href = CONFIG.linkedin;
  const gh = $("#link-github");
  if (CONFIG.github) { gh.href = CONFIG.github; gh.hidden = false; }

  const EMAIL = `${CONFIG.emailUser}@${CONFIG.emailDomain}`;
  const emailLink = $("#email-link");
  emailLink.href = `mailto:${EMAIL}`;
  emailLink.textContent = EMAIL;

  let timer;
  const status = $("#copy-status");
  const done = () => {
    status.textContent = I18N[lang].copied;
    clearTimeout(timer);
    timer = setTimeout(() => { status.textContent = ""; }, 3200);
  };
  const fallback = () => {
    const ta = document.createElement("textarea");
    ta.value = EMAIL; ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;opacity:0";
    document.body.append(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) { /* se puede copiar a mano */ }
    ta.remove();
  };
  $("#btn-copy").addEventListener("click", () => {
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(EMAIL).then(done).catch(fallback);
    else fallback();
  });
}

/* ---------- Navegación: menú móvil y sección activa ---------- */
function initNav() {
  const toggle = $(".menu-toggle");
  const nav = $("#site-nav");
  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  nav.addEventListener("click", (e) => { if (e.target.closest("a")) setOpen(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) { setOpen(false); toggle.focus(); }
  });
  document.addEventListener("click", (e) => {
    if (nav.classList.contains("is-open") && !e.target.closest(".site-header")) setOpen(false);
  });

  const links = [...nav.querySelectorAll("a")];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => {
        if (a.getAttribute("href") === `#${entry.target.id}`) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  ["proyectos", "taller", "sobre-mi", "contacto"].forEach((id) => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}

/* ---------- Selector de idioma ---------- */
document.querySelectorAll(".lang-switch button").forEach((b) => {
  b.addEventListener("click", () => {
    if (b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignorar */ }
    render();
  });
});

initLinks();
initNav();
render();
initMotion();
