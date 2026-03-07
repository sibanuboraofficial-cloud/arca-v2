"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

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
    <footer id="waitlist" ref={ref} className="relative border-t border-card-border">
      {/* CTA Section */}
      <div className="px-8 py-32 md:px-16 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="font-serif text-5xl font-bold text-foreground md:text-7xl">
            Join the waitlist
          </h2>
          <p className="mt-6 text-base text-secondary">
            Be the first to experience meetings that handle themselves.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              required
              className="flex-1 rounded-full border border-card-border bg-card-bg px-6 py-3.5 text-sm text-foreground placeholder:text-secondary/50 outline-none transition-all duration-300 focus:border-red/40 focus:ring-1 focus:ring-red/20"
            />
            <button
              type="submit"
              className="rounded-full bg-red px-8 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-red/80 hover:shadow-[0_0_40px_rgba(230,57,70,0.3)]"
            >
              {submitted ? "You're in!" : "Get Early Access"}
            </button>
          </form>

          {submitted && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red"
            >
              Welcome to the waitlist. We&apos;ll be in touch.
            </motion.p>
          )}
        </motion.div>
      </div>

      {/* Bottom footer */}
      <div className="border-t border-card-border px-8 py-8 md:px-16 lg:px-24">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-8">
            <span className="font-serif text-xl font-bold tracking-[0.2em] text-foreground">
              ARCA
            </span>
            <span className="text-xs text-secondary">
              &copy; {new Date().getFullYear()} Arca. Designed by Sibanu Bora.
            </span>
          </div>

          <div className="flex items-center gap-6">
            {["Twitter", "LinkedIn", "GitHub"].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs text-secondary transition-colors duration-300 hover:text-foreground"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
