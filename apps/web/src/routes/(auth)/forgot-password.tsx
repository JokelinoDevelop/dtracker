import { createFileRoute } from "@tanstack/react-router";

import { ForgotPasswordPage } from "@/auth/forgot-password/forgot-password-page";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordPage />;
}
