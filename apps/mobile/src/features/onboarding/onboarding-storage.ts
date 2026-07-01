import { storage } from "@/lib/storage";

const ONBOARDING_COMPLETED_KEY = "onboarding_completed";

export const OnboardingStorage = {
  getCompleted() {
    return storage.getBoolean(ONBOARDING_COMPLETED_KEY);
  },

  setCompleted(completed = true) {
    storage.setBoolean(ONBOARDING_COMPLETED_KEY, completed);
  },
};
