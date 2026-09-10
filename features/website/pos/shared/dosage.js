
export const ADD_ID = "__add__";

export let dosageLibrary = [
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

export function compareDosageTitle(a, b) {
  return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
}

export function filterDosageLibrary(query, pinId) {
  const q = (query || "").trim().toLowerCase();
  const items = dosageLibrary.filter((item) => {
    if (pinId && item.id === pinId) return true;
    if (!q) return true;
    return `${item.title} ${item.text}`.toLowerCase().includes(q);
  });
  return items.sort(compareDosageTitle);
}

export const DOSAGE_PHARMACY = {
  pharmacyName: "Ghaidaa Tayseer Pharmacy",
  address: "Jordan-Amman-Amman - وادي السير - بجانب أسواق نبع وادي السير حي القيسية",
  phone: "",
  pharmacistName: "Ghaidaa Tayseer",
};

export const DOSAGE_TEMPLATES = {
  "80mm-right": { name: "80mm dosage", printSize: "80mm", alignment: "right", language: "ar" },
  "58mm-left": { name: "58mm compact", printSize: "58mm", alignment: "left", language: "en" },
};

export const DOSAGE_PRINT = {
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

export const SLIP_LABELS = {
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

export const DOSAGE_SLIP_SAMPLE = {
  ...DOSAGE_PHARMACY,
  productName: "Men Splash 100 212",
  patientName: "f",
  dosage: "(After lunch) بعد الغداء",
  expiryDate: "06/02/2027",
  dispenseDate: "09/09/2026",
};

export function slipLanguage(config = DOSAGE_PRINT) {
  return config.language === "en" ? "en" : "ar";
}

export function templateMetaText(template) {
  const align = template.alignment === "left" ? "Left" : template.alignment === "center" ? "Center" : "Right";
  const lang = template.language === "en" ? "English" : "Arabic";
  return `${template.printSize} thermal · ${align} · ${lang}`;
}

export function renderDosageReceipt(data, config = DOSAGE_PRINT) {
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

export function productFromCartRow(row) {
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

export function slipDataForPrint(text, product) {
  return {
    ...DOSAGE_PHARMACY,
    productName: product?.name || "",
    patientName: "",
    dosage: text,
    expiryDate: product?.expiry || "",
    dispenseDate: "09/09/2026",
  };
}

export function findDosageLabel(id) {
  return dosageLibrary.find((item) => item.id === id) || null;
}

export function showLocalToast(el, message) {
  if (!el) return;
  el.textContent = message;
  el.hidden = false;
  window.setTimeout(() => {
    el.hidden = true;
  }, 1600);
}

export function escapeDosageHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char]));
}

export function removeDosageLabel(id) {
  const index = dosageLibrary.findIndex((item) => item.id === id);
  if (index >= 0) dosageLibrary.splice(index, 1);
}
