/* ── js/templates/signup-templates.js ── */
/** Pixel-perfect HTML — rebuilt screen by screen. */

const iconUser = `<svg class="ca-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M12 12a4.2 4.2 0 1 0 0-8.4 4.2 4.2 0 0 0 0 8.4Z"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4.5 20.2a7.5 7.5 0 0 1 15 0"/></svg>`;

const iconLock = `<svg class="ca-ico" viewBox="0 0 24 24" aria-hidden="true"><rect x="5.2" y="10.5" width="13.6" height="10" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M8.2 10.5V7.8a3.8 3.8 0 0 1 7.6 0v2.7"/><circle cx="12" cy="15.4" r="1.15" fill="currentColor"/></svg>`;

const iconEyeOff = `<svg class="ca-ico ca-ico-eye" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M3.5 3.5 20.5 20.5"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M10.1 10.2a2.6 2.6 0 0 0 3.7 3.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M6.7 6.9C4.7 8.2 3.2 10 2.4 12c1.7 4.2 5.4 7 9.6 7 1.7 0 3.3-.4 4.7-1.2"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M14.1 5.4A10.4 10.4 0 0 1 12 5.1c-4.2 0-7.9 2.8-9.6 7a11.6 11.6 0 0 0 2.4 3.5"/></svg>`;

const iconGlobe = `<svg class="ca-ico ca-ico-globe" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M3.8 12h16.4M12 3.8c2.2 2.4 3.3 5.2 3.3 8.2S14.2 17.8 12 20.2C9.8 17.8 8.7 15 8.7 12S9.8 6.2 12 3.8Z"/></svg>`;

const iconBack = `<svg class="ca-ico ca-ico-back" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M15 5.5 8.5 12 15 18.5"/></svg>`;

const iconChevron = `<svg class="ca-ico ca-ico-chevron" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="m7 10 5 5 5-5"/></svg>`;

const egyptFlag = `<span class="ca-flag" aria-hidden="true"><span class="ca-flag-stripe red"></span><span class="ca-flag-stripe white"><span class="ca-flag-eagle"></span></span><span class="ca-flag-stripe black"></span></span>`;

const jordanFlag = `<span class="ca-flag ca-flag-jordan" aria-hidden="true"><span class="ca-flag-stripe black"></span><span class="ca-flag-stripe white"></span><span class="ca-flag-stripe green"></span><span class="ca-flag-triangle"></span></span>`;

function caHero(backGoto = "", { languageLabel = "العربية", showGlobe = true, languageSide = "right" } = {}) {
  const back = backGoto
    ? `<button type="button" class="ca-back" data-goto="${backGoto}" aria-label="Back">${iconBack}</button>`
    : "";
  const langInner = showGlobe
    ? `<span>${languageLabel}</span>${iconGlobe}`
    : `<span>${languageLabel}</span>`;
  const langClass = [
    "ca-lang",
    showGlobe ? "" : "ca-lang-text",
    languageSide === "left" ? "ca-lang-left" : "",
  ].filter(Boolean).join(" ");
  return `
    <div class="ca-hero">
      <img class="ca-hero-wave" src="scr/new-sign-up/header-wave.png" alt="" />
      <div class="ca-status">
        <span class="ca-time">9:41</span>
        <span class="ca-status-icons" aria-hidden="true">
          <svg viewBox="0 0 18 12"><rect x="0.5" y="7" width="3" height="4.5" rx="0.6" fill="currentColor"/><rect x="5" y="5" width="3" height="6.5" rx="0.6" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="9" rx="0.6" fill="currentColor"/><rect x="14" y="0.5" width="3" height="11" rx="0.6" fill="currentColor"/></svg>
          <svg viewBox="0 0 16 12"><path fill="currentColor" d="M8 3.2c1.9 0 3.6.7 4.9 1.9l-1.2 1.2A5.3 5.3 0 0 0 8 4.8c-1.4 0-2.7.5-3.7 1.5L3.1 5.1A7.2 7.2 0 0 1 8 3.2Zm0 3.2c1 0 1.9.4 2.6 1l-1.2 1.2A2.2 2.2 0 0 0 8 8c-.6 0-1.1.2-1.5.6L5.3 7.4A3.8 3.8 0 0 1 8 6.4Zm0 3.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
          <svg viewBox="0 0 25 12"><rect x="0.6" y="1.2" width="19.5" height="9.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2.2" y="2.8" width="15" height="6.4" rx="1.2" fill="currentColor"/><path fill="currentColor" d="M21.2 4.1h1.4a1.6 1.6 0 0 1 0 3.8h-1.4V4.1Z"/></svg>
        </span>
      </div>
      ${back}
      <button type="button" class="${langClass}" aria-label="${languageLabel}">
        ${langInner}
      </button>
      <img class="ca-logo" src="scr/new-sign-up/aumet-logo-white.png" alt="aumet" />
    </div>`;
}

const iconTabCheck = `<svg class="cp-tab-check" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8" fill="currentColor"/><path fill="#fff" d="M6.7 10.6 4.4 8.3l.9-.9 1.4 1.4 3.2-3.2.9.9-4.1 4.1Z"/></svg>`;

const iconMore = `<svg class="cp-ico-more" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="5" r="1.6" fill="currentColor"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/><circle cx="12" cy="19" r="1.6" fill="currentColor"/></svg>`;

const iconClose = `<svg class="cp-ico-close" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M7 7l10 10M17 7 7 17"/></svg>`;

const iconEye = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M2.5 12s3.5-6.5 9.5-6.5S21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="currentColor" stroke-width="1.7"/></svg>`;

const iconReplace = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4.5 12a7.5 7.5 0 0 1 12.4-5.7L19 8.5"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M19.5 4.5v4h-4"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M19.5 12a7.5 7.5 0 0 1-12.4 5.7L5 15.5"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5v-4h4"/></svg>`;

const iconTrash = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" d="M5 7.5h14M9.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 6v1.5M8 7.5l.7 11a1.5 1.5 0 0 0 1.5 1.4h4.6a1.5 1.5 0 0 0 1.5-1.4l.7-11"/></svg>`;

const iconDocMissing = `<svg viewBox="0 0 40 40" aria-hidden="true"><rect x="8" y="6" width="24" height="28" rx="3" fill="#fff7ed" stroke="#fb923c" stroke-width="1.5"/><path fill="#fb923c" d="M14 14h12v2H14zm0 5h12v2H14zm0 5h8v2h-8z"/></svg>`;

const iconAiCheck = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="#fff" d="M10.2 15.4 6.8 12l1.2-1.2 2.2 2.2 5-5 1.2 1.2-6.2 6.2Z"/></svg>`;

const iconAiFail = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path fill="#fff" stroke="#fff" stroke-width="1.6" stroke-linecap="round" d="M8.5 8.5l7 7M15.5 8.5l-7 7"/></svg>`;

const iconSubmittedCheck = `<svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="28" fill="#04bca6"/><path fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" d="M22 37.5 31.5 47 50 26"/></svg>`;

const docUpdateSheet = `
      <div class="cp-sheet" id="doc-update-sheet" hidden>
        <button type="button" class="cp-sheet-backdrop" data-sheet-close aria-label="Dismiss"></button>
        <div class="cp-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="doc-update-title">
          <div class="cp-sheet-handle" aria-hidden="true"></div>
          <div class="cp-sheet-head">
            <button type="button" class="cp-sheet-close" data-sheet-close aria-label="Close">${iconClose}</button>
            <h2 id="doc-update-title">Update Document</h2>
            <span class="cp-sheet-head-spacer"></span>
          </div>
          <div class="cp-sheet-actions">
            <button type="button" class="cp-sheet-action" data-doc-action="view">
              <span class="cp-sheet-action-ico">${iconEye}</span>
              <span>View document</span>
            </button>
            <button type="button" class="cp-sheet-action" data-doc-action="replace">
              <span class="cp-sheet-action-ico">${iconReplace}</span>
              <span>Replace document</span>
            </button>
            <button type="button" class="cp-sheet-action is-danger" data-doc-action="delete">
              <span class="cp-sheet-action-ico">${iconTrash}</span>
              <span>Delete document</span>
            </button>
          </div>
        </div>
      </div>`;

const aiSubmitSheets = `
      <div class="cp-sheet cp-sheet-ai" id="ai-verify-sheet" hidden>
        <button type="button" class="cp-sheet-backdrop" data-ai-close aria-label="Dismiss"></button>
        <div class="cp-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="ai-verify-title">
          <div class="cp-sheet-handle" aria-hidden="true"></div>
          <div class="cp-sheet-head">
            <button type="button" class="cp-sheet-close" data-ai-close aria-label="Close">${iconClose}</button>
            <h2 id="ai-verify-title">AI Verification</h2>
            <span class="cp-sheet-head-spacer"></span>
          </div>
          <p class="cp-ai-sub">Verifying that each document is valid…</p>
          <ul class="cp-ai-list" id="ai-verify-list">
            <li class="cp-ai-row" data-ai-doc="license">
              <span class="cp-ai-name">Pharmacy license</span>
              <span class="cp-ai-status" data-ai-status>Waiting</span>
            </li>
            <li class="cp-ai-row" data-ai-doc="tax">
              <span class="cp-ai-name">Tax Card</span>
              <span class="cp-ai-status" data-ai-status>Waiting</span>
            </li>
            <li class="cp-ai-row" data-ai-doc="trade">
              <span class="cp-ai-name">Trade Registry</span>
              <span class="cp-ai-status" data-ai-status>Waiting</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="cp-sheet cp-sheet-submitted" id="profile-submitted-sheet" hidden>
        <button type="button" class="cp-sheet-backdrop" data-submitted-close aria-label="Dismiss"></button>
        <div class="cp-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="profile-submitted-title">
          <div class="cp-sheet-handle" aria-hidden="true"></div>
          <div class="cp-sheet-head">
            <button type="button" class="cp-sheet-close" data-submitted-close aria-label="Close">${iconClose}</button>
            <h2 id="profile-submitted-title">Profile Submitted</h2>
            <span class="cp-sheet-head-spacer"></span>
          </div>
          <div class="cp-submitted-hero" aria-hidden="true">
            <div class="cp-submitted-mark">${iconSubmittedCheck}</div>
          </div>
          <p class="cp-submitted-copy">Your pharmacy profile has been submitted for verification. We'll notify you once it's reviewed.</p>
          <button type="button" class="ca-cta cp-cta" data-goto="home">Go to Home</button>
        </div>
      </div>

      <div class="cp-sheet cp-sheet-locked" id="account-locked-sheet" hidden>
        <button type="button" class="cp-sheet-backdrop" data-locked-close aria-label="Dismiss"></button>
        <div class="cp-sheet-panel" role="dialog" aria-modal="true" aria-labelledby="account-locked-title">
          <div class="cp-sheet-handle" aria-hidden="true"></div>
          <div class="cp-sheet-head">
            <button type="button" class="cp-sheet-close" data-locked-close aria-label="Close">${iconClose}</button>
            <h2 id="account-locked-title">We'll help you finish</h2>
            <span class="cp-sheet-head-spacer"></span>
          </div>
          <div class="cp-locked-hero" aria-hidden="true">
            <div class="cp-locked-mark">
              <svg viewBox="0 0 72 72" aria-hidden="true"><circle cx="36" cy="36" r="28" fill="#fff7ed"/><path fill="none" stroke="#ea580c" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M28 34v-6a8 8 0 0 1 16 0v6"/><rect x="24" y="34" width="24" height="18" rx="4" fill="#ea580c"/><circle cx="36" cy="43" r="2.4" fill="#fff"/></svg>
            </div>
          </div>
          <p class="cp-submitted-copy">We couldn’t verify your documents after a few tries, so uploads are paused for safety. Our support team will contact you soon to help complete your pharmacy profile.</p>
          <button type="button" class="ca-cta cp-cta" data-locked-close>Got it</button>
        </div>
      </div>`;

