# Phase 16G-B — Current-Info Extraction Candidate Contract

Status: Complete pending verification.

## Purpose

Phase 16G-B closes the corrective gap inside Phase 16G: Source Capture + Extraction Candidates.

The repo already contained source candidate capture, destination routing, review queue contracts, and duplicate detection. This patch adds the missing explicit extraction candidate contract.

## Contract

Current-info extraction candidates are draft interpretations of captured source candidates.

They may contain:

- extracted title candidate
- extracted snippet candidate
- extracted summary candidate
- extracted claims candidate
- extracted entities candidate
- extracted metadata candidate
- confidence score
- confidence status
- review reasons

## Safety boundary

Extraction candidates are:

- candidate-only
- review-required
- not persisted by default
- not allowed to autosave
- not allowed to persist sources
- not allowed to become memory automatically
- not allowed to execute proposed actions
- not allowed to bypass the review-to-save pipeline

## Explicit non-goals

Phase 16G-B does not add:

- current-info provider activation
- network calls
- browser-side secrets
- automatic source persistence
- automatic memory conversion
- automatic job/research/knowledge writes
- UI components
- SQL migrations
- background browsing

## Source-truth alignment

This patch aligns Phase 16G with the locked Phase 16 scope phrase: 16G — Source Capture + Extraction Candidates.

## Next phase step

After this corrective patch, Phase 16 may proceed to: 16I — Web Current-Info Read Repository + Dashboard Helpers.
