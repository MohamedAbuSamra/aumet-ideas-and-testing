import { els } from "./state.js";
import { screensFor, extraScreensFor } from "./registry.js";
import { screenTemplates } from "./generated/templates.js";

const WEB_EMPTY_HTML = `
  <div class="web-empty">
    <p class="web-empty-label">Website</p>
    <p class="web-empty-hint">Send your first screen to start</p>
  </div>`;

function screenMarkup(id) {
  return `<div class="screen-code">${screenTemplates[id] || ""}</div>`;
}

function mountFlow(host, screens) {
  host.innerHTML = "";
  screens.forEach((screen, index) => {
    const el = document.createElement("div");
    el.className = "screen" + (index === 0 ? " active" : "");
    el.dataset.screen = screen.id;
    el.dataset.flow = screen.flow;
    el.innerHTML = screenMarkup(screen.id);
    host.appendChild(el);
  });
}

function mountMobileScreens() {
  const host = els.phoneScreen;
  if (!host) return;

  const all = [
    ...screensFor("mobile", "onboarding").map((screen) => ({ ...screen, flow: "onboarding" })),
    ...extraScreensFor("mobile"),
  ];

  if (!all.length) {
    host.innerHTML = `
      <div class="screen active" data-screen="empty" data-flow="onboarding">
        <div class="screen-code">
          <div class="v2-pending">
            <p class="v2-pending-label">Ready</p>
            <p class="v2-pending-hint">Send your first screen to start</p>
          </div>
        </div>
      </div>`;
    return;
  }

  mountFlow(host, all);
}

function mountWebsiteScreens() {
  const host = els.webScreen;
  if (!host) return;

  const screens = screensFor("website", "pos").map((screen) => ({
    ...screen,
    flow: screen.epic || "pos",
  }));

  if (!screens.length) {
    host.innerHTML = WEB_EMPTY_HTML;
    return;
  }

  mountFlow(host, screens);
}

export function mountScreens() {
  mountMobileScreens();
  mountWebsiteScreens();
}
