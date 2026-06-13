import { createZodDto } from "nestjs-zod";
import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
  phone: z.string(),
});

export class RegisterDto extends createZodDto(registerSchema) {}
