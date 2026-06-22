import { Inject, Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import { relations } from "./schemas/relations";

export const DATABASE_CONNECTION = Symbol("DATABASE_CONNECTION");

export const DatabaseProvider = {
  inject: [ConfigService],
  provide: DATABASE_CONNECTION,
  useFactory: (configService: ConfigService) => {
    const POSTGRES_URL = configService.getOrThrow<string>("POSTGRES_URL");

    const client = new Pool({
      connectionString: POSTGRES_URL,
    });

    return drizzle({
      client,
      relations,
    });
  },
} satisfies Provider;

export const InjectDb = () => Inject(DATABASE_CONNECTION);

export type DatabaseService = ReturnType<typeof DatabaseProvider.useFactory>;
