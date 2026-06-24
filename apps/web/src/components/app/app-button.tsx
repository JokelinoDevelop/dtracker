import { Loader2 } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";

export type AppButtonProps = {
  children: ReactNode;
  isLoading?: boolean;
} & ComponentProps<typeof Button>;

export function AppButton({ isLoading, children, ...props }: AppButtonProps) {
  return (
    <Button {...props} disabled={isLoading || props.disabled}>
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  );
}
