# PRD: SEO, AEO, GEO Services Implementation for WeMagnifAI

**Date:** 2026-06-09  
**Author:** Kilo Autonomous Agent  
**Status:** Draft for Implementation  

---

## 1. EXECUTIVE SUMMARY

WeMagnifAI currently operates as an AI Marketing and Automation Agency but lacks dedicated, comprehensive service pages for SEO, AEO (Answer Engine Optimization), and GEO (Generative Engine Optimization). This PRD outlines the addition of:

- **3 Core Service Pages** (SEO, AEO, GEO) with full commercial messaging
- **3-5 Lead Magnet Landing Pages** for lead capture with high-converting patterns
- **Content Hub Expansion** for topical authority
- **Technical SEO/AEO Fixes** for AI crawler optimization

**Nothing will be removed from the existing website. All additions are new pages, sections, and enhancements.**

---

## 2. CURRENT STATE ANALYSIS

### 2.1 Existing Website Strengths
- Dark-mode glassmorphism design with premium aesthetic
- Active semantic density block for AI crawlers
- Telegram Growth Engine integration
- Interactive tools (ROICalculator, AIQuiz, AIROICalculator)
- Strong visual design with `Playfair Display` headings and `Inter` body
- Hybrid inline + CSS Modules styling pattern

### 2.2 Critical Gaps Identified
| Category | Current Status | Required Enhancement |
|----------|----------------|---------------------|
| SEO Service Page | `/services/seo` missing - "Content & SEO" in menu goes to `/services/marketing` | Dedicated SEO page with all 7 pillars |
| AEO Service Page | Not present | Full AEO service with prompt research, schema, monitoring |
| GEO Service Page | Not present | Generative Engine Optimization service |
| Schema Markup | Partial (Org + WebSite) | Add Service, FAQPage, OfferCatalog, HowTo |
| Lead Magnets | 1-2 basic checklists | 4-5 comprehensive lead magnets with landing pages |
| Sitemap | Only 53 URLs | Expand to 60+ pages |
| Pricing | No public pricing | Add enterprise pricing page |
| Open Graph | Missing entirely | Add OG tags to all pages |

---

## 3. SERVICE PAGE SPECIFICATIONS

### 3.1 SEO Service Page (`/services/seo`)

**Page Path:** `src/app/services/seo/page.tsx`

**Structure (8-Section Framework):**

```
1. Hero Section
   - H1: "Search Everywhere Optimization (SEO)"
   - Subheading: "Rank on Google, get cited in AI answers, dominate search across 25+ platforms"
   - CTA: "Get Free SEO Audit" → /services/seo/audit
   - Secondary CTA: "View Pricing" → /pricing

2. Benefits Block (3-column)
   - 4x Revenue Growth from organic traffic
   - 3.2x More AI Citations with structured content
   - <7 Days to First Wins with programmatic approach

3. Problem/Pain Points
   - "Your SEO is stuck in 2023" headline
   - 4 pain points: dropping rankings, AI ignoring you, traffic plateaus, wasted ad spend

4. Solution
   - 7-Pillar SEO Framework description
   - What's Included: Technical SEO, On-Page, Off-Page, Content Strategy, AEO, GEO, Analytics

5. Process Steps (Numbered)
   - Week 1-2: Technical Audit & Foundation
   - Week 3-4: Content Architecture
   - Month 2-3: Authority Building
   - Month 4+: Compounding Growth

6. Social Proof
   - 3 testimonial cards with measurable results
   - Named client logos (SaaS/Tech, Startups, E-commerce)

7. FAQ Section (6 Q&As)
   - FAQPage schema with structured questions

8. Final CTA
   - "Start Your SEO Engine" → /contact
```

**SEO Metadata:**
```tsx
export const metadata = {
  title: "SEO Services | Search Everywhere Optimization | WeMagnifAI",
  description: "7-Pillar SEO that works in 2026: Technical SEO, AI citation optimization, programmatic content, and generative engine optimization. Get cited by ChatGPT, Perplexity, Google AI Overviews.",
  alternates: { canonical: "https://wemagnifai.com/services/seo" }
}
```

---

### 3.2 AEO Service Page (`/services/aeo`)

**Page Path:** `src/app/services/aeo/page.tsx`

**Structure:**

```
1. Hero Section
   - H1: "Answer Engine Optimization (AEO)"
   - Subheading: "Get cited by ChatGPT, Perplexity, Google AI Overviews, and Claude"
   - CTA: "Get Free AEO Audit" → /tools/aeo-audit

2. Benefits Block
   - 37.5% average citation rate for optimized brands
   - 200+ prompts tracked per client
   - 4.1x brand mentions vs. non-optimized competitors

3. Problem/Pain Points
   - "Your brand isn't cited by AI" messaging
   - Users asking AI for recommendations get competitors instead

4. Solution
   - Prompt research for your industry
   - Competitor citation mapping
   - FAQ schema optimization
   - Featured snippet targeting
   - Voice search natural language formatting

5. Process (4 Steps)
   - Prompt Research & Mapping
   - Competitor Citation Analysis
   - Content Optimization
   - Monitoring & Iteration

6. Social Proof
   - Case study: "Brand X increased AI citations from 0 to 23 in 60 days"

7. Pricing Tiers (Preview)
   - Monitor & Maintain: $1,500/mo
   - Active Optimization: $3,500/mo
   - Full AEO + Content: $7,500/mo

8. FAQ + CTA
```

