import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ConvexClientProvider } from "@/components/providers/convex-client-provider"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
  title: "DevBox - Developer Email Inbox",
  description: "Stay updated with dev-related emails in your Gmail-like inbox. An open-source platform for developers.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/devbox.png",
        type: "image/png",
      },
    ],
    apple: "/devbox.png",
    shortcut: "/devbox.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>
        <ConvexClientProvider>
          {children}
          <Analytics />
        </ConvexClientProvider>
      </body>
    </html>
  )
}
