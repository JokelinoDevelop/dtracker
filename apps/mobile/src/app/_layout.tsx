import { Stack } from "expo-router";

import { AuthLoadingScreen } from "@/features/auth/auth-loading-screen";
import { useSession } from "@/features/auth/hooks/use-session";

import "./global.css";
import {
  OnboardingProvider,
  useOnboarding,
} from "@/features/onboarding/onboarding-provider";
import { QueryProvider } from "@/lib/tanstack-query/query-provider";

function RootNavigator() {
  const { data: session, isPending } = useSession();

  const { isComplete: isOnboardingComplete } = useOnboarding();

  const isLoggedIn = !!session;

  if (isPending) {
    return <AuthLoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn && isOnboardingComplete}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!isOnboardingComplete}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <QueryProvider>
      <OnboardingProvider>
        <RootNavigator />
      </OnboardingProvider>
    </QueryProvider>
  );
}
