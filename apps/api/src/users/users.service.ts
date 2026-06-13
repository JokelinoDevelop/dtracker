import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";

import type { DB } from "../core/database/database.client";
import { InjectDb } from "../core/database/database.provider";
import { users } from "../core/database/schemas";

@Injectable()
export class UsersService {
  constructor(@InjectDb() private readonly db: DB) {}

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }
}
