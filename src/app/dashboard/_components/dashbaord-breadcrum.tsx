"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import { usePathname } from "next/navigation";

const DashboardBreadcrum = () => {
  const pathname = usePathname();

  const pathAfterDashboard = pathname?.split("/dashboard/")[1] || "";

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          {pathname === "/dashboard" ? (
            <BreadcrumbPage className="capitalize">Overview</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href="/dashboard">Overview</BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {pathname === "/dashboard" ? null : (
          <BreadcrumbSeparator className="hidden md:block" />
        )}
        <BreadcrumbItem>
          <BreadcrumbPage className="capitalize">
            {pathAfterDashboard}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default DashboardBreadcrum;
