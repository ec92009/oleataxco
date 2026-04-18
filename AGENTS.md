# AGENTS.md

Repo-level working preferences for `~/Dev/oleataxco`.

## Response Protocol

- If a task may take more than a few seconds, send a short acknowledgment before doing the work.
- Read and follow this file before making changes.
- For changes intended to be viewed externally, commit and push once complete unless the user asks not to.

## Defaults

- Prefer `rg` and `rg --files` for search.
- Prefer small, direct edits over broad refactors.
- Prefer Python for one-off scripts and automation tasks.
- If Python dependencies are introduced, prefer `uv` for environment and package management.

## Repo Workflow

- Run commands from the repo root: `~/Dev/oleataxco`.
- Make small, clear commits with the prefix `oleataxco:`.
- Default to keeping `main` pushable.
- Use branches for larger changes; preferred branch prefix: `codex/`.
- After modifying the site, update docs when needed.

## Versioning

- Use visible app versions in the form `vX.Y`.
- `X` is the number of days since `2026-02-28`.
- `Y` increments with each build/change on that same day.
- Always bump `Y` for each new build on the same day.
- Update any version badge visible in the UI.
- Also bump CSS/JS cache-bust query strings (`?v=X.Y`) in every HTML file.

## Workspace Structure

- Repo root: `~/Dev/oleataxco`
- Main draft site: `index.html`
- Design preview (3 style options): `preview.html`
- Archived concept variant (pod model): `v25/index.html`
- Shared styles/scripts: `assets/`
- Planning: `content-workbook.md`, `PRD.md`

## Design Variants

`preview.html` offers 3 switchable design directions:

- **A — Prestige**: Deep slate + gold, Playfair Display headings
- **B — Sage**: Forest green accent, DM Sans, rounded cards
- **C — Warmth**: Warm cream + terracotta, boutique feel

`v25/` is an archived pod-model concept — treat as read-only reference unless explicitly asked to edit it.

## Local Preview

- Start a local server from the repo root: `python3 -m http.server 8000`
- Main site: `http://localhost:8000/`
- Design preview: `http://localhost:8000/preview.html`
- Pod model variant: `http://localhost:8000/v25/`

## Execution Discipline

- Prefer deterministic tooling over manual repetition.
- Before adding new scripts, check whether the repo already contains a file or workflow that solves the task.
- If a task fails, read the full error, fix the cause, and retest.
- Keep secrets out of source files.

## Python Hygiene

- Do not commit virtual environments such as `.venv/`.
- Do not commit Python cache artifacts such as `__pycache__/` or `*.pyc`.

## Safety

- Do not delete or overwrite user files without explicit confirmation.
- Do not rewrite Git history unless explicitly requested.
