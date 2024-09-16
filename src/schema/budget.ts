import { z } from "zod";

export const addBudgetSchema = z.object({
  amount: z.coerce
    .number({
      required_error: "Enter an amount for the budget",
      invalid_type_error: "Amount must be a number",
    })
    .min(0, "Amount must be a positive number"),
  categoryId: z.string({ required_error: "Please select a category" }),
});
