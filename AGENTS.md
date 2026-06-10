# AGENTS.md — Persistent Project Memory

This file stores project-specific learnings, conventions, architecture decisions, and accumulated knowledge across sessions. The AI agent reads this at session start and updates it via the `/self_improvement` workflow.

---

## Project Profile
- **Name**: MagnifAI Growth Success Brand Magnifiers
- **Stack**: Next.js + TypeScript + CSS Modules
- **Framework**: App Router (Next.js 14+)
- **Styling**: CSS Modules with design tokens
- **Deployment**: TBD

## Coding Conventions
- Use TypeScript strict mode
- CSS Modules for component styling (`.module.css`)
- Functional components with hooks
- File naming: PascalCase for components, camelCase for utilities

## Architecture Decisions
- Next.js App Router for routing and layouts
- Server Components by default, Client Components only when needed
- CSS Modules over Tailwind for maximum control
- **Autonomous Data Layer**: Uses `src/data/blog.json` as a flat-file database populated by agentic research scripts.

---

## Autonomous Operations
### Content Pipeline Protocol (2-Hour Cycle)
1. **Research**: Scan `search_web` for keywords "AI tools", "Agentic News", "Enterprise Frameworks".
2. **Selection**: Extract top 3 high-signal items that align with "Growth & Scaling".
3. **Synthesis**: Generate long-form, expert-voice articles (6-8 min read) with SEO metadata.
4. **Validation**: Audit for "Standard AI" patterns and rewrite with human-style variance.
5. **Publish**: Atomically update `src/data/blog.json` and reset `lastUpdated` timestamp.

---

## Learnings Log
<!-- New learnings are appended below by the self-improvement workflow -->
<!-- Format: ## Learning: [YYYY-MM-DD] — [Category] -->

## Learning: 2026-04-20 — [Infrastructure]
- **Agentic Browser Mandate**: Per user requirement, all automated testing and research MUST use Vercel's `agent-browser` (Rust-based) instead of Chrome to conserve system resources. Chrome is considered too heavy for persistent agentic workflows on the Worker Node.

## Learning: 2026-05-05 — [Infrastructure]
- **Lightweight Browser Migration**: Successfully installed `agent-browser` (Vercel) as the primary lightweight automation driver to reduce system strain on the Worker Node. This replaces standard Chrome for routine tasks.
- **Forensic Restoration**: Recovered 102 conversation sessions using a Python-based SQLite reconstruction script after Node-based bindings failed.

## Learning: 2026-05-08 — [Orchestration]
**Context**: Stabilizing MagnifAI Orchestrator build.
**Problem**: Next.js 15.1.0 `revalidateTag` signature changed, and `InMemoryToolRegistry` was missing contract methods.
**Solution**: Updated API calls to single-argument, implemented `executeTool` in registry, and used relative imports for library stabilization.
**Rule**: Always verify `ToolRegistry` implementations against the latest `executeTool` interface and check Next.js 15.x API signatures.

## Learning: 2026-05-08 — [Orchestration Delegation]
**Context**: Fixing the "Empty Results" failure in the Multi-Agent Orchestrator.
**Problem**: The `SupervisorAgent` was failing to retrieve subtasks from the registry (returning `undefined`) and was using mock placeholders instead of invoking specialized agent classes.
**Solution**: Corrected the task lookup logic in `SupervisorAgent` to retrieve decomposed subtasks and implemented dynamic instantiation of `ResearchAgent`, `CodeAgent`, `AnalysisAgent`, and `WritingAgent`.
**Rule**: Ensure `SupervisorAgent` uses the `id` from the decomposition phase to link tasks in the registry, and always use specialized classes instead of mocks for production workflows.

## Learning: 2026-05-09 — [Infrastructure]
**Context**: Stabilizing MCP infrastructure (Genkit, OpenFang, GitHub, Hermes).
**Problem**: MCP servers lacked access to workspace `.env.local` and timed out during initialization due to slow startup (npx/docker).
**Solution**: Injected API keys into `mcp_config.json` env blocks, added `initializationTimeout: 60000`, and swapped `npx` for local binary paths.
**Rule**: Always explicitly inject required environment variables and increase initialization timeouts for MCP servers to prevent "context deadline exceeded" errors.

## Learning: 2026-05-22 — [Integration]
- **Context**: Importing advanced diagnostic and scraping tools from Vortex into the Main workspace.
- **Problem**: The Vortex tools (Website Audit, Lead Infiltrator, Campaign Commander) were built in Next.js 16.1.1, while the Main workspace is Next.js 15.1.0. Direct migration caused ESLint unescaped entity errors, missing Lucide imports, and required addition of dependencies like cheerio.
- **Solution**: 
  1. Added `"cheerio": "^1.1.2"` to the Main workspace's `package.json`.
  2. Cleaned ESLint warnings (escaped characters like single and double quotes) in the page components.
  3. Added the missing `Layers` icon import to `lucide-react` in the lead-finder page.
  4. Updated `Header.tsx` mega-menu dynamically to list the new routes.
  5. Successfully ran Next.js compilation, passing TypeScript check and building all 109 pages.
