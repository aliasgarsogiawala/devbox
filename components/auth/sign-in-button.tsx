"use client"

import { useAuthActions } from "@convex-dev/auth/react"
import { Button } from "@/components/ui/button"
import { Github, Mail } from "lucide-react"

export function SignInButton({ compact = false }: { compact?: boolean }) {
  const { signIn } = useAuthActions()

  if (compact) {
    return (
      <div className="flex gap-2">
        <Button
          onClick={() => void signIn("google")}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Mail className="w-4 h-4" />
          Google
        </Button>
        <Button
          onClick={() => void signIn("github")}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Github className="w-4 h-4" />
          GitHub
        </Button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3 max-w-sm mx-auto p-6 border border-border/60 rounded-2xl bg-card/50">
      <h2 className="text-xl font-semibold mb-2">Sign in to DevBox</h2>
      <p className="text-sm text-foreground/60 mb-4">
        Connect your account to start organizing your developer emails.
      </p>

      <Button
        onClick={() => void signIn("google")}
        variant="outline"
        className="w-full gap-2"
      >
        <Mail className="w-4 h-4" />
        Continue with Google
      </Button>

      <Button
        onClick={() => void signIn("github")}
        variant="outline"
        className="w-full gap-2"
      >
        <Github className="w-4 h-4" />
        Continue with GitHub
      </Button>

      <p className="text-xs text-foreground/50 text-center mt-2">
        By signing in, you agree to our Terms and Privacy Policy
      </p>
    </div>
  )
}

function SignOutButtonComponent() {
  const { signOut } = useAuthActions()

  return (
    <Button variant="outline" size="sm" onClick={() => void signOut()}>
      Sign Out
    </Button>
  )
}

export const SignOutButton = SignOutButtonComponent
