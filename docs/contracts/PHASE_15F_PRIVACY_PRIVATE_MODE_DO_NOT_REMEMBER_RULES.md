# Phase 15F — Privacy, Private Mode, Do-Not-Remember Rules

Status: Implemented as a contract-only privacy preview layer.

## Scope

Phase 15F adds privacy, private mode, and do-not-remember rule contracts for the Carnos memory continuity system.

Implemented:

- `MemoryPrivacySettingsPreview`
- `MemoryPrivacyRulePreview`
- `MemoryPrivacyEvaluationInput`
- `MemoryPrivacyEvaluationResult`
- `MemoryPrivacyBlockReason`
- `DEFAULT_MEMORY_PRIVACY_SETTINGS_PREVIEW`
- `createPrivateModeSettingsPreview`
- `createDoNotRememberRulePreview`
- `evaluateMemoryPrivacyRules`
- `MemoryPrivacyRulesPanel`

## Required behavior

The privacy layer can preview:

- private mode blocking
- memory disabled blocking
- ask-every-time memory mode
- auto-candidate blocked mode
- do-not-remember rule blocking
- blocked memory categories
- restricted memory categories
- sensitive memory requiring review
- restricted memory requiring explicit allow
- redaction preview behavior

## Protected boundary

Phase 15F is preview-only.

It includes:

- no approval
- no persistence
- no retrieval
- no embeddings
- no provider calls
- no Supabase
- no standalone `/memory` route
- no hidden Carnos prompt injection
- no automatic transcript-to-memory

## Deferred to later chunks

Phase 15G — Approved Memory Read Layer + Ranking/Staleness Rules.

Phase 15F does not retrieve approved memory and does not rank memory for Carnos context.
