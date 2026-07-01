import { pretty, render } from "react-email";

import type { OtpPurpose } from "./send-mail";
import OtpEmail from "./templates/otp-email";
import ResetPasswordEmail from "./templates/reset-password-email";

export async function renderResetPasswordEmail(resetUrl: string) {
  return await pretty(await render(<ResetPasswordEmail resetUrl={resetUrl} />));
}

export async function renderOtpEmail(otp: string, purpose: OtpPurpose) {
  return await pretty(await render(<OtpEmail otp={otp} purpose={purpose} />));
}
