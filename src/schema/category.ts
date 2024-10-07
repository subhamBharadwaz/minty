import { z } from "zod";

export const categorySchema = z.object({
  name: z.string({ required_error: "Category name is required" }).min(1),
  icon: z.string({ required_error: "Category icon is required" }).min(1),
});
