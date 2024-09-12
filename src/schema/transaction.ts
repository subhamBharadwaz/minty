import { z } from "zod";

export const addTransactionSchema = z.object({
  type: z.enum(["expense", "income"], {
    required_error: "You need to select a transaction type",
  }),
  title: z
    .string({ required_error: "You need to give a title for your transaction" })
    .min(3),
  amount: z
    .string({ required_error: "Enter a amount of the transaction" })
    .transform((value) => {
      const parsed = parseFloat(value);
      if (isNaN(parsed)) {
        throw new Error("Invalid number");
      }
      return parsed;
    }),
  emoji: z.string().optional(),
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
