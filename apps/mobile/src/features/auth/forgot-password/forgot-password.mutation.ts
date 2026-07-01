import { useMutation } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

type RequestPasswordResetOtpInput = {
  email: string;
};

type ResetPasswordWithOtpInput = {
  email: string;
  otp: string;
  password: string;
};

export function useRequestPasswordResetOtp() {
  return useMutation({
    mutationFn: async ({ email }: RequestPasswordResetOtpInput) => {
      const { data, error } = await authClient.emailOtp.requestPasswordReset({
        email,
      });

      if (error) {
        throw new Error(
          error.message ?? "Unable to send reset code. Please try again."
        );
      }

      return data;
    },
  });
}

export function useResetPasswordWithOtp() {
  return useMutation({
    mutationFn: async ({ email, otp, password }: ResetPasswordWithOtpInput) => {
      const { data, error } = await authClient.emailOtp.resetPassword({
        email,
        otp,
        password,
      });

      if (error) {
        throw new Error(
          error.message ?? "Unable to reset password. Please try again."
        );
      }

      return data;
    },
  });
}
