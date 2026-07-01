import type { Ref } from "react";
import type { TextInputProps } from "react-native";
import { TextInput, View } from "react-native";

import { cn } from "@/lib/utils";

type InputProps = {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isInvalid?: boolean;
  ref?: Ref<TextInput>;
  className?: string;
} & TextInputProps;

export function Input({
  leftIcon,
  rightIcon,
  isInvalid,
  className,
  ref,
  ...props
}: InputProps) {
  return (
    <View className="relative flex-row items-stretch ">
      {leftIcon && (
        <View
          className={cn(
            "p-4 items-center justify-center rounded-l-xl bg-blue-500 transition-colors duration-400",
            isInvalid && "bg-red-500"
          )}
        >
          {leftIcon}
        </View>
      )}

      <TextInput
        className={cn(
          "flex-1 border border-border bg-card p-4 text-base text-foreground leading-[20px] placeholder:text-muted-foreground",
          leftIcon ? "rounded-r-xl border-l-0" : "rounded-xl",
          rightIcon && "pr-12",
          isInvalid && "border-red-500",
          className
        )}
        autoCapitalize="none"
        ref={ref}
        {...props}
      />
      {rightIcon && (
        <View className="absolute right-4 top-0 bottom-0 justify-center">
          {rightIcon}
        </View>
      )}
    </View>
  );
}
