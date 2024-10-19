"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useRef, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

import { useConvexMutation } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { TransactionForm } from "./transaction-form";
import { useMutation } from "@tanstack/react-query";

export const AddTransactionDrawer = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { mutate, isPending } = useMutation({
    mutationFn: useConvexMutation(api.transactions.createTransaction),
  });

  const dialogContentRef = useRef<HTMLDivElement>(null);

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button
          onClick={(e) => {
            setIsOpen(true);
          }}
        >
          <Plus className="size-4 mr-2" /> Add new transaction
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container w-full" ref={dialogContentRef}>
        <DrawerHeader className="pl-2">
          <DrawerTitle>New Transaction</DrawerTitle>
          <DrawerDescription>
            Record your income or expenses to keep track of your finances. Fill
            in the details below.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-6rem)] w-full">
          <TransactionForm
            onSubmit={(values) => {
              mutate({
                type: values.type,
                title: values.title,
                amount: values.amount,
                emoji: values.emoji,
                date: String(values.date),
                categoryId: values.categoryId as Id<"categories">,
                note: String(values.note),
              });
            }}
            isPending={isPending}
            setIsOpen={setIsOpen}
          />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
