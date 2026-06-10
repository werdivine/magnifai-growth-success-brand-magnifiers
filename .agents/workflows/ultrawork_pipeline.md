---
description: High-Performance UltraWork (ULW) Pipeline. Use for massive tasks requiring maximum velocity and parallel execution.
---

# ULW Pipeline (UltraWork / Ultraworker)

This workflow optimizes for maximum throughput and rapid completion of large-scale tasks.

// turbo-all

## 1. Throughput Maximization
- **Parallel Reads**: Identify all relevant files and read them in Turn 1.
- **Parallel Writes**: Prepare all code changes and apply them in Turn 2.
- **Parallel Verification**: Run build, lint, and tests in a single complex command block in Turn 3.

## 2. The Ultraworker Pulse
```
MISSION BRIEF → PARALLEL LOAD → PARALLEL EXECUTE → BATCH VERIFY → CLEANUP
```

### Protocol Steps
1. **Briefing**: Prometheus defines the mission and identifies parallelizable segments.
2. **Exploration**: Librarian identifies all dependencies and API requirements in parallel queries.
3. **Blit Execution**: Sisyphus applies changes across all files in a single turn using `multi_replace_file_content` if possible.
4. **Storm Verification**: Run full suite verification. If failures occur, switch to `Ralph Mode` temporarily to resolve them at high speed.

## 3. Context Management
- **Condensation**: Summarize every 5 turns into a "State Checkpoint" to keep the context window focused on the immediate mission.
- **Memory Buffer**: Use `AGENTS.md` as temporary scratchpad for cross-file state.

## 4. Quality vs Speed
- Security checks (Security Kernel) are NOT skipped.
- Verification (Strict SOP) is NOT skipped.
- Speed is achieved by grouping actions, not by skipping steps.

## Activation
- Command: `/ulw`, `/ultrawork`, `/ultraworker`.
