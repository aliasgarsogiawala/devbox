"use client"

import { Suspense, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Archive, Trash2, Star, Search, RefreshCw, Settings } from "lucide-react"

interface EmailItem {
  id: string
  from: string
  subject: string
  preview: string
  category: string
  starred: boolean
  read: boolean
  timestamp: string
  avatar: string
}

const MOCK_EMAILS: EmailItem[] = [
  {
    id: "1",
    from: "React Newsletter",
    subject: "React 19: New Features and Best Practices",
    preview: "Discover the latest updates in React 19 including improved hooks and performance...",
    category: "Framework",
    starred: true,
    read: false,
    timestamp: "Today",
    avatar: "R",
  },
  {
    id: "2",
    from: "GitHub Trending",
    subject: "🔥 Top Repos This Week: TypeScript Edition",
    preview: "Check out the most starred TypeScript projects gaining traction in the community...",
    category: "Tools",
    starred: false,
    read: false,
    timestamp: "Today",
    avatar: "G",
  },
  {
    id: "3",
    from: "Web Dev Digest",
    subject: "CSS Masonry Layouts Without Grid: A Deep Dive",
    preview: "Learn advanced CSS techniques to create beautiful masonry layouts without CSS Grid...",
    category: "Learning",
    starred: false,
    read: true,
    timestamp: "Yesterday",
    avatar: "W",
  },
  {
    id: "4",
    from: "Node.js Updates",
    subject: "Node.js 22 Released: What's New?",
    preview: "Explore the improvements and breaking changes in the latest Node.js LTS version...",
    category: "Runtime",
    starred: false,
    read: true,
    timestamp: "2 days ago",
    avatar: "N",
  },
  {
    id: "5",
    from: "Next.js Blog",
    subject: "Next.js 15: Edge Runtime and Middleware Updates",
    preview: "Enhanced performance and new middleware capabilities for your Next.js applications...",
    category: "Framework",
    starred: true,
    read: false,
    timestamp: "3 days ago",
    avatar: "N",
  },
  {
    id: "6",
    from: "Vercel Updates",
    subject: "Deploy Faster with Vercel Queues",
    preview: "Introducing a new service for handling background jobs reliably...",
    category: "Tools",
    starred: false,
    read: true,
    timestamp: "4 days ago",
    avatar: "V",
  },
]

const CATEGORIES = ["All", "Framework", "Tools", "Learning", "Runtime"]

function InboxContent() {
  const [emails, setEmails] = useState(MOCK_EMAILS)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())

  const filteredEmails = emails.filter((email) => {
    const matchesCategory = selectedCategory === "All" || email.category === selectedCategory
    const matchesSearch =
      email.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.from.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleStarred = (id: string) => {
    setEmails(emails.map((e) => (e.id === id ? { ...e, starred: !e.starred } : e)))
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

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      Framework: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Tools: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      Learning: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Runtime: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    }
    return colors[category] || "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
  }

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
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-56 border-r border-border bg-card p-4 overflow-y-auto hidden md:block">
          <div className="mb-6">
            <Button className="w-full mb-4">
              <Mail className="w-4 h-4 mr-2" />
              Compose
            </Button>
          </div>

          <div className="space-y-2 mb-6">
            <div className="px-3 py-2 rounded-lg bg-primary text-primary-foreground font-medium">Inbox</div>
            <div className="px-3 py-2 rounded-lg text-foreground/70 hover:bg-muted cursor-pointer">Drafts</div>
            <div className="px-3 py-2 rounded-lg text-foreground/70 hover:bg-muted cursor-pointer">Starred</div>
            <div className="px-3 py-2 rounded-lg text-foreground/70 hover:bg-muted cursor-pointer">Archive</div>
          </div>

          <div className="mb-4">
            <p className="text-xs font-semibold text-foreground/60 uppercase mb-3">Categories</p>
            <div className="space-y-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition ${
                    selectedCategory === cat ? "bg-accent text-accent-foreground" : "text-foreground/70 hover:bg-muted"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-xs font-semibold text-foreground/60 uppercase mb-3">About</p>
            <p className="text-xs text-foreground/60">
              DevBox is an open-source project. Join us on GitHub to contribute!
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Search and Toolbar */}
          <div className="border-b border-border p-4 bg-card space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
                <Input
                  placeholder="Search emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>

            {selectedEmails.size > 0 && (
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <span className="text-sm text-foreground/70">{selectedEmails.size} selected</span>
                <div className="ml-auto flex gap-2">
                  <Button variant="ghost" size="sm">
                    <Archive className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Email List */}
          <div className="flex-1 overflow-y-auto">
            {filteredEmails.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <Mail className="w-12 h-12 text-foreground/30 mx-auto mb-4" />
                  <p className="text-foreground/60">No emails found</p>
                </div>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {filteredEmails.map((email) => (
                  <div
                    key={email.id}
                    className={`px-4 py-3 hover:bg-muted cursor-pointer transition border-l-4 ${
                      !email.read ? "border-l-primary bg-muted/30" : "border-l-transparent"
                    }`}
                    onClick={() => toggleSelect(email.id)}
                  >
                    <div className="flex items-start gap-4">
                      <input
                        type="checkbox"
                        checked={selectedEmails.has(email.id)}
                        onChange={(e) => {
                          e.stopPropagation()
                          toggleSelect(email.id)
                        }}
                        className="mt-2"
                      />
                      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                        {email.avatar}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-4 mb-1">
                          <div className="flex items-center gap-2">
                            <p
                              className={`font-semibold truncate ${!email.read ? "font-bold text-foreground" : "text-foreground/70"}`}
                            >
                              {email.from}
                            </p>
                            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(email.category)}`}>
                              {email.category}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs text-foreground/60">{email.timestamp}</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                toggleStarred(email.id)
                              }}
                              className="p-1 hover:bg-background rounded"
                            >
                              <Star
                                className={`w-4 h-4 ${email.starred ? "fill-primary text-primary" : "text-foreground/40"}`}
                              />
                            </button>
                          </div>
                        </div>
                        <p
                          className={`text-sm line-clamp-2 ${!email.read ? "text-foreground font-medium" : "text-foreground/70"}`}
                        >
                          {email.subject}
                        </p>
                        <p className="text-xs text-foreground/60 line-clamp-1 mt-1">{email.preview}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function InboxPage() {
  return (
    <Suspense fallback={null}>
      <InboxContent />
    </Suspense>
  )
}