const iconLocPin = `<svg class="cp-map-pin" viewBox="0 0 48 64" aria-hidden="true"><path fill="#04bca6" d="M24 0C12.4 0 3 9.4 3 21c0 14.6 17.4 37.2 18.2 38.2a3 3 0 0 0 4.6 0C26.6 58.2 45 35.6 45 21 45 9.4 35.6 0 24 0Z"/><circle cx="24" cy="21" r="11" fill="#fff"/><path fill="#04bca6" d="M18.5 18.5h3.2v-3.2h4.6v3.2H29.5v4.6h-3.2v3.2h-4.6v-3.2h-3.2z"/></svg>`;

const iconLocate = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2"/></svg>`;

const iconLocMark = `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2.5c-3.9 0-7 3.1-7 7 0 5.2 6.2 12.2 6.5 12.5a.7.7 0 0 0 1 0C12.8 21.7 19 14.7 19 9.5c0-3.9-3.1-7-7-7Zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z"/></svg>`;

function cpShell({ activeTab, backGoto, scrollClass = "", body, footer, overlay = "" }) {
  return `
    <div class="cp">
      <div class="cp-status">
        <span>9:41</span>
        <span class="home-status-icons" aria-hidden="true">
          <svg viewBox="0 0 18 12"><rect x="0.5" y="7" width="3" height="4.5" rx="0.6" fill="currentColor"/><rect x="5" y="5" width="3" height="6.5" rx="0.6" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="9" rx="0.6" fill="currentColor"/><rect x="14" y="0.5" width="3" height="11" rx="0.6" fill="currentColor"/></svg>
          <svg viewBox="0 0 16 12"><path fill="currentColor" d="M8 3.2c1.9 0 3.6.7 4.9 1.9l-1.2 1.2A5.3 5.3 0 0 0 8 4.8c-1.4 0-2.7.5-3.7 1.5L3.1 5.1A7.2 7.2 0 0 1 8 3.2Zm0 3.2c1 0 1.9.4 2.6 1l-1.2 1.2A2.2 2.2 0 0 0 8 8c-.6 0-1.1.2-1.5.6L5.3 7.4A3.8 3.8 0 0 1 8 6.4Zm0 3.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
          <svg viewBox="0 0 25 12"><rect x="0.6" y="1.2" width="19.5" height="9.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2.2" y="2.8" width="15" height="6.4" rx="1.2" fill="currentColor"/><path fill="currentColor" d="M21.2 4.1h1.4a1.6 1.6 0 0 1 0 3.8h-1.4V4.1Z"/></svg>
        </span>
      </div>

      <div class="cp-topbar">
        <button type="button" class="cp-back" data-goto="${backGoto}" aria-label="Back">${iconBack}</button>
        <h1>Complete Profile</h1>
        <span class="cp-topbar-spacer"></span>
      </div>

      ${profileTabs(activeTab)}

      <div class="cp-scroll ${scrollClass}">
        ${body}
      </div>

      <div class="cp-footer">
        ${footer}
      </div>

      ${overlay}
    </div>`;
}

function profileTabs(active = 1) {
  const steps = [
    { n: 1, label: "Information", id: "complete-info" },
    { n: 2, label: "Location", id: "complete-location" },
    { n: 3, label: "Documents", id: "complete-documents" },
  ];
  return `<div class="cp-tabs">${steps
    .map((s) => {
      const state = s.n === active ? "is-active" : s.n < active ? "is-done" : "";
      const label =
        s.n < active
          ? `${iconTabCheck}<span class="cp-tab-text">${s.n}.${s.label}</span>`
          : `<span class="cp-tab-text">${s.n}.${s.label}</span>`;
      return `<button type="button" class="cp-tab ${state}" data-goto="${s.id}">
        <span class="cp-tab-label">${label}</span>
        <span class="cp-tab-line"></span>
      </button>`;
    })
    .join("")}</div>`;
}

function cpDropdown(name, value, options, { multi = false, chips = [] } = {}) {
  const triggerInner = multi
    ? `<span class="cp-dropdown-chips">${chips
        .map(
          (c) =>
            `<span class="cp-chip" data-chip="${c}">${c} <button type="button" data-remove-chip="${c}" aria-label="Remove">×</button></span>`
        )
        .join("")}</span>`
    : `<span class="cp-dropdown-value">${value}</span>`;

  return `
    <div class="cp-dropdown${multi ? " is-multi" : ""}" data-dropdown="${name}"${multi ? ' data-multi="true"' : ""}>
      <button type="button" class="cp-select cp-dropdown-trigger" aria-haspopup="listbox" aria-expanded="false">
        ${triggerInner}
        ${iconChevron}
      </button>
      <div class="cp-dropdown-menu" role="listbox" hidden>
        ${options
          .map(
            (opt) =>
              `<button type="button" class="cp-dropdown-option${(!multi && opt === value) || (multi && chips.includes(opt)) ? " is-selected" : ""}" data-value="${opt}" role="option">${opt}</button>`
          )
          .join("")}
      </div>
    </div>`;
}

