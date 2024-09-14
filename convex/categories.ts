import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllCategories = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }

    return await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();
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