- **Rule**: When importing code across different Next.js projects, always run a production build (`next build`) to surface and clean React compilation warnings, ESLint rules, and missing type definitions or icon sets before verifying runtime status.

## Learning: 2026-05-23 — [Integration]
- **Context**: Setting up and authenticating the Telegram Growth Engine for WeMagnifAI.
- **Problem**: Interactive CLI prompts (like the Telegram login OTP code) require stdin input to be sent to background tasks, and dependencies must be fully installed via `npm install` before starting the engine.
- **Solution**: 
  1. Updated `config.json` with the correct `api_id`, `api_hash`, phone number, and OpenAI API key.
  2. Ran `npm install` in the background and waited for it to complete.
  3. Authenticated by launching `node core/bot_engine.js --auth` in the background and sending the OTP code followed by a newline `\n` to stdin.
  4. Launched the scheduler process (`node scheduler.js`) in the background to handle organic outreach and lead generation tasks.
- **Rule**: When running interactive Node.js processes in background tasks, monitor logs for prompt stability, send inputs using the stdin tool, and verify session generation before starting scheduler scripts.

## Learning: 2026-05-24 — [Telegram Console Integration]
- **Context**: Re-architecting the mock dashboard into a premium live-connected control console.
- **Problem**: 
  1. The GramJS search returns minimized Channel objects with undefined `participantsCount`, causing the engine's filter to skip discovered supergroups.
  2. Inside `scoreGroup`, the code looked for `participantsCount` but the object had its member count mapped to `members`, resulting in scoring errors.
  3. The Next.js dashboard defaulted to Demo/Sandbox mode, which led the user to believe the data was fabricated.
- **Solution**: 
  1. Updated `group_discovery.js` to only apply the member count filter if `participantsCount` is explicitly defined, and updated the group scorer to check `group.members || group.participantsCount || 0`.
  2. Created Next.js API endpoints `/api/telegram-logs` to parse log outputs from `engine.log`, `/api/telegram-action` to spawn background tasks asynchronously, and `/api/telegram-settings` to modify `config.json` directly from the web interface.
  3. Redesigned the dashboard in `src/app/telegram-dashboard/page.tsx` with Outfit/Inter typography, blurred glassmorphic dark-mode styling, and embedded live terminal logs and task trigger controls.
- **Rule**: Avoid mock data defaults in client-facing dashboards. Provide a clear live connection by default with asynchronous run actions and a real-time console log viewer to establish technical credibility and transparent operation.

## Learning: 2026-05-24 — [Telegram Lead Gen Stabilization]
- **Context**: Stabilizing Telegram Lead Scraper modules after data loss.
- **Problem**: 
  1. The `lead_scraper.js` filtered groups by `g.joined` but wrote the filtered array directly back to `groups_db.json`, causing all unjoined groups to be permanently deleted from the database.
  2. The scraped counter increment on groups was using `totalNew` (cumulative leads) instead of a per-group incremental count.
  3. `Api.channels.GetParticipants` in GramJS does not include the user `bio`/`about` field. With `lead_score_threshold: 5`, every lead without a bio failed to qualify, resulting in 0 scraped leads.
- **Solution**: 
  1. Refactored `lead_scraper.js` to preserve `allGroups` in the database write call.
  2. Fixed the group counter to increment by a per-group `groupNew` count instead of the cumulative `totalNew` sum.
  3. Lowered the `lead_score_threshold` in `config.json` to `3` to qualify users who have a valid Telegram username and profile photo, resulting in **249 new leads** successfully captured.
- **Rule**: Always keep the full list of groups when writing back to the database in downstream modules. Ensure score thresholds align with the properties returned by the query method (e.g., participants query lacks bio).

## Learning: 2026-05-24 — [Dependency Isolation & Clean Installation]
- **Context**: Installing missing packages (like `openai`) in a workspace containing mixed or nested npm/pnpm symlinks.
- **Problem**: 
  1. Running `npm install` inside the project folder crashed with a `TypeError: Invalid Version:` because npm encountered sub-dependencies in `node_modules` (e.g., optional dependencies of `@anthropic-ai/claude-agent-sdk` under `.pnpm`) that had empty/blank version properties.
  2. Permission blocks on Windows prevented renaming `node_modules` because other processes had active handles inside the directory.
- **Solution**: 
  1. Initialized a temporary npm folder in a clean location (`C:\Users\Administrator\.gemini\antigravity-ide\scratch\temp_npm`), ran `npm install openai` to get a clean download, then copied the package folders into the project's `node_modules`.
  2. Updated dependencies in the project's `package.json` manually.
  3. Ran `npm rebuild --ignore-scripts` to safely reconstruct all command symlinks (like `next`) inside `node_modules/.bin` without crashing on install hooks.