const codeTemplates = {
  landing: `
    <div class="ca ca-landing" data-landing-carousel>
      <img class="ca-landing-shot is-active" src="scr/onboarding/onboard-1.png" alt="Your Pharmacy’s Order Anywhere, Anytime" data-slide="0" />
      <img class="ca-landing-shot" src="scr/onboarding/onboard-2.png" alt="One Stop Shop" data-slide="1" hidden />
      <img class="ca-landing-shot" src="scr/onboarding/onboard-3.png" alt="Compare Products & Discover Hot Offers" data-slide="2" hidden />

      <button type="button" class="ca-landing-hit ca-landing-hit-register" data-goto="create-account" aria-label="Register as Pharmacy"></button>
      <button type="button" class="ca-landing-hit ca-landing-hit-login" data-goto="login" aria-label="Log In"></button>
      <button type="button" class="ca-landing-hit ca-landing-hit-help" aria-label="Need Help?"></button>

      <div class="ca-landing-swipe" data-landing-swipe aria-hidden="true"></div>

      <div class="ca-landing-dot-hits" role="tablist" aria-label="Onboarding slides">
        <button type="button" class="is-active" data-landing-dot="0" aria-label="Slide 1"></button>
        <button type="button" data-landing-dot="1" aria-label="Slide 2"></button>
        <button type="button" data-landing-dot="2" aria-label="Slide 3"></button>
      </div>
    </div>`,

  "create-account": `
    <div class="ca">
      ${caHero("landing")}

      <div class="ca-body">
        <h1 class="ca-title">Create New Account</h1>
        <p class="ca-sub">Start now, complete your pharmacy profile later</p>

        <label class="ca-field ca-f1">
          ${iconUser}
          <input type="text" placeholder="Full Name" autocomplete="name" />
        </label>

        <label class="ca-field ca-field-phone ca-f2">
          <button type="button" class="ca-cc" aria-label="Country code">
            ${egyptFlag}
            <span class="ca-cc-code">+20</span>
            ${iconChevron}
          </button>
          <span class="ca-cc-divider" aria-hidden="true"></span>
          <input type="tel" placeholder="Phone number" autocomplete="tel" />
        </label>

        <label class="ca-field ca-f3">
          ${iconLock}
          <input type="password" placeholder="Password" autocomplete="new-password" />
          <button type="button" class="ca-eye" aria-label="Show password">${iconEyeOff}</button>
        </label>

        <label class="ca-terms">
          <input type="checkbox" checked />
          <span class="ca-check" aria-hidden="true"></span>
          <span class="ca-terms-text">I agree to the <a href="#">Terms of Service &amp; Privacy Policy</a></span>
        </label>

        <button type="button" class="ca-cta" data-goto="verify-otp">Create Account</button>

        <p class="ca-login">Already have an account ? <a href="#" data-goto="login">Log in</a></p>
      </div>

      <div class="ca-home-indicator" aria-hidden="true"></div>
    </div>`,

  login: `
    <div class="ca ca-login-screen">
      ${caHero("landing", { languageLabel: "Language", showGlobe: false })}

      <div class="ca-body">
        <h1 class="ca-title">Log In</h1>

        <button type="button" class="ca-country-chip" aria-label="Country">
          ${jordanFlag}
          ${iconChevron}
        </button>

        <label class="ca-field ca-login-id">
          <input type="text" placeholder="Email address or Mobile number" autocomplete="username" />
        </label>

        <label class="ca-field ca-login-pass">
          <input type="password" placeholder="Password" autocomplete="current-password" />
          <button type="button" class="ca-eye" aria-label="Show password">${iconEyeOff}</button>
        </label>

        <a href="#" class="ca-forgot">Forgot password?</a>

        <button type="button" class="ca-cta ca-cta-disabled" disabled>Log In</button>

        <p class="ca-login">Don't have an account? <a href="#" data-goto="create-account">Register now</a></p>

        <button type="button" class="ca-need-help">Need Help?</button>
      </div>

      <div class="ca-home-indicator" aria-hidden="true"></div>
    </div>`,

  "verify-otp": `
    <div class="otp">
      <div class="otp-topbar">
        <button type="button" class="otp-back" data-goto="create-account" aria-label="Back">${iconBack}</button>
        <h1 class="otp-title">Verify Phone Number</h1>
        <button type="button" class="otp-skip" data-goto="home">Skip</button>
      </div>

        <p class="otp-sent">A code has been sent to <strong>780605399</strong> <a href="#" class="otp-edit" data-goto="create-account">Edit</a></p>

      <div class="otp-boxes" role="group" aria-label="Verification code">
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 1" />
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 2" />
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 3" />
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 4" />
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 5" />
        <input class="otp-box" type="text" inputmode="numeric" maxlength="1" aria-label="Digit 6" />
      </div>

      <p class="otp-missed">Didn't get the code?</p>
      <p class="otp-timer">resend code in 24 secs</p>

      <div class="otp-divider"></div>

      <button type="button" class="otp-support">
        <span class="otp-support-ico" aria-hidden="true">
          <svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.3 2 11.6c0 2.9 1.4 5.5 3.6 7.3V22l3.3-1.8c.9.3 1.9.4 3.1.4 5.5 0 10-4.3 10-9.6S17.5 2 12 2Zm5.4 13.7c-.2.7-1.3 1.2-1.8 1.3-.5.1-1.1.1-1.8-.1-.4-.2-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.8-4.2-.1-.2-1.1-1.5-1.1-2.8s.7-2 1-2.1c.2-.2.5-.2.7-.2h.5c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.2.1.3 0 .5l-.4.6c-.1.2-.3.3-.1.6.2.3.7 1.2 1.6 1.9 1.1.9 2 1.2 2.3 1.3.3.1.5.1.7-.1l.8-1.1c.2-.2.3-.2.6-.1.2.1 1.6.8 1.9.9.3.1.5.2.6.3.1.2.1 1-.1 1.7Z"/></svg>
        </span>
        Call Support
      </button>
    </div>`,

  home: `
    <div class="home is-catalog-locked">
      <div class="home-scroll">
        <div class="home-status">
          <span>9:41</span>
          <span class="home-status-icons" aria-hidden="true">
            <svg viewBox="0 0 18 12"><rect x="0.5" y="7" width="3" height="4.5" rx="0.6" fill="currentColor"/><rect x="5" y="5" width="3" height="6.5" rx="0.6" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="9" rx="0.6" fill="currentColor"/><rect x="14" y="0.5" width="3" height="11" rx="0.6" fill="currentColor"/></svg>
            <svg viewBox="0 0 16 12"><path fill="currentColor" d="M8 3.2c1.9 0 3.6.7 4.9 1.9l-1.2 1.2A5.3 5.3 0 0 0 8 4.8c-1.4 0-2.7.5-3.7 1.5L3.1 5.1A7.2 7.2 0 0 1 8 3.2Zm0 3.2c1 0 1.9.4 2.6 1l-1.2 1.2A2.2 2.2 0 0 0 8 8c-.6 0-1.1.2-1.5.6L5.3 7.4A3.8 3.8 0 0 1 8 6.4Zm0 3.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
            <svg viewBox="0 0 25 12"><rect x="0.6" y="1.2" width="19.5" height="9.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2.2" y="2.8" width="15" height="6.4" rx="1.2" fill="currentColor"/><path fill="currentColor" d="M21.2 4.1h1.4a1.6 1.6 0 0 1 0 3.8h-1.4V4.1Z"/></svg>
          </span>
        </div>

        <header class="home-header">
          <button type="button" class="home-wallet" data-demo="wallet">
            <span class="home-wallet-ico" aria-hidden="true">💳</span>
            <span>$ 12,879</span>
          </button>
          <label class="home-search">
            <span class="home-search-ico" aria-hidden="true">🔍</span>
            <input type="search" placeholder="Search by product/active ingredient" />
          </label>
          <button type="button" class="home-cart" data-demo="cart" aria-label="Cart">
            <span aria-hidden="true">🛍️</span>
            <span class="home-cart-badge">3</span>
          </button>
        </header>

        <button type="button" class="home-profile-card" data-goto="my-pharmacy" data-demo="complete-profile">
          <div class="home-profile-top">
            <div>
              <strong>Complete your profile</strong>
              <span>1/3 steps completed</span>
            </div>
            <span class="home-profile-continue">Continue ›</span>
          </div>
          <div class="home-profile-bar"><i style="width:33%"></i></div>
        </button>

        <button type="button" class="home-banner" data-demo="pulse-banner">
          <img src="scr/new-sign-up/home-assets/banner.png" alt="Pulse promo" />
        </button>

        <p class="home-lock-note">Complete your pharmacy profile to unlock prices, brands, and supplier details.</p>

        <section class="home-section">
          <div class="home-section-head">
            <h2>P2P Products</h2>
            <button type="button" class="home-view-all" data-demo="p2p-all">View All ›</button>
          </div>
          <div class="home-hscroll">
            <button type="button" class="home-product-card" data-demo="product-brufen-1">
              <span class="home-disc">-31%</span>
              <img src="scr/new-sign-up/home-assets/product-brufen.png" alt="" />
              <strong>Brufen Retard 800 Mg 20 Film Coated Tables</strong>
              <span class="home-fast">Fast Delivery</span>
              <div class="home-price-row">
                <span class="home-price">EGP 20</span>
                <span class="home-was">EGP 50</span>
                <span class="home-add">+</span>
              </div>
            </button>
            <button type="button" class="home-product-card" data-demo="product-brufen-2">
              <span class="home-disc">-31%</span>
              <img src="scr/new-sign-up/home-assets/product-brufen.png" alt="" />
              <strong>Brufen Retard 800 Mg 20 Film Coated Tables</strong>
              <span class="home-fast">Fast Delivery</span>
              <div class="home-price-row">
                <span class="home-price">EGP 20</span>
                <span class="home-was">EGP 50</span>
                <span class="home-add">+</span>
              </div>
            </button>
            <button type="button" class="home-product-card" data-demo="product-brufen-3">
              <span class="home-disc">-25%</span>
              <img src="scr/new-sign-up/home-assets/product-brufen.png" alt="" />
              <strong>Brufen Retard 800 Mg 20 Film Coated Tables</strong>
              <span class="home-fast">Fast Delivery</span>
              <div class="home-price-row">
                <span class="home-price">EGP 24</span>
                <span class="home-was">EGP 50</span>
                <span class="home-add">+</span>
              </div>
            </button>
          </div>
        </section>

        <section class="home-section">
          <div class="home-section-head">
            <h2>Trending Brands</h2>
            <button type="button" class="home-view-all" data-demo="brands-all">View All ›</button>
          </div>
          <div class="home-hscroll home-brands">
            <button type="button" class="home-brand" data-demo="brand-mustela"><img src="scr/new-sign-up/home-assets/brand-1.png" alt="" /><span>Mustela</span></button>
            <button type="button" class="home-brand" data-demo="brand-cerelac"><img src="scr/new-sign-up/home-assets/brand-2.png" alt="" /><span>Nestle Cerelac</span></button>
            <button type="button" class="home-brand" data-demo="brand-cetaphil"><img src="scr/new-sign-up/home-assets/brand-3.png" alt="" /><span>Cetaphil</span></button>
            <button type="button" class="home-brand" data-demo="brand-colgate"><img src="scr/new-sign-up/home-assets/brand-4.png" alt="" /><span>Colgate</span></button>
          </div>
        </section>

        <section class="home-section">
          <div class="home-section-head">
            <h2>Trending Categories</h2>
            <button type="button" class="home-view-all" data-demo="cats-all">View All ›</button>
          </div>
          <div class="home-hscroll home-cats">
            <button type="button" class="home-cat" data-demo="cat-skin"><img src="scr/new-sign-up/home-assets/cat-1.png" alt="" /><span>Skin Care</span></button>
            <button type="button" class="home-cat" data-demo="cat-hair"><img src="scr/new-sign-up/home-assets/cat-2.png" alt="" /><span>Hair Care</span></button>
            <button type="button" class="home-cat" data-demo="cat-devices"><img src="scr/new-sign-up/home-assets/cat-3.png" alt="" /><span>Medical Devices</span></button>
            <button type="button" class="home-cat" data-demo="cat-diapers"><img src="scr/new-sign-up/home-assets/cat-4.png" alt="" /><span>Baby Diapers</span></button>
          </div>
        </section>

        <section class="home-section home-offers">
          <div class="home-offer-tabs">
            <button type="button" class="is-active" data-demo="tab-b2b">Distributors B2B</button>
            <button type="button" data-demo="tab-p2p">Pharmacy P2P</button>
          </div>
          <button type="button" class="home-offer-row" data-demo="offer-1">
            <span class="home-offer-thumb">
              <span class="home-disc sm">15%</span>
              <img src="scr/new-sign-up/home-assets/product-brufen.png" alt="" />
            </span>
            <span class="home-offer-meta">
              <span class="home-offer-tags"><i>🔥 300 Orders</i><i>🪙 3434 Points</i></span>
              <strong>Brufen Retard 800 Mg 20 Film Coated Tables</strong>
              <em>PharmaCare</em>
              <span class="home-price-row">
                <span class="home-price">EGP 6820</span>
                <span class="home-was">EGP 50</span>
              </span>
            </span>
            <span class="home-add">+</span>
          </button>
          <button type="button" class="home-offer-row" data-demo="offer-2">
            <span class="home-offer-thumb">
              <span class="home-disc sm">12%</span>
              <img src="scr/new-sign-up/home-assets/product-brufen.png" alt="" />
            </span>
            <span class="home-offer-meta">
              <span class="home-offer-tags"><i>🔥 180 Orders</i><i>🪙 2100 Points</i></span>
              <strong>Brufen Retard 800 Mg 20 Film Coated Tables</strong>
              <em>PharmaCare</em>
              <span class="home-price-row">
                <span class="home-price">EGP 5400</span>
                <span class="home-was">EGP 50</span>
              </span>
            </span>
            <span class="home-add">+</span>
          </button>
        </section>
      </div>

      <nav class="home-tabbar" aria-label="Main">
        <button type="button" class="home-tab is-active" data-demo="tab-home">
          <span class="home-tab-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1v-9.5Z"/></svg>
          </span>
          <span class="home-tab-label">Home</span>
        </button>
        <button type="button" class="home-tab" data-demo="tab-suppliers">
          <span class="home-tab-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M4 10h16v10H4V10Zm2-3 2-3h8l2 3H6Z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M4 10h16"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M8 14h3M13 14h3"/></svg>
          </span>
          <span class="home-tab-label">Suppliers</span>
        </button>
        <button type="button" class="home-tab home-tab-pulse" data-demo="tab-pulse">
          <span class="home-pulse-btn" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" d="M3 12h3.2l2-5 3.2 10 2.4-7H21"/></svg>
            <span class="home-pulse-badge">2</span>
          </span>
          <span class="home-tab-label">Pulse</span>
        </button>
        <button type="button" class="home-tab" data-demo="tab-orders">
          <span class="home-tab-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M7 3.5h8l3 3V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M9 11h6M9 14.5h6"/><circle cx="9.5" cy="18" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
          </span>
          <span class="home-tab-label">Orders</span>
        </button>
        <button type="button" class="home-tab" data-demo="tab-more">
          <span class="home-tab-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M8.5 9.5h7M8.5 12h7M8.5 14.5h7"/></svg>
          </span>
          <span class="home-tab-label">More</span>
        </button>
      </nav>
    </div>`,

  "my-pharmacy": `
    <div class="mp">
      <div class="mp-hero">
        <div class="mp-status">
          <span>9:41</span>
          <span class="home-status-icons" aria-hidden="true">
            <svg viewBox="0 0 18 12"><rect x="0.5" y="7" width="3" height="4.5" rx="0.6" fill="currentColor"/><rect x="5" y="5" width="3" height="6.5" rx="0.6" fill="currentColor"/><rect x="9.5" y="2.5" width="3" height="9" rx="0.6" fill="currentColor"/><rect x="14" y="0.5" width="3" height="11" rx="0.6" fill="currentColor"/></svg>
            <svg viewBox="0 0 16 12"><path fill="currentColor" d="M8 3.2c1.9 0 3.6.7 4.9 1.9l-1.2 1.2A5.3 5.3 0 0 0 8 4.8c-1.4 0-2.7.5-3.7 1.5L3.1 5.1A7.2 7.2 0 0 1 8 3.2Zm0 3.2c1 0 1.9.4 2.6 1l-1.2 1.2A2.2 2.2 0 0 0 8 8c-.6 0-1.1.2-1.5.6L5.3 7.4A3.8 3.8 0 0 1 8 6.4Zm0 3.1a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
            <svg viewBox="0 0 25 12"><rect x="0.6" y="1.2" width="19.5" height="9.6" rx="2.2" fill="none" stroke="currentColor" stroke-width="1.3"/><rect x="2.2" y="2.8" width="15" height="6.4" rx="1.2" fill="currentColor"/><path fill="currentColor" d="M21.2 4.1h1.4a1.6 1.6 0 0 1 0 3.8h-1.4V4.1Z"/></svg>
          </span>
        </div>
        <div class="mp-topbar">
          <button type="button" class="mp-back" data-goto="home" aria-label="Back">${iconBack}</button>
          <h1>My Pharmacy</h1>
          <span class="mp-topbar-spacer"></span>
        </div>

        <div class="mp-pharmacy-card">
          <div class="mp-pharm-ico" aria-hidden="true">
            <svg viewBox="0 0 32 32"><rect x="6" y="12" width="20" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M10 12V9a6 6 0 0 1 12 0v3"/><circle cx="16" cy="19" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M16 17.2v3.6M14.2 19h3.6"/></svg>
          </div>
          <div class="mp-pharm-meta">
            <strong>Pharmacy Name</strong>
            <span><svg class="mp-pin" viewBox="0 0 16 16" aria-hidden="true"><path fill="currentColor" d="M8 1.5a4.5 4.5 0 0 0-4.5 4.5c0 3.2 4 8 4.2 8.3a.4.4 0 0 0 .6 0C8.5 14 12.5 9.2 12.5 6A4.5 4.5 0 0 0 8 1.5Zm0 6.2A1.7 1.7 0 1 1 8 4.3a1.7 1.7 0 0 1 0 3.4Z"/></svg> Cairo, Nasr City</span>
          </div>
          <span class="mp-badge is-incomplete">Incomplete</span>
        </div>
      </div>

      <div class="mp-body">
        <button type="button" class="mp-progress" data-goto="complete-location">
          <div class="mp-ring" style="--p:31" aria-hidden="true"><span>31%</span></div>
          <div class="mp-progress-copy">
            <strong>Complete pharmacy profile</strong>
            <span>31% completed · 2 step left</span>
          </div>
          <span class="mp-continue">Continue ›</span>
        </button>

        <div class="mp-list">
          <button type="button" class="mp-row" data-goto="complete-info">
            <div class="mp-row-ico is-teal" aria-hidden="true">
              <svg viewBox="0 0 24 24"><rect x="4" y="9" width="16" height="11" rx="1.6" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" d="M8 9V7a4 4 0 0 1 8 0v2"/><circle cx="12" cy="14.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M12 13.2v2.6M10.7 14.5h2.6"/></svg>
            </div>
            <div class="mp-row-meta">
              <strong>Pharmacy information</strong>
              <span>Basic, legal and contact details</span>
            </div>
            <span class="mp-status is-done">${iconTabCheck}<em>Done</em></span>
            <span class="mp-chevron" aria-hidden="true">${iconChevron}</span>
          </button>

          <button type="button" class="mp-row" data-goto="complete-location">
            <div class="mp-row-ico is-orange" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" d="M12 3.5a5.5 5.5 0 0 0-5.5 5.5c0 4 5 10 5.2 10.3a.4.4 0 0 0 .6 0C12.5 19 17.5 13 17.5 9A5.5 5.5 0 0 0 12 3.5Z"/><circle cx="12" cy="9" r="2.1" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>
            </div>
            <div class="mp-row-meta">
              <strong>Location &amp; Address</strong>
              <span>GPS location and address details</span>
            </div>
            <span class="mp-status is-pending"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 4.8V8l2.2 1.4"/></svg><em>Pending</em></span>
            <span class="mp-chevron" aria-hidden="true">${iconChevron}</span>
          </button>

          <button type="button" class="mp-row" data-goto="complete-documents">
            <div class="mp-row-ico is-orange" aria-hidden="true">
              <svg viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="M7 3.5h7.5L18.5 7.5V20a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4.5a1 1 0 0 1 1-1Z"/><path fill="none" stroke="currentColor" stroke-width="1.5" d="M9 11h6M9 14.5h6"/></svg>
            </div>
            <div class="mp-row-meta">
              <strong>Documents</strong>
              <span>License, tax card, trade registry</span>
            </div>
            <span class="mp-status is-pending"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.2" fill="none" stroke="currentColor" stroke-width="1.5"/><path fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" d="M8 4.8V8l2.2 1.4"/></svg><em>Pending</em></span>
            <span class="mp-chevron" aria-hidden="true">${iconChevron}</span>
          </button>
        </div>
      </div>
    </div>`,

  "complete-info": cpShell({
    activeTab: 1,
    backGoto: "my-pharmacy",
    body: `
        <h2 class="cp-section">Pharmacy Information</h2>

        <button type="button" class="cp-upload" data-demo="upload-logo">
          <span class="cp-upload-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="9" cy="10.5" r="1.6" fill="currentColor"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="m6.5 16.5 3.2-3.4 2.4 2.3 3-3.4 3.4 4.5"/></svg>
          </span>
          <span>Upload Photo or File</span>
        </button>

        <label class="cp-field">
          <span>Pharmacy Name <em>*</em></span>
          <input type="text" value="Omar Pharmacy" />
        </label>

        <label class="cp-field">
          <span>Pharmacy Legal Name <em>*</em></span>
          <input type="text" value="Omar Pharmacy" />
        </label>

        <label class="cp-field">
          <span>Phone Number <em>*</em></span>
          <div class="cp-phone">
            <div class="cp-dropdown cp-cc-dropdown" data-dropdown="country-code">
              <button type="button" class="ca-cc cp-dropdown-trigger" aria-label="Country code" aria-haspopup="listbox" aria-expanded="false">
                <span class="cp-cc-flag">${egyptFlag}</span>
                <span class="cp-dropdown-value ca-cc-code" data-code="+20">+20</span>
                ${iconChevron}
              </button>
              <div class="cp-dropdown-menu" role="listbox" hidden>
                <button type="button" class="cp-dropdown-option is-selected" data-value="+20" data-flag="eg" role="option">${egyptFlag} Egypt (+20)</button>
                <button type="button" class="cp-dropdown-option" data-value="+962" data-flag="jo" role="option">${jordanFlag} Jordan (+962)</button>
              </div>
            </div>
            <span class="ca-cc-divider" aria-hidden="true"></span>
            <input type="tel" placeholder="Phone number" />
          </div>
        </label>

        <label class="cp-field">
          <span>Email Address <em>*</em></span>
          <input type="email" value="Omarmohamed12@gmail.com" />
        </label>

        <h2 class="cp-section">Business Details (Optional)</h2>

        <label class="cp-field">
          <span>Pharmacy Type</span>
          ${cpDropdown("pharmacy-type", "Individual", ["Individual", "Chain", "Hospital", "Clinic"])}
        </label>

        <label class="cp-field">
          <span>Trade License Number</span>
          <input type="text" value="23245" />
        </label>

        <label class="cp-field">
          <span>Preferred Distributors</span>
          ${cpDropdown("distributors", "", ["Eva Pharam", "Ibn Sina", "Pharma Care", "Med Pharma"], {
            multi: true,
            chips: ["Eva Pharam"],
          })}
        </label>`,
    footer: `<button type="button" class="ca-cta cp-cta" data-goto="complete-location">Save &amp; Continue</button>`,
  }),

  "complete-location": cpShell({
    activeTab: 2,
    backGoto: "complete-info",
    scrollClass: "cp-scroll-map",
    body: `
        <h2 class="cp-section">Pharmacy Location</h2>
        <div class="cp-map">
          <img class="cp-map-photo" src="scr/new-sign-up/home-assets/map-full.png" alt="Pharmacy location map" />
          <button type="button" class="cp-map-locate" aria-label="Locate me">${iconLocate}</button>
        </div>`,
    footer: `<button type="button" class="ca-cta cp-cta" data-goto="complete-location-details">Confirm location</button>`,
  }),

  "complete-location-details": cpShell({
    activeTab: 2,
    backGoto: "complete-location",
    body: `
        <h2 class="cp-section">Location Details</h2>

        <div class="cp-mini-map" aria-hidden="true">
          <img class="cp-map-photo" src="scr/new-sign-up/home-assets/map-mini.png" alt="" />
        </div>

        <label class="cp-field">
          <span>Address Location <em>*</em></span>
          <div class="cp-address">
            <span class="cp-address-ico">${iconLocMark}</span>
            <span class="cp-address-text">Al Hesseneya</span>
            <button type="button" class="cp-address-change" data-goto="complete-location">Change</button>
          </div>
        </label>

        <label class="cp-field">
          <span>Street <em>*</em></span>
          <input type="text" placeholder="Enter street name" />
        </label>

        <label class="cp-field">
          <span>Building</span>
          <input type="text" placeholder="Enter building number/name" />
        </label>

        <div class="cp-row">
          <label class="cp-field">
            <span>District <em>*</em></span>
            <input type="text" placeholder="Enter District" />
          </label>
          <label class="cp-field">
            <span>Area <em>*</em></span>
            <input type="text" placeholder="Enter Area" />
          </label>
        </div>

        <label class="cp-field">
          <span>Special Landmarks</span>
          <input type="text" placeholder="E.g., Next to the main hospital, second floor" />
        </label>`,
    footer: `<button type="button" class="ca-cta cp-cta" data-goto="complete-documents">Save &amp; Continue</button>`,
  }),

  "complete-documents": cpShell({
    activeTab: 3,
    backGoto: "complete-location-details",
    body: `
        <h2 class="cp-section">Pharmacy Documents</h2>

        <div class="cp-doc is-uploaded" data-doc="license" data-open-doc-sheet role="button" tabindex="0">
          <div class="cp-doc-thumb cp-doc-thumb-license" aria-hidden="true"></div>
          <div class="cp-doc-meta">
            <strong>Pharmacy license</strong>
            <span>license.pdf</span>
          </div>
          <span class="cp-doc-badge is-ok">Uploaded ✓</span>
          <span class="cp-doc-more" aria-hidden="true">${iconMore}</span>
        </div>

        <div class="cp-doc is-uploaded" data-doc="tax" data-open-doc-sheet role="button" tabindex="0">
          <div class="cp-doc-thumb cp-doc-thumb-tax" aria-hidden="true"></div>
          <div class="cp-doc-meta">
            <strong>Tax Card</strong>
            <span>Tax Card.png</span>
          </div>
          <span class="cp-doc-badge is-ok">Uploaded ✓</span>
          <span class="cp-doc-more" aria-hidden="true">${iconMore}</span>
        </div>

        <div class="cp-doc is-uploaded" data-doc="trade" data-open-doc-sheet role="button" tabindex="0">
          <div class="cp-doc-thumb cp-doc-thumb-license" aria-hidden="true"></div>
          <div class="cp-doc-meta">
            <strong>Trade Registry</strong>
            <span>trade-registry.pdf</span>
          </div>
          <span class="cp-doc-badge is-ok">Uploaded ✓</span>
          <span class="cp-doc-more" aria-hidden="true">${iconMore}</span>
        </div>
        <p class="cp-doc-banner" id="cp-doc-banner" hidden></p>`,
    footer: `<button type="button" class="ca-cta cp-cta" data-ai-verify>Complete Profile</button>`,
    overlay: `${docUpdateSheet}${aiSubmitSheets}`,
  }),
};


