// Cloudflare Worker for loomconnect.com.
//
// Serves the built site, and handles the two form endpoints so visitors never post to Salesforce directly:
//   POST /api/demo     -> Salesforce Web-to-Lead
//   POST /api/support  -> Salesforce Web-to-Case
//
// Each submission must pass these checks before anything reaches Salesforce:
//   1. same-origin request, form-encoded, small body
//   2. rate limit per visitor (if the FORM_LIMITER binding exists)
//   3. honeypot empty and not submitted instantly (bots fail these; they get a fake "success")
//   4. Cloudflare Turnstile token verified server-side (needs the TURNSTILE_SECRET Worker secret)
//   5. required fields present, lengths and picklist values valid
// Only an allowlist of fields is forwarded. The org ID comes from the Worker secret SALESFORCE_ORG_ID and is added here, not in the page.

import { salesforce, turnstile } from './site.config.js';
import { HONEYPOT_NAME, TIMER_NAME } from './form-fields.js';

const MIN_SECONDS = 2; // faster than this is a bot
const MAX_BODY_BYTES = 100_000;

// Keep these lists in step with the dropdowns in src/pages/demo/index.astro and src/pages/support/index.astro
const TEAM_SIZES = ['1–10', '11–50', '51–200', '200+'];
const CASE_TYPES = ['Installation', 'Configuration', 'Problem', 'Licensing', 'Other'];
const PRIORITIES = ['Low', 'Medium', 'High'];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const FORMS = {
  '/api/demo': {
    page: '/demo',
    settings: salesforce.webToLead,
    oidName: 'oid',
    fields: {
      first_name: { max: 40, required: true },
      last_name: { max: 80, required: true },
      email: { max: 80, required: true, email: true },
      company: { max: 40, required: true },
      title: { max: 40 },
      description: { max: 32000 },
    },
    build(clean, params, settings) {
      params.set('lead_source', settings.leadSource);
      const size = clean.team_size;
      if (size && !TEAM_SIZES.includes(size)) return false;
      // Without a Salesforce field for it, keep the answer in the description so it isn't lost
      if (size && settings.teamSizeFieldId) params.set(settings.teamSizeFieldId, size);
      else if (size) params.set('description', `${params.get('description') || ''}\n\nTeam size: ${size}`.trim());
      return true;
    },
    extra: { team_size: { max: 20 } },
  },
  '/api/support': {
    page: '/support',
    settings: salesforce.webToCase,
    oidName: 'orgid',
    fields: {
      name: { max: 80, required: true },
      email: { max: 80, required: true, email: true },
      subject: { max: 80, required: true },
      description: { max: 32000, required: true },
    },
    build(clean, params, settings) {
      params.set('origin', 'Web');
      if (!CASE_TYPES.includes(clean.type) || !PRIORITIES.includes(clean.priority)) return false;
      params.set('type', clean.type);
      params.set('priority', clean.priority);
      const orgId = clean.org_id;
      if (orgId && settings.orgIdFieldId) params.set(settings.orgIdFieldId, orgId);
      else if (orgId) params.set('description', `${params.get('description')}\n\nSalesforce Org ID: ${orgId}`);
      return true;
    },
    extra: { type: { max: 40 }, priority: { max: 20 }, org_id: { max: 18 } },
  },
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const form = FORMS[url.pathname];
    if (form) return handleForm(request, env, url, form);
    return env.ASSETS.fetch(request);
  },
};

// Trim, drop control characters, and cap the length
function clean(value, max) {
  if (typeof value !== 'string') return '';
  return value.replace(/[^\P{Cc}\n]/gu, '').trim().slice(0, max);
}

function redirect(url, path) {
  return new Response(null, { status: 303, headers: { Location: new URL(path, url.origin).href, 'Cache-Control': 'no-store' } });
}

function reject(status, message) {
  return new Response(message, { status, headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' } });
}

async function handleForm(request, env, url, form) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: { Allow: 'POST' } });
  if (request.headers.get('Origin') !== url.origin) return reject(403, 'Forbidden');
  if (!(request.headers.get('Content-Type') || '').includes('application/x-www-form-urlencoded')) return reject(415, 'Unsupported media type');
  if (Number(request.headers.get('Content-Length') || 0) > MAX_BODY_BYTES) return reject(413, 'Too large');

  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if (env.FORM_LIMITER) {
    const { success } = await env.FORM_LIMITER.limit({ key: `${url.pathname}:${ip}` });
    if (!success) return reject(429, 'Too many requests. Please wait a minute and try again.');
  }

  let data;
  try {
    data = await request.formData();
  } catch {
    return reject(400, 'Bad request');
  }

  const thanks = new URL(form.settings.returnUrl).pathname;
  if (!env.SALESFORCE_ORG_ID) return reject(503, 'Form temporarily unavailable'); // fail closed

  // Bots get a fake success so they don't learn what tripped them
  const seconds = Number(data.get(TIMER_NAME));
  if (clean(data.get(HONEYPOT_NAME), 200) || !Number.isFinite(seconds) || seconds < MIN_SECONDS) {
    return redirect(url, thanks);
  }

  if (!(await verifyTurnstile(env, data.get('cf-turnstile-response'), ip))) {
    return redirect(url, `${form.page}?error=verify`);
  }

  const values = {};
  const rules = { ...form.fields, ...form.extra };
  for (const [name, rule] of Object.entries(rules)) values[name] = clean(data.get(name), rule.max);
  for (const [name, rule] of Object.entries(form.fields)) {
    if (rule.required && !values[name]) return redirect(url, `${form.page}?error=invalid`);
    if (rule.email && values[name] && !EMAIL.test(values[name])) return redirect(url, `${form.page}?error=invalid`);
  }

  const params = new URLSearchParams();
  params.set(form.oidName, env.SALESFORCE_ORG_ID);
  params.set('retURL', form.settings.returnUrl);
  for (const name of Object.keys(form.fields)) if (values[name]) params.set(name, values[name]);
  if (!form.build(values, params, form.settings)) return redirect(url, `${form.page}?error=invalid`);

  try {
    const response = await fetch(form.settings.action, { method: 'POST', body: params, redirect: 'manual' });
    if (response.status >= 400) return redirect(url, `${form.page}?error=send`);
  } catch {
    return redirect(url, `${form.page}?error=send`);
  }
  return redirect(url, thanks);
}

async function verifyTurnstile(env, token, ip) {
  if (!env.TURNSTILE_SECRET || typeof token !== 'string' || !token) return false; // fail closed
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET, response: token, remoteip: ip });
  try {
    const response = await fetch(turnstile.verifyUrl, { method: 'POST', body });
    const result = await response.json();
    // Log why a check failed (for example "invalid-input-secret") so it shows in Workers Logs. No form data is logged.
    if (result.success !== true) console.warn('Turnstile check failed:', JSON.stringify(result['error-codes'] || []));
    return result.success === true;
  } catch (error) {
    console.warn('Turnstile check could not run:', String(error));
    return false;
  }
}
