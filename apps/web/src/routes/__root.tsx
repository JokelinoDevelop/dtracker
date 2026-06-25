import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import "../styles.css";

import { GlobalRouteNotFound } from "@/components/global/global-not-found";
import { GlobalRouteError } from "@/components/global/global-route-error";
import { Toaster } from "@/components/ui/sonner.tsx";

export const Route = createRootRoute({
  component: RootComponent,
  errorComponent: GlobalRouteError,
  notFoundComponent: GlobalRouteNotFound,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <Toaster richColors />
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: "Tanstack Query",
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  );
}
