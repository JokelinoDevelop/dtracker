import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth/auth-client";

type useForgotPasswordProps = {
  email: string;
};

export function useForgotPassword() {
  return useMutation({
    mutationFn: async ({ email }: useForgotPasswordProps) => {
      const { data, error } = await authClient.requestPasswordReset({
        email,
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
    onSuccess: (data) => {
      console.log("HELLLO FROM SUCCESS", data);
      toast.success(data?.message);
    },
  });
}
