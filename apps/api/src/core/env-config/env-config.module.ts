import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import z from "zod/v4";

import { envConfigSchema } from "./env-config.schema";

// By default loads in .env
@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      expandVariables: true,
      isGlobal: true,
      validate: (env) => {
        const result = envConfigSchema.safeParse(env);

        if (!result.success) {
          const errorMessage = z.flattenError(result.error).fieldErrors;

          console.error("Invalid ENV, check for missing ENV variables!!!");

          throw new Error(JSON.stringify(errorMessage, null, 2));
        }

        return result.data;
      },
    }),
  ],
})
export class CoreEnvConfigModule {}
