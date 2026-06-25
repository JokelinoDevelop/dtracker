import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type GlobalRouteStatusLayoutProps = {
  icon: ReactNode;
  iconContainerClassName?: string;
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
};

export function GlobalRouteStatusLayout({
  icon,
  iconContainerClassName,
  title,
  description,
  children,
  className,
}: GlobalRouteStatusLayoutProps) {
  return (
    <div
      className={cn(
        "flex min-h-svh flex-col items-center justify-center px-6",
        className
      )}
    >
      <div className="w-full max-w-md space-y-6 text-center">
        <div
          className={cn(
            "mx-auto flex size-16 items-center justify-center rounded-full",
            iconContainerClassName
          )}
        >
          {icon}
        </div>

        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="mt-2 text-muted-foreground">{description}</p>
        </div>

        {children}
      </div>
    </div>
  );
}
