#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import zipfile
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path
from typing import Iterable

ROOT = Path.cwd()

DOCX_PATH = ROOT / "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx"
JSON_PATH = ROOT / "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json"

AUDIT_REPORT = ROOT / "docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md"
PHASE_REPORT = ROOT / "docs/phase-reports/PHASE_13_5G_FINAL_SOURCE_COVERAGE_AUDIT.md"
QA_REPORT = ROOT / "docs/qa/PHASE_13_5G_FINAL_SOURCE_COVERAGE_MANUAL_SMOKE_CHECKLIST.md"

TEXT_EXTENSIONS = {
    ".ts",
    ".tsx",
    ".js",
    ".mjs",
    ".cjs",
    ".json",
    ".md",
    ".sql",
    ".py",
    ".txt",
}

IGNORED_DIRS = {
    ".git",
    ".next",
    "node_modules",
    ".vercel",
    "coverage",
    "dist",
    "build",
    ".turbo",
    "__pycache__",
}

CANONICAL_ROUTES = [
    "/command",
    "/carnos",
    "/calendar",
    "/timeline",
    "/goals",
    "/world-class",
    "/career",
    "/networking",
    "/resume",
    "/interviews",
    "/learning",
    "/projects",
    "/research-stanford",
    "/research-lab",
    "/body",
    "/nutrition",
    "/supplements",
    "/sleep-energy",
    "/emotion",
    "/hair-skincare",
    "/life-admin",
    "/finance",
    "/housing",
    "/documents",
    "/creativity",
    "/grimoire",
    "/decisions",
    "/future-simulator",
    "/knowledge",
    "/experiments",
    "/analytics",
    "/privacy",
    "/custom-trackers",
]

INTENTIONAL_PLACEHOLDERS = {
    "/creativity",
    "/decisions",
    "/future-simulator",
    "/experiments",
    "/custom-trackers",
}

PHASE_13_5_REPAIR_TABLES = [
    "persona_prompt_versions",
    "calendar_blocks",
    "routines",
    "routine_steps",
    "reminders",
    "behavioral_stories",
    "question_bank",
    "mock_interviews",
    "resume_usage",
    "app_settings",
    "privacy_settings",
]

FUTURE_SCOPE_LOCKS = {
    "Voice Foundation": {
        "phase": "Phase 14",
        "source_any": ["voice", "speech", "transcript", "STT", "TTS"],
        "must_not_have_files": ["src/app/voice/page.tsx"],
        "must_not_have_repo_terms": [
            "create table if not exists public.voice_sessions",
            "create table if not exists public.voice_transcripts",
            "navigator.mediaDevices",
            "MediaRecorder",
        ],
    },
    "Memory / RAG": {
        "phase": "Phase 15",
        "source_any": ["memory", "RAG", "embedding", "retrieval"],
        "must_not_have_files": ["src/app/memory/page.tsx"],
        "must_not_have_repo_terms": [
            "create table if not exists public.memory_items",
            "create table if not exists public.embeddings",
            "pgvector",
            "match_documents",
        ],
    },
    "Web Search / Internet Tools": {
        "phase": "Phase 16",
        "source_any": ["web search", "internet", "current resources", "citations"],
        "must_not_have_files": ["src/app/api/search/route.ts"],
        "must_not_have_repo_terms": [
            "create table if not exists public.web_search_runs",
            "Tavily",
            "SerpAPI",
        ],
    },
    "Analytics / Experiments Engine": {
        "phase": "Phase 17",
        "source_any": ["analytics", "experiments", "correlations", "snapshots"],
        "must_not_have_files": [],
        "must_not_have_repo_terms": [
            "create table if not exists public.analytics_snapshots",
            "create table if not exists public.experiment_results",
        ],
    },
    "Custom Tracker Builder": {
        "phase": "Phase 18",
        "source_any": ["custom trackers", "user-defined trackers", "tracker builder"],
        "must_not_have_files": [],
        "must_not_have_repo_terms": [
            "create table if not exists public.tracker_definitions",
            "create table if not exists public.tracker_entries",
        ],
    },
    "Full Export / Delete / Private Mode Controls": {
        "phase": "Phase 19",
        "source_any": ["export", "delete", "private mode", "data controls"],
        "must_not_have_files": [],
        "must_not_have_repo_terms": [
            "deleteAllUserData",
            "exportAllUserData",
            "hardDeleteUser",
        ],
    },
    "Final Polish / Deploy / Demo": {
        "phase": "Phase 20 + JSON Chunk 21",
        "source_any": ["deploy", "screenshots", "demo", "portfolio", "polish"],
        "must_not_have_files": [],
        "must_not_have_repo_terms": [],
    },
}


