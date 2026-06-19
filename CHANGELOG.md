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

## 2026-06-18 — Phase 4 Complete

### Added
- Core SQL spine migrations for audit logs, AI actions, chat sessions, chat messages, goals, milestones, daily logs, proof items, tasks, and events.
- Phase 4 migration audit.
- Upgraded SQL migration validator.
- Phase 4 TypeScript database types.
- Read-only repository helpers.
- Core SQL spine documentation.
- Phase 4 completion report.

### Fixed
- Phase 4 audit parser issue.
- SQL `references public.profiles` typo.
- Phase 3 database type compatibility after Phase 4 type expansion.

### Deferred
- Carnos write flows.
- Memory.
- Voice.
- RAG.
- Full CRUD dashboards.

## Phase 5 Complete — Core Read UI Integration

- Added shared dashboard read UI components.
- Added authenticated dashboard shell helper.
- Connected `/command`, `/goals`, `/timeline`, `/carnos`, `/calendar`, `/world-class`, `/analytics`, `/career`, `/learning`, and `/body` to authenticated read-only data surfaces.
- Added reusable domain-filtered read dashboard.
- Added Phase 5 audit gate.
- Added Phase 5 report.
- Extended source alignment audit through Phase 5.
- Preserved no-write, no-memory, no-generation, no-Python, and no-ML boundaries.
