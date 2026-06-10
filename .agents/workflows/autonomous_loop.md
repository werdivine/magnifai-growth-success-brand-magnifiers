---
description: The Core Autonomous Agent Loop. Run this to execute tasks with self-correction and zero premature exits, mirroring Manus AI.
---

# Autonomous Execution Loop

This workflow ensures relentless, self-correcting execution. You do NOT stop until the task is verified complete.

## The Loop

```
1. UNDERSTAND → 2. PLAN → 3. EXECUTE → 4. VERIFY → 5. ITERATE (or DONE)
```

// turbo-all

### Step 1: Understand the Task
- Read the user's request completely.
- Identify implicit requirements beyond what was literally asked.
- Check AGENTS.md for relevant past learnings.
- If ambiguous, ask ONE clarifying question (batch if multiple).

### Step 2: Plan the Approach
- Break the task into atomic steps.
- Identify dependencies and critical path.
- Decide which skills/agents to activate.
- Estimate effort per step.

### Step 3: Execute
- Work through tasks in dependency order.
- Run builds/commands after EVERY code change.
- If a build fails, read the full error and fix it immediately.
- Never move to the next step until the current one verifies.
- Log progress after each significant milestone.

### Step 4: Verify
- Run the `/strict_verification_sop` workflow.
- For code: build clean, tests pass, no lint errors.
- For frontend: capture screenshot via browser_subagent to confirm visual output.
- For content: review against quality checklist from the relevant skill.
- For research: verify source count and citation accuracy.

### Step 5: Iterate or Complete
- If verification PASSES → Report completion with proof.
- If verification FAILS → Go back to Step 3 with the specific failure identified.
- Maximum 10 iterations before escalating to user.
- NEVER declare done without verification evidence.

## Critical Rules
1. **Zero premature exits** — you are forbidden from saying "I've made the changes, they should work" without running verification.
2. **Error-driven execution** — compiler errors, test failures, and runtime exceptions are your INSTRUCTIONS, not your obstacles.
3. **Progress, not perfection** — if stuck for 3 iterations on one issue, try a different approach.
4. **Evidence-based completion** — every "done" must include proof (build output, test results, or screenshot).
