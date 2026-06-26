import KeyvRedis from "@keyv/redis";
import { CacheInterceptor, CacheModule } from "@nestjs/cache-manager";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { APP_INTERCEPTOR } from "@nestjs/core";

@Module({
  imports: [
    CacheModule.registerAsync({
      inject: [ConfigService],
      isGlobal: true,
      useFactory: (configService: ConfigService) => ({
        stores: [
          new KeyvRedis({
            url: configService.getOrThrow<string>("REDIS_URL"),
          }),
        ],
        ttl: 1000 * 60 * 5, // 5 min default fallback in miliseconds
      }),
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
