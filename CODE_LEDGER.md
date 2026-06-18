# CODE_LEDGER

This file records meaningful file changes for ascendOS + Carnos.

## Initial Files

### `.gitignore`
Purpose: Ignore dependencies, secrets, build outputs, `.venv`, logs, and OS/editor junk.

### `docs/source-of-truth/*`
Purpose: Store final synced DOCX and JSON source-of-truth files.

### `README.md`
Purpose: Project overview.

### `SOURCE_OF_TRUTH.md`
Purpose: Quick local summary of the official DOCX/JSON.

### `PROJECT_EXECUTION_LOG.md`
Purpose: Build history.

### `CODE_LEDGER.md`
Purpose: File-by-file change history.

### `DECISIONS.md`
Purpose: Architecture decisions.

### `ERRORS_AND_FIXES.md`
Purpose: Error/fix history.

### `CHANGELOG.md`
Purpose: High-level project changes.

## Phase 2 — Next.js Foundation

### `package.json`
Purpose: Defines npm scripts and Next.js dependencies.
Change: Added Next.js app package metadata and renamed package to `ascendos`.

### `package-lock.json`
Purpose: Locks npm dependency versions.

### `src/app/*`
Purpose: Default Next.js App Router starter files.
Note: These are temporary starter files and will be replaced with ascendOS shell UI.

### `eslint.config.mjs`
Purpose: ESLint configuration for Next.js.

### `next.config.ts`
Purpose: Next.js configuration.

### `postcss.config.mjs`
Purpose: PostCSS/Tailwind configuration.

### `tsconfig.json`
Purpose: TypeScript configuration.

### `public/*`
Purpose: Default public assets from create-next-app.
Note: These may be removed or replaced later.

### `.gitignore`
Purpose: Merged project ignore rules with Next.js ignore rules.

### `README.md`
Purpose: Restored ascendOS project identity and added Next.js development commands.

