"use client";

import { api } from "../../../../../convex/_generated/api";
import { Skeleton } from "@/components/ui/skeleton";
import { BudgetDialog } from "./budget-dialog";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { BudgetCard } from "./budget-card";

export const Budgets = () => {
  const {
    data: budgets,
    isPending,
    error,
  } = useQuery(convexQuery(api.budgets.getAllBudgets, {}));

  if (isPending) {
    return (
      <div className="my-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <Skeleton
              key={index}
              className="flex border px-2.5 w-[150px] h-16 border-muted items-center gap-x-2.5"
            >
              <Skeleton className="size-6" />
              <Skeleton className="h-3 w-16" />
            </Skeleton>
          ))}
      </div>
    );
  }

  if (budgets?.length === 0) {
    return (
      <div className="flex gap-y-6 justify-center items-center flex-col">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          No categories added yet
        </h3>
        <p className="text-center text-muted-foreground text-base">
          Create a category to organize your transactions and track your
          spending
        </p>
        <BudgetDialog mode="add" />
      </div>
    );
  }

  return (
    <div>
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
        {budgets?.map((budget) => (
          <BudgetCard key={budget._id} budget={budget} />
        ))}
      </div>

      <BudgetDialog mode="add" />
    </div>
  );
};
