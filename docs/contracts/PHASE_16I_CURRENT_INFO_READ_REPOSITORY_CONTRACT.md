# Phase 16I — Current-Info Read Repository Contract

Status: Complete pending verification.

## Purpose

Phase 16I adds the read-only repository and dashboard helper layer for current-info web-source data.

This phase allows dashboards and later UI/Carnos integrations to summarize existing current-info records without activating search providers, writing records, approving candidates, rejecting candidates, or converting sources into memory.

## Implemented files

- `src/lib/repositories/current-info-read.ts`
- `src/lib/dashboard/current-info-dashboard-data-helpers.ts`
- repository barrel export
- dashboard barrel export

## Read repository scope

The repository may read from the Phase 16 web-source SQL tables:

- `web_search_queries`
- `web_sources`
- `web_source_candidates`
- `web_source_links`
- `web_source_audit_events`

The repository is user-scoped and limit-clamped.

## Dashboard helper scope

The dashboard helper may summarize:

- recent query count
- executed query count
- blocked query count
- recent source count
- private source count
- pending review candidate count
- approved candidate count
- rejected candidate count
- blocked candidate count
- source link count
- audit event count
- source kind breakdown
- reliability breakdown
- freshness breakdown
- read errors

## Safety boundary

Phase 16I is read-only.

It cannot:

- insert records
- update records
- delete records
- upsert records
- call RPC functions
- call web providers
- call `fetch`
- browse the web
- approve candidates
- reject candidates
- execute proposed actions
- convert candidates into memory
- create UI routes
- create SQL migrations
- use browser-side Supabase clients

## Source-truth alignment

This step follows Phase 16 current-info/web-source scope by preparing dashboard-safe read helpers before UI, Carnos integration, career integration, research integration, review-to-save, privacy hardening, and final audit.

## Next phase step

After this contract passes verification, Phase 16 may proceed to:

`16J — Current-Info UI Components`
