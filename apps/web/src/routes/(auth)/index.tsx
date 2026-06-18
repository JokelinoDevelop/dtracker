import { createFileRoute } from "@tanstack/react-router";

import { SignInPage } from "./-components/sign-in-page";

export const Route = createFileRoute("/(auth)/")({
  component: Login,
});

function Login() {
  return <SignInPage />;
}
