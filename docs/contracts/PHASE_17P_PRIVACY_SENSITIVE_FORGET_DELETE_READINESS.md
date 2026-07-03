# Phase 17P — Privacy, Sensitive Lock, Forget/Delete Readiness

Phase 17P adds deterministic readiness contracts for privacy, sensitive lock, and forget/delete workflows.

This phase does not execute forget/delete/archive/lock mutations. It only evaluates whether actions are allowed, blocked, deferred, or require confirmation/schema/repository checks.

## Added

- `src/lib/carnos-continuity/privacy-sensitive-forget-readiness.ts`
- `MemoryPrivacyRecordPreview`
- `MemoryPrivacyReadinessOptions`
- `MemoryPrivacyReadinessResult`
- `MemoryPrivacyReadinessBatchResult`
- `evaluateMemoryPrivacyReadiness`
- `evaluateMemoryPrivacyReadinessBatch`
- `getPrivacySensitiveForgetDeleteReadinessSummary`

## Required behavior

- privacy sensitive forget delete readiness
- sensitive lock enforcement preview
- forget/delete readiness preview
- delete execution deferred
- forget execution deferred
- schema check required before write-enabled implementation
- repository required before write-enabled implementation
- visible privacy reasons
- visible sensitive lock reasons
- visible forget/delete reasons

## Boundary markers

- No memory_retrieval_events writes
- No runtime retrieval
- No embedding generation
- No semantic retrieval activation
- No provider calls
- No vector search
- No Supabase calls
- No SQL reads or writes
- No Carnos prompt/context injection
- No background scanning
- No actual approve/reject/archive/forget/delete mutations
