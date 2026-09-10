/**
 * Epics = demo cases, grouped by surface (mobile / website).
 * Add a new entry under the surface when you start a new case.
 */
export const EPICS = {
  mobile: {
    onboarding: {
      id: "onboarding",
      label: "Onboarding",
      chipClass: "chip-onboarding",
      description: "Pharmacy registration & complete profile",
    },
  },
  website: {
    pos: {
      id: "pos",
      label: "Dosage labels",
      chipClass: "chip-pos",
      description: "Dosage print setup like receipt and barcode templates, then use it on POS",
    },
  },
};

export function epicsFor(surfaceId) {
  return EPICS[surfaceId] || {};
}

export function firstEpicId(surfaceId) {
  return Object.keys(epicsFor(surfaceId))[0] || "";
}
