import { DashboardConfig, NavItem } from "@/types";
import {
  BadgeDollarSign,
  Goal,
  LayoutDashboard,
  Settings,
  Tag,
  Wallet,
} from "lucide-react";

export const dashboardConfig: DashboardConfig = {
  sidevarNav: [
    {
      title: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Transactions",
      href: "/dashboard/transactions",
      icon: BadgeDollarSign,
    },
    {
      title: "Goals",
      href: "/dashboard/goals",
      icon: Goal,
    },
    {
      title: "Categories",
      href: "/dashboard/categories",
      icon: Tag,
    },
    {
      title: "Budgets",
      href: "/dashboard/budgets",
      icon: Wallet,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
