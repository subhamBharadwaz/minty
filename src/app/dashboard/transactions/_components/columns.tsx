"use client";

import { Transaction } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { DeleteTransaction } from "./delete-transaction";
import { cn } from "@/lib/utils";
import { EditTransactionDrawer } from "./edit-transaction-drawer";
import { Id } from "../../../../../convex/_generated/dataModel";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title: string = row.getValue("title");
      return <div className="font-medium capitalize truncate">{title}</div>;
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const transactionType: "expense" | "income" = row.getValue("type");

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return (
        <div className="font-medium space-x-2">
          {transactionType === "expense" ? "-" : "+"} {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const transactionType: "expense" | "income" = row.getValue("type");
      return (
        <span
          className={cn(
            "inline-block font-medium text-sm capitalize w-fit px-2 py-1 rounded-md",
            transactionType === "expense"
              ? "text-destructive bg-destructive/10"
              : "text-green-600 bg-green-600/10",
          )}
        >
          {transactionType}
        </span>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category: { icon: string; name: string } = row.getValue("category");
      return (
        <div className="font-medium capitalize flex items-center gap-x-2.5">
          <span>{category.icon}</span>
          <span className="truncate">{category.name}</span>{" "}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="pl-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date: string = row.getValue("date");
      const formattedDate = format(date, "dd MMM, yyyy");
      return (
        <div className="font-medium capitalize truncate">{formattedDate}</div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <EditTransactionDrawer
                defaultValues={{
                  amount: transaction?.amount,
                  type: transaction?.type,
                  title: transaction?.title,
                  emoji: transaction?.emoji,
                  date: new Date(transaction?.date),
                  categoryId: transaction?.categoryId,
                  note: transaction?.note,
                }}
                id={transaction?._id as Id<"transactions">}
              />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteTransaction id={transaction._id!} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
