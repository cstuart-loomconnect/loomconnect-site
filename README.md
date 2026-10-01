# loomconnect.com

Marketing site for Loom Connect and AI Assist. Built with [Astro](https://astro.build) and hosted on Cloudflare Pages.

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
| `src/layouts/Base.astro` | Page shell: head tags, fonts, header and footer |
| `src/components/` | Header, footer, logo, icons |
| `src/styles/global.css` | All styles and brand colours |
| `src/pages/` | One file per page; the file path is the URL |

## Pages

`/`, `/pricing`, `/security`, `/docs`, `/support`, `/support/thanks`, `/demo`, `/demo/thanks`, `/about`, `/privacy`, `/terms`, plus a 404 page.

## Private mode

While `private: true` in `src/site.config.js`, every page carries `noindex` and `robots.txt` blocks crawlers. The site is also behind Cloudflare Access. On launch day set `private: false`, push, and remove the Access application.

## Connecting the forms to Salesforce

1. In your Partner Business Org, generate the Web-to-Lead and Web-to-Case forms.
2. Copy the Org ID and custom field IDs into `salesforce` in `src/site.config.js`.
3. Paste the reCAPTCHA script and widget into the marked spots in `src/pages/demo/index.astro` and `src/pages/support/index.astro`.

Until `orgId` is set, both forms go straight to their thank-you pages so you can click through the journey.

## Branches

- `master` is production. Anything merged here goes live on loomconnect.com.
- `development` is where all work happens. Open a pull request from `development` into `master` to release.
- Never push directly to `master`.

## Security

- `public/_headers` sets security headers on every page (HSTS, CSP, frame blocking and more). If you add a new third-party script, font or form target, add its domain to the Content-Security-Policy line or the browser will block it.
- `public/.well-known/security.txt` tells security researchers how to report issues. Update the `Expires` date every year.
- Dependabot opens weekly pull requests into `development` for dependency updates.

## Cloudflare build settings

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`
- Production branch: `master`
