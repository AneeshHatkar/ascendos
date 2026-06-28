# Phase 14A — Voice Foundation Scope Lock + Safety Contract

Status: Scope locked.

## Source of truth

Phase 14 is based on:

- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx`
- `docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json`

Phase 14 must build the Voice Foundation without drifting into later Memory/RAG, Web Search, Analytics, Custom Tracker, Export/Delete/Privacy, or final polish phases.

## Critical clarification

Phase 14 build chunks are **14A through 14J**.

The requirement checklist uses categories **A through K**, but those are checklist categories, not build chunks.

Build chunks: 14A–14J
Requirement categories: A–K

## Plain-English Phase 14 goal

Phase 14 makes Carnos a safe voice and text input layer for ascendOS.

The intended loop is:

    Talk or type to Carnos
    → Carnos listens/reads
    → transcript or message becomes a draft
    → Carnos extracts possible updates
    → updates are routed to the right system areas
    → user sees Save/Edit/Cancel
    → only confirmed updates write to SQL
    → audit/timeline/dashboard state updates

Carnos may understand and propose system-wide updates, but Carnos must not silently mutate ascendOS.

## Route reconciliation

The source mentions `/voice-companion`, but the current app has a locked canonical route registry. Phase 14 will not add a standalone `/voice-companion` route unless canonical routes are intentionally expanded.

Phase 14 starts inside the existing `/carnos` dashboard with reusable voice files planned under:

- `src/components/voice/`
- `src/lib/voice/`
- `src/app/api/voice/transcribe/route.ts`
- `src/app/api/voice/speak/route.ts`

Phase 14A does not create those implementation files yet.

## Final Phase 14 build chunks

Phase 14 includes 145 checklist-level requirements.

Phase 14 is locked into 10 build chunks:

- 14A — Scope Lock + Safety Contract
- 14B — SQL Foundation
- 14C — Types / Schemas / State Machine / Read Helpers
- 14D — STT/TTS Provider Boundary APIs
- 14E — Voice UI Components
- 14F — Transcript Draft + Manual Simulator
- 14G — Carnos Voice Panel Integration
- 14H — Text/Voice-to-Proposed-Action System Bridge
- 14I — Phase 14 Audit + Smoke Checklist + Completion Report
- 14J — Final Voice/Text Integration Hardening

## Complete Phase 14 requirement checklist

### A. Source/core voice foundation

1. Voice session UI.
2. Speech-to-text foundation.
3. Text-to-speech foundation.
4. Live transcript display.
5. Transcript storage.
6. Voice logs.
7. Voice planning foundation.
8. Voice tutoring foundation.
9. Voice interview practice foundation.
10. Spoken response foundation.
11. Voice session database table.
12. Voice transcript database table.
13. Voice Chat card inside Carnos.
14. Voice session mode awareness.
15. Voice session summary.
16. Voice command/update confirmation.
17. `api/voice/transcribe` route.
18. `api/voice/speak` route.

### B. Voice privacy/safety

19. Consent before saving audio.
20. Audio retention disabled by default.
21. Transcript save visibility.
22. Sensitive voice sessions private by default.
23. Sensitive transcript preview boundary.
24. No fake-human voice behavior.
25. No dependency-forming behavior.
26. Human World Anchor anti-dependency rule.
27. Crisis-soft voice boundary.
28. No medical/mental-health diagnosis from voice.
29. No unsupported advice from voice.
30. User can discard transcript/session.
31. User can cancel before save.
32. No silent voice-derived writes.
33. No auto-memory from voice.
34. No audio storage enabled by default.

### C. Voice UX polish

35. Voice orb / waveform visual.
36. Voice state visual states.
37. Large start/stop button.
38. Record / stop / cancel / discard controls.
39. Microphone permission handling.
40. Provider unavailable state.
41. Browser fallback state.
42. Text fallback for every voice feature.
43. Mobile-safe voice UI.
44. Voice status labels.
45. Detected emotion label.
46. Current Carnos voice mode display.
47. Session type selector.
48. End session summary UI.

### D. Voice state/contracts

49. Voice session state machine.
50. `idle` state.
51. `permission_needed` state.
52. `listening` state.
53. `recording` state.
54. `transcribing` state.
55. `thinking` state.
56. `speaking` state.
57. `confirmation_needed` state.
58. `ended` state.
59. `error` state.
60. Voice mode enum.
61. Voice session type enum.
62. Voice confidence/review markers.
63. Transcript correction structure.
64. Timezone/date ambiguity contract.
65. Voice source metadata contract.

### E. STT/TTS provider architecture

66. STT provider abstraction.
67. TTS provider abstraction.
68. `provider_not_configured` fallback.
69. No fake transcription success.
70. No fake spoken-response success.
71. Environment-gated provider behavior.
72. No new paid dependency unless intentionally configured.
73. Safe error responses from voice APIs.

### F. Transcript draft/testing

74. Transcript draft before save.
75. Editable transcript before save.
76. Manual transcript fallback.
77. Simulated transcript testing flow.
78. Confidence/needs-review display.
79. Transcript discard flow.
80. End-session summary draft.
81. Saved vs unsaved content visibility.

### G. Carnos system-wide update bridge

82. Typed Carnos message-to-system bridge.
83. Voice transcript-to-system bridge.
84. Manual transcript-to-system bridge.
85. Simulated transcript-to-system bridge.
86. Shared extraction pipeline.
87. Intent classification.
88. Domain routing hints.
89. Cross-dashboard proposal preview.
90. Existing safe action reuse.
91. Future domain-action expansion map.
92. Quick command boundary.
93. Carnos primary input loop lock.

### H. Proposed-action confirmation

94. Voice/text can propose `create_task`.
95. Voice/text can propose `create_goal`.
96. Voice/text can propose `create_daily_log`.
97. Voice/text can propose `create_proof_item`.
98. Save/Edit/Cancel required.
99. `ProposedActionReviewCard` reuse.
100. Existing Phase 6 dispatcher reuse.
101. No auto-execute.
102. No direct domain-specific unsafe writes.
103. No auto-delete/export/settings changes.
104. No auto job application/email sending.
105. No real timer/autonomous reminder execution unless later supported.

### I. Database/timeline/audit interconnection

106. `voice_sessions` RLS.
107. `voice_transcripts` RLS.
108. `voice_sessions` indexes.
109. `voice_transcripts` indexes.
110. Ownership guards.
111. `source_message_id` link to `chat_messages`.
112. `source_ai_action_id` link where useful.
113. `occurred_at` handling.
114. `logged_at` handling.
115. `source: voice/text/manual/simulated`.
116. `confidence_score` handling.
117. Confirmation status handling.
118. Linkable context for saved updates.
119. Audit log linkage for saved voice-derived updates.
120. Timeline event/source support for confirmed voice-derived updates.

### J. Deferred/future boundaries

121. No Memory/RAG implementation.
122. No pgvector.
123. No embeddings.
124. No knowledge vault retrieval.
125. Memory candidates visible only as deferred/no-save.
126. No web search.
127. No Tavily/SerpAPI.
128. No analytics snapshots.
129. No experiment engine.
130. No custom tracker builder.
131. No full export/delete/private mode implementation.
132. No standalone `/voice-companion` route unless canonical routes are intentionally expanded.

### K. Docs/audits/checks

133. Phase 14 scope lock doc.
134. Phase 14 source-to-scope traceability.
135. Phase 14 voice privacy/safety review.
136. Phase 14 SQL schema design.
137. Phase 14 manual smoke checklist.
138. Phase 14 completion report.
139. Phase 14 audit script.
140. Future leakage audit.
141. Mobile/manual/provider fallback smoke checks.
142. `npm run check` wiring.
143. Build verification.
144. Logs/status/changelog/code ledger updates.
145. Commit and push after each chunk.


## Chunk mapping

### 14A — Scope Lock + Safety Contract

Covers source scope, route reconciliation, safety rules, deferred boundaries, primary input loop, quick command boundary, memory-deferred boundary, anti-dependency rules, and this full checklist.

### 14B — SQL Foundation

Covers voice tables, RLS, indexes, source links, `audio_retained false`, confidence/review fields, timestamps, ownership guards, and timeline/audit metadata support.

### 14C — Types / Schemas / State Machine / Read Helpers

Covers voice types, schemas, state machine, voice modes, session types, metadata contracts, timezone/date ambiguity rules, read helpers, and dashboard summary helpers.

### 14D — STT/TTS Provider Boundary APIs

Covers `api/voice/transcribe`, `api/voice/speak`, STT/TTS abstraction, provider-not-configured fallback, safe errors, and no fake success.

### 14E — Voice UI Components

Covers voice orb/waveform, mic controls, consent panel, mobile UI, provider unavailable states, detected emotion label UI, session type selector, and privacy notices.

### 14F — Transcript Draft + Manual Simulator

Covers transcript draft, editable transcript, manual fallback, simulated transcript flow, confidence/review display, discard flow, and end-session summary draft.

### 14G — Carnos Voice Panel Integration

Covers `/carnos` Voice Chat card, Carnos mode display, voice session summary, memory candidates deferred UI, pending updates visibility, and reusable Carnos voice panel integration.

### 14H — Text/Voice-to-Proposed-Action System Bridge

Covers typed, voice, manual, and simulated input bridge; shared extraction pipeline; domain hints; quick command proposals; allowed/forbidden actions; and Save/Edit/Cancel.

### 14I — Phase 14 Audit + Smoke Checklist + Completion Report

Covers audit script, smoke checklist, completion report, `npm run check` wiring, docs, future leakage checks, and build gate.

### 14J — Final Voice/Text Integration Hardening

Covers final end-to-end check:

    Carnos text/voice/manual input
    → transcript/message
    → proposal
    → confirmation
    → safe dispatcher
    → SQL/audit/timeline/dashboard

## Non-negotiable safety rule

Carnos is allowed to understand and propose updates across ascendOS.

Carnos is not allowed to silently write important changes.

All meaningful system updates must pass through confirmation unless a future phase explicitly implements a trusted quick-log mode.
