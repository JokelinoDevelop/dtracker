import { Injectable, Logger } from "@nestjs/common";
import { Auth, AuthService } from "@thallesp/nestjs-better-auth";
import { eq } from "drizzle-orm";

import { env } from "@/env";

import type { DatabaseService } from "../core/database/database.provider";
import { InjectDb } from "../core/database/database.provider";
import { users } from "../core/database/schemas/auth.table";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  constructor(
    @InjectDb() private readonly db: DatabaseService,
    private readonly authService: AuthService<Auth>
  ) {}

  async findByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async createInitialAdmin() {
    const adminUser = await this.db.query.users.findFirst({
      where: {
        email: env.ADMIN_EMAIL,
        role: "admin",
      },
    });

    if (adminUser) {
      this.logger.warn(
        "An admin user already exists, skipping admin creation!"
      );
      return;
    }

    await this.authService.api
      .createUser({
        body: {
          email: env.ADMIN_EMAIL,
          name: "Admin",
          password: env.ADMIN_PASSWORD,
          role: "admin",
        },
      })
      .catch((error: Error) => {
        this.logger.warn(error.message);
        console.error(error);
      });
  }
}
