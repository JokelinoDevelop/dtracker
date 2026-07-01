import { useMutation } from "@tanstack/react-query";

import { authQueries } from "@/features/auth/auth.queries";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/tanstack-query/query-client";

type SignInInput = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useSignIn() {
  return useMutation({
    mutationFn: async ({ email, password, rememberMe }: SignInInput) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
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
