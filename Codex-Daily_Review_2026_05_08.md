# Codex Daily Review — 2026-05-08 (oleataxco)

## Architecture
- Clear “single draft site” scope (`index.html` + `preview.html` + `assets/`) makes iteration cheap.
- Having a `v25/` snapshot is useful; keep versioned variants intentionally separated so the main draft stays clean.

## UI
- The 3-direction preview (Prestige/Sage/Warmth) is a strong workflow for alignment; it’s easier to decide with side-by-side options.
- Dark mode toggles per option are good; keep typography/spacing consistent across themes so changes are attributable to color.

## UX
- The “MOCK DRAFT” banner is the right kind of guardrail for internal review.
- Scheduling controls are correctly labeled as placeholders; keep them obviously non-production to avoid false expectations.

## Misc
- `content-workbook.md` being in-repo is great; consider linking directly from `index.html` (internal-only) for reviewers.
- Add a tiny “what to test” checklist in README for faster review cycles.
