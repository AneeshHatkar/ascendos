# Phase 15B — Memory SQL Foundation Smoke Checklist

## Required verification

- `supabase/migrations/0024_phase15_memory_sql_foundation.sql` exists.
- `supabase/migrations/0025_phase15_memory_parent_ownership_guards.sql` exists.
- Memory SQL tables are present.
- Knowledge vault SQL tables are present.
- Carnos entity state SQL table is present.
- RLS is enabled on every Phase 15B table.
- Select/insert/update/delete own-user policies are present.
- Parent ownership guards are present.
- No pgvector is added.
- No vector column is added.
- No `memory_embeddings` table is added.
- No TypeScript runtime memory implementation is added.
- No API route is added.
- No UI route is added.
- `npm run validate:migrations` passes.
- `npm run audit:phase15b` passes.
- `npm run check` passes.
