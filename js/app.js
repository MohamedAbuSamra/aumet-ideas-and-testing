import { renderShell } from "./components/shell.js";
import { epicsFor, firstEpicId } from "./config/scopes.js";
import { SURFACES } from "./config/surfaces.js";
import { signupScreens } from "./data/signup-screens.js";
import { loginScreens } from "./data/login-screens.js";
import { websiteScreens } from "./data/website-screens.js";
import { websiteTemplates } from "./templates/website-templates.js";
import { codeTemplates } from "./templates/signup-templates.js";

/** Screens per surface → epic. Add a new epic here when you start a new case. */
const EPIC_SCREENS = {
  mobile: {
    onboarding: signupScreens,
  },
  website: {
    pos: websiteScreens,
  },
};

const WEB_EMPTY_HTML = `
  <div class="web-empty">
    <p class="web-empty-label">Website</p>
    <p class="web-empty-hint">Send your first screen to start</p>
  </div>`;

const state = {
  epic: firstEpicId("mobile"),
  surface: "mobile",
  viewMode: "code",
  current: 0,
  isPlaying: false,
  autoplayTimer: null,
  aiOutcome: "pass",
  aiRunning: false,
  profileComplete: false,
  verifyFailCount: 0,
  accountLocked: false,
};

const MAX_VERIFY_FAILS = 2;

let els = {};

function activeFlow() {
  return EPIC_SCREENS[state.surface]?.[state.epic] || [];
}

function activeEpic() {
  return epicsFor(state.surface)[state.epic] || null;
}

function isWebsite() {
  return state.surface === "website";
}

function previewRoot() {
  return isWebsite() ? els.webScreen : els.phoneScreen;
}

function mountScreens() {
  const phoneScreen = els.phoneScreen;
  phoneScreen.innerHTML = "";

  const all = [
    ...signupScreens.map((s) => ({ ...s, flow: "onboarding" })),
    ...loginScreens.map((s) => ({ ...s, flow: "login" })),
  ];

  if (!all.length) {
    phoneScreen.innerHTML = `
      <div class="screen active" data-screen="empty" data-flow="onboarding">
        <div class="screen-code">
          <div class="v2-pending">
            <p class="v2-pending-label">Ready</p>
            <p class="v2-pending-hint">Send your first screen to start</p>
          </div>
        </div>
      </div>`;
    mountWebsiteScreens();
    return;
  }

  all.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "screen" + (i === 0 ? " active" : "");
    el.dataset.screen = s.id;
    el.dataset.flow = s.flow;
    const photo = s.photo
      ? `<div class="screen-photo"><img src="${s.photo}" alt="${s.label}" /></div>`
      : "";
    el.innerHTML = `${photo}<div class="screen-code">${codeTemplates[s.id] || ""}</div>`;
    phoneScreen.appendChild(el);
  });

  mountWebsiteScreens();
}

function mountWebsiteScreens() {
  const host = els.webScreen;
  if (!host) return;

  if (!websiteScreens.length) {
    host.innerHTML = WEB_EMPTY_HTML;
    return;
  }

  host.innerHTML = "";
  websiteScreens.forEach((s, i) => {
    const el = document.createElement("div");
    el.className = "screen" + (i === 0 ? " active" : "");
    el.dataset.screen = s.id;
    el.dataset.flow = s.epic || "pos";
    el.innerHTML = `<div class="screen-code">${websiteTemplates[s.id] || ""}</div>`;
    host.appendChild(el);
  });
}

function renderEpicChips() {
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

function updateChips() {
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
    const epic = on ? state.epic : firstEpicId(id);
    const screen = on ? currentScreenId() : "";
    btn.classList.toggle("active", on);
    btn.setAttribute("aria-selected", String(on));
    btn.setAttribute("href", routeHash(id, epic, screen));
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

function currentScreenId() {
  return activeFlow()[state.current]?.id || "";
}

function routeHash(surface, epic, screen) {
  const parts = [surface, epic];
  if (screen) parts.push(screen);
  return `#/${parts.join("/")}`;
}

function parseRoute() {
  const raw = (window.location.hash || "").replace(/^#\/?/, "").trim();
  const parts = raw.split("/").filter(Boolean);
  let surface = parts[0];
  let epic = parts[1];
  const screen = parts[2] || "";
  if (!SURFACES[surface]) surface = "mobile";
  if (!epicsFor(surface)[epic]) epic = firstEpicId(surface) || "";
  const flow = EPIC_SCREENS[surface]?.[epic] || [];
  let index = screen ? flow.findIndex((step) => step.id === screen) : 0;
  if (index < 0) index = 0;
  return { surface, epic, index };
}

function writeRoute(mode = "replace") {
  const hash = routeHash(state.surface, state.epic, currentScreenId());
  if (window.location.hash === hash) return;
  if (mode === "push") history.pushState(null, "", hash);
  else history.replaceState(null, "", hash);
}

function routeMatchesState(route) {
  return state.surface === route.surface
    && state.epic === route.epic
    && state.current === route.index;
}

function applyRoute() {
  const route = parseRoute();
  const switched = state.surface !== route.surface || state.epic !== route.epic;
  state.surface = route.surface;
  state.epic = route.epic;
  if (switched) pauseDemo();
  applySurfaceClass();
  goTo(route.index, { fromRoute: true });
  writeRoute("replace");
  if (switched) fitPreview();
}

function applySurfaceClass() {
  document.documentElement.classList.toggle("surface-mobile", state.surface === "mobile");
  document.documentElement.classList.toggle("surface-website", state.surface === "website");
}

function setSurface(surfaceId) {
  if (!SURFACES[surfaceId] || state.surface === surfaceId) return;
  state.surface = surfaceId;
  state.epic = firstEpicId(surfaceId);
  state.current = 0;
  pauseDemo();
  applySurfaceClass();
  updateChips();
  goTo(0, { fromRoute: true });
  writeRoute("push");
  fitPreview();
}

function setEpic(epicId) {
  if (!epicsFor(state.surface)[epicId] || state.epic === epicId) return;
  state.epic = epicId;
  state.current = 0;
  updateChips();
  goTo(0, { fromRoute: true });
  writeRoute("push");
  fitPreview();
}

function updatePlayState() {
  if (!els.btnPlay || !els.btnPause) return;
  els.btnPlay.classList.toggle("active", state.isPlaying);
  els.btnPlay.setAttribute("aria-pressed", String(state.isPlaying));
  els.btnPause.classList.toggle("active", !state.isPlaying);
  els.btnPause.setAttribute("aria-pressed", String(!state.isPlaying));
}

function playDemo() {
  state.isPlaying = true;
  setupAutoplay();
  updatePlayState();
}

function pauseDemo() {
  state.isPlaying = false;
  clearInterval(state.autoplayTimer);
  updatePlayState();
}

function setupAutoplay() {
  clearInterval(state.autoplayTimer);
  if (!state.isPlaying || !activeFlow().length) return;
  const sec = Number(els.autoplaySpeed.value);
  state.autoplayTimer = setInterval(() => {
    const flow = activeFlow();
    if (state.current < flow.length - 1) goTo(state.current + 1);
    else goTo(0);
  }, sec * 1000);
}

function bindGoto() {
  document.querySelectorAll("[data-goto]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      goToId(el.dataset.goto);
    };
  });
  bindOtpInputs();
  bindHomeDemo();
  bindCpDropdowns();
  bindAiVerify();
  bindLandingCarousel();
  bindWebsiteDosage();
}

function bindLandingCarousel() {
  const root = document.querySelector(".screen.active [data-landing-carousel]");
  if (!root) return;

  const shots = [...root.querySelectorAll(".ca-landing-shot")];
  const dots = [...root.querySelectorAll("[data-landing-dot]")];
  const swipe = root.querySelector("[data-landing-swipe]");
  if (!shots.length) return;

  let index = Math.max(
    0,
    shots.findIndex((s) => s.classList.contains("is-active"))
  );

  const show = (next) => {
    index = ((next % shots.length) + shots.length) % shots.length;
    shots.forEach((shot, i) => {
      const on = i === index;
      shot.classList.toggle("is-active", on);
      shot.hidden = !on;
    });
    dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
  };

  dots.forEach((dot) => {
    dot.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      show(Number(dot.dataset.landingDot));
    };
  });

  const bindSwipe = (el) => {
    if (!el) return;
    let startX = 0;
    let tracking = false;
    el.ontouchstart = (e) => {
      tracking = true;
      startX = e.changedTouches[0].clientX;
    };
    el.ontouchend = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) < 36) return;
      show(index + (dx < 0 ? 1 : -1));
    };
    el.onmousedown = (e) => {
      tracking = true;
      startX = e.clientX;
    };
    el.onmouseup = (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.clientX - startX;
      if (Math.abs(dx) < 36) return;
      show(index + (dx < 0 ? 1 : -1));
    };
  };

  bindSwipe(swipe);
  show(index);
}

