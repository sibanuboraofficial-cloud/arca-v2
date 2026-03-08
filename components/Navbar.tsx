"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

const links = [
  { label: "Features", href: "#how-it-works" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Pricing", href: "#proof" },
  { label: "Blog", href: "#proof" },
];

const shapes = [
  // Triangle
  <polygon key="tri" points="16,8 24,23 8,23" stroke="#e63946" strokeWidth="1.5" fill="none" strokeLinejoin="round" />,
  // Square
  <rect key="sq" x="10" y="10" width="12" height="12" stroke="#e63946" strokeWidth="1.5" fill="none" rx="0.5" />,
  // Diamond
  <rect key="dia" x="10" y="10" width="12" height="12" stroke="#e63946" strokeWidth="1.5" fill="none" rx="0.5" transform="rotate(45 16 16)" />,
];

function Brandmark() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % 3), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex h-8 w-8 items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14.5" stroke="rgba(230,57,70,0.3)" strokeWidth="1.5" fill="none" />
        <AnimatePresence mode="wait">
          <motion.g
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ originX: "16px", originY: "16px" }}
          >
            {shapes[index]}
          </motion.g>
        </AnimatePresence>
      </svg>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease }}
      className={`fixed top-4 left-0 right-0 z-[1000] flex h-[56px] items-center justify-between px-6 transition-all duration-[400ms] ease-out md:h-[72px] md:px-20 lg:px-28 xl:px-36 ${
        scrolled
          ? "border-b border-white/[0.05] bg-[#050508]/80 backdrop-blur-2xl"
          : ""
      }`}
    >
      {/* Left — brandmark + wordmark */}
      <a href="#" className="flex items-center gap-2.5">
        <Brandmark />
        <span className="text-lg font-bold tracking-[0.25em] text-foreground">
          ARCA
        </span>
      </a>

      {/* Center — pill nav (hidden below lg) */}
      <div className="absolute left-1/2 hidden -translate-x-1/2 items-center rounded-full border border-white/[0.08] bg-white/[0.04] p-1.5 backdrop-blur-xl lg:flex">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="rounded-full px-[18px] py-2 text-[13px] text-white/50 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
          >
            {l.label}
          </a>
        ))}
      </div>

      {/* Right — CTA + mobile menu */}
      <div className="flex items-center gap-4">
        <a
          href="#waitlist"
          className="group relative hidden overflow-hidden rounded-full bg-red px-6 py-2.5 text-[13px] font-medium text-white transition-all duration-500 hover:shadow-[0_0_40px_rgba(230,57,70,0.35)] md:inline-flex"
        >
          <span className="relative z-10">Get Early Access</span>
          <span className="absolute inset-0 bg-white/0 transition-all duration-500 group-hover:bg-white/[0.12]" />
        </a>

        {/* Hamburger — visible below lg */}
        <button className="flex flex-col gap-[5px] lg:hidden" aria-label="Menu">
          <span className="block h-[1.5px] w-5 bg-white/60" />
          <span className="block h-[1.5px] w-5 bg-white/60" />
          <span className="block h-[1.5px] w-3.5 bg-white/60" />
        </button>
      </div>
    </motion.nav>
  );
}
