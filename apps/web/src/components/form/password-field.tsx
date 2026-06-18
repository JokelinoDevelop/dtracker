import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./hooks";

type PasswordFieldProps = {
  description?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export function PasswordField({
  description,
  iconRight,
  iconLeft,
  label,
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();

  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  const [shouldShow, setShouldShow] = useState(false);

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
          type={shouldShow ? "text" : "password"}
          {...props}
        />
        {iconLeft ? (
          <InputGroupAddon align="inline-start">{iconLeft}</InputGroupAddon>
        ) : null}
        <InputGroupAddon align="inline-end">
          <Button
            type="button"
            variant="ghost"
            onClick={toggleVisibility}
            aria-label={shouldShow ? "Hide password" : "Show password"}
            className="inline-flex items-center justify-center"
          >
            {shouldShow ? <EyeOff /> : <Eye />}
          </Button>
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>{description}</FieldDescription>
      <FieldErrors meta={field.state.meta} />
    </Field>
  );

  function toggleVisibility() {
    setShouldShow((prev) => !prev);
  }
}
