import { Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";

import { useAppForm } from "@/components/form/hooks";
import { FieldGroup } from "@/components/ui/field";

import { signInFormOptions } from "./sign-in-form.options";
import { useSignIn } from "./sign-in.mutation";

export function SignInForm() {
  const { mutateAsync } = useSignIn();

  const form = useAppForm({
    ...signInFormOptions,
    onSubmit: async ({ value }) => {
      await mutateAsync(value);
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
        <form.AppField
          name="password"
          children={(field) => (
            <field.PasswordField
              label="Password"
              placeholder="••••••••"
              id="password"
              iconLeft={<Lock />}
            />
          )}
        />
        <div className="flex items-center justify-between">
          <div>
            <form.AppField
              name="rememberMe"
              children={(field) => (
                <field.CheckboxField id="rememberMe" label="Remember me" />
              )}
            />
          </div>

          <Link
            to="/forgot-password"
            className="text-primary text-sm underline"
          >
            Forgot Password?
          </Link>
        </div>
      </FieldGroup>

      <form.AppForm>
        <form.SubmitButton size="lg" className="w-full rounded-xl">
          Sign In
        </form.SubmitButton>
      </form.AppForm>
    </form>
  );
}
