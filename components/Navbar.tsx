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
  <polygon key="tri" points="8,2 14,13 2,13" stroke="#e63946" strokeWidth="1.5" fill="none" strokeLinejoin="round" />,
  // Square
  <rect key="sq" x="2" y="2" width="12" height="12" stroke="#e63946" strokeWidth="1.5" fill="none" rx="0.5" />,
  // Diamond
  <rect key="dia" x="2" y="2" width="12" height="12" stroke="#e63946" strokeWidth="1.5" fill="none" rx="0.5" transform="rotate(45 8 8)" />,
];

function Brandmark({ fast }: { fast?: boolean }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % 3), fast ? 600 : 2500);
    return () => clearInterval(id);
  }, [fast]);

  return (
    <div className="relative flex h-8 w-8 items-center justify-center">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="absolute inset-0">
        <circle cx="16" cy="16" r="14.5" stroke="rgba(230,57,70,0.3)" strokeWidth="1.5" fill="none" />
      </svg>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: fast ? 0.15 : 0.4, ease: "easeOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformOrigin: "center center" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            {shapes[index]}
          </svg>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);

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
      <a
        href="#"
        className="flex items-center gap-2.5"
        onMouseEnter={() => setBrandHovered(true)}
        onMouseLeave={() => setBrandHovered(false)}
      >
        <Brandmark fast={brandHovered} />
        <span
          className="text-lg font-bold tracking-[0.25em] text-foreground"
          style={{
            transition: "text-shadow 0.3s ease",
            textShadow: brandHovered ? "0 0 10px rgba(230,57,70,0.3)" : "none",
          }}
        >
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
          className="btn-shine hidden rounded-full px-6 py-2.5 text-[13px] font-medium text-white md:inline-flex"
          style={{
            backgroundColor: "#e63946",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ef4454";
            e.currentTarget.style.boxShadow = "0 0 20px rgba(230,57,70,0.3)";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#e63946";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          <span className="relative z-10">Get Early Access</span>
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
