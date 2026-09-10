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

export const websiteTemplates = {
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
