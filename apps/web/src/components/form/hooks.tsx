import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { TextField } from "../form/text-field";
import { CheckboxField } from "./checkbox-field";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    CheckboxField,
    TextField,
    PasswordField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
