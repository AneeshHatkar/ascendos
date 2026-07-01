# Phase 15L — Knowledge Vault Foundation

Status: Implemented.

## Scope

Phase 15L adds the Knowledge Vault Foundation as a preview-only, non-personal knowledge layer.

It covers:

- Phase 15L
- Knowledge Vault Foundation
- Knowledge vault separation
- knowledge_items
- knowledge_tags
- knowledge_links
- non-personal knowledge records
- source material metadata
- tags and link previews
- memory conversion requires review
- not personal memory
- embedded: false
- retrieval deferred
- upload parsing deferred
- no approval
- no persistence
- no Supabase
- no SQL reads or writes
- no retrieval
- no embeddings
- no provider calls
- no hidden Carnos prompt injection
- standalone `/memory` route
- Phase 15M

## Contract

The Knowledge Vault Foundation may summarize and preview knowledge vault metadata, tags, links, and separation rules.

The Knowledge Vault Foundation must not:

- approve memory
- persist records
- call Supabase
- read or write SQL at runtime
- perform retrieval
- create embeddings
- call providers
- parse uploads
- inject hidden Carnos prompt/context
- create a standalone `/memory` route

## Separation Rule

Knowledge vault records are not personal memory. They must remain `is_personal_memory: false` and `embedded: false` in Phase 15L.

Conversion into approved memory requires a later explicit review flow.

## Next

Phase 15M — Retrieval Contract + Provenance + Conflict Handling.
