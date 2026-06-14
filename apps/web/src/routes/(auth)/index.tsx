import { createFileRoute, redirect } from "@tanstack/react-router";

import { authClient } from "#/lib/better-auth/auth-client.ts";

import { SignInPage } from "./-components/sign-in-page";

export const Route = createFileRoute("/(auth)/")({
  component: Login,
  beforeLoad: async () => {
    const session = await authClient.getSession();

    if (session.data) {
      throw redirect({
        to: "/dashboard",
        search: { redirect: location.href },
      });
    }
  },
});

function Login() {
  return <SignInPage />;
}
