import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { THROTTLER_OPTIONS } from "./throttler.options";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        errorMessage: "Wow! Slow down. You have hit the rate limit",
        storage: new ThrottlerStorageRedisService(
          configService.getOrThrow<string>("REDIS_URL")
        ),
        throttlers: THROTTLER_OPTIONS,
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class CoreThrottlerModule {}
