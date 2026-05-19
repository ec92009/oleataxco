# Olea Tax Co Backlog

Last refreshed: 2026-05-19

## Numbered Backlog

1. [K/E/C] Finalize the async intake system and channel policy.
2. [C] Done 2026-05-19 - Add production SEO foundations: title/description, canonical, Open Graph, Twitter card, sitemap, robots, and schema.
3. [K/E] Add a privacy/disclaimer layer suitable for a CPA lead-generation site.
4. [K/E] Finalize contact identity: official email, service area, optional phone policy, and social profile URLs.
5. [C] Done currently possible 2026-05-19 - Add a footer with legal/contact basics, version, and privacy link. Social links remain pending approved profile URLs in item 11.
6. [K/C] Improve LLM/search recommendation confidence with explicit credentials, specialties, service boundaries, and entity/person structured data.
7. [K/C] Create landing pages for high-intent niches: business-owner tax planning and real-estate investor tax planning.
8. [K/C] Expand FAQs to cover fit, timing, records readiness, no-bookkeeping boundary, remote workflow, and one-time versus ongoing support.
9. [E/C] Tune the hero and first viewport for scan speed, especially on mobile.
10. [K/E] Decide whether light mode should be the default public experience.
11. [K/C] Replace placeholder DM language with live LinkedIn/Instagram/email links once Kelly approves the profiles.
12. [K/E] Define the secure document handoff path for accepted clients.
13. [K/E/C] Prepare Google Business Profile, Bing Places, Apple Business Connect, and directory/citation basics if local SEO matters.
14. [K/E/C] Build the initial social presence plan and profile bios for LinkedIn and Instagram.
15. [K/C] Draft a referral partner one-pager for bookkeepers, attorneys, real estate agents, and financial planners.
16. [K/E/C] Prepare a small launch announcement kit: website copy, LinkedIn post, Instagram post, email/referral note, and founder blurb.
17. [E/C] Add analytics for CTA clicks, email clicks, social clicks, scroll depth, and outbound profile links.
18. [E/C] Submit the site to Google Search Console and Bing Webmaster Tools after sitemap publication.
19. [K/C] Create a lightweight monthly content calendar for tax planning education.
20. [C] Done 2026-05-19 - Set up a recurring review of Webapps hub metadata whenever Olea Tax gets a visible version bump.

## Completed Notes

- Item 2: Added production metadata, canonical URL, Open Graph/Twitter tags, JSON-LD `AccountingService` schema, `robots.txt`, and `sitemap.xml`.
- Item 5: Added a footer with contact/service/inquiry links, visible version, and a working privacy link. The privacy page is intentionally a placeholder pending the fuller K/E privacy/disclaimer work in item 3. Social profile links remain pending item 11.
- Item 20: Created the weekly automation `review-olea-tax-webapps-version-sync` to check Olea Tax/Webapps hub version alignment.

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
