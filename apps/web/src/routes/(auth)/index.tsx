import { createFileRoute } from "@tanstack/react-router";

import { SignInPage } from "@/auth/sign-in/sign-in-page";

export const Route = createFileRoute("/(auth)/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <SignInPage />;
}
