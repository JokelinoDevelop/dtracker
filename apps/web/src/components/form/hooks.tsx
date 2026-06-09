import { createFormHook, createFormHookContexts } from "@tanstack/react-form";

import { TextField } from "../form/text-field";
import { CheckboxField } from "./checkbox-field";
import { SubmitButton } from "./submit-button";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
  createFormHookContexts();

export const { useAppForm, withFieldGroup, withForm } = createFormHook({
  fieldComponents: {
    CheckboxField,
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
});
