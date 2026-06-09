import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { type ComponentProps } from "react";

import { Checkbox } from "../ui/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "../ui/field";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./hooks";

type CheckboxFieldProps = {
  description?: string;
  label?: string;
} & ComponentProps<typeof CheckboxPrimitive.Root>;

export function CheckboxField({
  description,
  label,
  ...props
}: CheckboxFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field orientation="horizontal" aria-invalid={isInvalid}>
      <Checkbox
        {...props}
        aria-invalid={isInvalid}
        id={field.name}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        {...props}
      />
      <FieldContent>
        {label ? (
          <FieldLabel htmlFor="finder-pref-9k2-sync-folders-nep">
            {label}
          </FieldLabel>
        ) : null}
        {description ? (
          <FieldDescription>{description}</FieldDescription>
        ) : null}
        <FieldErrors meta={field.state.meta} />
      </FieldContent>
    </Field>
  );
}
