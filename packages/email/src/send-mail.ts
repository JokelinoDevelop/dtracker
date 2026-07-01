import { transporter } from "./nodemailer";
import { renderOtpEmail, renderResetPasswordEmail } from "./render";

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

export type OtpPurpose = "forget-password" | "sign-in" | "email-verification";

const otpSubjects: Record<OtpPurpose, string> = {
  "email-verification": "Verify your email",
  "forget-password": "Your password reset code",
  "sign-in": "Your sign-in code",
};

export async function sendOtpMail(
  to: string,
  otp: string,
  purpose: OtpPurpose
) {
  const html = await renderOtpEmail(otp, purpose);

  return sendMail(to, otpSubjects[purpose], html);
}
