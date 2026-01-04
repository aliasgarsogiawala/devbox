"use client"

import { ConvexReactClient } from "convex/react"
import { ConvexProviderWithAuth } from "convex/react"
import type { ReactNode } from "react"
import { useMemo } from "react"

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  const convex = useMemo(
    () => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!),
    []
  )

  return (
    <ConvexProviderWithAuth client={convex} useAuth={useAuthFromConvex}>
      {children}
    </ConvexProviderWithAuth>
  )
}

function useAuthFromConvex() {
  // Return null auth for now - we'll implement this when we add auth UI
  return useMemo(
    () => ({
      isLoading: false,
      isAuthenticated: false,
      fetchAccessToken: async () => null,
    }),
    []
  )
}

