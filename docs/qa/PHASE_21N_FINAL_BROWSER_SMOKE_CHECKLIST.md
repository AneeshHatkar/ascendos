# Phase 21N Final Browser Smoke Checklist

Status: Pending manual browser execution.

This checklist is evidence for real browser behavior. Automated checks do not complete it.

## Test environment

- Date: July 7, 2026
- Tester: Aneesh
- Commit: b709279
- Browser: Safari
- Desktop viewport: current desktop width, at least 1280 px
- Mobile viewport: not tested yet
- Supabase mode: configured
- Athena provider mode: not yet verified
- Current-info provider mode: not yet verified
- Spotify connector mode: not yet verified
- Notes: Manual browser smoke testing started after shell de-duplication fix.

## Evidence rules

For every test:

- record PASS, FAIL, BLOCKED, or NOT APPLICABLE;
- record the tested route;
- record the observed result;
- record any console/network error;
- do not claim provider-ready behavior unless the provider is actually configured;
- do not use fake personal data to hide an empty state;
- do not expose API keys, OAuth tokens, cookies, service credentials, or environment values;
- do not approve destructive or irreversible actions merely to finish the checklist.

## A. Authentication

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| A1 | Open `/auth/login` | Login form renders with labels and visible focus | PASS | `/auth/login` rendered the login form with labeled email and password inputs, visible cyan keyboard focus, a Sign in button, and signup navigation. Safari Console showed no red runtime errors; only normal development HMR connection output was present. |
| A2 | Open `/auth/signup` | Signup form renders with labels and visible focus | PASS | `/auth/signup` rendered the Create account form with labeled email and password inputs, visible cyan keyboard focus, a Create account button, and sign-in navigation. Safari Console showed only a transient development HMR WebSocket suspension followed by successful reconnection; no application runtime error was observed. |
| A3 | Submit invalid login input | Truthful error; no crash or secret detail | PASS | Invalid credentials were rejected with the user-safe message “Unable to sign in. Check your email and password and try again.” The login page remained stable, and no stack trace, API key, token, environment value, database detail, or internal exception was exposed. |
| A4 | Signed-out protected route | Redirect or protected empty/auth state | PASS | Direct navigation to `/command` while signed out showed an explicit “Sign in required” protected state. Personal dashboard data was not exposed, and Login and Sign up controls were available. |
| A5 | Signed-in app shell | User-safe auth status shown | PASS | Signed-in `/command` showed the authenticated user email and Sign out control in the topbar. One sidebar and one topbar rendered, Command content loaded in the main region, and the signed-out protected-state message was no longer present. |

## B. Global shell and navigation

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| B1 | Desktop sidebar | All route groups are visible and usable | PASS | At desktop width, the sidebar displayed Core, Career, Learning / Research, Health / Body, Life, and System. Representative routes from each group loaded successfully, `/settings` was visible under System, and active-route styling updated correctly. |
| B2 | Mobile menu | Opens, closes, traps no content behind overlay | PASS | At 390×844, the desktop sidebar was hidden and the Menu button opened one mobile navigation drawer with a dark backdrop. The drawer included a visible Close control, no duplicate sidebar appeared, and the main page remained behind the overlay. |
| B3 | Mobile route navigation | Selecting a route closes drawer | PASS | At 390×844, selecting Goals from the mobile navigation changed the route to `/goals`, loaded the page successfully, and automatically closed the drawer without leaving a stuck overlay or duplicate navigation. |
| B4 | Skip link | Keyboard focus can jump to main content | PASS | On `/command`, keyboard focus revealed the “Skip to main content” link at the top-left. Activating the link moved focus into the main content region without an error. |
| B5 | Keyboard focus | Links/buttons show visible focus states | PASS | On `/command`, keyboard navigation showed visible focus indicators on the skip link, sidebar links, Sign out, Athena, Add / Search, manual capture inputs, selectors, and proposal action controls. |
| B6 | Topbar states | AI/privacy/connectors/offline states are truthful | PASS | On `/command`, the topbar displayed AI provider as status-gated, Privacy as manual-first, Connectors as scoped, Offline as online with zero queued and failed items, the authenticated user email, and a Sign out control. No unavailable feature was presented as configured or active. |

## C. Core routes

| ID | Route | Required browser proof | Status | Evidence / notes |
|---|---|---|---|---|
| C1 | `/command` | Loads, manual capture visible, 21M panel visible | PENDING | |
| C2 | `/carnos` | Athena panel loads with truthful provider state | PENDING | |
| C3 | `/calendar` | Calendar/read state and proposal boundary visible | PENDING | |
| C4 | `/timeline` | Timeline renders useful state | PENDING | |
| C5 | `/goals` | Goal list/empty state and proposal composer render | PENDING | |
| C6 | `/world-class` | Proof/daily-log state renders without fake records | PENDING | |

## D. Athena and safe actions

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| D1 | Provider disabled | Athena explains provider unavailable | PENDING | |
| D2 | Provider missing key | Missing-key state is truthful and safe | PENDING | |
| D3 | Provider configured | Real response only when intentionally configured | PENDING | |
| D4 | Save card draft | Task/goal/proof/daily-log draft can be reviewed | PENDING | |
| D5 | Edit save card | JSON/editor changes remain review-only | PENDING | |
| D6 | Cancel save card | Cancels without database write | PENDING | |
| D7 | Confirm save card | Creates pending action, not hidden direct write | PENDING | |
| D8 | Memory candidate | Candidate can be created for review | PENDING | |
| D9 | Memory approve/reject | Explicit review controls work | PENDING | |
| D10 | Approved-memory use | Retrieval transparency is visible | PENDING | |
| D11 | Forget/archive memory | No hidden destructive action | PENDING | |

