import { state, MAX_VERIFY_FAILS } from "../../../../js/state.js";
import { goToId } from "../../../../js/nav.js";
import { syncHomeCatalogLock } from "../home/home.js";
import {
  closeDocSheet,
  openSheet,
  closeSheet,
  updateDocsCta,
  setDocBanner,
} from "../shared/complete-profile.js";

export const AI_DOC_META = [
  { id: "license", label: "Pharmacy license", failReason: "This document is not valid. Please upload the correct Pharmacy license." },
  { id: "tax", label: "Tax Card", failReason: "This document is not valid. Please upload the correct Tax Card." },
  { id: "trade", label: "Trade Registry", failReason: "This document is not valid. Please upload the correct Trade Registry." },
];

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function lockAccount(docsRoot) {
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

export function applyAccountLockUI() {
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

export function markDocFailed(row, reason) {
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

export function clearDocFailures(root) {
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

export function setAiRowStatus(list, docId, status) {
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

export async function runAiVerification(root) {
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

export function bindAiVerify() {
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
