import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { authClient } from "@/lib/better-auth/auth-client";

type useSignInProps = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export function useSignIn() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ email, password, rememberMe }: useSignInProps) => {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe,
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
    onSuccess: async (data) => {
      toast.success(`Welcome back ${data?.user.name}!`);

      await navigate({ to: "/dashboard" });
    },
  });
}
