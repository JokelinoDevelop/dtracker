import type { Ref } from "react";
import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./form-context";

type TextFieldProps = {
  label: string;
  ref?: Ref<TextInput>;
} & TextInputProps;

export function TextField({ label, className, ref, ...props }: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <View className="gap-y-2">
      <Text className="text-sm font-medium text-foreground">{label}</Text>

      <TextInput
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card p-4 text-base text-foreground leading-[20px] placeholder:text-muted-foreground",
          isInvalid && "border-red-500",
          className
        )}
        autoCapitalize="none"
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        {...props}
      />

      <FieldErrors meta={field.state.meta} />
    </View>
  );
}
