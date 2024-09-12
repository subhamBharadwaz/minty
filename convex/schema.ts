import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  tasks: defineTable({
    text: v.string(),
    isCompleted: v.boolean(),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
  transactions: defineTable({
    type: v.string(),
    title: v.string(),
    amount: v.number(),
    emoji: v.optional(v.string()),
    date: v.string(),
    category: v.object({
      name: v.string(),
      icon: v.string(),
    }),
    note: v.optional(v.string()),
    tokenIdentifier: v.string(),
  }).index("by_token", ["tokenIdentifier"]),
});
