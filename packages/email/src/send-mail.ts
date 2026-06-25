import { transporter } from "./nodemailer";
import { renderResetPasswordEmail } from "./render";

export async function sendMail(to: string, subject: string, html: string) {
  const info = await transporter.sendMail({
    from: process.env.MAIL_FROM,
    html,
    subject,
    to,
  });

  return info;
}

export async function sendResetPasswordMail(to: string, resetUrl: string) {
  const html = await renderResetPasswordEmail(resetUrl);

  return sendMail(to, "Reset your password", html);
}
