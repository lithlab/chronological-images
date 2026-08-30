---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint:
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the bundled guidelines in [references/guidelines.md](references/guidelines.md) (or fetch the latest from the source URL below)
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Fetch fresh guidelines before each review when network is available:

```
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md
```

A snapshot lives in `references/guidelines.md` for offline use.

## Usage

When a user provides a file or pattern argument:
1. Load guidelines (bundled snapshot, or fetch if online)
2. Read the specified files
3. Apply all rules from the guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
