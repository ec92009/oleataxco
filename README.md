# Olea Tax Co Project

Local project workspace for the single Olea Tax Co draft website before a production CMS build.

## Scope

Use this folder for Olea Tax Co work only:

- Single draft homepage: `index.html`
- Design preview with 3 style options: `preview.html`
- Shared styles/scripts: `assets/`
- Planning notes: `content-workbook.md`, `PRD.md`, `TODO.md`
- Thread handoff notes: `SUMMARY.md`
- Private booking prototype: `cloudflare-booking/`

Do not edit Olea Media Co files from this project thread.

## Design Preview

`preview.html` offers 3 switchable design directions:

- **A — Prestige**: Deep slate + gold, Playfair Display headings, sharp geometry
- **B — Sage**: Forest green accent, clean white, DM Sans, rounded cards
- **C — Warmth**: Warm cream + terracotta, Playfair Display headings, boutique feel

Each option includes a dark mode toggle. All text passes WCAG AA contrast (4.5:1).

## Local Preview

```bash
cd ~/Dev/oleataxco
python3 -m http.server 8000
```

Open `http://localhost:8000/preview.html`

## Current Build

- Visible version: `v80.7`
- Main draft site: `index.html`
- Design preview: `preview.html`
- Theme/script assets: `assets/`
- Includes a `Start an Inquiry` section focused on async email/DM intake
- Includes production SEO foundations, `robots.txt`, `sitemap.xml`, JSON-LD schema, footer, and a placeholder privacy page

## Founder Photo

The current site uses this founder photo path:

- `assets/kelly-portrait.jpg`

Add/replace that file to update the photo on the live draft homepage.

## Draft Disclaimer

All versions include the same top banner text:

- `MOCK DRAFT`
- `Internal review only. Content, pricing, and visuals are placeholders for team feedback.`

## Async Intake

The primary conversion path is async-first:

- Email inquiry button with a prefilled subject
- Professional DM guidance for quick introductions
- Clear note that sensitive financial documents should move through secure sharing

Direct scheduling should be added only when Kelly wants calls to be available as a primary channel.

## Booking Prototype

`cloudflare-booking/` contains a private Kelly-first Cloudflare booking prototype
using custom availability storage in D1. It is intentionally separate from the
current public draft homepage and from Magali's existing scheduling extension.

## Active Docs

- `TODO.md`: numbered active backlog and completed implementation notes
- `PRD.md`: product requirements for the launch-ready marketing site
- `content-workbook.md`: open content decisions for Kelly
- `LLM_RECOMMENDATION_NOTE.md`: plain-language positioning guidance for AI/search summarization
- `SUMMARY.md`: latest conversation handoff and repo status
