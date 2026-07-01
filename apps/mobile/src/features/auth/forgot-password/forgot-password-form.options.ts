import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

import { passwordSchema } from "../shared/password-schema";

const requestOtpSchema = z.object({
  email: z.email(),
});

const requestOtpDefaultValues = {
  email: "",
};

export const requestOtpFormOptions = formOptions({
  defaultValues: requestOtpDefaultValues,
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: {
    onDynamic: requestOtpSchema,
  },
});

export type RequestOtpFormValues = typeof requestOtpDefaultValues;

const resetPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    otp: z
      .string()
      .length(6, "Code must be 6 digits")
      .regex(/^\d+$/u, "Code must contain only numbers"),
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

const resetPasswordDefaultValues = {
  confirmPassword: "",
  otp: "",
  password: "",
};

export const resetPasswordFormOptions = formOptions({
  defaultValues: resetPasswordDefaultValues,
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: {
    onDynamic: resetPasswordSchema,
  },
});

export type ResetPasswordFormValues = typeof resetPasswordDefaultValues;
