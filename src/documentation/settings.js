// Settings for the documentation section at /documentation.
// The sidebar, step numbers, next and previous links and the home page all read from this file.
// To add a page: add a line to "pages" below, then create the matching file in src/pages/documentation/.

// The address every documentation page lives under.
export const docsBase = '/documentation';

// The LoomConnect AI version these pages were last checked against. Shown at the bottom of every page.
export const checkedAgainst = 'LoomConnect AI 0.1';

// While true, a missing screenshot shows a dashed placeholder saying what to capture.
// Set to false before launch to hide any screenshots you haven't added yet.
export const showScreenshotPlaceholders = true;

// The sidebar groups, in order. The group with "setup: true" is drawn as the numbered setup path.
export const sections = [
  { id: 'setup', title: 'Set up LoomConnect AI', setup: true },
  { id: 'tools', title: 'Teach it more' },
  { id: 'run', title: 'Run it day to day' },
  { id: 'help', title: 'Get help' },
];

// Every page, in reading order.
// slug: the end of the address, so 'install' becomes /documentation/install. The home page has an empty slug.
// title: the page heading. nav: the shorter name in the sidebar.
// section: which group above it belongs to. minutes: rough time to read and do it (leave out for look-up pages).
// description: one sentence for search engines and the home page.
export const pages = [
  { slug: '', title: 'LoomConnect AI documentation', nav: 'Start here', section: null, description: 'Set up and run LoomConnect AI in your Salesforce org.' },

  { slug: 'before-you-install', title: 'Before you install', nav: 'Before you install', section: 'setup', minutes: 5, description: 'What to have ready before you install LoomConnect AI.' },
  { slug: 'install', title: 'Install the package', nav: 'Install the package', section: 'setup', minutes: 10, description: 'Install LoomConnect AI from AppExchange and check it worked.' },
  { slug: 'connect-your-ai-provider', title: 'Connect your AI provider', nav: 'Connect your AI provider', section: 'setup', minutes: 20, description: 'Store your API key safely in Salesforce and connect a model.' },
  { slug: 'give-people-access', title: 'Choose who gets access', nav: 'Choose who gets access', section: 'setup', minutes: 5, description: 'Which LoomConnect AI permission set to give each person.' },
  { slug: 'set-a-usage-policy', title: 'Set a usage policy', nav: 'Set a usage policy', section: 'setup', minutes: 5, description: 'Create the default policy every user needs before they can chat.' },
  { slug: 'prompt-templates', title: 'Write a prompt template', nav: 'Write a prompt template', section: 'setup', minutes: 10, description: 'Tell the assistant who it is, how to sound and what it must never do.' },
  { slug: 'protect-personal-data', title: 'Protect personal data', nav: 'Protect personal data', section: 'setup', minutes: 10, description: 'Mask personal details before anything leaves Salesforce.' },
  { slug: 'create-an-agent', title: 'Create your first agent', nav: 'Create your first agent', section: 'setup', minutes: 15, description: 'Build an agent with the AI Agent Wizard.' },
  { slug: 'add-the-chat-window', title: 'Add the chat window to a page', nav: 'Add the chat window', section: 'setup', minutes: 5, description: 'Put the LoomConnect AI chat window on a record page or utility bar.' },
  { slug: 'check-it-works', title: 'Check it works', nav: 'Check it works', section: 'setup', minutes: 5, description: 'What your users see, and a checklist before go-live.' },

  { slug: 'data-sources', title: 'Let agents read more data', nav: 'Data sources', section: 'tools', minutes: 10, description: 'Give an agent queries or Apex classes it can read from.' },
  { slug: 'workflow-actions', title: 'Let agents take actions', nav: 'Workflow actions', section: 'tools', minutes: 10, description: 'Let an agent run flows and Apex, always with the user confirming.' },
  { slug: 'skills', title: 'Bundle a job into a skill', nav: 'Skills', section: 'tools', minutes: 10, description: 'Package instructions and tools for one job the agent can do.' },
  { slug: 'slash-commands', title: 'Add slash commands', nav: 'Slash commands', section: 'tools', minutes: 10, description: 'Give users shortcuts like /summary in the chat window.' },

  { slug: 'org-settings', title: 'Org settings', nav: 'Org settings', section: 'run', minutes: 5, description: 'Every switch on the LoomConnect AI Settings tab, explained.' },
  { slug: 'review-conversations', title: 'Review conversations and feedback', nav: 'Review conversations', section: 'run', minutes: 5, description: 'See how LoomConnect AI is being used, and what users think.' },

  { slug: 'troubleshooting', title: 'Troubleshooting', nav: 'Troubleshooting', section: 'help', description: 'Common problems and how to fix them.' },
  { slug: 'error-messages', title: 'Error messages', nav: 'Error messages', section: 'help', description: 'Every message LoomConnect AI shows, why it appears and how to fix it.' },
  { slug: 'glossary', title: 'Glossary', nav: 'Glossary', section: 'help', description: 'The words used in these pages, in plain English.' },
];
