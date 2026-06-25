import { config } from "dotenv";
import { expand } from "dotenv-expand";
import { createTransport } from "nodemailer";

expand(config({ path: "../../api/.env" }));

const isProduction = process.env.NODE_ENV === "production";

// Mail Transporter
export const transporter = createTransport({
  host: process.env.SMTP_HOST,
  port: Number.parseInt(process.env.SMTP_PORT ?? "1025", 10),
  secure: false,
  ...(isProduction && {
    auth: {
      pass: process.env.MAIL_PASS,
      user: process.env.MAIL_USER,
    },
  }),
});
