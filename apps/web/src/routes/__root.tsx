import { TanStackDevtools } from "@tanstack/react-devtools";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/sonner.tsx";
import { Providers } from "@/providers";

import "../styles.css";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";

export const Route = createRootRoute({
  shellComponent: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Providers>
        <Outlet />
      </Providers>
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
          TanStackQueryDevtools,
        ]}
      />
    </>
  );
}
