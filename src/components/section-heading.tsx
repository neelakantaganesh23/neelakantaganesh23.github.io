import type { ReactNode } from "react";
import { Reveal } from "./reveal";

type Props = {
  kicker: string;
  title: ReactNode;
  lede?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  kicker,
  title,
  lede,
  align = "left",
}: Props) {
  const centered = align === "center";

  return (
    <Reveal className={centered ? "text-center" : ""}>
      <p className="font-serif text-lg tracking-[0.08em] text-clay uppercase">
        {kicker}
      </p>
      <h2 className="mt-3 text-4xl leading-[1.1] font-semibold tracking-tight text-balance text-ink sm:text-5xl">
        {title}
      </h2>
      {lede && (
        <p
          className={`mt-4 max-w-2xl text-lg leading-relaxed text-pretty text-ink-muted ${
            centered ? "mx-auto" : ""
          }`}
        >
          {lede}
        </p>
      )}
    </Reveal>
  );
}
