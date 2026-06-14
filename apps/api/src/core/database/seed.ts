import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { drizzle } from "drizzle-orm/node-postgres";
import { reset, seed } from "drizzle-seed";

import * as schema from "./schemas/index";

expand(config());

if (!process.env.POSTGRES_SEEDING) {
  throw new Error(
    'You must set POSTGRES_SEEDING to "true" when running seeds!'
  );
}

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error(
    "You must set POSTGRES_URL to a valid database connection string when running seeds!"
  );
}

const database = drizzle(POSTGRES_URL);

// oxlint-disable-next-line func-style
async function main() {
  console.log("Resetting database...");
  await reset(database, schema);

  console.log("Seeding database...");
  await seed(database, schema).refine((f) => ({
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
