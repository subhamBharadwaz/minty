import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Goal } from "@/types";
import { EditGoalDialog } from "./edit-goal-dialog";
import { Id } from "../../../../../convex/_generated/dataModel";
import { DeleteGoal } from "./delete-goal";
import { formatDate } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { formatAmountInINR } from "@/lib/utils";

export const GoalCard = ({ goal }: { goal: Goal }) => {
  const exceededAmount = goal.savedAmount - goal.amount;
  const isExceeded = goal.savedAmount > goal.amount;

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Goal Overview</CardTitle>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
              <EditGoalDialog
                defaultValues={{
                  name: goal?.name,
                  targetDate: new Date(goal?.targetDate),
                  amount: goal?.amount,
                  categoryId: goal?.categoryId,
                }}
                id={goal?._id as Id<"goals">}
              />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()} asChild>
              <DeleteGoal id={goal?._id as Id<"goals">} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <p className="text-lg lg:text-xl font-semibold">{goal?.name}</p>
        <p className="text-xl lg:text-2xl font-semibold">₹{goal?.amount}</p>

        <p className="text-muted-foreground text-sm lg:text-base mt-2">
          {goal?.isCompleted ? (
            isExceeded ? (
              <span>
                🎉 Congratulations! You have saved{" "}
                {formatAmountInINR(goal?.savedAmount)} (
                {formatAmountInINR(exceededAmount)} over your target).
              </span>
            ) : (
              <span>
                ✨ Goal Completed! Total Saved:
                {formatAmountInINR(goal?.savedAmount)}
              </span>
            )
          ) : (
            <span>
              Progress: {formatAmountInINR(goal?.savedAmount)} of{" "}
              {formatAmountInINR(goal?.amount)}
            </span>
          )}
        </p>
        {!goal?.isCompleted && (
          <Progress value={goal?.progress} className="mt-2" />
        )}
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm lg:text-base">
              Category
            </p>
            <p className="font-medium">
              {goal?.category?.icon} {goal?.category?.name}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm lg:text-base">
              Target Date
            </p>
            <p className="font-medium">
              {formatDate(goal?.targetDate, "dd MMM, yyyy")}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm lg:text-base">
              Days Remaining
            </p>
            <p className="font-medium">{goal?.remainingDays} days</p>
          </div>
          <div className="space-y-1">
            <p className="text-muted-foreground text-sm lg:text-base">Status</p>
            <Badge variant={goal?.isCompleted ? "default" : "secondary"}>
              {goal?.isCompleted ? "Completed" : "In Progress"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
