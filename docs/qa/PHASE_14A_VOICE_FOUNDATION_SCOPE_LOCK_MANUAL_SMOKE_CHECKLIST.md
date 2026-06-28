# Phase 14A Voice Foundation Scope Lock Manual Smoke Checklist

## Scope lock

- [ ] Phase 14 has 10 build chunks, 14A through 14J.
- [ ] Requirement checklist categories are A through K.
- [ ] Phase 14 plan includes the full 145 checklist-level requirements.
- [ ] Phase 14 includes old source voice requirements.
- [ ] Phase 14 includes new UX polish requirements.
- [ ] Phase 14 includes new Carnos text/voice-to-system update bridge requirements.
- [ ] Phase 14 includes final integration hardening.

## Route decision

- [ ] `/voice-companion` is deferred.
- [ ] `/carnos` is the initial Phase 14 voice surface.
- [ ] Reusable voice files are planned under `src/components/voice/` and `src/lib/voice/`.
- [ ] Phase 14A does not create implementation files.

## Voice safety

- [ ] Audio retention is off by default.
- [ ] Consent before saving audio is locked.
- [ ] Transcript draft before save is locked.
- [ ] No silent voice-derived writes are allowed.
- [ ] Carnos cannot fake human feelings.
- [ ] Human World Anchor anti-dependency rule is locked.
- [ ] Crisis-soft boundary is locked.
- [ ] No medical/mental-health diagnosis from voice is allowed.

## System bridge

- [ ] Typed Carnos messages are included in the bridge.
- [ ] Voice transcripts are included in the bridge.
- [ ] Manual transcripts are included in the bridge.
- [ ] Simulated transcripts are included in the bridge.
- [ ] Allowed actions are limited to existing safe actions.
- [ ] Direct domain-specific writes are deferred.
- [ ] Save/Edit/Cancel is required.

## Deferred boundaries

- [ ] Memory/RAG is deferred.
- [ ] pgvector is deferred.
- [ ] Web search is deferred.
- [ ] Analytics is deferred.
- [ ] Custom tracker builder is deferred.
- [ ] Full export/delete/private mode implementation is deferred.
- [ ] Audio storage enabled by default is forbidden.

## Gate

- [ ] `npm run audit:phase14a` passes.
- [ ] `npm run check` passes.
