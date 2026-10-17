// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// ASTRO_SITE / ASTRO_BASE permiten desplegar en una subruta (GitHub Pages) sin tocar el código.
export default defineConfig({
  site: process.env.ASTRO_SITE ?? 'https://www.biamayart.com',
  base: process.env.ASTRO_BASE ?? '/',
  build: { format: 'directory' },
  trailingSlash: 'never',
  integrations: [sitemap()],
});
