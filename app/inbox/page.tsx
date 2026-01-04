"use client"

import { useEffect } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Authenticated, Unauthenticated } from "convex/react"
import { useRouter } from "next/navigation"
import { SignInButton } from "@/components/auth/sign-in-button"
import { Mail } from "lucide-react"

export const dynamic = "force-dynamic"

function InboxRedirect() {
  const router = useRouter()
  const currentUser = useQuery(api.emails.getCurrentUser)
  
  // Redirect to user-specific inbox URL
  useEffect(() => {
    if (currentUser) {
      router.push(`/inbox/${currentUser._id}`)
    }
  }, [currentUser, router])

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="text-center">
        <Mail className="w-16 h-16 mx-auto mb-4 text-foreground/40" />
        <h2 className="text-2xl font-bold mb-2">Loading your inbox...</h2>
      </div>
    </div>
  )
}

export default function InboxPage() {
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
        <InboxRedirect />
      </Authenticated>
    </>
  )
}
