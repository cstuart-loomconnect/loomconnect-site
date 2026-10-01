import { site } from '../site.config.js';

export function GET() {
  const body = site.private
    ? 'User-agent: *\nDisallow: /\n'
    : 'User-agent: *\nAllow: /\n';
  return new Response(body, { headers: { 'Content-Type': 'text/plain' } });
}
