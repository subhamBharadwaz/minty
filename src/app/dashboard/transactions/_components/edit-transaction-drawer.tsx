"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useState, useRef, FC } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { TransactionForm } from "./transaction-form";
import { useMutation } from "@tanstack/react-query";
import { transactionSchema } from "@/schema/transaction";
import { z } from "zod";

type FormValues = z.input<typeof transactionSchema>;

type EditTransactionDialogProps = {
  id: Id<"transactions">;
  defaultValues: FormValues;
};

export const EditTransactionDrawer: FC<EditTransactionDialogProps> = ({
  id,
  defaultValues,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.transactions.updateTransaction),
  });

  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start pl-2"
          onClick={(e) => {
            setIsOpen(true);
          }}
        >
          Edit
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container w-full" ref={dialogContentRef}>
        <DrawerHeader className="pl-2">
          <DrawerTitle>Update Transaction</DrawerTitle>
          <DrawerDescription>Add new...</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-6rem)] w-full">
          <TransactionForm
            onSubmit={(values) => {
              mutate({
                id,
                type: values.type,
                title: values.title,
                amount: values.amount,
                emoji: values.emoji,
                date: String(values.date),
                categoryId: values.categoryId as Id<"categories">,
                note: String(values.note),
              });
            }}
            id={id}
            defaultValues={defaultValues}
            isPending={isPending}
            setIsOpen={setIsOpen}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
