---
description: The Mandatory Verification SOP. You MUST run this workflow after executing any code and before completing a task.
---

# Strict Verification Standard Operating Procedure

This is a MANDATORY post-execution checklist. No task is complete until every applicable check passes.

// turbo-all

## Verification Steps

### Step 1: Build Verification
Run the project's build command and verify clean output:
```powershell
npm run build
# OR
python -m py_compile <file>
# OR whatever the project's build system is
```
- **PASS**: Build exits with code 0, no errors.
- **FAIL**: Read EVERY error line. Fix the topmost error first (cascading errors often resolve).

### Step 2: Lint Check
```powershell
npm run lint
# OR equivalent
```
- Fix all errors. Warnings are acceptable only if pre-existing.

### Step 3: Type Check (if TypeScript)
```powershell
npx tsc --noEmit
```
- Zero type errors required.

### Step 4: Test Execution
```powershell
npm test
# OR
pytest
# OR equivalent
```
- All tests must pass. If tests don't exist for the changed code, note this in the completion report.

### Step 5: Runtime Verification
- Start the dev server: `npm run dev`
- For frontend changes: Use `browser_subagent` to navigate to the affected page.
- Take a screenshot to confirm visual correctness.
- Check browser console for errors.

### Step 6: Regression Check
- Verify that existing functionality still works.
- Check that styles/layouts haven't shifted on unrelated pages.
- Run the full test suite, not just the affected tests.

## Completion Report Format
```markdown
## Verification Results
- Build: ✅ PASS / ❌ FAIL
- Lint: ✅ PASS / ❌ FAIL
- Types: ✅ PASS / ❌ FAIL / ⬜ N/A
- Tests: ✅ PASS / ❌ FAIL / ⬜ N/A
- Runtime: ✅ PASS / ❌ FAIL
- Regression: ✅ PASS / ❌ FAIL
```

## Rules
- If ANY step FAILS, do NOT complete the task. Fix the issue and re-run verification.
- Skip steps that don't apply (e.g., no tests = skip Step 4, not a web project = skip Step 5).
- Evidence is mandatory: paste build output, test results, or embed screenshots.
