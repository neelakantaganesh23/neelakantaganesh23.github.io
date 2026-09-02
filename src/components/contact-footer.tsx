import type { ComponentType, SVGProps } from "react";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { contact, profile } from "@/content/site";
import { GithubIcon, LinkedinIcon } from "./brand-icons";
import { Reveal } from "./reveal";

const links: {
  label: string;
  value: string;
  href: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  external: boolean;
}[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "in/neelakanta-ganesh",
    href: profile.links.linkedin,
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "neelakantaganesh23",
    href: profile.links.github,
    icon: GithubIcon,
    external: true,
  },
  {
    label: "Resume",
    value: "PDF, one page",
    href: profile.links.resume,
    icon: FileText,
    external: true,
  },
];

export function ContactFooter() {
  return (
    <footer id="contact" className="px-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="font-serif text-lg tracking-[0.08em] text-clay uppercase">
            Contact
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
            {contact.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted">
            {contact.body}
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link, i) => {
            const Icon = link.icon;
            return (
              <Reveal key={link.label} delay={i * 0.06} className="h-full">
                <a
                  href={link.href}
                  {...(link.external
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}
                  className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-clay/50 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-clay-soft text-clay-ink">
                    <Icon className="size-4.5" strokeWidth={1.8} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-1 font-medium text-ink">
                      {link.label}
                      <ArrowUpRight
                        className="size-3.5 text-ink-subtle transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                    <span className="mt-0.5 block truncate font-mono text-[0.72rem] text-ink-subtle">
                      {link.value}
                    </span>
                  </span>
                </a>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.72rem] text-ink-subtle">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
          <p className="font-mono text-[0.72rem] text-ink-subtle">
            Built with Next.js, Tailwind CSS &amp; Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