/* ── js/templates/website-templates.js ── */
/** Pixel HTML — Pulse POS (`Index.vue`) for the website surface. */

const icoSearch = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="m16 16 4.2 4.2"/></svg>`;

const icoBarcode = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M3 5h1.4v14H3V5Zm3.2 0h.9v14h-.9V5Zm2.3 0h1.8v14H8.5V5Zm3.1 0h.9v14h-.9V5Zm2.2 0h1.4v14h-1.4V5Zm2.5 0h.9v14h-.9V5Zm2.1 0H21v14h-1.4V5Z"/></svg>`;

const icoUser = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.4" fill="none" stroke="currentColor" stroke-width="1.7"/><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M5.5 19.2a6.6 6.6 0 0 1 13 0"/></svg>`;

const icoBell = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M6.2 16.5h11.6M7.2 16.2V11a4.8 4.8 0 1 1 9.6 0v5.2M10 16.5v1.2a2 2 0 0 0 4 0v-1.2"/></svg>`;

const icoMenu = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M5 7h14M5 12h14M5 17h14"/></svg>`;

const icoStar = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round" d="m12 4.4 2.2 4.5 5 .7-3.6 3.5.9 4.9L12 15.7 7.5 18l.9-4.9L4.8 9.6l5-.7L12 4.4Z"/></svg>`;

const icoPlus = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M12 5v14M5 12h14"/></svg>`;

const icoTrash = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M5 7.5h14M9.5 7.5V6a1.5 1.5 0 0 1 1.5-1.5h2A1.5 1.5 0 0 1 14.5 6v1.5M8 7.5l.7 11a1.5 1.5 0 0 0 1.5 1.4h4.6a1.5 1.5 0 0 0 1.5-1.4l.7-11"/></svg>`;

const icoColumns = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="4.2" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="10" y="5" width="4.2" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="16" y="5" width="4.2" height="14" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>`;

const icoSelling = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="4.2" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="11.4" width="16" height="4.2" rx="1.2" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="4" y="17.8" width="16" height="1.4" rx=".7" fill="currentColor"/></svg>`;

