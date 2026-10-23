/* ==================================================================
   GALERÍA · tarjetas de obra, filtros con animación FLIP y modal
   ================================================================== */
import { FILTERS, PROJECTS, I18N } from "./content.js?v=colina1";
import { $, el, toRoman, prefersReducedMotion } from "./utils.js?v=colina1";

const tr = (v, lang) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] : v);

export function createGallery({ getLang }) {
  const list = $("#works");
  const filtersEl = $("#filters");
  const status = $("#filter-status");
  const modal = $("#work-modal");
  let active = "all";
  let current = -1;          // índice (en PROJECTS) del proyecto abierto
  let opener = null;         // botón que abrió el modal, para devolver el foco

  const visible = () => PROJECTS.filter((p) => active === "all" || p.filters.includes(active));

  /* ---------- Filtros ---------- */
  function renderFilters() {
    const lang = getLang();
    const t = I18N[lang];
    filtersEl.querySelectorAll(".filters__group").forEach((g) => g.remove());

    const make = (key, label) => {
      const b = el("button", "chip", label);
      b.type = "button";
      b.dataset.filter = key;
      b.setAttribute("aria-pressed", String(active === key));
      return b;
    };
    const first = el("div", "filters__group");
    first.append(make("all", t.filterAll));
    filtersEl.append(first);

    FILTERS.forEach((group) => {
      const g = el("div", "filters__group");
      g.setAttribute("role", "group");
      const name = el("span", "filters__group-name", tr(group.group, lang));
      g.setAttribute("aria-label", tr(group.group, lang));
      name.setAttribute("aria-hidden", "true");
      g.append(name);
      group.items
        .filter((item) => PROJECTS.some((p) => p.filters.includes(item.key)))
        .forEach((item) => g.append(make(item.key, tr(item.label, lang))));
      filtersEl.append(g);
    });
  }

  filtersEl.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const key = chip.dataset.filter;
    active = active === key && key !== "all" ? "all" : key;
    filtersEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.filter === active)));
    applyFilter(true);
  });

  /* Animación FLIP: las obras que quedan se deslizan a su nuevo sitio */
  function applyFilter(animate) {
    const t = I18N[getLang()];
    const cards = [...list.children];
    const first = new Map(cards.map((c) => [c, c.getBoundingClientRect()]));
    const show = new Set(visible().map((p) => p.id));

    cards.forEach((c) => c.classList.toggle("is-hidden", !show.has(c.dataset.id)));
    status.textContent = t.filterCount(show.size);

    if (!animate || prefersReducedMotion()) return;
    cards.forEach((c) => {
      if (c.classList.contains("is-hidden")) return;
      const a = first.get(c);
      const b = c.getBoundingClientRect();
      const wasHidden = a.width === 0;
      if (wasHidden) {
        c.animate([{ opacity: 0, transform: "translateY(16px) scale(.98)", filter: "blur(4px)" }, { opacity: 1, transform: "none", filter: "none" }],
          { duration: 620, easing: "cubic-bezier(.22,.61,.36,1)" });
      } else if (a.left !== b.left || a.top !== b.top || a.width !== b.width) {
        c.animate([
          { transform: `translate(${a.left - b.left}px, ${a.top - b.top}px) scale(${a.width / b.width}, ${a.height / b.height})`, transformOrigin: "top left" },
          { transform: "none", transformOrigin: "top left" }
        ], { duration: 720, easing: "cubic-bezier(.22,.61,.36,1)" });
      }
    });
  }

  /* ---------- Tarjetas ---------- */
  function renderWorks() {
    const lang = getLang();
    const t = I18N[lang];
    list.replaceChildren(...PROJECTS.map((p, i) => {
      const c = p[lang];
      const li = el("li", `work reveal${p.featured ? " work--featured" : ""}`);
      li.dataset.id = p.id;
      li.style.setProperty("--reveal-delay", `${(i % 3) * 110}ms`);

      const art = el("div", "work__art");
      const img = el("img");
      img.src = p.art; img.alt = c.artAlt; img.width = 800; img.height = 600;
      img.loading = "lazy"; img.decoding = "async";
      art.append(img);

      const plaque = el("div", "work__plaque");
      const num = el("p", "work__numeral", String(i + 1).padStart(2, "0"));
      num.setAttribute("aria-hidden", "true");
      const title = el("h3", "work__title", c.name);
      title.id = `work-title-${p.id}`;
      const tags = el("ul", "tags");
      tags.setAttribute("aria-label", t.stackLabel);
      p.stack.slice(0, 4).forEach((s) => tags.append(el("li", null, tr(s, lang))));

      const btn = el("button", "work__open");
      btn.type = "button";
      btn.setAttribute("aria-haspopup", "dialog");
      btn.append(el("span", null, t.viewWork));
      const sr = el("span", "sr-only", `: ${c.name}`);
      const arrow = el("span", "arrow", "→");
      arrow.setAttribute("aria-hidden", "true");
      btn.append(sr, arrow);
      btn.addEventListener("click", () => open(i, btn));

      plaque.append(num, title, el("p", "work__kind", c.kind), el("p", "work__summary", c.summary), tags, btn);
      li.append(art, plaque);
      return li;
    }));
    applyFilter(false);
  }

  /* ---------- Modal ---------- */
  function fillModal() {
    const lang = getLang();
    const t = I18N[lang];
    const p = PROJECTS[current];
    const c = p[lang];
    const vis = visible();
    const pos = vis.indexOf(p);

    $("#modal-img").src = p.art;
    $("#modal-img").alt = c.artAlt;
    $("#modal-numeral").textContent = `${String(current + 1).padStart(2, "0")} · ${t.projectsEyebrow}`;
    $("#modal-title").textContent = c.name;
    $("#modal-kind").textContent = c.kind;
    $("#modal-detail").textContent = c.detail;

    const dl = $("#modal-plaque");
    dl.replaceChildren();
    [...c.plaque, [t.techLabel, p.stack.map((s) => tr(s, lang)).join(" · ")]].forEach(([k, v]) => {
      dl.append(el("dt", null, k), el("dd", k === t.techLabel ? "is-code" : null, v));
    });

    $("#modal-highlights").replaceChildren(...c.highlights.map((h) => el("li", null, h)));
    const tags = $("#modal-tags");
    tags.setAttribute("aria-label", t.stackLabel);
    tags.replaceChildren(...p.stack.map((s) => el("li", null, tr(s, lang))));

    const links = $("#modal-links");
    links.replaceChildren(...p.links.map((l) => {
      const a = el("a", "btn btn--terra", tr(l.label, lang));
      a.href = l.url; a.target = "_blank"; a.rel = "noopener";
      a.append(el("span", "sr-only", ` ${t.newTab}`));
      return a;
    }));
    links.hidden = p.links.length === 0;

    $("#modal-count").textContent = `${pos + 1} ${t.of} ${vis.length}`;
    $("#modal-prev").disabled = vis.length < 2;
    $("#modal-next").disabled = vis.length < 2;
    $(".work-modal__body", modal).scrollTop = 0;
  }

  function open(index, from) {
    current = index;
    opener = from || opener;
    fillModal();
    if (!modal.open) {
      modal.showModal();
      requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("is-open")));
    }
    $("#modal-close").focus();
  }

  function close() {
    if (!modal.open) return;
    modal.classList.remove("is-open");
    const finish = () => {
      modal.close();
      // si el proyecto abierto ya no es el de la tarjeta original, devuelve el foco a la suya
      const card = list.querySelector(`[data-id="${PROJECTS[current].id}"] .work__open`);
      (card || opener)?.focus({ preventScroll: false });
    };
    if (prefersReducedMotion()) finish();
    else setTimeout(finish, 380);
  }

  function step(dir) {
    const vis = visible();
    const pos = vis.indexOf(PROJECTS[current]);
    const next = vis[(pos + dir + vis.length) % vis.length];
    current = PROJECTS.indexOf(next);
    const body = $(".work-modal__frame", modal);
    if (!prefersReducedMotion()) {
      body.animate([{ opacity: 1 }, { opacity: 0, transform: `translateX(${dir * -12}px)` }], { duration: 160, easing: "ease-in" })
        .finished.then(() => {
          fillModal();
          body.animate([{ opacity: 0, transform: `translateX(${dir * 12}px)` }, { opacity: 1, transform: "none" }], { duration: 320, easing: "cubic-bezier(.22,.61,.36,1)" });
        });
    } else fillModal();
  }

  $("#modal-close").addEventListener("click", close);
  $("#modal-prev").addEventListener("click", () => step(-1));
  $("#modal-next").addEventListener("click", () => step(1));
  modal.addEventListener("cancel", (e) => { e.preventDefault(); close(); });         // Esc
  modal.addEventListener("click", (e) => { if (e.target === modal) close(); });      // clic en el fondo
  modal.addEventListener("keydown", (e) => {
    if (e.target.closest("a, button") && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  return {
    render() {
      renderFilters();
      renderWorks();
      if (modal.open) fillModal();
    }
  };
}