function closeAllCpMenus(except) {
  document.querySelectorAll(".screen.active .cp-dropdown.is-open").forEach((el) => {
    if (el === except) return;
    el.classList.remove("is-open");
    const trigger = el.querySelector(".cp-dropdown-trigger");
    const menu = el.querySelector(".cp-dropdown-menu");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (menu) menu.hidden = true;
  });
}

function closeDocSheet() {
  const sheet = document.querySelector(".screen.active #doc-update-sheet");
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.hidden = true;
  sheet.dataset.doc = "";
}

function openDocSheet(docId) {
  if (state.accountLocked) return;
  const sheet = document.querySelector(".screen.active #doc-update-sheet");
  if (!sheet) return;
  closeAllCpMenus();
  sheet.dataset.doc = docId || "";
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("is-open"));
}

function bindCpDropdowns() {
  const root = document.querySelector(".screen.active .cp");
  if (!root) return;

  root.querySelectorAll(".cp-dropdown").forEach((dd) => {
    const trigger = dd.querySelector(".cp-dropdown-trigger");
    const menu = dd.querySelector(".cp-dropdown-menu");
    if (!trigger || !menu) return;

    trigger.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const open = !dd.classList.contains("is-open");
      closeAllCpMenus();
      if (!open) return;
      dd.classList.add("is-open");
      trigger.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    };

    menu.querySelectorAll(".cp-dropdown-option").forEach((opt) => {
      opt.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const value = opt.dataset.value;

        if (dd.dataset.multi === "true") {
          const chipsWrap = dd.querySelector(".cp-dropdown-chips");
          let selected = [...chipsWrap.querySelectorAll("[data-chip]")].map((c) => c.dataset.chip);
          if (selected.includes(value)) {
            selected = selected.filter((v) => v !== value);
          } else {
            selected.push(value);
          }
          chipsWrap.innerHTML = selected
            .map(
              (c) =>
                `<span class="cp-chip" data-chip="${c}">${c} <button type="button" data-remove-chip="${c}" aria-label="Remove">×</button></span>`
            )
            .join("");
          menu.querySelectorAll(".cp-dropdown-option").forEach((o) => {
            o.classList.toggle("is-selected", selected.includes(o.dataset.value));
          });
          bindChipRemoves(dd);
          return;
        }

        const valueEl = dd.querySelector(".cp-dropdown-value");
        if (valueEl) valueEl.textContent = value;
        if (dd.classList.contains("cp-cc-dropdown")) {
          const flagHost = dd.querySelector(".cp-cc-flag");
          const srcFlag = opt.querySelector(".ca-flag");
          if (flagHost && srcFlag) flagHost.innerHTML = srcFlag.outerHTML;
        }
        menu.querySelectorAll(".cp-dropdown-option").forEach((o) => o.classList.remove("is-selected"));
        opt.classList.add("is-selected");
        closeAllCpMenus();
      };
    });

    bindChipRemoves(dd);
  });

  bindDocSheet(root);

  if (!root.dataset.cpMenusBound) {
    root.dataset.cpMenusBound = "1";
    root.addEventListener("click", () => closeAllCpMenus());
  }
}

function bindDocSheet(root) {
  const sheet = root.querySelector("#doc-update-sheet");
  if (!sheet) return;

  let fileInput = root.querySelector("#cp-doc-file-input");
  if (!fileInput) {
    fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.id = "cp-doc-file-input";
    fileInput.accept = "image/*,.pdf,.doc,.docx,.png,.jpg,.jpeg";
    fileInput.hidden = true;
    root.appendChild(fileInput);
  }

  let pendingDocRow = null;

  const pickFileFor = (row) => {
    pendingDocRow = row;
    fileInput.value = "";
    fileInput.click();
  };

  const missingBadgeHtml =
    `<span class="cp-doc-badge is-missing-badge"><svg class="cp-doc-badge-ico" viewBox="0 0 16 16" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" d="M8 2.2 14.2 13.4H1.8L8 2.2Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 6.2v3.2M8 11.4h.01"/></svg>Missing</span>`;

  const markDocUploaded = (row, file) => {
    if (!row || !file) return;
    const name = file.name || "document.pdf";
    row.classList.remove("is-missing", "is-failed");
    row.classList.add("is-uploaded");
    row.setAttribute("data-open-doc-sheet", "");
    row.setAttribute("role", "button");
    row.setAttribute("tabindex", "0");
    row.querySelector(".cp-doc-error")?.remove();

    const meta = row.querySelector(".cp-doc-meta");
    if (meta) {
      meta.querySelector(".cp-doc-badge")?.remove();
      let fileEl = meta.querySelector("span:not(.cp-doc-badge)");
      if (!fileEl) {
        fileEl = document.createElement("span");
        meta.appendChild(fileEl);
      }
      fileEl.textContent = name;
    }

    let badge = row.querySelector(":scope > .cp-doc-badge");
    if (!badge) {
      badge = document.createElement("span");
      const uploadOrMore = row.querySelector(".cp-doc-upload-btn, .cp-doc-more");
      if (uploadOrMore) row.insertBefore(badge, uploadOrMore);
      else row.appendChild(badge);
    }
    badge.className = "cp-doc-badge is-ok";
    badge.textContent = "Uploaded ✓";

    const thumb = row.querySelector(".cp-doc-thumb");
    if (thumb) {
      thumb.className = "cp-doc-thumb";
      if (file.type && file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        thumb.innerHTML = `<img src="${url}" alt="" />`;
        thumb.classList.add("cp-doc-thumb-preview");
      } else {
        thumb.className = "cp-doc-thumb cp-doc-thumb-license";
        thumb.innerHTML = "";
      }
    }

    const uploadBtn = row.querySelector(".cp-doc-upload-btn");
    if (uploadBtn) {
      uploadBtn.outerHTML = `<span class="cp-doc-more" aria-hidden="true"><svg class="cp-ico-more" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/></svg></span>`;
    }

    row.onclick = (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      openDocSheet(row.dataset.doc);
    };

    updateDocsCta(root);
  };

  fileInput.onchange = () => {
    const file = fileInput.files && fileInput.files[0];
    if (file && pendingDocRow) markDocUploaded(pendingDocRow, file);
    pendingDocRow = null;
  };

  root.querySelectorAll("[data-open-doc-sheet]").forEach((doc) => {
    doc.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openDocSheet(doc.dataset.doc);
    };
  });

  root.querySelectorAll(".cp-doc-upload-btn").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const row = btn.closest(".cp-doc");
      if (!row) return;
      pickFileFor(row);
    };
  });

  sheet.querySelectorAll("[data-sheet-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeDocSheet();
    };
  });

  sheet.querySelectorAll("[data-doc-action]").forEach((action) => {
    action.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const kind = action.dataset.docAction;
      const docId = sheet.dataset.doc;
      const row = root.querySelector(`.cp-doc[data-doc="${docId}"]`);

      if (kind === "replace" && row) {
        closeDocSheet();
        pickFileFor(row);
        return;
      }

      if (kind === "delete" && row) {
        row.classList.remove("is-uploaded", "is-failed");
        row.classList.add("is-missing");
        row.removeAttribute("data-open-doc-sheet");
        row.removeAttribute("role");
        row.removeAttribute("tabindex");
        row.onclick = null;
        row.querySelector(".cp-doc-error")?.remove();
        row.querySelectorAll(".cp-doc-badge").forEach((el) => el.remove());
        const meta = row.querySelector(".cp-doc-meta");
        meta?.querySelectorAll("span:not(.cp-doc-badge)").forEach((el) => el.remove());
        if (meta) meta.insertAdjacentHTML("beforeend", missingBadgeHtml);
        const thumb = row.querySelector(".cp-doc-thumb");
        if (thumb) {
          thumb.className = "cp-doc-thumb cp-doc-thumb-missing";
          thumb.innerHTML =
            '<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="6" width="24" height="28" rx="3" fill="#fff7ed" stroke="#fb923c" stroke-width="1.5"/><path fill="#fb923c" d="M14 14h12v2H14zm0 5h12v2H14zm0 5h8v2h-8z"/></svg>';
        }
        const more = row.querySelector(".cp-doc-more");
        if (more) {
          more.outerHTML = `<button type="button" class="cp-doc-upload-btn">Upload</button>`;
        }
        updateDocsCta(root);
        bindDocSheet(root);
      }

      closeDocSheet();
    };
  });
}

