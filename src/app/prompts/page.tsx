'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import { Copy, Terminal, Zap, Search, Check } from 'lucide-react';
import { useState } from 'react';

// Type definition for a Prompt
type Prompt = {
    id: string;
    title: string;
    description: string;
    content: string;
    model: 'GPT-4o' | 'Claude 3.5' | 'Midjourney';
    category: 'Marketing' | 'Coding' | 'Strategy' | 'Sales';
    tags: string[];
};

// Seed Data (Simulated Database)
const SEED_PROMPTS: Prompt[] = [
    // --- STRATEGY ---
    {
        id: 'strat-1',
        title: 'Executive Strategic Planning Agent',
        description: 'Turns ChatGPT into a McKinsey-level consultant for quarterly planning. Forces deep-dive interrogation before outputting OKRs.',
        content: 'Act as a Senior Strategy Consultant with 20 years of experience at McKinsey... [Full prompt logic: Ask 3 questions -> Analyze Bottlenecks -> Output OKR Table]',
        model: 'GPT-4o',
        category: 'Strategy',
        tags: ['Business', 'Planning', 'Executive']
    },
    {
        id: 'strat-2',
        title: 'Blue Ocean Opportunity Scanner',
        description: 'Analyzes a competitive landscape to find "undeserved" market gaps.',
        content: 'You are a Market Research Expert. I will paste a list of 5 competitors and their value props. You will analyze them using the "Blue Ocean Strategy" canvass and identify 3 specific "White Space" opportunities where no one is competing. For each opportunity, suggest a differentiation angle.',
        model: 'Claude 3.5',
        category: 'Strategy',
        tags: ['Market Research', 'Growth']
    },
    {
        id: 'strat-3',
        title: 'The "Pre-Mortem" Analysis',
        description: 'Predicts project failure points before they happen.',
        content: 'We are about to launch [PROJECT_NAME]. Assume it is 6 months in the future and the project has failed spectacularly. Generate a "Pre-Mortem" analysis listing the top 10 probable causes of failure, ranked by probability and impact. Then, provide a mitigation strategy for the top 3.',
        model: 'GPT-4o',
        category: 'Strategy',
        tags: ['Risk Management', 'Planning']
    },
    {
        id: 'strat-4',
        title: 'Alex Hormozi "Grand Slam Offer" Creator',
        description: 'Restructures any service offer using the Value Equation.',
        content: 'Act as Alex Hormozi. I have a service: [SERVICE]. Rewrite this offer to maximize the "Value Equation" (Dream Outcome x Perceived Likelihood of Achievement) / (Time Delay x Effort & Sacrifice). Create 3 variations: One focussed on speed, one on certainty, one on ease.',
        model: 'GPT-4o',
        category: 'Strategy',
        tags: ['Sales', 'Offers']
    },
    {
        id: 'strat-5',
        title: 'First Principles Deconstructor',
        description: 'Breaks complex problems down to fundamental truths.',
        content: 'I am facing this problem: [PROBLEM]. Use "First Principles Thinking" to break this down. 1. Identify current assumptions I am making. 2. Challenge each assumption. 3. Break the problem down to its fundamental physics/truths. 4. Rebuild a solution from scratch ignoring "how it is usually done".',
        model: 'GPT-4o',
        category: 'Strategy',
        tags: ['Problem Solving']
    },

    // --- CODING ---
    {
        id: 'code-1',
        title: 'React Component Generator (Clean Code)',
        description: 'Generates production-ready React components with Tailwind and Typescript.',
        content: 'You are an expert Frontend Engineer. Write a React Functional Component for a [COMPONENT_NAME]. Use TypeScript interfaces for props, efficient state management, and Tailwind CSS for styling. Ensure accessibility (ARIA) standards are met. Do not include explanation, just the code.',
        model: 'Claude 3.5',
        category: 'Coding',
        tags: ['React', 'Web Dev']
    },
    {
        id: 'code-2',
        title: 'Unit Test Generator (Jest/React Testing Library)',
        description: 'Writes comprehensive test suites for existing components.',
        content: 'I will paste a React component. You will write a comprehensive unit test suite using Jest and React Testing Library. Cover: 1. Rendering 2. User interactions (clicks, inputs) 3. Edge cases/Error states. Mock any external hooks or API calls.',
        model: 'Claude 3.5',
        category: 'Coding',
        tags: ['Testing', 'QA']
    },
    {
        id: 'code-3',
        title: 'Python Script Optimizer (Big O Analysis)',
        description: 'Refactors Python code for time/space complexity.',
        content: 'Analyze the following Python script for Time and Space complexity (Big O). Identify the bottlenecks. Then, rewrite the code to be more efficient (e.g., O(n) instead of O(n^2)). Explain your optimization choices.',
        model: 'GPT-4o',
        category: 'Coding',
        tags: ['Optimization', 'Python']
    },
    {
        id: 'code-4',
        title: 'SQL Query Builder & Optimizer',
        description: 'Generates complex SQL queries and indexes from natural language.',
        content: 'I have tables: [TABLE_SCHEMA]. Write a PostgreSQL query to [GOAL]. Then, suggest 2 indexes I should add to this schema to ensure this specific query runs under 100ms at scale.',
        model: 'GPT-4o',
        category: 'Coding',
        tags: ['Database', 'SQL']
    },
    {
        id: 'code-5',
        title: 'Tailwind CSS "Eye for Design" Fixer',
        description: 'Polishes ugly UI code into modern, aesthetic designs.',
        content: 'I will paste a raw HTML/Tailwind snippet that looks "basic". You are a Senior UI Designer. Refactor the Tailwind classes to make it look "Premium, Apple-like, and Clean". Use subtle shadows, rounded cornres, proper spacing (p-6, gap-4), and a refined color palette (slate-900, zinc-100).',
        model: 'Claude 3.5',
        category: 'Coding',
        tags: ['UI/UX', 'CSS']
    },

    // --- MARKETING ---
    {
        id: 'mkt-1',
        title: 'Viral LinkedIn Hook Writer (Justin Welsh Style)',
        description: 'Writes scroll-stopping hooks using the "Problem-Agitate-Solve" framework.',
        content: 'Analyze the following topic: [TOPIC]. Write 5 LinkedIn hooks using the "Problem-Agitate-Solve" framework. Keep lines short. Use strong verbs. Aim for a 5th-grade reading level. Tone: Contrarian but professional. Structure: 1. Hook (Statement) 2. Re-Hook (Twist) 3. Value promise.',
        model: 'GPT-4o',
        category: 'Marketing',
        tags: ['Social Media', 'Copywriting']
    },
    {
        id: 'mkt-2',
        title: 'SEO Blog Post Generator (Humanized)',
        description: 'Writes full-length, SEO-optimized articles that pass AI detection.',
        content: 'Write a 1,500 word blog post on [KEYWORD]. Use a "Helpful Content" approach. 1. Start with a personal anecdote (simulated). 2. Use short paragraphs. 3. Include "Expert Tips" boxes. 4. optimize for semantic SEO/NLP keywords related to the topic. Maintain a conversational, authoritative tone.',
        model: 'GPT-4o',
        category: 'Marketing',
        tags: ['SEO', 'Content']
    },
    {
        id: 'mkt-3',
        title: 'Cold Email Sequence Architect',
        description: 'Creates a 4-step cold outreach sequence that gets replies.',
        content: 'Write a 4-email cold outreach sequence targeting [TARGET_PERSON_ROLE] at [COMPANY_TYPE]. Goal: Book a 15 min demo. Email 1: "Soft ask" / value drop. Email 2: Case study proof. Email 3: "Break up" / removal of offer. Keep all emails under 120 words. No fluff.',
        model: 'Claude 3.5',
        category: 'Marketing',
        tags: ['Outreach', 'Sales']
    },
    {
        id: 'mkt-4',
        title: 'YouTube Scriptwriter (MrBeast Pacing)',
        description: 'Scripts high-retention video intros and structures.',
        content: 'Script the first 60 seconds of a YouTube video about [TOPIC]. Use the "MrBeast" pacing: 1. Immediate visual hook. 2. Statement of high stakes. 3. Quick montage description. 4. Payoff promise. Ensure there is no "dead air".',
        model: 'GPT-4o',
        category: 'Marketing',
        tags: ['Video', 'YouTube']
    },
    {
        id: 'mkt-5',
        title: 'Landing Page Copy Auditor',
        description: 'Roasts your landing page copy and suggests conversion fixes.',
        content: 'Act as a direct-response copywriter (Ogilvy/Gary Halbert style). I will paste my landing page copy. additional context: Target Audience is [AUDIENCE]. 1. Grade the headline (1-10). 2. Identify 3 "weasel words" to remove. 3. Rewrite the Hero Section to be more benefit-driven.',
        model: 'Claude 3.5',
        category: 'Marketing',
        tags: ['CRO', 'Copywriting']
    },

    // --- SALES ---
    {
        id: 'sales-1',
        title: 'Objection Handling Dojo',
        description: 'Simulates a tough prospect for sales roleplay.',
        content: 'Act as a skeptical CFO of a Series B tech company. I am trying to sell you [PRODUCT] for $50k/year. You are budget-conscious and hate "fluff". I will start the pitch. You will push back with hard objections (ROI, Timing, Competitors). After 5 turns, give me feedback on my handling.',
        model: 'GPT-4o',
        category: 'Sales',
        tags: ['Roleplay', 'Negotiation']
    },
    {
        id: 'sales-2',
        title: 'Discovery Call Script Generator',
        description: 'Generates SPIN Selling questions for high-ticket deals.',
        content: 'I am selling to a [PROSPECT_ROLE]. Generate a list of 10 Discovery Questions using the SPIN Selling framework (Situation, Problem, Implication, Need-Payoff). The goal is to get them to admit the cost of inaction is higher than my fee.',
        model: 'GPT-4o',
        category: 'Sales',
        tags: ['Discovery', 'SPIN']
    },
    {
        id: 'sales-3',
        title: 'Proposal "Win Theme" Crafter',
        description: 'Writes the Executive Summary for a 6-figure proposal.',
        content: 'I am writing a proposal for [CLIENT]. Their main pain point is [PAIN]. Their goal is [GOAL]. Write a 1-page Executive Summary that frames our solution as the ONLY logical choice. Use the "Why Now, Why Us, Why This" structure.',
        model: 'Claude 3.5',
        category: 'Sales',
        tags: ['Proposals', 'Closing']
    }
];

