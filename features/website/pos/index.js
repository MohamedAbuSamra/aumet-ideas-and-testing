import { bindDosageFlow } from "./pos-index/pos-index.js";
import { bindDosageLibrary } from "./dosage-library/dosage-library.js";
import { bindPrintConfig } from "./print-config/print-config.js";

export { posScreens } from "./screens.js";

export function bindPos() {
  const canvas = document.querySelector(".screen.active [data-feature-canvas]");
  if (!canvas) return;
  const id = canvas.dataset.featureCanvas;
  if (id === "pos-index") bindDosageFlow();
  if (id === "dosage-library") bindDosageLibrary();
  if (id === "print-config") bindPrintConfig();
}
