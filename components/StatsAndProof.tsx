"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ---- Animated Counter (spring physics) ---- */

function Counter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const raw = useMotionValue(0);
  const spring = useSpring(raw, { stiffness: 40, damping: 28, restDelta: 0.01 });
  const display = useTransform(spring, (v) => {
    if (target >= 1000) return Math.floor(v).toLocaleString();
    if (target % 1 !== 0) return v.toFixed(1);
    return Math.floor(v).toString();
  });
  const [text, setText] = useState("0");

  useEffect(() => {
    if (!inView) return;
    raw.set(target);
    const unsub = display.on("change", (v) => setText(v));
    return () => unsub();
  }, [inView, target, raw, display]);

  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

/* ---- Data ---- */

const logos = [
  "Notion",
  "Linear",
  "Figma",
  "Vercel",
  "Stripe",
  "Slack",
  "Loom",
  "Arc",
];

const stats = [
  { value: 10000, suffix: "+", label: "Meetings summarized" },
  { value: 4.2, suffix: " hrs", label: "Saved per user / week" },
  { value: 98, suffix: "%", label: "Accuracy rate" },
];

const testimonials = [
  {
    quote:
      "Arca replaced our entire meeting notes workflow. It\u2019s like having a chief of staff in every call.",
    author: "Jamie Chen",
    role: "Head of Product, Skyline",
  },
  {
    quote:
      "I used to spend 30 minutes after every meeting writing summaries. Now I just close the tab.",
    author: "Marcus Webb",
    role: "Engineering Lead, Oxide",
  },
  {
    quote:
      "The action items are scarily accurate. It catches things I missed live.",
    author: "Priya Sharma",
    role: "CEO, Lumina Labs",
  },
];

/* ---- Component ---- */

export default function StatsAndProof() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });
  const testRef = useRef(null);
  const testInView = useInView(testRef, { once: true, margin: "-80px" });

  return (
    <section id="proof" className="relative py-36 md:py-44">
      {/* Logo ticker */}
      <div className="mb-32 overflow-hidden border-y border-white/[0.04] py-7">
        <div
          className="flex w-max"
          style={{ animation: "ticker 30s linear infinite" }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((name, i) => (
            <div key={`${name}-${i}`} className="flex items-center justify-center px-12">
              <span className="whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.2em] text-white/[0.12] transition-colors duration-500 hover:text-white/[0.3]">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div ref={statsRef} className="px-8 md:px-16 lg:px-24 xl:px-32">
        <motion.span
          initial={{ opacity: 0 }}
          animate={statsInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-16 block text-[11px] font-medium uppercase tracking-[0.3em] text-muted/50"
        >
          By the numbers
        </motion.span>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 40 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
            >
              <div className="font-serif text-6xl font-bold tracking-tight text-foreground md:text-7xl lg:text-8xl">
                <Counter target={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-4 text-sm text-muted/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div ref={testRef} className="mt-36 px-8 md:mt-44 md:px-16 lg:px-24 xl:px-32">
        <motion.span
          initial={{ opacity: 0 }}
          animate={testInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease }}
          className="mb-16 block text-[11px] font-medium uppercase tracking-[0.3em] text-muted/50"
        >
          What people are saying
        </motion.span>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              animate={testInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.1 + i * 0.12, ease }}
              className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-700 hover:scale-[1.02] hover:border-red/20 hover:bg-white/[0.04] hover:shadow-[0_8px_80px_rgba(230,57,70,0.06),inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              {/* Quote mark */}
              <span className="mb-4 block font-serif text-3xl leading-none text-red/30">
                &ldquo;
              </span>
              <p className="text-[15px] leading-[1.8] text-foreground/80">
                {t.quote}
              </p>
              <div className="mt-8 border-t border-white/[0.04] pt-5">
                <p className="text-sm font-medium text-foreground">
                  {t.author}
                </p>
                <p className="mt-0.5 text-xs text-muted/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