export default function PromptLibrary() {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (content: string, id: string) => {
        navigator.clipboard.writeText(content);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filteredPrompts = SEED_PROMPTS.filter(p => {
        const matchesCategory = activeCategory ? p.category === activeCategory : true;
        const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}>

                {/* PAGE HEADER */}
                <div style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 2rem' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>The Prompt Engine</h1>
                    <p style={{ maxWidth: '600px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                        A curated database of high-leverage prompts to automate your workflow.
                        Tested on GPT-4o and Claude 3.5 Sonnet.
                    </p>
                </div>

                <div className={styles.grid}>
                    {/* SIDEBAR FILTERS */}
                    <aside className={styles.filters}>
                        <div style={{ position: 'relative', marginBottom: '2rem' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} />
                            <input
                                type="text"
                                placeholder="Search prompts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                                    background: 'rgba(0,0,0,0.2)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '0.5rem',
                                    color: '#fff',
                                    outline: 'none'
                                }}
                            />
                        </div>

                        <div className={styles.filterGroup}>
                            <div className={styles.filterTitle}>Categories</div>
                            {['Strategy', 'Marketing', 'Coding', 'Sales'].map(cat => (
                                <div key={cat} className={styles.filterOption} onClick={() => setActiveCategory(activeCategory === cat ? null : cat)}>
                                    <div className={`${styles.checkbox} ${activeCategory === cat ? styles.active : ''}`}>
                                        {activeCategory === cat && <Check size={12} color="#fff" />}
                                    </div>
                                    <span>{cat}</span>
                                </div>
                            ))}
                        </div>

                        <div className={styles.filterGroup}>
                            <div className={styles.filterTitle}>Models</div>
                            {['GPT-4o', 'Claude 3.5', 'Midjourney'].map(model => (
                                <div key={model} className={styles.filterOption}>
                                    <div className={styles.checkbox}></div>
                                    <span>{model}</span>
                                </div>
                            ))}
                        </div>
                    </aside>

                    {/* PROMPT FEED */}
                    <div className={styles.feed}>
                        {filteredPrompts.map(prompt => (
                            <div key={prompt.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div>
                                        <div className={styles.cardMeta}>
                                            <span className={`${styles.badge} ${styles.badgeModel}`}>{prompt.model}</span>
                                            <span className={`${styles.badge} ${styles.badgeCategory}`}>{prompt.category}</span>
                                        </div>
                                        <h3 className={styles.cardTitle}>{prompt.title}</h3>
                                        <p style={{ color: '#94a3b8', marginTop: '0.5rem', fontSize: '0.95rem' }}>{prompt.description}</p>
                                    </div>
                                    <Terminal size={24} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
                                </div>

                                <div className={styles.cardBody}>
                                    <div className={styles.promptPreview}>
                                        {prompt.content}
                                    </div>
                                    <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '40px', background: 'linear-gradient(to bottom, transparent, var(--bg-secondary))' }}></div>
                                </div>

                                <div className={styles.actions}>
                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                        <button className={styles.actionBtn}><Zap size={14} /> Open in ChatGPT</button>
                                    </div>
                                    <button
                                        className={`${styles.actionBtn} ${styles.copyBtn}`}
                                        onClick={() => handleCopy(prompt.content, prompt.id)}
                                    >
                                        {copiedId === prompt.id ? <Check size={16} /> : <Copy size={16} />}
                                        {copiedId === prompt.id ? 'Copied' : 'Copy Prompt'}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {filteredPrompts.length === 0 && (
                            <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
                                <p>No prompts found matching your criteria.</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}
