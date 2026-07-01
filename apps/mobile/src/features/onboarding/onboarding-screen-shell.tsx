import type { ReactNode } from "react";
import { View } from "react-native";

import { SafeAreaView } from "@/components/safe-area-view";
import OnboardingSkipButton from "@/features/onboarding/onboarding-skip-button";

type OnBoardingScreenShellProps = {
  children: ReactNode;
};

const OnBoardingScreenShell = ({ children }: OnBoardingScreenShellProps) => (
  <SafeAreaView className="flex-1 bg-background">
    <View className="items-end px-4 ">
      <OnboardingSkipButton />
    </View>
    {children}
  </SafeAreaView>
);

export default OnBoardingScreenShell;
