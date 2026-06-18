# Olea Tax Co Conversation Summary

Last updated: 2026-06-18

## Current Request

The latest request is to prepare the repo for handoff to David from Max.

Latest site update: the main draft site remains `v109.1` with scoped Liquid Glass styling, a consolidated settings gear, mobile sticky inquiry CTA, and baseline policy pages. No visible site files changed during this handoff pass, so no version bump is needed.

## Repo Instructions In Force

- Work from `/Users/ecohen/Dev/oleataxco`.
- Prefer `rg` for search.
- Make small, direct edits.
- Keep `main` pushable by default.
- Use commit messages prefixed with `oleataxco:`.
- For visible site changes, bump the visible settings/About version and shared asset cache-bust query strings.
- Current version scheme sets `X` to days since 2026-02-28 and increments `Y` per same-day build.

## Current Project State

- Main draft site: `index.html`.
- Design preview: `preview.html`.
- Policy pages: `privacy.html`, `terms.html`, and `data-deletion.html`.
- Cloudflare booking prototype: `cloudflare-booking/`.
- Confirmed production domain: `oleataxco.com`.
- Shared styles/scripts: `assets/`.
- Active planning docs: `README.md`, `PRD.md`, `TODO.md`, `content-workbook.md`, `LLM_RECOMMENDATION_NOTE.md`.
- Archived pod-model variant: `v25/index.html`; treat as read-only unless explicitly asked to edit.
- Central ticket: `OLEATAXCO-20260617-B583` tracks the completed `v109.1` Liquid Glass/settings upgrade.

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
- Review the baseline policy pages with Kelly and qualified counsel before final launch.

## Work Completed In This Pass

- Prepared David handoff notes from Max.
- Preserved the current `v109.1` site state without changing public HTML/CSS/JS assets.
- Included the existing repo-instruction cleanup in `AGENTS.md`: the parent instruction now points to `~/Dev/AGENTS.md` only.
- Confirmed the central Tickets API is reachable on David over Tailscale and found `OLEATAXCO-20260617-B583` for the completed static-site upgrade.

## Previous Site Upgrade Pass

- Upgraded the main draft homepage with scoped `assets/liquid-glass.css` and `assets/site-settings.js`.
- Replaced topbar theme/version controls with a settings gear that exposes About/version, language preference, day/night theme, transparency, and translucency.
- Added sequential card reveals, hover/tap polish, and a mobile sticky inquiry CTA.
- Added baseline Privacy Policy content.
- Added `terms.html` and `data-deletion.html`, linked from the footer and sitemap.
- Bumped active site/docs version references to `v109.1`.

## Latest Validation

- `node --check assets/site-settings.js` passed for the static-site settings script.
- `git fetch origin` confirmed local `main` is based on current `origin/main` before the handoff commit.
- Run the local static server and browser check after future site-surface changes.
