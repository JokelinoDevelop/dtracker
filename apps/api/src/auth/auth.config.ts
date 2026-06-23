import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI } from "better-auth/plugins";

import db from "@/core/database/database.client";
import * as schema from "@/core/database/schemas/auth.table";
import { sleep } from "@/utils/common";

const { ALLOWED_ORIGINS } = process.env;

if (!ALLOWED_ORIGINS) {
  throw new Error("ALLOWED_ORIGINS env variable is missing!");
}

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
    },
    database: {
      generateId: "uuid",
    },
    useSecureCookies: process.env.NODE_ENV === "production",
  },
  appName: "DTracker",
  baseURL: process.env.API_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema, // pass your schema explicitly so the adapter doesn't have to introspect
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async (user, token) => {
      void console.log("USER RESET:", user);
      void console.log("USER TOKEN:", token);
      await sleep(500);
    },
  },
  plugins: [
    openAPI({
      disableDefaultReference: process.env.NODE_ENV === "production",
    }),
    admin(),
  ],
  rateLimit: {
    enabled: true,
    storage: "database", // don't use in-memory rate limiting across multiple instances
  },
  secret: process.env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache session in cookie for 5 min to cut DB hits
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day,
  },
  trustedOrigins: ALLOWED_ORIGINS.split(","),
});

export type Auth = typeof auth;
