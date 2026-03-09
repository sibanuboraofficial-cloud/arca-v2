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
          <svg className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[13px] font-semibold tracking-[-0.01em] text-white">Summary sent</p>
        <p className="text-[11px] text-white/40">Delivered to inbox</p>
        <p className="text-[10px] text-white/25">Just now</p>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="flex flex-col items-center gap-2.5 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red/15">
          <div className="h-3 w-3 animate-pulse rounded-full bg-red" />
        </div>
        <p className="text-[13px] font-semibold tracking-[-0.01em] text-white">Recording</p>
        <div className="flex items-end gap-[3px]">
          {[
            { anim: "audio-bar-1", dur: "1.2s" },
            { anim: "audio-bar-2", dur: "0.9s" },
            { anim: "audio-bar-3", dur: "1.1s" },
            { anim: "audio-bar-4", dur: "1.0s" },
            { anim: "audio-bar-5", dur: "1.3s" },
          ].map((bar, i) => (
            <div
              key={i}
              className="w-[2px] rounded-full"
              style={{
                height: "16px",
                backgroundColor: "rgba(230,57,70,0.6)",
                animation: `${bar.anim} ${bar.dur} ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        <p className="font-mono text-[13px] font-bold tracking-tight text-white/40">00:34:12</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex items-baseline gap-1">
        <span className="font-sans text-[32px] font-bold leading-none tracking-tight text-white">4.2</span>
        <span className="text-[16px] font-bold tracking-tight text-red">hrs</span>
      </div>
      <p className="text-[11px] text-white/40">saved this week</p>
      <p className="text-[11px] font-bold text-green-500">&#9650; 12%</p>
    </div>
  );
}

function ProductCard() {
  const [activeWidget, setActiveWidget] = useState(0);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveWidget((prev) => (prev + 1) % 3);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const cursorX = (x - 0.5) * 2; // -1 to 1
    const cursorY = (y - 0.5) * 2; // -1 to 1
    setTilt({ rx: -cursorY * 7, ry: cursorX * 7 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9, ease, delay: 0.8 }}
      className="w-full shrink-0 px-4 md:max-w-[576px] md:w-[52.8%] md:px-0"
      style={{ perspective: "1000px" }}
    >
      <div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovered
            ? "transform 0.1s ease-out"
            : "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="glow-border"
          style={{
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.3), 0 12px 48px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
        <div className="glow-border-inner overflow-hidden">

        <div className="flex flex-col md:flex-row">
          {/* Left side — main content */}
          <div className="p-6 md:w-[60%]">
            {/* Header */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase text-white/30" style={{ letterSpacing: "2.5px" }}>
                Meeting Summary
              </span>
              <div className="flex items-center gap-1 rounded-full px-2 py-[2px]" style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.15)" }}>
                <span className="relative flex" style={{ width: 5, height: 5 }}>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-50" />
                  <span className="relative inline-flex rounded-full bg-green-500" style={{ width: 5, height: 5 }} />
                </span>
                <span className="text-[9px] font-semibold uppercase text-green-500" style={{ letterSpacing: "1.5px" }}>
                  Live
                </span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 flex items-center gap-2">
              <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className="relative h-full rounded-full"
                  style={{ width: "78%", background: "linear-gradient(90deg, rgba(230,57,70,0.6), rgba(230,57,70,0.8))" }}
                >
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                      animation: "progress-shimmer 3s ease-in-out infinite",
                    }}
                  />
                </div>
              </div>
              <span className="text-[10px] text-white/20">78%</span>
            </div>

            {/* Meeting info */}
            <div className="mt-4 flex items-center gap-2">
              <p className="text-[16px] font-semibold tracking-[-0.01em] text-white">
                Q1 Planning — Product Standup
              </p>
              <span
                className="shrink-0 rounded text-[8px] font-semibold uppercase"
                style={{
                  padding: "1px 6px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.4)",
                  letterSpacing: "1px",
                }}
              >
                Product
              </span>
            </div>
            <p className="mt-0.5 text-[12px] text-white/35">
              Today, 2:30 PM &middot; 45 min
            </p>

            {/* Divider */}
            <div className="my-4 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)" }} />

            {/* Extracted items */}
            <div className="flex flex-col gap-1.5">
              {items.map((item, idx) => (
                <div
                  key={item.label}
                  className="group/item rounded-lg border-l-2 border-l-transparent px-3 py-2.5 transition-all duration-200 hover:border-l-white/[0.08] hover:bg-white/[0.03]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-1.5 w-1.5 shrink-0 rounded-full ${item.color}`}
                      style={{
                        boxShadow: item.color === "bg-red"
                          ? "0 0 6px rgba(230,57,70,0.3)"
                          : item.color === "bg-green-500"
                          ? "0 0 6px rgba(34,197,94,0.3)"
                          : "0 0 6px rgba(245,158,11,0.3)",
                      }}
                    />
                    <span
                      className={`text-[9px] font-semibold uppercase ${item.textColor}`}
                      style={{ letterSpacing: "2px" }}
                    >
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-0.5 pl-[14px] text-[12px] leading-[1.5] text-white/[0.55] transition-colors duration-200 group-hover/item:text-white/70">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Delivery confirmation */}
            <div
              className="mt-4 flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <svg
                className="h-3 w-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-[12px] font-semibold" style={{ color: "rgba(34,197,94,0.6)" }}>
                Delivered to 4 participants
              </span>
            </div>
          </div>

          {/* Right side — rotating sidebar (hidden on mobile) */}
          <div className="hidden items-center justify-center p-4 md:flex md:w-[40%] md:p-6" style={{ borderLeft: "1px solid transparent", borderImage: "linear-gradient(180deg, transparent, rgba(255,255,255,0.06), transparent) 1" }}>
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
      </div>
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
        {/* Circle 1 — 600px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute rounded-full" style={{ width: 6, height: 6, top: 0, left: "50%", transform: "translateX(-50%) translateY(-50%)", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Circle 2 — 1000px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1000,
            height: 1000,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div className="absolute rounded-full" style={{ width: 6, height: 6, top: "50%", right: 0, transform: "translateX(50%) translateY(-50%)", background: "rgba(255,255,255,0.2)" }} />
          <div className="absolute rounded-full" style={{ width: 6, height: 6, bottom: "15%", left: "8%", transform: "translate(-50%, 50%)", background: "rgba(255,255,255,0.2)" }} />
        </div>

        {/* Circle 3 — 1500px */}
        <div
          className="absolute rounded-full"
          style={{
            width: 1500,
            height: 1500,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
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

      {/* Corner plus shapes */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {([
          { top: 40, left: 40 },
          { top: 40, right: 40 },
          { bottom: 112, left: 40 },
          { bottom: 112, right: 40 },
        ] as const).map((pos, i) => (
          <div
            key={i}
            className="absolute"
            style={pos}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <line x1="12" y1="2" x2="12" y2="22" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
              <line x1="2" y1="12" x2="22" y2="12" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" />
            </svg>
          </div>
        ))}
      </div>

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
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#e63946">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
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
              className="btn-shine rounded-full px-8 py-3.5 text-center text-sm font-medium text-white"
              style={{
                backgroundColor: "#e63946",
                boxShadow: "0 0 20px rgba(230,57,70,0.3)",
                transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ef4454";
                e.currentTarget.style.boxShadow = "0 0 40px rgba(230,57,70,0.5), 0 0 80px rgba(230,57,70,0.2)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#e63946";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(230,57,70,0.3)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span className="relative z-10">Get Early Access</span>
            </a>
            <a
              href="#how-it-works"
              className="btn-shine btn-shine-subtle rounded-full border px-8 py-3.5 text-center text-sm font-medium backdrop-blur-xl"
              style={{
                borderColor: "rgba(255,255,255,0.15)",
                backgroundColor: "transparent",
                color: "rgba(240,236,228,0.8)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.color = "#ffffff";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.05)";
                e.currentTarget.style.transform = "scale(1.03)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = "rgba(240,236,228,0.8)";
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              <span className="relative z-10">See how it works</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Right — product card */}
        <ProductCard />
      </div>

      {/* Bottom stack: scroll indicator + logo ticker */}
      <div className="absolute bottom-0 left-0 right-0 z-[2] flex flex-col items-center">
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="flex scale-75 flex-col items-center md:scale-100"
        >
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

        {/* 32px spacing */}
        <div className="h-8" />

        {/* Logo ticker */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="w-full overflow-hidden border-t border-b border-white/[0.06] py-6"
        >
          <div className="flex w-max" style={{ animation: "ticker 25s linear infinite" }}>
            {Array.from({ length: 4 }).flatMap((_, setIndex) =>
              ["Notion", "Linear", "Figma", "Vercel", "Stripe", "Slack", "Loom", "Arc"].map(
                (name, i) => (
                  <span
                    key={`${setIndex}-${i}`}
                    className="shrink-0 px-[35px] text-[13px] font-medium uppercase"
                    style={{ letterSpacing: "3px", color: "rgba(255,255,255,0.2)" }}
                  >
                    {name}
                  </span>
                )
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
