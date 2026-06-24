import { createTransport } from "nodemailer";

const isProduction = process.env.NODE_ENV === "production";

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

export async function sendMail(to: string, subject: string, html: string) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    html,
    subject,
    to,
  });

  return info;
}
