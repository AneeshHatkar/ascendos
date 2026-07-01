# Phase 15M — Retrieval Contract + Provenance + Conflict Handling Smoke Checklist

## Expected

- [ ] `/knowledge` renders the Knowledge Vault Foundation panel.
- [ ] `/knowledge` renders the Retrieval Contract panel.
- [ ] Panel shows retrieval contract.
- [ ] Panel shows provenance required.
- [ ] Panel shows conflict handling.
- [ ] Panel shows source authority.
- [ ] Panel shows visible source labels.
- [ ] Panel shows allowed retrieval surfaces.
- [ ] Panel shows blocked retrieval reasons.
- [ ] Panel states memory retrieval remains preview-only.
- [ ] Panel states knowledge retrieval remains preview-only.
- [ ] Panel states no SQL reads or writes.
- [ ] Panel states no Supabase calls.
- [ ] Panel states no embeddings.
- [ ] Panel states no vector search.
- [ ] Panel states no provider calls.
- [ ] Panel states no hidden Carnos prompt injection.
- [ ] No standalone `/memory` route exists.

## Gate

- [ ] `npm run audit:phase15m` passes.
- [ ] `npm run build` passes.
- [ ] `npm run check` passes before commit.

- standalone /memory route remains absent.

Next: Phase 15N — Embedding Boundary / Noop Provider.
