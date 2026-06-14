import { TanStackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Providers } from "@/providers";

import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

import "../styles.css";

export const Route = createRootRoute({
  shellComponent: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Providers>
        <Outlet />
      </Providers>
      <TanStackDevtools
        config={{
          position: "bottom-right",
        }}
        plugins={[
          {
            name: "Tanstack Router",
            render: <TanStackRouterDevtoolsPanel />,
          },
          TanStackQueryDevtools,
        ]}
      />
    </>
  );
}
