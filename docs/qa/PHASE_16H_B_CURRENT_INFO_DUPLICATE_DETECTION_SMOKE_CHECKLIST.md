# Phase 16H-B — Current-Info Duplicate Detection Smoke Checklist

## Required checks

- Duplicate detector file exists.
- Capture barrel exports duplicate detector.
- Duplicate detector supports no_duplicate_detected.
- Duplicate detector supports possible_duplicate_detected.
- Duplicate detector supports likely_duplicate_detected.
- Duplicate detector supports duplicate_detection_needs_review.
- Duplicate detector checks normalized_url_match.
- Duplicate detector checks title_match.
- Duplicate detector checks publisher_match.
- Duplicate detector checks citation_label_match.
- Duplicate detector keeps user review required.
- Duplicate detector keeps automatic merge disabled.
- Duplicate detector keeps source persistence disabled.
- Duplicate detector keeps autosave disabled.
- Duplicate detector keeps automatic memory conversion disabled.
- No external retrieval is added.
- No SQL reads or writes are added.
- npm run audit:phase16h_b passes.
- npm run check passes.