const AI_DOC_META = [
  { id: "license", label: "Pharmacy license", failReason: "This document is not valid. Please upload the correct Pharmacy license." },
  { id: "tax", label: "Tax Card", failReason: "This document is not valid. Please upload the correct Tax Card." },
  { id: "trade", label: "Trade Registry", failReason: "This document is not valid. Please upload the correct Trade Registry." },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function updateDocsCta(root) {
  const cta = root.querySelector("[data-ai-verify]");
  if (!cta) return;
  if (state.accountLocked) {
    cta.textContent = "Support will contact you";
    cta.disabled = true;
    cta.classList.add("is-muted");
    return;
  }
  cta.disabled = false;
  cta.classList.remove("is-muted");
  const hasFailed = root.querySelector(".cp-doc.is-failed");
  cta.textContent = hasFailed ? "Fix & resubmit" : "Complete Profile";
}

function setDocBanner(root, text, locked = false) {
  const banner = root.querySelector("#cp-doc-banner");
  if (!banner) return;
  if (!text) {
    banner.hidden = true;
    banner.textContent = "";
    banner.classList.remove("is-locked");
    return;
  }
  banner.hidden = false;
  banner.textContent = text;
  banner.classList.toggle("is-locked", locked);
}

function lockAccount(docsRoot) {
  state.accountLocked = true;
  const root =
    docsRoot ||
    document.querySelector('.screen[data-screen="complete-documents"] .cp') ||
    document.querySelector(".screen.active .cp");
  if (root) {
    root.classList.add("is-account-locked");
    setDocBanner(
      root,
      "Uploads paused. Our support team will contact you soon to help finish verification.",
      true
    );
    updateDocsCta(root);
    closeDocSheet();
    openSheet(root.querySelector("#account-locked-sheet"));
  }
}

function applyAccountLockUI() {
  const root = document.querySelector('.screen[data-screen="complete-documents"] .cp');
  if (!root || !state.accountLocked) return;
  root.classList.add("is-account-locked");
  setDocBanner(
    root,
    "Uploads paused. Our support team will contact you soon to help finish verification.",
    true
  );
  updateDocsCta(root);
}

function openSheet(sheet) {
  if (!sheet) return;
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("is-open"));
}

function closeSheet(sheet) {
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.hidden = true;
}

function markDocFailed(row, reason) {
  if (!row) return;
  row.classList.add("is-failed");
  row.classList.remove("is-missing");
  const badge = row.querySelector(".cp-doc-badge");
  if (badge) {
    badge.className = "cp-doc-badge is-fail";
    badge.textContent = "Failed ✕";
  }
  row.querySelector(".cp-doc-error")?.remove();
  const err = document.createElement("p");
  err.className = "cp-doc-error";
  err.textContent = reason;
  row.insertAdjacentElement("afterend", err);
}

function clearDocFailures(root) {
  root.querySelectorAll(".cp-doc-error").forEach((el) => el.remove());
  root.querySelectorAll(".cp-doc.is-failed").forEach((row) => {
    row.classList.remove("is-failed");
    if (row.classList.contains("is-uploaded")) {
      const badge = row.querySelector(".cp-doc-badge");
      if (badge) {
        badge.className = "cp-doc-badge is-ok";
        badge.textContent = "Uploaded ✓";
      }
    }
  });
  setDocBanner(root, "");
  updateDocsCta(root);
}

function setAiRowStatus(list, docId, status) {
  const row = list.querySelector(`[data-ai-doc="${docId}"]`);
  if (!row) return;
  row.classList.remove("is-checking", "is-pass", "is-fail");
  const statusEl = row.querySelector("[data-ai-status]");
  if (status === "checking") {
    row.classList.add("is-checking");
    statusEl.innerHTML = `<span class="cp-ai-spinner"></span> Checking…`;
  } else if (status === "pass") {
    row.classList.add("is-pass");
    statusEl.innerHTML = `<span class="cp-ai-ico is-pass" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="#fff" d="M10.2 15.4 6.8 12l1.2-1.2 2.2 2.2 5-5 1.2 1.2-6.2 6.2Z"/></svg></span> Passed`;
  } else if (status === "fail") {
    row.classList.add("is-fail");
    statusEl.innerHTML = `<span class="cp-ai-ico is-fail" aria-hidden="true"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg></span> Failed`;
  } else {
    statusEl.textContent = "Waiting";
  }
}

