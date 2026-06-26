# Olea Tax Co Backlog

Last refreshed: 2026-06-26

Current visible version: `v118.0`

## Numbered Backlog

1. [E/C] Validate the Cloudflare custom booking prototype locally with Kelly seed data.
2. [K/E] Confirm Kelly's first bookable service names, durations, buffers, and manual-approval policy.
3. [E/C] Build the embeddable booking UI for Kelly's private Squarespace site.
4. [E/C] Add admin-safe availability management for weekly hours and blackout dates.
5. [E/C] Add email notifications for new pending booking requests.
6. [E/C] Define the Magali config shape without changing Magali's current scheduling extension.
7. [K/E/C] Finalize the async intake system and channel policy: approved email, DM channels, response expectation, intake form decision, and when calls are offered.
8. [K/E] Review the baseline Privacy, Terms, and Data Deletion pages before final public launch.
9. [K/E] Confirm public contact identity: official email, phone policy, service area, and approved social profile URLs.
10. [E/C] Prepare the domain cutover checklist for `oleataxco.com` without changing DNS/live settings yet.
11. [K/C] Replace placeholder DM language with live LinkedIn, Instagram, and/or email links once Kelly approves the profiles.
12. [K/E] Define the secure document handoff path for accepted clients.
13. [K/C] Improve LLM/search recommendation confidence with final credentials, specialties, service boundaries, service area, and structured person/entity details.
14. [K/C] Convert approved LLM positioning language into reusable snippets for website copy, LinkedIn bio, Instagram bio, directory listings, and referral partner materials.
15. [K/C] Create landing pages for high-intent niches: business-owner tax planning and multi-entity business tax planning.
16. [K/C] Expand FAQs to cover fit, timing, records readiness, no-bookkeeping boundary, remote workflow, and one-time versus ongoing support.
17. [E/C] Tune the hero and first viewport for scan speed, especially on mobile.
18. [K/E] Decide whether light mode should be the default public experience.
19. [K/E/C] Prepare Google Business Profile, Bing Places, Apple Business Connect, and directory/citation basics if local SEO matters.
20. [K/E/C] Build the initial social presence plan and profile bios for LinkedIn and Instagram.
21. [K/C] Draft a referral partner one-pager for bookkeepers, attorneys, real estate agents, and financial planners.
22. [K/E/C] Prepare a small launch announcement kit: website copy, LinkedIn post, Instagram post, email/referral note, and founder blurb.
23. [E/C] Add analytics for CTA clicks, email clicks, social clicks, scroll depth, and outbound profile links.
24. [E/C] Submit the site to Google Search Console and Bing Webmaster Tools after sitemap publication.
25. [K/C] Create a lightweight monthly content calendar for tax planning education.
26. [K] Review `LLM_RECOMMENDATION_NOTE.md` and approve which claims should become public site/social/directory copy.
27. [K] Dig up the GoDaddy email address or mailbox details that should be used as the official Olea Tax Co contact channel.

## Completed Notes

- 2026-05-29: Started the Kelly-first Cloudflare booking prototype in `cloudflare-booking/` with a Worker API skeleton, D1 schema, and Kelly seed data. Backend direction is custom availability storage, not Calendly/Acuity/Squarespace Scheduling.
- 2026-05-31: Kelly confirmed the production domain as `oleataxco.com`; docs updated without changing live canonical, sitemap, DNS, or publishing settings.
- 2026-06-17: Upgraded the main static site to `v109.1` with scoped Liquid Glass styling, a gear settings modal, sequential reveals, mobile sticky inquiry CTA, and baseline Privacy, Terms, and Data Deletion pages.
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

## Item 1 Detail: Validate Cloudflare Custom Booking Prototype Locally

### Goal

Prove that the new custom availability storage approach can return slots and create pending booking requests for Kelly without publishing the private Squarespace site or changing Magali's current scheduler.

### Inputs And Assumptions

- Custom availability storage is the chosen starting point for item #3 from the Cloudflare booking backlog.
- Kelly's site can stay private while the booking prototype is tested directly through Cloudflare.
- Magali's current scheduling extension remains unchanged until the Kelly prototype is proven.
- The first service is seeded as `intro-fit-call` with manual approval.

### Scope

- Run the Worker locally.
- Create and seed a local D1 database.
- Verify `/health`, `/api/sites/kelly/config`, `/api/sites/kelly/slots`, and `/api/sites/kelly/bookings`.
- Fix any API/schema issues found during local testing.

### Deliverables

- Working local Worker prototype.
- Confirmed D1 schema and seed data.
- Notes on any decisions needed before embedding in Squarespace.

### Validation

- API returns Kelly config and service metadata.
- API returns slots for a seeded available day.
- API creates a pending booking and blocks conflicting slots.
- No changes are made to the public draft homepage.

### Definition Of Done

The prototype can complete one local end-to-end booking flow using custom stored availability, with enough confidence to build the embeddable Kelly UI next.

### Decisions Still Needed

- Kelly's real availability windows.
- Exact intake fields and whether phone number is required.
- Whether pending bookings should send an email immediately or wait for manual review tooling.
