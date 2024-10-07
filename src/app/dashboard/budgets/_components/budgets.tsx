"use client";

import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { BudgetCard } from "./budget-card";
import { BudgetSkeleton } from "./budget-skeleton";
import { AddBudgetDialog } from "./add-budget-dialog";

export const Budgets = () => {
  const {
    data: budgets,
    isPending,
    error,
  } = useQuery(convexQuery(api.budgets.getAllBudgets, {}));

  if (isPending) {
    return (
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <BudgetSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (budgets?.length === 0) {
    return (
      <div className="flex gap-y-6 justify-center items-center flex-col">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          No budgets added yet
        </h3>
        <p className="text-center text-muted-foreground text-base">
          Create a budget to organize your transactions and track your spending
        </p>
        <AddBudgetDialog />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <AddBudgetDialog className="mr-0 ml-auto" />
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
        {budgets?.map((budget) => (
          //@ts-ignore
          <BudgetCard key={budget._id} budget={budget} />
        ))}
      </div>
    </div>
  );
};
