import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { THROTTLER_OPTIONS } from "./throttler.helper";

@Module({
  imports: [
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        errorMessage: "Wow! Slow down. You have hit the rate limit",
        generateKey: (trackerString, throttlerName) =>
          `${trackerString}:${throttlerName}`,
        getTracker: (req) => (req.ips?.length ? req.ips[0] : req.ip), // handles X-Forwarded-For (proxies, Docker, nginx)
        storage: new ThrottlerStorageRedisService({
          host: config.getOrThrow("REDIS_HOST"),
          password: config.get("REDIS_PASSWORD"),
          port: config.getOrThrow("REDIS_PORT"),
        }),
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
