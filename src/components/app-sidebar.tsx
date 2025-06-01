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
import {
  ArrowUpCircle,
  BarChart2,
  BookOpen,
  Brain,
  CreditCard,
  HelpCircleIcon,
  LayoutDashboard,
  Link,
  PhoneCall,
  SearchIcon,
  SettingsIcon,
  Upload,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Getting Started",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Startup Guide",
          url: "#",
          icon: BookOpen,
        },
        {
          title: "Video Tutorials",
          url: "#",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Applications",
      url: "#",
      icon: LayoutDashboard,
      items: [
        {
          title: "Dashboard",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Calls",
          url: "/calls",
          icon: PhoneCall,
        },
        {
          title: "Leads",
          url: "/leads",
          icon: Users,
        },
        {
          title: "Analytics",
          url: "/analytics",
          icon: BarChart2,
        },
      ],
    },
    {
      title: "Accounts & Settings",
      url: "#",
      icon: CreditCard,
      items: [
        {
          title: "Accounts & Billing",
          url: "/accounts",
          icon: CreditCard,
        },
        {
          title: "Connections",
          url: "/connections",
          icon: Link,
        },
      ],
    },
    {
      title: "AI & Model Training",
      url: "#",
      icon: Brain,
      items: [
        {
          title: "Documents",
          url: "/upload",
          icon: Upload,
        },
        {
          title: "Chat with AI",
          url: "/chat",
          icon: Brain,
        },
      ],
    },
    {
      title: "Upgrade",
      url: "#",
      icon: ArrowUpCircle,
      items: [
        {
          title: "Upgrade Plan",
          url: "/plans",
          icon: ArrowUpCircle,
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "#",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex flex-col space-y-1">
          <h1 className="text-xl font-bold">Pytuple AI</h1>
          <p className="text-sm text-muted-foreground">
            Voice Calling AI System
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
                    <SidebarMenuButton asChild isActive={pathname === item.url}>
                      <a href={item.url}>
                        <item.icon className="icon-class" />
                        <span>{item.title}</span>
                      </a>
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
