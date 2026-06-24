import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// oxlint-disable typescript/consistent-type-definitions
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";

export const queryClient = new QueryClient();

const router = createRouter({
  context: {
    queryClient,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  routeTree,
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// oxlint-disable-next-line typescript/no-non-null-assertion
const rootElement = document.querySelector("#app")!;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {" "}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
