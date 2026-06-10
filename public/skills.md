# WeMagnifAI Integration Capabilities

This document describes the public integrations, tools, and actions available on the WeMagnifAI platform for AI agents (Cursor, Claude Code, etc.) to interact with our systems.

## 1. Dynamic Calculators
- **ROI Calculator:** `/api/roi-calculator` - Computes B2B ROI based on ad spend, conversion rates, and contract value.
- **AI Quiz Tool:** `/api/ai-quiz` - Evaluates lead readiness for agentic automation workflows.

## 2. Lead Intake Service
- **Submit Lead:** `POST /api/lead` - Registers inbound marketing leads into our global campaign manager.
  - **Inputs:** `name` (string), `email` (string), `company` (string), `payload` (JSON).

## 3. Blog Content Feed
- **Insights Endpoint:** `/api/blog` - Pulls recent generated marketing insights in raw JSON format.
