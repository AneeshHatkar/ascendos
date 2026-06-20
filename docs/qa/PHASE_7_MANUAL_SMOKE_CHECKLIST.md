# Phase 7 Manual Smoke Checklist — Core Operating Dashboards

Status: Manual checklist created for local browser verification.

Scope:
- /command
- /timeline
- /calendar
- /goals
- /carnos

Out of scope:
- /proof route creation
- writes/mutations
- autonomous Carnos actions
- Carnos generation
- memory/RAG
- Python/ML execution
- voice
- internet tools
- background jobs

## Preconditions

- `npm run check` passes.
- App can run locally with `npm run dev`.
- User can sign in through the existing auth flow.
- Supabase environment variables are configured if testing authenticated read behavior locally.

## Route smoke checks

### /command

- [ ] Route loads while signed in.
- [ ] CommandDashboardV1 appears.
- [ ] Cross-dashboard links appear.
- [ ] `/command` link is marked as the active route.
- [ ] Summary metric cards render.
- [ ] Dashboard cards render empty/ready state without crashing.
- [ ] No create/edit/delete/write controls appear.
- [ ] No non-canonical `/proof` link appears.

### /timeline

- [ ] Route loads while signed in.
- [ ] TimelineDashboardV1 appears.
- [ ] Cross-dashboard links appear.
- [ ] `/timeline` link is marked as the active route.
- [ ] Timeline metrics render.
- [ ] Timeline card renders without crashing.
- [ ] Existing Phase 5 timeline read list still appears.
- [ ] Read warnings show without crashing if reads fail.

### /calendar

- [ ] Route loads while signed in.
- [ ] CalendarDashboardV1 appears.
- [ ] Cross-dashboard links appear.
- [ ] `/calendar` link is marked as the active route.
- [ ] Calendar metrics render.
- [ ] Existing Phase 5 tasks/events read list still appears.
- [ ] Empty state appears when no tasks/events exist.
- [ ] No scheduling/mutation controls appear.

### /goals

- [ ] Route loads while signed in.
- [ ] GoalsDashboardV1 appears.
- [ ] Cross-dashboard links appear.
- [ ] `/goals` link is marked as the active route.
- [ ] Goal metrics render.
- [ ] Existing Phase 5 goals read list still appears.
- [ ] Empty state appears when no goals exist.
- [ ] No goal creation/edit/delete controls appear.

### /carnos

- [ ] Route loads while signed in.
- [ ] CarnosPanelV1 appears.
- [ ] Cross-dashboard links appear.
- [ ] `/carnos` link is marked as the active route.
- [ ] Carnos session/message/action metrics render.
- [ ] Pending update drawer appears.
- [ ] Pending update drawer opens and closes.
- [ ] Proposed action review UI renders inside the drawer.
- [ ] Save/Edit/Cancel persistence callbacks are not attached in Phase 7.
- [ ] Existing Carnos read lists still appear.
- [ ] No generation, memory, tool execution, or autonomous action path is active.

## Global smoke checks

- [ ] `npm run check` passes after Phase 7.17.
- [ ] Route coverage remains 33 canonical routes.
- [ ] `/proof` does not exist as an app route.
- [ ] Cross-dashboard links include only `/command`, `/timeline`, `/calendar`, `/goals`, and `/carnos`.
- [ ] Phase 7 audit gate checks all core dashboard surfaces.
- [ ] No dashboard component contains direct Supabase mutation code.
- [ ] No dashboard component contains generation, memory, Python/ML, voice, internet tool, or background job execution.

## Manual result fields

Tester:
Date:
Environment:
Result: Pending manual browser verification.

Notes:
- This checklist is intentionally manual. Automated gates are handled by `npm run check` and the integration audit.
