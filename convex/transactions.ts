import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllTransactions = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();
  },
});

export const createTransaction = mutation({
  args: {
    type: v.string(),
    title: v.string(),
    amount: v.number(),
    emoji: v.string(),
    date: v.string(),
    category: v.object({
      icon: v.string(),
      name: v.string(),
    }),
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
      category: { icon: args.category.icon, name: args.category.name },
      note: args.note,
      tokenIdentifier: userId,
    });
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
    category: v.object({
      icon: v.string(),
      name: v.string(),
    }),
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
      category: { icon: args.category.icon, name: args.category.name },
      note: args.note,
      tokenIdentifier: userId,
    });
  },
});