async function runAiVerification(root) {
  if (state.aiRunning || state.accountLocked) return;
  const verifySheet = root.querySelector("#ai-verify-sheet");
  const submittedSheet = root.querySelector("#profile-submitted-sheet");
  const lockedSheet = root.querySelector("#account-locked-sheet");
  const list = root.querySelector("#ai-verify-list");
  if (!verifySheet || !list) return;

  const docsRoot =
    document.querySelector('.screen[data-screen="complete-documents"] .cp') || root;

  const docs = AI_DOC_META.map((meta) => ({
    ...meta,
    row: docsRoot.querySelector(`.cp-doc[data-doc="${meta.id}"]`),
  }));

  const missing = docs.filter((d) => !d.row || !d.row.classList.contains("is-uploaded"));
  if (missing.length) {
    goToId("complete-documents");
    requestAnimationFrame(() => {
      const activeDocs = document.querySelector(".screen.active .cp") || docsRoot;
      setDocBanner(activeDocs, "Upload all documents before completing your profile.");
      missing.forEach((d) => d.row?.classList.add("is-highlight"));
      setTimeout(() => activeDocs.querySelectorAll(".is-highlight").forEach((el) => el.classList.remove("is-highlight")), 1200);
    });
    return;
  }

  state.aiRunning = true;
  clearDocFailures(docsRoot);
  closeDocSheet();
  closeSheet(submittedSheet);
  closeSheet(lockedSheet);
  AI_DOC_META.forEach((d) => setAiRowStatus(list, d.id, "waiting"));
  openSheet(verifySheet);

  const failIds = state.aiOutcome === "fail" ? new Set(["tax"]) : new Set();
  const failed = [];

  for (const doc of docs) {
    setAiRowStatus(list, doc.id, "checking");
    await sleep(900);
    if (failIds.has(doc.id)) {
      setAiRowStatus(list, doc.id, "fail");
      failed.push(doc);
    } else {
      setAiRowStatus(list, doc.id, "pass");
    }
  }

  await sleep(650);

  if (failed.length) {
    closeSheet(verifySheet);
    state.verifyFailCount += 1;
    failed.forEach((doc) => markDocFailed(doc.row, doc.failReason));
    state.aiRunning = false;
    goToId("complete-documents");

    if (state.verifyFailCount > MAX_VERIFY_FAILS) {
      requestAnimationFrame(() => {
        const activeDocs =
          document.querySelector(".screen.active .cp") ||
          document.querySelector('.screen[data-screen="complete-documents"] .cp') ||
          docsRoot;
        lockAccount(activeDocs);
      });
      return;
    }

    const activeDocs =
      document.querySelector(".screen.active .cp") ||
      document.querySelector('.screen[data-screen="complete-documents"] .cp') ||
      docsRoot;
    if (state.verifyFailCount === 2) {
      setDocBanner(
        activeDocs,
        "Some documents are not valid. Replace them and resubmit before your account is locked."
      );
    } else {
      setDocBanner(
        activeDocs,
        "Some documents are not valid. Replace them with the correct files and resubmit."
      );
    }
    updateDocsCta(activeDocs);
    return;
  }

  closeSheet(verifySheet);
  openSheet(submittedSheet);
  state.profileComplete = true;
  state.verifyFailCount = 0;
  syncHomeCatalogLock();
  state.aiRunning = false;
}

function syncHomeCatalogLock() {
  const home = document.querySelector('.screen[data-screen="home"] .home');
  if (!home) return;
  home.classList.toggle("is-catalog-locked", !state.profileComplete);
}

function bindHomeCatalogLock() {
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

function bindAiVerify() {
  const root = document.querySelector(".screen.active .cp");
  if (!root) return;

  applyAccountLockUI();

  root.querySelectorAll("[data-ai-verify]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.accountLocked) {
        openSheet(root.querySelector("#account-locked-sheet"));
        return;
      }
      runAiVerification(root);
    };
  });

  root.querySelectorAll("[data-ai-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (state.aiRunning) return;
      closeSheet(root.querySelector("#ai-verify-sheet"));
    };
  });

  root.querySelectorAll("[data-submitted-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSheet(root.querySelector("#profile-submitted-sheet"));
    };
  });

  root.querySelectorAll("[data-locked-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeSheet(root.querySelector("#account-locked-sheet"));
    };
  });

  updateDocsCta(root);
}

function bindChipRemoves(dd) {
  dd.querySelectorAll("[data-remove-chip]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const chip = btn.closest("[data-chip]");
      const value = btn.dataset.removeChip;
      if (chip) chip.remove();
      dd.querySelectorAll(".cp-dropdown-option").forEach((o) => {
        if (o.dataset.value === value) o.classList.remove("is-selected");
      });
    };
  });
}

function bindHomeDemo() {
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

const ADD_ID = "__add__";

let dosageLibrary = [
  {
    id: "lib-8h",
    title: "Every 8 hours",
    text: "Take 1 tablet every 8 hours after food. Do not exceed 3 tablets in 24 hours.",
  },
  {
    id: "lib-1x",
    title: "Once daily after food",
    text: "Take 1 tablet once daily after food.",
  },
  {
    id: "lib-sleep",
    title: "Before sleep",
    text: "Take 1 tablet before sleep.",
  },
  {
    id: "lib-2x",
    title: "Twice daily after food",
    text: "Take 1 tablet twice daily after food.",
  },
  {
    id: "lib-3x",
    title: "Three times daily",
    text: "Take 1 tablet three times daily.",
  },
  {
    id: "lib-6h",
    title: "Every 6 hours",
    text: "Take 1 tablet every 6 hours after food.",
  },
  {
    id: "lib-12h",
    title: "Every 12 hours",
    text: "Take 1 tablet every 12 hours.",
  },
  {
    id: "lib-4h",
    title: "Every 4 hours",
    text: "Take 1 tablet every 4 hours if needed. Do not exceed 6 tablets in 24 hours.",
  },
  {
    id: "lib-pain",
    title: "As needed for pain",
    text: "Take 1 tablet as needed for pain. Do not exceed 4 tablets in 24 hours.",
  },
  {
    id: "lib-breakfast",
    title: "With breakfast",
    text: "Take 1 tablet with breakfast.",
  },
  {
    id: "lib-meals",
    title: "After meals",
    text: "Take 1 tablet after meals.",
  },
  {
    id: "lib-before",
    title: "Before food",
    text: "Take 1 tablet 30 minutes before food.",
  },
  {
    id: "lib-cream",
    title: "Apply twice daily",
    text: "Apply a thin layer to the affected area twice daily.",
  },
  {
    id: "lib-syrup",
    title: "Shake well, 5 ml",
    text: "Shake well. Take 5 ml three times daily.",
  },
  {
    id: "lib-drops",
    title: "One drop each eye",
    text: "Instill 1 drop in each eye twice daily.",
  },
  {
    id: "lib-water",
    title: "With plenty of water",
    text: "Take 1 tablet with plenty of water.",
  },
];

function compareDosageTitle(a, b) {
  return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
}

function filterDosageLibrary(query, pinId) {
  const q = (query || "").trim().toLowerCase();
  const items = dosageLibrary.filter((item) => {
    if (pinId && item.id === pinId) return true;
    if (!q) return true;
    return `${item.title} ${item.text}`.toLowerCase().includes(q);
  });
  return items.sort(compareDosageTitle);
}

const DOSAGE_CATALOG = {
  panadol: {
    name: "Panadol Extra 500mg",
    form: "Tablet · 500 mg",
    qty: "2",
    expiry: "12/2027",
    text: "Take 1 tablet every 8 hours after food. Do not exceed 3 tablets in 24 hours.",
    libraryId: "lib-8h",
  },
  brufen: {
    name: "Brufen 400mg",
    form: "Tablet · 400 mg",
    qty: "1",
    expiry: "06/2026",
    text: "",
    libraryId: null,
  },
};

const DOSAGE_PHARMACY = {
  pharmacyName: "Ghaidaa Tayseer Pharmacy",
  address: "Jordan-Amman-Amman - وادي السير - بجانب أسواق نبع وادي السير حي القيسية",
  phone: "",
  pharmacistName: "Ghaidaa Tayseer",
};

const DOSAGE_PRINT = {
  alignment: "right",
  printSize: "80mm",
  fields: {
    pharmacyName: true,
    address: true,
    phone: true,
    productName: true,
    patientName: true,
    dosage: true,
    expiryDate: true,
    dispenseDate: true,
    pharmacistName: true,
  },
};

const SLIP_LABELS = {
  address: "العنوان",
  phone: "هاتف الصيدلية",
  productName: "اسم الصنف",
  patientName: "اسم المريض",
  dosage: "الجرعة",
  expiryDate: "تاريخ الانتهاء",
  dispenseDate: "تاريخ الصرف",
  pharmacistName: "اسم الصيدلي",
};

const DOSAGE_SLIP_SAMPLE = {
  ...DOSAGE_PHARMACY,
  productName: "Men Splash 100 212",
  patientName: "f",
  dosage: "(After lunch) بعد الغداء",
  expiryDate: "06/02/2027",
  dispenseDate: "09/09/2026",
};

function renderDosageReceipt(data, config = DOSAGE_PRINT) {
  const alignment = config.alignment === "left" || config.alignment === "center" ? config.alignment : "right";
  const fields = config.fields;
  const sizeClass = config.printSize === "58mm" ? "pw-slip-58" : "pw-slip-80";
  const dir = alignment === "right" ? "rtl" : "ltr";
  const line = (key, value) => {
    if (!fields[key]) return "";
    return `<p class="pw-slip-line">${escapeDosageHtml(SLIP_LABELS[key])} : ${escapeDosageHtml(value || "")}</p>`;
  };
  let dates = "";
  if (fields.expiryDate && fields.dispenseDate) {
    dates = `<p class="pw-slip-line">${escapeDosageHtml(SLIP_LABELS.expiryDate)} : ${escapeDosageHtml(data.expiryDate || "")} &nbsp;&nbsp; ${escapeDosageHtml(SLIP_LABELS.dispenseDate)} : ${escapeDosageHtml(data.dispenseDate || "")}</p>`;
  } else {
    dates = `${line("expiryDate", data.expiryDate)}${line("dispenseDate", data.dispenseDate)}`;
  }
  return `
    <div class="pw-slip ${sizeClass} pw-slip-${alignment}" dir="${dir}">
      ${fields.pharmacyName ? `<p class="pw-slip-pharmacy">${escapeDosageHtml(data.pharmacyName || "")}</p>` : ""}
      ${line("address", data.address)}
      ${line("phone", data.phone)}
      ${line("productName", data.productName)}
      ${line("patientName", data.patientName)}
      ${line("dosage", data.dosage)}
      ${dates}
      ${line("pharmacistName", data.pharmacistName)}
    </div>`;
}

function slipDataForProduct(item) {
  return {
    ...DOSAGE_PHARMACY,
    productName: item.name,
    patientName: "Ahmad Al-Khatib",
    dosage: item.text,
    expiryDate: item.expiry,
    dispenseDate: "09/09/2026",
  };
}

function findDosageLabel(id) {
  return dosageLibrary.find((item) => item.id === id) || null;
}

function showLocalToast(el, message) {
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    el.hidden = true;
  }, 1600);
}

