// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://ba.rrett.dev",
  redirects: {
    "/contact/": "/#contact",
    // GitHub Pages serves these as HTML fallback redirects. Matching 301 rules
    // should also live at the Cloudflare edge; see redirects/cloudflare-bulk-redirects.csv.
    "/journal/development-story/the-making-of-studio-birdcage-part-1-so-many-false-starts/":
      "/journal/development-story/the-making-of-barrett.dev-part-1-so-many-false-starts/",
    "/journal/development-story/the-making-of-studio-birdcage-part-2-building-a-backend/":
      "/journal/development-story/the-making-of-barrett.dev-part-2-building-a-backend/",
    "/journal/development-story/the-making-of-studio-birdcagebrpart-2-so-many-false-starts/":
      "/journal/development-story/the-making-of-barrett.dev-part-2-building-a-backend/",
    "/journal/development-story/the-making-of-studio-birdcage-part-3-launch-and-beyond/":
      "/journal/development-story/the-making-of-barrett.dev-part-3-launch-and-beyond/",
  },
  integrations: [react(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()],
  },
});
