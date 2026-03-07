"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const logos = [
  "Notion", "Linear", "Figma", "Vercel", "Stripe", "Slack", "Loom", "Arc",
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => {
    if (target >= 1000) return Math.floor(v).toLocaleString();
    if (target % 1 !== 0) return v.toFixed(1);
    return Math.floor(v).toString();
  });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, target, {
      duration: 2,
      ease: [0.25, 0.1, 0, 1],
    });
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, target, count, rounded]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

const stats = [
  { value: 10000, suffix: "+", label: "Meetings summarized" },
  { value: 4.2, suffix: " hrs", label: "Saved per week" },
  { value: 98, suffix: "%", label: "Accuracy rate" },
];

const testimonials = [
  {
    quote: "Arca replaced our entire meeting notes workflow. It's like having a chief of staff in every call.",
    author: "Jamie Chen",
    role: "Head of Product, Skyline",
  },
  {
    quote: "I used to spend 30 minutes after every meeting writing summaries. Now I just close the tab.",
    author: "Marcus Webb",
    role: "Engineering Lead, Oxide",
  },
  {
    quote: "The action items are scarily accurate. It catches things I missed live.",
    author: "Priya Sharma",
    role: "CEO, Lumina Labs",
  },
];

function LogoMark({ name }: { name: string }) {
  return (
    <div className="flex h-12 items-center justify-center px-10">
      <span className="whitespace-nowrap text-lg font-medium tracking-wide text-secondary/40 transition-colors duration-300 hover:text-secondary">
        {name}
      </span>
    </div>
  );
}

export default function StatsAndProof() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="proof" className="relative py-32" ref={ref}>
      {/* Logo ticker */}
      <div className="mb-24 overflow-hidden border-y border-card-border py-8">
        <div className="flex w-max" style={{ animation: "ticker 20s linear infinite" }}>
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <LogoMark key={`${logo}-${i}`} name={logo} />
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="px-8 md:px-16 lg:px-24">
        <div className="grid gap-8 md:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.25, 0.1, 0, 1] }}
              className="text-center"
            >
              <div className="font-serif text-6xl font-bold text-foreground md:text-7xl">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-sm tracking-wide text-secondary">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-24 px-8 md:px-16 lg:px-24">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-12 text-xs font-medium uppercase tracking-[0.3em] text-secondary"
        >
          What people are saying
        </motion.p>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 + i * 0.12, ease: [0.25, 0.1, 0, 1] }}
              className="rounded-2xl border border-card-border bg-card-bg p-8 transition-all duration-500 hover:border-red/20"
            >
              <p className="text-base leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="mt-6 border-t border-card-border pt-4">
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-xs text-secondary">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
