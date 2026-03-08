"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ShaderAnimation } from "./ui/shader-animation";

const ease = [0.16, 1, 0.3, 1] as const;

const rise = (delay: number) => ({
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease, delay },
  },
});

const items = [
  {
    color: "bg-red",
    borderColor: "hover:border-l-red",
    textColor: "text-red",
    label: "Decision",
    text: "Ship v2.1 release by Friday EOD",
  },
  {
    color: "bg-green-500",
    borderColor: "hover:border-l-green-500",
    textColor: "text-green-500",
    label: "Action Item",
    text: "@maya — Update roadmap with Q2 priorities",
  },
  {
    color: "bg-amber-500",
    borderColor: "hover:border-l-amber-500",
    textColor: "text-amber-500",
    label: "Follow-up",
    text: "Sync with eng team Monday re: API timeline",
  },
];

function SidebarWidget({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/15">
          <svg className="h-6 w-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[14px] font-medium text-white">Summary sent</p>
        <p className="text-[11px] text-white/50">Delivered to inbox</p>
        <p className="text-[10px] text-white/30">Just now</p>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/15">
          <div className="h-3 w-3 animate-pulse rounded-full bg-red" />
        </div>
        <p className="text-[14px] font-medium text-white">Recording</p>
        <div className="flex items-end gap-1">
          {[
            { anim: "audio-bar-1", dur: "1.2s" },
            { anim: "audio-bar-2", dur: "0.9s" },
            { anim: "audio-bar-3", dur: "1.1s" },
            { anim: "audio-bar-4", dur: "1.0s" },
            { anim: "audio-bar-5", dur: "1.3s" },
          ].map((bar, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: "16px",
                backgroundColor: "rgba(230,57,70,0.6)",
                animation: `${bar.anim} ${bar.dur} ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <p className="font-mono text-[13px] text-white/50">00:34:12</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex items-baseline gap-1">
        <span className="font-serif text-[32px] font-bold leading-none text-white">4.2</span>
        <span className="text-[16px] font-semibold text-red">hrs</span>
      </div>
      <p className="text-[11px] text-white/50">saved this week</p>
      <p className="text-[11px] font-semibold text-green-500">&#9650; 12%</p>
    </div>
  );
}

function ProductCard() {
  const [activeWidget, setActiveWidget] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWidget((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.8 }}
      className="w-full shrink-0 px-4 md:max-w-[576px] md:w-[52.8%] md:px-0"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.02 }}
        className="glow-border transition-all duration-700 ease-in-out hover:shadow-[0_0_30px_rgba(230,57,70,0.2),0_0_60px_rgba(230,57,70,0.1),0_8px_40px_rgba(0,0,0,0.5)]"
        style={{
          boxShadow:
            "0 0 20px rgba(230,57,70,0.1), 0 0 40px rgba(230,57,70,0.05), 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        <div className="glow-border-inner overflow-hidden">

        <div className="flex flex-col md:flex-row">
          {/* Left side — main content */}
          <div className="p-5 md:p-7 md:w-[60%]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-white/40">
                Meeting Summary
              </span>
              <div className="flex items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
                </span>
                <span className="text-[11px] font-medium text-green-500">
                  Live
                </span>
              </div>
            </div>

            {/* Meeting info */}
            <p className="mt-4 text-[17px] font-semibold text-foreground">
              Q1 Planning — Product Standup
            </p>
            <p className="mt-1.5 text-xs text-muted/60">
              Today, 2:30 PM &middot; 45 min
            </p>

            {/* Divider */}
            <div className="my-5 h-px bg-white/[0.05]" />

            {/* Extracted items */}
            <div className="space-y-1.5">
              {items.map((item) => (
                <div
                  key={item.label}
                  className={`group/item rounded-lg border-l-2 border-l-transparent px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.05] ${item.borderColor}`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2 w-2 shrink-0 rounded-full ${item.color}`}
                    />
                    <span
                      className={`text-[11px] font-semibold uppercase tracking-wide ${item.textColor}`}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-0.5 pl-4 text-[14px] leading-[1.6] text-white/70 transition-colors duration-200 group-hover/item:text-white">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery confirmation */}
            <div className="mt-5 flex items-center gap-2 rounded-xl bg-green-500/[0.1] px-4 py-3">
              <svg
                className="h-3.5 w-3.5 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xs font-medium text-green-500">
                Delivered to 4 participants
              </span>
            </div>
          </div>

          {/* Right side — rotating sidebar (hidden on mobile) */}
          <div className="hidden items-center justify-center border-t border-white/[0.06] p-4 md:flex md:w-[40%] md:border-l md:border-t-0 md:p-6">
            <div className="relative h-[110px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeWidget}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <SidebarWidget index={activeWidget} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Shader background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <ShaderAnimation />
      </motion.div>

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, rgba(5,5,8,0.85) 0%, rgba(5,5,8,0.7) 50%, rgba(5,5,8,0.6) 100%)",
        }}
      />

      {/* ── Concentric orbital system ── */}
      <div
        className="pointer-events-none absolute z-[1] hidden md:block"
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          animation: "orbit-center 120s linear infinite",
        }}
      >
        {/* Circle 1 — 500px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 500,
            height: 500,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Dot — top center */}
          <div className="absolute rounded-full" style={{ width: 6, height: 6, top: 0, left: "50%", transform: "translateX(-50%) translateY(-50%)", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Circle 2 — 800px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 800,
            height: 800,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {/* Dot — right center */}
          <div className="absolute rounded-full" style={{ width: 6, height: 6, top: "50%", right: 0, transform: "translateX(50%) translateY(-50%)", background: "rgba(255,255,255,0.2)" }} />
          {/* Dot — bottom-left */}
          <div className="absolute rounded-full" style={{ width: 6, height: 6, bottom: "15%", left: "8%", transform: "translate(-50%, 50%)", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Circle 3 — 1200px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1200,
            height: 1200,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          {/* Dot — bottom-right */}
          <div className="absolute rounded-full" style={{ width: 6, height: 6, bottom: "18%", right: "6%", transform: "translate(50%, 50%)", background: "rgba(255,255,255,0.2)" }} />
        </div>
      </div>

      {/* Crosshair plus marks */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div
          className="absolute"
          style={{ left: "5%", top: "55%", animation: "float-slow 20s ease-in-out infinite" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </svg>
        </div>
        <div
          className="absolute"
          style={{ right: "8%", top: "60%", animation: "float-slow 17s ease-in-out 2s infinite" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="1" x2="7" y2="13" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
            <line x1="1" y1="7" x2="13" y2="7" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Small accent dots */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute rounded-full" style={{ width: 3, height: 3, top: "25%", left: "8%", background: "rgba(255,255,255,0.08)", animation: "float-slow 22s ease-in-out infinite" }} />
        <div className="absolute rounded-full" style={{ width: 3, height: 3, top: "70%", right: "5%", background: "rgba(255,255,255,0.08)", animation: "float-slow 19s ease-in-out 3s infinite" }} />
        <div className="absolute rounded-full" style={{ width: 3, height: 3, bottom: "18%", left: "15%", background: "rgba(255,255,255,0.08)", animation: "float-slow 25s ease-in-out 1s infinite" }} />
      </div>

      {/* Radial glow behind headline */}
      <div
        className="pointer-events-none absolute left-[-10%] top-[20%] z-[1] h-[600px] w-[600px]"
        style={{
          background:
            "radial-gradient(circle, rgba(230,57,70,0.06) 0%, rgba(88,28,135,0.03) 40%, transparent 70%)",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-[2] flex w-full flex-col items-center gap-10 px-6 md:flex-row md:justify-between md:gap-12 md:px-20 lg:px-28 xl:px-36">
        {/* Left — text content */}
        <motion.div
          initial="hidden"
          animate="show"
          className="w-full pt-20 md:w-[55%] md:pt-0"
        >
          {/* Social proof pill */}
          <motion.div
            variants={rise(0.1)}
            className="mb-8 flex w-fit items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1.5 backdrop-blur-xl md:mb-10 md:gap-3 md:px-5 md:py-2"
          >
            <div className="flex">
              {["SB", "MK", "JC", "AP"].map((initials, i) => (
                <div
                  key={initials}
                  className={`relative flex h-[28px] w-[28px] items-center justify-center rounded-full text-[10px] font-semibold md:h-[34px] md:w-[34px] md:text-[11px]${i > 0 ? " -ml-2.5 md:-ml-3" : ""}`}
                  style={{
                    zIndex: (i + 1) * 10,
                    backgroundColor: "#1a1a1a",
                    border: `1.5px solid rgba(230,57,70,${i === 3 ? "0.7" : "0.5"})`,
                    color: "rgba(230,57,70,0.8)",
                    boxShadow: i === 3
                      ? "0 0 0 3px #050508, 0 0 10px rgba(230,57,70,0.15)"
                      : "0 0 0 3px #050508",
                  }}
                >
                  {initials}
                </div>
              ))}
            </div>
            <span className="text-xs text-muted">
              Join <span className="text-foreground">10,000+</span> teams
            </span>
          </motion.div>

          {/* Headline */}
          <div>
            <div className="overflow-visible">
              <motion.h1
                variants={rise(0.25)}
                className="font-serif text-[clamp(36px,8vw,90px)] font-bold leading-[1.15] tracking-[-0.03em] text-foreground"
              >
                Your meetings,
              </motion.h1>
            </div>
            <div className="overflow-visible">
              <motion.h1
                variants={rise(0.4)}
                className="pb-2 font-serif text-[clamp(36px,8vw,90px)] font-bold italic leading-[1.15] tracking-[-0.03em] text-red"
              >
                already done.
              </motion.h1>
            </div>
          </div>

          {/* Subtitle */}
          <motion.p
            variants={rise(0.55)}
            className="mt-6 max-w-md text-sm leading-[1.8] text-muted md:mt-8 md:text-lg"
          >
            Arca captures, summarizes, and delivers action items — before you
            close the tab.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={rise(0.7)}
            className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10"
          >
            <a
              href="#waitlist"
              className="group relative overflow-hidden rounded-full bg-red px-8 py-3.5 text-center text-sm font-medium text-white shadow-[0_0_30px_rgba(230,57,70,0.4)] transition-all duration-500 hover:shadow-[0_0_50px_rgba(230,57,70,0.6)]"
            >
              <span className="relative z-10">Get Early Access</span>
              <span className="absolute inset-0 bg-white/0 transition duration-500 group-hover:bg-white/[0.12]" />
            </a>
            <a
              href="#how-it-works"
              className="rounded-full border border-white/[0.1] bg-white/[0.03] px-8 py-3.5 text-center text-sm font-medium text-foreground/80 backdrop-blur-xl transition-all duration-500 hover:border-white/[0.2] hover:bg-white/[0.06]"
            >
              See how it works
            </a>
          </motion.div>
        </motion.div>

        {/* Right — product card */}
        <ProductCard />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 z-[2] flex -translate-x-1/2 scale-75 flex-col items-center md:scale-100"
      >
        <span
          className="mb-2 text-[10px] font-medium uppercase"
          style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.25)" }}
        >
          Scroll
        </span>
        <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
          <rect x="1" y="1" width="22" height="34" rx="11" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          <line x1="12" y1="8" x2="12" y2="14" stroke="rgba(230,57,70,0.6)" strokeWidth="1.5" strokeLinecap="round" style={{ animation: "scroll-wheel 1.8s ease-in-out infinite" }} />
        </svg>
        <svg
          className="mt-1"
          width="16"
          height="8"
          viewBox="0 0 16 8"
          fill="none"
          style={{ animation: "bounce-down 1.5s ease-in-out infinite" }}
        >
          <path d="M1 1L8 7L15 1" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </motion.div>
    </section>
  );
}