@dataclass
class FeatureCheck:
    area: str
    classification: str
    source_any: list[str]
    repo_all: list[str]
    evidence_files: list[str]
    notes: str
    status: str = "PENDING"
    missing: list[str] = field(default_factory=list)
    source_hits: list[str] = field(default_factory=list)
    repo_hits: list[str] = field(default_factory=list)


def read(path: Path) -> str:
    try:
        return path.read_text(encoding="utf-8", errors="ignore")
    except FileNotFoundError:
        return ""


def extract_docx_text(path: Path) -> str:
    if not path.exists():
        return ""

    try:
        with zipfile.ZipFile(path) as z:
            xml_names = [
                name
                for name in z.namelist()
                if name.startswith("word/")
                and name.endswith(".xml")
                and (
                    name == "word/document.xml"
                    or name.startswith("word/header")
                    or name.startswith("word/footer")
                    or name in {"word/footnotes.xml", "word/endnotes.xml", "word/comments.xml"}
                )
            ]

            chunks: list[str] = []
            for name in xml_names:
                raw = z.read(name).decode("utf-8", errors="ignore")
                raw = re.sub(r"</w:p>", "\n", raw)
                raw = re.sub(r"<[^>]+>", " ", raw)
                raw = (
                    raw.replace("&amp;", "&")
                    .replace("&lt;", "<")
                    .replace("&gt;", ">")
                    .replace("&quot;", '"')
                    .replace("&apos;", "'")
                )
                raw = re.sub(r"[ \t]+", " ", raw)
                chunks.append(raw)

            return "\n".join(chunks)
    except Exception as exc:
        return f"DOCX_EXTRACT_ERROR: {exc}"


def flatten_json(obj, prefix: str = "") -> list[str]:
    rows: list[str] = []

    if isinstance(obj, dict):
        for key, value in obj.items():
            path = f"{prefix}.{key}" if prefix else str(key)
            rows.append(path)
            rows.extend(flatten_json(value, path))
    elif isinstance(obj, list):
        for index, value in enumerate(obj):
            path = f"{prefix}[{index}]"
            rows.append(path)
            rows.extend(flatten_json(value, path))
    else:
        rows.append(f"{prefix}: {obj}")

    return rows


def load_json_text(path: Path) -> str:
    if not path.exists():
        return ""

    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        return "\n".join(flatten_json(data)) + "\n\n" + json.dumps(data, indent=2, ensure_ascii=False)
    except Exception:
        return read(path)


def iter_repo_files() -> Iterable[Path]:
    for path in ROOT.rglob("*"):
        if not path.is_file():
            continue

        rel_parts = set(path.relative_to(ROOT).parts)
        if rel_parts & IGNORED_DIRS:
            continue

        if path.suffix not in TEXT_EXTENSIONS:
            continue

        yield path


def build_repo_corpus() -> tuple[str, dict[str, str]]:
    files: dict[str, str] = {}
    chunks: list[str] = []

    for path in iter_repo_files():
        rel = path.relative_to(ROOT).as_posix()
        text = read(path)
        files[rel] = text
        chunks.append(f"\n\n===== FILE: {rel} =====\n{text}")

    return "\n".join(chunks), files


