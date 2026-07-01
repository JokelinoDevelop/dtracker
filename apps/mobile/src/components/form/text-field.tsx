import type { Ref } from "react";
import type { TextInput, TextInputProps } from "react-native";
import { Text, View } from "react-native";

import { Input } from "../ui/input";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./form-context";

type TextFieldProps = {
  label?: string;
  leftIcon?: React.ReactNode;
  ref?: Ref<TextInput>;
} & TextInputProps;

export function TextField({
  label,
  className,
  leftIcon,
  ref,
  ...props
}: TextFieldProps) {
  const field = useFieldContext<string>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <View className="gap-y-2">
      {label ? (
        <Text className="text-sm font-medium text-foreground">{label}</Text>
      ) : null}

      <Input
        ref={ref}
        leftIcon={leftIcon}
        isInvalid={isInvalid}
        className={className}
        value={field.state.value}
        onChangeText={field.handleChange}
        onBlur={field.handleBlur}
        {...props}
      />

      <FieldErrors meta={field.state.meta} />
    </View>
  );
}
