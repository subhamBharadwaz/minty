import { Dispatch, FC, SetStateAction, useState } from "react";
import {
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Loader2,
  Plus,
  Tag,
} from "lucide-react";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useQuery } from "@tanstack/react-query";
import { convexQuery } from "@convex-dev/react-query";
import { api } from "../../../../../convex/_generated/api";
import { goalSchema } from "@/schema/goals";
import Link from "next/link";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type FormValues = z.input<typeof goalSchema>;

type GoalFormProps = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  disabled?: boolean;
  isPending?: boolean;
};

export const GoalForm: FC<GoalFormProps> = ({
  id,
  defaultValues,
  onSubmit,
  setIsOpen,
  isPending,
  disabled,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof goalSchema>>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      name: defaultValues?.name,
      amount: defaultValues?.amount,
      targetDate: defaultValues?.targetDate
        ? new Date(defaultValues.targetDate)
        : undefined,
      categoryId: defaultValues?.categoryId,
      id: id,
    },
  });

  function handleSubmit(values: z.infer<typeof goalSchema>) {
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="New Car"
                  className="capitalize"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Give your goal a descriptive name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Target Amount</FormLabel>
              <FormControl>
                <Input type="number" placeholder="10000" {...field} />
              </FormControl>
              <FormDescription>How much do you want to save?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Target Date</FormLabel>
              <Popover modal={true}>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                When do you want to achieve this goal?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Category</FormLabel>
              <Popover
                open={isCategoryOpen}
                onOpenChange={setIsCategoryOpen}
                modal={true}
              >
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant="outline">
                      {field.value ? (
                        <>
                          <span className="mr-2">
                            {
                              categories?.find((cat) => cat._id === field.value)
                                ?.icon
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
              <FormDescription>
                Select a category for your goal.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-x-2 items-center ml-auto mr-0">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {!!id ? (
              isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update"
              )
            ) : isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Adding...
              </>
            ) : (
              "Save"
            )}
          </Button>
          <Button
            type="button"
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};
