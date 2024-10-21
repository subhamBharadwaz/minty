"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { dashboardConfig } from "@/config/dashboard";
import { UserButton } from "@clerk/nextjs";
import { LeafIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface DashboardSidebarProps {
  email: string;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({ email }) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <LeafIcon className="size-6 fill-primary stroke-foreground" />
                <span className="text-lg sm:text-xl font-bold">Minty</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-3">
          {dashboardConfig.sidevarNav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.href as string}>
                  {/* @ts-ignore */}
                  {item.icon && <item.icon className="size-6" />}
                  <span className="text-lg">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-x-2">
            <UserButton />
            <span className="truncate">{email}</span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
