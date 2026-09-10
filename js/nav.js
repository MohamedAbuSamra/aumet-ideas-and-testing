import { state, els, hooks } from "./state.js";
import {
  SURFACES,
  epicsFor,
  firstEpicId,
  screensFor,
} from "./registry.js";

export function isWebsite() {
  return state.surface === "website";
}

export function activeFlow() {
  return screensFor(state.surface, state.epic);
}

export function activeEpic() {
  return epicsFor(state.surface)[state.epic] || null;
}

export function previewRoot() {
  return isWebsite() ? els.webScreen : els.phoneScreen;
}

export function currentScreenId() {
  return activeFlow()[state.current]?.id || "";
}

export function routeHash(surface, epic, screen) {
  const parts = [surface, epic];
  if (screen) parts.push(screen);
  return `#/${parts.join("/")}`;
}

export function parseRoute() {
  const raw = (window.location.hash || "").replace(/^#\/?/, "").trim();
  const parts = raw.split("/").filter(Boolean);
  let surface = parts[0];
  let epic = parts[1];
  const screen = parts[2] || "";
  if (!SURFACES[surface]) surface = "mobile";
  if (!epicsFor(surface)[epic]) epic = firstEpicId(surface) || "";
  const flow = screensFor(surface, epic);
  let index = screen ? flow.findIndex((step) => step.id === screen) : 0;
  if (index < 0) index = 0;
  return { surface, epic, index };
}

export function writeRoute(mode = "replace") {
  const hash = routeHash(state.surface, state.epic, currentScreenId());
  if (window.location.hash === hash) return;
  if (mode === "push") history.pushState(null, "", hash);
  else history.replaceState(null, "", hash);
}

export function routeMatchesState(route) {
  return state.surface === route.surface
    && state.epic === route.epic
    && state.current === route.index;
}

export function applyRoute() {
  const route = parseRoute();
  const switched = state.surface !== route.surface || state.epic !== route.epic;
  state.surface = route.surface;
  state.epic = route.epic;
  if (switched) pauseDemo();
  hooks.applySurfaceClass();
  goTo(route.index, { fromRoute: true });
  writeRoute("replace");
  if (switched) hooks.fitPreview();
}

export function onRouteChange() {
  const route = parseRoute();
  if (routeMatchesState(route)) return;
  applyRoute();
}

export function setSurface(surfaceId) {
  if (!SURFACES[surfaceId] || state.surface === surfaceId) return;
  state.surface = surfaceId;
  state.epic = firstEpicId(surfaceId);
  state.current = 0;
  pauseDemo();
  hooks.applySurfaceClass();
  hooks.updateChrome();
  goTo(0, { fromRoute: true });
  writeRoute("push");
  hooks.fitPreview();
}

export function setEpic(epicId) {
  if (!epicsFor(state.surface)[epicId] || state.epic === epicId) return;
  state.epic = epicId;
  state.current = 0;
  hooks.updateChrome();
  goTo(0, { fromRoute: true });
  writeRoute("push");
  hooks.fitPreview();
}

export function updatePlayState() {
  if (!els.btnPlay || !els.btnPause) return;
  els.btnPlay.classList.toggle("active", state.isPlaying);
  els.btnPlay.setAttribute("aria-pressed", String(state.isPlaying));
  els.btnPause.classList.toggle("active", !state.isPlaying);
  els.btnPause.setAttribute("aria-pressed", String(!state.isPlaying));
}

export function playDemo() {
  state.isPlaying = true;
  setupAutoplay();
  updatePlayState();
}

export function pauseDemo() {
  state.isPlaying = false;
  clearInterval(state.autoplayTimer);
  updatePlayState();
}

export function setupAutoplay() {
  clearInterval(state.autoplayTimer);
  if (!state.isPlaying || !activeFlow().length) return;
  const sec = Number(els.autoplaySpeed.value);
  state.autoplayTimer = setInterval(() => {
    const flow = activeFlow();
    if (state.current < flow.length - 1) goTo(state.current + 1);
    else goTo(0);
  }, sec * 1000);
}

export function goTo(index, opts = {}) {
  const flow = activeFlow();
  if (!flow.length) {
    state.current = 0;
    if (els.flowProgress) els.flowProgress.textContent = "0 / 0";
    if (els.progressFill) els.progressFill.style.width = "0%";
    if (els.prevBtn) els.prevBtn.disabled = true;
    if (els.nextBtn) els.nextBtn.disabled = true;
    if (!opts.fromRoute) writeRoute("replace");
    requestAnimationFrame(() => hooks.fitPreview());
    return;
  }

  state.current = Math.max(0, Math.min(flow.length - 1, index));
  state.aiRunning = false;
  const step = flow[state.current];
  const root = previewRoot();

  root?.querySelectorAll(".screen").forEach((el) => {
    el.classList.toggle("active", el.dataset.flow === state.epic && el.dataset.screen === step.id);
  });

  if (els.flowProgress) els.flowProgress.textContent = `${state.current + 1} / ${flow.length}`;
  if (els.progressFill) els.progressFill.style.width = `${((state.current + 1) / flow.length) * 100}%`;
  if (els.prevBtn) els.prevBtn.disabled = state.current === 0;
  if (els.nextBtn) els.nextBtn.disabled = state.current === flow.length - 1;
  if (els.webUrl && step.url) els.webUrl.textContent = step.url;

  try {
    hooks.bindActiveScreen();
  } catch (err) {
    console.error("bindActiveScreen failed", err);
  }

  if (!opts.fromRoute) writeRoute("replace");
  hooks.updateChrome();
  requestAnimationFrame(() => hooks.fitPreview());
}

export function goToId(id) {
  const inEpic = activeFlow().findIndex((s) => s.id === id);
  if (inEpic >= 0) {
    goTo(inEpic);
    return;
  }

  const el =
    previewRoot()?.querySelector(`.screen[data-screen="${id}"]`) ||
    els.phoneScreen?.querySelector(`.screen[data-screen="${id}"]`);
  if (el) {
    el.parentElement?.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    el.classList.add("active");
  }
}
