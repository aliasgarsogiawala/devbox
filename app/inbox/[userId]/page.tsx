"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Authenticated, Unauthenticated } from "convex/react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignInButton } from "@/components/auth/sign-in-button"
import { Mail, Star, Search, Settings, Inbox as InboxIcon } from "lucide-react"
import type { Id } from "@/convex/_generated/dataModel"

export const dynamic = "force-dynamic"

function UserInboxContent() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  
  const currentUser = useQuery(api.emails.getCurrentUser)
  const emails = useQuery(api.emails.listEmails, { category: undefined })
  const toggleStar = useMutation(api.emails.toggleEmailStar)
  const markRead = useMutation(api.emails.markEmailRead)
  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())

  // Security: Redirect if trying to access someone else's inbox
  useEffect(() => {
    if (currentUser && currentUser._id !== userId) {
      router.push(`/inbox/${currentUser._id}`)
    }
  }, [currentUser, userId, router])

  if (!currentUser) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <Mail className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
          <h2 className="text-2xl font-bold mb-2">Loading your inbox...</h2>
        </div>
      </div>
    )
  }

  // Block access if not the right user
  if (currentUser._id !== userId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <Mail className="w-24 h-24 mx-auto mb-6 text-primary/40" />
          <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
          <p className="text-foreground/70">
            You don't have permission to view this inbox.
          </p>
        </div>
      </div>
    )
  }

  const emailsList = emails || []
  
  const filteredEmails = emailsList.filter((email) => {
    const matchesCategory = selectedCategory === "All" || email.category === selectedCategory
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleToggleStar = async (emailId: Id<"emails">) => {
    await toggleStar({ emailId })
  }

  const handleMarkRead = async (emailId: Id<"emails">, isRead: boolean) => {
    if (!isRead) {
      await markRead({ emailId, isRead: true })
    }
  }

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedEmails)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedEmails(newSelected)
  }

  const getCategoryColor = (category?: string) => {
    const colors: Record<string, string> = {
      Framework: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Tools: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Learning: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Runtime: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return category ? colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200" : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Yesterday"
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const categories = ["All", "Framework", "Tools", "Learning", "Runtime"]
  const unreadCount = emailsList.filter(e => !e.isRead).length

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
              D
            </div>
            <h1 className="text-2xl font-bold">DevBox Inbox</h1>
            <span className="text-sm text-foreground/60">
              {currentUser.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-6 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
            <Input
              type="text"
              placeholder="Search emails..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="px-6 pb-4">
          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Email List */}
      <div className="flex-1 overflow-y-auto">
        {filteredEmails.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <InboxIcon className="w-24 h-24 text-foreground/20 mb-4" />
            <h2 className="text-2xl font-bold mb-2">No emails yet</h2>
            <p className="text-foreground/60 max-w-md">
              {emailsList.length === 0
                ? "Your inbox is empty. Start receiving developer emails to see them here!"
                : "No emails match your current filters. Try adjusting your search or category."}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredEmails.map((email) => (
              <div
                key={email._id}
                className={`px-6 py-4 hover:bg-muted/50 transition-colors cursor-pointer border-l-4 ${
                  !email.isRead ? "border-l-primary bg-muted/30" : "border-l-transparent"
                }`}
                onClick={() => handleMarkRead(email._id, email.isRead)}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={selectedEmails.has(email._id)}
                    onChange={(e) => {
                      e.stopPropagation()
                      toggleSelect(email._id)
                    }}
                    onClick={(e) => e.stopPropagation()}
                  />

                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-semibold text-primary">
                    {email.avatar || email.from[0]}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`font-semibold truncate ${!email.isRead ? "font-bold text-foreground" : "text-foreground/70"}`}
                          >
                            {email.from}
                          </span>
                          {email.category && (
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(email.category)}`}>
                              {email.category}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xs text-foreground/60">{formatTimestamp(email.receivedAt)}</span>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleToggleStar(email._id)
                        }}
                        className="flex-shrink-0"
                      >
                        <Star
                          className={`w-4 h-4 ${email.isStarred ? "fill-primary text-primary" : "text-foreground/40"}`}
                        />
                      </button>
                    </div>

                    <h3 className={`font-medium mb-1 ${!email.isRead ? "font-semibold" : ""}`}>{email.subject}</h3>
                    <p
                      className={`text-sm line-clamp-2 ${!email.isRead ? "text-foreground font-medium" : "text-foreground/70"}`}
                    >
                      {email.preview}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="border-t border-border px-6 py-3 text-sm text-foreground/60">
        <div className="flex items-center justify-between">
          <span>
            {unreadCount} unread · {emailsList.length} total
          </span>
          <span>{selectedEmails.size} selected</span>
        </div>
      </div>
    </div>
  )
}

export default function UserInboxPage() {
  return (
    <>
      <Unauthenticated>
        <div className="h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
          <div className="text-center max-w-md px-6">
            <Mail className="w-24 h-24 mx-auto mb-6 text-primary/40" />
            <h1 className="text-4xl font-bold mb-4">Sign in to view your inbox</h1>
            <p className="text-foreground/70 mb-8">
              You need to be signed in to access your developer email inbox.
            </p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>
      
      <Authenticated>
        <UserInboxContent />
      </Authenticated>
    </>
  )
}
