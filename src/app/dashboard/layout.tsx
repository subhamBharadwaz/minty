import Nav from "@/components/nav";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { dashboardConfig } from "@/config/dashboard";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  console.log({ email: user?.emailAddresses[0].emailAddress });
  return (
    <SidebarProvider>
      <DashboardSidebar email={user && user?.emailAddresses[0].emailAddress} />
      <main className="py-10 container">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
