import { convexAuthNextjsMiddleware } from "@convex-dev/auth/nextjs/server"

export default convexAuthNextjsMiddleware()

export const config = {
  // Match all request paths except static files and _next
  matcher: ["/((?!_next|.*\\..*).*)"],
}
