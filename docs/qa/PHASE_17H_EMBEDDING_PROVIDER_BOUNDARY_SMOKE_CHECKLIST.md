# Phase 17H — Embedding Provider Boundary Smoke Checklist

- [x] Boundary exposes `NoopMemoryEmbeddingProvider`.
- [x] Boundary evaluates embedding requests deterministically.
- [x] Boundary creates deferred embedding record previews.
- [x] Boundary validates preview shape through Memory/RAG schema validators.
- [x] Boundary blocks fake vectors.
- [x] Boundary blocks real provider behavior.
- [x] Boundary keeps semantic retrieval deferred.
- [x] Boundary does not call Supabase.
- [x] Boundary does not read or write SQL.
- [x] Boundary does not retrieve memory.
- [x] Boundary does not create embeddings.
- [x] Boundary does not run vector search.
- [x] Boundary does not inject Carnos context.
- [x] `npm run audit:phase17h` passes.
- [x] `npm run check` passes.
