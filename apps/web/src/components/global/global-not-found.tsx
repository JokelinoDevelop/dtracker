import { Link, type NotFoundRouteProps } from "@tanstack/react-router";
import { ArrowLeft, FileQuestion } from "lucide-react";

import { GlobalRouteStatusLayout } from "@/components/global/global-route-status-layout";
import { Button } from "@/components/ui/button.tsx";

export function GlobalRouteNotFound(_props: NotFoundRouteProps) {
  return (
    <GlobalRouteStatusLayout
      icon={<FileQuestion className="size-8 text-primary" />}
      iconContainerClassName="bg-primary/10"
      title="Page not found"
      description="The page you're looking for doesn't exist or may have been moved."
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          className="sm:min-w-36"
          onClick={() => {
            window.history.back();
          }}
          size="lg"
          variant="outline"
        >
          <ArrowLeft />
          Go back
        </Button>

        <Button className="sm:min-w-36" render={<Link to="/" />} size="lg">
          Go home
        </Button>
      </div>
    </GlobalRouteStatusLayout>
  );
}
