// Every screenshot used in the documentation.
// To add one: save the PNG in public/documentation/screenshots/, then put its file name in "file" below.
// Until "file" is filled in, the page shows a dashed placeholder describing what to capture.
// width and height are the image's real size in pixels. They stop the page jumping while the image loads.
// Before taking a screenshot, hide anything personal: real names, emails, record data and API keys.

export const screenshots = {
  'install-for-admins': {
    file: '',
    width: 1600, height: 900,
    alt: 'The AppExchange install screen with Install for Admins Only selected',
    capture: 'The AppExchange install screen with "Install for Admins Only" selected.',
  },
  'external-credential': {
    file: 'external-credential.png',
    width: 1600, height: 900,
    alt: 'An External Credential in Setup with an ApiKey parameter and an x-api-key header',
    capture: 'Setup > Named Credentials > External Credentials, showing the principal with the ApiKey parameter and the custom header. Blur the key.',
  },
  'named-credential': {
    file: 'named-credential.png',
    width: 1600, height: 900,
    alt: 'A Named Credential pointing at https://api.anthropic.com',
    capture: 'The Named Credential detail page with the URL and the External Credential it uses.',
  },
  'principal-access': {
    file: 'principal-access.png',
    width: 1600, height: 900,
    alt: 'A permission set giving access to the External Credential principal',
    capture: 'A permission set\'s External Credential Principal Access page with your AI Assist principal added.',
  },
  'model-connected': {
    file: '',
    width: 1600, height: 900,
    alt: 'The AI Agent Models tab with a passing connection test',
    capture: 'The AI Agent Models tab, with a model open and the connection test showing Connected.',
  },
  'default-policy': {
    file: 'default-policy.png',
    width: 1600, height: 900,
    alt: 'The AI Policies tab with a default policy',
    capture: 'The AI Policies tab with a policy open and Default ticked.',
  },
  'prompt-editor': {
    file: 'prompt-editor.png',
    width: 1600, height: 900,
    alt: 'The AI Prompt Templates tab with the template editor open',
    capture: 'The AI Prompt Templates tab with a template open in the editor.',
  },
  'pii-registry': {
    file: 'pii-registry.png',
    width: 1600, height: 900,
    alt: 'The AI PII Registry tab showing an object\'s fields sorted into personal and not personal',
    capture: 'The AI PII Registry tab with an object selected and its fields listed.',
  },
  'pii-warning': {
    file: 'pii-warning.png',
    width: 1600, height: 500,
    alt: 'The warning on the PII Registry tab about objects agents read that are not in the registry',
    capture: 'The warning at the top of the AI PII Registry tab listing objects that are read by agents but not in the registry.',
  },
  'wizard-basics': {
    file: 'wizard-basics.png',
    width: 1600, height: 900,
    alt: 'The Basics step of the AI Agent Wizard',
    capture: 'The AI Agent Wizard on the Basics step, filled in for a test agent.',
  },
  'wizard-review': {
    file: 'wizard-review.png',
    width: 1600, height: 900,
    alt: 'The Review step of the AI Agent Wizard with a test reply',
    capture: 'The AI Agent Wizard on the Review step, after sending a test message.',
  },
  'app-builder-chat': {
    file: 'app-builder-chat.png',
    width: 1600, height: 900,
    alt: 'Lightning App Builder with the AI Assist Chat component on a record page',
    capture: 'Lightning App Builder with AI Assist Chat dropped into the right-hand column and its settings showing.',
  },
  'terms-screen': {
    file: 'terms-screen.png',
    width: 900, height: 1100,
    alt: 'The terms screen a user sees the first time they open the chat window',
    capture: 'The chat window showing the terms screen, as a test user seeing it for the first time.',
  },
  'chat-window': {
    file: 'chat-window.png',
    width: 900, height: 1100,
    alt: 'The AI Assist chat window answering a question about a record',
    capture: 'The chat window on a record page with a question and an answer. Use a test record.',
  },
  'data-source-builder': {
    file: 'data-source-builder.png',
    width: 1600, height: 900,
    alt: 'The data source wizard on the AI Tools tab, building a query',
    capture: 'AI Tools > Data sources, with the query builder open.',
  },
  'action-confirm': {
    file: 'action-confirm.png',
    width: 900, height: 700,
    alt: 'The chat window asking the user to confirm an action before it runs',
    capture: 'The chat window showing a workflow action waiting for the user to confirm.',
  },
  'skill-wizard': {
    file: 'skill-wizard.png',
    width: 1600, height: 900,
    alt: 'The skill wizard on the AI Tools tab, on the Tools step',
    capture: 'AI Tools > Skills, with the skill wizard open on the Tools step.',
  },
  'settings-tab': {
    file: 'settings-tab.png',
    width: 1600, height: 900,
    alt: 'The AI Assist Settings tab',
    capture: 'The AI Assist Settings tab, scrolled to the top.',
  },
  'conversations-list': {
    file: 'conversations-list.png',
    width: 1600, height: 900,
    alt: 'The AI Conversations tab with its list views',
    capture: 'The AI Conversations tab with the list view picker open.',
  },
};
