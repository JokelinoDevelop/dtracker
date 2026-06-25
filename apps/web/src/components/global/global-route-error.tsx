import {
  Link,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { RotateCcw, TriangleAlert } from "lucide-react";

import { GlobalRouteStatusLayout } from "@/components/global/global-route-status-layout";
import { Button } from "@/components/ui/button.tsx";

export function GlobalRouteError({ error }: ErrorComponentProps) {
  const router = useRouter();
  const message =
    error instanceof Error ? error.message : "An unexpected error occurred.";

  return (
    <GlobalRouteStatusLayout
      icon={<TriangleAlert className="size-8 text-destructive" />}
      iconContainerClassName="bg-destructive/10"
      title="Something went wrong"
      description="We couldn't load this page. Please try again."
    >
      {import.meta.env.DEV && (
        <p className="rounded-xl border bg-muted/50 px-4 py-3 text-left font-mono text-xs text-muted-foreground">
          {message}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          className="sm:min-w-36"
          onClick={() => {
            void router.invalidate();
          }}
          size="lg"
        >
          <RotateCcw />
          Try again
        </Button>

        <Button
          className="sm:min-w-36"
          render={<Link to="/" />}
          size="lg"
          variant="outline"
        >
          Go home
        </Button>
      </div>
    </GlobalRouteStatusLayout>
  );
}
