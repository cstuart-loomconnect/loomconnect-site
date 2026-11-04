// Makes every <Tabs> block on the page work: click or use the arrow keys to switch panels.
// Runs once per page. The markup comes from src/components/docs/Tabs.astro.

export function setUpTabs() {
  document.querySelectorAll('[data-tabs]').forEach((tabsBlock, blockIndex) => {
    const tabList = tabsBlock.querySelector('[role="tablist"]');
    const tabs = Array.from(tabList.querySelectorAll('[role="tab"]'));
    const panels = Array.from(tabsBlock.querySelectorAll(':scope > [data-tab-panel]'));

    // Stop if the tabs and panels don't match up, so every panel stays visible
    if (tabs.length !== panels.length || tabs.length === 0) return;

    // Link each tab to its panel so screen readers announce them together
    tabs.forEach((tab, index) => {
      const tabId = `tabs-${blockIndex}-tab-${index}`;
      const panelId = `tabs-${blockIndex}-panel-${index}`;
      tab.id = tabId;
      tab.setAttribute('aria-controls', panelId);
      panels[index].id = panelId;
      panels[index].setAttribute('role', 'tabpanel');
      panels[index].setAttribute('aria-labelledby', tabId);
    });

    // Show one panel and mark its tab as selected
    function select(index, moveFocus) {
      tabs.forEach((tab, i) => {
        const isSelected = i === index;
        tab.setAttribute('aria-selected', String(isSelected));
        tab.tabIndex = isSelected ? 0 : -1;
        panels[i].hidden = !isSelected;
      });
      if (moveFocus) tabs[index].focus();
    }

    // Clicks pick a tab; left and right arrows move between tabs
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(index, false));
      tab.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') select((index + 1) % tabs.length, true);
        if (event.key === 'ArrowLeft') select((index - 1 + tabs.length) % tabs.length, true);
      });
    });

    // Reveal the tab bar and start on the first tab
    tabList.hidden = false;
    tabsBlock.classList.add('is-ready');
    select(0, false);
  });
}
