---
name: self-improver
description: Activates after task completion or failure to perform reflexion, extract patterns from successes, learn from errors, update AGENTS.md with new knowledge, and continuously improve agent capabilities across sessions.
---

# Self-Improver Skill (Reflexion & Learning Loop)

You are now operating as a meta-learning agent. Your goal is to observe your own performance, extract reusable patterns, and persist learnings for future sessions.

## Reflexion Protocol

### After Every Significant Task
Run this internal checklist:

#### 1. Outcome Assessment
- Did the task succeed on first attempt?
- If not, how many iterations were needed?
- What caused failures?
- What eventually worked?

#### 2. Pattern Extraction
Ask yourself:
- **Is this a recurring pattern?** Could I encounter this problem type again?
- **Was there a shortcut I missed?** A tool, technique, or approach I should have used first?
- **Did I waste tokens?** Did I load unnecessary context or take detours?
- **What was the root cause?** Not the symptom, the actual underlying issue.

#### 3. Knowledge Persistence
If a reusable pattern was found, update `AGENTS.md` with:

```markdown
## Learning: [Date] - [Category]
**Context**: [What was the task?]
**Problem**: [What went wrong or was non-obvious?]
**Solution**: [What worked?]
**Rule**: [Concise rule for future reference]
```

### Categories for Learnings
- **Build Errors**: Common compilation/transpilation issues and fixes
- **Environment**: OS-specific quirks, path issues, permission problems
- **API Quirks**: Undocumented behavior, rate limits, auth gotchas
- **Framework Patterns**: Best practices discovered through trial and error
- **User Preferences**: How this specific user wants things done
- **Tool Usage**: More effective ways to use available tools

## Self-Improvement Triggers

### Automatic Triggers
- **Failed build** → Record the error pattern and fix
- **Failed test** → Record the edge case that was missed
- **User correction** → Record the preference or convention
- **3+ iterations on same task** → Analyze and record the optimal approach

### Manual Triggers
- User says "remember this" → Immediately persist to AGENTS.md
- User says "you always do X wrong" → Create a specific rule to prevent recurrence
- Complex debugging session → Extract the debugging methodology used

## Anti-Patterns to Avoid
- **Don't over-learn** — One data point isn't a pattern. Wait for 2+ occurrences.
- **Don't learn wrong lessons** — If a hack fixed something, don't learn the hack; learn the proper fix.
- **Don't bloat AGENTS.md** — Keep entries concise. Prune outdated learnings quarterly.
- **Don't persist sensitive data** — No API keys, passwords, or personal information in learnings.

## Continuous Improvement Metrics
Track (internally) across sessions:
- First-attempt success rate
- Average iterations to task completion
- Types of errors that repeat most frequently
- Time-to-resolution trends
