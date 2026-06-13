import { Test } from "@nestjs/testing";
import type { TestingModule } from "@nestjs/testing";
import { beforeEach, describe, expect, it } from "vitest";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { CoreDatabaseModule } from "./core/database/database.module";
import { CoreEnvConfigModule } from "./core/env-config/env-config.module";
import { CoreLoggerModule } from "./core/logger/logger.module";
import { CoreThrottlerModule } from "./core/throttler/throttler.module";

describe(AppController, () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      imports: [
        CoreEnvConfigModule,
        CoreLoggerModule,
        CoreThrottlerModule,
        CoreDatabaseModule,
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
