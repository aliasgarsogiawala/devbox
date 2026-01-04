"use client"

import { ConvexReactClient } from "convex/react"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import type { ReactNode } from "react"
import { useMemo } from "react"

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(() => {
    // Provide a fallback URL for SSR/build time
    const url = process.env.NEXT_PUBLIC_CONVEX_URL || "https://happy-animal-123.convex.cloud"
    return new ConvexReactClient(url)
  }, [])

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
}

