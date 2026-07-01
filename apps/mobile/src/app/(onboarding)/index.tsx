import { router } from "expo-router";

import { OnboardingStepView } from "@/features/onboarding/onboarding-step-view";

export default function OnboardingStep1Screen() {
  return (
    <OnboardingStepView
      buttonTitle="Next"
      onContinue={() => router.push("/(onboarding)/step-2")}
      stepIndex={0}
    />
  );
}
