import { Link } from "expo-router";
// oxlint-disable node/global-require
import { Text, View } from "react-native";

import OnBoardingPhoneImage from "@/assets/images/onboarding/onboarding-1.svg";
import { SafeAreaView } from "@/components/safe-area-view";
import SkipButton from "@/components/skip-button";
import { Button } from "@/components/ui/button";

const OnboardingScreen = () => (
  <SafeAreaView className="flex-1 bg-background">
    <View className="items-end px-4 ">
      <SkipButton />
    </View>
    <View className="flex-1 justify-center items-center gap-y-20">
      <OnBoardingPhoneImage width={250} height={250} />

      <View className="gap-y-4 items-center">
        <Text className="font-semibold text-lg leading-8.5">
          Route building
        </Text>
        <Text className="text-base text-muted-foreground font-normal">
          Seamlessly manage your delivery routes
        </Text>
      </View>
    </View>

    <View className="px-4 pb-6">
      <Link href="/(onboarding)/step-2" asChild>
        <Button title="Next" />
      </Link>
    </View>
  </SafeAreaView>
);

export default OnboardingScreen;
