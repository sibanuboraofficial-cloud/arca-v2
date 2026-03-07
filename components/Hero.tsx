"use client";

import { motion } from "framer-motion";
import ParticleCanvas from "./ParticleCanvas";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0, 1] as const },
  },
};

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <ParticleCanvas />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full px-8 md:px-16 lg:px-24"
      >
        <div className="max-w-5xl">
          <motion.h1
            variants={fadeUp}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.9] tracking-[-0.02em] text-foreground"
          >
            Your meetings,
          </motion.h1>
          <motion.h1
            variants={fadeUp}
            className="font-serif text-[clamp(3.5rem,10vw,8rem)] font-bold italic leading-[0.9] tracking-[-0.02em] text-red"
          >
            already done.
          </motion.h1>
        </div>

        <motion.div
          variants={fadeUp}
          className="mt-16 flex justify-end"
        >
          <p className="max-w-md text-right text-base leading-relaxed text-secondary md:text-lg">
            Arca captures, summarizes, and delivers action items before you
            close the tab.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          className="mt-12 flex justify-end"
        >
          <a
            href="#waitlist"
            className="group flex items-center gap-3 text-sm text-secondary transition-colors hover:text-foreground"
          >
            <span className="tracking-widest uppercase">Scroll to explore</span>
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-red"
            >
              &#8595;
            </motion.span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
