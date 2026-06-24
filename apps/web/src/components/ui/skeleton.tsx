import type React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "relative overflow-hidden rounded-md bg-skeleton border border-border",
        className
      )}
      {...props}
    >
      <div
        className="
          absolute inset-0
          animate-[shimmer_2s_infinite]
          bg-linear-to-r
          from-transparent
          via-white/10
          to-transparent
        "
      />
    </div>
  );
}

export { Skeleton };
