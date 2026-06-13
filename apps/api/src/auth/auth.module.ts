import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

import { CoreEnvConfigModule } from "../core/env-config/env-config.module";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  controllers: [AuthController],
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      imports: [CoreEnvConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.getOrThrow("JWT_SECRET"),
        signOptions: { expiresIn: configService.getOrThrow("JWT_EXPIRES_IN") },
      }),
    }),
  ],
  providers: [AuthService],
})
export class AuthModule {}