- **Rule**: If a package installation fails due to corrupt local dependency paths or peer version clashes, perform a clean install in an isolated temp directory, copy the required packages, update `package.json` manually, and run `npm rebuild --ignore-scripts` to restore binaries.

## Learning: 2026-05-26 — [Database & Recovery]
- **SQLite Chat History Indexing**: Cline/Roo Code stores session indices under multiple SQLite extension keys (e.g. `saoudrizwan.claude-dev.chat.ChatSessionStore.index`, `rooveterinaryinc.roo-cline.chat.ChatSessionStore.index`). Rebuilding only from `.pb` files leads to loss of historical tasks that contain `ui_messages.json` logs. A unified parser scanning both folders is required to preserve complete records.

## Learning: 2026-05-26 — [Telegram Automation & Intent Classification]
- **Conversation State Control**: When executing automated outreach sequences, DMs should not be sent blindly. A reply-handler must first query `client.getMessages` to verify if the prospect has replied. Classifying responses into objection states (`not_interested`, `busy`, `how_much`) ensures sequence interruption and prevents inbox spamming.
- **Fail-safe Outreach Templates**: Always implement a static fallback template engine that performs token substitution (e.g., `{First Name}`, `{Source Group}`) if LLM API calls fail or credentials are unconfigured. This avoids blocking campaign pipelines.



## Learning: 2026-05-27 — [Telegram Engine & Lead Integration]
- **Context**: Restoring missing IDE history, integrating Next.js website forms, and stabilizing the Telegram outreach engine.
- **Problem**: 
  1. The IDE UI was missing session history files since May 21st.
  2. Website lead forms (ROICalculator, AIQuiz, AIROICalculator) lacked live integration to persist captured leads.
  3. In `lead_scraper.js`, although `Api.users.GetFullUser` was called to fetch user bios, the scraper was mistakenly mapping the undefined `user.about` property back into the database, resulting in empty bio columns.
  4. In `dm_reply_handler.js`, a duplicate variable declaration (`contact`) caused syntax errors, and checking only the single last message caused race conditions that missed prospect replies.
- **Solution**:
  1. Ran a SQLite-to-JSON active session index rebuilder script to index the 49 active chat sessions since May 21st, restoring full UI visibility.
  2. Updated the `/api/lead` API route to write submissions to `src/data/website_leads.json`, and wired all calculators/quizzes to post lead data.
  3. Modified `lead_scraper.js` to correctly persist the fetched `bio` variable to `leads_db.json`.
  4. Fixed the syntax error in `dm_reply_handler.js` and modified it to retrieve and scan the entire recent message history for replies.
- **Rule**: When scraping Telegram profiles via GramJS, ensure variables fetched via `GetFullUser` are correctly referenced in the storage schema (i.e. use the local `bio` variable, not `user.about`). Always inspect full message history to prevent outbound automation from hiding inbound customer replies.

## Learning: 2026-05-27 — [Native Windows Hermes & Dynamic Routing]
- **Context**: Transitioning Hermes integration from WSL to native Windows and fixing 404 rendering bugs on dynamically generated articles.
- **Problem**: 
  1. WSL was configured unnecessarily for Hermes, which has first-class native Windows support.
  2. The `/insights` page linked generated articles to `/insights/[article.id]`, but there was no dynamic route handler inside the insights folder, causing 404s.
  3. Dynamically generated content uses Markdown format, while static articles use HTML, causing styling/markup issues when rendered through generic `dangerouslySetInnerHTML`.
- **Solution**:
  1. Updated the autoblog script to invoke the native Windows Hermes executable under `C:\Users\Administrator\hermes-agent\venv\Scripts\python.exe` directly using oneshot mode and `HERMES_HOME`.
  2. Created a dynamic router at `src/app/insights/[slug]/page.tsx` and its styled CSS module `BlogPost.module.css` to dynamically fetch and display dynamic and static articles.
  3. Implemented a custom lightweight Markdown-to-HTML parser (`convertMarkdownToHtml`) in `src/lib/blog.ts` to parse markdown elements to semantic tags cleanly.
- **Rule**: Always support dynamic parameters using promises in Next.js 15+ (`const { slug } = await params`). Ensure content generated via markdown prompts is parsed to semantic HTML tags instead of being rendered directly as raw strings.

## Learning: 2026-05-28 — [Marketing & SEO Workflows]
- **Context**: Setting up autonomous marketing and SEO content generation in the IDE based on Claude Code workflows.
- **Rule**: ALWAYS read `MARKETING_CONTEXT.md` when acting as a marketing or SEO agent (`content-writer`, `agency-seo-specialist`) to ensure strict adherence to brand voice, target personas, and negative constraints. Use the `.agents/workflows/seo_content_pipeline.md` pipeline to generate content.
