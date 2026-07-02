# Phase 16H — Current-Info Review Queue Contract Smoke Checklist

## Required checks

- Review queue item file exists.
- Review decision file exists.
- Review barrel export exists.
- Review queue can create ready_for_user_review.
- Review queue can create needs_more_evidence.
- Review queue can create review_blocked.
- Review queue keeps is_persisted false.
- Review queue keeps autosave disabled.
- Review queue keeps source persistence disabled.
- Review queue keeps automatic memory conversion disabled.
- Review decision supports approve_for_save.
- Review decision supports reject_current_info.
- Review decision supports request_more_sources.
- Review decision supports mark_high_stakes.
- Review decision supports defer_review.
- Review decision does not execute actions.
- Review decision does not persist sources.
- No external retrieval is added.
- No SQL reads or writes are added.
- npm run audit:phase16h passes.
- npm run check passes.
