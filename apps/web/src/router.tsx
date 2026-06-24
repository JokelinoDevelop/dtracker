// oxlint-disable typescript/consistent-type-definitions
import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { queryClient } from "./main";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
  const router = createTanStackRouter({
    context: {
      queryClient,
    },
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0,
    routeTree,
    scrollRestoration: true,
  });

  return router;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
