---
description: Self-improvement and reflexion workflow. Run after completing tasks to extract learnings and improve future performance.
---

# Self-Improvement Workflow

A structured reflexion loop that runs after task completion to extract learnings and persist them.

## Step 1: Task Retrospective
After completing any significant task, assess:
1. **Outcome**: Did it succeed on first attempt?
2. **Iterations**: How many fix-cycles were needed?
3. **Root causes**: What caused any failures?
4. **Efficiency**: Was there a faster path I should have taken?
5. **User satisfaction**: Did the user provide any corrections?

## Step 2: Pattern Extraction
Look for patterns that are:
- **Reusable**: Will this problem type occur again?
- **Non-obvious**: Something I wouldn't know from general training.
- **Specific**: A concrete rule, not a vague principle.

### Pattern Categories
- **Build Fixes**: Error pattern → resolution mapping
- **Environment Quirks**: OS/tool-specific issues
- **User Preferences**: Style, conventions, preferred approaches
- **Framework Gotchas**: Undocumented behaviors or best practices
- **Tool Mastery**: Better ways to use available tools

## Step 3: Persist to AGENTS.md
If a reusable pattern was identified, append to `AGENTS.md`:

```markdown
## Learning: [YYYY-MM-DD] — [Category]
**Context**: [Brief description of the task]
**Problem**: [What was non-obvious]
**Solution**: [What worked]
**Rule**: [One-line rule for future reference]
```

## Step 4: Skill Refinement
If a learning reveals a gap in an existing skill:
1. Open the relevant `SKILL.md` file.
2. Add the learning under the appropriate section.
3. Mark as `[Updated: YYYY-MM-DD]`.

## Quality Gates
- Only persist learnings that are genuinely reusable (not one-off fixes).
- Keep entries concise (3-5 lines max per learning).
- Prune `AGENTS.md` periodically — remove outdated or redundant entries.
- Never persist sensitive data (API keys, passwords, personal info).
