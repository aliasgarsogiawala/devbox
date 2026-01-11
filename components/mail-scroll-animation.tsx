"use client"

import { useRef, useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Mail, Zap, Shield, Sparkles, Code, Terminal, Cpu } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

export function MailScrollAnimation({ shouldReduceMotion = false }: { shouldReduceMotion?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mailRef = useRef<HTMLDivElement>(null)
  const knowledgeRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!containerRef.current || !mailRef.current || shouldReduceMotion) return

    // 1. Initial State: Center the mail in the hero section
    gsap.set(mailRef.current, {
      xPercent: -50,
      yPercent: -50,
      left: "50%",
      top: "40%", // Slightly above center in hero
      scale: 0.8,
      opacity: 0,
    })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body", // Use body for whole page scroll
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5, // Smoother scrub
      },
    })

    // Animation steps
    tl.to(mailRef.current, {
      opacity: 1,
      scale: 1,
      duration: 0.2, // Fade in quickly at start
    })
    .to(mailRef.current, {
      left: "85%", // Move to right
      top: "25%",
      rotation: 20,
      scale: 0.7,
      duration: 1,
    })
    .to(mailRef.current, {
      left: "15%", // Move to left
      top: "50%",
      rotation: -15,
      scale: 1.1,
      duration: 1,
    })
    .to(mailRef.current, {
      left: "80%", // Move back right
      top: "75%",
      rotation: 10,
      scale: 0.9,
      duration: 1,
    })
    .to(mailRef.current, {
      left: "50%", // Center for the "opening"
      top: "85%",
      rotation: 0,
      scale: 2.5,
      duration: 1,
    })

    // Knowledge elements popping out
    const elements = knowledgeRef.current?.children
    if (elements) {
        tl.fromTo(elements, 
            { scale: 0, opacity: 0, x: 0, y: 0 },
            { 
                scale: 1, 
                opacity: 1, 
                y: (i) => -80 - (i * 30), 
                x: (i) => {
                    const angle = (i / (elements.length - 1)) * Math.PI - Math.PI/2;
                    return Math.sin(angle) * 150;
                },
                stagger: 0.05,
                duration: 0.5,
                ease: "back.out(1.7)"
            },
            "-=0.2" // Start slightly before the mail finishes scaling
        )
    }

    // Final fade out at the very end of page
    tl.to(mailRef.current, {
      opacity: 0,
      scale: 3,
      duration: 0.5
    }, ">+=0.2")

  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40]">
      <div 
        ref={mailRef} 
        className="absolute text-primary"
        style={{ willChange: "transform, left, top" }}
      >
        <div className="relative">
            <Mail className="w-16 h-16 md:w-24 md:h-24 drop-shadow-[0_0_25px_rgba(var(--primary),0.4)]" />
            
            <div ref={knowledgeRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="absolute"><Zap className="w-6 h-6 text-yellow-400" /></div>
                <div className="absolute"><Shield className="w-6 h-6 text-blue-400" /></div>
                <div className="absolute"><Sparkles className="w-6 h-6 text-purple-400" /></div>
                <div className="absolute"><Code className="w-6 h-6 text-emerald-400" /></div>
                <div className="absolute"><Terminal className="w-6 h-6 text-zinc-400" /></div>
                <div className="absolute"><Cpu className="w-6 h-6 text-red-400" /></div>
            </div>
        </div>
      </div>
    </div>
  )
}
