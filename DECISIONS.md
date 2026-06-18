# DECISIONS

## ADR-001 — Use final synced DOCX and JSON as source of truth

Status: Accepted

Reason: These files define the product, architecture, route policy, Carnos behavior, database direction, safety rules, and build plan.

## ADR-002 — Use canonical short routes

Status: Accepted

Reason: Prevent route drift and old verbose route names.

## ADR-003 — Use Git commit/push discipline after each verified chunk

Status: Accepted

Reason: Keep project recoverable and traceable.

## ADR-004 — Use `.venv` for Python support tooling

Status: Accepted

Reason: Future validation and utility scripts need isolated Python tooling.

## ADR-005 — Keep source-of-truth files inside `docs/source-of-truth/`

Status: Accepted

Reason: Keeps root clean and makes the project constitution easy to find.
