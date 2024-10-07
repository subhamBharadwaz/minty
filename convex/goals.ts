import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllGoals = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }
    const goals = await ctx.db
      .query("goals")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const filteredTransactions = transactions.filter(
      (tx) => tx.type === "income",
    );

    const savedAmounts = filteredTransactions.reduce(
      (acc, trans) => {
        acc[trans.categoryId] = (acc[trans.categoryId] || 0) + trans.amount;
        return acc;
      },
      {} as Record<string, number>,
    );

    const goalWithDetails = goals.map((goal) => {
      const category = categories.find((cat) => cat._id === goal.categoryId);
      const savedAmount = savedAmounts[goal.categoryId!] || 0;
      const progress = Math.min((savedAmount / goal.amount) * 100, 100);

      const currentDate = new Date();
      const targetDate = new Date(goal.targetDate);
      const remainingDays = Math.ceil(
        (targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
      );

      const isCompleted = savedAmount >= goal.amount;

      return {
        ...goal,
        savedAmount,
        progress,
        remainingDays,
        isCompleted,
        category: {
          name: category?.name,
          icon: category?.icon,
        },
      };
    });
    return goalWithDetails;
  },
});

export const createGoal = mutation({
  args: {
    name: v.string(),
    amount: v.number(),
    targetDate: v.string(),
    categoryId: v.optional(v.id("categories")),
  },
  handler: async (ctx, { name, amount, targetDate, categoryId }) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    return await ctx.db.insert("goals", {
      name,
      amount,
      targetDate,
      progress: 0,
      categoryId: categoryId || undefined,
      tokenIdentifier: userId,
    });
  },
});

export const updateGoal = mutation({
  args: {
    id: v.id("goals"),
    name: v.optional(v.string()),
    amount: v.optional(v.number()),
    targetDate: v.optional(v.string()),
    categoryId: v.optional(v.id("categories")),
    progress: v.optional(v.number()),
  },
  handler: async (
    ctx,
    { id, amount, name, targetDate, progress, categoryId },
  ) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const goal = await ctx.db.get(id);
    if (!goal || goal.tokenIdentifier !== userId) {
      throw new Error("Goal not found or unauthorized");
    }

    await ctx.db.patch(id, {
      ...(name && { name }),
      ...(amount && { amount }),
      ...(targetDate && { targetDate }),
      ...(progress && { progress }),
      ...(categoryId && { categoryId }),
    });
  },
});

export const deleteGoal = mutation({
  args: { id: v.id("goals") },
  handler: async (ctx, { id }) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new Error("Unauthorized");
    }

    const goal = await ctx.db.get(id);
    if (!goal || goal.tokenIdentifier !== userId) {
      throw new Error("Goal not found or unauthorized");
    }

    return await ctx.db.delete(id);
  },
});
