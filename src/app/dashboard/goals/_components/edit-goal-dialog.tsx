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
import { z } from "zod";
import { goalSchema } from "@/schema/goals";

type FormValues = z.input<typeof goalSchema>;

type GoalDialogProps = {
  className?: string;
  id: Id<"goals">;
  defaultValues: FormValues;
};

export const EditGoalDialog: FC<GoalDialogProps> = ({
  className,
  defaultValues,
  id,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.goals.updateGoal),
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(className, "w-full justify-start cursor-pointer")}
        >
          Update Goal
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Goal</DialogTitle>
          <DialogDescription>
            Set up a new financial goal. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <GoalForm
          onSubmit={(values) => {
            mutate({
              name: values.name,
              amount: values.amount,
              targetDate: String(values.targetDate),
              categoryId: values.categoryId as Id<"categories">,
              id,
            });
          }}
          defaultValues={defaultValues}
          isPending={isPending}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
