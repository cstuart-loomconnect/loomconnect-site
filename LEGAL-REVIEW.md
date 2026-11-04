# Legal pages: check before publishing

The legal pages are drafts for a solicitor to review. They are not legal advice.
Work through this list, then set `legal.draft` to `false` in `src/site.config.js`.

## Fill in the placeholders

All of these live in `src/site.config.js` unless noted.

- [ ] `owner.address`: UK address for correspondence (required on the site for a sole trader using a trading name)
- [ ] `legal.icoNumber`: register and pay the data protection fee at ico.org.uk
- [ ] `legal.liabilityCap`: agree the cap with your solicitor
- [ ] `legal.paymentProvider`: how paid plans are billed (AppExchange Checkout, Stripe, invoice)
- [ ] `legal.emailProvider`: who hosts @loomconnect.com email
- [ ] `legal.minimumTerm`: billing period for paid plans
- [ ] `legal.leadRetention` and `legal.caseRetention`
- [ ] `placeholders.noticePeriod`: notice before price increases (also used on the pricing page)
- [ ] `placeholders.legalLastUpdated`: the date the reviewed versions go live
- [ ] `src/pages/subprocessors.astro`: confirm the location of each provider
- [ ] `src/pages/privacy.astro`, Cookies section: keep or delete the reCAPTCHA paragraph depending on whether you add it

## Assumptions the drafts make (check they are still true)

- [ ] LoomConnect AI calls the AI provider directly from the subscriber's org through their own Named Credential. Checked against the LoomConnectAI repo on 4 Nov 2026: every callout uses `callout:<NamedCredential>`, and logs and platform events stay in the subscriber's org. Re-check before each release.
- [ ] No telemetry, usage metering or error reporting is sent to Loom Connect.
- [ ] Loom Connect never supplies a hosted or default AI key.
- [ ] The only data Loom Connect receives from installs is Salesforce's License Management App data (Org ID, company, installing admin, licence count).
- [ ] Admins accept the terms in the app, and each user acknowledges the Acceptable Use Policy the first time they open LoomConnect AI (the AUP and Terms say this happens; confirm the package does it, or change the wording).
- [ ] Only Anthropic and OpenAI are supported providers (AI transparency page).
- [ ] Uninstalling LoomConnect AI deletes its objects and records.

If any of these stop being true, Loom Connect becomes a processor for that flow. Update `src/components/legal/DataPath.astro`, the Data processing page and the sub-processors list, and you'll need a DPA.

## Questions for the solicitor

1. Is "software supplier, not a processor" the right position for a package that runs entirely in the subscriber's org, given we have temporary support login access when the customer grants it?
2. Does the DPA template for support access only need to exist, and what should it contain? (The Data processing page promises one on request.)
3. Liability cap and exclusions in the Terms: enforceable under the Unfair Contract Terms Act 1977 for B2B, especially for the Free plan?
4. Is the indemnity in the Terms reasonable for a sole trader supplying businesses?
5. Auto-renewal and price-change wording: fine for business customers only?
6. Interplay with Salesforce's AppExchange partner terms and any terms AppExchange Checkout requires us to show.
7. EU customers: do we need an EU representative (GDPR Art. 27) given we only hold contact and billing data? Any EU AI Act transparency duties for us as the software supplier, or do they sit with the subscriber as deployer?
8. Do we need an Enterprise order form or master agreement template, given the pricing page promises "signed contract and data processing terms"?

## Not done yet

- DPA template for support access (promised on the Data processing page)
- Enterprise agreement / order form template
- In-app terms acceptance screen, if the package doesn't already have one
