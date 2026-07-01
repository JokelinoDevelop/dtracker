import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { z } from "zod";

import { passwordSchema } from "./common/schemas/password.schema";
import { PINO_LOG_LEVEL_ARRAY } from "./core/logger/logger.constants";

expand(config());

const NODE_ENV_ARRAY = ["development", "production", "test"] as const;

export const env = createEnv({
  /**
   * By default, this library will feed the environment variables directly to
   * the Zod validator.
   *
   * This means that if you have an empty string for a value that is supposed
   * to be a number (e.g. `PORT=` in a ".env" file), Zod will incorrectly flag
   * it as a type mismatch violation. Additionally, if you have an empty string
   * for a value that is supposed to be a string with a default value (e.g.
   * `DOMAIN=` in an ".env" file), the default value will never be applied.
   *
   * In order to solve these issues, we recommend that all new projects
   * explicitly specify this option as true.
   */
  emptyStringAsUndefined: true,

  /**
   * What object holds the environment variables at runtime. This is usually
   * `process.env` or `import.meta.env`.
   */
  runtimeEnv: process.env,
  server: {
    ADMIN_EMAIL: z.email(),
    ADMIN_PASSWORD: passwordSchema,
    ALLOWED_ORIGINS: z
      .string()
      .transform((val) => val.split(",").map((v) => v.trim())),
    API_PORT: z.coerce.number(),
    API_URL: z.string().nonempty(),
    BETTER_AUTH_SECRET: z.string().min(1),
    FACEBOOK_CLIENT_ID: z.string().optional(),
    FACEBOOK_CLIENT_SECRET: z.string().optional(),
    GOOGLE_CLIENT_ID: z.string().nonempty(),
    GOOGLE_CLIENT_SECRET: z.string().nonempty(),
    LOG_LEVEL: z.enum(PINO_LOG_LEVEL_ARRAY).default("debug"),
    MAIL_FROM: z.string().nonempty(),
    MAIL_HOST: z.string().nonempty(),
    MAIL_PASS: z.string().optional(),
    MAIL_PORT: z.coerce.number(),
    MAIL_USER: z.string().optional(),
    NODE_ENV: z.enum(NODE_ENV_ARRAY).default("development"),
    POSTGRES_DB: z.string().nonempty(),
    POSTGRES_HOST: z.string().nonempty(),
    POSTGRES_PASSWORD: z.string().nonempty(),
    POSTGRES_PORT: z.coerce.number().positive(),
    POSTGRES_SEEDING: z.stringbool(),
    POSTGRES_URL: z.string().nonempty(),
    POSTGRES_USER: z.string().nonempty(),
    REDIS_HOST: z.string().nonempty(),
    REDIS_PASSWORD: z.string().nonempty(),
    REDIS_PORT: z.coerce.number().positive(),
    REDIS_URL: z.string().nonempty(),
  },
});
