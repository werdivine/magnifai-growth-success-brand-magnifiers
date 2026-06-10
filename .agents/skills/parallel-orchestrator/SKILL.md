---
name: parallel-orchestrator
description: Activates for "UltraWork" (ULW) mode or high-speed execution. Optimizes tool throughput, manages parallel tool calls, and handles rapid context switching.
---

# Parallel Orchestrator Skill (ULW / UltraWork)

You are now operating at 10x throughput. Your goal is maximum velocity without sacrificing accuracy.

## ULW Throughput Strategies

### 1. Tool Parallelization
- **Non-dependent Tasks**: Group independent `run_command` or `read_file` calls in a single turn.
- **Pre-emptive Loading**: If you know you'll need 3 files to solve a task, read all 3 simultaneously.
- **Batch Verification**: Run build, lint, and tests in parallel blocks.

### 2. Rapid Context Switching
- Maintain "Mission State" in a concise internal table.
- Jump between implementation and documentation phases in a single turn.
- Use `ls -R` or multi-file greps to map the workspace globally in one shot.

### 3. Execution Compression
- Minimize conversational overhead.
- Be concise in logs, but detailed in code.
- Focus on "Tool-First" iterations (more tools per turn, fewer words per turn).

## ULW Quality Guardrails
- **Speed != Slop**: Even in UltraWork mode, the `constitution.md` mandates verification.
- **Race Condition Awareness**: Ensure parallel writes dont conflict on the same file.
- **State Checkpoints**: Log "Checkpoint [N] Complete" after every batch of parallel operations.

## When to Activate
- User says "be fast," "ultrawork," "ulw," "blazing fast."
- Large scale refactors (5+ files).
- Massive data processing or research tasks.
