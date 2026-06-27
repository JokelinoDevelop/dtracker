import { Inject, Provider } from "@nestjs/common";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "@/env";

import { relations } from "./schemas/relations";

export const db = drizzle(env.POSTGRES_URL, {
  relations,
});

export const DATABASE_CONNECTION = Symbol("DATABASE_CONNECTION");

export const DatabaseProvider = {
  provide: DATABASE_CONNECTION,
  useValue: db,
} satisfies Provider;

export const InjectDb = () => Inject(DATABASE_CONNECTION);

export type DatabaseService = typeof db;
