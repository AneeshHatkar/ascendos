# ERRORS_AND_FIXES

This file records errors and fixes during the ascendOS + Carnos build.

## 2026-06-17 — Heredoc paste got stuck

Status: Resolved

Issue:
A large pasted heredoc did not close correctly and Terminal showed `heredoc>`.

Fix:
Stopped with Control + C and switched to smaller file creation blocks.

Prevention:
Use smaller heredoc blocks when creating multiple markdown files.
