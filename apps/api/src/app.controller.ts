import { CacheInterceptor } from "@nestjs/cache-manager";
import { Controller, Get, UseInterceptors } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

import { AppService } from "./app.service";

@Controller()
@UseInterceptors(CacheInterceptor)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @AllowAnonymous()
  @Get()
  getHello() {
    return this.appService.getHello();
  }
}
