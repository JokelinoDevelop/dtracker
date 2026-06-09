import { Link } from "@tanstack/react-router";

import { SignInForm } from "./sign-in-form";

export function SignInPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side */}

      <div className="flex items-center justify-center px-6 relative">
        {/* Brand */}
        <div className="absolute top-6 left-10">
          <span className="text-lg font-semibold tracking-tight">dtracker</span>
        </div>

        <div className="w-full max-w-sm space-y-10">
          {/* Header */}
          <div className="space-y-5">
            <h1 className="text-5xl font-semibold">Sign in</h1>

            <p className="text-muted-foreground">
              Don’t have an account?{" "}
              <Link to="/register" className="text-primary underline">
                Create now
              </Link>
            </p>
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
