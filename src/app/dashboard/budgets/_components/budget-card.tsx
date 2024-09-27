import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownCircle, ArrowUpCircle, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DeleteBudget } from "./delete-budget";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/types";
import { EditBudgetDialog } from "./edit-budget-dialog";

export const BudgetCard = ({ budget }: { budget: Budget }) => {
  const progressPercentage = Math.min(
    (budget?.spend! / budget?.amount) * 100,
    100,
  );

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Budget Overview</CardTitle>
        <div className="flex items-center justify-between sm:justify-end  gap-x-2">
          <div className="flex items-center gap-x-2">
            <div className="bg-muted rounded-full size-6 p-4 flex justify-center items-center">
              <span>{budget?.category?.icon}</span>
            </div>
            <p className="font-semibold  capitalize text-sm xl:text-md">
              {budget?.category?.name}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <EllipsisVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                <EditBudgetDialog
                  defaultValues={{
                    amount: budget?.amount,
                    categoryId: budget?.categoryId,
                  }}
                  id={budget?._id!}
                />
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <DeleteBudget id={budget?._id!} />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">₹{budget?.amount}</div>
        <Progress value={progressPercentage} className="mt-2" />
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="flex items-center">
            <ArrowDownCircle className="mr-2 h-4 w-4 text-green-500" />
            <span className="text-sm text-muted-foreground">Income</span>
          </div>
          <div className="text-right font-medium">₹{budget?.income}</div>
          <div className="flex items-center">
            <ArrowUpCircle className="mr-2 h-4 w-4 text-red-500" />
            <span className="text-sm text-muted-foreground">Spent</span>
          </div>
          <div className="text-right font-medium">₹{budget?.spend}</div>
          <div className="flex items-center">
            <CircleDollarSign className="mr-2 h-4 w-4 text-blue-500" />
            <span className="text-sm text-muted-foreground">
              {Number(budget?.remaining) >= 0
                ? "Net Remaining"
                : "Overspent by"}
            </span>
          </div>
          <div className="text-right font-medium">
            {Number(budget?.remaining) >= 0
              ? `₹${Number(budget?.remaining)}`
              : `₹${Math.abs(Number(budget?.remaining))}`}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
