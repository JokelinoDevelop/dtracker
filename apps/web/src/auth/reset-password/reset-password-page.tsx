import { Link, useSearch } from "@tanstack/react-router";
import { CheckCircle2, KeyRound, TriangleAlert } from "lucide-react";
import { useState } from "react";

import { ResetPasswordForm } from "@/auth/reset-password/reset-password-form";
import { BrandLogo } from "@/components/brand-logo";
import { Button } from "@/components/ui/button";

type Step = "reset-password" | "success";

export function ResetPasswordPage() {
  const { error, token } = useSearch({
    from: "/(auth)/reset-password",
  });

  const [step, setStep] = useState<Step>("reset-password");

  const hasInvalidToken = error === "INVALID_TOKEN" || !token;

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side */}
      <div className="flex items-center justify-center px-6 relative">
        {/* Brand */}
        <BrandLogo />

        <div className="w-full max-w-sm space-y-6">
          {hasInvalidToken && <InvalidTokenSection />}

          {!hasInvalidToken && step === "success" && (
            <SuccessPasswordResetSection />
          )}

          {!hasInvalidToken && step === "reset-password" && (
            <div className="w-full max-w-sm">
              <div className="rounded-3xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="size-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <KeyRound className="size-6 text-primary" />
                    </div>

                    <h1 className="text-3xl font-semibold">Reset password</h1>

                    <p className="text-muted-foreground">
                      Choose a new password for your account.
                    </p>
                  </div>

                  <ResetPasswordForm
                    token={token}
                    onSuccess={() => setStep("success")}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center justify-center bg-primary m-4 rounded-2xl" />
    </div>
  );
}

function SuccessPasswordResetSection() {
  return (
    <div className="rounded-3xl p-8">
      <div className="space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
          <CheckCircle2 className="size-8 text-primary" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">Password updated</h1>

          <p className="text-muted-foreground mt-2">
            Your password has been reset successfully.
          </p>
        </div>

        <Button
          render={<Link to="/">Continue to sign in</Link>}
          size="lg"
          className="w-full"
        />
      </div>
    </div>
  );
}

function InvalidTokenSection() {
  return (
    <div className="rounded-3xl p-8">
      <div className="space-y-6 text-center">
        <div className="mx-auto size-16 rounded-full bg-destructive/10 flex items-center justify-center">
          <TriangleAlert className="size-8 text-destructive" />
        </div>

        <div>
          <h1 className="text-3xl font-semibold">Invalid link</h1>

          <p className="text-muted-foreground mt-2">
            This reset link is invalid or has expired.
          </p>
        </div>

        <Button
          render={<Link to="/forgot-password">Request new link</Link>}
          size="lg"
          className="w-full"
        />
      </div>
    </div>
  );
}
