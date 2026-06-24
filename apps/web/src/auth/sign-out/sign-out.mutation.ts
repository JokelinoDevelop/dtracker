import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth/auth-client";

export function useSignOut() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signOut();

      if (error) {
        throw new Error(error.message);
      }
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
    onSuccess: async () => {
      toast.success("You have signed out successfully!");
      await navigate({ to: "/" });
    },
  });
}
