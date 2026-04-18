# Olea Tax Co Project

Local project workspace for the single Olea Tax Co draft website before a production CMS build.

## Scope

Use this folder for Olea Tax Co work only:

- Single draft homepage: `index.html`
- Design preview with 3 style options: `preview.html`
- Shared styles/scripts: `assets/`
- Planning notes: `content-workbook.md`

Do not edit Olea Media Co files from this project thread.

## Design Preview

`preview.html` offers 3 switchable design directions:

- **A — Prestige**: Deep slate + gold, Playfair Display headings, sharp geometry
- **B — Sage**: Forest green accent, clean white, DM Sans, rounded cards
- **C — Warmth**: Warm cream + terracotta, Playfair Display headings, boutique feel

Each option includes a dark mode toggle. All text passes WCAG AA contrast (4.5:1).

## Local Preview

```bash
cd ~/Dev/Webapps
python3 -m http.server 8000
```

Open `http://localhost:8000/oleataxco/preview.html`

## Current Build

- Main draft site: `index.html`
- Design preview: `preview.html`
- Theme/script assets: `assets/`
- Includes a `Book a Call` placeholder section with local date/time controls

## Founder Photo

The current site uses this founder photo path:

- `oleataxco/assets/kelly-portrait.jpg`

Add/replace that file to update the photo on the live draft homepage.

## Draft Disclaimer

All versions include the same top banner text:

- `MOCK DRAFT`
- `Internal review only. Content, pricing, and visuals are placeholders for team feedback.`

## Scheduling Placeholder

The booking section provides local placeholder controls:

- Date picker
- Time options from 10:00 AM to 4:00 PM in 30-minute increments

No external service is connected yet. Replace this with the final scheduling provider when ready.
