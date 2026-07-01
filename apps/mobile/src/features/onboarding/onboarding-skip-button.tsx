import { Text, Pressable } from "react-native";

import { useAuthStore } from "../auth/auth.store";

const OnboardingSkipButton = () => {
  const { completeOnboarding } = useAuthStore();

  return (
    <Pressable onPress={completeOnboarding} hitSlop={10} className="px-2 py-1">
      <Text className="text-primary text-base font-medium">Skip</Text>
    </Pressable>
  );
};

export default OnboardingSkipButton;
