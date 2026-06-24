import { Link } from "@tanstack/react-router";
import { Mail } from "lucide-react";

import { useAppForm } from "@/components/form/hooks";
import { FieldGroup } from "@/components/ui/field";
import { Separator } from "@/components/ui/separator.tsx";

import { forgotPasswordFormOptions } from "./forgot-password-form.options";
import type { ForgotPasswordFormValue } from "./forgot-password-form.options";
import { useForgotPassword } from "./forgot-password-mutation";

type ForgotPasswordFormProps = {
  onSuccess: (value: ForgotPasswordFormValue) => void;
};

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
  const { mutateAsync } = useForgotPassword();

  const form = useAppForm({
    ...forgotPasswordFormOptions,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);

      onSuccess({
        email: value.email,
      });
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
          name="email"
          children={(field) => (
            <field.TextField
              label="Email"
              placeholder="you@example.com"
              type="email"
              id="email"
              iconLeft={<Mail />}
            />
          )}
        />
      </FieldGroup>

      <Separator />

      <form.AppForm>
        <form.SubmitButton size="lg" className="w-full">
          Send reset code
        </form.SubmitButton>

        <p className="mt-4 text-muted-foreground text-sm text-center">
          Already have an account?{" "}
          <Link to="/" className="text-foreground underline">
            Sign In
          </Link>
        </p>
      </form.AppForm>
    </form>
  );
}
