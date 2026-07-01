import { useMutation } from "@tanstack/react-query";

import { authQueries } from "@/features/auth/auth.queries";
import { authClient } from "@/lib/auth-client";
import { queryClient } from "@/lib/tanstack-query/query-client";

export function useSignOut() {
  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(
          error.message ?? "Unable to sign out. Please try again."
        );
      }
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries(authQueries.session());
    },
  });
}
