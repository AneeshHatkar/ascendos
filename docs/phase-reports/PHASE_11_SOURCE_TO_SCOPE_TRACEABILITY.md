# Phase 11 — Source-to-Scope Traceability

## Purpose

This report maps Phase 11 implementation scope to source-of-truth route and table markers.

## Confirmed Routes

| Route | Source marker | Phase 11 status |
|---|---:|---|
| `/body` | JSON route marker line 842 | in scope |
| `/nutrition` | JSON route marker line 886 | in scope |
| `/supplements` | JSON route marker line 928 | in scope |
| `/sleep-energy` | JSON route marker line 968 | in scope |
| `/emotion` | JSON route marker line 1010 | in scope |
| `/hair-skincare` | JSON route marker line 1054 | in scope |

## Confirmed Tables

| Table | Source marker | Phase 11 status |
|---|---:|---|
| `body_logs` | JSON table marker line 7345 | in scope |
| `workouts` | JSON table marker line 7439 | in scope |
| `exercises` | JSON table marker line 7533 | in scope |
| `workout_sets` | JSON table marker line 7618 | in scope |
| `nutrition_logs` | JSON table marker line 7730 | in scope |
| `meal_items` | JSON table marker line 7842 | in scope |
| `supplements` | JSON table marker line 7972 | in scope |
| `supplement_logs` | JSON table marker line 8066 | in scope |
| `sleep_logs` | JSON table marker line 8151 | in scope |
| `energy_logs` | JSON table marker line 8254 | in scope |
| `mental_health_logs` | JSON table marker line 8357 | in scope |
| `emotion_logs` | JSON table marker line 8487 | in scope |
| `journal_entries` | JSON table marker line 8590 | in scope |
| `skincare_logs` | JSON table marker line 8693 | in scope |
| `haircare_logs` | JSON table marker line 8787 | in scope |
| `products` | JSON table marker line 8881 | in scope |

## Route-to-Table Mapping

| Route | Primary tables |
|---|---|
| `/body` | `workouts`, `exercises`, `workout_sets`, `body_logs` |
| `/nutrition` | `nutrition_logs`, `meal_items` |
| `/supplements` | `supplements`, `supplement_logs` |
| `/sleep-energy` | `sleep_logs`, `energy_logs`, existing `daily_logs` |
| `/emotion` | `mental_health_logs`, `emotion_logs`, `journal_entries` |
| `/hair-skincare` | `skincare_logs`, `haircare_logs`, `products` |

## Source-Referenced But Not Confirmed As Phase 11 Tables

| Item | Source context | Decision |
|---|---|---|
| `progress_photos` | referenced by `/body` and `/hair-skincare` dashboard scope | no fake persistence; attachment reference only unless explicitly schema-backed |
| `body_goals` | referenced by `/nutrition` dashboard scope | use existing goals first unless later justified |
| `reminders` | referenced by `/supplements` dashboard scope | no reminder/background execution in Phase 11 |
| `analytics_snapshots` | referenced by `/sleep-energy` dashboard scope | simple trend preview only; advanced analytics deferred |

## Existing Foundations To Reuse

| Existing foundation | Reuse |
|---|---|
| `goals` | nullable health/body linkage |
| `tasks` | nullable health/body linkage |
| `daily_logs.sleep_hours` | daily sleep summary compatibility |
| `proof_items` | proof candidate linkage only, no auto creation |
| `events` | calendar linkage only |
| `ai_actions` | source action traceability |
| `chat_messages` | natural-language source traceability |

## Out-of-Scope For Phase 11

- autonomous writes
- direct dashboard SQL mutation
- Python/ML SQL mutation
- memory/RAG
- voice execution
- web lookup
- wearable integrations
- barcode scanning
- medical diagnosis
- supplement recommendations
- photo upload/storage unless separately justified
- advanced analytics/predictions
- export/delete flows

## Traceability Result

Phase 11 B1 has a complete route-to-table traceability foundation for schema design.

The next build unit may proceed to B2 hardening design only after this report is verified and committed.
