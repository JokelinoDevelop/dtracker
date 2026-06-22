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

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(20, "Password must be at most 20 characters")
  .regex(/[a-z]/u, "Must include a lowercase letter")
  .regex(/[A-Z]/u, "Must include an uppercase letter")
  .regex(/[0-9]/u, "Must include a number")
  .regex(/[^a-zA-Z0-9]/u, "Must include a special character");

export const envConfigSchema = z.object({
  ADMIN_EMAIL: z.email(),
  ADMIN_PASSWORD: passwordSchema,
  ALLOWED_ORIGINS: z
    .string()
    .transform((val) => val.split(",").map((v) => v.trim())),
  API_PORT: z.coerce.number(),
  API_URL: z.string().nonempty(),
  BETTER_AUTH_SECRET: z.string().min(1),
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