---

### 3.3 GEO Service Page (`/services/geo`)

**Page Path:** `src/app/services/geo/page.tsx`

**Structure:**

```
1. Hero Section
   - H1: "Generative Engine Optimization (GEO)"
   - Subheading: "Engineering relevance for Google's AI Overviews, ChatGPT, Perplexity, and Gemini"
   - CTA: "Get Free GEO Audit" → /tools/geo-audit

2. Benefits Block
   - 65% of B2B buyers use AI assistants for research
   - First-mover advantage in 2026 AI search
   - Brand safety with consistent citations

3. Problem/Pain
   - "AI gives vague answers about your industry because you're not optimized"

4. Solution
   - Passage-level semantic optimization
   - Self-contained extractable answers
   - Entity clarity signals
   - Structured comparison tables
   - Citation-worthy fact formatting

5. Process (5 Steps)
   - AI Visibility Audit
   - Entity Optimization
   - Content Structure Engineering
   - Authority Signal Building
   - Multi-Platform Monitoring

6. Social Proof
   - "Our clients appear in 4.2x more AI answers after GEO optimization"

7. FAQ + CTA
```

---

## 4. LEAD MAGNET LANDING PAGES

### 4.1 SEO Audit Checklist (`/lead-magnets/seo-audit-checklist`)

**Format:** Free downloadable PDF + inline tool

**Structure:**
```
Hero: "The Complete SEO Audit Checklist (34-Point)"
- Specific outcome: "Audit your site in 15 minutes"
- Above fold: Email field only
- Social proof: "2,400+ growth leaders have downloaded"
- Preview: Screenshot of page 1 of the checklist
- FAQ: "Is it free?", "What format?", "Will you spam me?"
```

**CTA:** "Download Checklist" → triggers email + PDF delivery

---

### 4.2 AEO Visibility Score (`/lead-magnets/aeo-visibility-score`)

**Format:** Interactive assessment tool

**Structure:**
```
Hero: "Your AI Citation Potential Score (0-100)"
- Form: URL + email
- Interactive scoring dashboard preview
- Results: AI visibility score + 5 prioritized fixes
- Secondary path: Free AI audit offer
```

---

### 4.3 GEO Quick Check (`/lead-magnets/geo-quick-check`)

**Format:** Embedded audit tool

**Structure:**
```
Hero: "Quick GEO Check: Are You Ready for AI Search?"
- 8-question quiz
- Score + personalized report
- Email capture for report delivery
```

---

### 4.4 Search Everywhere Audit (`/lead-magnets/search-everywhere-audit`)

**Format:** Comprehensive 10-section audit

**Structure:**
```
Hero: "Complete Search Everywhere Audit"
- Covers: Technical SEO, AEO, GEO, Local, Content, Authority, Schema
- Form: URL + email + company size
- Preview: Sample audit report page
- Process: Submit URL → we audit → PDF + call
```

---

### 4.5 AI Prompt Library (`/lead-magnets/ai-prompt-library`)

**Format:** Gated resource collection

**Structure:**
```
Hero: "100+ AI Prompts for B2B Growth"
- Curated prompts for ChatGPT, Claude, Perplexity
- Email capture
- Preview: Table of contents with prompt examples
```

---

## 5. CONTENT HUB EXPANSION

### 5.1 SEO Topic Cluster (`/resources/seo-guide`)

**Pillar Page:** "The Complete Guide to Search Everywhere Optimization 2026"

**Cluster Articles:**
- `/resources/seo-guide/technical-foundation`
- `/resources/seo-guide/aeography` 
- `/resources/seo-guide/entity-optimization`
- `/resources/seo-guide/structured-data`
- `/resources/seo-guide/ai-citation`

### 5.2 AEO/GEO Hub (`/resources/aeo-geo`)

**Pillar:** "AI Search Optimization: The Complete Playbook"

**Clusters:**
- `/resources/aeo-geo/platform-comparison`
- `/resources/aeo-geo/prompt-engineering`
- `/resources/aeo-geo/schema-strategy`
- `/resources/aeo-geo/competitor-mapping`

---

## 6. SCHEMA MARKUP PLAN

### 6.1 New Schema Types to Add

**File:** `src/lib/schema.ts`