function bindWebsiteDosage() {
  const canvas = document.querySelector(".screen.active [data-feature-canvas]");
  if (!canvas) return;
  const id = canvas.dataset.featureCanvas;
  if (id === "pos-index") bindDosageFlow();
  if (id === "dosage-library") bindDosageLibrary();
  if (id === "print-config") bindPrintConfig();
}

function bindPrintConfig() {
  const root = document.querySelector(".screen.active [data-feature-canvas='print-config']");
  if (!root) return;

  const footer = root.querySelector("[data-cfg-footer]");
  const toast = root.querySelector("[data-cfg-toast]");
  const listEl = root.querySelector("[data-dosage-tpl-list]");
  const editEl = root.querySelector("[data-dosage-tpl-edit]");
  const previewEl = root.querySelector("[data-slip-preview]");
  let editing = false;

  const setTab = (tab) => {
    root.querySelectorAll("[data-cfg-tab]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.cfgTab === tab);
    });
    root.querySelectorAll("[data-cfg-panel]").forEach((panel) => {
      panel.hidden = panel.dataset.cfgPanel !== tab;
    });
    if (footer) footer.hidden = !(tab === "receipt" || (tab === "dosage" && editing));
  };

  const syncFieldsFromConfig = () => {
    root.querySelectorAll("[data-slip-field]").forEach((input) => {
      input.checked = Boolean(DOSAGE_PRINT.fields[input.dataset.slipField]);
    });
    const sizeEl = root.querySelector("[data-slip-size]");
    if (sizeEl) sizeEl.value = DOSAGE_PRINT.printSize;
    root.querySelectorAll("[data-slip-align]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.slipAlign === DOSAGE_PRINT.alignment);
    });
  };

  const renderPreview = () => {
    if (previewEl) previewEl.innerHTML = renderDosageReceipt(DOSAGE_SLIP_SAMPLE, DOSAGE_PRINT);
    const cards = root.querySelectorAll("[data-dose-tpl]");
    cards.forEach((card) => {
      const active = (DOSAGE_PRINT.printSize === "80mm" && card.dataset.doseTpl === "80mm-right")
        || (DOSAGE_PRINT.printSize === "58mm" && card.dataset.doseTpl === "58mm-left");
      card.classList.toggle("is-active", active);
    });
  };

  const openEditor = (templateId) => {
    editing = true;
    if (templateId === "58mm-left") {
      DOSAGE_PRINT.printSize = "58mm";
      DOSAGE_PRINT.alignment = "left";
    } else {
      DOSAGE_PRINT.printSize = "80mm";
      DOSAGE_PRINT.alignment = "right";
    }
    const nameEl = root.querySelector("[data-dose-tpl-name]");
    const heading = root.querySelector("[data-dose-tpl-heading]");
    if (nameEl) nameEl.value = templateId === "58mm-left" ? "58mm compact" : "80mm dosage";
    if (heading) heading.textContent = "Edit dosage template";
    if (listEl) listEl.hidden = true;
    if (editEl) editEl.hidden = false;
    syncFieldsFromConfig();
    renderPreview();
    setTab("dosage");
  };

  const closeEditor = () => {
    editing = false;
    if (listEl) listEl.hidden = false;
    if (editEl) editEl.hidden = true;
    setTab("dosage");
    renderPreview();
  };

  root.querySelectorAll("[data-cfg-tab]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      if (btn.dataset.cfgTab !== "dosage") editing = false;
      setTab(btn.dataset.cfgTab);
    };
  });

  root.querySelectorAll("[data-dose-tpl-edit]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      openEditor(btn.dataset.doseTplEdit);
    };
  });

  const backBtn = root.querySelector("[data-dose-tpl-back]");
  if (backBtn) {
    backBtn.onclick = (e) => {
      e.preventDefault();
      closeEditor();
    };
  }

  root.querySelectorAll("[data-slip-field]").forEach((input) => {
    input.onchange = () => {
      DOSAGE_PRINT.fields[input.dataset.slipField] = input.checked;
      renderPreview();
    };
  });

  const sizeEl = root.querySelector("[data-slip-size]");
  if (sizeEl) {
    sizeEl.onchange = () => {
      DOSAGE_PRINT.printSize = sizeEl.value;
      renderPreview();
    };
  }
  root.querySelectorAll("[data-slip-align]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      DOSAGE_PRINT.alignment = btn.dataset.slipAlign;
      syncFieldsFromConfig();
      renderPreview();
    };
  });

  const saveBtn = root.querySelector("[data-cfg-save]");
  if (saveBtn) {
    saveBtn.onclick = (e) => {
      e.preventDefault();
      showLocalToast(toast, "Configuration saved");
    };
  }

  setTab("dosage");
  renderPreview();
}

