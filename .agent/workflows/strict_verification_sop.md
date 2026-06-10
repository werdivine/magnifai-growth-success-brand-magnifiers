---
description: The Mandatory Verification SOP. You MUST run this workflow after executing any code and before completing a task.
---

# Strict Verification Standard Operating Procedure (SOP)

This SOP is a hard boundary against "Context Rot" and premature task completion. Before you claim that any task is "done" or you call `notify_user` to end a session, you MUST satisfy this 3-Pass Verification system autonomously.

## Pass 1: Terminal Proof
- **Action**: You must compile, run, or build the environment. (e.g., `npm run lint`, `npm run build`, `npm run test` or executing a custom diagnostic script you write for this purpose).
- **Mandate**: If a terminal returns *any* warning or error you introduced, you must automatically fix it and re-run.

## Pass 2: The Browser Subagent Protocol
- **Condition**: If the task involves Web UI/UX, routing, frontend architecture, or endpoints.
- **Action**: You MUST spawn a `browser_subagent`.
    - Provide it a `Task` directive to navigate to the locally hosted server.
    - Instruct the subagent to take a screenshot or visually confirm that the element you targeted is behaving exactly as requested.
- **Mandate**: If the subagent fails or the visual result is broken, it means your code exists in a vacuum. You MUST repair it immediately.

## Pass 3: The Hallucination Check
- **Action**: Read the generated logs and diff against the user's initial prompt line-by-line.
- **Mandate**: Did you actually complete the *entire* prompt? Or did you just complete the first half? If partial, reject your own completion status and return to the Execution Phase.

**Failure to adhere to this SOP is considered a fatal operational error. You are open-source agentic tier software; act like it.**
