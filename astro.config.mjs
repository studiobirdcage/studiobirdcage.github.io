// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://studiobirdcage.com',
  redirects: {
    '/journal/development-story/the-making-of-studio-birdcagebrpart-2-so-many-false-starts/': '/journal/development-story/the-making-of-studio-birdcage-part-2-building-a-backend/',
  },
  integrations: [react(), mdx(), sitemap()],

  vite: {
    plugins: [tailwindcss()]
  }
});