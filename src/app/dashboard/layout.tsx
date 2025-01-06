import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";
import { DashboardSidebar } from "./_components/dashboard-sidebar";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import DashboardBreadcrum from "./_components/dashbaord-breadcrum";
import Footer from "@/components/footer";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

  if (!user) return redirect("/sign-in");

  return (
    <SidebarProvider>
      <DashboardSidebar
        name={user && (user?.fullName as string)}
        image={user && user?.imageUrl}
        email={user && user?.emailAddresses[0].emailAddress}
      />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <DashboardBreadcrum />
        </header>
        <main className="">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
