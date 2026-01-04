"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { SignInButton, SignOutButton } from "@/components/auth/sign-in-button"
import type { Variants } from "framer-motion"
import { motion, useReducedMotion } from "framer-motion"
import { Check, Github, Inbox, Mail, Search, Shield, Sparkles, Star, Zap } from "lucide-react"
import { Authenticated, Unauthenticated } from "convex/react"

export const dynamic = "force-dynamic"

export default function LandingPage() {
  const shouldReduceMotion = useReducedMotion()

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: (i: number = 0) => ({
      opacity: 1,
      y: 0,
      transition: shouldReduceMotion
        ? { duration: 0 }
        : {
            duration: 0.6,
            ease: "easeOut",
            delay: i,
          },
    }),
  }

  const stagger: Variants = {
    hidden: {},
    visible: {
      transition: shouldReduceMotion ? {} : { staggerChildren: 0.08 },
    },
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-clip">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur border-b border-border/50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm">
              D
            </div>
            <span className="text-lg font-semibold tracking-tight">DevBox</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-foreground transition"
            >
              <Github className="w-5 h-5" />
            </a>
            <Authenticated>
              <Link href="/inbox">
                <Button variant="outline" size="sm">
                  Open Inbox
                </Button>
              </Link>
              <SignOutButton />
            </Authenticated>
            <Unauthenticated>
              <SignInButton compact />
            </Unauthenticated>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative border-b border-border/50 px-6">
        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-44 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -top-24 left-1/3 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="absolute top-32 right-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-background to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto pt-20 pb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3 py-1 text-xs text-foreground/70"
              >
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                The open-source inbox for developer updates
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.08}
                className="mt-5 text-5xl sm:text-6xl lg:text-6xl font-bold tracking-tight text-balance leading-[1.05]"
              >
                Dev context,
                <span className="text-primary"> delivered</span>.
              </motion.h1>

              <motion.p
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.16}
                className="mt-5 text-lg sm:text-xl text-foreground/70 text-balance leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                DevBox consolidates framework news, tool releases, and engineering newsletters into one calm place.
                Skim fast, star what matters, and come back later.
              </motion.p>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.24}
                className="mt-8 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <Unauthenticated>
                  <SignInButton />
                </Unauthenticated>

                <Authenticated>
                  <Link href="/inbox">
                    <Button size="lg" className="gap-2 shadow-sm">
                      <Inbox className="w-4 h-4" />
                      Open the Inbox
                    </Button>
                  </Link>
                </Authenticated>

                <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Star className="w-4 h-4" />
                    Star on GitHub
                  </Button>
                </a>
              </motion.div>

              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                custom={0.32}
                className="mt-8 flex flex-wrap gap-3 justify-center lg:justify-start text-sm text-foreground/60"
              >
                {[
                  { icon: Shield, label: "No tracking" },
                  { icon: Zap, label: "Fast search" },
                  { icon: Mail, label: "Newsletter-ready" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3 py-1"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            {/* Mock inbox card */}
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/15 via-transparent to-accent/10 blur-2xl" />
              <div className="relative rounded-2xl border border-border/60 bg-card/70 backdrop-blur p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="text-xs text-foreground/50">Today</div>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2 text-sm text-foreground/70">
                  <Search className="h-4 w-4 text-foreground/50" />
                  Search: “Next.js”, “React”, “security”
                </div>

                <motion.ul
                  initial="hidden"
                  animate="visible"
                  variants={stagger}
                  className="mt-4 space-y-2"
                >
                  {[
                    { tag: "Next.js", title: "Next.js 16.1: Router + perf improvements", time: "2h" },
                    { tag: "Security", title: "Weekly security roundup (Jan 2026)", time: "6h" },
                    { tag: "Tools", title: "New release: faster linting for monorepos", time: "1d" },
                    { tag: "React", title: "Patterns for scalable forms in React", time: "2d" },
                  ].map((m, idx) => (
                    <motion.li
                      key={idx}
                      variants={fadeUp}
                      custom={0.1 + idx * 0.04}
                      className="group flex items-center justify-between gap-3 rounded-xl border border-border/50 bg-background/40 px-4 py-3 hover:bg-background/60 transition"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[11px] font-medium rounded-full bg-primary/10 text-primary px-2 py-0.5">
                            {m.tag}
                          </span>
                          <span className="text-xs text-foreground/50">{m.time}</span>
                        </div>
                        <div className="text-sm font-medium text-foreground/90 truncate">{m.title}</div>
                      </div>
                      <span className="text-xs text-foreground/40 group-hover:text-foreground/60 transition">★</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0.4}
            className="mt-14 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-foreground/50"
          >
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> 100% open source
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> No tracking pixels
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" /> Forever free
            </span>
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="border-b border-border/50 py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Value Prop 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-balance">Everything in one place.</h2>
              <p className="text-lg text-foreground/70 mb-6 text-balance leading-relaxed">
                Point DevBox at your dev newsletters and updates. It keeps them tidy, searchable, and out of the way—so
                your real inbox stays for real humans.
              </p>
              <ul className="space-y-3 text-foreground/70">
                {["Framework updates", "Tool releases", "Security advisories", "Learning resources"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 to-primary/15 flex items-center justify-center overflow-hidden">
                <Image
                  src="/picc.png"
                  alt="Everything in one place illustration"
                  width={1280}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Value Prop 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full aspect-square rounded-2xl border border-border/60 bg-gradient-to-br from-primary/8 to-primary/15 flex items-center justify-center">
                <Zap className="w-28 h-28 text-primary/25" />
              </div>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5 text-balance">Smart organization.</h2>
              <p className="text-lg text-foreground/70 mb-6 text-balance leading-relaxed">
                Automatically group emails by topic, star what matters, and search instantly. No fiddly rules required.
              </p>
              <ul className="space-y-3 text-foreground/70">
                {["Auto-categorization", "Quick search", "Star favorites", "Read later"].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="border-b border-border/50 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Built for developers.</h2>
            <p className="text-lg text-foreground/60">Open source. Transparent. Community-driven.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              {
                icon: Inbox,
                title: "Gmail-like inbox",
                description: "A familiar interface you already know how to use — tuned for dev updates.",
              },
              {
                icon: Search,
                title: "Fast search",
                description: "Find that one release note from last month in seconds.",
              },
              {
                icon: Sparkles,
                title: "Clean reading mode",
                description: "Skim headlines, open what matters, and get back to shipping.",
              },
              {
                icon: Shield,
                title: "Privacy-first",
                description: "No tracking. No pixels. No creepy analytics in your inbox.",
              },
              {
                icon: Zap,
                title: "Smart filters",
                description: "Organize by frameworks, tools, and topics without manual rules.",
              },
              {
                icon: Github,
                title: "Open source",
                description: "Fully transparent code. Contributions welcome.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  custom={0.05 + idx * 0.04}
                  className="group border border-border/60 rounded-2xl p-6 bg-card/50 hover:bg-card/70 hover:-translate-y-0.5 transition will-change-transform"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-border/60">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-foreground/60 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-b border-border/50 py-20 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={fadeUp}
          custom={0}
          className="max-w-6xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-gradient-to-br from-primary/10 via-card/60 to-accent/10 p-8 sm:p-12">
            <div aria-hidden className="absolute -top-32 -right-24 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
            <div aria-hidden className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-accent/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-2 gap-10 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-balance">Ready to organize dev updates?</h2>
                <p className="text-lg text-foreground/60 text-balance leading-relaxed">
                  Drop your email to get notified when we ship new features—or jump straight into the inbox preview.
                </p>
              </div>

              <div className="w-full">
                <Unauthenticated>
                  <div className="space-y-4">
                    <SignInButton />
                    <p className="text-xs text-foreground/50 text-center">
                      Sign in with Google or GitHub to get started
                    </p>
                  </div>
                </Unauthenticated>

                <Authenticated>
                  <div className="flex flex-col gap-3">
                    <Link href="/inbox">
                      <Button size="lg" className="w-full gap-2">
                        <Inbox className="w-4 h-4" />
                        Go to Inbox
                      </Button>
                    </Link>
                    <p className="text-xs text-foreground/50 text-center">
                      You're signed in! Ready to organize your emails.
                    </p>
                  </div>
                </Authenticated>

                <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-sm text-foreground/60 hover:text-foreground transition">
                    View on GitHub
                  </a>
                </div>

                <p className="mt-3 text-xs text-foreground/50 text-center lg:text-left">No spam. Open source. Community built.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-semibold mb-4">DevBox</h3>
              <p className="text-sm text-foreground/60">Open-source dev inbox for staying updated.</p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Links</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                    GitHub
                  </a>
                </li>
                <li>
                  <Link href="/inbox" className="hover:text-foreground transition">
                    Inbox
                  </Link>
                </li>
                <li>
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition">
                    Issues
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 flex items-center justify-between text-xs text-foreground/50">
            <p>&copy; 2025 DevBox. Open source.</p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-foreground/70 transition">
                Twitter
              </a>
              <a href="#" className="hover:text-foreground/70 transition">
                Discord
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
