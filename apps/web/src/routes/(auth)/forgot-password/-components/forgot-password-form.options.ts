import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

const forgotPasswordSchema = z.object({
  email: z.email(),
});

const defaultValues = {
  email: "",
};

export const forgotPasswordFormOptions = formOptions({
  defaultValues,
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: {
    onDynamic: forgotPasswordSchema,
  },
});

export type ForgotPasswordFormValue =
  typeof forgotPasswordFormOptions.defaultValues;
