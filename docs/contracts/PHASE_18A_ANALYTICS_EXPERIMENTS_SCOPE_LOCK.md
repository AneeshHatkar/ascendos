# Phase 18A — Analytics/Experiments Scope Lock + Expanded Feature Contract

Phase 18A locks the complete Phase 18 Analytics/Experiments plan before schema, repositories, engines, UI, or Carnos explanation code are added.

Canonical Phase 18 source-of-truth goal:

- Analytics/Experiments
- Snapshots
- Charts
- Correlations
- Self-experiments
- Data quality

Expanded Phase 18 mission:

Build a deterministic, privacy-aware analytics and self-experiment foundation for ascendOS, including analytics snapshots, metric registry, data-quality scoring, trend/correlation/comparison engines, experiment planning and measurement contracts, insight quality grading, analytics provenance, Carnos analytics explanation boundaries, analytics dashboard UI, experiment lab UI, anti-demo-data safeguards, analytics-to-memory boundary, privacy/sensitivity boundaries, and final fixtures/audits.

## Phase 18 feature inventory

Phase 18 must include all of the following features:

1. Metric Registry
2. Data Completeness Score
3. Analytics Snapshot System
4. Weekly/monthly snapshot comparison
5. Self-Experiment Lab foundation
6. Experiment templates
7. Before/During/After experiment lifecycle
8. Baseline tracking
9. Confounder tracking
10. Invalid experiment states
11. Lessons learned system
12. Insight Quality Levels
13. Analytics Provenance
14. Correlation-not-causation guardrails
15. Analytics repository boundaries
16. Experiment repository boundaries
17. Trend engine
18. Correlation engine
19. Comparison engine
20. Minimum data rules
21. Chart type boundaries
22. Analytics Dashboard
23. Domain-specific analytics cards
24. Insight Inbox
25. Action-from-insight preview
26. Self-Experiment Lab UI
27. Carnos analytics explanation mode
28. Analytics-to-memory boundary
29. Privacy/sensitivity labels
30. Anti-demo-data audit
31. Manual correction readiness
32. Time range consistency
33. Analytics preferences / pinned metrics readiness
34. Export-ready report boundary
35. Final fixtures/audit/report

## Non-negotiable boundaries

Phase 18 must not:

- use hardcoded demo data as final state
- create fake charts
- create fake scores
- create fake correlations
- create fake insights
- claim causation from correlation
- hide weak or missing data
- skip data-quality warnings
- silently create actions
- silently create experiments
- silently write memory
- silently edit calendar/schedule
- use hidden memory
- bypass user confirmation for important writes
- jump into Phase 19 Custom Trackers
- jump into Phase 20 Privacy/Export full implementation
- jump into Phase 21 v1 Polish
- add runtime AI autonomy beyond explicit Phase 18 boundaries

## Carnos boundary

Carnos may explain analytics only from visible analytics context. Carnos may explain:

- what changed
- what data supports it
- what data is missing
- why confidence is low, medium, or high
- what confounders may exist
- what action could be considered
- what experiment could be tried next

Carnos must not:

- diagnose health or mental health
- claim causation from weak correlation
- silently create actions
- silently create experiments
- silently write memory
- hide uncertainty
- use hidden memory

## Analytics-to-memory boundary

Experiment lessons and repeated analytics patterns may become memory candidates only through preview and explicit user approval. No silent memory writes are allowed.

## Export boundary

Phase 18 may create export-ready report contracts, but full export/delete implementation belongs to Phase 20 Privacy/Export.

## Acceptance

Phase 18A is complete only when:

- expanded scope is documented
- feature map is documented
- build chunk map 18A through 18O is documented
- no-demo-data rules are documented
- Carnos analytics boundary is documented
- analytics-to-memory boundary is documented
- Phase 18A audit passes
- full project check passes