def has_any(text: str, terms: list[str]) -> list[str]:
    low = text.lower()
    return [term for term in terms if term.lower() in low]


def has_all(text: str, terms: list[str]) -> list[str]:
    low = text.lower()
    return [term for term in terms if term.lower() not in low]


def route_to_file(route: str) -> Path:
    return ROOT / "src/app" / route.strip("/") / "page.tsx"


def run_feature_check(check: FeatureCheck, source_text: str, repo_text: str) -> FeatureCheck:
    check.source_hits = has_any(source_text, check.source_any)
    check.repo_hits = [term for term in check.repo_all if term.lower() in repo_text.lower()]

    if check.source_any and not check.source_hits:
        check.missing.append("source semantic marker missing: " + " / ".join(check.source_any))

    missing_repo_terms = has_all(repo_text, check.repo_all)
    for term in missing_repo_terms:
        check.missing.append(f"repo marker missing: {term}")

    for file in check.evidence_files:
        if not (ROOT / file).exists():
            check.missing.append(f"evidence file missing: {file}")

    check.status = "PASS" if not check.missing else "FAIL"
    return check


def main() -> int:
    errors: list[str] = []

    DOCX_PATH.parent.mkdir(parents=True, exist_ok=True)
    AUDIT_REPORT.parent.mkdir(parents=True, exist_ok=True)
    PHASE_REPORT.parent.mkdir(parents=True, exist_ok=True)
    QA_REPORT.parent.mkdir(parents=True, exist_ok=True)

    if not DOCX_PATH.exists():
        errors.append(f"Missing source DOCX: {DOCX_PATH.relative_to(ROOT)}")
    if not JSON_PATH.exists():
        errors.append(f"Missing source JSON: {JSON_PATH.relative_to(ROOT)}")

    docx_text = extract_docx_text(DOCX_PATH)
    json_text = load_json_text(JSON_PATH)
    source_text = f"{docx_text}\n\n{json_text}"
    repo_text, repo_files = build_repo_corpus()

    if len(docx_text) < 1000:
        errors.append("DOCX extraction produced too little text.")
    if len(json_text) < 1000:
        errors.append("JSON source extraction produced too little text.")

    source_core_hits = has_any(
        source_text,
        [
            "ascendOS",
            "Carnos",
            "dashboard",
            "calendar",
            "career",
            "learning",
            "research",
            "health",
            "Grimoire",
            "voice",
            "memory",
            "privacy",
        ],
    )
    if len(source_core_hits) < 8:
        errors.append("Source files do not expose enough expected top-level system terms.")

    # Route check.
    missing_route_files = [route for route in CANONICAL_ROUTES if not route_to_file(route).exists()]
    if missing_route_files:
        errors.append("Missing canonical route files: " + ", ".join(missing_route_files))

    routes_ts = read(ROOT / "src/lib/routes.ts")
    registry_ts = read(ROOT / "src/lib/dashboard-registry.ts")

    for route in CANONICAL_ROUTES:
        if route not in routes_ts:
            errors.append(f"Route missing from src/lib/routes.ts: {route}")
        if route not in registry_ts:
            errors.append(f"Route missing from src/lib/dashboard-registry.ts: {route}")

    # Placeholder check.
    actual_placeholders: set[str] = set()
    for path in (ROOT / "src/app").glob("*/page.tsx"):
        if "PlaceholderDashboardPage" in read(path):
            actual_placeholders.add("/" + path.parent.name)

    if actual_placeholders != INTENTIONAL_PLACEHOLDERS:
        errors.append(
            "Placeholder set mismatch. Expected "
            + ", ".join(sorted(INTENTIONAL_PLACEHOLDERS))
            + "; actual "
            + ", ".join(sorted(actual_placeholders))
        )

    placeholder_lock = read(ROOT / "src/lib/placeholder-route-decisions.ts")
    missing_placeholder_lock_terms = has_all(
        placeholder_lock,
        [
            "PLACEHOLDER_ROUTE_DECISIONS",
            "INTENTIONAL_PLACEHOLDER_ROUTES",
            "intentional_deferred_route",
            "Phase 17 analytics/experiments",
            "Phase 18 custom tracker builder",
            "Post-v1",
            "Carnos display-name rename",
        ],
    )
    for term in missing_placeholder_lock_terms:
        errors.append(f"Placeholder decision lock missing marker: {term}")

    # Migration check.
    migration_text = "\n\n".join(read(path) for path in sorted((ROOT / "supabase/migrations").glob("*.sql")))
    migration_count = len(list((ROOT / "supabase/migrations").glob("*.sql")))

    if migration_count < 21:
        errors.append(f"Expected at least 21 migrations after Phase 13.5E; found {migration_count}")

    for table in PHASE_13_5_REPAIR_TABLES:
        if table not in migration_text:
            errors.append(f"Phase 13.5 repair table missing from migrations: {table}")

    # Package script check.
    package_json = json.loads(read(ROOT / "package.json"))
    scripts = package_json.get("scripts", {})
    check_script = scripts.get("check", "")

    required_scripts = [
        "audit:phase13_5",
        "audit:phase13_5b",
        "audit:phase13_5c",
        "audit:phase13_5d",
        "audit:phase13_5e",
        "audit:phase13_5f",
        "audit:phase13_5g",
    ]

    for script in required_scripts:
        if script not in scripts:
            errors.append(f"package.json missing script: {script}")

    for gate in [
        "npm run audit:phase13_5",
        "npm run audit:phase13_5b",
        "npm run audit:phase13_5c",
        "npm run audit:phase13_5d",
        "npm run audit:phase13_5e",
        "npm run audit:phase13_5f",
        "npm run audit:phase13_5g",
        "npm run build",
    ]:
        if gate not in check_script:
            errors.append(f"npm run check missing gate: {gate}")

    feature_checks = [
        FeatureCheck(
            area="Source-of-truth foundation",
            classification="Built",
            source_any=["source-of-truth", "source of truth", "v1.1 docs", "FINAL_SYNCED"],
            repo_all=["SOURCE_OF_TRUTH.md", "PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "PHASE_STATUS.md"],
            evidence_files=["SOURCE_OF_TRUTH.md", "PROJECT_EXECUTION_LOG.md", "CODE_LEDGER.md", "PHASE_STATUS.md"],
            notes="Foundation documents exist and source hierarchy is locked.",
        ),
        FeatureCheck(
            area="Auth, Supabase, profiles, protected shell",
            classification="Built",
            source_any=["Supabase Auth", "profiles", "RLS", "protected routes"],
            repo_all=["middleware.ts", "profiles", "carnos_profiles", "src/lib/supabase/server.ts"],
            evidence_files=["middleware.ts", "src/lib/supabase/server.ts", "supabase/migrations/0001_profiles_and_carnos_profiles.sql"],
            notes="Auth and RLS foundation exists.",
        ),
        FeatureCheck(
            area="Core goals, tasks, events, logs, proof, AI action spine",
            classification="Built",
            source_any=["goals", "tasks", "daily logs", "proof", "confirmation flow"],
            repo_all=["goals", "tasks", "events", "daily_logs", "proof_items", "ai_actions"],
            evidence_files=[
                "supabase/migrations/0002_audit_and_ai_actions.sql",
                "supabase/migrations/0004_goals_foundation.sql",
                "supabase/migrations/0005_daily_logs_and_proof_items.sql",
                "supabase/migrations/0006_tasks_and_events.sql",
            ],
            notes="Core operating SQL spine exists.",
        ),
        FeatureCheck(
            area="Safe proposed-action write flow",
            classification="Built",
            source_any=["confirmation", "approved", "reject", "proposed action", "AI action"],
            repo_all=["createProposedAction", "executeApprovedAction", "pending_confirmation", "approved", "rejected"],
            evidence_files=[
                "src/lib/actions/create-proposed-action.ts",
                "src/lib/actions/execution-dispatcher.ts",
                "src/components/actions/proposed-action-review-card.tsx",
            ],
            notes="Confirmation-before-write boundary exists.",
        ),
        FeatureCheck(
            area="Carnos text chat and persona repair",
            classification="Repaired in Phase 13.5B",
            source_any=["Carnos", "Text Chat", "chat", "personality", "persona"],
            repo_all=["chat_sessions", "chat_messages", "persona_prompt_versions", "carnos_profiles"],
            evidence_files=[
                "docs/phase-reports/PHASE_13_5B_CARNOS_PERSONA_COMPLETION_REPORT.md",
                "docs/qa/PHASE_13_5B_CARNOS_PERSONA_MANUAL_SMOKE_CHECKLIST.md",
                "scripts/audit-phase-13-5b.mjs",
            ],
            notes="Carnos text/persona foundation repaired without fake autonomous generation.",
        ),
        FeatureCheck(
            area="Calendar, timeline, routines, reminders repair",
            classification="Repaired in Phase 13.5C",
            source_any=["calendar", "timeline", "routine", "routines", "reminders"],
            repo_all=["calendar_blocks", "routines", "routine_steps", "reminders"],
            evidence_files=[
                "docs/phase-reports/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_COMPLETION_REPORT.md",
                "docs/qa/PHASE_13_5C_CALENDAR_TIMELINE_ROUTINE_MANUAL_SMOKE_CHECKLIST.md",
                "scripts/audit-phase-13-5c.mjs",
            ],
            notes="Calendar/routine foundation repaired; timeline_events remains intentionally not introduced.",
        ),
        FeatureCheck(
            area="Career prep story, question bank, mock interviews repair",
            classification="Repaired in Phase 13.5D",
            source_any=["career", "interview", "behavioral", "STAR", "mock interview"],
            repo_all=["behavioral_stories", "question_bank", "mock_interviews", "resume_usage"],
            evidence_files=[
                "docs/phase-reports/PHASE_13_5D_CAREER_PREP_COMPLETION_REPORT.md",
                "docs/qa/PHASE_13_5D_CAREER_PREP_MANUAL_SMOKE_CHECKLIST.md",
                "scripts/audit-phase-13-5d.mjs",
            ],
            notes="Career prep gaps repaired.",
        ),
        FeatureCheck(
            area="Settings and privacy foundation repair",
            classification="Repaired in Phase 13.5E",
            source_any=["settings", "privacy", "export", "delete", "private mode"],
            repo_all=["app_settings", "privacy_settings", "export/delete flows remain Phase 19"],
            evidence_files=[
                "docs/phase-reports/PHASE_13_5E_SETTINGS_PRIVACY_COMPLETION_REPORT.md",
                "docs/qa/PHASE_13_5E_SETTINGS_PRIVACY_MANUAL_SMOKE_CHECKLIST.md",
                "scripts/audit-phase-13-5e.mjs",
            ],
            notes="Settings/privacy tables exist; destructive/export controls remain Phase 19.",
        ),
        FeatureCheck(
            area="Placeholder route decision lock",
            classification="Repaired/classified in Phase 13.5F",
            source_any=["creativity", "decision", "future", "experiments", "custom trackers"],
            repo_all=["PLACEHOLDER_ROUTE_DECISIONS", "INTENTIONAL_PLACEHOLDER_ROUTES", "intentional_deferred_route"],
            evidence_files=[
                "docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md",
                "docs/qa/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_MANUAL_SMOKE_CHECKLIST.md",
                "scripts/audit-phase-13-5f.mjs",
                "src/lib/placeholder-route-decisions.ts",
            ],
            notes="Five remaining placeholders are intentional, not missing accidents.",
        ),
        FeatureCheck(
            area="Career system",
            classification="Built",
            source_any=["career", "job applications", "networking", "resume", "interviews"],
            repo_all=["job_applications", "networking_contacts", "job_referrals", "resume_versions", "interviews"],
            evidence_files=["docs/phase-reports/PHASE_8_CAREER_SYSTEM_COMPLETION_REPORT.md", "scripts/audit-phase-8.mjs"],
            notes="Career routes and read dashboards are present.",
        ),
        FeatureCheck(
            area="Learning and projects system",
            classification="Built",
            source_any=["Learning academy", "skill trees", "quizzes", "project builder", "bug logs", "releases"],
            repo_all=["skill_paths", "skills", "learning_sessions", "quizzes", "projects", "project_milestones", "project_bugs", "project_releases"],
            evidence_files=["docs/phase-reports/PHASE_9_COMPLETION_REPORT.md"],
            notes="Learning and project systems are present from Phase 9.",
        ),
        FeatureCheck(
            area="Research and Stanford/PhD system",
            classification="Built",
            source_any=["Stanford readiness", "labs", "professors", "papers", "SOP"],
            repo_all=["research_ideas", "research_questions", "research_papers", "target_professors", "sop_versions"],
            evidence_files=["docs/phase-reports/PHASE_10_RESEARCH_STANFORD_COMPLETION_REPORT.md", "scripts/audit-phase-10.mjs"],
            notes="Research and Stanford/PhD planning systems are present.",
        ),
        FeatureCheck(
            area="Health/body system",
            classification="Built",
            source_any=["Health", "body", "nutrition", "sleep", "skin", "hair"],
            repo_all=["body_logs", "workouts", "nutrition_logs", "sleep_logs", "skincare_logs", "haircare_logs"],
            evidence_files=["docs/phase-reports/PHASE_11_HEALTH_BODY_COMPLETION_REPORT.md", "scripts/audit-phase-11.mjs"],
            notes="Health/body dashboards are present with safety language and read boundaries.",
        ),
        FeatureCheck(
            area="Life admin and finance system",
            classification="Built",
            source_any=["Life admin", "finance", "documents", "housing", "subscriptions"],
            repo_all=["financial_accounts", "budget_categories", "subscriptions", "documents", "housing_options"],
            evidence_files=["docs/phase-reports/PHASE_12_LIFE_ADMIN_FINANCE_COMPLETION_REPORT.md", "scripts/audit-phase-12.mjs"],
            notes="Life admin, finance, documents, and housing foundations are present.",
        ),
        FeatureCheck(
            area="Grimoire system",
            classification="Built",
            source_any=["Grimoire", "symbol", "corruption", "reversion", "throne"],
            repo_all=["grimoire_modes", "grimoire_daily_logs", "grimoire_skills", "grimoire_corruption_checks", "grimoire_reversions"],
            evidence_files=["docs/phase-reports/PHASE_13_GRIMOIRE_COMPLETION_REPORT.md", "scripts/audit-phase-13.mjs"],
            notes="Grimoire read-only system is implemented with safety boundaries.",
        ),
    ]

    checked_features: list[FeatureCheck] = []
    for check in feature_checks:
        checked = run_feature_check(check, source_text, repo_text)
        checked_features.append(checked)
        if checked.status != "PASS":
            for missing in checked.missing:
                errors.append(f"{checked.area}: {missing}")

    # Future/deferred scope checks.
    future_results: list[dict[str, str]] = []
    for area, info in FUTURE_SCOPE_LOCKS.items():
        phase = info["phase"]
        source_hits = has_any(source_text, info["source_any"])
        missing: list[str] = []

        if not source_hits:
            missing.append("source semantic marker missing: " + " / ".join(info["source_any"]))

        for file in info["must_not_have_files"]:
            if (ROOT / file).exists():
                missing.append(f"future-phase file exists too early: {file}")

        lower_repo = repo_text.lower()
        for term in info["must_not_have_repo_terms"]:
            if term.lower() in lower_repo:
                missing.append(f"future-phase implementation marker exists too early: {term}")

        # Must be documented as deferred/future somewhere.
        future_docs = (
            read(ROOT / "PHASE_STATUS.md")
            + "\n"
            + read(ROOT / "docs/phase-reports/PHASE_13_5F_PLACEHOLDER_ROUTE_DECISION_REPORT.md")
            + "\n"
            + read(ROOT / "docs/roadmap/POST_V1_EXPANSION_ROADMAP.md")
            + "\n"
            + read(ROOT / "src/lib/placeholder-route-decisions.ts")
        ).lower()

        if area.lower().split("/")[0].strip() not in future_docs and phase.lower() not in future_docs:
            missing.append(f"future/deferred scope not documented clearly for {area} -> {phase}")

        status = "PASS" if not missing else "FAIL"
        if missing:
            errors.extend([f"{area}: {m}" for m in missing])

        future_results.append(
            {
                "area": area,
                "phase": phase,
                "status": status,
                "source_hits": ", ".join(source_hits),
                "missing": "; ".join(missing),
            }
        )

    # Write reports.
    generated_at = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    final_status = "PASS" if not errors else "FAIL"

    lines: list[str] = []
    lines.append("# Phase 1–13.5 Full Source Scope Audit")
    lines.append("")
    lines.append(f"Generated: {generated_at}")
    lines.append("")
    lines.append(f"Status: {final_status}")
    lines.append("")
    lines.append("## Purpose")
    lines.append("")
    lines.append(
        "This Phase 13.5G audit is the final full source-scope closure check before Phase 14 Voice Foundation. "
        "It compares the FINAL_SYNCED DOCX/JSON source scope against actual repository evidence, Phase 13.5 repairs, "
        "canonical routes, SQL migrations, audit gates, reports, and intentionally deferred scope."
    )
    lines.append("")
    lines.append("## Source inputs")
    lines.append("")
    lines.append(f"- DOCX: `{DOCX_PATH.relative_to(ROOT)}`")
    lines.append(f"- JSON: `{JSON_PATH.relative_to(ROOT)}`")
    lines.append(f"- DOCX extracted characters: {len(docx_text)}")
    lines.append(f"- JSON extracted characters: {len(json_text)}")
    lines.append(f"- Repository text files scanned: {len(repo_files)}")
    lines.append(f"- SQL migration count: {migration_count}")
    lines.append("")
    lines.append("## Completed / repaired / classified scope")
    lines.append("")
    lines.append("| Area | Classification | Status | Source hits | Repo evidence | Notes |")
    lines.append("|---|---|---:|---|---|---|")

    for check in checked_features:
        source_hits = ", ".join(check.source_hits) if check.source_hits else "-"
        repo_hits = ", ".join(check.repo_hits[:8]) if check.repo_hits else "-"
        notes = check.notes.replace("|", "\\|")
        lines.append(
            f"| {check.area} | {check.classification} | {check.status} | {source_hits} | {repo_hits} | {notes} |"
        )

    lines.append("")
    lines.append("## Future / deferred / post-v1 scope")
    lines.append("")
    lines.append("| Area | Locked phase | Status | Source hits | Missing/errors |")
    lines.append("|---|---|---:|---|---|")
    for result in future_results:
        lines.append(
            f"| {result['area']} | {result['phase']} | {result['status']} | {result['source_hits'] or '-'} | {result['missing'] or '-'} |"
        )

    lines.append("")
    lines.append("## Route coverage")
    lines.append("")
    lines.append(f"- Canonical routes checked: {len(CANONICAL_ROUTES)}")
    lines.append(f"- Intentional placeholders: {', '.join(sorted(INTENTIONAL_PLACEHOLDERS))}")
    lines.append("- All intentional placeholders are decision-locked by Phase 13.5F.")
    lines.append("")

    lines.append("## Phase 13.5 repaired schema markers")
    lines.append("")
    for table in PHASE_13_5_REPAIR_TABLES:
        lines.append(f"- `{table}`")
    lines.append("")

    lines.append("## Errors")
    lines.append("")
    if errors:
        for error in errors:
            lines.append(f"- {error}")
    else:
        lines.append("- None.")
    lines.append("")

    lines.append("## Final decision")
    lines.append("")
    if errors:
        lines.append("Phase 14 must not start. Fix the errors above, rerun `npm run audit:phase13_5g`, then rerun `npm run check`.")
    else:
        lines.append("Phase 1 through Phase 13.5 is source-covered, repaired, intentionally classified, or deferred. Phase 14 Voice Foundation may begin after this audit is committed and pushed.")

    lines.append("")

    AUDIT_REPORT.write_text("\n".join(lines), encoding="utf-8")

    PHASE_REPORT.write_text(
        f"""# Phase 13.5G Final Source Coverage Audit

Status: {"Complete" if not errors else "Failed"}.

## Scope

Phase 13.5G performs the final source-scope closure check from Phase 1 through Phase 13.5 before Phase 14 Voice Foundation.

## Inputs checked

- FINAL_SYNCED DOCX
- FINAL_SYNCED JSON
- Canonical routes
- Dashboard registry
- SQL migrations
- Audit scripts
- Phase reports
- Manual smoke checklists
- Phase 13.5A through Phase 13.5F repairs
- Future/deferred/post-v1 locks

## Primary output

- `docs/audits/PHASE_1_13_5_FULL_SOURCE_SCOPE_AUDIT.md`

## Result

{"No unresolved completed-scope gaps remain. Phase 14 Voice Foundation may begin after commit/push." if not errors else "Unresolved source-scope errors remain. Phase 14 must not start."}
""",
        encoding="utf-8",
    )

    QA_REPORT.write_text(
        """# Phase 13.5G Final Source Coverage Manual Smoke Checklist

Status: Complete.

## Manual checks

- Confirm `/command`, `/carnos`, `/calendar`, `/timeline`, `/goals`, and `/world-class` open.
- Confirm `/career`, `/networking`, `/resume`, and `/interviews` open.
- Confirm `/learning` and `/projects` open.
- Confirm `/research-lab` and `/research-stanford` open.
- Confirm `/body`, `/nutrition`, `/supplements`, `/sleep-energy`, `/emotion`, and `/hair-skincare` open.
- Confirm `/life-admin`, `/finance`, `/housing`, and `/documents` open.
- Confirm `/grimoire` opens.
- Confirm `/settings` and `/privacy` open.
- Confirm `/creativity`, `/decisions`, `/future-simulator`, `/experiments`, and `/custom-trackers` show Phase 13.5F intentional placeholder decision language.
- Confirm no placeholder page creates, updates, deletes, upserts, proposes, executes, calls LLM APIs, or starts timers.
- Confirm `npm run audit:phase13_5g` passes.
- Confirm `npm run check` passes.
- Confirm Phase 14 Voice does not start until Phase 13.5G is committed and pushed.

## Boundary

No writes are added by Phase 13.5G. This phase only audits, reports, and locks source coverage.
""",
        encoding="utf-8",
    )

    if errors:
        print("=== PHASE 13.5G FULL SOURCE SCOPE AUDIT FAILED ===")
        for error in errors:
            print(f"✗ {error}")
        print(f"\nReport written: {AUDIT_REPORT.relative_to(ROOT)}")
        return 1

    print("✓ Phase 13.5G full source scope audit passed.")
    print(f"✓ Report written: {AUDIT_REPORT.relative_to(ROOT)}")
    print(f"✓ Phase report written: {PHASE_REPORT.relative_to(ROOT)}")
    print(f"✓ QA checklist written: {QA_REPORT.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
