import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  firstName: varchar({ length: 255 }).notNull(),
  lastName: varchar({ length: 255 }).notNull(),
  phone: varchar({ length: 255 }),
  phoneVerified: boolean().default(false),
  avatarUrl: text(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerified: boolean().default(false),
  passwordHash: text().notNull(),

  createdAt: timestamp().defaultNow().notNull(),
  updatedAt: timestamp()
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
