"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FC, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { CategoryForm } from "./category-form";
import { useMutation } from "@tanstack/react-query";
import { api } from "../../../../../convex/_generated/api";
import { useConvexMutation } from "@convex-dev/react-query";
import { z } from "zod";
import { categorySchema } from "@/schema/category";
import { Id } from "../../../../../convex/_generated/dataModel";

type FormValues = z.input<typeof categorySchema>;

type CategoryDialogProps = {
  className?: string;
  id: Id<"categories">;
  defaultValues: FormValues;
};

export const EditCategoryDialog: FC<CategoryDialogProps> = ({
  className,
  id,
  defaultValues,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.categories.updateCategory),
  });

  const dialogContentRef = useRef<HTMLDivElement>(null);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={cn(className, "w-full justify-start cursor-pointer")}
          onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent ref={dialogContentRef}>
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>
        <CategoryForm
          key={isOpen ? "open" : "closed"}
          onSubmit={(values) => {
            mutate({ name: values?.name, icon: values?.icon, id });
          }}
          id={id}
          defaultValues={defaultValues}
          setIsOpen={setIsOpen}
          isPending={isPending}
        />
      </DialogContent>
    </Dialog>
  );
};
