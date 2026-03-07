"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const links = [
  { label: "How it works", href: "#how-it-works" },
  { label: "Proof", href: "#proof" },
  { label: "Waitlist", href: "#waitlist" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
      className={`fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-8 py-5 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-card-border"
          : ""
      }`}
    >
      <a href="#" className="font-serif text-2xl font-bold tracking-[0.2em] text-foreground">
        ARCA
      </a>

      <div className="hidden md:flex items-center gap-8">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="text-sm text-secondary transition-colors duration-300 hover:text-foreground tracking-wide"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#waitlist"
          className="rounded-full bg-red px-6 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-red/80 hover:shadow-[0_0_30px_rgba(230,57,70,0.3)]"
        >
          Get Early Access
        </a>
      </div>
    </motion.nav>
  );
}
