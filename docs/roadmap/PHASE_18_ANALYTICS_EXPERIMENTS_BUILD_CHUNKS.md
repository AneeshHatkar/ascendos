# Phase 18 Build Chunks — Analytics/Experiments

Phase 18 is split into 15 build chunks to avoid scope drift and broken integration.

## 18A — Scope Lock + Expanded Feature Contract

Adds:

- canonical Phase 18 scope
- expanded feature map
- build chunk breakdown 18A through 18O
- analytics source map requirement
- metric registry requirement
- data quality requirement
- insight quality requirement
- experiment lab requirement
- confounder/baseline/lessons requirement
- trend/correlation/comparison requirement
- minimum data rules
- anti-demo-data rules
- privacy/sensitivity analytics rules
- Carnos explanation boundaries
- analytics-to-memory boundary
- action-from-insight confirmation boundary
- export-ready report boundary
- manual correction readiness
- no Phase 19/20/21 leakage rule
- acceptance checklist
- Phase 18A audit script
- package check-chain integration

## 18B — Schema Discovery + Metric Source Map

Adds:

- discovery of existing analytics-capable tables
- canonical source table map
- metric source ownership map
- read-only analytics source rules
- missing-schema list
- no-duplicate-schema rule
- user-owned data/RLS readiness notes
- date/time handling inventory
- source-to-metric mapping
- proof of what can be calculated now
- proof of what must wait for later schema

## 18C — Metric Registry + Data Quality Contracts

Adds:

- metric registry contracts
- metric units
- metric domains
- aggregation methods
- higher-is-better flags
- healthy range support
- minimum data point requirements
- privacy level on metrics
- data completeness contracts
- coverage percent rules
- complete/partial/missing day modeling
- data quality statuses
- missing field warnings
- confidence limiting from weak data
- analytics preferences / pinned metric readiness
- time range consistency contracts

## 18D — Analytics Snapshot Contracts + Validators

Adds:

- daily snapshot contracts
- weekly snapshot contracts
- monthly snapshot contracts
- custom range snapshot contracts
- domain snapshot contracts
- experiment snapshot contracts
- data quality snapshot contracts
- metric summary validators
- trend summary validators
- warning validators
- date range validators
- partial range labels
- source metric validation
- export-ready report structure
- weekly/monthly comparison readiness

## 18E — Self-Experiment Contracts + Validators

Adds:

- self experiment contracts
- experiment statuses
- planning/running/paused/reviewing/completed/invalid/abandoned states
- hypothesis model
- start/end date model
- baseline window model
- primary metric model
- secondary metrics model
- success criteria model
- confounder model
- daily measurement model
- lessons learned model
- next experiment idea model
- experiment templates
- before/during/after lifecycle
- privacy level for experiments

## 18F — Insight Quality + Provenance Contracts

Adds:

- insight quality contracts
- high/medium/low/insufficient/invalid confidence levels
- insight provenance model
- source table provenance
- source metric provenance
- calculation method field
- data points used field
- missing data count field
- quality reason field
- correlation-not-causation warning
- confounder list
- recommended next step preview
- privacy level on insights
- no insight without provenance rule
- no high confidence with weak data rule

## 18G — Analytics Repository Boundaries

Adds:

- analytics source read boundaries
- metric registry read boundaries
- snapshot read boundaries
- explicit snapshot creation boundary
- insight preview listing boundary
- user ownership boundary
- no silent Carnos write rule
- no background scan rule
- no automatic action creation rule
- no memory write rule
- no fake chart data rule

## 18H — Experiment Repository Boundaries

Adds:

- create experiment repository boundary
- update experiment repository boundary
- log measurement boundary
- pause experiment boundary
- resume experiment boundary
- end experiment boundary
- archive experiment boundary
- write lesson boundary
- manual correction readiness
- outlier exclusion readiness
- day annotation readiness
- user ownership boundary
- no background experiment creation
- no silent Carnos experiment creation
- no automatic memory writes
- no automatic calendar edits

## 18I — Trend / Correlation / Comparison Engine

