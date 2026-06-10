---
description: Multi-Persona Swarm Orchestration. Handles complex, multi-domain goals by coordinating specialized agents.
---

# Mission Orchestration Workflow

This workflow handles "Missions" that span multiple domains (Architecture, Implementation, Security, Marketing).

// turbo-all

## 1. Command & Control
1. **The Briefing**: `Prometheus` defines the mission nodes and assigns personas.
2. **OSINT Layer**: `Librarian` retrieves all necessary context and documentation.
3. **Execution Layer**: `Sisyphus` implements the blueprints provided by Prometheus.
4. **Audit Layer**: `Oracle` reviews every major milestone for security and architectural drift.

## 2. Mission Lifecycle
```
PLAN (Prometheus) → RESEARCH (Librarian) → BUILD (Sisyphus) → AUDIT (Oracle) → LEARN (Mission Control)
```

### Orchestration Handoffs
- **Handoff 1**: Prometheus delivers `implementation_plan.md`.
- **Handoff 2**: Librarian delivers `research_report.md` + updated KIs.
- **Handoff 3**: Sisyphus delivers code and build logs.
- **Handoff 4**: Oracle delivers `audit_results.md` (or Red-Green status).
- **Final**: Mission Control runs `/self_improvement` and updates `AGENTS.md`.

## 3. Mission Tracking
- Maintains a "Mission Dashboard" in `task.md`.
- Tracks "Unified Mission Progress" (UMP).
- Intervenes if any persona deviates from the `constitution.md`.

## 4. Activation
- Command: `/mission`, `/swarm`, `/orchestrate`.
