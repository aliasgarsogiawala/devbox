"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Search } from "lucide-react"

export const dynamic = "force-dynamic"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-br from-primary to-primary/50 bg-clip-text text-transparent">
            404
          </h1>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Page Not Found
        </h2>
        
        <p className="text-lg text-foreground/70 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="w-4 h-4" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/inbox">
            <Button variant="outline" size="lg" className="gap-2">
              <Search className="w-4 h-4" />
              Open Inbox
            </Button>
          </Link>
        </div>

        <div className="mt-12 text-sm text-foreground/50">
          <p>Lost? Head back to the homepage or check out your inbox.</p>
        </div>
      </div>
    </div>
  )
}
