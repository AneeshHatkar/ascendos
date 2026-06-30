# Phase 14I Voice Foundation Audit Smoke Checklist

Status: Ready for manual verification.

## Repository checks

- [ ] `npm run audit:phase14i` passes.
- [ ] `npm run check` passes.
- [ ] `npm run build` passes.
- [ ] `git diff --check` passes before commit.

## Source-of-truth checks

- [ ] FINAL_SYNCED DOCX source exists.
- [ ] FINAL_SYNCED JSON source exists.
- [ ] Phase 14 is still treated as JSON chunk 16 Voice Foundation.
- [ ] Local Phase 14 build chunks remain 14A–14J.
- [ ] Requirement labels A–K are not mistaken for implementation chunks.

## Phase 14 artifact checks

- [ ] Phase 14A scope lock report exists.
- [ ] Phase 14B SQL foundation report exists.
- [ ] Phase 14C types/state-machine report exists.
- [ ] Phase 14D provider boundary report exists.
- [ ] Phase 14E voice UI report exists.
- [ ] Phase 14F transcript draft simulator report exists.
- [ ] Phase 14G Carnos panel integration report exists.
- [ ] Phase 14H bridge preview report exists.
- [ ] Phase 14I completion report exists.

## Voice safety checks

- [ ] No standalone `/voice-companion` route exists.
- [ ] No voice UI file performs SQL writes.
- [ ] No voice bridge file executes approved actions.
- [ ] No voice UI file creates proposed actions directly.
- [ ] No browser microphone capture implementation exists.
- [ ] No audio storage or retention path is enabled.
- [ ] No Memory/RAG implementation is introduced.
- [ ] No autonomous reminder/timer behavior is introduced.

## Carnos surface checks

- [ ] Canonical `/carnos` remains the only voice companion surface.
- [ ] Carnos voice panel shows transcript/manual draft boundary.
- [ ] Carnos voice panel shows bridge preview boundary.
- [ ] User confirmation remains required before any write.
- [ ] Bridge preview only proposes safe Phase 6 action types.

## Final status

- [ ] Phase 14I commit is pushed.
- [ ] Phase 14J is the next phase.
