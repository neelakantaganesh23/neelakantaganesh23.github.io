"use client";

import Image from "next/image";
import { useState } from "react";

type Shot = { src: string; alt: string };

export function ProjectGallery({ images }: { images: Shot[] }) {
  const [index, setIndex] = useState(0);
  const active = images[index];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-[909/540] overflow-hidden rounded-2xl border border-line bg-surface-sunk">
        <Image
          key={active.src}
          src={active.src}
          alt={active.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover object-top"
          priority={index === 0}
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images.map((shot, i) => (
          <button
            key={shot.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={shot.alt}
            aria-current={i === index}
            className={`relative aspect-[909/540] overflow-hidden rounded-lg border transition-all ${
              i === index
                ? "border-clay opacity-100 ring-2 ring-clay/25"
                : "border-line opacity-60 hover:opacity-100"
            }`}
          >
            <Image
              src={shot.src}
              alt=""
              fill
              sizes="140px"
              className="object-cover object-top"
            />
          </button>
        ))}
      </div>

      <p className="font-mono text-[0.7rem] leading-relaxed text-ink-subtle">
        {active.alt}
      </p>
    </div>
  );
}
