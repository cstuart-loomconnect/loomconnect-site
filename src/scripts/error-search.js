// Search box and filter buttons on /documentation/error-messages.
// Without JavaScript the page still shows every message, grouped by where it appears.

export function setUpErrorSearch() {
  const searchBox = document.querySelector('[data-error-search]');
  const filterButtons = document.querySelectorAll('[data-error-filter]');
  const areaSections = document.querySelectorAll('[data-error-area]');
  const countLine = document.querySelector('[data-error-count]');
  const emptyMessage = document.querySelector('[data-error-empty]');
  if (!searchBox) return;

  let activeArea = 'all';

  // Show only the messages that match the chosen area and every word typed
  function update() {
    const words = searchBox.value.toLowerCase().split(/\s+/).filter(Boolean);
    let shownTotal = 0;

    areaSections.forEach((section) => {
      const areaMatches = activeArea === 'all' || section.dataset.errorArea === activeArea;
      let shownInArea = 0;

      section.querySelectorAll('[data-error-item]').forEach((item) => {
        const textMatches = words.every((word) => item.dataset.search.includes(word));
        const isShown = areaMatches && textMatches;
        item.hidden = !isShown;
        if (isShown) shownInArea += 1;
      });

      section.hidden = shownInArea === 0;
      shownTotal += shownInArea;
    });

    emptyMessage.hidden = shownTotal > 0;
    countLine.textContent = words.length ? `${shownTotal} ${shownTotal === 1 ? 'message matches' : 'messages match'}` : '';
  }

  // A filter button marks itself pressed and the others not
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      activeArea = button.dataset.errorFilter;
      filterButtons.forEach((other) => other.setAttribute('aria-pressed', String(other === button)));
      update();
    });
  });

  searchBox.addEventListener('input', update);
}
