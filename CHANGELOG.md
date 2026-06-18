# CHANGELOG

All notable changes to ascendOS will be documented here.

## [Unreleased]

### Added
- Local Git repository.
- Branch renamed to `main`.
- `.gitignore`.
- Source-of-truth docs folder.
- Final synced DOCX and JSON added under `docs/source-of-truth/`.
- Python `.venv`.
- Initial tracking markdown files:
  - README.md
  - SOURCE_OF_TRUTH.md
  - PROJECT_EXECUTION_LOG.md
  - CODE_LEDGER.md
  - DECISIONS.md
  - ERRORS_AND_FIXES.md
  - CHANGELOG.md

### Fixed
- Removed root `.DS_Store`.
- Avoided committing `.venv`.
- Avoided committing macOS Finder metadata.
- Recovered from heredoc paste issue.

### Changed
- Nothing yet.

### Removed
- Nothing yet.

## 2026-06-17 — Phase 2 Complete

### Added
- Next.js foundation.
- Canonical dashboard routes.
- Reusable app shell.
- Dashboard registry.
- Route and registry validation scripts.
- Placeholder pages for all canonical dashboards.

### Changed
- Corrected Knowledge Vault route to `/knowledge`.

### Verified
- `npm run check` passes.

## Phase 3 Complete — Supabase/Auth Foundation

### Added
- Supabase/Auth foundation.
- SQL profile foundation.
- RLS-backed profile and Carnos profile tables.
- Typed Supabase clients.
- Auth pages and actions.
- Profile helpers and UI status.
- Protected route boundary.
- Setup/smoke-test docs.
- Migration validation.
- Phase 3 audit gate.
