"use client";

import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

interface Step {
  number: string;
  title: string;
  description: string;
  mockup: ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Arca joins silently",
    description:
      "No bots. No permissions. Arca appears as a silent participant and begins listening.",
    mockup: (
      <div className="space-y-2.5 p-5">
        <div className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.04]">
          <div className="flex -space-x-2">
            {[
              "from-blue-400 to-blue-600",
              "from-purple-400 to-purple-600",
              "from-green-400 to-green-600",
            ].map((g, i) => (
              <div
                key={i}
                className={`h-7 w-7 rounded-full bg-gradient-to-br ${g} ring-2 ring-[#050508]`}
              />
            ))}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red ring-2 ring-[#050508]">
              <span className="text-[9px] font-bold text-white">A</span>
            </div>
          </div>
          <span className="text-[11px] text-muted/60">4 participants</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.04]">
          <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" />
          <span className="text-[11px] text-muted/60">
            Arca is listening...
          </span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.04]">
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-[11px] text-muted/60">
            Recording in progress
          </span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "AI extracts what matters",
    description:
      "Decisions, action items, follow-ups — structured and tagged in real time.",
    mockup: (
      <div className="space-y-2 p-5">
        {[
          { tag: "D", label: "Decision", text: "Move launch to March 15th", color: "bg-red/15 text-red" },
          { tag: "A", label: "Action Item", text: "Sarah — finalize specs by Friday", color: "bg-blue-500/15 text-blue-400" },
          { tag: "F", label: "Follow-up", text: "Check in with eng re: API", color: "bg-amber-500/15 text-amber-400" },
        ].map((item) => (
          <div
            key={item.tag}
            className="flex items-start gap-3 rounded-xl bg-white/[0.03] p-3 ring-1 ring-inset ring-white/[0.04]"
          >
            <span
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-bold ${item.color}`}
            >
              {item.tag}
            </span>
            <div>
              <p className="text-[11px] font-medium text-foreground">
                {item.label}
              </p>
              <p className="mt-0.5 text-[11px] leading-relaxed text-muted/50">
                {item.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "03",
    title: "Summary lands instantly",
    description:
      "A clean summary hits your inbox before the meeting window closes.",
    mockup: (
      <div className="space-y-2 p-5">
        <div className="rounded-xl bg-white/[0.03] p-4 ring-1 ring-inset ring-white/[0.04]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-md bg-red">
                <span className="text-[8px] font-bold text-white">A</span>
              </div>
              <span className="text-[11px] font-medium text-foreground">
                Arca Summary
              </span>
            </div>
            <span className="text-[10px] text-muted/40">just now</span>
          </div>
          <div className="mt-3 border-t border-white/[0.04] pt-3">
            <p className="text-[11px] font-medium text-foreground">
              Q1 Planning — Summary
            </p>
            <p className="mt-1 text-[10px] leading-[1.7] text-muted/50">
              3 decisions · 5 action items · 2 follow-ups
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-red/[0.06] p-3 ring-1 ring-inset ring-red/10">
          <svg
            className="h-3.5 w-3.5 text-red"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-[11px] text-red/80">
            Delivered to 4 participants
          </span>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative px-8 py-36 md:px-16 md:py-44 lg:px-24 xl:px-32"
    >
      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease }}
        className="mb-6 block text-[11px] font-medium uppercase tracking-[0.3em] text-muted/50"
      >
        How it works
      </motion.span>

      {/* Headline */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, ease }}
        className="mb-24"
      >
        <h2 className="font-serif text-5xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
          Three steps.
        </h2>
        <h2 className="font-serif text-5xl font-bold italic tracking-tight text-red/80 md:text-7xl lg:text-8xl">
          Zero effort.
        </h2>
      </motion.div>

      {/* Cards */}
      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.15 + i * 0.12, ease }}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-red/20 hover:bg-white/[0.04] hover:shadow-[0_8px_80px_rgba(230,57,70,0.06),inset_0_1px_0_rgba(255,255,255,0.04)]"
          >
            <div className="p-7">
              {/* Glowing number badge */}
              <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-red/10 text-[11px] font-bold tracking-[0.2em] text-red shadow-[0_0_20px_rgba(230,57,70,0.15)]">
                {step.number}
              </div>
              <h3 className="font-serif text-xl font-semibold leading-tight text-foreground md:text-2xl">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-[1.8] text-muted/60">
                {step.description}
              </p>
            </div>
            <div className="border-t border-white/[0.04]">{step.mockup}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
