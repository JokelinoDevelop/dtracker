import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

import { passwordSchema } from "../shared/password-schema";

const resetPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match!",
    path: ["confirmPassword"],
  });

const defaultValues = {
  confirmPassword: "",
  password: "",
};

export const resetPasswordFormOptions = formOptions({
  defaultValues,
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: {
    onDynamic: resetPasswordSchema,
  },
});
