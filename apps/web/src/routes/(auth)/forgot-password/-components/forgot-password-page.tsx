import { useState } from "react";

import { BrandLogo } from "@/components/brand-logo.tsx";

import { ForgotPasswordForm } from "./forgot-password-form";
import type { ForgotPasswordFormValue } from "./forgot-password-form.options";
import { ForgotPasswordSuccessSent } from "./forgot-password-success-sent";

export type Step = "forgot-password" | "success-sent";

export function ForgotPasswordPage() {
  const [step, setStep] = useState<Step>("forgot-password");
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="flex items-center px-6">
        <BrandLogo className="left-40 top-8" />
      </header>

      {/* Center content */}
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          {step === "forgot-password" ? (
            <>
              <div className="space-y-2 mb-14">
                <h1 className="text-4xl">Forgot your password?</h1>
                <p className="text-left text-sm text-muted-foreground">
                  Enter your email and we'll send you a code to reset the
                  password
                </p>
              </div>
              <ForgotPasswordForm onSuccess={handleForgotPasswordSuccess} />
            </>
          ) : null}

          {step === "success-sent" ? (
            <ForgotPasswordSuccessSent email={email} setStep={setStep} />
          ) : null}
        </div>
      </main>
    </div>
  );

  function handleForgotPasswordSuccess(value: ForgotPasswordFormValue) {
    setEmail(value.email);
    setStep("success-sent");
  }
}
