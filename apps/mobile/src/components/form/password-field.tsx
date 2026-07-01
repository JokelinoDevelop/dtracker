import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import type { Ref } from "react";
import type { TextInputProps, TextInput } from "react-native";
import { Pressable, Text, View } from "react-native";

import { themeColors } from "@/lib/theme-colors";

import { Input } from "../ui/input";
import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./form-context";

type PasswordFieldProps = {
  label?: string;
  ref?: Ref<TextInput>;
  leftIcon?: React.ReactNode;
} & TextInputProps;

export function PasswordField({
  label,
  className,
  ref,
  leftIcon,
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();
  const [shouldShow, setShouldShow] = useState(false);
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
        rightIcon={
          <Pressable
            accessibilityLabel={shouldShow ? "Hide password" : "Show password"}
            hitSlop={10}
            onPress={() => setShouldShow((current) => !current)}
          >
            <Ionicons
              name={shouldShow ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={themeColors.primary}
            />
          </Pressable>
        }
        {...props}
        secureTextEntry={!shouldShow}
      />
      <FieldErrors meta={field.state.meta} />
    </View>
  );
}
