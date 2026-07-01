import { useRef, useState } from "react";
import type { NativeSyntheticEvent, NativeScrollEvent } from "react-native";
import { View, Text, FlatList, useWindowDimensions } from "react-native";

import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/features/onboarding/onboarding-provider";
import OnBoardingScreenShell from "@/features/onboarding/onboarding-screen-shell";
import type { OnBoardingStep } from "@/features/onboarding/onboarding-steps";
import { ONBOARDING_STEPS } from "@/features/onboarding/onboarding-steps";

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const [index, setIndex] = useState(0);

  const ref = useRef<FlatList>(null);

  const { finishOnboarding } = useOnboarding();

  return (
    <OnBoardingScreenShell>
      <FlatList
        ref={ref}
        data={ONBOARDING_STEPS}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, i) => String(i)}
        onMomentumScrollEnd={handleOnScrollEnd}
        renderItem={({ item }: { item: OnBoardingStep }) => {
          const Img = item.Image;

          return (
            <View
              style={{ width }}
              className="flex-1 justify-center items-center gap-y-20 px-6"
            >
              <Img width={250} height={250} />

              <View className="items-center gap-y-4">
                <Text className="text-lg font-semibold text-center">
                  {item.title}
                </Text>
                <Text className="text-center text-muted-foreground">
                  {item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View className="px-4 pb-6">
        <Button
          title={index === ONBOARDING_STEPS.length - 1 ? "Get Started" : "Next"}
          onPress={handleGoToNext}
        />
      </View>
    </OnBoardingScreenShell>
  );

  function handleOnScrollEnd(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  }

  function handleGoToNext() {
    const next = index + 1;

    if (next < ONBOARDING_STEPS.length) {
      ref.current?.scrollToOffset({
        animated: true,
        offset: next * width,
      });
      setIndex(next);
    } else {
      finishOnboarding();
    }
  }
}
