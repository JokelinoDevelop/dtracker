import { Lock } from "lucide-react";

import { useAppForm } from "@/components/form/hooks";
import { FieldGroup } from "@/components/ui/field";

import { resetPasswordFormOptions } from "./reset-password-form.options";
import { useResetPassword } from "./reset-password.mutation";

type ResetPasswordFormProps = {
  token: string;
  onSuccess: () => void;
};

export function ResetPasswordForm({
  token,
  onSuccess,
}: ResetPasswordFormProps) {
  const { mutateAsync } = useResetPassword();

  const form = useAppForm({
    ...resetPasswordFormOptions,
    onSubmit: async ({ value }) => {
      await mutateAsync({
        newPassword: value.password,
        token,
      });

      onSuccess();
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();

        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        <form.AppField
          name="password"
          children={(field) => (
            <field.PasswordField
              id="password"
              label="New Password"
              placeholder="••••••••"
              iconLeft={<Lock />}
            />
          )}
        />

        <form.AppField
          name="confirmPassword"
          children={(field) => (
            <field.PasswordField
              id="confirmPassword"
              label="Confirm Password"
              placeholder="••••••••"
              iconLeft={<Lock />}
            />
          )}
        />
      </FieldGroup>

      <form.AppForm>
        <form.SubmitButton size="lg" className="w-full">
          Reset Password
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
