import { Stack } from "expo-router";

export default function OnboardingLayout() {
  return (
    <Stack
      screenOptions={{
        animation: "fade",
        headerBackTitle: "Previous",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "white",
        },
        headerTitle: "",
      }}
    />
  );
}
