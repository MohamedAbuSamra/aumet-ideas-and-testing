export const MAX_VERIFY_FAILS = 2;

export const state = {
  epic: "onboarding",
  surface: "mobile",
  viewMode: "code",
  current: 0,
  isPlaying: false,
  autoplayTimer: null,
  aiOutcome: "pass",
  aiRunning: false,
  profileComplete: false,
  verifyFailCount: 0,
  accountLocked: false,
};

export const els = {};

export const hooks = {
  bindActiveScreen() {},
  updateChrome() {},
  fitPreview() {},
  applySurfaceClass() {},
};