const icoDetailed = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" d="M5 7h14M5 12h14M5 17h10"/></svg>`;

const icoMinus = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M6 12h12"/></svg>`;

const icoDose = `<svg class="pw-ico pw-ico-sm" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="3.5" width="14" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" d="M8 8h8M8 11.5h8M8 15h5"/></svg>`;

const icoClose = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" d="M7 7l10 10M17 7 7 17"/></svg>`;

const icoPrint = `<svg class="pw-ico" viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.6" d="M7 9V4.8h10V9"/><rect x="6" y="13" width="12" height="6.5" rx="1" fill="none" stroke="currentColor" stroke-width="1.6"/><path fill="none" stroke="currentColor" stroke-width="1.6" d="M6 12H4.5A1.5 1.5 0 0 1 3 10.5v-1A1.5 1.5 0 0 1 4.5 8h15A1.5 1.5 0 0 1 21 9.5v1a1.5 1.5 0 0 1-1.5 1.5H18"/></svg>`;

function pwNav(active) {
  const navClass = (key) => (active === key ? " is-active" : "");
  return `
      <header class="pw-nav">
        <div class="pw-brand">
          <span class="pw-pulse-mark" aria-hidden="true"></span>
          <span class="pw-pulse-word">Pulse</span>
        </div>
        <nav class="pw-nav-links" aria-label="Main">
          <span>Dashboard</span>
          <button type="button" class="pw-nav-link${navClass("pos")}" data-goto="pos-index">POS</button>
          <span>Inventory</span>
          <span>Reports</span>
          <button type="button" class="pw-nav-link${navClass("settings")}" data-goto="print-config">Settings</button>
        </nav>
        <div class="pw-nav-end">
          <button type="button" class="pw-nav-ico" aria-label="Notifications">${icoBell}</button>
          <span class="pw-avatar" aria-hidden="true">SA</span>
        </div>
      </header>`;
}

function pwCartRow({ n, id, name, sku, stock, expiry, uom, qty, price, sub, profit, total }) {
  return `
    <tr data-dose-row="${id}">
      <td class="pw-num">${n}</td>
      <td>
        <div class="pw-product">
          <span class="pw-product-name">${name}</span>
          <span class="pw-product-sku">${sku}</span>
        </div>
      </td>
      <td>${stock}</td>
      <td>${expiry}</td>
      <td>${uom}</td>
      <td>
        <div class="pw-qty">
          <button type="button" class="pw-qty-btn" aria-label="Decrease">${icoMinus}</button>
          <span class="pw-qty-val">${qty}</span>
          <button type="button" class="pw-qty-btn" aria-label="Increase">${icoPlus}</button>
        </div>
      </td>
      <td class="pw-money">${price}</td>
      <td class="pw-money">0.000</td>
      <td class="pw-money">${sub}</td>
      <td class="pw-money pw-profit">${profit}</td>
      <td class="pw-money">0.000</td>
      <td class="pw-money pw-total">${total}</td>
      <td class="pw-actions">
        <button type="button" class="pw-icon-btn" data-print-row="${id}" aria-label="Print dosage">${icoPrint}</button>
        <button type="button" class="pw-icon-btn" aria-label="Remove">${icoTrash}</button>
      </td>
    </tr>`;
}

