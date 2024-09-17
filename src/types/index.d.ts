import type { Icon as LucideIcon } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";

export type Icon = typeof LucideIcon;

export type NavItem = {
  title: string;
  href: string;
};

export type SidebarNavItem = {
  title: string;
  external?: boolean;
  icon?: keyof typeof Icon;
} & (
  | {
      href: string;
      items?: never;
    }
  | {
      href?: string;
      items: NavLink[];
    }
);

export type DashboardConfig = {
  nav?: NavItem[];
  sidevarNav: SidebarNavItem[];
};

export type Transaction = {
  _id?: Id<"transactions">;
  title: string;
  type: "expense" | "income";
  amount: number;
  categoryId: Id<"categories">;
  category?: {
    name: string;
    icon: string;
  };
  date: string;
  emoji: string;
  note?: string;
  _creationTime?: number;
};

export type Budget = {
  categoryId: Id<"categories">;
  _id?: Id<"budgets">;
  amount: number;
  category?: { name: string; icon: string };
  remaining?: number;
  spend?: number;
};
