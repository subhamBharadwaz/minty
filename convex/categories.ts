import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const categoriesWithTransactionData = categories.map((category) => {
      const categoryTransactions = transactions.filter(
        (transaction) => transaction.categoryId === category._id,
      );

      const totalTransactions = categoryTransactions.length;
      const totalAmount = categoryTransactions.reduce(
        (sum, transaction) => sum + transaction.amount,
        0,
      );

      return {
        ...category,
        totalTransactions,
        totalAmount,
      };
    });

    return categoriesWithTransactionData;
  },
});

export const createCategory = mutation({
  args: {
    name: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }
    await ctx.db.insert("categories", {
      icon: args.icon,
      name: args.name,
      tokenIdentifier: userId,
    });
  },
});

export const updateCategory = mutation({
  args: {
    id: v.id("categories"),
    name: v.string(),
    icon: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }
    await ctx.db.patch(args.id, {
      icon: args.icon,
      name: args.name,
      tokenIdentifier: userId,
    });
  },
});

export const deleteCategory = mutation({
  args: { id: v.id("categories") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const existingCategory = await ctx.db.get(args.id);

    if (!existingCategory || existingCategory.tokenIdentifier !== userId) {
      throw new ConvexError(
        "Category not found or you don't have permission to delete this Category",
      );
    }

    // Cehck if the category is linked to any budgets
    const associatedBudgets = await ctx.db
      .query("budgets")
      .withIndex("by_category", (q) => q.eq("categoryId", args.id))
      .collect();

    // Cehck if the category is linked to any transactions
    const associatedTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_category", (q) => q.eq("categoryId", args.id))
      .collect();

    // Cehck if the category is linked to any goal
    const associatedGoals = await ctx.db
      .query("goals")
      .withIndex("by_category", (q) => q.eq("categoryId", args.id))
      .collect();

    // Prevent deletion if linked to any budgets or transactions
    if (
      associatedBudgets.length > 0 ||
      associatedTransactions.length > 0 ||
      associatedGoals.length > 0
    ) {
      throw new ConvexError(
        "Cannot delete category. It is linked to existing budgets, transactions or goals.",
      );
    }

    await ctx.db.delete(args.id);
  },
});
