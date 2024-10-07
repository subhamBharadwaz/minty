import { z } from "zod";

export const goalSchema = z.object({
  id: z.optional(z.string()),
  name: z
    .string({
      required_error: "You need to select a transaction type",
    })
    .min(3),
  categoryId: z.string({ required_error: "Please select a category" }),
  amount: z.coerce
    .number({
      required_error: "Enter an amount for the transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(0, "Amount must be a positive number"),
  targetDate: z.date({
    required_error: "A date of the transaction is required",
  }),
});
