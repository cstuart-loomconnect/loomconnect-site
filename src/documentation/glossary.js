// Words used in the documentation, in plain English. Used by /documentation/glossary.
// Keep them in alphabetical order. "link" is optional and points to the page that explains the term in full.

export const glossary = [
  { term: 'Agent', definition: 'The assistant your users talk to. It combines a model, a prompt template, and the data and actions it is allowed to use.', link: 'create-an-agent' },
  { term: 'Channel', definition: 'Where the chat window is used: on a record page, in the utility bar or on mobile. Usage policies can allow some channels and not others.', link: 'set-a-usage-policy' },
  { term: 'Data source', definition: 'Something an agent can read, such as a query for a contact\'s open cases. It always runs as the user, so they only see what they could already see.', link: 'data-sources' },
  { term: 'External Credential', definition: 'A Salesforce Setup item that stores a secret, such as your AI provider\'s API key, so it never appears in code or records.', link: 'connect-your-ai-provider' },
  { term: 'Model', definition: 'The AI that writes the answers, such as a Claude or GPT model, reached through your own provider account.', link: 'connect-your-ai-provider' },
  { term: 'Named Credential', definition: 'A Salesforce Setup item that holds the address of your AI provider and uses an External Credential to sign in.', link: 'connect-your-ai-provider' },
  { term: 'Personal data (PII)', definition: 'Details that identify a person, such as names, emails and phone numbers. AI Assist swaps them for placeholders before anything leaves Salesforce.', link: 'protect-personal-data' },
  { term: 'Principal', definition: 'The part of an External Credential that holds the key. Users need access to it through a permission set before their messages can reach your provider.', link: 'connect-your-ai-provider' },
  { term: 'Prompt template', definition: 'Written guidance on who the agent is, how it should sound and what it must never do.', link: 'prompt-templates' },
  { term: 'Retention', definition: 'How long conversations are kept before the nightly clean-up job deletes them.', link: 'org-settings' },
  { term: 'Skill', definition: 'One job an agent can do, with its own instructions, data sources and actions.', link: 'skills' },
  { term: 'Slash command', definition: 'A shortcut a user types in the chat window, such as /summarise, that sends a saved prompt.', link: 'slash-commands' },
  { term: 'Token', definition: 'How AI providers measure use, and what you pay for. A token is roughly three quarters of a word.' },
  { term: 'Usage policy', definition: 'Daily limits and permissions for a group of users. Everyone needs one, so one policy must be the default.', link: 'set-a-usage-policy' },
  { term: 'Workflow action', definition: 'Something an agent can change, by running a flow or Apex class. The user always confirms first.', link: 'workflow-actions' },
];
