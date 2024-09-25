import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Plus, Trash2 } from "lucide-react";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";
import { BudgetForm } from "./budget-form";
import { Budget } from "@/types";

export const BudgetDialog = ({
  className,
  mode = "add",
  budget,
}: {
  className?: string;
  mode: "add" | "edit";
  budget?: Budget;
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    if (mode === "edit" && dialogOpen) {
      // Trigger reset logic in BudgetForm via state or props
    }
  }, [mode, dialogOpen]);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(className)}
          variant={mode === "edit" ? "ghost" : "default"}
        >
          {mode === "add" ? (
            <>
              <Plus className="size-4 mr-2" /> Add new Budget
            </>
          ) : (
            <>
              <Pencil className="size-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Add new Budget" : "Update Budget"}
          </DialogTitle>
        </DialogHeader>
        <BudgetForm budget={budget} mode={mode} setDialogOpen={setDialogOpen} />
      </DialogContent>
    </Dialog>
  );
};
