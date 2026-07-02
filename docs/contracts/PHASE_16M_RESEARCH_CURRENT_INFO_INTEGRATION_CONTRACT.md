# Phase 16M — Research / Stanford / Paper / Lab Integration Contract

Status: Complete pending verification.

## Purpose

Phase 16M gives Research, Stanford, paper, lab, and professor surfaces read-only visibility into current-info sources and review candidates.

## Implemented files

- `src/components/dashboard/research-current-info-source-panel.tsx`
- `src/app/research-stanford/page.tsx`
- `src/app/research-lab/page.tsx`
- dashboard component barrel export

## Scope

The research surfaces may display:

- paper source context
- lab page source context
- professor page source context
- academic/official source reliability labels
- freshness labels
- research candidate review context
- literature/citation/lab/professor candidate visibility
- research guidance text

## Safety boundary

Phase 16M cannot:

- browse the web
- fetch external data
- save citations
- write research records
- approve candidates
- reject candidates
- create proposed actions
- execute actions
- convert sources into memory
- create SQL migrations
- create API routes

## Next phase step

Next: `16N — Knowledge Vault Source Bridge`.
