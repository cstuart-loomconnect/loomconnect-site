// Anti-spam helper for the Salesforce forms. Runs once per page.
// Fills each timer field with the number of seconds since the page loaded, at the moment of submit.
// Bots tend to submit instantly (or without running scripts at all, which leaves the field empty),
// so a Salesforce Flow can treat a very low or missing value as suspect.
// The markup comes from src/components/FormGuard.astro.

export function setUpFormGuard() {
  const loadedAt = Date.now();
  document.querySelectorAll('form').forEach((form) => {
    const timer = form.querySelector('[data-form-timer]');
    if (!timer) return;
    form.addEventListener('submit', () => {
      timer.value = String(Math.round((Date.now() - loadedAt) / 1000));
    });
  });
}
