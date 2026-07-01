import { View, Text } from "react-native";

import { cn } from "@/lib/utils";

type SeparatorProps = {
  label?: string;
  className?: string;
};

export function Separator({
  label = "Or continue with",
  className,
}: SeparatorProps) {
  return (
    <View className={cn("flex-row items-center justify-center", className)}>
      <View className="w-[10px] h-px bg-primary" />

      <Text className="mx-3 text-sm text-muted-foreground">{label}</Text>

      <View className="w-[10px] h-px bg-primary" />
    </View>
  );
}
