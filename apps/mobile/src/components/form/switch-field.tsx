import type { ReactNode } from "react";
import { Switch, Text, View } from "react-native";

import { themeColors } from "@/lib/theme-colors";

import { FieldErrors } from "./field-errors";
import { useFieldContext } from "./form-context";

type SwitchFieldProps = {
  label: string;
  trailing?: ReactNode;
};

export function SwitchField({ label, trailing }: SwitchFieldProps) {
  const field = useFieldContext<boolean>();
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

  return (
    <View className="gap-y-2">
      <View className="flex-row items-center justify-between gap-x-3">
        <View className="flex-row items-center gap-x-3">
          <Switch
            aria-invalid={isInvalid}
            trackColor={{
              false: themeColors.border,
              true: themeColors.primary,
            }}
            value={field.state.value}
            onValueChange={field.handleChange}
            onBlur={field.handleBlur}
          />
          <Text className="text-sm text-foreground">{label}</Text>
        </View>
        {trailing}
      </View>
      <FieldErrors meta={field.state.meta} />
    </View>
  );
}
