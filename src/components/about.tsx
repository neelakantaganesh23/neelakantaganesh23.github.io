import { about, skills } from "@/content/site";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function About() {
  return (
    <section id="about" className="border-b border-line px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="About"
          title={about.heading}
          lede={about.lede}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* narrative */}
          <Reveal className="flex flex-col gap-5">
            {about.paragraphs.map((para) => (
              <p
                key={para.slice(0, 24)}
                className="text-[1.05rem] leading-relaxed text-pretty text-ink-muted"
              >
                {para}
              </p>
            ))}
          </Reveal>

          {/* timeline */}
          <Reveal delay={0.1}>
            <ol className="relative flex flex-col gap-7 border-l border-line pl-6">
              {about.timeline.map((entry) => (
                <li key={`${entry.org}-${entry.period}`} className="relative">
                  <span
                    className="absolute top-1.5 -left-[1.68rem] size-2.5 rounded-full border-2 border-canvas bg-clay"
                    aria-hidden
                  />
                  <p className="font-mono text-[0.7rem] tracking-wide text-ink-subtle uppercase">
                    {entry.period} · {entry.place}
                  </p>
                  <p className="mt-1 font-semibold text-ink">{entry.org}</p>
                  <p className="text-[0.94rem] text-pretty text-ink-muted">
                    {entry.role}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* skills */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.05} className="h-full">
              <div className="h-full rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)]">
                <h3 className="font-mono text-[0.72rem] tracking-[0.12em] text-clay uppercase">
                  {group.group}
                </h3>
                <ul className="mt-3.5 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full bg-canvas-alt px-2.5 py-1 text-[0.78rem] text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
