"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/content/site";
import { AgentPipeline } from "./agent-pipeline";

/** Scattered stack chips — the techy answer to the reference site's desk objects. */
const chips = [
  { label: "LangGraph", className: "top-30 left-[3%]", delay: 0 },
  { label: "MCP", className: "top-44 right-[5%]", delay: 0.6 },
  { label: "Databricks Vector Search", className: "top-72 left-[6%]", delay: 1.2 },
  { label: "Claude Opus", className: "top-64 right-[3%]", delay: 0.3 },
  { label: "RAGAS", className: "top-[26rem] left-[2%]", delay: 0.9 },
  { label: "LLM-as-Judge", className: "top-[27rem] right-[7%]", delay: 1.5 },
];

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-line px-4 pt-32 pb-16 sm:pt-40 sm:pb-24"
    >
      {/* graph-paper wash, faded out at the edges */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,black,transparent)]"
      />

      {/* floating stack chips */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        {chips.map((chip) => (
          <motion.span
            key={chip.label}
            className={`absolute rounded-full border border-line bg-surface/80 px-3 py-1.5 font-mono text-[0.7rem] text-ink-subtle shadow-[var(--shadow-card)] backdrop-blur-sm ${chip.className}`}
            initial={reduced ? undefined : { opacity: 0, y: 8 }}
            animate={
              reduced
                ? undefined
                : { opacity: 1, y: [8, -6, 8] }
            }
            transition={
              reduced
                ? undefined
                : {
                    opacity: { duration: 0.8, delay: chip.delay },
                    y: {
                      duration: 7,
                      delay: chip.delay,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }
            }
          >
            {chip.label}
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 10 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-[0.72rem] tracking-[0.18em] text-ink-subtle uppercase"
        >
          AI Engineer · {profile.location}
        </motion.p>

        <motion.h1
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-5 font-serif text-5xl leading-[1.05] tracking-tight text-ink italic sm:text-6xl lg:text-7xl"
        >
          {profile.name}
        </motion.h1>

        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mt-5 text-lg text-ink-muted sm:text-xl"
        >
          {profile.role}{" "}
          <span className="text-ink-subtle">| {profile.previously}</span>
        </motion.p>

        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 max-w-2xl text-balance text-2xl leading-snug font-medium text-ink sm:text-[1.75rem]"
        >
          {profile.tagline}
        </motion.p>

        <motion.p
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="mt-5 max-w-2xl text-pretty leading-relaxed text-ink-muted"
        >
          {profile.subline}
        </motion.p>

        <motion.div
          initial={reduced ? undefined : { opacity: 0, y: 14 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 rounded-full bg-clay px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-clay-ink"
          >
            See the work
            <ArrowDown
              className="size-4 transition-transform group-hover:translate-y-0.5"
              strokeWidth={2}
            />
          </a>
          <a
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-clay hover:text-clay-ink"
          >
            Resume
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2}
            />
          </a>
        </motion.div>
      </div>

      {/* the interactive piece */}
      <motion.div
        initial={reduced ? undefined : { opacity: 0, y: 20 }}
        animate={reduced ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
      >
        <AgentPipeline />
      </motion.div>
    </section>
  );
}
