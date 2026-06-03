// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
// Default static (SSG) output: informational copy + platform guides are
// pre-rendered for SEO, while the editor ships as a single client island.
export default defineConfig({
  site: 'https://posttruncate.com',
  integrations: [preact()],
  vite: {
    plugins: [tailwindcss()],
  },
});
