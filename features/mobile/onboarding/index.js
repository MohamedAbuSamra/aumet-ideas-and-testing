import { bindLandingCarousel } from "./landing/landing.js";
import { bindOtpInputs } from "./verify-otp/verify-otp.js";
import { bindHomeCatalogLock, bindHomeDemo } from "./home/home.js";
import { bindCpDropdowns } from "./shared/complete-profile.js";
import { bindAiVerify } from "./complete-documents/complete-documents.js";

export { onboardingScreens } from "./screens.js";

export function bindOnboarding() {
  bindLandingCarousel();
  bindOtpInputs();
  bindHomeDemo();
  bindHomeCatalogLock();
  bindCpDropdowns();
  bindAiVerify();
}
