import { router } from "expo-router";

import { OnboardingStepView } from "@/features/onboarding/onboarding-step-view";

export default function OnboardingStep2Screen() {
  return (
    <OnboardingStepView
      buttonTitle="Next"
      onContinue={() => router.push("/(onboarding)/step-3")}
      stepIndex={1}
    />
  );
}
