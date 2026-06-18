import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "#/lib/better-auth/auth-client.ts";

export const Route = createFileRoute("/(auth)")({
  component: RouteComponent,
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

function RouteComponent() {
  return <Outlet />;
}
