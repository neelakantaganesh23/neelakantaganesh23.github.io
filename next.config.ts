import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Static export — the whole site prerenders, so it can be served from any
   * static host (GitHub Pages here). No server runtime is required.
   */
  output: "export",

  /**
   * GitHub Pages has no image optimizer, so next/image emits plain <img>
   * with the original assets. Our screenshots are already small PNGs.
   */
  images: {
    unoptimized: true,
  },

  /** Pages serves /route/ as /route/index.html. */
  trailingSlash: true,
};

export default nextConfig;
