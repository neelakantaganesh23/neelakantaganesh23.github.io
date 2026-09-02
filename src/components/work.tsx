import { Lock } from "lucide-react";
import { projects, type Project } from "@/content/site";
import { ProjectGallery } from "./project-gallery";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

function Tags({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-line bg-canvas-alt px-2.5 py-1 font-mono text-[0.7rem] text-ink-muted"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] tracking-wide text-ink-subtle uppercase">
      <span className="text-clay">{project.org}</span>
      <span aria-hidden>·</span>
      <span>{project.period}</span>
    </div>
  );
}

function Metric({ project }: { project: Project }) {
  return (
    <div className="flex items-baseline gap-2.5">
      <span className="font-serif text-4xl leading-none text-clay">
        {project.metric.value}
      </span>
      <span className="text-sm leading-tight text-ink-muted">
        {project.metric.label}
      </span>
    </div>
  );
}

function Availability({ project }: { project: Project }) {
  if (project.href) {
    return (
      <a
        href={project.href}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-clay-ink underline underline-offset-4 hover:text-clay"
      >
        Read more →
      </a>
    );
  }
  if (project.confidential) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm text-ink-subtle">
        <Lock className="size-3.5" strokeWidth={1.8} />
        Details on request
      </span>
    );
  }
  return null;
}

export function Work() {
  const [featured, ...rest] = projects;

  return (
    <section id="work" className="border-b border-line px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          kicker="Case studies"
          title={
            <>
              Ship it. Evaluate it.
              <br />
              <span className="text-ink-subtle">Then keep it honest.</span>
            </>
          }
          lede="Production systems, not demos — each one owned end to end, from requirements through guardrails, evaluation and the incidents that follow."
        />

        {/* featured project */}
        <Reveal className="mt-14">
          <article className="grid gap-8 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col">
              <Meta project={featured} />
              <h3 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                {featured.name}
              </h3>
              <p className="mt-3 text-lg leading-relaxed text-pretty text-ink">
                {featured.result}
              </p>
              <p className="mt-3 leading-relaxed text-pretty text-ink-muted">
                {featured.summary}
              </p>

              <div className="mt-6">
                <Metric project={featured} />
              </div>

              <ul className="mt-6 flex flex-col gap-2.5 border-t border-line pt-6">
                {featured.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex gap-2.5 text-[0.94rem] leading-relaxed text-pretty text-ink-muted"
                  >
                    <span
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-clay"
                      aria-hidden
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-col gap-4">
                <Tags tags={featured.tags} />
                <Availability project={featured} />
              </div>
            </div>

            {featured.images && (
              <div className="lg:pt-1">
                <ProjectGallery images={featured.images} />
              </div>
            )}
          </article>
        </Reveal>

        {/* the rest */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {rest.map((project, i) => (
            <Reveal key={project.slug} delay={i * 0.08}>
              <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-line-strong hover:shadow-[var(--shadow-lift)] sm:p-8">
                <Meta project={project} />
                <h3 className="mt-3 text-2xl leading-tight font-semibold tracking-tight text-balance text-ink">
                  {project.name}
                </h3>
                <p className="mt-3 leading-relaxed text-pretty text-ink">
                  {project.result}
                </p>

                <div className="mt-5">
                  <Metric project={project} />
                </div>

                <ul className="mt-5 flex flex-col gap-2 border-t border-line pt-5">
                  {project.bullets.slice(0, 4).map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-2.5 text-sm leading-relaxed text-pretty text-ink-muted"
                    >
                      <span
                        className="mt-1.75 size-1.5 shrink-0 rounded-full bg-clay/60"
                        aria-hidden
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col gap-4 pt-6">
                  <Tags tags={project.tags} />
                  <Availability project={project} />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
