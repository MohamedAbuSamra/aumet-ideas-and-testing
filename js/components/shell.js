/** App shell markup — sidebar + phone stage */
export function renderShell() {
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
          <button type="button" class="surface-btn active" role="tab" data-surface="mobile" aria-selected="true">Mobile</button>
          <button type="button" class="surface-btn" role="tab" data-surface="website" aria-selected="false">Website</button>
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
