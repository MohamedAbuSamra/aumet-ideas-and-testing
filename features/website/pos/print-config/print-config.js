import {
  DOSAGE_PRINT,
  DOSAGE_TEMPLATES,
  DOSAGE_SLIP_SAMPLE,
  slipLanguage,
  templateMetaText,
  renderDosageReceipt,
  showLocalToast,
} from "../shared/dosage.js";

export function bindPrintConfig() {
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
