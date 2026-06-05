# Olea Tax Co Conversation Summary

Last updated: 2026-05-31

## Current Request

The user asked to start down the Kelly-first Cloudflare booking backlog and chose custom availability storage for the calendar backend direction.

Latest update: Kelly confirmed the production domain name is `oleataxco.com`.

## Repo Instructions In Force

- Work from `/Users/ecohen/Dev/oleataxco`.
- Prefer `rg` for search.
- Make small, direct edits.
- Keep `main` pushable by default.
- Use commit messages prefixed with `oleataxco:`.
- For visible site changes, bump the version badge and shared asset cache-bust query strings.
- Current version scheme sets `X` to days since 2026-02-28 and increments `Y` per same-day build.

## Current Project State

- Main draft site: `index.html`.
- Design preview: `preview.html`.
- Placeholder privacy page: `privacy.html`.
- Cloudflare booking prototype: `cloudflare-booking/`.
- Confirmed production domain: `oleataxco.com`.
- Shared styles/scripts: `assets/`.
- Active planning docs: `README.md`, `PRD.md`, `TODO.md`, `content-workbook.md`, `LLM_RECOMMENDATION_NOTE.md`.
- Archived pod-model variant: `v25/index.html`; treat as read-only unless explicitly asked to edit.

## Current Positioning

Olea Tax Co is positioned as a boutique strategic CPA advisory firm for business owners, with high-income families retained in planning docs as an approved audience. The site emphasizes proactive tax planning, filing support, quarterly estimates, direct work with Kelly, and async-first inquiry.

## Key Open Decisions

- Kelly's real availability windows, first bookable service names, durations, and buffers.
- Whether booking requests are always manual approval or can later be auto-confirmed.
- Email notification sender/recipient setup for pending booking requests.
- Confirm whether `hello@oleataxco.com` is the official public inbox.
- Decide which DM channels, if any, should be public at launch.
- Decide whether a short intake form is needed.
- Define response-time expectations.
- Define the secure document-sharing path for accepted clients.
- Replace the placeholder privacy page with final CPA-appropriate privacy/disclaimer copy.

## Work Completed In This Pass

- Added `cloudflare-booking/` as a private booking prototype track.
- Added a Cloudflare Worker API skeleton for health, site config, slot lookup, and pending booking creation.
- Added a D1 schema for sites, services, availability rules, blackout dates, and bookings.
- Added Kelly seed data for one manually approved `intro-fit-call` service.
- Refreshed `TODO.md` so the numbered backlog starts with validating the custom booking prototype.
- Recorded `oleataxco.com` as the confirmed production domain in planning docs; no live domain/canonical/DNS changes made.

## Latest Validation

- `node --check cloudflare-booking/src/index.js` should be run after any Worker changes.
- Wrangler/D1 local runtime still needs to be run for end-to-end API validation.