Add functions for:
```typescript
export function generateServiceSchema(input: ServiceInput) { ... }
export function generateOfferCatalogSchema(pricingData) { ... }
export function generateReviewSchema(testimonials) { ... }
export function generateAggregateRatingSchema() { ... }
export function generateProductSchema(toolData) { ... } // for lead magnets
```

### 6.2 Service Page Schema Example

```json
{
  "@type": "Service",
  "serviceType": "Search Everywhere Optimization",
  "provider": { "@id": "https://wemagnifai.com/#organization" },
  "offers": [
    {
      "@type": "Offer",
      "name": "Monitor & Maintain",
      "price": 1500,
      "priceCurrency": "USD",
      "description": "Monthly AI visibility report, 25-50 prompts"
    }
  ]
}
```

---

## 7. TECHNICAL IMPLEMENTATION

### 7.1 Files to Create

| Path | Purpose |
|------|---------|
| `src/app/services/seo/page.tsx` | SEO service page |
| `src/app/services/aeo/page.tsx` | AEO service page |
| `src/app/services/geo/page.tsx` | GEO service page |
| `src/app/lead-magnets/seo-audit-checklist/page.tsx` | Lead magnet |
| `src/app/lead-magnets/aeo-visibility-score/page.tsx` | Lead magnet |
| `src/app/lead-magnets/geo-quick-check/page.tsx` | Lead magnet |
| `src/app/lead-magnets/search-everywhere-audit/page.tsx` | Lead magnet |
| `src/app/lead-magnets/ai-prompt-library/page.tsx` | Lead magnet |
| `src/app/pricing/page.tsx` | Pricing page |
| `src/content/services-data.ts` | Service page content |

### 7.2 Header Navigation Updates

Update `Header.tsx` mega-menu to add:
```
Solutions → Services:
  - Brand Strategy → /services/brand-strategy
  - Website Growth → /services/development
  - AI Automation → /services/ai-automation
  - Content & SEO → /services/seo (CHANGED)
  - AEO → /services/aeo (NEW)
  - GEO → /services/geo (NEW)
  - Conversion Systems → /services/creative
```

---

## 8. PRICING PAGE (/pricing)

### 8.1 Tier Structure (Productized)

| Package | Price | Target | Core Deliverables |
|---------|-------|--------|-------------------|
| **Starter** | $1,500/mo | Solo operators, 1-2 locations | Monthly visibility report, 25-50 prompts, baseline competitor share-of-voice |
| **Active** | $3,500/mo | Mid-market local, SMB | Everything above + schema audit + 1-2 content/mo |
| **Full Stack** | $7,500/mo | Mid-to-upper-mid-market | 100-300 prompts, competitor watch, 4-8 content/mo |
| **Enterprise** | $12,500+/mo | Multi-location, nationals | 500+ prompts, per-region sets, dedicated analyst |

### 8.2 Pricing Page Structure
- Comparison table with all 4 tiers
- FAQ section
- "Most Popular" badge on Active tier
- Process explanation
- Testimonials

---

## 9. IMPLEMENTATION PHASES

### Phase 1: Service Pages (Week 1)
- Create 3 service page components
- Add schema markup for services
- Update header navigation
- Add to sitemap

### Phase 2: Lead Magnets (Week 2)
- Create 5 lead magnet landing pages
- Build audit tool integrations
- Connect to `/api/lead` endpoint
- Add Service schema for each magnet

### Phase 3: Content Hub (Week 3)
- Create pillar + cluster pages
- Add HowTo and FAQPage schema
- Internal linking structure
- Update resources index

### Phase 4: Technical SEO (Week 4)
- Complete sitemap with all routes
- Add Open Graph metadata to all pages
- Update llms.txt with detailed content
- Add canonical URLs

---

## 10. SUCCESS METRICS

| Metric | Target | Measurement |
|--------|--------|-------------|
| AI Citation Rate | 30%+ | Test prompts on ChatGPT, Claude, Gemini, Perplexity |
| Lead Magnet Conversion | 25%+ | Landing page → email capture rate |
| Organic Traffic | +40% | Google Analytics organic sessions |
| Service Page Ranking | Top 10 | "SEO/AEO/GEO services" keywords |
| Sitemap Coverage | 60+ URLs | Google Search Console sitemap count |

---

## 11. APPENDICES

### A. Reference Sites Analyzed
- The Digital Intellect (seodi123.com)
- Added Marketing (addedmarketing.com)
- Mesa West Marketing (mesawestmarketing.com)
- ESEOspace (eseospace.com)

### B. Competitor Pricing Ranges
- AEO Engine: $1,597+/mo
- Generate More: $250/hr to $5,700/mo
- eSEOspace: $500-$3,000/mo
- OpenLens: $1,000-$25,000+/mo

### C. Conversion Benchmarks
- Lead Magnet CVR: 18-42%
- Free Audit Tools: 18-32%
- Quizzes: 35-55%
- Checklists: 24-42%