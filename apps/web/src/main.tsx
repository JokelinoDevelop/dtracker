// oxlint-disable typescript/consistent-type-definitions
import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";

import { routeTree } from "./routeTree.gen";

const router = createRouter({
  defaultPreload: "intent",
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
  root.render(<RouterProvider router={router} />);
}
