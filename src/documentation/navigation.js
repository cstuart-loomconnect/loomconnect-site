// Helpers that turn settings.js into what the layout needs: links, step numbers, next and previous pages.
// You shouldn't need to edit this file. Change settings.js instead.

import { docsBase, pages, sections } from './settings.js';

// The pages on the numbered setup path, in order.
const setupSectionIds = sections.filter((section) => section.setup).map((section) => section.id);
export const setupPages = pages.filter((page) => setupSectionIds.includes(page.section));

// The full address of a page, e.g. '/documentation/install'.
export function pageUrl(slug) {
  return slug ? `${docsBase}/${slug}` : docsBase;
}

// The settings for one page. Throws a clear error at build time if the slug is missing from settings.js.
export function getPage(slug) {
  const page = pages.find((item) => item.slug === slug);
  if (!page) throw new Error(`No page with slug "${slug}" in src/documentation/settings.js`);
  return page;
}

// The sidebar group a page belongs to, or undefined for the home page.
export function getSection(page) {
  return sections.find((section) => section.id === page.section);
}

// The pages in one sidebar group.
export function pagesInSection(sectionId) {
  return pages.filter((page) => page.section === sectionId);
}

// For a setup page, its step number and the total, e.g. { number: 3, total: 10 }. Otherwise null.
export function getStep(slug) {
  const index = setupPages.findIndex((page) => page.slug === slug);
  return index === -1 ? null : { number: index + 1, total: setupPages.length };
}

// The pages before and after this one, in the order they appear in settings.js.
export function getPrevNext(slug) {
  const index = pages.findIndex((page) => page.slug === slug);
  return { previous: pages[index - 1] ?? null, next: pages[index + 1] ?? null };
}

// Total minutes for the whole setup path, shown on the home page and sidebar.
export const setupMinutes = setupPages.reduce((total, page) => total + (page.minutes ?? 0), 0);
