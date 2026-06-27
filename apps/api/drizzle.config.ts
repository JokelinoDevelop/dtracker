import { defineConfig } from "drizzle-kit";

import { env } from "@/env";

export default defineConfig({
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/core/database/schemas/index.ts",
  strict: true,
  verbose: true,
});
