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

    await ctx.db.delete(args.id);
  },
});
