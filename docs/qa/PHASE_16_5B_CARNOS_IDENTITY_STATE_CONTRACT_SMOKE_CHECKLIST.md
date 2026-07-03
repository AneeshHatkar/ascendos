# Phase 16.5B — Carnos Identity, State, and Capability Contract Smoke Checklist

Status: Complete pending verification.

## Contract files

- [x] `src/lib/carnos-identity/carnos-visual-identity.ts` exists.
- [x] `src/lib/carnos-identity/index.ts` exists.

## Identity

- [x] Carnos name is defined.
- [x] Carnos role is defined.
- [x] Carnos orb / mask visual form is defined.
- [x] Default state is focused.
- [x] Boundary statement is defined.

## States

- [x] Required visual states are defined.
- [x] State priority map is defined.
- [x] Highest-priority state helper exists.

## Capability matrix

- [x] Capability statuses are defined.
- [x] Memory visibility is enabled.
- [x] Automatic memory write is forbidden.
- [x] Current-info review is enabled.
- [x] Real internet provider is runtime_deferred.
- [x] Voice visual state is enabled.
- [x] Full voice talk-back is runtime_deferred.
- [x] Python/tools are runtime_deferred.
- [x] Document ingestion is planned.
- [x] Actions require confirmation.
- [x] Background autonomous actions are forbidden.

## Boundaries

- [x] No UI component is added.
- [x] No orb component is added.
- [x] No companion widget is added.
- [x] No API route is added.
- [x] No SQL migration is added.
- [x] No voice runtime is added.
- [x] No internet provider call is added.
- [x] No Python/tool execution is added.
- [x] No document ingestion is added.
- [x] No memory write is added.
- [x] No autonomous action is added.

## Verification

- [ ] `npm run audit:phase16_5b` passes.
- [ ] `npx tsc --noEmit` passes.
- [ ] `npm run check` passes.
