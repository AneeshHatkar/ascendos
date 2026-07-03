# Local Carnos Runtime Build Chunk Plan

## Inserted build chunk

18M-B — Local Carnos Runtime Boundary + Option C Offline AI Adapter

## Purpose

This chunk will turn Level 4 Offline AI from readiness into a real implementation boundary.

## Required outputs for 18M-B

- local runtime contract
- local runtime adapter shape
- localhost runtime health check boundary
- local model availability detector
- local Carnos request type
- local Carnos response type
- offline AI capability state
- deterministic fallback state
- local context input boundary
- cached approved-memory input boundary
- cached analytics input boundary
- cached experiment context input boundary
- offline limitation labels
- local runtime unavailable UI state readiness
- local model missing UI state readiness
- audit preventing false offline AI claims

## Runtime target

Primary runtime target:

- Option C local server/runtime

First adapter boundary:

- Ollama-compatible localhost runtime

Future allowed runtime paths:

- MLX-compatible runtime
- llama.cpp-compatible runtime
- Tauri-managed local sidecar

## Non-breaking rule

Local runtime must be optional.

The app must pass checks without local runtime installed.

The app must not require a model download during build, lint, audit, or CI.

## Offline mode before 18M-B

Before 18M-B, offline mode supports:

- cache
- sync queue
- deterministic guidance
- offline logs
- offline experiment capture
- cached dashboard views

## Offline mode after 18M-B

After 18M-B, offline mode can additionally support:

- local Carnos chat when local model/runtime is available
- cached-memory-aware local responses
- cached-analytics-aware local responses
- offline experiment guidance through local model
- local AI capability labels
- fallback to deterministic mode when unavailable
