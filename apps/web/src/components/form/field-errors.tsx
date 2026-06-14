import type { AnyFieldMeta } from "@tanstack/react-form";
import { ZodError } from "zod";

import { FieldError } from "../ui/field";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  if (!meta.isTouched) return null;

  return meta.errors.map(({ message }: ZodError, index) => (
    <FieldError key={index} className="text-sm font-medium text-destructive">
      - {message}
    </FieldError>
  ));
};
