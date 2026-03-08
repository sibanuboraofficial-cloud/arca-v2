"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <footer
      id="waitlist"
      ref={ref}
      className="relative z-[1] border-t border-white/[0.04]"
    >
      <div className="px-8 py-36 md:px-16 md:py-44 lg:px-24 xl:px-32">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease }}
          className="mx-auto max-w-3xl text-center"
        >
          <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-muted/50">
            Early access
          </span>

          <h2 className="mt-8 font-serif text-5xl font-bold leading-[0.9] tracking-tight text-foreground md:text-7xl lg:text-8xl">
            Join the
            <br />
            <span className="italic text-red">waitlist.</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md text-base leading-[1.8] text-muted/60">
            Be the first to experience meetings that handle themselves.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-12 flex max-w-lg flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 rounded-full border border-white/[0.06] bg-white/[0.03] px-6 py-4 text-sm text-foreground backdrop-blur-xl placeholder:text-muted/30 outline-none transition-all duration-500 focus:border-red/30 focus:bg-white/[0.05] focus:shadow-[0_0_40px_rgba(230,57,70,0.08)]"
            />
            <button
              type="submit"
              className="group relative overflow-hidden rounded-full bg-red px-8 py-4 text-sm font-medium text-white transition-all duration-500 hover:shadow-[0_0_50px_rgba(230,57,70,0.4)]"
            >
              <span className="relative z-10">
                {submitted ? "You\u2019re in" : "Get Early Access"}
              </span>
              <span className="absolute inset-0 bg-white/0 transition duration-500 group-hover:bg-white/[0.12]" />
            </button>
          </form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="mt-6 text-sm text-red/80"
            >
              Welcome to the waitlist. We&apos;ll be in touch.
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04] px-8 py-8 md:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-8">
            <span className="font-serif text-lg font-bold tracking-[0.25em] text-foreground/70">
              ARCA
            </span>
            <span className="text-[11px] text-muted/30">
              &copy; {new Date().getFullYear()} Arca. Designed by Sibanu Bora.
            </span>
          </div>
          <div className="flex items-center gap-8">
            {["Twitter", "LinkedIn", "GitHub"].map((s) => (
              <a
                key={s}
                href="#"
                className="text-[11px] uppercase tracking-[0.15em] text-muted/30 transition-colors duration-500 hover:text-foreground"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
