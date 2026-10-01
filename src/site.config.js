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

  // Placeholders shown on the site until you fill them in.
  placeholders: {
    proPrice: '[£X]',
    freeDataSources: '[X]',
    freeResponseTime: '[X working days]',
    noticePeriod: '[NOTICE PERIOD]',
    securityReviewStatus: '[IN PROGRESS]',
    legalLastUpdated: '[DATE]',
    currentVersion: '[1.0]',
    releaseDate: '[DATE]',
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
