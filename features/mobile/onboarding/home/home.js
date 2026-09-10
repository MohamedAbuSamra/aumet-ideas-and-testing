import { state } from "../../../../js/state.js";
import { goToId } from "../../../../js/nav.js";

export function syncHomeCatalogLock() {
  const home = document.querySelector('.screen[data-screen="home"] .home');
  if (!home) return;
  home.classList.toggle("is-catalog-locked", !state.profileComplete);
}

export function bindHomeCatalogLock() {
  const home = document.querySelector(".screen.active .home");
  if (!home) return;
  syncHomeCatalogLock();
  if (!home.classList.contains("is-catalog-locked")) return;

  home.querySelectorAll(".home-product-card, .home-brand, .home-offer-row").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      goToId("my-pharmacy");
    };
  });
}

export function bindHomeDemo() {
  const root = document.querySelector(".screen.active .home");
  if (!root) return;

  root.querySelectorAll("[data-demo]").forEach((el) => {
    el.addEventListener("click", (e) => {
      if (el.dataset.goto) return;
      e.preventDefault();
      root.querySelectorAll(".is-selected").forEach((n) => n.classList.remove("is-selected"));
      el.classList.add("is-selected");
    });
  });

  root.querySelectorAll(".home-offer-tabs button").forEach((btn) => {
    btn.addEventListener("click", () => {
      root.querySelectorAll(".home-offer-tabs button").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
    });
  });
}
