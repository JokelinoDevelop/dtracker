import { useMutation } from "@tanstack/react-query";

import { authQueries } from "@/features/auth/auth.queries";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/tanstack-query/query-client";

export type SocialProvider = "google" | "facebook";

type SocialSignInInput = {
  provider: SocialProvider;
};

export function useSocialSignIn() {
  return useMutation({
    mutationFn: async ({ provider }: SocialSignInInput) => {
      const { data, error } = await authClient.signIn.social({
        callbackURL: "/",
        provider,
      });

      if (error) {
        throw new Error(
          error.message ?? "Unable to sign in. Please try again."
        );
      }

      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(authQueries.session());
    },
  });
}
