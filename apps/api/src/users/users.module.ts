import { Module, OnApplicationBootstrap } from "@nestjs/common";

import { UsersService } from "./users.service";

@Module({
  providers: [UsersService],
})
export class UsersModule implements OnApplicationBootstrap {
  constructor(private readonly usersService: UsersService) {}

  onApplicationBootstrap() {
    this.usersService.createInitialAdmin();
  }
}
