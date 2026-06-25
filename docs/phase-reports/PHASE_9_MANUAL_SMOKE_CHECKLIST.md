# Phase 9 Manual Smoke Checklist

## Purpose

Manual checklist for validating the Phase 9 Learning / Project System in the browser.

## Required Routes

### `/learning`

Expected:

- Page requires authenticated context.
- Learning Academy dashboard renders.
- Skill paths panel renders.
- Skills panel renders.
- Learning sessions panel renders.
- Quiz bank and quiz attempts render.
- Skill progress panel renders.
- Detail panels render:
  - skill path/progress detail
  - quiz/session detail
- Linkage panels render.
- Proposed-action preview panel is visible but disabled.
- State/privacy boundary panel renders.
- Cross-links render.

### `/projects`

Expected:

- Page requires authenticated context.
- Project Builder dashboard renders.
- Projects panel renders.
- Milestones panel renders.
- Bug/test quality panel renders.
- Releases/project links panel renders.
- Project build-log detail panel renders.
- Linkage panels render.
- Proposed-action preview panel is visible but disabled.
- State/privacy boundary panel renders.
- Cross-links render.

### `/knowledge`

Expected:

- Page requires authenticated context.
- Knowledge Vault alignment dashboard renders.
- It describes learning/project records as future knowledge sources.
- It does not claim full memory/RAG is active.
- State/privacy boundary panel renders.
- Cross-links render.
- Deferred memory/RAG boundary renders.

## Empty State Checks

When there are no Phase 9 records:

- Empty states should explain that records do not exist yet.
- Empty states should not look like system failure.
- Empty states should not offer direct write buttons.

## Privacy Checks

Confirm:

- No private data is visible before auth.
- No public export is offered.
- No send/share/sync behavior appears.
- No autonomous write behavior appears.

## Proposed-Action Checks

Confirm preview cards:

- are disabled
- do not save
- do not cancel
- do not execute
- do not persist
- clearly state preview-only behavior

## Cross-Link Checks

Confirm links to:

- Learning
- Projects
- Knowledge
- Proof
- Goals
- Timeline
- Resume
- Carnos

## Final Manual Smoke Result

Manual browser smoke testing is ready for Phase 9.
