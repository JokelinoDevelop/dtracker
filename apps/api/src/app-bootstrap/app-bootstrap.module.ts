import { Module } from "@nestjs/common";

import { AppBootstrapService } from "./app-bootstrap.service";

@Module({
  providers: [AppBootstrapService],
})
export class AppBootstrapModule {}
