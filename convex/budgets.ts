import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getAllBudgets = query({
  args: {},
  handler: async (ctx) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return [];
    }

    const budgets = await ctx.db
      .query("budgets")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const budgetWithCategories = budgets.map((budgets) => {
      const category = categories.find((cat) => cat._id === budgets.categoryId);
      return {
        ...budgets,
        category: {
          name: category?.name,
          icon: category?.icon,
        },
      };
    });
    return budgetWithCategories;
  },
});

export const createBudget = mutation({
  args: {
    categoryId: v.id("categories"),
    amount: v.number(),
  },

  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    await ctx.db.insert("budgets", {
      categoryId: args.categoryId,
      amount: args.amount,
      remaining: args.amount,
      tokenIdentifier: userId,
    });
  },
});

export const deleteBudget = mutation({
  args: {
    id: v.id("budgets"),
  },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    const existingBudget = await ctx.db.get(args.id);
    if (!existingBudget || existingBudget.tokenIdentifier !== userId) {
      throw new ConvexError(
        "Budget not found or you don't have permission to delete this budget",
      );
    }

    const linkedTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_category", (q) =>
        q.eq("categoryId", existingBudget.categoryId),
      )
      .collect();

    await Promise.all(linkedTransactions.map((tx) => ctx.db.delete(tx._id)));

    await ctx.db.delete(args.id);
  },
});

// export const reasignAndDeleteBudget = mutation({
//   args: {id: v.id("budgets")},
//   handler: async(ctx, args)=> {
//     const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
//      if (!userId) {
//       throw new ConvexError("Not authenticated");
//     }
//
//      const existingBudget = await ctx.db.get(args.id);
//     if (!existingBudget || existingBudget.tokenIdentifier !== userId) {
//       throw new ConvexError("Budget not found or you don't have permission to delete this budget");
//     }
//
//        const linkedTransactions = await ctx.db
//       .query("transactions")
//       .withIndex("by_category", (q) => q.eq("categoryId", existingBudget.categoryId))
//       .collect();
//
//     // If there are linked transactions, reassign them to an "Uncategorized" category
//      if (linkedTransactions.length > 0) {
//       // Fetch or create the default "Uncategorized" category
//       let uncategorized = await ctx.db
//         .query("categories")
//         .withIndex("by_token", (q) =>
//           q.eq("tokenIdentifier", userId)
//         )
//         .first();
//
//       if (!uncategorized) {
//         // If it doesn't exist, create the "Uncategorized" category
//         uncategorized = await ctx.db.insert("categories", {
//           name: "Uncategorized",
//           icon: "📂", // Default icon for uncategorized items
//           tokenIdentifier: userId,
//         });
//       }
//
//       await Promise.all(
//         linkedTransactions.map((tx) =>
//           ctx.db.patch(tx._id, { categoryId: uncategorized?._id })
//         )
//       );
//     }
//
//     await ctx.db.delete(args.id)
//   }
// })
