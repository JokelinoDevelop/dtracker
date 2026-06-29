import { Link } from "expo-router";
import { View, Text } from "react-native";

import OnBoardingPersonAndCarImage from "@/assets/images/onboarding/onboarding-3.svg";
import { SafeAreaView } from "@/components/safe-area-view";
import SkipButton from "@/components/skip-button";
import { Button } from "@/components/ui/button";

const OnboardingStep3Screen = () => (
  <SafeAreaView className="flex-1 bg-background">
    <View className="items-end px-4 ">
      <SkipButton />
    </View>
    <View className="flex-1 justify-center items-center gap-y-20">
      <OnBoardingPersonAndCarImage width={264} height={258} />

      <View className="gap-y-4 items-center max-w-85">
        <Text className="font-semibold text-lg leading-8.5">
          Deliver your packages
        </Text>
        <Text className="text-base text-center text-muted-foreground font-normal">
          Track packages in real-time.
        </Text>
      </View>
    </View>

    <View className="px-4 pb-6">
      <Link href="/(auth)/sign-in" asChild>
        <Button title="Start" />
      </Link>
    </View>
  </SafeAreaView>
);

export default OnboardingStep3Screen;
