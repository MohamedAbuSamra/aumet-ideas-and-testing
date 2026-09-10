import {
  ADD_ID,
  dosageLibrary,
  filterDosageLibrary,
  findDosageLabel,
  showLocalToast,
  escapeDosageHtml,
  removeDosageLabel,
} from "../shared/dosage.js";

export function bindDosageLibrary() {
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
        removeDosageLabel(pendingDeleteId);
        showLocalToast(toast, "Label deleted");
      }
      pendingDeleteId = null;
      if (dialog) dialog.hidden = true;
      render();
    };
  }

  render();
}
