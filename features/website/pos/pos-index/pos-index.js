import {
  DOSAGE_PRINT,
  filterDosageLibrary,
  findDosageLabel,
  productFromCartRow,
  slipDataForPrint,
  renderDosageReceipt,
  showLocalToast,
  escapeDosageHtml,
} from "../shared/dosage.js";

export function bindDosageFlow() {
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
