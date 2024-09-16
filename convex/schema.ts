import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  transactions: defineTable({
    type: v.string(),
    title: v.string(),
    amount: v.number(),
    emoji: v.string(),
    date: v.string(),
    categoryId: v.id("categories"),
    note: v.optional(v.string()),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_category", ["categoryId"]),
  categories: defineTable({
    name: v.string(),
    icon: v.string(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  budgets: defineTable({
    categoryId: v.id("categories"),
    amount: v.number(),
    remaining: v.number(),
    tokenIdentifier: v.string(),
  })
    .index("by_token", ["tokenIdentifier"])
    .index("by_category", ["categoryId"]),
});
