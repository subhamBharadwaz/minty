import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import {
  parseISO,
  isAfter,
  isBefore,
  subDays,
  startOfMonth,
  endOfMonth,
  differenceInDays,
} from "date-fns";

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

export const getSummary = query({
  args: { from: v.optional(v.string()), to: v.optional(v.string()) },
  handler: async (ctx, { from, to }) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      return {
        totalIncome: 0,
        totalExpense: 0,
        transactionsByDate: [],
        categories: [],
      };
    }
    const transactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const categories = await ctx.db
      .query("categories")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    const defaultEnd = new Date();
    const defaultStart = subDays(defaultEnd, 30);

    // Parse start and end date
    const start = from ? parseISO(from) : defaultStart;
    const end = to ? parseISO(to) : defaultEnd;

    // Calculate previous month range
    const prevMonthStart = startOfMonth(
      subDays(start, differenceInDays(end, start)),
    );
    const prevMonthEnd = endOfMonth(subDays(end, differenceInDays(end, start)));

    // Filter transactions within the date range and calculate sums

    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return isAfter(transactionDate, start) && isBefore(transactionDate, end);
    });

    const prevMonthTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        isAfter(transactionDate, prevMonthStart) &&
        isBefore(transactionDate, prevMonthEnd)
      );
    });

    // Calculate income and expenses for current and previous date ranges
    let totalIncome = 0;
    let totalExpense = 0;
    let prevMonthIncome = 0;
    let prevMonthExpense = 0;

    filteredTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else {
        totalExpense += transaction.amount;
      }
    });

    prevMonthTransactions.forEach((transaction) => {
      if (transaction.type === "income") {
        prevMonthIncome += transaction.amount;
      } else {
        prevMonthExpense += transaction.amount;
      }
    });

    // Calculate percentage change
    const incomeChange = prevMonthIncome
      ? ((totalIncome - prevMonthIncome) / prevMonthIncome) * 100
      : 0;

    const expenseChange = prevMonthExpense
      ? ((totalExpense - prevMonthExpense) / prevMonthExpense) * 100
      : 0;

    const filteredCategories = categories.filter((category) => {
      const categoryDate = new Date(category._creationTime);
      return isAfter(categoryDate, start) && isBefore(categoryDate, end);
    });

    // Calculate net balance
    const netBalance = totalIncome - totalExpense;
    const prevMonthNetBalance = prevMonthIncome - prevMonthExpense;

    // Calculate percentage change in net balance
    const netBalanceChange = prevMonthNetBalance
      ? ((netBalance - prevMonthNetBalance) / prevMonthNetBalance) * 100
      : 0;

    return {
      totalIncome,
      totalExpense,
      incomeChange,
      netBalanceChange,
      expenseChange,
      netBalance,
      transactions: filteredTransactions,
      categories: filteredCategories,
    };
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

export const bulkDeleteTransactions = mutation({
  args: { ids: v.array(v.id("transactions")) },
  handler: async (ctx, args) => {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("Not authenticated");
    }

    // Fetch all transactions to be deleted
    const allTransactions = await ctx.db
      .query("transactions")
      .withIndex("by_token", (q) => q.eq("tokenIdentifier", userId))
      .collect();

    // Filter transactions by provided IDs
    const transactionsToDelete = allTransactions.filter((transaction) =>
      args.ids.includes(transaction._id),
    );

    if (transactionsToDelete.length === 0) {
      throw new ConvexError("No transactions found for the provided IDs");
    }

    for (const transaction of transactionsToDelete) {
      if (transaction.tokenIdentifier !== userId) {
        throw new ConvexError(
          `Transaction with ID ${transaction._id} is not owned by the user`,
        );
      }

      // Delete the transaction
      await ctx.db.delete(transaction._id);
    }
  },
});
