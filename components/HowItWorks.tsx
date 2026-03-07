"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Arca joins silently",
    description: "No bots. No permissions. Arca appears as a silent participant and begins listening.",
    mockup: (
      <div className="space-y-3 p-4">
        <div className="flex items-center gap-3 rounded-lg bg-white/5 p-3">
          <div className="flex -space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 ring-2 ring-[#0a0a0a]" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 ring-2 ring-[#0a0a0a]" />
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-400 to-green-600 ring-2 ring-[#0a0a0a]" />
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red ring-2 ring-[#0a0a0a]">
              <span className="text-[10px] font-bold text-white">A</span>
            </div>
          </div>
          <span className="text-xs text-secondary">4 participants</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/5 p-3">
          <div className="h-2 w-2 animate-pulse rounded-full bg-red" />
          <span className="text-xs text-secondary">Arca is listening...</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-white/5 p-3">
          <div className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-xs text-secondary">Recording in progress</span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI extracts what matters",
    description: "Decisions, action items, follow-ups — structured and tagged in real time.",
    mockup: (
      <div className="space-y-2 p-4">
        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-red/20 text-[10px] font-bold text-red">D</span>
          <div>
            <p className="text-xs font-medium text-foreground">Decision</p>
            <p className="text-[11px] text-secondary">Move launch date to March 15th</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-blue-500/20 text-[10px] font-bold text-blue-400">A</span>
          <div>
            <p className="text-xs font-medium text-foreground">Action Item</p>
            <p className="text-[11px] text-secondary">Sarah to finalize design specs by Friday</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-lg bg-white/5 p-3">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded bg-amber-500/20 text-[10px] font-bold text-amber-400">F</span>
          <div>
            <p className="text-xs font-medium text-foreground">Follow-up</p>
            <p className="text-[11px] text-secondary">Check in with eng team re: API timeline</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Summary lands instantly",
    description: "A clean summary hits your inbox before the meeting window closes.",
    mockup: (
      <div className="space-y-2 p-4">
        <div className="rounded-lg bg-white/5 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-red">
                <span className="text-[9px] font-bold text-white">A</span>
              </div>
              <span className="text-xs font-medium text-foreground">Arca Summary</span>
            </div>
            <span className="text-[10px] text-secondary">just now</span>
          </div>
          <div className="mt-2 border-t border-white/5 pt-2">
            <p className="text-xs font-medium text-foreground">Q1 Planning — Summary</p>
            <p className="mt-1 text-[11px] leading-relaxed text-secondary">
              3 decisions made, 5 action items assigned, 2 follow-ups scheduled. Full summary attached.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-red/10 p-2.5">
          <svg className="h-3.5 w-3.5 text-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-[11px] text-red">Delivered to 4 participants</span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="relative py-32 px-8 md:px-16 lg:px-24" ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
        className="mb-20"
      >
        <h2 className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Three steps.
        </h2>
        <h2 className="font-serif text-5xl font-bold tracking-tight text-secondary md:text-7xl">
          Zero effort.
        </h2>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: i * 0.15,
              ease: [0.25, 0.1, 0, 1],
            }}
            className="group relative overflow-hidden rounded-2xl border border-card-border bg-card-bg backdrop-blur-sm transition-all duration-500 hover:border-red/20 hover:bg-white/[0.04]"
          >
            <div className="p-6">
              <span className="text-xs font-medium tracking-[0.3em] text-red">
                {step.number}
              </span>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-secondary">
                {step.description}
              </p>
            </div>

            <div className="border-t border-card-border">
              {step.mockup}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
