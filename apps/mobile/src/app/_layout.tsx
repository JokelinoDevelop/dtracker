import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";
import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import "./global.css";
import Toast from "react-native-toast-message";

import { LoadingScreen } from "@/components/loading-screen";
import { useAuthStore } from "@/features/auth/auth.store";
import { useSession } from "@/features/auth/hooks/use-session";
import { QueryProvider } from "@/lib/tanstack-query/query-provider";

const isWeb = Platform.OS === "web";

if (!isWeb) {
  SplashScreen.preventAutoHideAsync();
}

function RootNavigator() {
  const { hasCompletedOnboarding, _hasHydrated } = useAuthStore();

  const { data: session, isPending } = useSession();

  const isLoggedIn = !!session;

  // https://zustand.docs.pmnd.rs/integrations/persisting-store-data#how-can-i-check-if-my-store-has-been-hydrated
  // Hide the splash screen after the store has been hydrated
  useEffect(() => {
    if (_hasHydrated) {
      SplashScreen.hideAsync();
    }
  }, [_hasHydrated]);

  if (!_hasHydrated && !isWeb) {
    return null;
  }

  if (isPending) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Protected guard={isLoggedIn && hasCompletedOnboarding}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn && hasCompletedOnboarding}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
      <Stack.Protected guard={!hasCompletedOnboarding}>
        <Stack.Screen name="(onboarding)" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  const insets = useSafeAreaInsets();
  return (
    <QueryProvider>
      <RootNavigator />
      <Toast topOffset={insets.top + 8} />
    </QueryProvider>
  );
}
