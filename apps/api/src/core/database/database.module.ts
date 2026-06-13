import { Global, Module } from "@nestjs/common";

import { DatabaseProvider } from "./database.provider";

@Global()
@Module({
  exports: [DatabaseProvider],
  providers: [DatabaseProvider],
})
export class CoreDatabaseModule {}
