import { z } from "zod";

export const addTransactionSchema = z.object({
  type: z.enum(["expense", "income"], {
    required_error: "You need to select a transaction type",
  }),
  title: z
    .string({ required_error: "You need to give a title for your transaction" })
    .min(3),
  emoji: z.string({ required_error: "Please select an emoji" }),
  amount: z.coerce
    .number({
      required_error: "Enter an amount for the transaction",
      invalid_type_error: "Amount must be a number",
    })
    .min(0, "Amount must be a positive number"),
  date: z.date({ required_error: "A date of the transaction is required" }),
  category: z
    .object({
      name: z.string().min(1, "Category name is required"),
      icon: z.string().min(1, "Category icon is required"),
    })
    .nullable()
    .refine((val) => val !== null, {
      message: "Please select a category",
    }),
  note: z.string().optional(),
});
