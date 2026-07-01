import { useAuthStore } from "@/features/auth/auth.store";
import { OnboardingStepView } from "@/features/onboarding/onboarding-step-view";

export default function OnboardingStep3Screen() {
  const { completeOnboarding } = useAuthStore();

  return (
    <OnboardingStepView
      buttonTitle="Get Started"
      onContinue={completeOnboarding}
      stepIndex={2}
    />
  );
}