function bindDosageLibrary() {
  const root = document.querySelector(".screen.active [data-feature-canvas='dosage-library']");
  if (!root) return;

  const listEl = root.querySelector("[data-lib-list]");
  const emptyEl = root.querySelector("[data-lib-empty]");
  const countEl = root.querySelector("[data-lib-count]");
  const searchEl = root.querySelector("[data-lib-search]");
  const clearSearchBtn = root.querySelector("[data-lib-search-clear]");
  const addBtn = root.querySelector("[data-lib-add]");
  const dialog = root.querySelector("[data-lib-delete-dialog]");
  const toast = root.querySelector("[data-lib-toast]");
  let pendingDeleteId = null;
  let openId = null;
  let draft = { title: "", text: "" };
  let flashId = null;
  let focusEditor = false;

  const unlinkCatalog = (id) => {
    Object.values(DOSAGE_CATALOG).forEach((product) => {
      if (product.libraryId === id) product.libraryId = null;
    });
  };

  const searchQuery = () => (searchEl?.value || "").trim();

  const isDirty = () => {
    if (!openId) return false;
    if (openId === ADD_ID) return Boolean(draft.title.trim() || draft.text.trim());
    const item = findDosageLabel(openId);
    if (!item) return false;
    return draft.title !== item.title || draft.text !== item.text;
  };

  const captureDraft = () => {
    const nameEl = listEl?.querySelector("[data-editor-name]");
    const textEl = listEl?.querySelector("[data-editor-text]");
    if (nameEl) draft.title = nameEl.value;
    if (textEl) draft.text = textEl.value;
  };

  const scrollToRow = (id) => {
    if (!id) return;
    window.requestAnimationFrame(() => {
      listEl?.querySelector(`[data-lib-id="${id}"]`)?.scrollIntoView({ block: "nearest" });
    });
  };

  const editorHtml = (saveLabel) => `
    <div class="pw-lib-inline">
      <div class="pw-lib-inline-grid">
        <label class="pw-field">
          <span>Name</span>
          <input type="text" data-editor-name value="${escapeDosageHtml(draft.title)}" placeholder="e.g. Once daily after food" />
        </label>
        <label class="pw-field">
          <span>How to take</span>
          <textarea data-editor-text rows="2" placeholder="Take 1 tablet once daily after food.">${escapeDosageHtml(draft.text)}</textarea>
        </label>
      </div>
      <div class="pw-lib-inline-actions">
        <button type="button" class="pw-btn-outline" data-form-cancel>Cancel</button>
        <button type="button" class="pw-complete pw-complete-inline" data-editor-save>${saveLabel}</button>
      </div>
    </div>`;

  const rowHtml = (item) => {
    const open = item.id === openId;
    const flash = item.id === flashId ? " is-flash" : "";
    if (open) {
      return `<article class="pw-lib-row is-open${flash}" data-lib-id="${item.id}">${editorHtml("Save")}</article>`;
    }
    return `
      <article class="pw-lib-row${flash}" data-lib-id="${item.id}">
        <div class="pw-lib-row-copy">
          <strong>${escapeDosageHtml(item.title)}</strong>
          <span>${escapeDosageHtml(item.text)}</span>
        </div>
        <div class="pw-lib-row-actions">
          <button type="button" class="pw-btn-ghost" data-lib-edit="${item.id}">Edit</button>
          <button type="button" class="pw-btn-danger" data-lib-delete="${item.id}">Delete</button>
        </div>
      </article>`;
  };

  const render = () => {
    const query = searchQuery();
    const pinId = openId && openId !== ADD_ID ? openId : null;
    const items = filterDosageLibrary(query, pinId);
    const adding = openId === ADD_ID;
    if (clearSearchBtn) clearSearchBtn.hidden = !query;
    if (addBtn) addBtn.hidden = adding;
    if (countEl) {
      countEl.textContent = query
        ? `${items.length} of ${dosageLibrary.length}`
        : `${dosageLibrary.length} saved`;
    }
    const showEmpty = !dosageLibrary.length && !adding;
    if (emptyEl) emptyEl.hidden = !showEmpty;
    if (!listEl) return;
    if (showEmpty) {
      listEl.hidden = true;
      listEl.innerHTML = "";
      return;
    }
    listEl.hidden = false;
    const rows = [];
    if (adding) {
      rows.push(`<article class="pw-lib-row is-open" data-lib-id="${ADD_ID}">${editorHtml("Add")}</article>`);
    }
    if (!items.length && !adding) {
      rows.push(`<p class="pw-lib-pick-empty">No dosages match “${escapeDosageHtml(searchEl.value)}”.</p>`);
    } else {
      items.forEach((item) => rows.push(rowHtml(item)));
    }
    listEl.innerHTML = rows.join("");
    if (focusEditor) {
      focusEditor = false;
      listEl.querySelector("[data-editor-name]")?.focus();
    }
  };

  const closeEditor = () => {
    openId = null;
    draft = { title: "", text: "" };
    render();
  };

  const warnIfDirty = () => {
    if (!isDirty()) return false;
    showLocalToast(toast, "Save or cancel this dosage first");
    listEl?.querySelector("[data-editor-name]")?.focus();
    return true;
  };

  const startAdd = () => {
    if (openId === ADD_ID) {
      listEl?.querySelector("[data-editor-name]")?.focus();
      return;
    }
    captureDraft();
    if (warnIfDirty()) return;
    openId = ADD_ID;
    draft = { title: "", text: "" };
    focusEditor = true;
    render();
    scrollToRow(ADD_ID);
  };

  const startEdit = (id) => {
    if (openId === id) {
      listEl?.querySelector("[data-editor-name]")?.focus();
      return;
    }
    captureDraft();
    if (warnIfDirty()) return;
    const item = findDosageLabel(id);
    if (!item) return;
    openId = id;
    draft = { title: item.title, text: item.text };
    focusEditor = true;
    render();
    scrollToRow(id);
  };

  const titleTaken = (title, exceptId) => dosageLibrary.some((item) => (
    item.id !== exceptId && item.title.toLowerCase() === title.toLowerCase()
  ));

  const saveLabel = () => {
    captureDraft();
    const title = draft.title.trim();
    const text = draft.text.trim();
    const nameEl = listEl?.querySelector("[data-editor-name]");
    const textEl = listEl?.querySelector("[data-editor-text]");
    if (!title) {
      nameEl?.focus();
      return;
    }
    if (!text) {
      textEl?.focus();
      return;
    }
    const current = openId === ADD_ID ? null : findDosageLabel(openId);
    if (titleTaken(title, current?.id)) {
      showLocalToast(toast, "A label with this name already exists");
      nameEl?.focus();
      return;
    }
    let focusId = null;
    if (current) {
      current.title = title;
      current.text = text;
      Object.values(DOSAGE_CATALOG).forEach((product) => {
        if (product.libraryId === current.id) product.text = text;
      });
      focusId = current.id;
      showLocalToast(toast, "Label saved");
    } else {
      focusId = `lib-${Date.now()}`;
      dosageLibrary.push({ id: focusId, title, text });
      showLocalToast(toast, "Label added");
    }
    openId = null;
    draft = { title: "", text: "" };
    flashId = focusId;
    render();
    scrollToRow(focusId);
    window.setTimeout(() => {
      if (flashId === focusId) {
        flashId = null;
        listEl?.querySelector(`[data-lib-id="${focusId}"]`)?.classList.remove("is-flash");
      }
    }, 1400);
  };

  if (searchEl) {
    searchEl.oninput = () => {
      captureDraft();
      render();
    };
  }

  if (clearSearchBtn) {
    clearSearchBtn.onclick = (e) => {
      e.preventDefault();
      captureDraft();
      if (searchEl) searchEl.value = "";
      render();
      searchEl?.focus();
    };
  }

  if (addBtn) {
    addBtn.onclick = (e) => {
      e.preventDefault();
      startAdd();
    };
  }

  if (listEl) {
    listEl.oninput = (e) => {
      if (e.target.matches("[data-editor-name]")) draft.title = e.target.value;
      if (e.target.matches("[data-editor-text]")) draft.text = e.target.value;
    };
    listEl.onkeydown = (e) => {
      if (!openId) return;
      if (e.key === "Escape") {
        e.preventDefault();
        closeEditor();
        return;
      }
      const fromName = e.key === "Enter" && e.target.matches("[data-editor-name]");
      const saveCombo = e.key === "Enter" && (e.metaKey || e.ctrlKey);
      if (fromName || saveCombo) {
        e.preventDefault();
        saveLabel();
      }
    };
    listEl.onclick = (e) => {
      if (e.target.closest("[data-editor-save]")) {
        e.preventDefault();
        saveLabel();
        return;
      }
      if (e.target.closest("[data-form-cancel]")) {
        e.preventDefault();
        closeEditor();
        return;
      }
      const deleteBtn = e.target.closest("[data-lib-delete]");
      if (deleteBtn) {
        e.preventDefault();
        pendingDeleteId = deleteBtn.dataset.libDelete;
        const item = findDosageLabel(pendingDeleteId);
        const deleteNameEl = root.querySelector("[data-lib-delete-name]");
        if (deleteNameEl) deleteNameEl.textContent = item?.title || "this label";
        if (dialog) dialog.hidden = false;
        return;
      }
      const editBtn = e.target.closest("[data-lib-edit]");
      if (editBtn) {
        e.preventDefault();
        startEdit(editBtn.dataset.libEdit);
        return;
      }
      const row = e.target.closest("[data-lib-id]");
      if (row && row.dataset.libId !== ADD_ID && !row.classList.contains("is-open")) {
        startEdit(row.dataset.libId);
      }
    };
  }

  const cancelDelete = root.querySelector("[data-lib-delete-cancel]");
  if (cancelDelete) {
    cancelDelete.onclick = (e) => {
      e.preventDefault();
      pendingDeleteId = null;
      if (dialog) dialog.hidden = true;
    };
  }

  const confirmDelete = root.querySelector("[data-lib-delete-confirm]");
  if (confirmDelete) {
    confirmDelete.onclick = (e) => {
      e.preventDefault();
      if (pendingDeleteId) {
        if (openId === pendingDeleteId) {
          openId = null;
          draft = { title: "", text: "" };
        }
        dosageLibrary = dosageLibrary.filter((item) => item.id !== pendingDeleteId);
        unlinkCatalog(pendingDeleteId);
        showLocalToast(toast, "Label deleted");
      }
      pendingDeleteId = null;
      if (dialog) dialog.hidden = true;
      render();
    };
  }

  render();
}

function escapeDosageHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

function bindDosageFlow() {
  const root = document.querySelector(".screen.active .pw");
  if (!root || !root.querySelector("#pw-dosage-sheet")) return;

  const WRITE_VALUE = "__write__";
  const catalogIds = () => Object.keys(DOSAGE_CATALOG);
  const sheet = root.querySelector("#pw-dosage-sheet");
  const toast = root.querySelector("[data-dose-toast]");
  const textEl = root.querySelector("[data-dose-text]");
  const writePane = root.querySelector("[data-dose-write-pane]");
  const pickPane = root.querySelector("[data-dose-pick-pane]");
  const chosenEl = root.querySelector("[data-dose-chosen]");
  const chosenTitle = root.querySelector("[data-dose-chosen-title]");
  const chosenText = root.querySelector("[data-dose-chosen-text]");
  const filterEl = root.querySelector("[data-dose-filter]");
  const optionsEl = root.querySelector("[data-dose-options]");
  const productsEl = root.querySelector("[data-dose-products]");
  const previewEl = root.querySelector("[data-dose-preview-host]");
  const previewWrap = root.querySelector("[data-dose-preview-wrap]");
  const printBtn = root.querySelector("[data-dose-print]");
  const printLabel = root.querySelector("[data-dose-print-label]");
  let currentId = "panadol";
  let pendingComplete = false;
  let printQueue = false;
  let selectedDoseId = "";
  let listOpen = false;

  const openSheet = (id, queue) => {
    printQueue = Boolean(queue);
    fillSheet(id);
    if (sheet) sheet.hidden = false;
  };

  const currentText = () => {
    if (selectedDoseId === WRITE_VALUE) return textEl?.value.trim() || "";
    return findDosageLabel(selectedDoseId)?.text || "";
  };

  const isLastInQueue = () => {
    const ids = catalogIds();
    return ids.indexOf(currentId) === ids.length - 1;
  };

  const syncPrintButton = () => {
    const ready = Boolean(currentText());
    if (printBtn) printBtn.disabled = !ready;
    if (printLabel) {
      printLabel.textContent = printQueue && !isLastInQueue() ? "Print & next" : "Print";
    }
  };

  const syncPreview = () => {
    const item = DOSAGE_CATALOG[currentId];
    if (!previewEl || !item) return;
    previewEl.innerHTML = renderDosageReceipt(
      slipDataForProduct({ ...item, text: currentText() }),
      DOSAGE_PRINT
    );
    syncPrintButton();
  };

  const renderProducts = () => {
    if (!productsEl) return;
    const ids = catalogIds();
    productsEl.hidden = ids.length < 2;
    productsEl.innerHTML = ids.map((id) => {
      const item = DOSAGE_CATALOG[id];
      const ready = Boolean(item.text);
      return `
        <button type="button" class="pw-dose-pill${id === currentId ? " is-on" : ""}" data-dose-product="${id}">
          <span>${escapeDosageHtml(item.name)}</span>
          ${ready ? `<em>Ready</em>` : ""}
        </button>`;
    }).join("");
  };

  const renderDoseOptions = () => {
    if (!optionsEl) return;
    const query = (filterEl?.value || "").trim();
    let items = filterDosageLibrary(query);
    if (selectedDoseId && selectedDoseId !== WRITE_VALUE && !items.some((item) => item.id === selectedDoseId)) {
      const pinned = findDosageLabel(selectedDoseId);
      if (pinned) items = [pinned, ...items.filter((item) => item.id !== pinned.id)];
    }
    optionsEl.innerHTML = [
      ...items.map((item) => `
        <button type="button" class="pw-combo-item${item.id === selectedDoseId ? " is-on" : ""}" data-dose-pick="${item.id}">
          <strong>${escapeDosageHtml(item.title)}</strong>
          <span>${escapeDosageHtml(item.text)}</span>
        </button>`),
      items.length
        ? ""
        : `<p class="pw-lib-pick-empty">No dosages match that search.</p>`,
      `<button type="button" class="pw-combo-item pw-combo-write${selectedDoseId === WRITE_VALUE ? " is-on" : ""}" data-dose-pick="${WRITE_VALUE}">Write a one-off…</button>`,
    ].join("");
  };

  const applySelectMode = () => {
    const isWrite = selectedDoseId === WRITE_VALUE;
    const saved = !isWrite && findDosageLabel(selectedDoseId);
    const showList = listOpen || (!saved && !isWrite);
    if (pickPane) pickPane.hidden = !showList;
    if (chosenEl) chosenEl.hidden = showList || isWrite || !saved;
    if (writePane) writePane.hidden = !isWrite;
    if (previewWrap) previewWrap.hidden = showList;
    if (saved) {
      if (chosenTitle) chosenTitle.textContent = saved.title;
      if (chosenText) chosenText.textContent = saved.text;
    }
    if (isWrite && textEl && !textEl.value) {
      const item = DOSAGE_CATALOG[currentId];
      if (item?.text && !findDosageLabel(item.libraryId)) textEl.value = item.text;
    }
    renderProducts();
    renderDoseOptions();
    syncPreview();
  };

  const fillSheet = (id) => {
    const item = DOSAGE_CATALOG[id];
    if (!item) return;
    currentId = id;
    const matchedId = item.libraryId && findDosageLabel(item.libraryId)
      ? item.libraryId
      : dosageLibrary.find((label) => label.text === item.text)?.id || "";
    root.querySelectorAll("[data-dose-name]").forEach((el) => {
      el.textContent = item.name;
    });
    const formEl = root.querySelector("[data-dose-form]");
    const qtyEl = root.querySelector("[data-dose-qty]");
    if (formEl) formEl.textContent = item.form;
    if (qtyEl) qtyEl.textContent = item.qty;
    if (textEl) textEl.value = matchedId ? "" : item.text;
    if (filterEl) filterEl.value = "";
    if (matchedId) {
      selectedDoseId = matchedId;
      listOpen = false;
    } else if (item.text) {
      selectedDoseId = WRITE_VALUE;
      listOpen = false;
    } else {
      selectedDoseId = "";
      listOpen = true;
    }
    applySelectMode();
  };

  const saveCurrent = () => {
    const item = DOSAGE_CATALOG[currentId];
    if (!item) return false;
    const text = currentText();
    if (!text) return false;
    item.text = text;
    item.libraryId = selectedDoseId && selectedDoseId !== WRITE_VALUE ? selectedDoseId : null;
    return true;
  };

  const sendToPrinter = () => {
    if (!saveCurrent()) {
      if (selectedDoseId === WRITE_VALUE) textEl?.focus();
      else {
        listOpen = true;
        applySelectMode();
        filterEl?.focus();
      }
      return;
    }
    const nextId = printQueue ? catalogIds()[catalogIds().indexOf(currentId) + 1] : null;
    if (nextId) {
      showLocalToast(toast, "Printed · next item");
      fillSheet(nextId);
      return;
    }
    if (sheet) sheet.hidden = true;
    showLocalToast(
      toast,
      pendingComplete ? "Sale completed · dosage sent to printer" : "Dosage sent to printer"
    );
    pendingComplete = false;
    printQueue = false;
  };

  root.querySelectorAll("[data-dosage-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      pendingComplete = false;
      printQueue = false;
      if (sheet) sheet.hidden = true;
    };
  });

  if (filterEl) {
    filterEl.oninput = () => {
      renderDoseOptions();
    };
  }
  if (optionsEl) {
    optionsEl.onclick = (e) => {
      const pick = e.target.closest("[data-dose-pick]");
      if (!pick) return;
      e.preventDefault();
      selectedDoseId = pick.dataset.dosePick;
      listOpen = false;
      applySelectMode();
      if (selectedDoseId === WRITE_VALUE) textEl?.focus();
    };
  }
  if (productsEl) {
    productsEl.onclick = (e) => {
      const pill = e.target.closest("[data-dose-product]");
      if (!pill || pill.dataset.doseProduct === currentId) return;
      e.preventDefault();
      if (currentText()) saveCurrent();
      fillSheet(pill.dataset.doseProduct);
    };
  }
  root.querySelectorAll("[data-dose-change]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      listOpen = true;
      if (selectedDoseId === WRITE_VALUE) selectedDoseId = "";
      if (filterEl) filterEl.value = "";
      applySelectMode();
      filterEl?.focus();
    };
  });
  if (textEl) textEl.oninput = syncPreview;

  if (printBtn) {
    printBtn.onclick = (e) => {
      e.preventDefault();
      sendToPrinter();
    };
  }

  const printAllBtn = root.querySelector("[data-print-all-dosages]");
  if (printAllBtn) {
    printAllBtn.onclick = (e) => {
      e.preventDefault();
      pendingComplete = false;
      openSheet(catalogIds()[0], true);
    };
  }

  root.querySelectorAll("[data-print-row]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      pendingComplete = false;
      openSheet(btn.dataset.printRow, false);
    };
  });

  const completeBtn = root.querySelector("[data-complete-sale]");
  if (completeBtn) {
    completeBtn.onclick = (e) => {
      e.preventDefault();
      const printOnComplete = root.querySelector("[data-print-on-complete]");
      if (printOnComplete && printOnComplete.checked) {
        pendingComplete = true;
        openSheet(catalogIds()[0], true);
        return;
      }
      showLocalToast(toast, "Sale completed");
    };
  }
}

