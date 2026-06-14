import { defineRelations } from "drizzle-orm/relations";

import * as schema from "./index";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
  },
  sessions: {
    user: r.one.users({
      from: r.sessions.userId,
      to: r.users.id,
    }),
  },
  accounts: {
    user: r.one.users({
      from: r.accounts.userId,
      to: r.users.id,
    }),
  },
}));
