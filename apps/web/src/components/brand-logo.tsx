import { GalleryVerticalEnd } from "lucide-react";

import { cn } from "@/lib/utils.ts";

type BrandLogoProps = {
  className?: string;
  align?: "left" | "right";
};

export function BrandLogo({ className, align = "left" }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "absolute flex gap-x-2 items-center top-6",
        align === "left" && "left-10",
        align === "right" && "right-10",
        className
      )}
    >
      <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
        <GalleryVerticalEnd className="size-4" />
      </div>
      <span className="text-lg font-semibold tracking-tight">dtracker</span>
    </div>
  );
}
