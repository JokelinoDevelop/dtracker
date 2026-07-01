import { useState } from "react";
import type { Ref } from "react";
import type { TextInputProps } from "react-native";
import { Pressable, Text, TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./form-context";

type PasswordFieldProps = {
  label: string;
  ref?: Ref<TextInput>;
} & TextInputProps;

export function PasswordField({
  label,
  className,
  ref,
  ...props
}: PasswordFieldProps) {
  const field = useFieldContext<string>();
  const [shouldShow, setShouldShow] = useState(false);
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <View className="gap-y-2">
      <Text className="text-sm font-medium text-foreground">{label}</Text>
      <View className="relative justify-center">
        <TextInput
          ref={ref}
          autoCapitalize="none"
          autoCorrect={false}
          aria-invalid={isInvalid}
          className={cn(
            "rounded-xl border border-border bg-card p-4 text-base text-foreground leading-[20px] placeholder:text-muted-foreground",
            isInvalid && "border-red-500",
            className
          )}
          secureTextEntry={!shouldShow}
          value={field.state.value}
          onChangeText={field.handleChange}
          onBlur={field.handleBlur}
          {...props}
        />
        <Pressable
          accessibilityLabel={shouldShow ? "Hide password" : "Show password"}
          className="absolute right-4 h-14 justify-center"
          onPress={() => setShouldShow((current) => !current)}
        >
          <Text className="text-sm font-medium text-primary">
            {shouldShow ? "Hide" : "Show"}
          </Text>
        </Pressable>
      </View>
      <FieldErrors meta={field.state.meta} />
    </View>
  );
}
