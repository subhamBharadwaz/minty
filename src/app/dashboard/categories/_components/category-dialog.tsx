"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

import { useState } from "react";

import { cn } from "@/lib/utils";
import { CategoryForm } from "./category-form";
import { Id } from "../../../../../convex/_generated/dataModel";

export const CategoryDialog = ({
  className,
  mode = "add",
  category,
}: {
  className?: string;
  mode: "add" | "edit";
  category?: { _id: Id<"categories">; name: string; icon: string };
}) => {
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className={cn(className)}
          variant={mode === "edit" ? "ghost" : "default"}
        >
          {mode === "add" ? (
            <>
              <Plus className="size-4 mr-2" /> Add new category
            </>
          ) : (
            "Edit"
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          mode={mode}
          category={category}
          setDialogOpen={setDialogOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
