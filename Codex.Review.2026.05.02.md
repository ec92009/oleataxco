# Codex Review - 2026.05.02

## Architecture

- OleaTaxCo is a compact static site with a main page, design preview, archived v25 concept, and shared assets.
- The AGENTS boundary is useful: `v25/` is read-only reference unless explicitly requested, which prevents older concepts from muddying the live direction.
- Practical next step: keep `preview.html` as a design-decision tool, but avoid letting it become the production implementation by accident.

## UI

- The three preview directions make design comparison explicit, which is valuable for a service brand still selecting tone.
- `assets/styles.css` is large enough that future changes should stay organized by page or component blocks.
- Any visible version badge/cache-bust strings should remain synchronized across `index.html` and `preview.html`.

## UX

- The main site should prioritize trust, clarity, and contact conversion over decorative complexity.
- The preview page is useful internally, but public users need one confident path, not three competing concepts.
- Content workbook and PRD files are good anchors for deciding what copy belongs on the live page.

## Misc

- No pre-existing local dirty state was present before this review.
- No code changes were made as part of this review.
- Suggested next low-risk task: choose the canonical design direction and trim any production-facing ambiguity.
