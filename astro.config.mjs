import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://loomconnect.com',
  trailingSlash: 'ignore',

  // Always write CSS to separate files instead of inline <style> tags, to suit the security policy in public/_headers
  build: { inlineStylesheets: 'never' },

  // Never inline small scripts or images into the page; keep them as files so the security policy can stay strict
  vite: { build: { assetsInlineLimit: 0 } },
});
