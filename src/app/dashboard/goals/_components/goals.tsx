"use client";

import { useQuery } from "@tanstack/react-query";
import { AddGoalDialog } from "./add-goal-dialog";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { GoalCard } from "./goal-card";
import GoalSkeleton from "./goal-skeleton";

export const Goals = () => {
  const {
    data: goals,
    isPending,
    error,
  } = useQuery(convexQuery(api.goals.getAllGoals, {}));

  if (isPending) {
    return (
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {Array(12)
          .fill(0)
          .map((_, index) => (
            <GoalSkeleton key={index} />
          ))}
      </div>
    );
  }

  if (goals?.length === 0) {
    return (
      <div className="flex gap-y-6 justify-center items-center flex-col">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          No goals added yet
        </h3>
        <p className="text-center text-muted-foreground text-base">
          Create a category to organize your transactions and track your
          spending
        </p>
        <AddGoalDialog />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <AddGoalDialog className="mr-0 ml-auto" />
      <div className="my-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-4">
        {/* @ts-ignore */}
        {goals?.map((goal) => <GoalCard key={goal._id} goal={goal} />)}
      </div>
    </div>
  );
};