Adds:

- trend direction calculation
- rolling average calculation
- streak calculation
- completion rate calculation
- before/after delta calculation
- percent change calculation
- week-over-week comparison
- month-over-month comparison
- simple correlation calculation
- matched data point count
- confidence level calculation
- data quality warning generation
- minimum data rules
- chart eligibility rules
- correlation-not-causation guardrails

Minimum data rules include:

- no correlation with fewer than 7 matched data points
- no weekly trend with fewer than 4 logged days
- no before-after result without baseline
- no high confidence if confounders exist
- no month-over-month claim if current month is incomplete unless marked partial

## 18J — Experiment Evaluation Engine

Adds:

- baseline value evaluation
- experiment value evaluation
- delta calculation
- percent change calculation
- success criteria evaluation
- confounder impact evaluation
- data completeness evaluation
- final confidence evaluation
- result status selection
- invalid insufficient data result
- invalid confounders result
- lessons learned output
- what worked output
- what did not work output
- what to repeat output
- what to avoid output
- next experiment idea output
- possible memory candidate preview only

## 18K — Analytics Dashboard UI

Adds route:

- /analytics

Adds UI:

- overview snapshot
- data quality panel
- domain analytics cards
- trend cards
- comparison cards
- insight inbox preview
- chart-ready panels
- missing data warnings
- date range filter
- empty/loading/error states
- no-demo-data states

Domain cards:

- Career Analytics
- Learning Analytics
- Health/Body Analytics
- Research Analytics
- Life Admin Analytics
- Grimoire/Creativity Analytics
- Goals/Proof Analytics
- Memory/RAG Analytics boundary card

Primary actions:

- change date range
- open insight
- dismiss insight preview
- create action from insight preview
- open source records
- export report preview only

## 18L — Self-Experiment Lab UI

Adds route:

- /experiments

Adds UI:

- experiment dashboard
- experiment template picker
- planning view
- running view
- reviewing view
- completed view
- experiment timeline
- baseline vs result card
- confounder panel
- measurement log preview
- lessons learned panel
- invalid/inconclusive explanation
- empty/loading/error states

Actions:

- create experiment
- log measurement
- pause/resume
- end experiment
- write lesson
- archive

## 18M — Carnos Analytics Explanation Boundary

Adds:

- simple explanation mode
- technical explanation mode
- what changed explanation
- why it might have changed explanation
- missing data explanation
- suggested next step preview
- suggested next experiment preview
- action-from-insight confirmation boundary
- analytics-to-memory boundary
- no diagnosis rule
- no causation claim from weak correlation
- no silent action creation
- no silent experiment creation
- no silent memory write
- no hidden memory use
- uncertainty visibility rule

## 18N — Anti-Demo-Data + Privacy/Sensitivity Audit

Adds audits blocking:

- hardcoded fake chart data
- placeholder analytics numbers
- random correlations
- static demo experiments
- fake scores
- fake insights
- unmarked fixture data
- causation claims without proof
- silent action creation
- silent memory writes
- hidden Carnos analytics writes

Adds privacy rules for:

- normal analytics
- private analytics
- sensitive analytics
- restricted analytics

Sensitive analytics include:

- mental health
- weed/vape
- weight/body
- skin/hair
- sleep
- energy
- mood
- job stress
- health notes

## 18O — Final Phase 18 Fixtures + Completion Report

Adds:

- final Phase 18 fixture
- final analytics fixture
- final experiment fixture
- final data quality fixture
- final insight quality fixture
- final audit script
- final completion report
- final smoke checklist
- Phase 18 status lock

Final verification must prove:

- analytics contracts exist
- experiment contracts exist
- metric registry exists
- data quality exists
- trend/correlation engine exists
- experiment evaluation exists
- dashboard UI exists
- experiment lab UI exists
- Carnos analytics boundary exists
- anti-demo-data audit exists
- privacy/sensitivity boundary exists
- no fake analytics
- no silent AI writes
- no hidden memory use
- no Phase 19/20/21 leakage
- npm run check passes
