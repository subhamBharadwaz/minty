"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { DataCard } from "./data-card";
import { useSearchParams } from "next/navigation";
import { formatDateRange } from "@/lib/utils";
import { differenceInDays, format, parse, subDays } from "date-fns";
import { useState } from "react";
import { convexQuery } from "@convex-dev/react-query";
import { useQuery } from "@tanstack/react-query";
import { api } from "../../../../convex/_generated/api";
import { DateFilter } from "./date-filter";
import { TopCategoriesChart } from "./charts/categories-pie-chart";
import { TransactionsChart } from "./charts/transactions-chart";
import { Transaction, Category } from "@/types";

export const DataGrid = () => {
  // Define default dates (current period: 30 days)
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  const [dateRange, setDateRange] = useState({
    from: format(defaultFrom, "yyyy-MM-dd"),
    to: format(defaultTo, "yyyy-MM-dd"),
  });
  const { data: summary, isLoading } = useQuery(
    convexQuery(api.transactions.getSummary, {
      from: dateRange.from,
      to: dateRange.to,
    }),
  );

  const transactions = summary?.transactions;
  const categories = summary?.categories;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <DateFilter
        from={new Date(dateRange?.from)}
        to={new Date(dateRange?.to)}
        onDateChange={setDateRange}
      />
      <div className="grid w-full gap-6 grid-cols-1  lg:grid-cols-2">
        <DataCard
          value={summary?.totalExpense ?? 0}
          title="Expenses"
          dateRange={formatDateRange(dateRange)}
          icon={TrendingDown}
          variant="danger"
        />
        <DataCard
          value={summary?.totalIncome ?? 0}
          dateRange={formatDateRange(dateRange)}
          title="Income"
          icon={TrendingUp}
          variant="success"
        />
      </div>
      <div className="flex flex-col lg:flex-row justify-between  gap-5">
        <TransactionsChart transactions={transactions as Transaction[]} />
        <TopCategoriesChart
          transactions={transactions as Transaction[]}
          categories={categories as Category[]}
        />
      </div>
    </div>
  );
};
