import { BadgeCheck, Quote } from "lucide-react";
import {
  certifications,
  recommendations,
  showRecommendations,
} from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function Recommendations() {
  return (
    <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {recommendations.map((rec, i) => (
        <Reveal key={rec.name} delay={i * 0.08} className="h-full">
          <figure className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)]">
            <Quote className="size-5 text-clay" strokeWidth={1.8} />
            <blockquote className="mt-4 flex-1 leading-relaxed text-pretty text-ink-muted">
              {rec.quote}
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4">
              <span className="block font-semibold text-ink">{rec.name}</span>
              <span className="block text-sm text-ink-subtle">{rec.title}</span>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  );
}

function Certifications() {
  return (
    <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {certifications.map((cert, i) => (
        <Reveal key={cert.name} delay={(i % 4) * 0.06} className="h-full">
          <div className="flex h-full flex-col gap-3 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition-colors hover:border-clay/40">
            <BadgeCheck className="size-5 shrink-0 text-clay" strokeWidth={1.7} />
            <div className="mt-auto">
              <p className="leading-snug font-medium text-balance text-ink">
                {cert.name}
              </p>
              <p className="mt-1.5 font-mono text-[0.7rem] tracking-wide text-ink-subtle uppercase">
                {cert.issuer}
                {cert.date ? ` · ${cert.date}` : ""}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function Credentials() {
  const useQuotes = showRecommendations && recommendations.length > 0;

  return (
    <section
      id="credentials"
      className="border-b border-line bg-canvas-alt px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker={useQuotes ? "Recommendations" : "Credentials"}
          title={
            useQuotes
              ? "What people I have worked with say"
              : "Certified, and still reading the docs"
          }
          lede={
            useQuotes
              ? undefined
              : "Where I have gone out of my way to prove the fundamentals rather than assume them."
          }
          align="center"
        />
        {useQuotes ? <Recommendations /> : <Certifications />}
      </div>
    </section>
  );
}
