import React from "react";

import { Field, FieldDescription, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./hooks";

type TextFieldProps = {
  description?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function TextField({
  description,
  iconRight,
  iconLeft,
  label,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <Field aria-invalid={isInvalid}>
      {label ? <FieldLabel htmlFor={field.name}>{label}</FieldLabel> : null}
      <InputGroup>
        <InputGroupInput
          aria-invalid={isInvalid}
          id={field.name}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
          {...props}
        />
        {iconLeft ? (
          <InputGroupAddon align="inline-start">{iconLeft}</InputGroupAddon>
        ) : null}
        {iconRight ? (
          <InputGroupAddon align="inline-end">{iconRight}</InputGroupAddon>
        ) : null}
      </InputGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldErrors meta={field.state.meta} />
    </Field>
  );
}
