import { formOptions, revalidateLogic } from "@tanstack/react-form";
import { z } from "zod";

const signInSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be at most 20 characters")
    .regex(/[a-z]/u, "Must include a lowercase letter")
    .regex(/[A-Z]/u, "Must include an uppercase letter")
    .regex(/[0-9]/u, "Must include a number")
    .regex(/[^a-zA-Z0-9]/u, "Must include a special character"),
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
