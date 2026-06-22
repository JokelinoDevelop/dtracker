import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { drizzle } from "drizzle-orm/node-postgres";

import { relations } from "./schemas/relations";

expand(config());

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL env variable! Please provide it.");
}

// This is a second client created specifically for the auth.config to be passed into the drizzleAdapter function, since the main db client is wrapped inside a NestJS provider
const db = drizzle(POSTGRES_URL, {
  relations,
});

export default db;
