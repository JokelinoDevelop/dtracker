import { Module } from "@nestjs/common";
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from "@nestjs/core";
import { ZodValidationPipe, ZodSerializerInterceptor } from "nestjs-zod";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";
import { CoreDatabaseModule } from "./core/database/database.module";
import { CoreEnvConfigModule } from "./core/env-config/env-config.module";
import { CoreLoggerModule } from "./core/logger/logger.module";
import { CoreThrottlerModule } from "./core/throttler/throttler.module";
import { UsersModule } from "./users/users.module";

@Module({
  controllers: [AppController],
  imports: [
    CoreEnvConfigModule,
    CoreLoggerModule,
    CoreThrottlerModule,
    CoreDatabaseModule,
    AuthModule,
    UsersModule,
  ],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
