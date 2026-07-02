import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import type { TextInput } from "react-native";

import { FormErrorBanner } from "@/components/form/form-error-banner";
import { useAppForm } from "@/components/form/hooks";

import {
  requestOtpFormOptions,
  resetPasswordFormOptions,
} from "./forgot-password-form.options";
import {
  useRequestPasswordResetOtp,
  useResetPasswordWithOtp,
} from "./forgot-password.mutation";

type Step = "email" | "reset" | "success";

export function ForgotPasswordForm() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const { mutateAsync: requestPasswordResetOtp } = useRequestPasswordResetOtp();
  const { mutateAsync: resetPasswordWithOtp } = useResetPasswordWithOtp();

  const otpRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const requestOtpForm = useAppForm({
    ...requestOtpFormOptions,
    onSubmit: async ({ value }) => {
      setFormError(null);

      try {
        await requestPasswordResetOtp(value);
        setEmail(value.email);
        setStep("reset");
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Unable to send reset code. Please try again."
        );
      }
    },
  });

  const resetPasswordForm = useAppForm({
    ...resetPasswordFormOptions,
    onSubmit: async ({ value }) => {
      setFormError(null);

      try {
        await resetPasswordWithOtp({
          email,
          otp: value.otp,
          password: value.password,
        });
        setStep("success");
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Unable to reset password. Please try again."
        );
      }
    },
  });

  if (step === "success") {
    return (
      <View className="gap-y-6">
        <View className="gap-y-2 rounded-xl border border-border bg-muted px-4 py-4">
          <Text className="text-base font-medium text-foreground">
            Password updated
          </Text>
          <Text className="text-sm leading-5 text-muted-foreground">
            Your password has been reset. You can now sign in with your new
            password.
          </Text>
        </View>

        <Link href="/sign-in" asChild>
          <Pressable accessibilityRole="link">
            <Text className="text-center text-sm font-medium text-primary">
              Back to sign in
            </Text>
          </Pressable>
        </Link>
      </View>
    );
  }

  if (step === "reset") {
    return (
      <View className="gap-y-4">
        <View className="rounded-xl border border-border bg-muted px-4 py-3">
          <Text className="text-sm leading-5 text-muted-foreground">
            We sent a 6-digit code to{" "}
            <Text className="font-medium text-foreground">{email}</Text>. Enter
            it below along with your new password.
          </Text>
        </View>

        <resetPasswordForm.AppField
          name="otp"
          children={(field) => (
            <field.TextField
              leftIcon={
                <Ionicons name="shield-checkmark" size={16} color="white" />
              }
              ref={otpRef}
              autoComplete="one-time-code"
              keyboardType="number-pad"
              label="Verification code"
              maxLength={6}
              placeholder="123456"
              textContentType="oneTimeCode"
              onSubmitEditing={() => passwordRef.current?.focus()}
            />
          )}
        />

        <resetPasswordForm.AppField
          name="password"
          children={(field) => (
            <field.PasswordField
              leftIcon={<Ionicons name="lock-closed" size={16} color="white" />}
              ref={passwordRef}
              autoComplete="new-password"
              label="New password"
              placeholder="••••••••"
              returnKeyType="next"
              textContentType="newPassword"
              onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            />
          )}
        />

        <resetPasswordForm.AppField
          name="confirmPassword"
          children={(field) => (
            <field.PasswordField
              leftIcon={<Ionicons name="lock-closed" size={16} color="white" />}
              ref={confirmPasswordRef}
              autoComplete="new-password"
              label="Confirm password"
              placeholder="••••••••"
              returnKeyType="done"
              textContentType="newPassword"
              onSubmitEditing={() => resetPasswordForm.handleSubmit()}
            />
          )}
        />

        {formError ? <FormErrorBanner message={formError} /> : null}

        <resetPasswordForm.AppForm>
          <resetPasswordForm.SubmitButton
            loadingTitle="Resetting..."
            title="Reset password"
          />
        </resetPasswordForm.AppForm>

        <Pressable
          accessibilityRole="button"
          onPress={() => {
            setFormError(null);
            setStep("email");
          }}
        >
          <Text className="text-center text-sm text-muted-foreground">
            Use a different email
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View className="gap-y-4">
      <requestOtpForm.AppField
        name="email"
        children={(field) => (
          <field.TextField
            leftIcon={<Ionicons name="mail" size={16} color="white" />}
            autoComplete="email"
            keyboardType="email-address"
            label="Email"
            placeholder="you@example.com"
            returnKeyType="send"
            textContentType="emailAddress"
            onSubmitEditing={() => requestOtpForm.handleSubmit()}
          />
        )}
      />

      {formError ? <FormErrorBanner message={formError} /> : null}

      <requestOtpForm.AppForm>
        <requestOtpForm.SubmitButton
          loadingTitle="Sending..."
          title="Send reset code"
        />
      </requestOtpForm.AppForm>

      <Link href="/sign-in" asChild>
        <Pressable accessibilityRole="link">
          <Text className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Text className="font-medium text-primary">Sign in</Text>
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}
