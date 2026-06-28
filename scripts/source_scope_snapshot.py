#!/usr/bin/env python3
from __future__ import annotations

import json
import os
import re
import shutil
import subprocess
import sys
import textwrap
import zipfile
from datetime import datetime
from pathlib import Path
from typing import Iterable

ROOT = Path.cwd()
STAMP = datetime.now().strftime("%Y%m%d_%H%M%S")
OUT = ROOT / "docs" / "audits" / f"source_scope_snapshot_{STAMP}"
OUT.mkdir(parents=True, exist_ok=True)

SOURCE_JSON_CANDIDATES = [
    ROOT / "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
    ROOT / "ascendOS_Carnos_v1_1_COMPLETE_Source_of_Truth_FINAL_SYNCED.json",
]

SOURCE_DOCX_CANDIDATES = [
    ROOT / "docs/source-of-truth/ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
    ROOT / "ascendOS_Carnos_v1_1_COMPLETE_Implementation_Bible_FINAL_SYNCED.docx",
]

SCAN_DIRS = [
    "src",
    "supabase",
    "docs",
    "scripts",
]

TEXT_EXTS = {
    ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
    ".sql", ".md", ".json", ".txt", ".yml", ".yaml",
    ".toml", ".env", ".example",
}

IGNORE_DIR_NAMES = {
    "node_modules",
    ".next",
    ".git",
    ".vercel",
    "dist",
    "build",
    "coverage",
    ".turbo",
    "__pycache__",
}

FEATURE_GROUPS = {
    "carnos_chat_text_input": [
        "Text Chat",
        "text chat",
        "chat input",
        "message composer",
        "send message",
        "sendMessage",
        "chat_sessions",
        "chat_messages",
        "Carnos",
        "carnos",
        "messages",
        "conversation",
        "thread",
        "textarea",
        "input",
        "form",
        "useChat",
    ],
    "carnos_persona_personality": [
        "persona",
        "personality",
        "persona_prompt",
        "persona_prompt_versions",
        "carnos_profiles",
        "system prompt",
        "mode label",
        "router",
        "Operator",
        "Guardian",
        "Coach",
        "Analyst",
        "Grimoire Guide",
        "safe response",
    ],
    "ai_extraction_proposals": [
        "ai extract",
        "extract",
        "proposed action",
        "ProposedActionReviewCard",
        "createProposedAction",
        "executeApprovedAction",
        "ai_actions",
        "pending_confirmation",
        "confirmation-before-write",
        "approve",
        "reject",
    ],
    "voice": [
        "voice",
        "speech",
        "transcript",
        "STT",
        "TTS",
        "speech-to-text",
        "text-to-speech",
        "microphone",
        "recording",
        "voice_sessions",
        "voice_transcripts",
    ],
    "memory_rag": [
        "memory",
        "memories",
        "memory_inbox",
        "approved_memories",
        "rejected_memories",
        "embedding",
        "embeddings",
        "pgvector",
        "vector",
        "RAG",
        "retrieval",
        "knowledge vault",
        "knowledge_items",
    ],
    "web_search_internet_tools": [
        "web search",
        "internet",
        "current resources",
        "citations",
        "reliability",
        "jobs",
        "companies",
        "labs",
        "papers",
        "search tools",
        "source reliability",
    ],
    "analytics_experiments": [
        "analytics",
        "experiments",
        "correlation",
        "trend",
        "snapshot",
        "score",
        "calibration",
        "self-experiment",
        "chart",
        "data quality",
    ],
    "custom_trackers": [
        "custom trackers",
        "custom_tracker",
        "tracker_definitions",
        "tracker_fields",
        "tracker_entries",
        "dynamic tracker",
        "user-defined",
        "schema builder",
    ],
    "privacy_export": [
        "privacy",
        "export",
        "delete",
        "private mode",
        "sensitive",
        "audit viewer",
        "data control",
        "memory controls",
        "RLS verification",
    ],
    "routines": [
        "routine",
        "routines",
        "routine_steps",
        "habit",
        "schedule template",
    ],
    "career_behavioral_stories": [
        "behavioral",
        "behavioral_stories",
        "STAR",
        "story bank",
        "interview story",
        "Tell me about a time",
    ],
    "research_stanford": [
        "research_ideas",
        "research_questions",
        "research_papers",
        "target_professors",
        "target_labs",
        "phd",
        "Stanford",
        "sop_versions",
        "recommendation_targets",
    ],
    "health_body": [
        "body_logs",
        "workouts",
        "nutrition_logs",
        "supplements",
        "sleep_logs",
        "energy_logs",
        "mental_health_logs",
        "emotion_logs",
        "skincare_logs",
        "haircare_logs",
        "progress_photos",
    ],
    "life_admin_finance": [
        "life-admin",
        "finance",
        "documents",
        "housing",
        "admin",
        "bills",
        "subscriptions",
        "financial",
        "accounts",
    ],
    "grimoire": [
        "grimoire",
        "grimoire_modes",
        "grimoire_daily_logs",
        "corruption",
        "reversion",
        "throne",
        "symbol-to-action",
        "ritual",
        "mythic",
    ],
}

