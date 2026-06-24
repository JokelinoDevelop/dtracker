import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export function NavUserSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" disabled>
          <Skeleton className="size-8 rounded-full" />

          <div className="grid flex-1 gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-36" />
          </div>

          <Skeleton className="size-4 rounded-sm" />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
