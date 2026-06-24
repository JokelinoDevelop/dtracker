import { ArrowLeft, CheckCircle2, Mail } from "lucide-react";
import type { Dispatch, SetStateAction } from "react";

import { AppButton } from "@/components/app/app-button";
import type { Step } from "@/routes/(auth)/forgot-password";

import { useForgotPassword } from "./forgot-password-mutation";

type ForgotPasswordSuccessSentProps = {
  email: string;
  setStep: Dispatch<SetStateAction<Step>>;
};

export function ForgotPasswordSuccessSent({
  email,
  setStep,
}: ForgotPasswordSuccessSentProps) {
  const { mutateAsync, isPending } = useForgotPassword();
  return (
    <div className="space-y-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-semibold">Check your email</h1>

        <p className="text-sm text-muted-foreground">
          We've sent password reset instructions to your email address.
        </p>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 text-left">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 text-muted-foreground" />
          <div className="space-y-1 text-sm">
            <p className="font-medium">Didn't receive the email?</p>
            <ul className="list-disc pl-4 text-muted-foreground">
              <li>Check your spam or junk folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>Wait a few minutes and try again</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AppButton
          isLoading={isPending}
          onClick={handleResendEmail}
          size="lg"
          className="w-full"
        >
          Resend email
        </AppButton>

        <AppButton
          variant="outline"
          onClick={handleBack}
          size="lg"
          className="w-full"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back
        </AppButton>
      </div>
    </div>
  );

  async function handleResendEmail() {
    await mutateAsync({ email });
  }

  function handleBack() {
    setStep("forgot-password");
  }
}
