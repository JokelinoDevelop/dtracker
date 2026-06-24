import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

import { passwordSchema } from "../shared/password-schema";

const signInSchema = z.object({
  email: z.email(),
  password: passwordSchema,
  rememberMe: z.boolean(),
});

const defaultValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const signInFormOptions = formOptions({
  defaultValues,
  validationLogic: revalidateLogic({
    mode: "submit",
    modeAfterSubmission: "change",
  }),
  validators: {
    onDynamic: signInSchema,
  },
});