const websiteTemplates = {
  "pos-index": `
    <div class="pw" data-feature-canvas="pos-index">
      ${pwNav("pos")}

      <div class="pw-body">
        <div class="pw-invoice-row">
          <div class="pw-invoice-tabs">
            <span class="pw-sale-chip is-active">Sale #1</span>
            <button type="button" class="pw-add-sale" aria-label="Add invoice">${icoPlus}</button>
          </div>
          <div class="pw-invoice-actions">
            <button type="button" class="pw-btn-outline">${icoMenu} More</button>
            <button type="button" class="pw-btn-outline">${icoStar} Favourites</button>
          </div>
        </div>

        <div class="pw-search-row">
          <div class="pw-search">
            ${icoSearch}
            <input type="text" placeholder="Search for products by name or scan barcode (F2)" aria-label="Product search" />
            <button type="button" class="pw-barcode" aria-label="Scan barcode">${icoBarcode}</button>
          </div>
          <div class="pw-customer is-filled">
            ${icoUser}
            <span class="pw-customer-chip">Ahmad Al-Khatib</span>
          </div>
        </div>

        <section class="pw-card">
          <div class="pw-tx-head">
            <div class="pw-tx-title">Sale #1</div>
            <div class="pw-tx-tools">
              <div class="pw-seg" role="group" aria-label="Cart columns">
                <button type="button" class="pw-seg-btn">${icoSelling} Selling</button>
                <button type="button" class="pw-seg-btn is-on">${icoDetailed} Detailed</button>
              </div>
              <button type="button" class="pw-btn-ghost">${icoColumns} Edit columns</button>
              <label class="pw-discount">
                <span>%</span>
                <input type="text" placeholder="Discount" aria-label="Discount" />
              </label>
              <button type="button" class="pw-btn-danger">Clear Cart</button>
            </div>
          </div>

          <div class="pw-cart">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th class="pw-th-product">Product</th>
                  <th>Stock</th>
                  <th>Expiry</th>
                  <th>UOM</th>
                  <th>Qty</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Subtotal</th>
                  <th>Profit</th>
                  <th>Tax</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                ${pwCartRow({
                  n: 1,
                  id: "panadol",
                  name: "Panadol Extra 500mg",
                  sku: "SKU · 6281078000123",
                  stock: "48",
                  expiry: "12/2027",
                  uom: "Tab",
                  qty: 2,
                  price: "3.500",
                  sub: "7.000",
                  profit: "1.200",
                  total: "7.000",
                })}
                ${pwCartRow({
                  n: 2,
                  id: "brufen",
                  name: "Brufen 400mg",
                  sku: "SKU · 6251157030149",
                  stock: "24",
                  expiry: "06/2026",
                  uom: "Tab",
                  qty: 1,
                  price: "4.250",
                  sub: "4.250",
                  profit: "0.850",
                  total: "4.250",
                })}
              </tbody>
            </table>
          </div>
        </section>

        <footer class="pw-summary">
          <div class="pw-sum-label">Summary</div>
          <div class="pw-sum-counts">
            <div><span>Number of products</span><strong>2</strong></div>
            <div><span>Total products qty</span><strong>3</strong></div>
          </div>
          <div class="pw-sum-fin">
            <div><span>Discount</span><strong class="pw-neg">-0.000</strong></div>
            <div><span>Subtotal</span><strong>11.250</strong></div>
            <div><span>Tax</span><strong>0.000</strong></div>
          </div>
          <div class="pw-sum-total">
            <span>Total</span>
            <strong>11.250 JOD</strong>
            <em>Total profit: 2.050</em>
          </div>
          <div class="pw-sum-cta">
            <label class="pw-print-check">
              <input type="checkbox" checked data-print-on-complete />
              Print dosage
            </label>
            <button type="button" class="pw-complete" data-complete-sale>Complete Sale</button>
          </div>
        </footer>
      </div>

      <div class="pw-sheet" id="pw-dosage-sheet" hidden>
        <button type="button" class="pw-sheet-backdrop" data-dosage-close aria-label="Dismiss"></button>
        <div class="pw-sheet-panel pw-dose-panel" role="dialog" aria-modal="true" aria-labelledby="pw-dosage-title">
          <div class="pw-sheet-head">
            <div>
              <p class="pw-sheet-kicker">Print dosage</p>
              <h2 id="pw-dosage-title" data-dose-name>Dosage</h2>
              <p class="pw-sheet-meta" data-dose-meta>Select saved text or write your own.</p>
            </div>
            <button type="button" class="pw-nav-ico" data-dosage-close aria-label="Close">${icoClose}</button>
          </div>

          <div class="pw-seg pw-dose-mode" role="tablist" aria-label="Dosage source">
            <button type="button" class="pw-seg-btn is-on" data-dose-mode="select">Select</button>
            <button type="button" class="pw-seg-btn" data-dose-mode="write">Write</button>
          </div>

          <div class="pw-dose-body" data-dose-pick-pane>
            <div class="pw-search pw-search-compact">
              ${icoSearch}
              <input type="search" data-dose-filter placeholder="Find saved text" aria-label="Search saved dosages" />
            </div>
            <div class="pw-combo-list" data-dose-options role="listbox" aria-label="Saved dosages"></div>
          </div>

          <div class="pw-dose-write" data-dose-write-pane hidden>
            <textarea data-dose-text rows="4" placeholder="Take 1 tablet after food."></textarea>
          </div>

          <div class="pw-preview-frame pw-dose-preview" data-dose-preview-wrap>
            <p class="pw-preview-label">Print preview</p>
            <div data-dose-preview-host></div>
          </div>

          <div class="pw-sheet-foot pw-sheet-foot-block">
            <button type="button" class="pw-complete pw-btn-block" data-dose-print disabled>
              ${icoPrint} <span data-dose-print-label>Print</span>
            </button>
          </div>
        </div>
      </div>

      <div class="pw-toast" data-dose-toast hidden>Sent to printer</div>
    </div>`,

  "dosage-library": `
    <div class="pw pw-settings" data-feature-canvas="dosage-library">
      ${pwNav("settings")}
      <div class="pw-body">
        <div class="pw-page pw-page-lib">
          <p class="pw-crumb">Settings · Dosage labels</p>
          <div class="pw-page-head">
            <div>
              <h1 class="pw-page-title">Dosage labels</h1>
              <p class="pw-page-desc">Saved phrases to print on a sale. Not linked to products. Click a row to edit it in place.</p>
            </div>
            <button type="button" class="pw-complete pw-complete-inline" data-lib-add>${icoPlus} Add</button>
          </div>
          <div class="pw-lib-board">
            <div class="pw-lib-toolbar">
              <div class="pw-search">
                ${icoSearch}
                <input type="search" data-lib-search placeholder="Find a dosage" aria-label="Search dosage labels" />
                <button type="button" class="pw-search-clear" data-lib-search-clear hidden aria-label="Clear search">×</button>
              </div>
              <span class="pw-lib-count" data-lib-count aria-live="polite"></span>
            </div>
            <div class="pw-lib-scroll" data-lib-scroll>
              <div class="pw-lib-list" data-lib-list></div>
              <div class="pw-lib-empty" data-lib-empty hidden>
                <p>No dosage labels yet</p>
                <span>Add the first phrase cashiers will print.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="pw-print" data-lib-delete-dialog hidden>
        <div class="pw-print-card pw-confirm-card" role="dialog" aria-modal="true" aria-labelledby="pw-lib-delete-title">
          <p class="pw-sheet-kicker">Delete label</p>
          <h2 id="pw-lib-delete-title">Remove this dosage label?</h2>
          <p class="pw-confirm-copy">“<span data-lib-delete-name></span>” will leave the library.</p>
          <div class="pw-sheet-foot">
            <button type="button" class="pw-btn-outline" data-lib-delete-cancel>Keep it</button>
            <button type="button" class="pw-btn-danger pw-btn-danger-lg" data-lib-delete-confirm>Delete</button>
          </div>
        </div>
      </div>
      <div class="pw-toast" data-lib-toast hidden>Label saved</div>
    </div>`,

  "print-config": `
    <div class="pw pw-settings" data-feature-canvas="print-config">
      ${pwNav("settings")}
      <div class="pw-body">
        <div class="pw-cfg">
          <h1 class="pw-cfg-title">Print Template Configuration</h1>
          <p class="pw-page-desc">Customize receipts, product labels, and dosage slips from one place.</p>
          <div class="pw-tabs" role="tablist">
            <button type="button" class="pw-tab" data-cfg-tab="receipt" role="tab">Receipt Configuration</button>
            <button type="button" class="pw-tab" data-cfg-tab="barcode" role="tab">Barcode & Label Templates</button>
            <button type="button" class="pw-tab is-on" data-cfg-tab="dosage" role="tab">Dosage labels</button>
          </div>

          <div data-cfg-panel="receipt" hidden>
            <div class="pw-cfg-grid">
              <div class="pw-cfg-form">
                <label class="pw-field"><span>Receipt Header</span><input type="text" value="Ghaidaa Tayseer Pharmacy" /></label>
                <label class="pw-field"><span>Receipt Footer</span><input type="text" value="Thank you for your visit" /></label>
                <div class="pw-cfg-checks">
                  <label class="pw-cfg-check"><input type="checkbox" checked /> Show Logo</label>
                  <label class="pw-cfg-check"><input type="checkbox" checked /> Show Tax Number</label>
                  <label class="pw-cfg-check"><input type="checkbox" checked /> Show Address</label>
                  <label class="pw-cfg-check"><input type="checkbox" checked /> Show Mobile Number</label>
                </div>
                <label class="pw-field"><span>Receipt Language</span>
                  <select><option>Arabic</option><option>English</option></select>
                </label>
                <label class="pw-field"><span>Print Size *</span>
                  <select><option>80mm</option><option>58mm</option></select>
                </label>
              </div>
              <div>
                <p class="pw-preview-label">Live Preview</p>
                <div class="pw-cfg-preview-box">
                  <div class="pw-slip pw-slip-80">
                    <p class="pw-slip-pharmacy">Ghaidaa Tayseer Pharmacy</p>
                    <p class="pw-slip-muted">Sale #1042 · 09/09/2026</p>
                    <p class="pw-slip-line">Panadol Extra 500mg × 2</p>
                    <p class="pw-slip-total">TOTAL PAID 11.250</p>
                  </div>
                </div>
                <button type="button" class="pw-btn-outline pw-btn-block">${icoPrint} Test Print</button>
              </div>
            </div>
          </div>

          <div data-cfg-panel="barcode" hidden>
            <h3 class="pw-cfg-section">Barcode & label templates</h3>
            <div class="pw-tpl-grid">
              <article class="pw-tpl-card is-active">
                <span class="pw-tpl-badge">Active</span>
                <h4>Standard 2×1</h4>
                <p>2.00 × 1.00 in · Portrait</p>
                <p>CODE128 · 12mm</p>
                <button type="button" class="pw-btn-ghost">Edit</button>
              </article>
              <article class="pw-tpl-card">
                <h4>Square 1×1</h4>
                <p>1.00 × 1.00 in · Portrait</p>
                <p>CODE128 · 10mm</p>
                <button type="button" class="pw-btn-ghost">Edit</button>
              </article>
              <article class="pw-tpl-card is-custom">
                <span class="pw-tpl-badge is-custom">Custom</span>
                <h4>Shelf talker</h4>
                <p>3.00 × 1.50 in · Landscape</p>
                <p>CODE128 · 14mm</p>
                <button type="button" class="pw-btn-ghost">Edit</button>
              </article>
            </div>
          </div>

          <div data-cfg-panel="dosage">
            <div data-dosage-tpl-list>
              <h3 class="pw-cfg-section">Dosage print templates</h3>
              <p class="pw-page-desc">Click a card or Edit to change it. Make active to use that template when the sale completes.</p>
              <div class="pw-tpl-grid">
                <article class="pw-tpl-card is-active" data-dose-tpl="80mm-right" tabindex="0" aria-label="80mm dosage template">
                  <span class="pw-tpl-badge" data-dose-tpl-badge>Active</span>
                  <h4 data-dose-tpl-title>80mm dosage</h4>
                  <p data-dose-tpl-meta>80mm thermal · Right · Arabic</p>
                  <div class="pw-tpl-card-actions" data-dose-tpl-idle>
                    <button type="button" class="pw-btn-ghost pw-tpl-edit" data-dose-tpl-edit="80mm-right">Edit</button>
                    <button type="button" class="pw-btn-ghost" data-dose-tpl-active="80mm-right" hidden>Make active</button>
                  </div>
                  <div class="pw-tpl-card-confirm" data-dose-tpl-inline-confirm hidden>
                    <p class="pw-tpl-confirm-copy">Use this template when the sale completes?</p>
                    <div class="pw-tpl-card-actions">
                      <button type="button" class="pw-btn-ghost" data-dose-tpl-confirm-cancel>Cancel</button>
                      <button type="button" class="pw-complete pw-complete-inline" data-dose-tpl-confirm-ok>Make active</button>
                    </div>
                  </div>
                </article>
                <article class="pw-tpl-card" data-dose-tpl="58mm-left" tabindex="0" aria-label="58mm compact template">
                  <span class="pw-tpl-badge" data-dose-tpl-badge hidden>Active</span>
                  <h4 data-dose-tpl-title>58mm compact</h4>
                  <p data-dose-tpl-meta>58mm thermal · Left · English</p>
                  <div class="pw-tpl-card-actions" data-dose-tpl-idle>
                    <button type="button" class="pw-btn-ghost pw-tpl-edit" data-dose-tpl-edit="58mm-left">Edit</button>
                    <button type="button" class="pw-btn-ghost" data-dose-tpl-active="58mm-left">Make active</button>
                  </div>
                  <div class="pw-tpl-card-confirm" data-dose-tpl-inline-confirm hidden>
                    <p class="pw-tpl-confirm-copy">Use this template when the sale completes?</p>
                    <div class="pw-tpl-card-actions">
                      <button type="button" class="pw-btn-ghost" data-dose-tpl-confirm-cancel>Cancel</button>
                      <button type="button" class="pw-complete pw-complete-inline" data-dose-tpl-confirm-ok>Make active</button>
                    </div>
                  </div>
                </article>
              </div>
            </div>

            <div class="pw-cfg-grid" data-dosage-tpl-edit hidden>
              <div class="pw-cfg-form">
                <button type="button" class="pw-link pw-link-back" data-dose-tpl-back>Back to list</button>
                <div class="pw-cfg-edit-head">
                  <h3 class="pw-cfg-section" data-dose-tpl-heading>Edit template</h3>
                  <span class="pw-tpl-status" data-dose-tpl-edit-status hidden>Active</span>
                </div>
                <label class="pw-field"><span>Template name</span>
                  <input type="text" data-dose-tpl-name />
                </label>
                <label class="pw-field"><span>Print size *</span>
                  <select data-slip-size>
                    <option value="80mm">80mm</option>
                    <option value="58mm">58mm</option>
                  </select>
                </label>
                <label class="pw-field"><span>Print language</span>
                  <div class="pw-seg pw-align-seg" role="group" aria-label="Print language">
                    <button type="button" class="pw-seg-btn is-on" data-slip-lang="ar">Arabic</button>
                    <button type="button" class="pw-seg-btn" data-slip-lang="en">English</button>
                  </div>
                </label>
                <label class="pw-field"><span>Alignment</span>
                  <div class="pw-seg pw-align-seg" role="group" aria-label="Alignment">
                    <button type="button" class="pw-seg-btn" data-slip-align="left">Left</button>
                    <button type="button" class="pw-seg-btn is-on" data-slip-align="right">Right</button>
                    <button type="button" class="pw-seg-btn" data-slip-align="center">Center</button>
                  </div>
                </label>
                <p class="pw-cfg-fields-label">Show on slip</p>
                <div class="pw-cfg-checks">
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="pharmacyName" checked /> Pharmacy name</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="address" checked /> Address</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="phone" checked /> Pharmacy phone</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="productName" checked /> Product name</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="patientName" checked /> Patient name</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="dosage" checked /> Dosage</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="expiryDate" checked /> Expiry date</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="dispenseDate" checked /> Dispense date</label>
                  <label class="pw-cfg-check"><input type="checkbox" data-slip-field="pharmacistName" checked /> Pharmacist name</label>
                </div>
              </div>
              <div class="pw-cfg-preview-col">
                <p class="pw-preview-label">Live Preview</p>
                <div class="pw-cfg-preview-box" data-slip-preview></div>
                <button type="button" class="pw-btn-outline pw-btn-block" data-dose-tpl-test>${icoPrint} Test Print</button>
              </div>
            </div>
          </div>
        </div>
        <div class="pw-cfg-footer" data-cfg-footer>
          <p class="pw-cfg-footer-copy" data-cfg-activate-copy hidden>Use this template when the sale completes?</p>
          <button type="button" class="pw-btn-outline" data-cfg-close>Close</button>
          <button type="button" class="pw-btn-outline" data-cfg-activate-cancel hidden>Cancel</button>
          <button type="button" class="pw-btn-outline" data-cfg-make-active hidden>Make active</button>
          <button type="button" class="pw-complete pw-complete-inline" data-cfg-activate-ok hidden>Make active</button>
          <button type="button" class="pw-complete pw-complete-inline" data-cfg-save>Save</button>
        </div>
      </div>
      <div class="pw-toast" data-cfg-toast hidden>Configuration saved</div>
    </div>`,
};


/* ── js/config/scopes.js ── */
/**
 * Epics = demo cases, grouped by surface (mobile / website).
 * Add a new entry under the surface when you start a new case.
 */
const EPICS = {
  mobile: {
    onboarding: {
      id: "onboarding",
      label: "Onboarding",
      chipClass: "chip-onboarding",
      description: "Pharmacy registration & complete profile",
    },
  },
  website: {
    pos: {
      id: "pos",
      label: "Dosage labels",
      chipClass: "chip-pos",
      description: "Dosage print setup like receipt and barcode templates, then use it on POS",
    },
  },
};

function epicsFor(surfaceId) {
  return EPICS[surfaceId] || {};
}

function firstEpicId(surfaceId) {
  return Object.keys(epicsFor(surfaceId))[0] || "";
}


/* ── js/config/surfaces.js ── */
/**
 * Surfaces = device preview on the right stage (Mobile phone vs Website).
 * Mobile keeps the current onboarding; Website is a separate screen list.
 */
const SURFACES = {
  mobile: {
    id: "mobile",
    label: "Mobile",
    description: "Pharmacy registration & complete profile",
  },
  website: {
    id: "website",
    label: "Website",
    description: "Website registration — ready for your first screen",
  },
};


/* ── js/data/signup-screens.js ── */
/** Sign-up / onboarding screens — pixel-perfect HTML. */
const signupScreens = [
  {
    id: "landing",
    label: "Landing",
    scope: "signup",
    group: "Start",
  },
  {
    id: "create-account",
    label: "Create account",
    scope: "signup",
    group: "Account",
  },
  {
    id: "verify-otp",
    label: "Verify phone",
    scope: "signup",
    group: "Account",
  },
  {
    id: "home",
    label: "Home",
    scope: "signup",
    group: "App",
  },
  {
    id: "my-pharmacy",
    label: "My Pharmacy",
    short: "My Pharmacy",
    scope: "signup",
    group: "Complete profile",
  },
  {
    id: "complete-info",
    label: "Profile · Information",
    scope: "signup",
    group: "Complete profile",
  },
  {
    id: "complete-location",
    label: "Location",
    short: "Location",
    scope: "signup",
    group: "Complete profile",
  },
  {
    id: "complete-location-details",
    label: "Location · Address",
    short: "Location · Address",
    scope: "signup",
    group: "Complete profile",
  },
  {
    id: "complete-documents",
    label: "Documents",
    short: "Documents",
    scope: "signup",
    group: "Complete profile",
  },
];


/* ── js/data/login-screens.js ── */
/** Login screens */
const loginScreens = [
  {
    id: "login",
    label: "Log in",
    scope: "login",
    group: "Account",
  },
];


