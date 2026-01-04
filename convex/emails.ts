import { v } from "convex/values"
import { mutation, query } from "./_generated/server"
import { auth } from "./auth"

// Get current authenticated user
export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) {
      console.log("No userId found in auth")
      return null
    }
    
    console.log("Auth userId:", userId)
    
    // Get user from auth tables - this returns the user document from the users table
    const user = await ctx.db.get(userId)
    
    if (!user) {
      console.error("User not found for ID:", userId)
      return null
    }
    
    // Return user with explicit _id field
    const userWithId = {
      ...user,
      _id: userId,
    }
    
    console.log("Returning user:", userWithId)
    return userWithId
  },
})

// List all emails for the current user
export const listEmails = query({
  args: {
    category: v.optional(v.string()),
    isStarred: v.optional(v.boolean()),
    isRead: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    let emailsQuery = ctx.db
      .query("emails")
      .withIndex("by_user", (q) => q.eq("userId", userId))

    // Apply filters
    if (args.category) {
      emailsQuery = ctx.db
        .query("emails")
        .withIndex("by_user_and_category", (q) =>
          q.eq("userId", userId).eq("category", args.category)
        )
    }

    if (args.isStarred !== undefined) {
      emailsQuery = ctx.db
        .query("emails")
        .withIndex("by_user_and_starred", (q) =>
          q.eq("userId", userId).eq("isStarred", args.isStarred!)
        )
    }

    const emails = await emailsQuery.collect()

    // Filter by read status if specified
    if (args.isRead !== undefined) {
      return emails.filter((e) => e.isRead === args.isRead)
    }

    return emails.sort((a, b) => b.receivedAt - a.receivedAt)
  },
})

// Get a single email
export const getEmail = query({
  args: { emailId: v.id("emails") },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    return email
  },
})

// Create a new email
export const createEmail = mutation({
  args: {
    subject: v.string(),
    from: v.string(),
    fromEmail: v.string(),
    preview: v.string(),
    body: v.optional(v.string()),
    category: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const emailId = await ctx.db.insert("emails", {
      userId,
      subject: args.subject,
      from: args.from,
      fromEmail: args.fromEmail,
      preview: args.preview,
      body: args.body,
      category: args.category,
      tags: args.tags,
      avatar: args.avatar,
      isRead: false,
      isStarred: false,
      receivedAt: Date.now(),
    })

    return emailId
  },
})

// Mark email as read/unread
export const markEmailRead = mutation({
  args: {
    emailId: v.id("emails"),
    isRead: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    await ctx.db.patch(args.emailId, {
      isRead: args.isRead,
      readAt: args.isRead ? Date.now() : undefined,
    })
  },
})

// Star/unstar email
export const toggleEmailStar = mutation({
  args: {
    emailId: v.id("emails"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    await ctx.db.patch(args.emailId, {
      isStarred: !email.isStarred,
    })
  },
})

// Archive email
export const archiveEmail = mutation({
  args: {
    emailId: v.id("emails"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    await ctx.db.patch(args.emailId, {
      isArchived: true,
    })
  },
})

// Delete email
export const deleteEmail = mutation({
  args: {
    emailId: v.id("emails"),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    await ctx.db.delete(args.emailId)
  },
})

// Update email category
export const updateEmailCategory = mutation({
  args: {
    emailId: v.id("emails"),
    category: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await auth.getUserId(ctx)
    if (!userId) throw new Error("Not authenticated")

    const email = await ctx.db.get(args.emailId)
    if (!email || email.userId !== userId) {
      throw new Error("Email not found")
    }

    await ctx.db.patch(args.emailId, {
      category: args.category,
    })
  },
})
