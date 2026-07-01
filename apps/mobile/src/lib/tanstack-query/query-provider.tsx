import { QueryClientProvider, focusManager } from "@tanstack/react-query";
import { useEffect } from "react";
import type { PropsWithChildren } from "react";
import { AppState, Platform } from "react-native";
import type { AppStateStatus } from "react-native";

import { configureReactNativeQuery } from "@/lib/tanstack-query/configure-react-native-query";
import { queryClient } from "@/lib/tanstack-query/query-client";

configureReactNativeQuery();

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export function QueryProvider({ children }: PropsWithChildren) {
  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => subscription.remove();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