function bindOtpInputs() {
  const boxes = [...document.querySelectorAll(".screen.active .otp-box")];
  if (!boxes.length) return;
  boxes.forEach((box, i) => {
    box.oninput = () => {
      box.value = box.value.replace(/\D/g, "").slice(0, 1);
      if (box.value && i < boxes.length - 1) boxes[i + 1].focus();
      const code = boxes.map((b) => b.value).join("");
      if (code.length === boxes.length) goToId("home");
    };
    box.onkeydown = (e) => {
      if (e.key === "Backspace" && !box.value && i > 0) boxes[i - 1].focus();
    };
  });
}

function goTo(index, opts = {}) {
  const flow = activeFlow();
  if (!flow.length) {
    state.current = 0;
    if (els.flowProgress) els.flowProgress.textContent = "0 / 0";
    if (els.progressFill) els.progressFill.style.width = "0%";
    if (els.prevBtn) els.prevBtn.disabled = true;
    if (els.nextBtn) els.nextBtn.disabled = true;
    if (!opts.fromRoute) writeRoute("replace");
    requestAnimationFrame(fitPreview);
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
    bindGoto();
  } catch (err) {
    console.error("bindGoto failed", err);
  }

  if (step.id === "home") {
    try {
      bindHomeCatalogLock();
    } catch (err) {
      console.error("bindHomeCatalogLock failed", err);
    }
  }

  if (!opts.fromRoute) writeRoute("replace");
  updateChips();
  requestAnimationFrame(fitPreview);
}

function goToId(id) {
  const inEpic = activeFlow().findIndex((s) => s.id === id);
  if (inEpic >= 0) {
    goTo(inEpic);
    return;
  }

  // Linked screens outside the active epic step list (e.g. Log in from landing)
  const el =
    previewRoot()?.querySelector(`.screen[data-screen="${id}"]`) ||
    els.phoneScreen?.querySelector(`.screen[data-screen="${id}"]`);
  if (el) {
    el.parentElement?.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
    el.classList.add("active");
  }
}

function fitPreview() {
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

function onRouteChange() {
  const route = parseRoute();
  if (routeMatchesState(route)) return;
  applyRoute();
}

function bindEvents() {
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

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    const typing =
      /^(INPUT|TEXTAREA|SELECT)$/.test(tag || "") ||
      document.activeElement?.isContentEditable;
    if (!typing) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(state.current + 1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(state.current - 1);
      }
    }
    if (e.key === " " && !typing) {
      e.preventDefault();
      if (state.isPlaying) pauseDemo();
      else playDemo();
    }
  });

  window.addEventListener("resize", fitPreview);
}

function cacheElements() {
  els = {
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
  };
}

function init() {
  document.getElementById("app").innerHTML = renderShell();
  cacheElements();
  mountScreens();
  bindEvents();

  document.documentElement.classList.add("view-code");
  document.documentElement.classList.remove("view-photo", "mode-ai");
  applyRoute();
  updatePlayState();
}

init();
