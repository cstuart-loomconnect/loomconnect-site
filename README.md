# loomconnect.com

Marketing site for LoomConnect and LoomConnect AI. Built with [Astro](https://astro.build) and hosted on Cloudflare.

## Run it locally

```
npm install
npm run dev
```

Then open http://localhost:4321.

## Where things live

| Path | What it is |
| --- | --- |
| `src/site.config.js` | Emails, placeholders, AppExchange link, Salesforce form settings, private mode |
| `src/layouts/Base.astro` | Page shell: head tags, font preload, header and footer |
| `src/layouts/DocsLayout.astro` | Shell for every /documentation page: menu, step number, next step |
| `src/documentation/` | Settings for the documentation (see below) |
| `src/components/docs/` | Building blocks for documentation pages |
| `src/scripts/` | The little bits of JavaScript: tabs, error search, "On this page" |
| `src/components/` | Header, footer, logo, icons |
| `src/styles/global.css` | Site styles and brand colours |
| `src/styles/docs.css` | Documentation styles |
| `public/fonts/` | Plus Jakarta Sans, served from this site (see Fonts) |
| `public/_headers` | Security headers Cloudflare adds to every page |
| `src/pages/` | One file per page; the file path is the URL |

## Pages

`/`, `/pricing`, `/security`, `/documentation` and its pages, `/support`, `/support/thanks`, `/demo`, `/demo/thanks`, `/about`, `/privacy`, `/terms`, `/acceptable-use`, `/ai-transparency`, `/data-processing`, `/subprocessors`, `/support-policy`, `/accessibility`, `/release-notes`, plus a 404 page.

## Private mode

While `private: true` in `src/site.config.js`, every page carries `noindex` and `robots.txt` blocks crawlers. The site is also behind Cloudflare Access. On launch day set `private: false`, push, and remove the Access application.

## Connecting the forms to Salesforce

1. In your Partner Business Org, generate the Web-to-Lead and Web-to-Case forms.
2. Copy the Org ID and custom field IDs into `salesforce` in `src/site.config.js`.
3. Paste the reCAPTCHA script and widget into the marked spots in `src/pages/demo/index.astro` and `src/pages/support/index.astro`.

### Form protection (Turnstile and the Worker)

With a Turnstile site key set, the forms don't post to Salesforce from the browser. They post to `/api/demo` and `/api/support`, handled by the Worker in `src/worker.js`. It checks, in order: same-origin request, a rate limit, a hidden honeypot field, time-to-submit (under 2 seconds counts as a bot), and the Turnstile token. Only then does it forward an allowlist of fields to Web-to-Lead or Web-to-Case, adding the org ID itself. Bots that trip the honeypot or timer get a fake success page. Nothing needs creating in Salesforce for these checks.

To switch it on:

1. In the Cloudflare dashboard, open Turnstile and add a widget for `loomconnect.com` and the dev Worker hostname. Copy the site key and secret key.
2. Paste the **site key** into `turnstile.siteKey` in `src/site.config.js`. While it is empty, the forms post straight to Salesforce as before.
3. Store the **secret key** as a Worker secret. It never goes in the repo: `npx wrangler secret put TURNSTILE_SECRET`, and again with `--env dev`.
4. Deploy, then test both forms. Cloudflare's test keys (site key `1x00000000000000000000AA`, secret `1x0000000000000000000000000000000AA`) always pass, for trying it out.
5. Remove `https://webto.salesforce.com` from `form-action` in `public/_headers`.

If the secret is missing, the Worker rejects every submission rather than letting them through. The rate limit (5 posts per visitor per minute) is set under `ratelimits` in `wrangler.jsonc`. If the demo form's team-size field or the support form's Org ID field doesn't exist in Salesforce, the Worker adds the answer to the description so it isn't lost. If you create those fields, put their IDs in `site.config.js`.

Without Turnstile (direct mode), `honeypotFieldId` and `timerFieldId` in `site.config.js` can still add the two traps, but you must first create matching fields on Lead and Case, and they can only be checked by a Salesforce Flow.

Until `orgId` is set, both forms go straight to their thank-you pages so you can click through the journey.

## Branches

- `master` is production. Anything merged here goes live on loomconnect.com.
- `development` is where all work happens. Open a pull request from `development` into `master` to release.
- Never push directly to `master`.
- `development` deploys to https://dev.loomconnect.com (Worker `loomconnect-site-dev`, deploy command `npx wrangler deploy --env dev`, build variable `SITE_ENV=development`, which shows a red banner).

## Security

- `public/_headers` sets security headers on every page (HSTS, CSP, frame blocking and more). If you add a new third-party script, font or form target, add its domain to the Content-Security-Policy line or the browser will block it.
- `public/.well-known/security.txt` tells security researchers how to report issues. Update the `Expires` date every year.
- Dependabot opens weekly pull requests into `development` for dependency updates.

## Cloudflare build settings

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `master`

## Documentation

Admin documentation for LoomConnect AI lives at `/documentation`. Everything you'd normally change is in `src/documentation/`:

| File | What to change there |
| --- | --- |
| `settings.js` | The list of pages, their order, titles and minutes. The sidebar, step numbers and next links follow it. Also the "checked against" version and the screenshot placeholder switch. |
| `screenshots.js` | Every screenshot: what to capture and its file name. |
| `errors.js` | Every message on the Error messages page. |
| `glossary.js` | Glossary terms. |

### Add a screenshot

1. Take the screenshot in a sandbox. Hide real names, emails, record data and API keys.
2. Save it as a PNG in `public/documentation/screenshots/`, named after its id, e.g. `model-connected.png`.
3. In `src/documentation/screenshots.js`, set `file: 'model-connected.png'` and correct `width` and `height` to the image's real size.

Before launch, set `showScreenshotPlaceholders` to `false` in `settings.js` to hide any you haven't added yet.

### Add a page

1. Add a line to `pages` in `src/documentation/settings.js`.
2. Copy an existing file in `src/pages/documentation/`, rename it to match the slug, and change `slug="..."` at the top.

Building blocks you can use inside a page:

- `<ClickPath steps={['Setup', 'Named Credentials']} />` for where to click in Salesforce.
- `<Note type="check">` (green) or `<Note type="watch">` (amber), with an optional `title="..."`.
- `<Screenshot id="..." />` for a screenshot from `screenshots.js`.
- `<Tabs labels={['Anthropic', 'OpenAI']}>` with one `<div class="tabs-panel" data-tab-panel data-label="...">` per label.
- `<ol class="docs-steps">` for numbered steps, and `<strong class="ui">` for a button or field name.
- Give each `<h2>` an `id` so it appears under "On this page".

## Legal pages

The legal pages use `src/layouts/PolicyPage.astro`. Settings you'll change are under `legal` in `src/site.config.js` (version, ICO number, liability cap, providers, retention periods).

`src/components/legal/DataPath.astro` is the single explanation of how LoomConnect AI handles customer data. It appears on Privacy, Terms, Data processing, Sub-processors and AI transparency, so change it in one place only. If LoomConnect AI ever sends data through a LoomConnect server (a proxy, telemetry or a hosted AI key), that block and the Data processing page must change, and you'd need a DPA.

`LEGAL-REVIEW.md` lists everything to fill in or check with a solicitor before launch. When that's done, set `legal.draft` to `false`.

## Fonts

Plus Jakarta Sans is served from `public/fonts/`, not from Google Fonts. Loading fonts from Google sends each visitor's IP address to Google, which needs consent under UK and EU data protection law. The font is free to use and self-host under the SIL Open Font License (`public/fonts/OFL.txt`).

## Security headers

`public/_headers` tells browsers to only load scripts, styles, fonts and images from this site, and to only send forms here or to Salesforce. So:

- Don't add `style="..."` attributes or inline `<script>` blocks. Put CSS in `src/styles/` and scripts in `src/scripts/`.
- Anything from another site (an analytics tool, a captcha) needs adding to the policy first, or the browser blocks it.
- Never put API keys, tokens or passwords in this repo. Nothing on the site needs one.
