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

import { FC, useState } from "react";

import { cn } from "@/lib/utils";
import { CategoryForm } from "./category-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
import { DialogDescription } from "@/components/ui/dialog";

type CategoryDialogProps = {
  className?: string;
};

export const AddCategoryDialog: FC<CategoryDialogProps> = ({ className }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.categories.createCategory),
  });

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild className={cn(className)}>
        <Button>
          <Plus className="h-4 w-4 mr-2" /> Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Category</DialogTitle>
          <DialogDescription>
            Organize your transactions by creating a new category for better
            financial management.
          </DialogDescription>
        </DialogHeader>
        <CategoryForm
          onSubmit={(values) => {
            mutate({ name: values.name, icon: values.icon });
          }}
          isPending={isPending}
          setIsOpen={setIsOpen}
        />
      </DialogContent>
    </Dialog>
  );
};
