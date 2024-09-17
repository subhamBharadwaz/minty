import { EllipsisVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DeleteBudget } from "./delete-budget";
import { Progress } from "@/components/ui/progress";
import { Budget } from "@/types";
import { BudgetDialog } from "./budget-dialog";

export const BudgetCard = ({ budget }: { budget: Budget }) => {
  const progressPercentage = Math.min(
    (budget?.spend! / budget?.amount) * 100,
    100,
  );

  return (
    <div className="space-y-5 hover:bg-muted/30 transition-all duration-200 border border-muted rounded-lg p-3.5 w-[270px]">
      <div className="flex justify-between">
        {" "}
        <div className="flex justify-between  items-center w-full">
          <div className="flex items-center gap-x-2">
            <p className="bg-muted rounded-full size-10 grid place-items-center">
              <span>{budget?.category?.icon}</span>
            </p>
            <p className="font-bold capitalize text-md xl:text-lg">
              {budget?.category?.name}
            </p>
          </div>
          <p className="font-bold text-lg xl:text-xl">₹{budget?.amount}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <Button variant="ghost" size="icon" className="">
              <EllipsisVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <BudgetDialog
                budget={budget}
                className="h-6 pl-0 w-full justify-start"
                mode="edit"
              />
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <DeleteBudget id={budget?._id!} />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-medium">
            ₹{budget?.spend} Spend
          </span>
          <span className="text-xs text-muted-foreground font-medium">
            ₹{budget?.remaining} Remaining
          </span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>
    </div>
  );
};
