// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://example.com",
  integrations: [mdx(), sitemap(), svelte()],

  markdown: {
    shikiConfig: {
      theme: "tokyo-night",
    },
  },

  fonts: [
    {
      provider: fontProviders.local(),
      name: "Geist Pixel Square",
      cssVariable: "--font-geist-pixel-square",
      fallbacks: ["monospace"],
      options: {
        variants: [
          {
            src: ["./src/assets/fonts/GeistPixel-Square.woff2"],
            weight: 500,
            style: "normal",
          },
        ],
      },
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },
});
