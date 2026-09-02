"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { agentNodes, pipelineStages } from "@/content/site";

/* ---------------------------------------------------------------------------
   Geometry. The SVG is authored in a 1000 x 360 coordinate space and scaled
   to fit; below `lg` we swap to a vertical stepper that actually reads on a
   phone rather than shrinking this to illegibility.
--------------------------------------------------------------------------- */

const CENTER_Y = 180;
const NODE_H = 62;
const NODE_Y = CENTER_Y - NODE_H / 2;

type NodeBox = { id: string; x: number; w: number };

const boxes: NodeBox[] = [
  { id: "ingest", x: 15, w: 120 },
  { id: "chunk", x: 169, w: 140 },
  { id: "retrieve", x: 343, w: 130 },
  { id: "agents", x: 507, w: 150 },
  { id: "judge", x: 691, w: 130 },
  { id: "findings", x: 855, w: 130 },
];

const box = (id: string) => boxes.find((b) => b.id === id)!;

/** vertical centres of the five fanned-out agent pills */
const AGENT_CYS = [92, 136, 180, 224, 268];
const AGENT_H = 32;

type Edge = { from: string; to: string; d: string };

const edges: Edge[] = [
  { from: "ingest", to: "chunk", d: "M135 180 H169" },
  { from: "chunk", to: "retrieve", d: "M309 180 H343" },
  ...AGENT_CYS.map((cy) => ({
    from: "retrieve",
    to: "agents",
    d: `M473 180 C489 180 491 ${cy} 507 ${cy}`,
  })),
  ...AGENT_CYS.map((cy) => ({
    from: "agents",
    to: "judge",
    d: `M657 ${cy} C673 ${cy} 675 180 691 180`,
  })),
  { from: "judge", to: "findings", d: "M821 180 H855" },
];

const AUTOPLAY_MS = 3200;

