// Central settings for loomconnect.com.
// Change values here and every page picks them up.

export const site = {
  name: 'LoomConnect',
  product: 'LoomConnect AI',
  url: 'https://loomconnect.com',

  // UK business-name rules: a sole trader using a trading name must show
  // their legal name and a UK address for correspondence on the website.
  owner: {
    legalName: 'Chandler Stuart',
    address: '[UK ADDRESS FOR CORRESPONDENCE]',
  },

  // While true, every page is marked noindex and robots.txt blocks crawlers.
  // Set to false on launch day.
  private: true,

  email: {
    hello: 'hello@loomconnect.com',
    support: 'support@loomconnect.com',
    security: 'security@loomconnect.com',
    privacy: 'privacy@loomconnect.com',
  },

  // Replace with the real listing URL once LoomConnect AI is on AppExchange.
  appExchangeUrl: '#',

  // Plan prices and limits shown on the pricing and support pages.
  // Prices are per Salesforce org per month, with unlimited users.
  // The package does not enforce these limits yet. They come back as feature parameters once there is a License Management Org.
  pricing: {
    freeAgents: 1,
    freeDataSources: 3,
    freeResponseTime: '3 working days',
    proAnnual: '£250', // billed annually
    proMonthly: '£300', // billed monthly
    proAgents: 10,
    proDataSources: 25,
    enterpriseFrom: '£750', // annual only
    noticePeriod: '60 days', // notice existing customers get before a price change
  },

  // Placeholders shown on the site until you fill them in.
  placeholders: {
    securityReviewStatus: '[IN PROGRESS]',
    legalLastUpdated: '[DATE]',
    currentVersion: '[1.0]',
    releaseDate: '[DATE]',
  },

  // Legal pages. Fill these in with your solicitor, then set legal.draft to false.
  legal: {
    draft: true, // Shows the "draft for solicitor review" note on every legal page
    version: '0.1', // Bump this whenever a legal page changes
    icoNumber: '[ICO REGISTRATION NUMBER]', // From ico.org.uk once you've paid the data protection fee
    liabilityCap: '[the fees you paid us in the 12 months before the claim, or £100 if you are on the Free plan]',
    paymentProvider: '[PAYMENT PROVIDER, e.g. AppExchange Checkout or Stripe]',
    emailProvider: '[EMAIL PROVIDER]',
    minimumTerm: '[one month]',
    leadRetention: '[24 months]', // How long demo requests are kept with no further contact
    caseRetention: '[6 years]', // How long support cases and billing records are kept
  },
};

// Salesforce form settings. Leave orgId empty until your Partner Business Org
// is live: the forms then skip Salesforce and go straight to the thank-you
// pages, so you can click through the journey while building.
export const salesforce = {
  orgId: '00DQH00000LU85h', // 15-character Org ID, e.g. 00D5g000001AbCd

  webToLead: {
    action: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
    returnUrl: 'https://loomconnect.com/demo/thanks',
    leadSource: 'Website - Demo',
    teamSizeFieldId: '', // Field ID of TeamSize__c on Lead, e.g. 00N5g00000ABCDE
    // Spam traps. Create these two fields on Lead, then paste their field IDs. See the README for the Flow that uses them.
    honeypotFieldId: '', // Text field a human never fills in, e.g. WebsiteTrap__c
    timerFieldId: '', // Number field for seconds taken to submit, e.g. SecondsToSubmit__c
  },

  webToCase: {
    action: 'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8',
    returnUrl: 'https://loomconnect.com/support/thanks',
    orgIdFieldId: '', // Field ID of SalesforceOrgId__c on Case
    // Spam traps, same as Web-to-Lead. Create these two fields on Case, then paste their field IDs.
    honeypotFieldId: '',
    timerFieldId: '',
  },
};

// Cloudflare Turnstile (the anti-bot check). Paste the PUBLIC site key from the Cloudflare dashboard.
// The secret key never goes here: store it with `npx wrangler secret put TURNSTILE_SECRET`.
// While siteKey is empty the forms post straight to Salesforce, as before. Once it is set, they post to
// the Worker (src/worker.js), which checks Turnstile and only then forwards to Salesforce.
export const turnstile = {
  siteKey: '0x4AAAAAAF1R7T5vYujf_4BY', // e.g. 0x4AAAAAAA...
  verifyUrl: 'https://challenges.cloudflare.com/turnstile/v0/siteverify',
};

export const useProxy = turnstile.siteKey.length > 0;

export const salesforceReady = salesforce.orgId.length > 0;
