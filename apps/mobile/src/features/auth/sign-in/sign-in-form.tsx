import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { TextInput } from "react-native";

import { FormErrorBanner } from "@/components/form/form-error-banner";
import { useAppForm } from "@/components/form/hooks";

import { signInFormOptions } from "./sign-in-form.options";
import { useSignIn } from "./sign-in.mutation";

export function SignInForm() {
  const [formError, setFormError] = useState<string | null>(null);
  const passwordRef = useRef<TextInput>(null);
  const { mutateAsync } = useSignIn();

  const form = useAppForm({
    ...signInFormOptions,
    onSubmit: async ({ value }) => {
      setFormError(null);

      try {
        await mutateAsync(value);
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Unable to sign in. Please try again."
        );
      }
    },
  });

  return (
    <View className="gap-y-4">
      <form.AppField
        name="email"
        children={(field) => (
          <field.TextField
            autoComplete="email"
            keyboardType="email-address"
            label="Email"
            placeholder="you@example.com"
            returnKeyType="next"
            textContentType="emailAddress"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
        )}
      />

      <form.AppField
        name="password"
        children={(field) => (
          <field.PasswordField
            ref={passwordRef}
            autoComplete="password"
            label="Password"
            placeholder="••••••••"
            returnKeyType="done"
            textContentType="password"
            onSubmitEditing={() => form.handleSubmit()}
          />
        )}
      />

      <form.AppField
        name="rememberMe"
        children={(field) => (
          <field.SwitchField
            label="Remember me"
            trailing={
              <Link href="/forgot-password" asChild>
                <Pressable accessibilityRole="link" hitSlop={8}>
                  <Text className="text-sm font-medium text-primary">
                    Forgot password?
                  </Text>
                </Pressable>
              </Link>
            }
          />
        )}
      />

      {formError ? <FormErrorBanner message={formError} /> : null}

      <form.AppForm>
        <form.SubmitButton loadingTitle="Signing in..." title="Sign In" />
      </form.AppForm>
    </View>
  );
}
