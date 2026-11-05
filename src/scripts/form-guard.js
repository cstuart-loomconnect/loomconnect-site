// Anti-spam helper for the Salesforce forms. Runs once per page.
// Fills each timer field with the number of seconds since the page loaded, at the moment of submit.
// Bots tend to submit instantly (or without running scripts at all, which leaves the field empty),
// so a Salesforce Flow can treat a very low or missing value as suspect.
// The markup comes from src/components/FormGuard.astro.

const ERRORS = {
  verify: "We couldn't confirm you're human. Please try again.",
  invalid: 'Some details look wrong. Please check the form and try again.',
  send: "We couldn't send that just now. Please try again, or email us instead.",
};

export function setUpFormGuard() {
  const message = ERRORS[new URLSearchParams(location.search).get('error')];
  const banner = document.querySelector('[data-form-error]');
  if (banner && message) {
    banner.textContent = message;
    banner.hidden = false;
  }

  const loadedAt = Date.now();
  document.querySelectorAll('form').forEach((form) => {
    const timer = form.querySelector('[data-form-timer]');
    if (!timer) return;
    form.addEventListener('submit', () => {
      timer.value = String(Math.round((Date.now() - loadedAt) / 1000));
    });
  });
}
