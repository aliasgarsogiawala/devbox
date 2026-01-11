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
            duration: 0.5,
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
    <div className="min-h-screen bg-background text-foreground overflow-x-clip selection:bg-primary/20">
      {/* Background patterns */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/60">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src="/devbox.png"
              alt="DevBox Logo"
              width={36}
              height={36}
              className="w-9 h-9 rounded-xl ring-1 ring-border/50 bg-background"
            />
            <span className="text-lg font-semibold tracking-tight">DevBox</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/aliasgarsogiawala/devbox"
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
      <section className="relative border-b border-border/50 px-6 overflow-hidden">
        {/* Decorative background */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[30%] left-1/2 h-[700px] w-[1000px] -translate-x-1/2 rounded-full bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 blur-[120px] opacity-70" />
          <div className="absolute top-[10%] left-[10%] h-80 w-80 rounded-full bg-accent/15 blur-[100px] animate-pulse" />
          <div className="absolute top-[20%] right-[10%] h-96 w-96 rounded-full bg-primary/15 blur-[100px]" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
        </div>

        <div className="relative max-w-6xl mx-auto pt-20 sm:pt-24 pb-20 sm:pb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={stagger}
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeUp} className="text-center lg:text-left relative z-10">
              <motion.div
                variants={fadeUp}
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-medium text-primary shadow-[0_1px_12px_rgba(var(--primary),0.1)] backdrop-blur-md"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>The open-source inbox for developer updates</span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.02]"
              >
                Dev context,
                <br />
                <span className="bg-gradient-to-br from-primary via-primary to-accent bg-clip-text text-transparent">
                  delivered
                </span>
                .
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg sm:text-xl text-foreground/60 text-balance leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                DevBox consolidates framework news, tool releases, and engineering newsletters into one calm, professional space.
                Skim fast, star what matters, and ship better.
              </motion.p>

              <motion.div
                variants={fadeUp}
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

                <a href="https://github.com/aliasgarsogiawala/devbox" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="gap-2 bg-background/40 hover:bg-background/60">
                    <Star className="w-4 h-4" />
                    Star on GitHub
                  </Button>
                </a>
              </motion.div>

              <motion.div
                variants={fadeUp}
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
            </motion.div>

            {/* Mock inbox card */}
            <motion.div
              variants={fadeUp}
              whileHover={shouldReduceMotion ? {} : { y: -5, rotateX: 2, rotateY: -2 }}
              className="relative perspective-1000 hidden lg:block"
            >
              <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/15 blur-2xl opacity-50" />
              <div className="relative rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl p-1 shadow-2xl overflow-hidden group">
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                
                <div className="bg-background/40 rounded-xl p-5 border border-border/20">
                  <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-red-500/40 border border-red-500/20" />
                      <div className="h-3 w-3 rounded-full bg-yellow-500/40 border border-yellow-500/20" />
                      <div className="h-3 w-3 rounded-full bg-green-500/40 border border-green-500/20" />
                    </div>
                    <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/5 border border-primary/10">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                      <span className="text-[10px] font-medium text-primary uppercase tracking-wider">Live Feed</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-border/40 bg-background/50 px-4 py-2.5 text-sm text-foreground/40 mb-6 shadow-inner">
                    <Search className="h-4 w-4" />
                    <span>Search developer updates...</span>
                  </div>

                  <motion.ul
                    initial="hidden"
                    animate="visible"
                    variants={stagger}
                    className="space-y-3"
                  >
                    {[
                      { tag: "Next.js", title: "Next.js 16.1: Router + perf improvements", time: "2h", active: true },
                      { tag: "Security", title: "Weekly security roundup (Jan 2026)", time: "6h" },
                      { tag: "Tools", title: "New release: faster linting for monorepos", time: "1d" },
                      { tag: "React", title: "Patterns for scalable forms in React", time: "2d" },
                    ].map((m, idx) => (
                      <motion.li
                        key={idx}
                        variants={fadeUp}
                        custom={0.2 + idx * 0.05}
                        className="group flex items-center justify-between gap-4 rounded-xl border border-border/30 bg-background/30 px-4 py-3.5 hover:bg-primary/5 hover:border-primary/20 transition-all duration-300"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-[10px] font-bold uppercase tracking-tight rounded-md bg-primary/10 text-primary px-2 py-0.5 border border-primary/10">
                              {m.tag}
                            </span>
                            <span className="text-[10px] text-foreground/30 font-medium">{m.time}</span>
                          </div>
                          <div className="text-sm font-medium text-foreground/80 truncate group-hover:text-foreground transition-colors">{m.title}</div>
                        </div>
                        <div className="flex-shrink-0">
                          <Star className={`w-3.5 h-3.5 transition-colors ${idx === 0 ? "fill-primary text-primary" : "text-foreground/20 group-hover:text-foreground/40"}`} />
                        </div>
                      </motion.li>
                    ))}
                  </motion.ul>
                </div>
              </div>

              {/* Decorative floating elements */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-6 -bottom-6 w-24 h-24 bg-accent/20 rounded-full blur-2xl -z-10" 
              />
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -left-8 top-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" 
              />
            </motion.div>
          </motion.div>

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
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto space-y-32">
          {/* Value Prop 1 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
                Centralization
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance leading-tight tracking-tight">Everything in one place.</h2>
              <p className="text-lg text-foreground/60 mb-8 text-balance leading-relaxed">
                Point DevBox at your dev newsletters and updates. It keeps them tidy, searchable, and out of the way—so
                your real inbox stays for real humans.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Framework updates", "Tool releases", "Security advisories", "Learning resources"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground/70 group">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:bg-primary/20 transition-colors">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:block relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-primary/20 to-accent/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
              <div className="relative rounded-3xl border border-border/50 bg-background/50 p-2 shadow-2xl backdrop-blur-sm overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="rounded-2xl overflow-hidden ring-1 ring-border/50">
                  <Image
                    src="/picc.png"
                    alt="Everything in one place illustration"
                    width={1280}
                    height={800}
                    className="w-full h-auto object-contain scale-[1.02] group-hover:scale-105 transition duration-700"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Value Prop 2 */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="grid md:grid-cols-2 gap-16 items-center"
          >
            <div className="hidden md:block order-2 md:order-1 relative group">
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-primary/20 rounded-[2.5rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000" />
              <div className="relative aspect-square rounded-3xl border border-border/50 bg-background/50 flex items-center justify-center shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
                <Zap className="w-32 h-32 text-primary/30 group-hover:text-primary transition-all duration-700 drop-shadow-2xl" />
                
                {/* Floating tags decoration */}
                <div className="absolute top-1/4 -right-4 p-3 rounded-xl bg-card border border-border/50 shadow-lg animate-bounce [animation-duration:3s]">
                  <div className="h-2 w-12 bg-primary/20 rounded mb-2" />
                  <div className="h-2 w-8 bg-foreground/10 rounded" />
                </div>
                <div className="absolute bottom-1/4 -left-4 p-3 rounded-xl bg-card border border-border/50 shadow-lg animate-bounce [animation-duration:4s] [animation-delay:0.5s]">
                  <div className="h-2 w-10 bg-accent/20 rounded mb-2" />
                  <div className="h-2 w-14 bg-foreground/10 rounded" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-bold uppercase tracking-widest mb-6 border border-accent/10">
                Organization
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-balance leading-tight tracking-tight">Smart organization.</h2>
              <p className="text-lg text-foreground/60 mb-8 text-balance leading-relaxed">
                Automatically group emails by topic, star what matters, and search instantly. No fiddly rules required.
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Auto-categorization", "Quick search", "Star favorites", "Read later"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-foreground/70 group">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-accent/10 flex items-center justify-center border border-accent/20 group-hover:bg-accent/20 transition-colors">
                      <Check className="w-3 h-3 text-accent" />
                    </div>
                    <span className="text-sm font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 relative bg-background/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            custom={0}
            className="text-center mb-20"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight">Built for developers.</h2>
            <p className="text-xl text-foreground/50 max-w-2xl mx-auto">Open source. Transparent. Community-driven. No nonsense.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={stagger}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Inbox,
                title: "Gmail-like inbox",
                description: "A familiar interface you already know how to use — tuned for dev updates.",
                color: "primary"
              },
              {
                icon: Search,
                title: "Fast search",
                description: "Find that one release note from last month in seconds.",
                color: "accent"
              },
              {
                icon: Sparkles,
                title: "Clean reading mode",
                description: "Skim headlines, open what matters, and get back to shipping.",
                color: "primary"
              },
              {
                icon: Shield,
                title: "Privacy-first",
                description: "No tracking. No pixels. No creepy analytics in your inbox.",
                color: "accent"
              },
              {
                icon: Zap,
                title: "Smart filters",
                description: "Organize by frameworks, tools, and topics without manual rules.",
                color: "primary"
              },
              {
                icon: Github,
                title: "Open source",
                description: "Fully transparent code. Contributions welcome.",
                color: "accent"
              },
            ].map((feature, idx) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={idx}
                  variants={fadeUp}
                  custom={idx * 0.05}
                  className="group relative rounded-3xl border border-border/50 bg-card/30 p-8 hover:bg-card/50 transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent pointer-events-none" />
                  <div className="relative z-10">
                    <div className={`h-12 w-12 rounded-2xl bg-${feature.color}/10 text-${feature.color} flex items-center justify-center border border-${feature.color}/20 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-foreground/50 leading-relaxed text-sm">{feature.description}</p>
                  </div>
                  
                  {/* Subtle hover glow */}
                  <div className={`absolute -right-8 -bottom-8 h-32 w-32 bg-${feature.color}/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={0}
          className="max-w-5xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-[2.5rem] border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-accent/10 p-1 shadow-2xl group">
            <div className="absolute inset-0 bg-grid-black/[0.05] dark:bg-grid-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
            <div className="absolute -top-32 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-[100px] group-hover:bg-primary/30 transition-colors duration-1000" />
            <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-accent/20 blur-[100px] group-hover:bg-accent/30 transition-colors duration-1000" />

            <div className="relative rounded-[2.25rem] bg-background/80 backdrop-blur-3xl p-8 sm:p-16 border border-white/10 overflow-hidden">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest mb-6 border border-primary/10">
                    Get Started
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">Ready to organize <br className="hidden sm:block" /> dev updates?</h2>
                  <p className="text-xl text-foreground/50 leading-relaxed">
                    Join developers who have reclaimed their inboxes. Start organizing your framework updates today.
                  </p>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-6">
                  <div className="w-full max-w-sm">
                    <Unauthenticated>
                      <div className="space-y-4">
                        <SignInButton />
                        <p className="text-xs text-foreground/40 text-center">
                          Sign in securely with Google or GitHub
                        </p>
                      </div>
                    </Unauthenticated>

                    <Authenticated>
                      <div className="flex flex-col gap-4">
                        <Link href="/inbox">
                          <Button size="lg" className="w-full h-14 text-lg font-semibold gap-3 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                            <Inbox className="w-5 h-5" />
                            Go to My Inbox
                          </Button>
                        </Link>
                        <p className="text-sm text-foreground/50 text-center">
                          Welcome back! Your updates are waiting.
                        </p>
                      </div>
                    </Authenticated>
                  </div>

                  <div className="flex items-center gap-8 pt-4">
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">Open Source</div>
                    </div>
                    <div className="w-px h-8 bg-border/50" />
                    <div className="flex flex-col items-center lg:items-start">
                      <div className="text-2xl font-bold">Zero</div>
                      <div className="text-[10px] text-foreground/40 uppercase font-bold tracking-widest">Tracking</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-border/50 bg-background/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <Image
                  src="/devbox.png"
                  alt="DevBox"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-xl ring-1 ring-border/50 bg-background shadow-sm"
                />
                <h3 className="text-xl font-bold tracking-tight">DevBox</h3>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed mb-6">
                The professional inbox for modern developers. Stay updated without the noise.
              </p>
              <div className="flex gap-4">
                <a href="#" className="p-2 rounded-lg bg-card border border-border/50 text-foreground/50 hover:text-primary hover:border-primary/30 transition-all">
                  <Github className="w-4 h-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-card border border-border/50 text-foreground/50 hover:text-primary hover:border-primary/30 transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-foreground/30">Product</h4>
              <ul className="space-y-4 text-sm text-foreground/50">
                <li><Link href="/inbox" className="hover:text-primary transition-colors">Inbox</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Open Source</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-foreground/30">Community</h4>
              <ul className="space-y-4 text-sm text-foreground/50">
                <li>
                  <a
                    href="https://github.com/aliasgarsogiawala/devbox"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/aliasgarsogiawala/devbox/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    Issues
                  </a>
                </li>
                <li><a href="#" className="hover:text-primary transition-colors">Discord</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm uppercase tracking-widest mb-6 text-foreground/30">Legal</h4>
              <ul className="space-y-4 text-sm text-foreground/50">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-foreground/40 font-medium">
            <p>&copy; 2026 DevBox. All rights reserved. Built with passion for developers.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-foreground/70 transition-colors">System Status</a>
              <a href="#" className="hover:text-foreground/70 transition-colors">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
