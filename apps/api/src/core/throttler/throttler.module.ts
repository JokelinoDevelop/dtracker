import { ThrottlerStorageRedisService } from "@nest-lab/throttler-storage-redis";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

import { env } from "@/env";

import { THROTTLER_OPTIONS } from "./throttler.options";

@Module({
  imports: [
    ThrottlerModule.forRoot({
      errorMessage: "Wow! Slow down. You have hit the rate limit",
      storage: new ThrottlerStorageRedisService(env.REDIS_URL),
      throttlers: THROTTLER_OPTIONS,
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
