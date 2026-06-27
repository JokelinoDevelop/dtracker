import { reset, seed } from "drizzle-seed";

import { env } from "@/env";

import { db } from "./database.provider";
import * as schema from "./schemas/index";

if (env.POSTGRES_SEEDING) {
  throw new Error(
    'You must set POSTGRES_SEEDING to "true" when running seeds!'
  );
}

// oxlint-disable-next-line func-style
async function main() {
  console.log("Resetting database...");
  await reset(db, schema);

  console.log("Seeding database...");
  await seed(db, schema).refine((f) => ({
    users: {
      columns: {
        email: f.email(),
        name: f.fullName(),
      },
    },
  }));

  console.log("Seeding complete!");
  process.exit();
}

main();
