# Green Shield — bilingual marketing website preview

Portable static-export Next.js website: Home, About, Products & Sourcing, Contact, each in English and French. Independent of the CRM. No CRM records, private research, passwords or backend integrations are included here.

## Build and checks
Node.js 24 recommended. Run `npm ci`, then `npm run check` (language tests, TypeScript, build and exported-route checks). Static output: `out/`.

## Deployment
Use a **new, separate marketing website repository**, leaving the CRM repository and application unchanged. Build context: repository root **/**; Dockerfile: **/Dockerfile**. Docker builds with Node 24 and serves `out/` using Nginx on **port 80**. No environment variables, persistent volume, database or Node runtime required. Configure TLS at the reverse proxy. Healthcheck: `GET /`.

Do not change the separate CRM repository, app, datastore or runtime environment. A hostname-root deployment is expected; no basePath is configured.

## Languages
`/` defaults to English. Routes:
- `/en/`, `/en/about/`, `/en/cocoa/`, `/en/contact/`
- `/fr/`, `/fr/about/`, `/fr/cocoa/`, `/fr/contact/`

Persistent EN/FR switch preserves the page. Saved preference wins over browser language. With no saved choice, French primary browser language produces a suggestion, not a silent switch. Language choice is the only localStorage value.

## Content
Edit `src/content/site.ts`. Unknown business facts stay null and render review placeholders, rather than invented claims. Founder display name and country-labelled public business telephone numbers are provided. Email, portrait and optional video remain to be supplied. Founder base is not legal company domicile. Family cocoa trading experience is distinct from this venture's age/export history.

Real user-supplied photos show historical Côte d’Ivoire visits, not current Liberia stock or proof of ownership. No subjects are identified as the founder. Original private source locations are omitted.

This is an online review preview, not finished buyer-facing copy. Noindex is not authentication: this marketing preview contains only intended public business content. Enquiry templates copy text only; nothing sends or is stored. No tracking, analytics, external fonts, mailbox or CRM connection.

The product focus is coffee, cocoa and cashew. Shipment locations are discussion points, subject to product-specific confirmation and quotation; no blanket availability or unconfirmed FOB claim is made. The historical cashew operations gallery is accurately captioned separately from the cocoa field photographs.
