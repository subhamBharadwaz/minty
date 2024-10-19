"use client";

import { PiggyBank, TrendingDown, TrendingUp } from "lucide-react";
import { DataCard } from "./data-card";
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
import { DataCardSkeleton } from "./data-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { ChartSkeleton } from "./charts/chart-skeleton";

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
    return (
      <div className="space-y-7">
        <Skeleton className="w-[300px] px-2.5 py-4" />
        <div className="my-10 grid grid-cols-1  lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <DataCardSkeleton key={index} />
            ))}
        </div>
        <div className="grid items-center grid-cols-1 lg:grid-cols-3 gap-6">
          <ChartSkeleton className="col-span-2" />

          <ChartSkeleton />
          <Skeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <DateFilter
        from={new Date(dateRange?.from)}
        to={new Date(dateRange?.to)}
        onDateChange={setDateRange}
      />
      <div className="grid w-full gap-6 grid-cols-1  lg:grid-cols-3">
        <DataCard
          value={summary?.netBalance ?? 0}
          title="Net Balance"
          dateRange={formatDateRange(dateRange)}
          icon={PiggyBank}
          variant="blue"
        />

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
      <div className="grid items-center grid-cols-1 lg:grid-cols-3 gap-6">
        <TransactionsChart
          transactions={transactions as Transaction[]}
          className="lg:col-span-2"
        />
        <TopCategoriesChart
          transactions={transactions as Transaction[]}
          categories={categories as Category[]}
        />
      </div>
    </div>
  );
};
