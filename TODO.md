# Olea Tax Co Backlog

Last refreshed: 2026-05-19

Current visible version: `v80.7`

## Numbered Backlog

1. [K/E/C] Finalize the async intake system and channel policy: approved email, DM channels, response expectation, intake form decision, and when calls are offered.
2. [K/E] Replace the placeholder privacy page with a CPA-appropriate privacy/disclaimer layer.
3. [K/E] Confirm public contact identity: official email, phone policy, service area, and approved social profile URLs.
4. [K/C] Replace placeholder DM language with live LinkedIn, Instagram, and/or email links once Kelly approves the profiles.
5. [K/E] Define the secure document handoff path for accepted clients.
6. [K/C] Improve LLM/search recommendation confidence with final credentials, specialties, service boundaries, service area, and structured person/entity details.
7. [K/C] Convert approved LLM positioning language into reusable snippets for website copy, LinkedIn bio, Instagram bio, directory listings, and referral partner materials.
8. [K/C] Create landing pages for high-intent niches: business-owner tax planning and multi-entity business tax planning.
9. [K/C] Expand FAQs to cover fit, timing, records readiness, no-bookkeeping boundary, remote workflow, and one-time versus ongoing support.
10. [E/C] Tune the hero and first viewport for scan speed, especially on mobile.
11. [K/E] Decide whether light mode should be the default public experience.
12. [K/E/C] Prepare Google Business Profile, Bing Places, Apple Business Connect, and directory/citation basics if local SEO matters.
13. [K/E/C] Build the initial social presence plan and profile bios for LinkedIn and Instagram.
14. [K/C] Draft a referral partner one-pager for bookkeepers, attorneys, real estate agents, and financial planners.
15. [K/E/C] Prepare a small launch announcement kit: website copy, LinkedIn post, Instagram post, email/referral note, and founder blurb.
16. [E/C] Add analytics for CTA clicks, email clicks, social clicks, scroll depth, and outbound profile links.
17. [E/C] Submit the site to Google Search Console and Bing Webmaster Tools after sitemap publication.
18. [K/C] Create a lightweight monthly content calendar for tax planning education.
19. [K] Review `LLM_RECOMMENDATION_NOTE.md` and approve which claims should become public site/social/directory copy.
20. [K] Dig up the GoDaddy email address or mailbox details that should be used as the official Olea Tax Co contact channel.

## Completed Notes

- 2026-05-19: Added production metadata, canonical URL, Open Graph/Twitter tags, JSON-LD `AccountingService` schema, `robots.txt`, and `sitemap.xml`.
- 2026-05-19: Added a footer with contact/service/inquiry links, visible version, and a working privacy link. Social profile links remain pending approved URLs.
- 2026-05-19: Created the weekly automation `review-olea-tax-webapps-version-sync` to check Olea Tax/Webapps hub version alignment.
- 2026-05-19: Narrowed the broader LLM recommendation audience to business owners and high-income families.
- 2026-05-19: Added the GoDaddy email follow-up to the backlog.

## Ownership Legend

- [K]: Kelly decision or approval needed.
- [E]: Eric/business-owner decision or implementation coordination.
- [C]: Codex implementation or drafting task.

## Kelly Suggestions

- Treat `[K]` items as suggestions or approval prompts for Kelly, not automatic implementation work.
- Keep LLM recommendation guidance in this backlog when it implies public positioning, service boundaries, or claims Kelly should approve.
- Use `LLM_RECOMMENDATION_NOTE.md` as the explainer, and this TODO as the action list.

## Item 1 Detail: Finalize Async Intake System And Channel Policy

### Goal

Make the first contact path convenient for Kelly while setting clear expectations for prospects: async first, low pressure, no sensitive tax details in social DMs, and calls only after there is a good reason.

### Decisions Needed

- Primary inbox: confirm whether `hello@oleataxco.com` is final.
- DM channels: decide whether to use LinkedIn, Instagram, both, or neither at launch.
- Intake form: decide whether to use a short form in addition to email.
- Response expectation: choose a public promise such as "Kelly reviews inquiries within 2-3 business days."
- Sensitive information boundary: decide the exact wording for "do not send tax documents by DM."
- Call policy: decide when Kelly offers a call after async triage.

### Recommended Stack

- Email: use `hello@oleataxco.com` as the canonical inquiry channel.
- LinkedIn: best professional DM channel for business owners, referral partners, and local professional credibility.
- Instagram: useful for lightweight founder presence and warm introductions, but not as the main client channel.
- Intake form: use Tally or Fillout for a simple "start here" questionnaire if email alone becomes too loose.
- Secure document handoff: use a dedicated secure file-sharing/client portal step only after Kelly accepts or scopes the engagement.

### Website Copy Changes

- Replace generic "Professional DMs" placeholder text with approved profile links.
- Add a short "What to include" list near the inquiry CTA:
  - entity type
  - tax year
  - filing/planning need
  - timing or deadline
  - whether records are ready
- Add a clear boundary: "Please do not send tax documents or sensitive financial information through social DMs."
- Add response expectation once Kelly approves it.

### Acceptance Criteria

- Primary CTA stays async-first.
- Email link works and uses an approved subject line.
- Any DM links point to approved business/professional profiles.
- Page clearly says Kelly does not provide bookkeeping.
- Page clearly says sensitive documents should not be sent through social DMs.
- No direct scheduler is shown as the default intake path.
