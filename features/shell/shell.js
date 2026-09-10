import { state, els } from "../../js/state.js";
import {
  SURFACES,
  epicsFor,
  firstEpicId,
} from "../../js/registry.js";
import {
  activeFlow,
  activeEpic,
  currentScreenId,
  routeHash,
  isWebsite,
  goTo,
  playDemo,
  pauseDemo,
  setupAutoplay,
  onRouteChange,
} from "../../js/nav.js";

export function cacheElements() {
  Object.assign(els, {
    panelMenu: document.getElementById("panelMenu"),
    epicChips: document.getElementById("epicChips"),
    sidebarEpicName: document.getElementById("sidebarEpicName"),
    sidebarEpicDesc: document.getElementById("sidebarEpicDesc"),
    scopeHint: document.getElementById("scopeHint"),
    flowProgress: document.getElementById("flowProgress"),
    progressFill: document.getElementById("progressFill"),
    phoneScreen: document.getElementById("phoneScreen"),
    phoneColumn: document.getElementById("phoneColumn"),
    phoneScaler: document.getElementById("phoneScaler"),
    webColumn: document.getElementById("webColumn"),
    webScreen: document.getElementById("webScreen"),
    webUrl: document.getElementById("webUrl"),
    surfaceSwitch: document.getElementById("surfaceSwitch"),
    scopeEmptyPhone: document.getElementById("scopeEmptyPhone"),
    demoBar: document.getElementById("demoBar"),
    btnPlay: document.getElementById("btnPlay"),
    btnPause: document.getElementById("btnPause"),
    autoplaySpeed: document.getElementById("autoplaySpeed"),
    prevBtn: document.getElementById("prevBtn"),
    nextBtn: document.getElementById("nextBtn"),
  });
}

export function applySurfaceClass() {
  document.documentElement.classList.toggle("surface-mobile", state.surface === "mobile");
  document.documentElement.classList.toggle("surface-website", state.surface === "website");
}

export function renderEpicChips() {
  const epics = epicsFor(state.surface);
  const ids = Object.keys(epics);
  if (!els.epicChips) return;

  if (!ids.length) {
    els.epicChips.innerHTML = `<span class="chip chip-muted">No epics yet</span>`;
    return;
  }

  els.epicChips.innerHTML = ids
    .map((id) => {
      const epic = epics[id];
      const on = id === state.epic ? " active" : "";
      const screen = id === state.epic ? currentScreenId() : "";
      return `<a class="chip ${epic.chipClass || ""}${on}" data-epic="${id}" href="${routeHash(state.surface, id, screen)}">${epic.label}</a>`;
    })
    .join("");
}

export function updateChips() {
  document.querySelectorAll("#demoBar [data-ai-outcome]").forEach((btn) => {
    const on = btn.dataset.aiOutcome === state.aiOutcome;
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-pressed", String(on));
  });

  renderEpicChips();

  const epic = activeEpic();
  if (els.sidebarEpicName) {
    els.sidebarEpicName.textContent = epic?.label || "No epic yet";
  }
  if (els.sidebarEpicDesc) {
    els.sidebarEpicDesc.textContent = epic?.description || "Add an epic for this surface to start.";
  }

  const surface = SURFACES[state.surface];
  els.surfaceSwitch?.querySelectorAll("[data-surface]").forEach((btn) => {
    const id = btn.dataset.surface;
    const on = id === state.surface;
    const epicId = on ? state.epic : firstEpicId(id);
    const screen = on ? currentScreenId() : "";
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", String(on));
    btn.setAttribute("href", routeHash(id, epicId, screen));
  });

  const flow = activeFlow();
  const empty = !flow.length;
  const mobile = !isWebsite();
  if (els.scopeHint) {
    const surfaceLabel = surface?.label || (mobile ? "Mobile" : "Website");
    els.scopeHint.textContent = flow.length
      ? `${surfaceLabel} · ${flow.length} steps`
      : `${surfaceLabel} — no steps yet`;
  }

  if (els.phoneColumn) els.phoneColumn.hidden = !mobile || empty;
  if (els.webColumn) els.webColumn.hidden = mobile;
  if (els.scopeEmptyPhone) els.scopeEmptyPhone.hidden = !mobile || !empty;
}

export function fitPreview() {
  if (isWebsite()) fitToStage(els.webColumn, "--web-scale", 0.4);
  else fitToStage(els.phoneColumn, "--phone-scale", 0.55);
}

function fitToStage(column, cssVar, minScale) {
  const stage = document.querySelector(".stage-inner") || document.querySelector(".stage");
  if (!stage || !column || column.hidden) return;
  document.documentElement.style.setProperty(cssVar, "1");
  const margin = 16;
  const scale = Math.min(
    (stage.clientWidth - margin) / column.offsetWidth,
    (stage.clientHeight - margin) / column.offsetHeight
  );
  document.documentElement.style.setProperty(cssVar, Math.max(minScale, scale));
}

export function bindEvents() {
  window.addEventListener("hashchange", onRouteChange);
  window.addEventListener("popstate", onRouteChange);

  document.querySelectorAll("#demoBar [data-ai-outcome]").forEach((btn) => {
    btn.addEventListener("click", () => {
      state.aiOutcome = btn.dataset.aiOutcome;
      updateChips();
    });
  });

  els.btnPlay.addEventListener("click", playDemo);
  els.btnPause.addEventListener("click", pauseDemo);
  els.autoplaySpeed.addEventListener("change", setupAutoplay);

  els.prevBtn?.addEventListener("click", () => goTo(state.current - 1));
  els.nextBtn?.addEventListener("click", () => goTo(state.current + 1));

  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement?.tagName;
    const typing =
      /^(INPUT|TEXTAREA|SELECT)$/.test(tag || "") ||
      document.activeElement?.isContentEditable;
    if (!typing) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(state.current + 1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(state.current - 1);
      }
    }
    if (event.key === " " && !typing) {
      event.preventDefault();
      if (state.isPlaying) pauseDemo();
      else playDemo();
    }
  });

  window.addEventListener("resize", fitPreview);
}
