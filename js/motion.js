/* ==================================================================
   MOVIMIENTO · parallax escénico por planos, apariciones, luz de sol
   Un único requestAnimationFrame; solo transform/opacity; se detiene
   fuera de pantalla y se desactiva con prefers-reduced-motion.
   ================================================================== */
import { prefersReducedMotion } from "./utils.js?v=colina1";

export function initMotion() {
  const reduce = prefersReducedMotion();
  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Cabecera ---------- */
  const updateHeader = () => root.classList.toggle("is-scrolled", window.scrollY > 24);
  updateHeader();

  /* ---------- Apariciones ---------- */
  const revealIO = "IntersectionObserver" in window && !reduce
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("is-visible"); revealIO.unobserve(e.target); }
        });
      }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 })
    : null;
  const observeReveals = () => {
    document.querySelectorAll(".reveal:not(.is-visible)").forEach((n) => {
      if (revealIO) revealIO.observe(n); else n.classList.add("is-visible");
    });
  };
  observeReveals();
  document.addEventListener("content:rendered", observeReveals);

  /* ---------- Parallax por planos ----------
     Cada sección con data-parallax tiene capas con data-depth:
     · "top"    → la capa se desplaza según el scroll desde arriba (portada)
     · "center" → según la distancia del centro de la sección al centro de la pantalla
     Profundidad positiva = el plano va más lento (lejano); negativa = más rápido (cercano). */
  const scopes = [...document.querySelectorAll("[data-parallax]")].map((el) => ({
    el,
    mode: el.dataset.parallax,
    visible: false,
    layers: [...el.querySelectorAll("[data-depth]")].map((l) => ({
      l,
      d: parseFloat(l.dataset.depth),
      centered: l.classList.contains("is-centered") || l.matches(".contact__hill, .contact__near"),
      mouse: l.dataset.mouse === "1"
    }))
  }));
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { const s = scopes.find((x) => x.el === e.target); if (s) s.visible = e.isIntersecting; });
    }, { rootMargin: "20% 0px 20% 0px" });
    scopes.forEach((s) => io.observe(s.el));
  } else scopes.forEach((s) => { s.visible = true; });

  const target = { x: innerWidth / 2, y: innerHeight / 2 };
  const eased = { x: target.x, y: target.y };
  const glow = { x: target.x, y: target.y };
  const light = document.querySelector(".cursor-light");
  let ticking = false;

  function frame() {
    ticking = false;
    updateHeader();
    if (reduce) return;

    eased.x += (target.x - eased.x) * 0.06;
    eased.y += (target.y - eased.y) * 0.06;
    glow.x += (target.x - glow.x) * 0.2;
    glow.y += (target.y - glow.y) * 0.2;
    const mx = eased.x / innerWidth - 0.5;
    const my = eased.y / innerHeight - 0.5;

    for (const s of scopes) {
      if (!s.visible) continue;
      const r = s.el.getBoundingClientRect();
      const base = s.mode === "top" ? -r.top : (r.top + r.height / 2 - innerHeight / 2);
      for (const { l, d, centered, mouse } of s.layers) {
        const y = base * d - (mouse ? my * d * 26 : 0);
        const x = mouse ? -mx * d * 50 : 0;
        l.style.transform = centered
          ? `translate3d(calc(-50% + ${x.toFixed(2)}px), ${y.toFixed(2)}px, 0)`
          : `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      }
    }
    if (finePointer && light) light.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`;
    if (Math.abs(target.x - eased.x) > 0.3 || Math.abs(target.y - eased.y) > 0.3) request();
  }
  const request = () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } };

  window.addEventListener("scroll", request, { passive: true });
  window.addEventListener("resize", request, { passive: true });

  if (!reduce) {
    window.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
      target.x = e.clientX; target.y = e.clientY;
      root.classList.add("has-pointer");
      request();
      spotlight(e);
    }, { passive: true });
    document.addEventListener("pointerleave", () => root.classList.remove("has-pointer"));
  }

  /* ---------- Luz de sol dentro de tarjetas y botones ---------- */
  function spotlight(e) {
    const host = e.target.closest?.(".work, .tablet, .btn");
    if (!host) return;
    const r = host.getBoundingClientRect();
    host.style.setProperty("--mx", `${e.clientX - r.left}px`);
    host.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  request();
}