IMPORTANT_TABLE_PATTERNS = [
    r"create\s+table\s+(?:if\s+not\s+exists\s+)?public\.([a-zA-Z0-9_]+)",
    r"export\s+type\s+([A-Za-z0-9_]+Row)",
    r"export\s+async\s+function\s+(list[A-Za-z0-9_]+|get[A-Za-z0-9_]+)",
]

def rel(p: Path) -> str:
    try:
        return str(p.relative_to(ROOT))
    except Exception:
        return str(p)

def write(name: str, content: str) -> None:
    p = OUT / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content, encoding="utf-8", errors="replace")

def run_cmd(cmd: list[str], timeout: int = 120) -> str:
    try:
        r = subprocess.run(
            cmd,
            cwd=ROOT,
            text=True,
            capture_output=True,
            timeout=timeout,
        )
        return (
            f"$ {' '.join(cmd)}\n"
            f"EXIT_CODE={r.returncode}\n\n"
            f"--- STDOUT ---\n{r.stdout}\n\n"
            f"--- STDERR ---\n{r.stderr}\n"
        )
    except FileNotFoundError as e:
        return f"$ {' '.join(cmd)}\nERROR: command not found: {e}\n"
    except subprocess.TimeoutExpired as e:
        return f"$ {' '.join(cmd)}\nERROR: timeout after {timeout}s\nSTDOUT:\n{e.stdout}\nSTDERR:\n{e.stderr}\n"

def iter_files() -> Iterable[Path]:
    for base in SCAN_DIRS:
        b = ROOT / base
        if not b.exists():
            continue
        for dirpath, dirnames, filenames in os.walk(b):
            dirnames[:] = [d for d in dirnames if d not in IGNORE_DIR_NAMES]
            for fn in filenames:
                p = Path(dirpath) / fn
                if p.suffix in TEXT_EXTS:
                    yield p

def read_file(p: Path) -> str:
    try:
        return p.read_text(encoding="utf-8", errors="replace")
    except Exception as e:
        return f"<<READ_ERROR {e}>>"

def extract_docx_text(docx_path: Path) -> str:
    # No python-docx dependency needed. DOCX is a zip with word/document.xml.
    if not docx_path.exists():
        return ""
    try:
        with zipfile.ZipFile(docx_path) as z:
            names = [n for n in z.namelist() if n.startswith("word/") and n.endswith(".xml")]
            parts = []
            for n in names:
                if n in {
                    "word/document.xml",
                    "word/footnotes.xml",
                    "word/endnotes.xml",
                    "word/comments.xml",
                } or n.startswith("word/header") or n.startswith("word/footer"):
                    raw = z.read(n).decode("utf-8", errors="replace")
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
                    raw = re.sub(r"\n\s+", "\n", raw)
                    parts.append(f"\n\n===== {n} =====\n\n{raw}")
            return "\n".join(parts)
    except Exception as e:
        return f"<<DOCX_EXTRACT_ERROR {docx_path}: {e}>>"

def flatten_json(obj, prefix=""):
    rows = []
    if isinstance(obj, dict):
        for k, v in obj.items():
            path = f"{prefix}.{k}" if prefix else str(k)
            rows.append((path, type(v).__name__, "" if isinstance(v, (dict, list)) else str(v)[:500]))
            rows.extend(flatten_json(v, path))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            path = f"{prefix}[{i}]"
            rows.append((path, type(v).__name__, "" if isinstance(v, (dict, list)) else str(v)[:500]))
            rows.extend(flatten_json(v, path))
    return rows

