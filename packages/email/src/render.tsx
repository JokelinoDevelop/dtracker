import { pretty, render } from "react-email";

import ResetPasswordEmail from "./templates/reset-password-email";

export async function renderResetPasswordEmail(resetUrl: string) {
  return await pretty(await render(<ResetPasswordEmail resetUrl={resetUrl} />));
}
