"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Tag, Check, Loader2 } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addTransactionSchema } from "@/schema/transaction";
import { useMutation } from "@tanstack/react-query";
import { useConvexMutation, convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { Transaction } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Id } from "../../../../../convex/_generated/dataModel";

export const TransactionDrawer = ({
  transaction,
  mode = "add",
}: {
  transaction?: Transaction;
  mode: "add" | "edit";
}) => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof addTransactionSchema>>({
    resolver: zodResolver(addTransactionSchema),
    defaultValues: {
      type: transaction?.type || "expense",
      title: transaction?.title || "",
      amount: transaction?.amount,
      emoji: transaction?.emoji,
      date: transaction?.date ? new Date(transaction.date) : undefined,
      categoryId: transaction?.categoryId || "",
      note: transaction?.note !== "undefined" ? transaction?.note : "",
    },
  });

  const { mutate: createTransaction, isPending: isTransactionAdding } =
    useMutation({
      mutationFn: useConvexMutation(api.transactions.createTransaction),
    });

  const { mutate: updateTransaction, isPending: isTransactionUpdatting } =
    useMutation({
      mutationFn: useConvexMutation(api.transactions.updateTransaction),
    });

  async function onSubmit(values: z.infer<typeof addTransactionSchema>) {
    try {
      if (mode === "edit") {
        updateTransaction({
          id: transaction?._id!,
          type: values.type,
          title: values.title,
          amount: values.amount,
          emoji: String(values.emoji),
          date: String(values.date),
          categoryId: transaction?.categoryId!,
          note: String(values.note),
        });
      } else {
        createTransaction({
          type: values.type,
          title: values.title,
          amount: values.amount,
          emoji: String(values.emoji),
          date: String(values.date),
          categoryId: values.categoryId as Id<"categories">,
          note: String(values.note),
        });
      }
      setDrawerOpen(false);
      form.reset();
    } catch (error) {
      console.log("Failed to create transaction", error);
    }
  }

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error,
  } = useQuery(convexQuery(api.categories.getAllCategories, {}));

  return (
    <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={mode === "edit" ? "ghost" : "default"}
          className={cn(mode === "edit" ? "p-0 h-6" : "")}
        >
          {mode === "edit" ? (
            "Edit"
          ) : (
            <>
              <Plus className="size-4 mr-2" /> Add new
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="container w-full">
        <DrawerHeader className="pl-2">
          <DrawerTitle>
            {mode === "edit" ? "Update Transaction" : "New Transaction"}
          </DrawerTitle>
          <DrawerDescription>Add new...</DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-[calc(100vh-6rem)] w-full">
          <Form {...form}>
            <form
              className="space-y-7 py-10 pl-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-x-2"
                    >
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="expense"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="rounded-lg border-2 border-muted px-5 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-destructive peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-destructive">
                          Expense
                        </FormLabel>
                      </FormItem>
                      <FormItem>
                        <FormControl>
                          <RadioGroupItem
                            value="income"
                            className="peer sr-only"
                          />
                        </FormControl>
                        <FormLabel className="rounded-lg border-2 border-muted px-5 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-primary">
                          Income
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-7">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-2 max-w-md">
                      <FormLabel>What&apos;s this for?</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Groceries, Rent, Salary"
                          className="capitalize"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem className="grid w-full items-center gap-2 max-w-md">
                      <FormLabel>Amount</FormLabel>
                      <FormControl>
                        <Input
                          id="amount"
                          placeholder="₹ 100"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="emoji"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-x-2.5">
                        <Button
                          variant="outline"
                          type="button"
                          onClick={() => setOpenEmojiPicker(!openEmojiPicker)}
                        >
                          {field.value || emojiIcon}
                        </Button>
                        {openEmojiPicker && (
                          <div className="absolute bottom-5 z-20">
                            <EmojiPicker
                              onEmojiClick={(e) => {
                                setEmojiIcon(e.emoji);
                                field.onChange(e.emoji);
                                setOpenEmojiPicker(false);
                              }}
                            />
                          </div>
                        )}
                        <FormLabel>Select an emoji</FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-2.5">
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "max-w-[240px] justify-start text-left font-normal",
                                !field.value && "text-muted-foreground",
                              )}
                            >
                              {field.value && format(field.value, "PPP")}
                              <CalendarIcon
                                className={cn(
                                  "size-4",
                                  field.value ? "ml-2" : "ml-0",
                                )}
                              />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormLabel>Date</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-x-2.5">
                      <Popover
                        modal={true}
                        open={isCategoryOpen}
                        onOpenChange={setIsCategoryOpen}
                      >
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline">
                              {field.value ? (
                                <>
                                  <span className="mr-2">
                                    {
                                      categories?.find(
                                        (cat) => cat._id === field.value,
                                      )?.icon
                                    }
                                  </span>
                                  {
                                    categories?.find(
                                      (cat) => cat._id === field.value,
                                    )?.name
                                  }
                                </>
                              ) : (
                                <Tag className="size-4" />
                              )}
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="space-y-4">
                          <FormLabel className="text-sm font-medium leading-none">
                            Select a category
                          </FormLabel>
                          <div className="flex flex-wrap items-center gap-3">
                            {categories
                              ? categories.map((category) => (
                                  <Button
                                    key={category._id}
                                    type="button"
                                    variant="outline"
                                    className={`relative rounded-full space-y-1 w-fit ${
                                      field.value === category._id
                                        ? "border-primary"
                                        : ""
                                    }`}
                                    onClick={() => {
                                      field.onChange(category._id);
                                      setIsCategoryOpen(false);
                                    }}
                                  >
                                    <span className="inline-flex items-center gap-x-1">
                                      <span className="text-sm inline-block">
                                        {category.icon}
                                      </span>
                                      <span className="text-xs inline-block">
                                        {category.name}
                                      </span>
                                    </span>
                                    {field.value === category._id && (
                                      <span className="absolute z-10 -top-2 -right-2 bg-primary inline-flex justify-center items-center rounded-full size-4">
                                        <Check className="size-3 font-bold z-20 text-white" />
                                      </span>
                                    )}
                                  </Button>
                                ))
                              : null}
                            <Link
                              href="/dashboard/categories"
                              className={cn(
                                buttonVariants({ variant: "outline" }),
                              )}
                            >
                              <Plus className="size-4" />
                            </Link>
                          </div>
                        </PopoverContent>
                      </Popover>
                      <FormLabel>Category</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="note"
                  render={({ field }) => (
                    <FormItem className="grid items-center gap max-w-md">
                      <FormLabel>Add a note</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 'Dinner with friends'"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <DrawerFooter className="max-w-lg pl-0">
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="animate-spin mr-2" />
                  )}
                  {mode === "edit" ? "Update Transaction" : "Add Transaction"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </Form>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
};
