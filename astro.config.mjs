// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.biamayart.com',
  build: { format: 'directory' },
  trailingSlash: 'never',
  integrations: [sitemap()],
});
