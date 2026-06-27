import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-pino";

import { env } from "@/env";

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: env.LOG_LEVEL,
        transport:
          env.NODE_ENV === "production"
            ? undefined
            : {
                options: {
                  singleLine: true,
                },
                target: "pino-pretty",
              },
      },
    }),
  ],
})
export class CoreLoggerModule {}
