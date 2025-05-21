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
          url: "#",
        },
        {
          title: "Calls",
          url: "#",
        },
        {
          title: "Leads",
          url: "#",
        },
        {
          title: "Analytics",
          url: "#",
          isActive: true,
        },
        {
          title: "Webhooks",
          url: "#",
          isActive: true,
        },
      ],
    },
    {
      title: "Accounts & Settings",
      url: "#",
      items: [
        {
          title: "Accounts",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Notifications",
          url: "#",
        },
        {
          title: "Theme",
          url: "#",
        },
        {
          title: "Connected Apps",
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
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Pytuple AI</h1>
          <p className="text-sm text-muted-foreground">
            AI Voice Calling System
          </p>
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
                    <SidebarMenuButton asChild isActive={item.isActive}>
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
