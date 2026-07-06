# Phase 21A — Current Repo Truth Matrix

## Starting point
Phase 21A starts from:

- Branch: `main`
- Commit: `c57ec6d`
- Commit label: `readiness evidence`

Known untracked file intentionally excluded:

- `I am continuing the ascendOS.docx`

## Current truth summary

| Area | Current truth before Phase 21 coding | Phase 21 implication |
|---|---|---|
| Source of truth | FINAL_SYNCED docs/JSON plus Phase 21 Grail and Build Order Playbook are the controlling sources. | 21A records hierarchy before code changes. |
| Assistant identity | User-facing assistant should be Athena. Carnos may remain internally for compatibility. | Do not destructively rename stable internals. |
| Storage | Supabase/Postgres is source of truth. | Local cache/offline and Mac/Drive backup must not replace Supabase. |
| AI provider | Real OpenAI/equivalent provider integration is not assumed complete at Phase 21 start. | 21D adds provider boundary and disabled states. |
| API keys | Provider/API keys must be server-only. | No browser/local/export/backup/log/commit leakage. |
| Chat | Existing Carnos/Athena chat/session foundation may exist. | 21E inspects and extends; no duplicate assistant stack. |
| AI extraction | Existing extraction/safe-action foundations may exist. | 21F extends with save cards and confirmed writes. |
| Memory | Memory/RAG foundations may exist. | 21G activates review, approval, deletion, forget-topic, and context transparency. |
| Voice | Voice routes may exist but should not be assumed fully real. | 21H implements real or honest-disabled STT/TTS states. |
| Current-info | Current-info boundaries may exist but should not be assumed live. | 21H implements source/evidence/freshness or honest disabled state. |
| Dashboards | Many dashboards/routes may exist, but some may be read-only or partial. | 21C makes major dashboards manually usable. |
| Privacy/export/connectors | Trust/export/connector foundations may exist. Spotify runtime may exist. | 21J makes UI and control states usable. |
| Local/offline | Local cache/offline queue is not assumed implemented. | 21K implements drafts/cache/offline queue safely. |
| Backup | Mac/Drive backup is not assumed implemented. | 21L implements backup/export mirror excluding secrets. |
| Mobile/polish | Existing responsive state may be partial. | 21M and 21N verify mobile and polish. |
| Final verification | Phase 21 not complete until browser smoke, audits, final checks, final commit, push. | 21N and 21O close the phase. |

## Do-not-assume list
Do not assume:

- a route means a feature is complete
- a table means the workflow is usable
- a card means data is real
- Carnos can be globally renamed safely
- OpenAI is configured
- voice is real
- current-info is live
- dashboards are manually usable
- local cache exists
- backup exists
- exports are redacted
- no secrets are leaking without auditing

## Schema rule
If a chunk needs schema details, inspect existing migrations, generated types, repositories, and contracts first.

If schema remains unclear, stop and confirm the source before coding.

Do not invent schema.

## Phase 21A completion standard
21A is complete only when:

- source hierarchy is documented
- naming/storage/safety/no-loopholes rules are locked
- current repo truth is recorded
- unrelated local diffs are excluded
- baseline checks pass or failures are documented
- 21A report is committed and pushed
