import { createFormHook } from "@tanstack/react-form";

import { fieldContext, formContext } from "./form-context";
import { PasswordField } from "./password-field";
import { SubmitButton } from "./submit-button";
import { SwitchField } from "./switch-field";
import { TextField } from "./text-field";

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    PasswordField,
    SwitchField,
    TextField,
  },
  fieldContext,
  formComponents: {
    SubmitButton,
  },
  formContext,
});
