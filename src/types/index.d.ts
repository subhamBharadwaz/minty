import type { Icon as LucideIcon } from "lucide-react";
import { Id } from "../../convex/_generated/dataModel";

export type IconType = typeof LucideIcon;

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
  income?: number;
};

export type Category = {
  _id?: string;
  icon: string;
  name: string;
  totalAmount: number;
  totalTransactions: number;
};

export type Goal = {
  _id?: string;
  name: string;
  amount: number;
  targetDate: Date;
  category?: { name: string; icon: string };
  progress: number;
  savedAmount: number;
  remainingDays: number;
  isCompleted: boolean;
  categoryId: Id<"categories">;
};
