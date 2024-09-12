import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const create = mutation({
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
