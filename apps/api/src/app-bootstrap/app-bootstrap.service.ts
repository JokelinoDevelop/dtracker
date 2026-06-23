import { OnApplicationBootstrap, Logger, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AuthService } from "@thallesp/nestjs-better-auth";

import type { Auth } from "@/auth/auth.config";
import { InjectDb } from "@/core/database/database.provider";
import type { DatabaseService } from "@/core/database/database.provider";

@Injectable()
export class AppBootstrapService implements OnApplicationBootstrap {
  private readonly logger = new Logger(AppBootstrapService.name);
  constructor(
    private readonly authService: AuthService<Auth>,
    private readonly configService: ConfigService,
    @InjectDb() private readonly db: DatabaseService
  ) {}

  async onApplicationBootstrap() {
    const adminUser = await this.db.query.users.findFirst({
      where: {
        email: this.configService.getOrThrow<string>("ADMIN_EMAIL"),
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
          email: this.configService.getOrThrow<string>("ADMIN_EMAIL"),
          name: "Admin",
          password: this.configService.getOrThrow<string>("ADMIN_PASSWORD"),
          role: "admin",
        },
      })
      .catch((error: Error) => {
        this.logger.warn(error.message);
      });
  }
}
