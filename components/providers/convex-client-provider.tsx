"use client"

import { ConvexReactClient } from "convex/react"
import { ConvexAuthProvider } from "@convex-dev/auth/react"
import type { ReactNode } from "react"
import { useMemo } from "react"

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!),
    []
  )

  return <ConvexAuthProvider client={convex}>{children}</ConvexAuthProvider>
}

