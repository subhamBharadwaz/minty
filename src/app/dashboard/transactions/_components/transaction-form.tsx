import { Button, buttonVariants } from "@/components/ui/button";
import { Plus, Tag, Check, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
import { transactionSchema } from "@/schema/transaction";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type FormValues = z.input<typeof transactionSchema>;

type TransactionFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isPending?: boolean;
  disabled?: boolean;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  id,
  defaultValues,
  isPending,
  disabled,
  onSubmit,
  setIsOpen,
}) => {
  const [emojiIcon, setEmojiIcon] = useState<string>("😀");
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);

  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      id: id,
      type: defaultValues?.type || "expense",
      title: defaultValues?.title || "",
      amount: defaultValues?.amount || 0,
      emoji: defaultValues?.emoji,
      date: defaultValues?.date ? new Date(defaultValues.date) : undefined,
      categoryId: defaultValues?.categoryId || "",
      note: defaultValues?.note !== "undefined" ? defaultValues?.note : "",
    },
  });

  async function handleSubmit(values: z.infer<typeof transactionSchema>) {
    onSubmit(values);
    setIsOpen(false);
    form.reset();
  }

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error,
  } = useQuery(convexQuery(api.categories.getAllCategories, {}));

  return (
    <Form {...form}>
      <form
        className="space-y-7 py-10 pl-2"
        onSubmit={form.handleSubmit(handleSubmit)}
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
                    <RadioGroupItem value="expense" className="peer sr-only" />
                  </FormControl>
                  <FormLabel className="rounded-lg border-2 border-muted px-5 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:bg-destructive peer-data-[state=checked]:text-white [&:has([data-state=checked])]:border-destructive">
                    Expense
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormControl>
                    <RadioGroupItem value="income" className="peer sr-only" />
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
                              categories?.find((cat) => cat._id === field.value)
                                ?.name
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
                        className={cn(buttonVariants({ variant: "outline" }))}
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
                  <Input placeholder="e.g. 'Dinner with friends'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center gap-x-2.5">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {!!id ? (
              isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )
            ) : isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Add"
            )}{" "}
          </Button>
          <Button variant="outline">Cancel</Button>
        </div>
      </form>
    </Form>
  );
};
