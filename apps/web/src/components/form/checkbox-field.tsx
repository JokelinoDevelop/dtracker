import { type ComponentProps } from "react";

import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./hooks";

type CheckboxFieldProps = {
  description?: string;
  label?: string;
} & ComponentProps<typeof Checkbox>;

export function CheckboxField({
  description,
  label,
  ...props
}: CheckboxFieldProps) {
  const field = useFieldContext<boolean>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field orientation="horizontal" aria-invalid={isInvalid}>
      <Checkbox
        {...props}
        id={field.name}
        checked={field.state.value}
        onCheckedChange={(checked) => field.handleChange(Boolean(checked))}
        onBlur={field.handleBlur}
        aria-invalid={isInvalid}
      />

      <FieldContent>
        {label && <FieldLabel htmlFor={field.name}>{label}</FieldLabel>}

        {description && <FieldDescription>{description}</FieldDescription>}

        <FieldErrors meta={field.state.meta} />
      </FieldContent>
    </Field>
  );
}
