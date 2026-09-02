import { experiments } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function Playground() {
  return (
    <section
      id="playground"
      className="relative overflow-hidden border-b border-line bg-canvas-alt px-4 py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent_75%)]"
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          kicker="Playground"
          title="Things I built to find out if they would work"
          lede="Side quests, pipelines and experiments — the ones where the interesting part was the constraint, not the model."
          align="center"
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp, i) => (
            <Reveal key={exp.title} delay={i * 0.08} className="h-full">
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                {exp.period && (
                  <p className="font-mono text-[0.7rem] tracking-wide text-ink-subtle uppercase">
                    {exp.period}
                  </p>
                )}
                <h3 className="mt-2 text-xl leading-snug font-semibold tracking-tight text-balance text-ink">
                  {exp.title}
                </h3>
                <p className="mt-3 text-[0.94rem] leading-relaxed text-pretty text-ink-muted">
                  {exp.blurb}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5">
                  {exp.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-canvas-alt px-2.5 py-1 font-mono text-[0.68rem] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                {exp.href && (
                  <a
                    href={exp.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto pt-5 text-sm font-medium text-clay-ink underline underline-offset-4 hover:text-clay"
                  >
                    Read more →
                  </a>
                )}
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
