import { createMemoryHistory, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    // On the server (no window) use memory history; in the browser the default
    // browser history is used automatically.
    history:
      typeof window === "undefined"
        ? createMemoryHistory({ initialEntries: ["/"] })
        : undefined,
  });

  return router;
};
