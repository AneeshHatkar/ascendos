# Phase 16F — Citation, Reliability, and Freshness Engine Smoke Checklist

## Required checks

- Citation engine file exists.
- Reliability engine file exists.
- Freshness engine file exists.
- Evidence barrel export exists.
- Citation coverage can return citation_ready.
- Citation coverage can return missing_sources.
- Reliability engine can identify official_or_primary.
- Reliability engine can identify low_reliability.
- Freshness engine can return current.
- Freshness engine can return recent.
- Freshness engine can return stale.
- Freshness engine can return unknown.
- No network calls are added.
- No SQL reads or writes are added.
- No source persistence is added.
- npm run audit:phase16f passes.
- npm run check passes.
