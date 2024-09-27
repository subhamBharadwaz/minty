import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { FC, useState } from "react";

import { cn } from "@/lib/utils";
import { BudgetForm } from "./budget-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
import { Id } from "../../../../../convex/_generated/dataModel";

type BudgetDialogProps = {
  className?: string;
};

export const AddBudgetDialog: FC<BudgetDialogProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.budgets.createBudget),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className={cn(className)}>
          <Plus className="size-4 mr-2" /> Add new Budget
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Budget</DialogTitle>
        </DialogHeader>
        <BudgetForm
          onSubmit={(values) => {
            mutate({
              amount: values.amount,
              categoryId: values.categoryId as Id<"categories">,
            });
          }}
          isPending={isPending}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
