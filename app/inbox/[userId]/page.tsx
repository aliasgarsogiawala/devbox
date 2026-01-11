"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Authenticated, Unauthenticated } from "convex/react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SignInButton } from "@/components/auth/sign-in-button"
import { Mail, Star, Search, Settings, Inbox as InboxIcon, Sparkles, Shield, Zap, Check, ChevronRight, LogOut, LayoutGrid } from "lucide-react"
import type { Id } from "@/convex/_generated/dataModel"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import type { Variants } from "framer-motion"

export const dynamic = "force-dynamic"

function UserInboxContent() {
  const params = useParams()
  const router = useRouter()
  const userId = params.userId as string
  const shouldReduceMotion = useReducedMotion()
  
  const currentUser = useQuery(api.emails.getCurrentUser)
  const emails = useQuery(api.emails.listEmails, { category: undefined })
  const toggleStar = useMutation(api.emails.toggleEmailStar)
  const markRead = useMutation(api.emails.markEmailRead)
  
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedEmails, setSelectedEmails] = useState<Set<string>>(new Set())

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.4,
            ease: [0.16, 1, 0.3, 1],
            delay: i,
          },
    }),
  }

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion ? {} : { staggerChildren: 0.05 },
    },
  }

  // Security: Redirect if trying to access someone else's inbox
  useEffect(() => {
    if (currentUser && currentUser._id !== userId) {
      router.push(`/inbox/${currentUser._id}`)
    }
  }, [currentUser, userId, router])

  if (!currentUser) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="relative mb-6 inline-block">
            <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full" />
            <Mail className="w-16 h-16 mx-auto text-primary relative animate-pulse" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Loading your updates...</h2>
        </motion.div>
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
      Framework: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      Tools: "bg-purple-500/10 text-purple-500 border-purple-500/20",
      Learning: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      Runtime: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    }
    return category ? colors[category] || "bg-zinc-500/10 text-zinc-500 border-zinc-500/20" : "bg-zinc-500/10 text-zinc-500 border-zinc-500/20"
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

  const categories = [
    { name: "All", icon: LayoutGrid },
    { name: "Framework", icon: Zap },
    { name: "Tools", icon: Shield },
    { name: "Learning", icon: Sparkles },
    { name: "Runtime", icon: InboxIcon },
  ]
  const unreadCount = emailsList.filter(e => !e.isRead).length

  return (
    <div className="h-screen flex bg-background text-foreground selection:bg-primary/20 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.01]" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full" />
      </div>

      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-background/50 backdrop-blur-xl z-10 flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <Image
              src="/devbox.png"
              alt="DevBox Logo"
              width={28}
              height={28}
              className="w-7 h-7 rounded-lg ring-1 ring-border/50 shadow-sm"
            />
            <span className="font-bold tracking-tight text-lg">DevBox</span>
          </div>

          <nav className="space-y-1">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm font-medium transition-all group ${
                  selectedCategory === cat.name
                    ? "bg-primary/10 text-primary"
                    : "text-foreground/60 hover:bg-muted/80 hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-3">
                  <cat.icon className={`w-4 h-4 ${selectedCategory === cat.name ? "text-primary" : "text-foreground/40 group-hover:text-foreground/60"}`} />
                  {cat.name}
                </div>
                {cat.name === "All" && unreadCount > 0 && (
                  <span className="px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-4">
          <div className="rounded-2xl bg-card/50 border border-border/40 p-4 backdrop-blur-md">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-[10px] font-bold text-white uppercase">
                {currentUser.from?.[0] || currentUser.email[0]}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold truncate">{currentUser.email.split('@')[0]}</p>
                <p className="text-[10px] text-foreground/40 truncate leading-none mt-0.5">Free Developer Plan</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="w-full justify-start gap-2 h-8 text-[11px] font-semibold text-foreground/60 hover:text-destructive hover:bg-destructive/5">
              <LogOut className="w-3 h-3" />
              Sign Out
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col z-10 relative overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-border/50 bg-background/30 backdrop-blur-md flex items-center justify-between px-8">
          <div className="flex-1 max-w-xl">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30 group-focus-within:text-primary transition-colors" />
              <input
                type="text"
                placeholder="Search your updates..."
                className="w-full bg-muted/30 border border-border/40 rounded-xl pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-background bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-white">JS</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white">TS</div>
              <div className="w-8 h-8 rounded-full border-2 border-background bg-orange-600 flex items-center justify-center text-[10px] font-bold text-white">R</div>
            </div>
            <div className="h-4 w-px bg-border/50 mx-2" />
            <Button variant="outline" size="sm" className="rounded-xl border-border/40 bg-background/50 backdrop-blur-sm gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Button>
          </div>
        </header>

        {/* Email List Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-5xl mx-auto px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold tracking-tight mb-1">{selectedCategory} Updates</h2>
                <p className="text-sm text-foreground/40 font-medium">
                  Showing {filteredEmails.length} relevant developer updates
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="text-xs font-semibold text-foreground/40 hover:text-foreground">
                  Mark all read
                </Button>
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredEmails.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-20 text-center"
                >
                  <div className="relative mb-6">
                    <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full" />
                    <InboxIcon className="w-20 h-20 text-foreground/10 relative" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">No updates found</h3>
                  <p className="text-foreground/40 max-w-sm mx-auto text-sm leading-relaxed">
                    {emailsList.length === 0
                      ? "Your professional inbox is waiting for its first developer update. Sit tight!"
                      : "We couldn't find any updates matching your filters. Try a different search?"}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  variants={stagger}
                  initial="hidden"
                  animate="visible"
                  className="space-y-3"
                >
                  {filteredEmails.map((email, idx) => (
                    <motion.div
                      key={email._id}
                      variants={fadeUp}
                      custom={idx * 0.02}
                      onClick={() => handleMarkRead(email._id, email.isRead)}
                      className={`group relative rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden ${
                        !email.isRead 
                          ? "bg-primary/5 border-primary/20 shadow-sm shadow-primary/5" 
                          : "bg-card/30 border-border/40 hover:border-primary/30 hover:bg-card/60"
                      }`}
                    >
                      <div className="flex items-start gap-4 p-5 relative z-10">
                        <div className="mt-1">
                          <input
                            type="checkbox"
                            checked={selectedEmails.has(email._id)}
                            onChange={(e) => {
                              e.stopPropagation()
                              toggleSelect(email._id)
                            }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-4 h-4 rounded border-border/50 bg-background accent-primary transition-all cursor-pointer"
                          />
                        </div>

                        <div className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ring-1 transition-all group-hover:scale-105 ${
                          !email.isRead 
                            ? "bg-primary text-primary-foreground ring-primary/20" 
                            : "bg-zinc-500/10 text-foreground/40 ring-border/50"
                        }`}>
                          {email.avatar || email.from[0]}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-4 mb-1">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={`text-sm truncate ${!email.isRead ? "font-bold text-foreground" : "font-semibold text-foreground/60"}`}>
                                {email.from}
                              </span>
                              {email.category && (
                                <span className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider border ${getCategoryColor(email.category)}`}>
                                  {email.category}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 flex-shrink-0">
                              <span className="text-[11px] font-medium text-foreground/30 whitespace-nowrap">{formatTimestamp(email.receivedAt)}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleToggleStar(email._id)
                                }}
                                className="transition-transform active:scale-90"
                              >
                                <Star
                                  className={`w-4 h-4 transition-colors ${email.isStarred ? "fill-primary text-primary" : "text-foreground/10 hover:text-foreground/30"}`}
                                />
                              </button>
                            </div>
                          </div>

                          <h3 className={`text-base mb-1 truncate ${!email.isRead ? "font-bold text-foreground" : "font-medium text-foreground/80 group-hover:text-foreground transition-colors"}`}>
                            {email.subject}
                          </h3>
                          <p className={`text-sm line-clamp-1 ${!email.isRead ? "text-foreground/70" : "text-foreground/40"}`}>
                            {email.preview}
                          </p>
                        </div>
                        
                        <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                          <ChevronRight className="w-5 h-5 text-primary" />
                        </div>
                      </div>
                      
                      {/* Active indicator bar */}
                      {!email.isRead && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Footer Info */}
        <footer className="h-10 border-t border-border/50 bg-background/50 backdrop-blur-md px-8 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-foreground/30">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> Secure Connection</span>
            <span className="flex items-center gap-1.5"><Check className="w-3 h-3 text-emerald-500" /> End-to-end Encryption</span>
          </div>
          <div>
            &copy; 2026 DevBox Protocol v1.0.4
          </div>
        </footer>
      </main>
    </div>
  )
}

export default function UserInboxPage() {
  return (
    <>
      <Unauthenticated>
        <div className="h-screen flex items-center justify-center bg-background relative overflow-hidden">
          {/* Background decoration */}
          <div className="fixed inset-0 z-0 pointer-events-none">
            <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full" />
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-md px-6 z-10"
          >
            <div className="relative mb-8 inline-block">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full animate-pulse" />
              <div className="relative w-24 h-24 rounded-3xl bg-card border border-border/50 shadow-2xl flex items-center justify-center">
                <Mail className="w-12 h-12 text-primary" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-4 tracking-tight">Identity Required</h1>
            <p className="text-foreground/60 mb-8 leading-relaxed">
              Please sign in with your developer account to access the DevBox secure update protocol.
            </p>
            <SignInButton />
          </motion.div>
        </div>
      </Unauthenticated>
      
      <Authenticated>
        <UserInboxContent />
      </Authenticated>
    </>
  )
}