## E. Voice and current information

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| E1 | Voice panel | No surprise microphone permission prompt | PENDING | |
| E2 | Manual transcript | Typed/pasted transcript enters review flow | PENDING | |
| E3 | Talk-back boundary | No autoplay; provider state disclosed | PENDING | |
| E4 | Current-info disabled | No fake live-search result | PENDING | |
| E5 | Current-info query | Freshness/evidence warning visible | PENDING | |
| E6 | Save current-info candidate | Review is required before save | PENDING | |

## F. Global Athena drawer

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| F1 | Open drawer on several routes | Drawer opens without route-specific failure | PENDING | |
| F2 | Add Anything | Input accepts manual capture | PENDING | |
| F3 | Destination override | User can choose task/goal/proof/daily log | PENDING | |
| F4 | Search palette | Canonical route search works | PENDING | |
| F5 | Quick actions | Athena, Command, Privacy, Settings, Connectors reachable | PENDING | |
| F6 | Mobile drawer | No overflow or unreachable controls | PENDING | |

## G. Domain dashboards

| ID | Route group | Routes | Status | Evidence / notes |
|---|---|---|---|---|
| G1 | Career | `/career`, `/networking`, `/resume`, `/interviews` | PENDING | |
| G2 | Learning / Research | `/learning`, `/projects`, `/research-stanford`, `/research-lab`, `/knowledge` | PENDING | |
| G3 | Health / Body | `/body`, `/nutrition`, `/supplements`, `/sleep-energy`, `/emotion`, `/hair-skincare` | PENDING | |
| G4 | Life | `/life-admin`, `/finance`, `/housing`, `/documents` | PENDING | |
| G5 | Creativity / Intelligence | `/creativity`, `/grimoire`, `/decisions`, `/future-simulator` | PENDING | |
| G6 | Analytics / System | `/experiments`, `/analytics`, `/custom-trackers` | PENDING | |
| G7 | Trust / Settings | `/privacy`, `/settings` | PENDING | |

For each route above, verify:

- route loads;
- no blank page;
- useful data or honest empty state;
- read warnings remain visible;
- no fake demo record;
- no hidden direct write;
- mobile layout does not block primary actions.

## H. Privacy, connector, export, backup

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| H1 | Privacy trust center | Access/cannot-access information is visible | PENDING | |
| H2 | Export preview | Category/redaction/history metadata options work | PENDING | |
| H3 | Spotify disconnected | Disconnected state is truthful | PENDING | |
| H4 | Spotify configured | Connect/refresh/revoke only when intentionally configured | PENDING | |
| H5 | Spotify secrecy | No token appears in UI, URL, console, or downloadable file | PENDING | |
| H6 | Backup preview | Preview JSON contains metadata only | PENDING | |
| H7 | Backup digest | SHA-256 digest is produced | PENDING | |
| H8 | Restore preview | Uploaded preview is inspected without restore | PENDING | |
| H9 | Secret-like restore file | File is rejected or warned without importing | PENDING | |
| H10 | Drive boundary | No automatic Drive sync claim/control | PENDING | |

## I. Offline and local cache

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| I1 | Offline banner/state | Browser offline state is visible | PENDING | |
| I2 | Queue safe card offline | Item enters local queue only | PENDING | |
| I3 | Reconnect | Queue attempts sync through safe-card API | PENDING | |
| I4 | Stale draft badge | Stale cache is labeled | PENDING | |
| I5 | Secret-like local content | Local storage boundary rejects it | PENDING | |
| I6 | Storage inspection | No keys/tokens/passwords in browser storage | PENDING | |

## J. State coverage

| ID | State | Required proof | Status | Evidence / notes |
|---|---|---|---|---|
| J1 | Empty | Useful next action, not blank screen | PENDING | |
| J2 | Loading | Clear loading state where asynchronous | PENDING | |
| J3 | Error | Safe error without stack/secret leakage | PENDING | |
| J4 | Privacy restricted | Restricted state is explicit | PENDING | |
| J5 | Provider disabled | Feature does not pretend to work | PENDING | |
| J6 | Connector disconnected | Feature does not pretend connected | PENDING | |
| J7 | Offline | No hidden write or silent loss | PENDING | |
| J8 | Pending confirmation | User can review/edit/cancel | PENDING | |

## K. Mobile viewport matrix

Test at minimum:

- 390 × 844
- 430 × 932
- 768 × 1024
- desktop width at or above 1280

| ID | Surface | Status | Evidence / notes |
|---|---|---|---|
| K1 | App shell/sidebar/topbar | PENDING | |
| K2 | Command/manual capture | PENDING | |
| K3 | Athena chat | PENDING | |
| K4 | Global Athena drawer | PENDING | |
| K5 | Offline drawer | PENDING | |
| K6 | Privacy/settings | PENDING | |
| K7 | Backup/restore preview | PENDING | |
| K8 | Onboarding/ritual panel | PENDING | |

## L. Browser developer-tools audit

| ID | Test | Expected result | Status | Evidence / notes |
|---|---|---|---|---|
| L1 | Console | No unexplained runtime error | PENDING | |
| L2 | Network | No secret in request URL or response UI | PENDING | |
| L3 | Application storage | No provider/OAuth/service credential | PENDING | |
| L4 | Downloaded exports | No secret or raw restricted content | PENDING | |
| L5 | Failed API response | No server stack or environment leak | PENDING | |

## Completion rule

Phase 21N is complete only when:

- all required tests are PASS or explicitly documented BLOCKED/NOT APPLICABLE;
- failures are fixed and retested;
- known limitations are recorded;
- automated verification passes;
- final no-secret audit passes;
- final export/backup redaction check passes;
- final report truthfully distinguishes automated proof from browser proof;
- changes are committed and pushed.
