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
import { LeafIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { UserAccountNav } from "./user-account-nav";

interface DashboardSidebarProps {
  email: string;
  name: string;
  image: string;
}

export const DashboardSidebar: FC<DashboardSidebarProps> = ({
  email,
  name,
  image,
}) => {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="flex items-center gap-2">
                <LeafIcon className="size-8 fill-primary stroke-foreground" />
                <span className="text-xl sm:text-2xl font-bold">Minty</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarGroup className="space-y-4">
          {dashboardConfig.sidevarNav.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link
                  href={item.href as string}
                  className="flex items-center gap-3 py-2"
                >
                  {/* @ts-ignore */}
                  {item.icon && <item.icon className="size-6 flex-shrink-0" />}
                  <span className="text-base font-medium">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-3 py-2">
              <UserAccountNav
                user={{
                  name,
                  image,
                  email,
                }}
              />
              <span className="text-sm font-medium truncate">{email}</span>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
