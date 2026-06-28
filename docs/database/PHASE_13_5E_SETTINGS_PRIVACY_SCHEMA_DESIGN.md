# Phase 13.5E Settings / Privacy Schema Design

Status: Complete after audit and full check pass.

## Purpose

Phase 13.5E repairs the completed-scope gap for SQL-backed settings and privacy foundations.

## Added tables

- `app_settings`
- `privacy_settings`

## `app_settings`

Stores confirmed app preference records by authenticated user. It supports setting key, category, JSON value, visibility, status, source linkage, metadata, and timestamps.

## `privacy_settings`

Stores confirmed privacy preference records by authenticated user. It supports privacy key, surface, privacy level, consent state, data scope, redaction flag, retention policy, source linkage, metadata, and timestamps.

## Protection

Both tables use RLS. Authenticated users can only select, insert, update, or delete their own rows.

## Read-only boundary

Phase 13.5E only exposes read helpers and dashboard visibility. No dashboard writes are added.

## Deferred

- Export/delete flows remain Phase 19.
- Private mode remains Phase 19.
- Memory/RAG controls remain Phase 15.
- Voice controls remain Phase 14.
- Web-search controls remain Phase 16.
- Analytics controls remain Phase 17.
- Carnos display-name rename remains final polish.
