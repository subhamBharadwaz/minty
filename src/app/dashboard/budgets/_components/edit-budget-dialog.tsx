import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FC, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { BudgetForm } from "./budget-form";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
import { budgetSchema } from "@/schema/budget";
import { z } from "zod";
import { Pencil } from "lucide-react";

type FormValues = z.input<typeof budgetSchema>;

type BudgetDialogProps = {
  className?: string;
  id: Id<"budgets">;
  defaultValues: FormValues;
};

export const EditBudgetDialog: FC<BudgetDialogProps> = ({
  className,
  id,
  defaultValues,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.budgets.updateBudget),
  });

  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(className, "w-full justify-start cursor-pointer")}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          <Pencil className="mr-2 size-4" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent ref={dialogContentRef}>
        <DialogHeader>
          <DialogTitle>Edit Budget</DialogTitle>
          <DialogDescription>
            Adjust your budget to reflect changes in your financial priorities
            or goals.
          </DialogDescription>
        </DialogHeader>
        <BudgetForm
          key={isOpen ? "open" : "closed"}
          onSubmit={(values) => {
            mutate({
              amount: values.amount,
              categoryId: values.categoryId as Id<"categories">,
              id,
            });
          }}
          id={id}
          defaultValues={defaultValues}
          isPending={isPending}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
