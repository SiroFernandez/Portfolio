/* ==================================================================
   MOVIMIENTO · parallax multicapa, apariciones, luz del puntero
   Todo con transform/opacity en un único requestAnimationFrame,
   y desactivado si el sistema pide reducir el movimiento.
   ================================================================== */
import { prefersReducedMotion } from "./utils.js";

export function initMotion() {
  const reduce = prefersReducedMotion();
  const root = document.documentElement;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Cabecera: vidrio al hacer scroll ---------- */
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

  /* ---------- Parallax ---------- */
  const hero = document.querySelector(".hero");
  const heroLayers = [...document.querySelectorAll(".hero__scene [data-depth]")];
  const contact = document.querySelector(".contact");
  const contactLayers = [...document.querySelectorAll(".contact__sky [data-depth]")];
  let heroVisible = true, contactVisible = false;

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([e]) => { heroVisible = e.isIntersecting; }).observe(hero);
    new IntersectionObserver(([e]) => { contactVisible = e.isIntersecting; }).observe(contact);
  }

  // Puntero: posición objetivo y suavizada (lerp) para una sensación etérea
  const target = { x: innerWidth / 2, y: innerHeight / 2 };
  const eased = { x: target.x, y: target.y };
  const glow = { x: target.x, y: target.y };
  const light = document.querySelector(".cursor-light");
  const ring = document.querySelector(".cursor-ring");
  let ticking = false;

  function frame() {
    ticking = false;
    const sy = window.scrollY;
    updateHeader();

    if (!reduce) {
      eased.x += (target.x - eased.x) * 0.08;
      eased.y += (target.y - eased.y) * 0.08;
      glow.x += (target.x - glow.x) * 0.22;
      glow.y += (target.y - glow.y) * 0.22;

      if (heroVisible) {
        const mx = (eased.x / innerWidth - 0.5);
        const my = (eased.y / innerHeight - 0.5);
        heroLayers.forEach((layer) => {
          const d = parseFloat(layer.dataset.depth);
          layer.style.transform = (layer.classList.contains("layer--sun") || layer.classList.contains("layer--shaft"))
            ? `translate3d(${(-mx * d * 60).toFixed(2)}px, ${(sy * d - my * d * 30).toFixed(2)}px, 0)`
            : `translate3d(calc(-50% + ${(-mx * d * 60).toFixed(2)}px), ${(sy * d - my * d * 30).toFixed(2)}px, 0)`;
        });
      }
      if (contactVisible) {
        const r = contact.getBoundingClientRect();
        const offset = r.top + r.height / 2 - innerHeight / 2;
        contactLayers.forEach((layer) => {
          const d = parseFloat(layer.dataset.depth);
          layer.style.transform = `translate3d(-50%, ${(offset * d).toFixed(2)}px, 0)`;
        });
      }
      if (finePointer && light) {
        light.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`;
        ring.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0)`;
      }
      // seguir animando mientras el puntero no haya llegado a su destino
      if (Math.abs(target.x - eased.x) > 0.3 || Math.abs(target.y - eased.y) > 0.3) request();
    }
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
    document.addEventListener("pointerover", (e) => {
      ring?.classList.toggle("is-active", !!e.target.closest("a, button, .work, [role='button']"));
    });
  }

  /* ---------- Foco de luz dentro de tarjetas, tablillas y botones ---------- */
  function spotlight(e) {
    const host = e.target.closest?.(".work, .tablet, .btn");
    if (!host) return;
    const r = host.getBoundingClientRect();
    host.style.setProperty("--mx", `${e.clientX - r.left}px`);
    host.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  request();
}
