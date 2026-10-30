# Green Shield — bilingual marketing website

Portable static-export Next.js website: Home, About, Products & Sourcing, and Contact in English and French. Independent of the CRM. No CRM records, private research, passwords, or backend integrations are included.

## Build and checks
Node.js 24 recommended. Run `npm ci`, then `npm run check` (language/image tests, TypeScript, production build, exported-route and publication checks). Static output: `out/`.

## Existing deployment
Public preview: https://greenshield-site.vavqo.com/ . Repository: Valenthino/green-shield-website-, main branch. Existing separate marketing application on Coolify. Build context: repository root `/`; Dockerfile: `/Dockerfile`. Docker builds with Node 24 and serves `out/` using Nginx on port 80. No environment variables, persistent volume, database, or Node runtime required. TLS terminates at the reverse proxy. Healthcheck: `GET /`.

Do not change the separate CRM repository, app, datastore, or runtime environment. A hostname-root deployment is expected; no basePath is configured. Preserve existing resources.

## Languages
`/` defaults to English. Routes:
- `/en/`, `/en/about/`, `/en/cocoa/`, `/en/contact/`
- `/fr/`, `/fr/about/`, `/fr/cocoa/`, `/fr/contact/`

The EN/FR switch preserves the current page. Saved preference wins over browser language. With no saved choice, French primary browser language produces a suggestion. Language choice is the only localStorage value.

## Content and media
Editorial copy is in `src/content/redesign.ts`; shared business fields, language labels and enquiry templates are in `src/content/site.ts`. The redesign uses the existing five approved historical Côte d’Ivoire photographs. No new personal portrait is published. The founder's base is not a statement of company domicile. Family cocoa trading experience is distinct from Green Shield's age, export history or capacity. Product availability and trade terms are discussed case by case.

Unknown company particulars and email are omitted from the rendered site, not replaced with invented claims. Confirm factual details before adding them. The About page's wide field-media section can display an approved video by setting `business.introductionVideo`; until then it presents a useful photograph and caption without a fake playback control. Only add a founder portrait after publication authorization for the public repository and website.

The public marketing preview remains noindex. Noindex is not authentication. Enquiry templates copy text only; nothing sends or is stored. No tracking, analytics, external fonts, mailbox or CRM connection.
