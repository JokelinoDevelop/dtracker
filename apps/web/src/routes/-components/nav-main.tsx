import { Link } from "@tanstack/react-router";
import type { LinkProps } from "@tanstack/react-router";
import { ChevronRightIcon, LayoutDashboard, Users } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible.tsx";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar.tsx";

type NavItem = {
  title: string;
  icon: React.ReactNode;
  url: LinkProps["to"];
  isActive?: boolean;
  subItems?: {
    title: string;
    url: LinkProps["to"];
  }[];
};

const items: NavItem[] = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard />,
    url: "/dashboard",
  },
  {
    title: "Users",
    icon: <Users />,
    url: "/users",
    subItems: [
      {
        title: "Drivers",
        url: "/users",
      },
    ],
  },
];

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <Collapsible key={item.title} render={<SidebarMenuItem />}>
            <SidebarMenuButton
              tooltip={item.title}
              render={
                <Link
                  to={item.url}
                  activeProps={{
                    className:
                      "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
                  }}
                  inactiveProps={{
                    className: "text-sidebar-foreground",
                  }}
                />
              }
            >
              {item.icon}
              <span>{item.title}</span>
            </SidebarMenuButton>
            {item.subItems?.length ? (
              <>
                <CollapsibleTrigger
                  render={
                    <SidebarMenuAction className="aria-expanded:rotate-90" />
                  }
                >
                  <ChevronRightIcon />
                  <span className="sr-only">Toggle</span>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subItems?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton
                          render={<Link to={subItem.url} />}
                        >
                          <span>{subItem.title}</span>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </>
            ) : null}
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