/* ── js/data/website-screens.js ── */
/**
 * Website POS screens — static HTML clone of Pulse `/pos` (Index.vue).
 * Use this as the canvas for new feature UI before handing off to engineering.
 */
const websiteScreens = [
  {
    id: "print-config",
    label: "Print templates",
    epic: "pos",
    group: "Settings",
    url: "pulse.aumet.com/settings/receipt-label",
  },
  {
    id: "dosage-library",
    label: "Dosage labels",
    epic: "pos",
    group: "Settings",
    url: "pulse.aumet.com/settings/dosage-labels",
  },
  {
    id: "pos-index",
    label: "POS",
    epic: "pos",
    group: "Point of sale",
    url: "pulse.aumet.com/pos",
  },
];


/* ── js/components/shell.js ── */
/** App shell markup — sidebar + phone stage */
function renderShell() {
  return `
  <div class="app">
    <aside class="sidebar" id="sidebar">
      <header class="sidebar-brand">
        <img class="sidebar-logo" src="scr/new-sign-up/aumet-logo-white.png" alt="Aumet" />
        <div class="sidebar-epic-block">
          <span class="sidebar-kicker">Working on</span>
          <p class="sidebar-epic-name" id="sidebarEpicName">Onboarding</p>
          <p class="sidebar-epic-desc" id="sidebarEpicDesc">Pharmacy registration &amp; complete profile</p>
        </div>
      </header>
      <div class="panel-stack">
        <div class="panel-view active" id="panelMenu">
          <div class="panel-section" id="epicSection">
            <span class="section-label">Epic</span>
            <div class="chip-row" id="epicChips"></div>
          </div>

          <div class="epic-progress">
            <span class="flow-progress" id="flowProgress">0 / 0</span>
            <div class="progress-track"><div class="progress-fill" id="progressFill"></div></div>
          </div>

          <div class="nav-row menu-nav-row">
            <button class="btn-prev" id="prevBtn" type="button" aria-label="Previous" disabled>‹</button>
            <button class="btn-next" id="nextBtn" type="button" aria-label="Next" disabled>›</button>
          </div>

          <div class="scope-hint" id="scopeHint">Mobile · 9 steps</div>
        </div>
      </div>
    </aside>

    <main class="stage">
      <div class="stage-toolbar">
        <div class="surface-switch" id="surfaceSwitch" role="tablist" aria-label="Preview device">
          <a class="surface-btn active" role="tab" data-surface="mobile" href="#/mobile/onboarding" aria-selected="true">Mobile</a>
          <a class="surface-btn" role="tab" data-surface="website" href="#/website/pos" aria-selected="false">Website</a>
        </div>
      </div>
      <div class="stage-inner">
        <div class="phone-column" id="phoneColumn">
          <div class="phone-unit">
            <div class="phone-scaler" id="phoneScaler">
              <div class="phone">
                <div class="phone-screen" id="phoneScreen">
                  <div class="screen active" data-screen="empty" data-flow="current">
                    <div class="screen-code">
                      <div class="v2-pending">
                        <p class="v2-pending-label">Ready</p>
                        <p class="v2-pending-hint">Send your first screen to start</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="phone-btn"></div>
              </div>
            </div>
            <div class="phone-controls" id="demoBar">
              <button type="button" id="btnPlay" class="demo-btn" title="Play" aria-pressed="false">▶</button>
              <button type="button" id="btnPause" class="demo-btn active" title="Pause" aria-pressed="true">⏸</button>
              <select id="autoplaySpeed" class="demo-speed" title="Slide speed">
                <option value="3" selected>3s</option>
                <option value="5">5s</option>
                <option value="8">8s</option>
              </select>
              <span class="demo-sep" aria-hidden="true"></span>
              <button type="button" class="demo-btn demo-ai-pass active" data-ai-outcome="pass" title="AI verify: Pass" aria-pressed="true">✓</button>
              <button type="button" class="demo-btn demo-ai-fail" data-ai-outcome="fail" title="AI verify: Fail" aria-pressed="false">✕</button>
            </div>
          </div>
        </div>
        <div class="web-column" id="webColumn" hidden>
          <div class="web-unit">
            <div class="web-scaler" id="webScaler">
              <div class="web-browser">
                <div class="web-chrome">
                  <span class="web-dots" aria-hidden="true"><i></i><i></i><i></i></span>
                  <div class="web-url" id="webUrl">pulse.aumet.com/settings/dosage-labels</div>
                </div>
                <div class="web-screen" id="webScreen">
                  <div class="web-empty">
                    <p class="web-empty-label">Website</p>
                    <p class="web-empty-hint">Send your first screen to start</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="scope-empty-phone" id="scopeEmptyPhone" hidden>
          <p>Coming soon</p>
        </div>
      </div>
    </main>
  </div>`;
}


/* ── js/app.js ── */








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

const DOSAGE_PHARMACY = {
  pharmacyName: "Ghaidaa Tayseer Pharmacy",
  address: "Jordan-Amman-Amman - وادي السير - بجانب أسواق نبع وادي السير حي القيسية",
  phone: "",
  pharmacistName: "Ghaidaa Tayseer",
};

const DOSAGE_TEMPLATES = {
  "80mm-right": { name: "80mm dosage", printSize: "80mm", alignment: "right", language: "ar" },
  "58mm-left": { name: "58mm compact", printSize: "58mm", alignment: "left", language: "en" },
};

const DOSAGE_PRINT = {
  activeTemplate: "80mm-right",
  alignment: "right",
  printSize: "80mm",
  language: "ar",
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
  ar: {
    address: "العنوان",
    phone: "هاتف الصيدلية",
    productName: "اسم الصنف",
    patientName: "اسم المريض",
    dosage: "الجرعة",
    expiryDate: "تاريخ الانتهاء",
    dispenseDate: "تاريخ الصرف",
    pharmacistName: "اسم الصيدلي",
  },
  en: {
    address: "Address",
    phone: "Pharmacy phone",
    productName: "Product name",
    patientName: "Patient name",
    dosage: "Dosage",
    expiryDate: "Expiry date",
    dispenseDate: "Dispense date",
    pharmacistName: "Pharmacist name",
  },
};

const DOSAGE_SLIP_SAMPLE = {
  ...DOSAGE_PHARMACY,
  productName: "Men Splash 100 212",
  patientName: "f",
  dosage: "(After lunch) بعد الغداء",
  expiryDate: "06/02/2027",
  dispenseDate: "09/09/2026",
};

function slipLanguage(config = DOSAGE_PRINT) {
  return config.language === "en" ? "en" : "ar";
}

function templateMetaText(template) {
  const align = template.alignment === "left" ? "Left" : template.alignment === "center" ? "Center" : "Right";
  const lang = template.language === "en" ? "English" : "Arabic";
  return `${template.printSize} thermal · ${align} · ${lang}`;
}

function renderDosageReceipt(data, config = DOSAGE_PRINT) {
  const alignment = config.alignment === "left" || config.alignment === "center" ? config.alignment : "right";
  const fields = config.fields;
  const sizeClass = config.printSize === "58mm" ? "pw-slip-58" : "pw-slip-80";
  const language = slipLanguage(config);
  const labels = SLIP_LABELS[language];
  const dir = language === "ar" ? "rtl" : "ltr";
  const line = (key, value) => {
    if (!fields[key] || !String(value || "").trim()) return "";
    return `<p class="pw-slip-line">${escapeDosageHtml(labels[key])} : ${escapeDosageHtml(value)}</p>`;
  };
  let dates = "";
  if (fields.expiryDate && fields.dispenseDate && String(data.expiryDate || "").trim() && String(data.dispenseDate || "").trim()) {
    dates = `<p class="pw-slip-line">${escapeDosageHtml(labels.expiryDate)} : ${escapeDosageHtml(data.expiryDate)} &nbsp;&nbsp; ${escapeDosageHtml(labels.dispenseDate)} : ${escapeDosageHtml(data.dispenseDate)}</p>`;
  } else {
    dates = `${line("expiryDate", data.expiryDate)}${line("dispenseDate", data.dispenseDate)}`;
  }
  const pharmacy = fields.pharmacyName && String(data.pharmacyName || "").trim()
    ? `<p class="pw-slip-pharmacy">${escapeDosageHtml(data.pharmacyName)}</p>`
    : "";
  return `
    <div class="pw-slip ${sizeClass} pw-slip-${alignment}" dir="${dir}">
      ${pharmacy}
      ${line("address", data.address)}
      ${line("phone", data.phone)}
      ${line("productName", data.productName)}
      ${line("patientName", data.patientName)}
      ${line("dosage", data.dosage)}
      ${dates}
      ${line("pharmacistName", data.pharmacistName)}
    </div>`;
}

function productFromCartRow(row) {
  if (!row) return null;
  const cells = row.querySelectorAll("td");
  const name = row.querySelector(".pw-product-name")?.textContent.trim() || "";
  if (!name) return null;
  return {
    id: row.dataset.doseRow || "",
    name,
    expiry: cells[3]?.textContent.trim() || "",
    uom: cells[4]?.textContent.trim() || "",
    qty: row.querySelector(".pw-qty-val")?.textContent.trim() || "",
  };
}

