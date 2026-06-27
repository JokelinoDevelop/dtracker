import { sendResetPasswordMail } from "@dtracker/email";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI } from "better-auth/plugins";

import { redisClient } from "@/core/cache-manager/redis-client";
import { db } from "@/core/database/database.provider";
import { env } from "@/env";

import * as schema from "../core/database/schemas/auth.table";

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    database: {
      generateId: "uuid",
    },
    useSecureCookies: env.NODE_ENV === "production",
  },
  appName: "DTracker",
  baseURL: env.API_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema, // pass your schema explicitly so the adapter doesn't have to introspect
    usePlural: true,
  }),
  emailAndPassword: {
    disableSignUp: true,
    enabled: true,
    maxPasswordLength: 20,
    minPasswordLength: 8,
    requireEmailVerification: true,
    resetPasswordTokenExpiresIn: 1800, // 1800 s = 30min
    revokeSessionsOnPasswordReset: true,
    // oxlint-disable-next-line require-await
    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordMail(user.email, url);
    },
  },
  plugins: [
    openAPI({
      disableDefaultReference: env.NODE_ENV === "production",
    }),
    admin(),
  ],
  secondaryStorage: {
    delete: async (key) => {
      await redisClient.del(key);
    },
    get: async (key) => await redisClient.get(key),
    set: async (key, value, ttl) => {
      // oxlint-disable-next-line unicorn/prefer-ternary
      if (ttl) {
        await redisClient.set(key, value, { EX: ttl });
      } else {
        await redisClient.set(key, value);
      }
    },
  },
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache session in cookie for 5 min to cut DB hits
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day,
  },
  trustedOrigins: env.ALLOWED_ORIGINS,
});

export type Auth = typeof auth;
