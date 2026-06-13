import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare } from "bcryptjs";

import type { DB } from "../core/database/database.provider";
import { InjectDb } from "../core/database/database.provider";
import { users } from "../core/database/schemas";
import { UsersService } from "../users/users.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectDb() private readonly db: DB,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService
  ) {}

  async register(dto: RegisterDto) {
    const { email, firstName, lastName, phone, password } = dto;

    const existingUser = await this.usersService.findByEmail(dto.email);

    if (existingUser) {
      throw new ConflictException("An account with this email already exists!");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const [user] = await this.db
      .insert(users)
      .values({ email, firstName, lastName, passwordHash, phone })
      .returning();

    return user;
  }

  async login(dto: LoginDto) {
    const { email, password } = dto;

    const user = await this.usersService.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid email or password!");
    }

    const passwordsMatch = compare(password, user.passwordHash);

    if (!passwordsMatch) {
      throw new UnauthorizedException("Invalid email or password!");
    }

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        "Please verify your email before logging in!"
      );
    }

    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      accessToken,
    };
  }
}