def grep_lines(files: list[Path], terms: list[str], context_chars: int = 180) -> list[str]:
    out = []
    lower_terms = [t.lower() for t in terms]
    for p in files:
        txt = read_file(p)
        low = txt.lower()
        matched = False
        for term, lterm in zip(terms, lower_terms):
            idx = low.find(lterm)
            if idx >= 0:
                start = max(0, idx - context_chars)
                end = min(len(txt), idx + len(term) + context_chars)
                snippet = txt[start:end].replace("\n", "\\n")
                out.append(f"{rel(p)} :: TERM={term!r} :: ...{snippet}...")
                matched = True
        # avoid enormous duplicate per file? no, keep all first occurrences per term
    return out

def main() -> int:
    all_files = list(iter_files())

    # Basic repo state
    write("00_git_status.txt", run_cmd(["git", "status", "--short"]) + "\n" + run_cmd(["git", "log", "--oneline", "--decorate", "-40"]))
    write("01_npm_scripts.txt", run_cmd(["node", "-e", "const p=require('./package.json'); console.log(JSON.stringify(p.scripts,null,2))"]))
    write("02_tree.txt", run_cmd(["find", ".", "-maxdepth", "4", "-type", "f", "-not", "-path", "./node_modules/*", "-not", "-path", "./.git/*", "-not", "-path", "./.next/*"], timeout=120))

    # Source JSON
    source_json_path = next((p for p in SOURCE_JSON_CANDIDATES if p.exists()), None)
    if source_json_path:
        raw = read_file(source_json_path)
        write("source/FINAL_SYNCED_SOURCE_JSON_RAW.json", raw)
        try:
            data = json.loads(raw)
            flat = flatten_json(data)
            lines = ["path,type,value"]
            for path, typ, val in flat:
                val = val.replace("\n", " ").replace('"', '""')
                lines.append(f'"{path}","{typ}","{val}"')
            write("source/FINAL_SYNCED_SOURCE_JSON_FLAT.csv", "\n".join(lines))
            pretty = json.dumps(data, indent=2, ensure_ascii=False)
            # Extract likely roadmap/chunk lines by keyword from pretty JSON.
            roadmap_terms = [
                "chunk", "phase", "roadmap", "Voice", "Memory", "RAG", "Analytics",
                "Custom", "Privacy", "Carnos", "Text Chat", "chat_sessions",
                "chat_messages", "persona", "Internet", "Search", "Learning",
                "behavioral", "routines"
            ]
            snippets = []
            for term in roadmap_terms:
                for m in re.finditer(re.escape(term), pretty, flags=re.IGNORECASE):
                    start = max(0, m.start() - 500)
                    end = min(len(pretty), m.end() + 700)
                    snippets.append(f"\n--- TERM {term!r} ---\n{pretty[start:end]}")
                    if len([s for s in snippets if f"TERM {term!r}" in s]) >= 12:
                        break
            write("source/FINAL_SYNCED_SOURCE_JSON_KEY_SNIPPETS.txt", "\n".join(snippets))
        except Exception as e:
            write("source/FINAL_SYNCED_SOURCE_JSON_PARSE_ERROR.txt", str(e))
    else:
        write("source/MISSING_SOURCE_JSON.txt", "No FINAL_SYNCED source JSON found in expected repo paths.\n")

    # Source DOCX extraction
    source_docx_path = next((p for p in SOURCE_DOCX_CANDIDATES if p.exists()), None)
    if source_docx_path:
        docx_text = extract_docx_text(source_docx_path)
        write("source/FINAL_SYNCED_DOCX_EXTRACTED_TEXT.txt", docx_text)
        terms = [
            "Phase 1", "Phase 2", "Phase 3", "Phase 4", "Phase 5", "Phase 6", "Phase 7",
            "Phase 8", "Phase 9", "Phase 10", "Phase 11", "Phase 12", "Phase 13",
            "Phase 14", "Phase 15", "Phase 16", "Phase 17", "Phase 18", "Phase 19", "Phase 20",
            "Carnos", "Text Chat", "chat", "chat_sessions", "chat_messages",
            "persona", "persona_prompt", "voice", "memory", "RAG", "web search",
            "internet", "analytics", "experiments", "custom trackers", "privacy", "export",
            "behavioral", "routines", "routine_steps",
        ]
        snippets = []
        low = docx_text.lower()
        for term in terms:
            count = 0
            for m in re.finditer(re.escape(term.lower()), low):
                start = max(0, m.start() - 600)
                end = min(len(docx_text), m.end() + 900)
                snippets.append(f"\n--- TERM {term!r} ---\n{docx_text[start:end]}")
                count += 1
                if count >= 10:
                    break
        write("source/FINAL_SYNCED_DOCX_KEY_SNIPPETS.txt", "\n".join(snippets))
    else:
        write("source/MISSING_SOURCE_DOCX.txt", "No FINAL_SYNCED DOCX found in expected repo paths.\n")

    # Routes and APIs
    route_files = sorted((ROOT / "src/app").glob("**/page.tsx")) if (ROOT / "src/app").exists() else []
    api_files = sorted((ROOT / "src/app/api").glob("**/route.ts")) if (ROOT / "src/app/api").exists() else []
    write("repo/routes_pages.txt", "\n".join(rel(p) for p in route_files))
    write("repo/api_routes.txt", "\n".join(rel(p) for p in api_files))

    # Migrations and tables
    migs = sorted((ROOT / "supabase/migrations").glob("*.sql")) if (ROOT / "supabase/migrations").exists() else []
    migration_report = []
    all_migration_text = ""
    for m in migs:
        txt = read_file(m)
        all_migration_text += f"\n\n===== {rel(m)} =====\n\n{txt}"
        tables = re.findall(r"create\s+table\s+(?:if\s+not\s+exists\s+)?public\.([a-zA-Z0-9_]+)", txt, flags=re.IGNORECASE)
        rls = re.findall(r"alter\s+table\s+public\.([a-zA-Z0-9_]+)\s+enable\s+row\s+level\s+security", txt, flags=re.IGNORECASE)
        policies = re.findall(r"create\s+policy\s+([a-zA-Z0-9_\" ]+)", txt, flags=re.IGNORECASE)
        migration_report.append(f"{rel(m)}\n  tables: {', '.join(tables) or '-'}\n  rls: {', '.join(rls) or '-'}\n  policies: {len(policies)}")
    write("repo/migrations_tables_rls.txt", "\n\n".join(migration_report))
    write("repo/all_migrations_combined.sql", all_migration_text)

    # Types, repositories, dashboard components
    type_files = sorted((ROOT / "src/types").glob("**/*")) if (ROOT / "src/types").exists() else []
    repo_files = sorted((ROOT / "src/lib/repositories").glob("**/*")) if (ROOT / "src/lib/repositories").exists() else []
    dashboard_files = sorted((ROOT / "src/components/dashboard").glob("**/*")) if (ROOT / "src/components/dashboard").exists() else []
    action_files = sorted((ROOT / "src/lib/actions").glob("**/*")) if (ROOT / "src/lib/actions").exists() else []
    lib_dashboard_files = sorted((ROOT / "src/lib/dashboard").glob("**/*")) if (ROOT / "src/lib/dashboard").exists() else []

    code_key_files = [p for p in type_files + repo_files + dashboard_files + action_files + lib_dashboard_files + route_files + api_files if p.is_file() and p.suffix in TEXT_EXTS]
    write("repo/key_code_files.txt", "\n".join(rel(p) for p in code_key_files))

    # Extract table/type/helper names
    combined_code = "\n\n".join(f"===== {rel(p)} =====\n{read_file(p)}" for p in code_key_files)
    markers = []
    for pat in IMPORTANT_TABLE_PATTERNS:
        for m in re.finditer(pat, combined_code, flags=re.IGNORECASE):
            markers.append(m.group(0))
    write("repo/extracted_code_markers.txt", "\n".join(sorted(set(markers))))

    # Feature grep evidence
    for group, terms in FEATURE_GROUPS.items():
        hits = grep_lines(all_files, terms)
        write(f"features/{group}.txt", "\n".join(hits) if hits else "NO HITS\n")

    # High-risk direct writes / AI / timers evidence
    risk_terms = [
        ".insert(",
        ".update(",
        ".delete(",
        ".upsert(",
        ".rpc(",
        "createSupabaseBrowserClient",
        "openai",
        "OpenAI",
        "generateText",
        "streamText",
        "fetch(",
        "setInterval(",
        "setTimeout(",
        "navigator.mediaDevices",
        "MediaRecorder",
        "localStorage",
    ]
    write("repo/risk_marker_hits.txt", "\n".join(grep_lines(all_files, risk_terms)) or "NO HITS\n")

    # Phase docs and reports
    docs = sorted((ROOT / "docs").glob("**/*")) if (ROOT / "docs").exists() else []
    phase_docs = [p for p in docs if p.is_file() and p.suffix.lower() in {".md", ".txt", ".json"} and re.search(r"phase|audit|report|roadmap|source|scope", p.name, re.I)]
    write("repo/phase_docs_list.txt", "\n".join(rel(p) for p in phase_docs))
    phase_doc_snippets = []
    for p in phase_docs:
        txt = read_file(p)
        first = "\n".join(txt.splitlines()[:80])
        phase_doc_snippets.append(f"\n\n===== {rel(p)} =====\n{first}")
    write("repo/phase_docs_first_80_lines.txt", "\n".join(phase_doc_snippets))

    # npm checks: do not run full npm run check here to avoid huge time, but capture script names and optional known audits individually if present.
    package_json = ROOT / "package.json"
    if package_json.exists():
        try:
            pkg = json.loads(read_file(package_json))
            scripts = pkg.get("scripts", {})
            audit_names = [k for k in scripts if "audit" in k or "validate" in k]
            write("repo/audit_script_names.txt", "\n".join(audit_names))
        except Exception as e:
            write("repo/audit_script_names_error.txt", str(e))

    # Summary markdown
    summary = f"""# Source Scope Snapshot

Generated: {datetime.now().isoformat(timespec="seconds")}
Repo: {ROOT}

## Source files found

- JSON: {rel(source_json_path) if source_json_path else "MISSING"}
- DOCX: {rel(source_docx_path) if source_docx_path else "MISSING"}

## Counts

- Scanned text files: {len(all_files)}
- App page routes: {len(route_files)}
- API routes: {len(api_files)}
- SQL migrations: {len(migs)}
- Key code files: {len(code_key_files)}
- Phase/audit docs: {len(phase_docs)}

## Read these files first

1. `source/FINAL_SYNCED_SOURCE_JSON_KEY_SNIPPETS.txt`
2. `source/FINAL_SYNCED_DOCX_KEY_SNIPPETS.txt`
3. `repo/migrations_tables_rls.txt`
4. `repo/routes_pages.txt`
5. `repo/api_routes.txt`
6. `repo/key_code_files.txt`
7. `features/carnos_chat_text_input.txt`
8. `features/carnos_persona_personality.txt`
9. `features/voice.txt`
10. `features/memory_rag.txt`
11. `repo/risk_marker_hits.txt`

## Purpose

This snapshot is evidence only. It does not modify product code.
Use it to compare the FINAL_SYNCED DOCX/JSON source scope against what the repo actually contains.
"""
    write("README_SNAPSHOT.md", summary)

    # Zip snapshot
    zip_path = OUT.with_suffix(".zip")
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as z:
        for p in OUT.rglob("*"):
            if p.is_file():
                z.write(p, p.relative_to(OUT.parent))

    print("\n=== SOURCE SCOPE SNAPSHOT COMPLETE ===")
    print(f"Snapshot folder: {rel(OUT)}")
    print(f"Snapshot zip:    {rel(zip_path)}")
    print("\nPaste these first:")
    print(f"cat {rel(OUT / 'README_SNAPSHOT.md')}")
    print(f"cat {rel(OUT / 'source/FINAL_SYNCED_SOURCE_JSON_KEY_SNIPPETS.txt')}")
    print(f"cat {rel(OUT / 'source/FINAL_SYNCED_DOCX_KEY_SNIPPETS.txt')}")
    print(f"cat {rel(OUT / 'features/carnos_chat_text_input.txt')}")
    print(f"cat {rel(OUT / 'features/carnos_persona_personality.txt')}")
    print(f"cat {rel(OUT / 'repo/migrations_tables_rls.txt')}")
    print(f"cat {rel(OUT / 'repo/api_routes.txt')}")
    print("\nOr upload the zip file above.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
