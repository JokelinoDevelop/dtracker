import { useQuery } from "@tanstack/react-query";

import { authQueries } from "../auth.queries";

export function useSession() {
  return useQuery({
    ...authQueries.session(),
    select: (response) => response.data,
  });
}
