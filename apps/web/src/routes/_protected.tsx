import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { authClient } from "#/lib/better-auth/auth-client.ts";
import { AppShell } from "#/routes/-components/app-shell.tsx";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
  beforeLoad: async ({ location }) => {
    const session = await authClient.getSession();

    if (session.data === null) {
      throw redirect({
        to: "/",
        search: { redirect: location.href },
      });
    }

    const { data } = session;

    return { user: data.user };
  },
});

function RouteComponent() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
