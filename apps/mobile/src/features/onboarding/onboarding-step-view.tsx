import { View, Text } from "react-native";

import { Button } from "@/components/ui/button";
import OnBoardingScreenShell from "@/features/onboarding/onboarding-screen-shell";
import { ONBOARDING_STEPS } from "@/features/onboarding/onboarding-steps";

type OnboardingStepViewProps = {
  stepIndex: number;
  buttonTitle: string;
  onContinue: () => void;
};

export function OnboardingStepView({
  stepIndex,
  buttonTitle,
  onContinue,
}: OnboardingStepViewProps) {
  const step = ONBOARDING_STEPS[stepIndex];
  const Img = step.Image;

  return (
    <OnBoardingScreenShell>
      <View className="flex-1 items-center justify-center gap-y-20 px-6">
        <Img width={250} height={250} />

        <View className="items-center gap-y-4">
          <Text className="text-center text-lg font-semibold">
            {step.title}
          </Text>
          <Text className="text-center text-muted-foreground">
            {step.description}
          </Text>
        </View>
      </View>

      <View className="px-4 pb-6">
        <Button title={buttonTitle} onPress={onContinue} />
      </View>
    </OnBoardingScreenShell>
  );
}
