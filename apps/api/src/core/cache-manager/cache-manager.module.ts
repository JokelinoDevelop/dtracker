import KeyvRedis from "@keyv/redis";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import {
  Logger,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";

import { redisClient } from "./redis-client";

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      stores: [new KeyvRedis(redisClient)],
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
export class CoreCacheManagerModule
  implements OnApplicationBootstrap, OnApplicationShutdown
{
  private readonly logger = new Logger(CoreCacheManagerModule.name);

  async onApplicationBootstrap() {
    if (!redisClient.isOpen) {
      try {
        await redisClient.connect();
        this.logger.log("Redis connected successfully");
      } catch (error) {
        this.logger.error("Error connecting to Redis", error);
        throw error;
      }
    }
  }

  async onApplicationShutdown() {
    if (redisClient.isOpen) {
      await redisClient.close(); // or quit(), see below
      this.logger.log("Redis disconnected");
    }
  }
}
