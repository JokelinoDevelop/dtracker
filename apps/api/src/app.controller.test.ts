import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { AuthModule } from "@thallesp/nestjs-better-auth";
import { beforeEach, describe, expect, it } from "vitest";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { auth } from "./auth/auth.config";
import { CoreCacheManagerModule } from "./core/cache-manager/cache-manager.module";
import { CoreDatabaseModule } from "./core/database/database.module";
import { CoreLoggerModule } from "./core/logger/logger.module";
import { CoreThrottlerModule } from "./core/throttler/throttler.module";
import { UsersModule } from "./users/users.module";

describe(AppController, () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        CoreLoggerModule,
        CoreThrottlerModule,
        CoreDatabaseModule,
        CoreCacheManagerModule,
        AuthModule.forRoot({
          auth,
          disableTrustedOriginsCors: true, // Disable CORS in Better Auth since we're handling it globally
        }),
        UsersModule,
      ],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe("root", () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe("Hello World!");
    });
  });
});
