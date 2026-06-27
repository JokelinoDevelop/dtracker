import KeyvRedis from "@keyv/redis";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { env } from "@/env";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      stores: [new KeyvRedis(env.REDIS_URL)],
      ttl: 1000 * 60 * 5, // 5 min default fallback in miliseconds
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
})
export class CoreCacheManagerModule {}
