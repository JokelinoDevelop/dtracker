import type { PressableProps } from "react-native";
import { ActivityIndicator, Pressable, Text, View } from "react-native";

import { cn } from "@/lib/utils";

type ButtonProps = PressableProps & {
  title: string;
  loading?: boolean;
  loadingTitle?: string;
  className?: string;
};

export function Button({
  title,
  loading = false,
  loadingTitle,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      className={cn(
        "w-full items-center justify-center rounded-xl bg-primary p-4 active:opacity-80",
        isDisabled && "opacity-50",
        className
      )}
      disabled={isDisabled}
      {...props}
    >
      <View className="flex-row items-center gap-x-2">
        {loading ? <ActivityIndicator color="#ffffff" size="small" /> : null}
        <Text className="text-base font-bold text-white">
          {loading ? (loadingTitle ?? title) : title}
        </Text>
      </View>
    </Pressable>
  );
}
