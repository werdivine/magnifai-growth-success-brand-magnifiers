# SEO Content Pipeline Workflow

**Description:** An end-to-end autonomous pipeline for generating high-quality, SEO-optimized blog posts that strictly adhere to brand guidelines.

## Prerequisites
- `MARKETING_CONTEXT.md` must be present in the workspace root and filled out.
- The `agency-seo-specialist` and `content-writer` skills must be available.

## Pipeline Steps

### 1. AEO Check & Sitemap Mapping
- **Action 1:** Verify the presence of `public/llms.txt`.
- **Action 2:** Check if it contains the correct codebase paths and mapping (`MARKETING_CONTEXT.md`, `AGENTS.md`, and insights route `/insights`).
- **Action 3:** Update or generate the `public/llms.txt` file if it is missing or out-of-date.

### 2. Research & Analysis (`agency-seo-specialist`)
**Trigger:** "Start the SEO content pipeline for the keyword: [Target Keyword]"
- **Action 1:** Perform a web search using the target keyword to identify the top 3 ranking articles.
- **Action 2:** Analyze the structure (H1, H2, H3 tags) and semantic keywords of those top-ranking articles.
- **Action 3:** Output a structural outline and a list of secondary keywords required to compete.

### 3. Drafting (`content-writer`)
- **Action 1:** Read the `MARKETING_CONTEXT.md` file to load the brand voice, negative constraints, and target persona.
- **Action 2:** Using the structural outline and secondary keywords from Step 2, draft the full article in Markdown.
- **Action 3:** Ensure formatting requirements (bolding, bullet points) from the context file are met. Do not use any words listed in the "Negative Constraints".

### 4. AI Writing Scrubber Audit (`content-writer`)
- **Action 1:** Search the draft for any banned AI keywords (*"delve", "unlock", "game-changing", "tapestry", "testament", "moreover", "demystify", "realm", "revolutionize", "beacon", "pinnacle"*). Remove and replace them with natural synonyms.
- **Action 2:** Validate "burstiness" by ensuring sentence lengths are varied (mix of short punchy sentences and medium explanatory ones).
- **Action 3:** Ensure paragraphs do not exceed 3 lines, and contractions (e.g., *it's, don't, we've*) are used naturally.
- **Action 4:** Verify that at least one real-world example or contrarian point is present to satisfy E-E-A-T.

### 5. Formatting & Schema Generation
- **Action 1:** Add a YAML frontmatter block to the Markdown file containing:
  - `title`: An optimized meta title (under 60 characters).
  - `description`: An optimized meta description (under 160 characters).
  - `target_keyword`: The primary keyword.
- **Action 2:** Generate a JSON-LD FAQ Schema or Article Schema block and append it to the bottom of the article.

### 6. SEO Audit (`agency-seo-specialist`)
- **Action 1:** Review the final drafted Markdown file.
- **Action 2:** Verify that the primary keyword appears in the H1, at least one H2, and the first paragraph.
- **Action 3:** If the audit fails, return to Step 3 for revision. If it passes, save the file to `src/content/blog/` (or the user-specified directory) and mark the pipeline complete.

