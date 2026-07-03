# Phase 18 Expanded Feature Map

This document maps every Phase 18 feature to the build chunk that owns it.

## Feature to chunk map

| Feature | Build chunk |
|---|---|
| Metric Registry | 18C |
| Data Completeness Score | 18C |
| Analytics Snapshot System | 18D |
| Weekly/monthly snapshot comparison | 18D + 18I |
| Self-Experiment Lab foundation | 18E |
| Experiment templates | 18E + 18L |
| Before/During/After experiment lifecycle | 18E + 18L |
| Baseline tracking | 18E + 18J |
| Confounder tracking | 18E + 18J |
| Invalid experiment states | 18E + 18J |
| Lessons learned system | 18E + 18J + 18L |
| Insight Quality Levels | 18F |
| Analytics Provenance | 18F |
| Correlation-not-causation guardrails | 18F + 18I + 18M |
| Analytics repository boundaries | 18G |
| Experiment repository boundaries | 18H |
| Trend engine | 18I |
| Correlation engine | 18I |
| Comparison engine | 18I |
| Minimum data rules | 18I |
| Chart type boundaries | 18I + 18K |
| Analytics Dashboard | 18K |
| Domain-specific analytics cards | 18K |
| Insight Inbox | 18K |
| Action-from-insight preview | 18K + 18M |
| Self-Experiment Lab UI | 18L |
| Carnos analytics explanation mode | 18M |
| Analytics-to-memory boundary | 18M |
| Privacy/sensitivity labels | 18N |
| Anti-demo-data audit | 18N |
| Manual correction readiness | 18N, with repository readiness in 18H if needed |
| Time range consistency | 18C + 18D + 18I + 18K |
| Analytics preferences / pinned metrics readiness | 18C + 18K |
| Export-ready report boundary | 18D + 18O |
| Experiment Evaluation | 18J |
| Final fixtures/audit/report | 18O |

## Metric Registry details

Metric Registry must support:

- metric_id
- label
- domain
- unit
- source_table
- source_field
- aggregation_method
- higher_is_better
- healthy_range
- minimum_data_points
- privacy_level
- data_quality_rules

Example metrics include:

- sleep_hours
- sleep_consistency
- workout_completion
- calorie_average
- protein_average
- job_applications_sent
- referrals_requested
- learning_minutes
- research_sessions
- goal_completion_rate
- mood_score
- energy_score
- habit_streak

## Data Completeness Score details

Data completeness must support:

- complete_days
- missing_days
- partial_days
- coverage_percent
- data_quality_status
- missing_fields
- confidence_limit

Statuses:

- excellent
- usable
- weak
- insufficient
- invalid

## Experiment templates

Phase 18 must support templates for:

- Sleep Reset Experiment
- Deep Work Sprint
- Job Application Sprint
- Workout Consistency Experiment
- Lean Bulk Tracking Experiment
- Skin Routine Experiment
- Hair Routine Experiment
- No Weed/Vape Experiment
- Korean Study Consistency Experiment
- Guitar Practice Experiment
- Drawing Practice Experiment
- Dance Practice Experiment
- Research Reading Experiment
- Portfolio/GitHub Sprint
- Content Creation Sprint

## Insight quality levels

Insight quality must support:

- high_confidence
- medium_confidence
- low_confidence
- insufficient_data
- invalid

## Privacy/sensitivity labels

Analytics records and insights must support:

- normal
- private
- sensitive
- restricted

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
