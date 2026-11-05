# Salesforce setup for the website forms

A copy of what was deployed to the LoomConnect org (alias `LoomConnect`) so it's on record. The site doesn't read these files.

| File | What it does |
| --- | --- |
| `settings/Case.settings-meta.xml` | Turns Web-to-Case on, sets the default case owner, and sets the default response template |
| `autoResponseRules/Case.autoResponseRules-meta.xml` | Auto-response rule: emails the customer when a case is created |
| `email/unfiled$public/Web_Case_Received.*` | The email: gives the customer their case number |

Re-deploy from this folder with:

```
sf project deploy start -d force-app -o LoomConnect
```

Things to change later:
- The auto-response is sent from `cstuart@loomconnect.com`. Once there is an org-wide email address for `support@loomconnect.com` (Setup, Organization-Wide Addresses, then verify it), change `senderEmail` in the rule.
- New cases are owned by `cstuart@loomconnect.com`. Change the default case owner to a queue when other people handle support.
