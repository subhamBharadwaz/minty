import { Check, Loader2, Plus, Tag } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button, buttonVariants } from "@/components/ui/button";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { convexQuery, useConvexMutation } from "@convex-dev/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addBudgetSchema } from "@/schema/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "../../../../../convex/_generated/api";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Budget } from "@/types";

type BudgetFormProps = {
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  mode: "edit" | "add";
  budget?: Budget;
};

export const BudgetForm: FC<BudgetFormProps> = ({
  setDialogOpen,
  budget,
  mode,
}) => {
  const [isCategoryOpen, setIsCategoryOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof addBudgetSchema>>({
    resolver: zodResolver(addBudgetSchema),
    defaultValues: {
      amount: budget?.amount, // Default to empty for add mode
      categoryId: budget?.categoryId || undefined,
    },
  });

  useEffect(() => {
    if (budget) {
      form.reset({
        amount: budget?.amount,
        categoryId: budget?.categoryId,
      });
    }
  }, [budget, mode, form]);

  const { mutate: createBudget, isPending: isBudgetCreating } = useMutation({
    mutationFn: useConvexMutation(api.budgets.createBudget),
  });

  async function onSubmit(values: z.infer<typeof addBudgetSchema>) {
    try {
      if (mode === "add") {
        createBudget({
          categoryId: values.categoryId as Id<"categories">,
          amount: values.amount,
        });
      }
      setDialogOpen(false);
      form.reset();
    } catch (error) {
      console.log("Failed to create budget", error);
    }
  }

  const {
    data: categories,
    isPending: isCategoriesLoading,
    error,
  } = useQuery(convexQuery(api.categories.getAllCategories, {}));

  return (
    <Form {...form}>
      <form
        className="grid w-full items-center gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  placeholder="3000"
                  {...field}
                  className="max-w-[270px]"
                  onFocus={(e) => e.currentTarget.select()}
                />
              </FormControl>
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
              <FormLabel>Category</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-x-2 items-center ml-auto mr-0">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {" "}
            {form.formState.isSubmitting && (
              <Loader2 className="animate-spin mr-2" />
            )}{" "}
            {mode === "edit" ? "Update Budget" : "Add Budget"}
          </Button>
          <Button onClick={() => setDialogOpen(false)} variant="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  );
};