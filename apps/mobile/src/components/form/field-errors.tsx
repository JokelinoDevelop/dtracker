import type { AnyFieldMeta } from "@tanstack/react-form";
import { Text, View } from "react-native";

type FieldErrorsProps = {
  meta: AnyFieldMeta;
};

type FieldErrorIssue = {
  message?: string;
};

export const FieldErrors = ({ meta }: FieldErrorsProps) => {
  if (!meta.isTouched || meta.errors.length === 0) {
    return null;
  }

  return (
    <View className="gap-y-1">
      {meta.errors.map((error, index) => (
        <Text key={index} selectable className="text-sm text-red-500">
          {(error as FieldErrorIssue).message ?? String(error)}
        </Text>
      ))}
    </View>
  );
};
