import { createFileRoute } from "@tanstack/react-router";

import { SignInForm } from "@/auth/sign-in/sign-in-form";
import { BrandLogo } from "@/components/brand-logo";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side */}
      <div className="flex items-center justify-center px-6 relative">
        {/* Brand */}
        <BrandLogo />

        <div className="w-full max-w-sm space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold">Welcome back</h1>

            <p className="text-muted-foreground">Sign in to your account!</p>
          </div>

          {/* Form */}
          <SignInForm />
        </div>
      </div>

      {/* Right side */}
      <div className="hidden md:flex items-center justify-center bg-primary m-4 rounded-2xl"></div>
    </div>
  );
}
