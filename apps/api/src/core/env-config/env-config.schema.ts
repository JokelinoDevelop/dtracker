import z from "zod/v4";

const NODE_ENV_ARRAY = ["development", "production", "test"];

const PINO_LOG_LEVEL_ARRAY = [
  "debug",
  "info",
  "warn",
  "error",
  "silent",
  "fatal",
  "trace",
];

export const envConfigSchema = z.object({
  ALLOWED_ORIGINS: z
    .string()
    .transform((val) => val.split(",").map((v) => v.trim())),

  JWT_ACCESS_EXPIRES_IN: z.coerce.number().min(15 * 60 * 1000), // 15mins

  JWT_ACCESS_TOKEN_SECRET: z.string().min(1),

  JWT_REFRESH_EXPIRES_IN: z.coerce.number().min(7 * 24 * 60 * 60 * 1000), // 7 days

  JWT_REFRESH_TOKEN_SECRET: z.string().min(1),

  LOG_LEVEL: z.enum(PINO_LOG_LEVEL_ARRAY).default("debug"),

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
});
