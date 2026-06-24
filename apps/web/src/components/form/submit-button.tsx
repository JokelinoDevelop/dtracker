import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

import { AppButton } from "../app/app-button";
import { useFormContext } from "./hooks";

export type SubmitButtonProps = {
  children: ReactNode;
} & ComponentProps<typeof Button>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <AppButton
          {...props}
          type="submit"
          disabled={!canSubmit || props.disabled}
          isLoading={isSubmitting}
        >
          {children}
        </AppButton>
      )}
    </form.Subscribe>
  );
};
