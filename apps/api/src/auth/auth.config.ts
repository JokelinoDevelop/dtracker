import { sendResetPasswordMail } from "@dtracker/email";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, openAPI } from "better-auth/plugins";

import db from "../core/database/database.client";
import * as schema from "../core/database/schemas/auth.table";

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
      disableDefaultReference: process.env.NODE_ENV === "production",
    }),
    admin(),
  ],
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
