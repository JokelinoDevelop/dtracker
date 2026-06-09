import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

import { useFormContext } from "./hooks";

export type SubmitButtonProps = {
  children: ReactNode;
} & ComponentProps<typeof Button>;

export const SubmitButton = ({ children, ...props }: SubmitButtonProps) => {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          {...props}
          type="submit"
          size="lg"
          disabled={!canSubmit || props.disabled}
        >
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {children}
        </Button>
      )}
    </form.Subscribe>
  );
};
