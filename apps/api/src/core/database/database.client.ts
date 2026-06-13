import { drizzle } from "drizzle-orm/node-postgres";

import { relations } from "./schemas/relations";

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL env variable! Please provide it.");
}

const db = drizzle(POSTGRES_URL, {
  relations,
});

export type DB = typeof db;

export default db;
