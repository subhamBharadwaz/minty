import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { FC, useState } from "react";

import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
import { Id } from "../../../../../convex/_generated/dataModel";
import { GoalForm } from "./goal-form";

type GoalDialogProps = {
  className?: string;
};

export const AddGoalDialog: FC<GoalDialogProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.goals.createGoal),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={cn(className)}>
        <Button>
          <Plus className="size-4 mr-2" /> Add new Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-3">
          <DialogTitle>Add New Goal</DialogTitle>
          <DialogDescription>
            Define a saving target or a financial milestone to work toward. Fill
            in the goal amount and deadline
          </DialogDescription>
        </DialogHeader>

        <GoalForm
          onSubmit={(values) => {
            mutate({
              name: values.name,
              amount: values.amount,
              targetDate: String(values.targetDate),
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
