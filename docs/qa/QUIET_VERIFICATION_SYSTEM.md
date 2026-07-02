# Quiet Verification System

## Purpose

The project verification system remains strict, but terminal output is compact by default.

## Default command

Use npm run check.

This runs the full verification command through scripts/run-check-quiet.mjs.

## Full verbose command

Use npm run check:verbose.

Use this only when full pass-by-pass audit output is needed.

## Behavior

- Full verification still runs.
- Successful marker spam is hidden from the terminal.
- The full raw log is saved to .verify-logs/last-check-output.log.
- On failure, the terminal prints the last 180 lines of the full log.
- The .verify-logs folder is ignored by Git.

## Verification coverage

The quiet wrapper does not weaken verification. It only changes terminal output behavior.
