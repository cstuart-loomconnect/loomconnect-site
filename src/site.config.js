// Central settings for loomconnect.com.
// Change values here and every page picks them up.

export const site = {
  name: 'Loom Connect',
  product: 'AI Assist',
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

  // Replace with the real listing URL once AI Assist is on AppExchange.
  appExchangeUrl: '#',

  // Plan prices and limits shown on the pricing and support pages.
  // Prices are per Salesforce org per month, with unlimited users.
  // Keep the limits in step with the MaxActiveAgents and MaxActiveDataSources feature parameters in the package.
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
  orgId: '', // 15-character Org ID, e.g. 00D5g000001AbCd

  webToLead: {
    action: 'https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8',
    returnUrl: 'https://loomconnect.com/demo/thanks',
    leadSource: 'Website - Demo',
    teamSizeFieldId: '', // Field ID of TeamSize__c on Lead, e.g. 00N5g00000ABCDE
  },

  webToCase: {
    action: 'https://webto.salesforce.com/servlet/servlet.WebToCase?encoding=UTF-8',
    returnUrl: 'https://loomconnect.com/support/thanks',
    orgIdFieldId: '', // Field ID of SalesforceOrgId__c on Case
  },
};

export const salesforceReady = salesforce.orgId.length > 0;
