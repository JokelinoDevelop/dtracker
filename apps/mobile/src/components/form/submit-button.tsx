import type { PressableProps } from "react-native";

import { Button } from "@/components/ui/button";

import { useFormContext } from "./form-context";

type SubmitButtonProps = {
  title: string;
  loadingTitle?: string;
} & Omit<PressableProps, "children">;

export function SubmitButton({
  title,
  loadingTitle,
  ...props
}: SubmitButtonProps) {
  const form = useFormContext();

  return (
    <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
      {([canSubmit, isSubmitting]) => (
        <Button
          {...props}
          title={title}
          loading={isSubmitting}
          loadingTitle={loadingTitle}
          disabled={!canSubmit || isSubmitting || props.disabled}
          onPress={() => form.handleSubmit()}
        />
      )}
    </form.Subscribe>
  );
}
