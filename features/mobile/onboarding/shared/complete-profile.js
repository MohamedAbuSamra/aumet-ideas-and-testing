import { state } from "../../../../js/state.js";

export function closeAllCpMenus(except) {
  document.querySelectorAll(".screen.active .cp-dropdown.is-open").forEach((el) => {
    if (el === except) return;
    el.classList.remove("is-open");
    const trigger = el.querySelector(".cp-dropdown-trigger");
    const menu = el.querySelector(".cp-dropdown-menu");
    if (trigger) trigger.setAttribute("aria-expanded", "false");
    if (menu) menu.hidden = true;
  });
}

export function closeDocSheet() {
  const sheet = document.querySelector(".screen.active #doc-update-sheet");
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.hidden = true;
  sheet.dataset.doc = "";
}

export function openDocSheet(docId) {
  if (state.accountLocked) return;
  const sheet = document.querySelector(".screen.active #doc-update-sheet");
  if (!sheet) return;
  closeAllCpMenus();
  sheet.dataset.doc = docId || "";
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("is-open"));
}

export function bindCpDropdowns() {
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

export function bindDocSheet(root) {
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

export function updateDocsCta(root) {
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

export function setDocBanner(root, text, locked = false) {
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

export function openSheet(sheet) {
  if (!sheet) return;
  sheet.hidden = false;
  requestAnimationFrame(() => sheet.classList.add("is-open"));
}

export function closeSheet(sheet) {
  if (!sheet) return;
  sheet.classList.remove("is-open");
  sheet.hidden = true;
}

export function bindChipRemoves(dd) {
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
