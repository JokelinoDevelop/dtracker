import { Link } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

import OnBoardingMapImage from "@/assets/images/onboarding/onboarding-2.svg";
import { SafeAreaView } from "@/components/safe-area-view";
import SkipButton from "@/components/skip-button";
import { Button } from "@/components/ui/button";

const OnboardingStep2Screen = () => (
  <SafeAreaView className="flex-1 bg-background">
    <View className="items-end px-4 ">
      <SkipButton />
    </View>
    <View className="flex-1 justify-center items-center gap-y-20">
      <OnBoardingMapImage width={360} height={250} />

      <View className="gap-y-4 items-center max-w-100">
        <Text className="font-semibold text-lg text-center leading-8.5">
          Optimize delivery schedules
        </Text>
        <Text className="text-base text-center text-muted-foreground font-normal">
          Optimize delivery schedules for maximum efficiency.
        </Text>
      </View>
    </View>

    <View className="px-4 pb-6">
      <Link href="/(onboarding)/step-3" asChild>
        <Button title="Next" />
      </Link>
    </View>
  </SafeAreaView>
);

export default OnboardingStep2Screen;
