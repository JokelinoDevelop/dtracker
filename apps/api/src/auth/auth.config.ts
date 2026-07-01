import { expo } from "@better-auth/expo";
import { redisStorage } from "@better-auth/redis-storage";
import { sendOtpMail, sendResetPasswordMail } from "@dtracker/email";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { admin, emailOTP, openAPI } from "better-auth/plugins";
import { Redis } from "ioredis";

import { db } from "@/core/database/database.provider";
import { env } from "@/env";

import * as schema from "../core/database/schemas/auth.table";

const redis = new Redis({
  host: env.REDIS_HOST,
  password: env.REDIS_PASSWORD,
  port: env.REDIS_PORT,
});

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
    enabled: true,
    maxPasswordLength: 20,
    minPasswordLength: 8,
    resetPasswordTokenExpiresIn: 1800, // 1800 s = 30min
    revokeSessionsOnPasswordReset: true,
    // oxlint-disable-next-line require-await
    sendResetPassword: async ({ user, url }) => {
      void sendResetPasswordMail(user.email, url);
    },
  },
  plugins: [
    expo(), // Expo plugin needed for the mobile app
    emailOTP({
      // oxlint-disable-next-line require-await
      async sendVerificationOTP({ email, otp, type }) {
        let purpose: typeof type = "sign-in";

        switch (type) {
          case "sign-in": {
            purpose = "sign-in";
            break;
          }
          case "email-verification": {
            purpose = "email-verification";
            break;
          }
          default: {
            purpose = "forget-password";
            break;
          }
        }

        void sendOtpMail(email, otp, purpose);
      },
    }),
    openAPI({
      disableDefaultReference: env.NODE_ENV === "production",
    }),
    admin(),
  ],
  secondaryStorage: redisStorage({
    client: redis,
    keyPrefix: "better-auth:", // optional, defaults to "better-auth:"
  }),
  secret: env.BETTER_AUTH_SECRET,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // cache session in cookie for 5 min to cut DB hits
    },
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // refresh once per day,
  },
  trustedOrigins: [
    ...env.ALLOWED_ORIGINS,
    // Development mode - Expo's exp:// scheme with local IP ranges
    ...(env.NODE_ENV === "development"
      ? [
          "exp://", // Trust all Expo URLs (prefix matching)
          "exp://**", // Trust all Expo URLs (wildcard matching)
          "exp://192.168.*.*:*/**", // Trust 192.168.x.x IP range with any port and path
        ]
      : []),
  ],
});

export type Auth = typeof auth;
