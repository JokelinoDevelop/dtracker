import { Injectable, Logger, OnModuleInit } from "@nestjs/common";

import { transporter } from "./nodemailer";

@Injectable()
export class MailerService implements OnModuleInit {
  private readonly logger = new Logger(MailerService.name);

  async onModuleInit() {
    try {
      await transporter.verify();
      this.logger.log("Mailer is ready to take our messages");
    } catch (error) {
      this.logger.error("Verification failed, check mailer configuration!");
      console.error(error);
    }
  }
}
