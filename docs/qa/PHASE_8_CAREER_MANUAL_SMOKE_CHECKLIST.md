# Phase 8 Manual Smoke Checklist — Career System

Status: Added for final Phase 8 closeout.

## Global route checks

- [ ] `/career` loads for an authenticated user.
- [ ] `/networking` loads for an authenticated user.
- [ ] `/resume` loads for an authenticated user.
- [ ] `/interviews` loads for an authenticated user.
- [ ] Unauthenticated access remains protected.
- [ ] No dashboard action silently changes records.
- [ ] No non-canonical career routes were added.

## Proposed-action visibility checks

- [ ] Preview cards render.
- [ ] Preview cards are disabled.
- [ ] Save/Confirm is unavailable in Phase 8 preview mode.
- [ ] Cancel is unavailable in Phase 8 preview mode.
- [ ] Payload editing is unavailable in Phase 8 preview mode.
- [ ] No callback is wired from the career dashboard layer.
- [ ] No proposal is persisted from the career dashboard layer.

## Privacy and safety checks

- [ ] Career data is scoped to the authenticated user.
- [ ] No private career data is exported.
- [ ] No email/message is sent.
- [ ] No scraping starts.
- [ ] No Python/ML worker starts.
- [ ] No background job starts.

## Per-route smoke checks

- [ ] `/career` renders metrics, application pipeline, evidence linkage, proposed-action visibility, and state/privacy boundary.
- [ ] `/networking` renders contacts, interactions, referrals, proposed-action visibility, and state/privacy boundary.
- [ ] `/resume` renders resume versions, resume bullets, evidence linkage, proposed-action visibility, and state/privacy boundary.
- [ ] `/interviews` renders interviews, follow-up pressure, proposed-action visibility, and state/privacy boundary.
