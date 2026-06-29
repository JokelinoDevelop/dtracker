import type { PressableProps } from "react-native";
import { Pressable, Text } from "react-native";

import { cn } from "@/lib/utils";

type ButtonProps = PressableProps & {
  title: string;
  className?: string;
};

export function Button({ title, className, ...props }: ButtonProps) {
  return (
    <Pressable
      className={cn(
        "w-full h-14 bg-primary rounded-xl items-center justify-center active:opacity-80",
        className
      )}
      {...props}
    >
      <Text className="text-white text-base font-semibold">{title}</Text>
    </Pressable>
  );
}
