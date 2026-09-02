"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  FlaskConical,
  FolderClosed,
  Mail,
  Menu,
  Smile,
  X,
} from "lucide-react";
import { nav, profile } from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

const icons = {
  folder: FolderClosed,
  smile: Smile,
  flask: FlaskConical,
  file: FileText,
  mail: Mail,
} as const;

/** Section ids the observer watches, in document order. */
const sectionIds = ["work", "about", "playground", "contact"];

export function NavBar() {
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  // Highlight whichever section currently owns the upper third of the screen.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.01, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close the mobile sheet on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-3 sm:top-5">
      <nav className="flex items-center gap-2 sm:gap-3">
        {/* initials badge */}
        <a
          href="#top"
          aria-label={`${profile.name} — back to top`}
          className="grid size-11 shrink-0 place-items-center rounded-full border border-line bg-surface/85 font-serif text-sm tracking-wide text-ink shadow-[var(--shadow-card)] backdrop-blur-md transition-colors hover:border-clay hover:text-clay sm:size-13"
        >
          {profile.shortName}
        </a>

        {/* desktop pill */}
        <div className="hidden items-center gap-1 rounded-full border border-line bg-surface/85 px-2 py-2 shadow-[var(--shadow-card)] backdrop-blur-md md:flex">
          {nav.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            const isActive = active && item.href === `#${active}`;
            return (
              <a
                key={item.label}
                href={item.href}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className={`flex items-center gap-2 rounded-full px-3.5 py-2 text-[0.94rem] transition-colors lg:px-4 ${
                  isActive
                    ? "bg-clay-soft text-clay-ink"
                    : "text-ink-muted hover:bg-canvas-alt hover:text-ink"
                }`}
              >
                <Icon className="size-4 shrink-0" strokeWidth={1.7} />
                {item.label}
              </a>
            );
          })}
          <span className="mx-1 h-5 w-px bg-line" aria-hidden />
          <ThemeToggle />
        </div>

        {/* mobile pill */}
        <div className="flex items-center gap-1 rounded-full border border-line bg-surface/85 p-2 shadow-[var(--shadow-card)] backdrop-blur-md md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-9 place-items-center rounded-full text-ink-muted transition-colors hover:bg-canvas-alt hover:text-ink"
          >
            {open ? (
              <X className="size-4.5" strokeWidth={1.7} />
            ) : (
              <Menu className="size-4.5" strokeWidth={1.7} />
            )}
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      {open && (
        <div
          id="mobile-nav"
          className="absolute top-16 right-3 left-3 rounded-3xl border border-line bg-surface p-2 shadow-[var(--shadow-lift)] md:hidden"
        >
          {nav.map((item) => {
            const Icon = icons[item.icon as keyof typeof icons];
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
                className="flex items-center gap-3 rounded-2xl px-4 py-3 text-ink-muted transition-colors hover:bg-canvas-alt hover:text-ink"
              >
                <Icon className="size-4" strokeWidth={1.7} />
                {item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
}
