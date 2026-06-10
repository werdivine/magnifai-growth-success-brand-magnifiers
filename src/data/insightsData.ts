export type InsightBrief = {
    id: string;
    title: string;
    date: string;
    snippet: string;
    category: string;
};

export const INSIGHT_BRIEFS: InsightBrief[] = [
    {
        id: 'b1',
        title: 'OpenAI Releases "Strawberry" Reasoning Models',
        date: 'Jan 14, 2026',
        snippet: 'A complete shift in LLM performance for logical reasoning and coding tasks.',
        category: 'Industry News'
    },
    {
        id: 'b2',
        title: 'Nvidia H300 Benchmarks Leak',
        date: 'Jan 13, 2026',
        snippet: 'Training costs set to drop by another 40%, favoring small-scale GPU clusters.',
        category: 'Hardware'
    },
    {
        id: 'b3',
        title: 'The Rise of "Privacy-First" Agentic Architectures',
        date: 'Jan 11, 2026',
        snippet: 'Why the enterprise is moving away from OpenAI API towards local Llama deployments.',
        category: 'Strategy'
    }
];
