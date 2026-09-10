/**
 * Website POS screens — static HTML clone of Pulse `/pos` (Index.vue).
 * Use this as the canvas for new feature UI before handing off to engineering.
 */
export const websiteScreens = [
  {
    id: "print-config",
    label: "Print setup",
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