export function AgentPipeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [pinned, setPinned] = useState(false);
  const reduced = useReducedMotion();
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const active = pipelineStages[activeIndex];

  // Cycle through the stages until the visitor takes over.
  useEffect(() => {
    if (pinned || reduced) return;
    timer.current = setInterval(() => {
      setActiveIndex((i) => (i + 1) % pipelineStages.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [pinned, reduced]);

  function select(id: string, pin = true) {
    const index = pipelineStages.findIndex((s) => s.id === id);
    if (index === -1) return;
    setActiveIndex(index);
    if (pin) setPinned(true);
  }

  const isActive = (id: string) => active.id === id;
  const edgeIsHot = (e: Edge) => isActive(e.from) || isActive(e.to);

  return (
    <div className="w-full">
      <figure
        className="rounded-3xl border border-line bg-surface/70 p-4 shadow-[var(--shadow-card)] backdrop-blur-sm sm:p-6"
        onMouseLeave={() => setPinned(false)}
      >
        <figcaption className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[0.7rem] tracking-[0.14em] text-ink-subtle uppercase">
            document → agents → cited findings
          </span>
          <span className="font-mono text-[0.7rem] text-ink-subtle">
            {/* the diagram is hover-driven, the stepper below `lg` is tap-driven */}
            <span className="lg:hidden">tap a stage</span>
            <span className="hidden lg:inline">
              {reduced ? "click" : "hover"} a stage
            </span>
          </span>
        </figcaption>

        {/* ---------------- desktop: the diagram ---------------- */}
        <svg
          viewBox="0 0 1000 360"
          className="hidden h-auto w-full lg:block"
          role="group"
          aria-label="Interactive diagram of a document review pipeline"
        >
          {/* edges */}
          <g fill="none">
            {edges.map((e, i) => (
              <path
                key={i}
                d={e.d}
                stroke={edgeIsHot(e) ? "var(--clay)" : "var(--line-strong)"}
                strokeWidth={edgeIsHot(e) ? 1.8 : 1.2}
                className="transition-all duration-500"
              />
            ))}
          </g>

          {/* packets travelling the edges */}
          {!reduced && (
            <g>
              {edges.map((e, i) => (
                <circle
                  key={`p-${i}`}
                  r={edgeIsHot(e) ? 3.4 : 2.2}
                  fill={edgeIsHot(e) ? "var(--clay)" : "var(--line-strong)"}
                  className="transition-all duration-500"
                >
                  <animateMotion
                    dur={`${2 + (i % 4) * 0.35}s`}
                    begin={`${(i % 6) * 0.28}s`}
                    repeatCount="indefinite"
                    path={e.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              ))}
            </g>
          )}

          {/* the five specialist agents */}
          <g>
            {AGENT_CYS.map((cy, i) => {
              const on = isActive("agents");
              return (
                <g
                  key={agentNodes[i]}
                  onMouseEnter={() => select("agents")}
                  onClick={() => select("agents")}
                  className="cursor-pointer"
                >
                  <rect
                    x={box("agents").x}
                    y={cy - AGENT_H / 2}
                    width={box("agents").w}
                    height={AGENT_H}
                    rx={10}
                    fill={on ? "var(--clay-soft)" : "var(--surface-sunk)"}
                    stroke={on ? "var(--clay)" : "var(--line)"}
                    strokeWidth={1.2}
                    className="transition-all duration-500"
                  />
                  <text
                    x={box("agents").x + box("agents").w / 2}
                    y={cy + 4}
                    textAnchor="middle"
                    className={`font-mono text-[13px] transition-colors duration-500 ${
                      on ? "fill-clay-ink" : "fill-ink-muted"
                    }`}
                  >
                    {agentNodes[i]}
                  </text>
                </g>
              );
            })}
          </g>

          {/* the linear stages */}
          <g>
            {pipelineStages
              .filter((s) => s.id !== "agents")
              .map((stage) => {
                const b = box(stage.id);
                const on = isActive(stage.id);
                return (
                  <g
                    key={stage.id}
                    tabIndex={0}
                    role="button"
                    aria-label={`${stage.label}: ${stage.detail}`}
                    onMouseEnter={() => select(stage.id)}
                    onFocus={() => select(stage.id)}
                    onClick={() => select(stage.id)}
                    className="cursor-pointer focus:outline-none"
                  >
                    <rect
                      x={b.x}
                      y={NODE_Y}
                      width={b.w}
                      height={NODE_H}
                      rx={14}
                      fill={on ? "var(--clay-soft)" : "var(--surface)"}
                      stroke={on ? "var(--clay)" : "var(--line-strong)"}
                      strokeWidth={on ? 1.8 : 1.2}
                      className="transition-all duration-500"
                    />
                    <text
                      x={b.x + b.w / 2}
                      y={CENTER_Y - 4}
                      textAnchor="middle"
                      className={`font-sans text-[15px] font-medium transition-colors duration-500 ${
                        on ? "fill-clay-ink" : "fill-ink"
                      }`}
                    >
                      {stage.label}
                    </text>
                    <text
                      x={b.x + b.w / 2}
                      y={CENTER_Y + 14}
                      textAnchor="middle"
                      className="fill-ink-subtle font-mono text-[11px]"
                    >
                      {stage.kicker}
                    </text>
                  </g>
                );
              })}
          </g>

          {/* label for the fanned column */}
          <text
            x={box("agents").x + box("agents").w / 2}
            y={52}
            textAnchor="middle"
            className={`font-sans text-[13px] transition-colors duration-500 ${
              isActive("agents") ? "fill-clay-ink" : "fill-ink-subtle"
            }`}
          >
            Specialist agents · in parallel
          </text>
        </svg>

        {/* ---------------- mobile: vertical stepper ---------------- */}
        <ol className="flex flex-col gap-1.5 lg:hidden">
          {pipelineStages.map((stage, i) => {
            const on = i === activeIndex;
            return (
              <li key={stage.id}>
                <button
                  type="button"
                  onClick={() => select(stage.id)}
                  aria-current={on}
                  className={`flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors ${
                    on
                      ? "border-clay bg-clay-soft"
                      : "border-line bg-surface-sunk"
                  }`}
                >
                  <span
                    className={`font-mono text-[0.7rem] ${
                      on ? "text-clay-ink" : "text-ink-subtle"
                    }`}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span
                      className={`block text-sm font-medium ${
                        on ? "text-clay-ink" : "text-ink"
                      }`}
                    >
                      {stage.label}
                    </span>
                    <span className="block truncate font-mono text-[0.68rem] text-ink-subtle">
                      {stage.kicker}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* ---------------- explainer ---------------- */}
        <div className="mt-5 flex min-h-27 flex-col gap-2 rounded-2xl border border-line bg-surface-sunk p-4 sm:min-h-24">
          <div className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-clay" aria-hidden />
            <span className="font-mono text-[0.72rem] tracking-[0.12em] text-clay-ink uppercase">
              {active.label}
            </span>
          </div>
          <p
            key={active.id}
            aria-live="polite"
            className="text-pretty text-[0.94rem] leading-relaxed text-ink-muted"
          >
            {active.detail}
          </p>
        </div>
      </figure>
    </div>
  );
}
