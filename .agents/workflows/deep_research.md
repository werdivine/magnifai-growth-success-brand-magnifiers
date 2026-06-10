---
description: Multi-source deep research protocol. Use this for comprehensive research on any topic with verification and structured output.
---

# Deep Research Workflow

A systematic research protocol that produces thoroughly verified, structured reports.

// turbo-all

## Step 1: Define the Research Scope
- Clarify the research question precisely.
- Define what's in/out of scope.
- Identify target audience for the output.
- Set depth level: Quick Scan (15 min) | Standard (30 min) | Deep Dive (60+ min).

## Step 2: Multi-Query Search
Execute 3-5 different search queries per sub-topic:
```
Query 1: Direct question
Query 2: Alternative phrasing
Query 3: Comparison query ("X vs Y")
Query 4: Expert/review query ("best X for Y 2026")
Query 5: Niche/specific query (forum/community discussion)
```

## Step 3: Source Deep-Dive
For each promising source:
1. Use `read_url_content` to extract full content.
2. Take structured notes: key claims, data points, methodology.
3. Rate source credibility (1-5): authority, recency, evidence quality.
4. Extract direct quotes for important claims.

## Step 4: Cross-Reference & Verify
- Mark claims as: ✅ Confirmed (2+ sources) | ⚠️ Single-source | ❓ Conflicting
- Resolve conflicts by checking primary sources.
- Note gaps where information is insufficient.

## Step 5: Synthesize & Report
Produce output in this structure:
```markdown
# [Research Topic]

## Executive Summary
[3-5 sentences: key finding, confidence level, recommended action]

## Key Findings
### 1. [Finding Title]
[Evidence, sources, confidence level]

## Comparative Analysis
[Table comparing options if applicable]

## Recommendations
[Prioritized, actionable steps]

## Methodology & Sources
[List of sources with credibility ratings]
```

## Quality Gate
Before delivering:
- [ ] Minimum 5 unique sources consulted
- [ ] All key claims verified by 2+ sources
- [ ] Conflicting information flagged with context
- [ ] Recommendations tied to specific evidence
- [ ] No fabricated or unverified URLs cited