function slipDataForPrint(text, product) {
  return {
    ...DOSAGE_PHARMACY,
    productName: product?.name || "",
    patientName: "",
    dosage: text,
    expiryDate: product?.expiry || "",
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
  let editingId = null;
  let pendingActivateId = null;
  let confirmSource = null;

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
    root.querySelectorAll("[data-slip-lang]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.slipLang === slipLanguage());
    });
  };

  const applyTemplate = (templateId) => {
    const template = DOSAGE_TEMPLATES[templateId] || DOSAGE_TEMPLATES["80mm-right"];
    DOSAGE_PRINT.printSize = template.printSize;
    DOSAGE_PRINT.alignment = template.alignment;
    DOSAGE_PRINT.language = slipLanguage(template);
    return template;
  };

  const writeEditingTemplate = () => {
    if (!editingId || !DOSAGE_TEMPLATES[editingId]) return;
    const template = DOSAGE_TEMPLATES[editingId];
    const nameEl = root.querySelector("[data-dose-tpl-name]");
    if (nameEl?.value.trim()) template.name = nameEl.value.trim();
    template.printSize = DOSAGE_PRINT.printSize;
    template.alignment = DOSAGE_PRINT.alignment;
    template.language = slipLanguage();
  };

  const closeConfirm = () => {
    pendingActivateId = null;
    confirmSource = null;
    syncConfirmUi();
  };

  const syncConfirmUi = () => {
    root.querySelectorAll("[data-dose-tpl]").forEach((card) => {
      const confirming = confirmSource === "card" && pendingActivateId === card.dataset.doseTpl;
      card.classList.toggle("is-confirming", confirming);
      const idle = card.querySelector("[data-dose-tpl-idle]");
      const confirm = card.querySelector("[data-dose-tpl-inline-confirm]");
      if (idle) idle.hidden = confirming;
      if (confirm) confirm.hidden = !confirming;
    });
    const editConfirming = Boolean(editing && confirmSource === "edit" && pendingActivateId);
    const copy = root.querySelector("[data-cfg-activate-copy]");
    const cancel = root.querySelector("[data-cfg-activate-cancel]");
    const closeBtn = root.querySelector("[data-cfg-close]");
    const makeBtn = root.querySelector("[data-cfg-make-active]");
    const confirmOk = root.querySelector("[data-cfg-activate-ok]");
    const isEditingActive = Boolean(editing && editingId === DOSAGE_PRINT.activeTemplate);
    if (copy) copy.hidden = !editConfirming;
    if (cancel) cancel.hidden = !editConfirming;
    if (confirmOk) confirmOk.hidden = !editConfirming;
    if (closeBtn) closeBtn.hidden = !editing || editConfirming;
    if (makeBtn) makeBtn.hidden = !editing || isEditingActive || editConfirming;
  };

  const syncActiveUi = () => {
    const isEditingActive = Boolean(editing && editingId === DOSAGE_PRINT.activeTemplate);
    const editStatus = root.querySelector("[data-dose-tpl-edit-status]");
    if (editStatus) editStatus.hidden = !editing || !isEditingActive;
    syncConfirmUi();
  };

  const renderPreview = () => {
    if (previewEl) previewEl.innerHTML = renderDosageReceipt(DOSAGE_SLIP_SAMPLE, DOSAGE_PRINT);
    root.querySelectorAll("[data-dose-tpl]").forEach((card) => {
      const active = card.dataset.doseTpl === DOSAGE_PRINT.activeTemplate;
      card.classList.toggle("is-active", active);
      const title = card.querySelector("[data-dose-tpl-title]");
      const meta = card.querySelector("[data-dose-tpl-meta]");
      const badge = card.querySelector("[data-dose-tpl-badge]");
      const activateBtn = card.querySelector("[data-dose-tpl-active]");
      const template = DOSAGE_TEMPLATES[card.dataset.doseTpl];
      if (title && template) title.textContent = template.name;
      if (meta && template) meta.textContent = templateMetaText(template);
      if (badge) badge.hidden = !active;
      if (activateBtn) activateBtn.hidden = active;
    });
    syncActiveUi();
  };

  const setActiveTemplate = (templateId) => {
    if (!DOSAGE_TEMPLATES[templateId]) return;
    DOSAGE_PRINT.activeTemplate = templateId;
    if (!editing || editingId !== templateId) applyTemplate(templateId);
    closeConfirm();
    renderPreview();
    showLocalToast(toast, "Template set as active");
  };

  const requestActivate = (templateId, source) => {
    if (!DOSAGE_TEMPLATES[templateId] || templateId === DOSAGE_PRINT.activeTemplate) return;
    pendingActivateId = templateId;
    confirmSource = source;
    syncConfirmUi();
  };

  const openEditor = (templateId) => {
    closeConfirm();
    editing = true;
    editingId = templateId;
    const template = applyTemplate(templateId);
    const nameEl = root.querySelector("[data-dose-tpl-name]");
    const heading = root.querySelector("[data-dose-tpl-heading]");
    if (nameEl) nameEl.value = template.name;
    if (heading) heading.textContent = "Edit dosage template";
    if (listEl) listEl.hidden = true;
    if (editEl) editEl.hidden = false;
    syncFieldsFromConfig();
    renderPreview();
    setTab("dosage");
  };

  const closeEditor = () => {
    editing = false;
    editingId = null;
    closeConfirm();
    applyTemplate(DOSAGE_PRINT.activeTemplate);
    if (listEl) listEl.hidden = false;
    if (editEl) editEl.hidden = true;
    setTab("dosage");
    renderPreview();
  };

  root.querySelectorAll("[data-cfg-tab]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      if (btn.dataset.cfgTab !== "dosage") {
        editing = false;
        editingId = null;
        closeConfirm();
        if (listEl) listEl.hidden = false;
        if (editEl) editEl.hidden = true;
      }
      setTab(btn.dataset.cfgTab);
      syncActiveUi();
    };
  });

  const bindOpenEditor = (el, templateId) => {
    if (!el || !templateId) return;
    el.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      openEditor(templateId);
    };
  };

  root.querySelectorAll("[data-dose-tpl]").forEach((card) => {
    card.onclick = (e) => {
      if (e.target.closest("button")) return;
      if (confirmSource === "card" && pendingActivateId === card.dataset.doseTpl) return;
      openEditor(card.dataset.doseTpl);
    };
    card.onkeydown = (e) => {
      if (e.key === "Escape" && confirmSource === "card" && pendingActivateId === card.dataset.doseTpl) {
        e.preventDefault();
        closeConfirm();
        return;
      }
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (confirmSource === "card" && pendingActivateId === card.dataset.doseTpl) {
          setActiveTemplate(card.dataset.doseTpl);
          return;
        }
        openEditor(card.dataset.doseTpl);
      }
    };
  });

  root.querySelectorAll("[data-dose-tpl-edit]").forEach((btn) => {
    bindOpenEditor(btn, btn.dataset.doseTplEdit);
  });

  root.querySelectorAll("[data-dose-tpl-active]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      requestActivate(btn.dataset.doseTplActive, "card");
    };
  });

  root.querySelectorAll("[data-dose-tpl-confirm-cancel]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeConfirm();
    };
  });

  root.querySelectorAll("[data-dose-tpl-confirm-ok]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest("[data-dose-tpl]");
      if (card) setActiveTemplate(card.dataset.doseTpl);
    };
  });

  const closeBtn = root.querySelector("[data-cfg-close]");
  if (closeBtn) {
    closeBtn.onclick = (e) => {
      e.preventDefault();
      closeEditor();
    };
  }

  const footerActivateBtn = root.querySelector("[data-cfg-make-active]");
  if (footerActivateBtn) {
    footerActivateBtn.onclick = (e) => {
      e.preventDefault();
      if (editingId) requestActivate(editingId, "edit");
    };
  }

  const footerActivateCancel = root.querySelector("[data-cfg-activate-cancel]");
  if (footerActivateCancel) {
    footerActivateCancel.onclick = (e) => {
      e.preventDefault();
      closeConfirm();
    };
  }

  const footerActivateOk = root.querySelector("[data-cfg-activate-ok]");
  if (footerActivateOk) {
    footerActivateOk.onclick = (e) => {
      e.preventDefault();
      if (pendingActivateId) setActiveTemplate(pendingActivateId);
    };
  }

  root.addEventListener("keydown", (e) => {
    if (e.key !== "Escape" || !pendingActivateId) return;
    e.preventDefault();
    closeConfirm();
  });

  const testPrintBtn = root.querySelector("[data-dose-tpl-test]");
  if (testPrintBtn) {
    testPrintBtn.onclick = (e) => {
      e.preventDefault();
      showLocalToast(toast, "Test print sent");
    };
  }

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
      writeEditingTemplate();
      renderPreview();
    };
  }
  root.querySelectorAll("[data-slip-align]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      DOSAGE_PRINT.alignment = btn.dataset.slipAlign;
      writeEditingTemplate();
      syncFieldsFromConfig();
      renderPreview();
    };
  });
  root.querySelectorAll("[data-slip-lang]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      DOSAGE_PRINT.language = btn.dataset.slipLang === "en" ? "en" : "ar";
      writeEditingTemplate();
      syncFieldsFromConfig();
      renderPreview();
    };
  });

  const saveBtn = root.querySelector("[data-cfg-save]");
  if (saveBtn) {
    saveBtn.onclick = (e) => {
      e.preventDefault();
      writeEditingTemplate();
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

  const sheet = root.querySelector("#pw-dosage-sheet");
  const toast = root.querySelector("[data-dose-toast]");
  const textEl = root.querySelector("[data-dose-text]");
  const writePane = root.querySelector("[data-dose-write-pane]");
  const pickPane = root.querySelector("[data-dose-pick-pane]");
  const filterEl = root.querySelector("[data-dose-filter]");
  const optionsEl = root.querySelector("[data-dose-options]");
  const previewEl = root.querySelector("[data-dose-preview-host]");
  const printBtn = root.querySelector("[data-dose-print]");
  const nameEl = root.querySelector("[data-dose-name]");
  const metaEl = root.querySelector("[data-dose-meta]");
  let mode = "select";
  let selectedDoseId = "";
  let pendingComplete = false;
  let activeProduct = null;

  const currentText = () => {
    if (mode === "write") return textEl?.value.trim() || "";
    return findDosageLabel(selectedDoseId)?.text || "";
  };

  const syncProductHeader = () => {
    if (nameEl) nameEl.textContent = activeProduct?.name || "Dosage";
    if (metaEl) {
      metaEl.textContent = activeProduct
        ? `${activeProduct.uom} · Qty ${activeProduct.qty} · Exp ${activeProduct.expiry}`
        : "Select saved text or write your own.";
    }
  };

  const syncPrintButton = () => {
    if (printBtn) printBtn.disabled = !currentText();
  };

  const syncPreview = () => {
    if (previewEl) {
      previewEl.innerHTML = renderDosageReceipt(slipDataForPrint(currentText(), activeProduct), DOSAGE_PRINT);
    }
    syncPrintButton();
  };

  const renderDoseOptions = () => {
    if (!optionsEl) return;
    const items = filterDosageLibrary((filterEl?.value || "").trim());
    optionsEl.innerHTML = [
      ...items.map((item) => `
        <button type="button" class="pw-combo-item${item.id === selectedDoseId ? " is-on" : ""}" data-dose-pick="${item.id}">
          <strong>${escapeDosageHtml(item.title)}</strong>
          <span>${escapeDosageHtml(item.text)}</span>
        </button>`),
      items.length ? "" : `<p class="pw-lib-pick-empty">No saved text matches that search.</p>`,
    ].join("");
  };

  const applyMode = () => {
    root.querySelectorAll("[data-dose-mode]").forEach((btn) => {
      btn.classList.toggle("is-on", btn.dataset.doseMode === mode);
    });
    if (pickPane) pickPane.hidden = mode !== "select";
    if (writePane) writePane.hidden = mode !== "write";
    renderDoseOptions();
    syncPreview();
  };

  const openSheet = (product) => {
    activeProduct = product || null;
    mode = "select";
    selectedDoseId = "";
    if (filterEl) filterEl.value = "";
    if (textEl) textEl.value = "";
    syncProductHeader();
    applyMode();
    if (sheet) sheet.hidden = false;
  };

  const sendToPrinter = () => {
    if (!currentText()) {
      if (mode === "write") textEl?.focus();
      else filterEl?.focus();
      return;
    }
    if (sheet) sheet.hidden = true;
    showLocalToast(
      toast,
      pendingComplete ? "Sale completed · dosage sent to printer" : "Dosage sent to printer"
    );
    pendingComplete = false;
  };

  root.querySelectorAll("[data-dosage-close]").forEach((el) => {
    el.onclick = (e) => {
      e.preventDefault();
      pendingComplete = false;
      if (sheet) sheet.hidden = true;
    };
  });

  root.querySelectorAll("[data-dose-mode]").forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      mode = btn.dataset.doseMode === "write" ? "write" : "select";
      applyMode();
      if (mode === "write") textEl?.focus();
      else filterEl?.focus();
    };
  });

  if (filterEl) filterEl.oninput = renderDoseOptions;
  if (optionsEl) {
    optionsEl.onclick = (e) => {
      const pick = e.target.closest("[data-dose-pick]");
      if (!pick) return;
      e.preventDefault();
      selectedDoseId = pick.dataset.dosePick;
      applyMode();
    };
  }
  if (textEl) textEl.oninput = syncPreview;

  if (printBtn) {
    printBtn.onclick = (e) => {
      e.preventDefault();
      sendToPrinter();
    };
  }

  const printRowBtns = root.querySelectorAll("[data-print-row]");
  printRowBtns.forEach((btn) => {
    btn.onclick = (e) => {
      e.preventDefault();
      pendingComplete = false;
      openSheet(productFromCartRow(btn.closest("tr")));
    };
  });

  const completeBtn = root.querySelector("[data-complete-sale]");
  if (completeBtn) {
    completeBtn.onclick = (e) => {
      e.preventDefault();
      const printOnComplete = root.querySelector("[data-print-on-complete]");
      if (printOnComplete && printOnComplete.checked) {
        pendingComplete = true;
        openSheet();
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
