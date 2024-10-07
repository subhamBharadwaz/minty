import Nav from "@/components/nav";
import { dashboardConfig } from "@/config/dashboard";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav items={dashboardConfig} />
      <main className="py-10 container">{children}</main>
    </>
  );
}
