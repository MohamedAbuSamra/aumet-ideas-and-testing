import { mobileSurface } from "../features/mobile/surface.js";
import { websiteSurface } from "../features/website/surface.js";
import { mobileEpics } from "../features/mobile/epics.js";
import { websiteEpics } from "../features/website/epics.js";
import { onboardingScreens } from "../features/mobile/onboarding/screens.js";
import { loginScreens } from "../features/mobile/login/screens.js";
import { posScreens } from "../features/website/pos/screens.js";

export const SURFACES = {
  [mobileSurface.id]: mobileSurface,
  [websiteSurface.id]: websiteSurface,
};

export const EPICS = {
  mobile: mobileEpics,
  website: websiteEpics,
};

export const EPIC_SCREENS = {
  mobile: {
    onboarding: onboardingScreens,
  },
  website: {
    pos: posScreens,
  },
};

export const EXTRA_SCREENS = {
  mobile: loginScreens.map((screen) => ({ ...screen, flow: "login" })),
  website: [],
};

export function epicsFor(surfaceId) {
  return EPICS[surfaceId] || {};
}

export function firstEpicId(surfaceId) {
  return Object.keys(epicsFor(surfaceId))[0] || "";
}

export function screensFor(surfaceId, epicId) {
  return EPIC_SCREENS[surfaceId]?.[epicId] || [];
}

export function extraScreensFor(surfaceId) {
  return EXTRA_SCREENS[surfaceId] || [];
}
