// Builds the "On this page" list from the h2 headings in the article.
// A heading needs an id to be listed, e.g. <h2 id="part-1">Part 1</h2>.

export function buildOnThisPage() {
  const list = document.querySelector('[data-on-this-page]');
  const headings = document.querySelectorAll('.docs-article h2[id]');

  // Leave the column empty when a page has fewer than two sections
  if (!list || headings.length < 2) return;

  const title = document.createElement('p');
  title.textContent = 'On this page';
  list.append(title);

  headings.forEach((heading) => {
    const link = document.createElement('a');
    link.href = `#${heading.id}`;
    link.textContent = heading.textContent;
    list.append(link);
  });
}
