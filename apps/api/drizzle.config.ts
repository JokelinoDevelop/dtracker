import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { defineConfig } from "drizzle-kit";

expand(config());

const { POSTGRES_URL } = process.env;

if (!POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL env variable!");
}

export default defineConfig({
  dbCredentials: {
    url: POSTGRES_URL,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/core/database/schemas/index.ts",
  strict: true,
  verbose: true,
});
