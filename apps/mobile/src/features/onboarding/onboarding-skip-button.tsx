import { Text, Pressable } from "react-native";

import { useOnboarding } from "./onboarding-provider";

const OnboardingSkipButton = () => {
  const { finishOnboarding } = useOnboarding();

  return (
    <Pressable onPress={finishOnboarding} hitSlop={10} className="px-2 py-1">
      <Text className="text-primary text-base font-medium">Skip</Text>
    </Pressable>
  );
};

export default OnboardingSkipButton;
