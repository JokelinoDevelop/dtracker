import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { TextInput } from "react-native";
import Toast from "react-native-toast-message";

import FacebookLogo from "@/assets/images/facebook.svg";
import GoogleLogo from "@/assets/images/google.svg";
import { FormErrorBanner } from "@/components/form/form-error-banner";
import { useAppForm } from "@/components/form/hooks";
import { Separator } from "@/components/ui/separator";

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
            leftIcon={<Ionicons name="mail-sharp" size={16} color="white" />}
            autoComplete="email"
            keyboardType="email-address"
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
            leftIcon={<Ionicons name="lock-closed" size={16} color="white" />}
            autoComplete="password"
            placeholder="••••••••"
            returnKeyType="done"
            textContentType="password"
            onSubmitEditing={() => form.handleSubmit()}
          />
        )}
      />
      <View className="flex-row items-center justify-end">
        <Link href="/forgot-password" asChild>
          <Pressable accessibilityRole="link" hitSlop={8}>
            <Text className="text-sm text-primary">Forgot password?</Text>
          </Pressable>
        </Link>
      </View>
      {formError ? <FormErrorBanner message={formError} /> : null}
      <form.AppForm>
        <form.SubmitButton
          loadingTitle="Signing in..."
          title="Sign In"
          className="mt-2"
        />
      </form.AppForm>

      <Separator label="Or Sign in with" className="my-4" />

      <View className="flex-row justify-center items-center gap-x-10">
        <Pressable
          className="p-5 bg-white rounded-xl border border-border"
          onPress={() => {
            Toast.show({
              text1: "Google sign in successful",
              type: "success",
            });
          }}
        >
          <GoogleLogo />
        </Pressable>
        <Pressable className="px-[27px] py-5 bg-white rounded-xl border border-border">
          <FacebookLogo />
        </Pressable>
      </View>
    </View>
  );
}
