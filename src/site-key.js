// The public Turnstile site key, read from the build variable PUBLIC_TURNSTILE_SITE_KEY.
// Set it in Cloudflare (Workers & Pages > the Worker > Settings > Build > Variables), or in a local .env file
// (which git ignores) when running `npm run dev`. Kept apart from site.config.js because only the pages use it:
// the Worker is bundled separately and has no build variables.
export const turnstileSiteKey = import.meta.env?.PUBLIC_TURNSTILE_SITE_KEY ?? '';

// With no key (for example local preview), the forms skip the Worker and go straight to the thank-you pages.
export const useProxy = turnstileSiteKey.length > 0;
