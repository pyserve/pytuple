import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      items: [
        {
          title: "Startup Guide",
          url: "#",
        },
        {
          title: "Video Tutorials",
          url: "#",
        },
      ],
    },
    {
      title: "Applications",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
        },
        {
          title: "Calls",
          url: "/calls",
        },
        {
          title: "Leads",
          url: "/leads",
        },
        {
          title: "Analytics",
          url: "/analytics",
        },
      ],
    },
    {
      title: "Accounts & Settings",
      url: "#",
      items: [
        {
          title: "Accounts & Billing",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Connected Apps",
          url: "#",
        },
      ],
    },
    {
      title: "AI & Model Training",
      url: "#",
      items: [
        {
          title: "Train Model",
          url: "#",
        },
        {
          title: "Model Status",
          url: "#",
        },
        {
          title: "Model Versions",
          url: "#",
        },
      ],
    },
    {
      title: "Upgrade",
      url: "#",
      items: [
        {
          title: "Upgrade to Pro",
          url: "#",
        },
        {
          title: "View Plans",
          url: "#",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Eco Home Group</h1>
          <p className="text-sm text-muted-foreground">An Advanced CRM</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>{item.title}</a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
