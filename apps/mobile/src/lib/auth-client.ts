import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import packageJson from "../../app.json";

export const authClient = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_API_URL, // Base URL of your backend serving Better Auth.
  plugins: [
    expoClient({
      scheme: packageJson.expo.scheme,
      storage: SecureStore,
      storagePrefix: packageJson.expo.scheme,
    }),
    emailOTPClient(),
  ],
});

export const { useSession, signOut } = authClient;
