import { router } from "expo-router";
import { createContext, use, useState } from "react";
import type { PropsWithChildren } from "react";

import { OnboardingStorage } from "./onboarding-storage";

type OnboardingContextValue = {
  finishOnboarding: () => void;
  isComplete: boolean;
  resetOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [isComplete, setIsComplete] = useState(() =>
    OnboardingStorage.getCompleted()
  );

  const finishOnboarding = () => {
    OnboardingStorage.setCompleted(true);
    setIsComplete(true);
  };

  const resetOnboarding = () => {
    OnboardingStorage.setCompleted(false);
    setIsComplete(false);
    router.replace("/onboarding");
  };

  return (
    <OnboardingContext.Provider
      value={{
        finishOnboarding,
        isComplete,
        resetOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const value = use(OnboardingContext);

  if (!value) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }

  return value;
}
