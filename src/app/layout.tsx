import type { Metadata, Viewport } from "next";
import { Inter, Newsreader, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile } from "@/content/site";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ganeshneelakanta.vercel.app"),
  title: {
    default: `${profile.name} — AI Engineer`,
    template: `%s · ${profile.name}`,
  },
  description:
    "AI Engineer building production agentic AI, multi-agent systems and enterprise RAG — plus the evaluation and guardrails that keep them honest.",
  keywords: [
    "AI Engineer",
    "Generative AI",
    "Agentic AI",
    "Multi-Agent Systems",
    "RAG",
    "LangGraph",
    "LangChain",
    "Databricks",
    "MCP",
  ],
  authors: [{ name: profile.name }],
  openGraph: {
    type: "website",
    title: `${profile.name} — AI Engineer`,
    description:
      "Production agentic AI, multi-agent systems and enterprise RAG.",
    siteName: profile.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer`,
    description:
      "Production agentic AI, multi-agent systems and enterprise RAG.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf9f5" },
    { media: "(prefers-color-scheme: dark)", color: "#1f1e1d" },
  ],
};

/**
 * Runs before first paint so the stored theme never flashes the wrong palette.
 */
const themeScript = `
(function () {
  try {
    var stored = localStorage.getItem("theme");
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = stored || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "light");
  }
})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-canvas text-ink">{children}</body>
    </html>
  );
}
