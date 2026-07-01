import { Redirect } from "expo-router";

import { AuthLoadingScreen } from "@/features/auth/auth-loading-screen";
import { useSession } from "@/features/auth/hooks/use-session";
import { useOnboarding } from "@/features/onboarding/onboarding-provider";

export default function Index() {
  const { data: session, isPending: isSessionPending } = useSession();

  const { isComplete: isOnboardingComplete } = useOnboarding();

  if (isSessionPending) {
    return <AuthLoadingScreen />;
  }

  if (!isOnboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  if (session) {
    return <Redirect href="/(app)/home" />;
  }

  return <Redirect href="/(auth)/sign-in" />;
}
