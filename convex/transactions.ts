import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const transactionsWithCategories = transactions.map((transaction) => {
      const category = categories.find(
        (cat) => cat._id === transaction.categoryId,
      );
      return {
        ...transaction,
        category: {
          name: category?.name || "Unknown Category",
          icon: category?.icon || "🐈", // fallback if category not found
        },
      };
    });

    return transactionsWithCategories;
  },
});

export const createTransaction = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    amount: v.number(),
    emoji: v.string(),
    date: v.string(),
    categoryId: v.id("categories"),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }
    await ctx.db.insert("transactions", {
      type: args.type,
      title: args.title,
      amount: args.amount,
      emoji: args.emoji,
      date: args.date,
      categoryId: args.categoryId,
      note: args.note,
      tokenIdentifier: userId,
    });

    // Fetch the budget for the category
    const budget = await ctx.db
      .query("budgets")
      .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
      .first();

    if (budget && args.type === "expense") {
      await ctx.db.patch(budget._id, {
        remaining: budget.remaining - args.amount,
      });
    } else if (budget && args.type === "income") {
      await ctx.db.patch(budget._id, {
        remaining: budget.remaining + args.amount,
      });
    }
  },
});

export const updateTransaction = mutation({
  args: {
    id: v.id("transactions"),
    type: v.string(),
    title: v.string(),
    amount: v.number(),
    emoji: v.string(),
    date: v.string(),
    categoryId: v.id("categories"),
    note: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const existingTransaction = await ctx.db.get(args.id);

    if (
      !existingTransaction ||
      existingTransaction.tokenIdentifier !== userId
    ) {
      throw new ConvexError(
        "Transaction not found or you don't have permission to edit this transaction",
      );
    }

    await ctx.db.patch(args.id, {
      type: args.type,
      title: args.title,
      amount: args.amount,
      emoji: args.emoji,
      date: args.date,
      categoryId: args.categoryId,
      note: args.note,
      tokenIdentifier: userId,
    });

    // If the transaction is an expense, adjust the budget's remaining amount
    if (args.type === "expense") {
      const budget = await ctx.db
        .query("budgets")
        .withIndex("by_category", (q) => q.eq("categoryId", args.categoryId))
        .first();

      if (budget) {
        const amountDifference = args.amount - existingTransaction.amount;
        await ctx.db.patch(budget._id, {
          remaining: budget.remaining - amountDifference,
        });
      }
    }
  },
});

export const deleteTransaction = mutation({
  args: { id: v.id("transactions") },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const existingTransaction = await ctx.db.get(args.id);

    if (
      !existingTransaction ||
      existingTransaction.tokenIdentifier !== userId
    ) {
      throw new ConvexError(
        "Transaction not found or you don't have permission to edit this transaction",
      );
    }

    const budget = await ctx.db
      .query("budgets")
      .withIndex("by_category", (q) =>
        q.eq("categoryId", existingTransaction.categoryId),
      )
      .first();

    if (!budget) {
      throw new ConvexError("No budget found for the selected category");
    }
    // Adjust the remaining based on the transaction type
    let remaining = budget.remaining;
    if (existingTransaction.type === "expense") {
      remaining += existingTransaction.amount; // Revert the expense
    } else if (existingTransaction.type === "income") {
      remaining -= existingTransaction.amount; // Revert the income
    }

    //Delete the transaction and patch the budget
    await ctx.db.delete(args.id);
    await ctx.db.patch(budget._id, { remaining: remaining });
  },
});
