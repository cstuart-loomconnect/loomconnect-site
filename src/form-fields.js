// Names shared by the form pages (via FormGuard.astro) and the Worker (src/worker.js).
// The Worker reads these two fields to catch bots and never forwards them to Salesforce.
export const HONEYPOT_NAME = 'hp_website';
export const TIMER_NAME = 'secs_to_submit';
