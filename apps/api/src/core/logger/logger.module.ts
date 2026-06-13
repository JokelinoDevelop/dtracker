import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { LoggerModule } from "nestjs-pino";

import { CoreEnvConfigModule } from "../env-config/env-config.module";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [CoreEnvConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction =
          configService.getOrThrow("NODE_ENV") === "production";

        const logLevel = configService.getOrThrow("LOG_LEVEL");

        return {
          pinoHttp: {
            level: logLevel,
            transport: isProduction
              ? undefined
              : {
                  options: {
                    singleLine: true,
                  },
                  target: "pino-pretty",
                },
          },
        };
      },
    }),
  ],
})
export class CoreLoggerModule {}
