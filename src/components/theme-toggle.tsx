"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";

/**
 * The <html data-theme> attribute is the source of truth — it is set by a
 * blocking script in <head> before first paint, so React subscribes to it as
 * an external store rather than owning a second copy of the state.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  return (
    (document.documentElement.getAttribute("data-theme") as Theme) || "light"
  );
}

/** Matches the server render; React swaps to the real value after hydration. */
function getServerSnapshot(): Theme {
  return "light";
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just will not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      className={`grid size-9 place-items-center rounded-full border border-line bg-surface text-ink-muted transition-colors hover:border-line-strong hover:text-ink ${className}`}
    >
      {theme === "dark" ? (
        <Sun className="size-4" strokeWidth={1.7} />
      ) : (
        <Moon className="size-4" strokeWidth={1.7} />
      )}
    </button>
  );
}
