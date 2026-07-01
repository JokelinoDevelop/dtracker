export { default as OtpEmail } from "./templates/otp-email";
export { default as ResetPasswordEmail } from "./templates/reset-password-email";
export { renderOtpEmail, renderResetPasswordEmail } from "./render";
export { transporter } from "./nodemailer";
export { sendMail, sendOtpMail, sendResetPasswordMail } from "./send-mail";
