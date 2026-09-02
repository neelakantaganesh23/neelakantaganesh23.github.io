# Ganesh Neelakanta — Portfolio

Personal site for a GenAI / AI Engineer. Next.js 16 (App Router) · Tailwind CSS v4 · Motion · TypeScript.

```bash
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Where things live

| What you want to change | File |
| --- | --- |
| **All copy, projects, skills, links** | `src/content/site.ts` |
| Colours, fonts, light/dark palette | `src/app/globals.css` |
| Fonts loaded | `src/app/layout.tsx` |
| Hero + floating stack chips | `src/components/hero.tsx` |
| Interactive pipeline diagram | `src/components/agent-pipeline.tsx` |
| Section order | `src/app/page.tsx` |
| Resume PDF | `public/Ganesh-Neelakanta-Resume.pdf` |
| SOWnia screenshots | `public/projects/sownia/` |

**You should only ever need `src/content/site.ts`.** Everything else reads from it.

## Design system

A warm "Claude"-style palette: ivory paper, clay accent, ink text — with a full dark
variant. Both are defined as CSS custom properties in `globals.css` and exposed to
Tailwind through `@theme inline`, so utilities read semantically:

- `bg-canvas` / `bg-canvas-alt` / `bg-surface` — page, alternating band, cards
- `text-ink` / `text-ink-muted` / `text-ink-subtle`
- `text-clay` / `bg-clay` / `text-clay-ink` / `bg-clay-soft` — the accent
- `border-line` / `border-line-strong`

To change the accent, edit `--clay`, `--clay-ink` and `--clay-soft` in **both** the
`:root` and `[data-theme="dark"]` blocks. Nothing else needs touching.

Fonts: Newsreader (serif display), Inter (UI), JetBrains Mono (labels, tags, code).

Theme choice persists in `localStorage` and is applied by a blocking script in
`<head>` so there is no flash of the wrong palette on load.

## Still to fill in

1. **Hero tagline** — `profile.tagline` in `src/content/site.ts` is marked
   `NEEDS YOUR WORDS`. Replace it with your own line.
2. **Playground entries** — three real projects are in there. Append your own side
   projects to `experiments`; add `href` to any that should show a "Read more" link.
3. **Recommendations** — the Credentials section currently shows certifications.
   Paste real quotes into `recommendations`, flip `showRecommendations` to `true`,
   and the section swaps over. No quotes were written for you.
4. **Blog / notes** — not built; no content was supplied.
5. **`metadataBase`** in `src/app/layout.tsx` — set it to your real domain so Open
   Graph URLs resolve correctly.

## Live site

**https://neelakantaganesh23.github.io**

Hosted on GitHub Pages from this repo — free with no expiry, HTTPS enforced.

### How to update it

Push to `main`. That is the whole workflow.

```bash
git add -A && git commit -m "update copy" && git push
```

The `Deploy to GitHub Pages` workflow builds the static export and publishes
it, usually within about a minute. Check a run with `gh run list` or
`gh run watch`.

### Why a static export

`next.config.ts` sets `output: "export"`, so the whole site prerenders to
`out/` and needs no server. Two consequences worth knowing:

- `images.unoptimized` is on — Pages has no image optimizer, so `next/image`
  emits the original files. Keep screenshots reasonably sized.
- `trailingSlash` is on, because Pages serves `/route/` as `/route/index.html`.

If you ever move to a host with a Next.js runtime (Vercel, etc.), delete those
three options and image optimization comes back automatically.

### Custom domain

Buy a domain, then add a `public/CNAME` file containing just the hostname and
point the domain's DNS at GitHub Pages. Also update `metadataBase` in
`src/app/layout.tsx` so Open Graph URLs follow.

## Accessibility & responsiveness notes

- The pipeline diagram is keyboard-reachable (each stage is a focusable button with
  a descriptive `aria-label`) and the explainer text is an `aria-live` region.
- Below `lg` the diagram is replaced by a vertical stepper rather than being scaled
  down to illegibility.
- Every animation is gated on `prefers-reduced-motion`; the SVG packet animation and
  autoplay both stop, and the layout stays fully readable.
- Verified: no horizontal overflow at 375 / 768 / 1440 px.
