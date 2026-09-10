import { goToId } from "./nav.js";
import { bindOnboarding } from "../features/mobile/onboarding/index.js";
import { bindPos } from "../features/website/pos/index.js";

export function bindActiveScreen() {
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.onclick = (event) => {
      event.preventDefault();
      goToId(el.dataset.goto);
    };
  });
  bindOnboarding();
  bindPos();
}
