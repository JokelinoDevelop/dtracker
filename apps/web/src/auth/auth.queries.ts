import { queryOptions } from "@tanstack/react-query";

import { authClient } from "@/lib/better-auth/auth-client";

export const authQueries = {
  session: () =>
    queryOptions({
      queryFn: () => authClient.getSession(),
      queryKey: ["session"],
      staleTime: 60 * 1000 * 5, // 5 min
    }),
};
