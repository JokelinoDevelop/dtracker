import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth/auth-client";

type useResetPasswordProps = {
  newPassword: string;
  token: string;
};

export function useResetPassword() {
  return useMutation({
    mutationFn: async ({ token, newPassword }: useResetPasswordProps) => {
      const { data, error } = await authClient.resetPassword({
        newPassword,
        token,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onError: (error) => {
      toast.error(error.message);
      console.error(error);
    },
  });
}
