import { authTables } from "@convex-dev/auth/server"
import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

const schema = defineSchema({
  ...authTables,
  
  // Users table (extends auth tables)
  users: defineTable({
    name: v.optional(v.string()),
    email: v.string(),
    image: v.optional(v.string()),
    emailAddress: v.optional(v.string()), // For OAuth email forwarding address
    isEmailVerified: v.optional(v.boolean()),
  }).index("by_email", ["email"]),

  // Emails/Messages table
  emails: defineTable({
    userId: v.id("users"),
    
    // Email metadata
    subject: v.string(),
    from: v.string(),
    fromEmail: v.string(),
    preview: v.string(),
    body: v.optional(v.string()),
    
    // Categorization
    category: v.optional(v.string()), // "Framework", "Tools", "Learning", "Runtime", etc.
    tags: v.optional(v.array(v.string())),
    
    // State
    isRead: v.boolean(),
    isStarred: v.boolean(),
    isArchived: v.optional(v.boolean()),
    
    // Timestamps
    receivedAt: v.number(),
    readAt: v.optional(v.number()),
    
    // Avatar/Icon
    avatar: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_user_and_read", ["userId", "isRead"])
    .index("by_user_and_starred", ["userId", "isStarred"])
    .index("by_user_and_category", ["userId", "category"])
    .index("by_received_at", ["receivedAt"]),

  // Email filters/rules (for auto-categorization)
  emailFilters: defineTable({
    userId: v.id("users"),
    name: v.string(),
    
    // Matching criteria
    fromPattern: v.optional(v.string()), // Regex or substring
    subjectPattern: v.optional(v.string()),
    
    // Actions
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    autoStar: v.optional(v.boolean()),
    
    isActive: v.boolean(),
  }).index("by_user", ["userId"]),
})

export default schema
