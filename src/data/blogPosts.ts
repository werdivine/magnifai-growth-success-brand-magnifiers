export type BlogPost = {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    category: string;
    author: string;
    date: string;
    image: string; // Path to image
};

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'future-of-ai-agencies',
        title: 'The Future of AI Agencies: Why Niche is the New Scale',
        excerpt: 'In 2026, the generalist agency is dead. Here’s why vertical AI integration is the only path forward for service businesses.',
        category: 'Strategy',
        author: 'Alex Chen',
        date: 'Jan 12, 2026',
        image: '/images/card-strategy.png',
        content: `
            <p>The landscape of digital service agencies is undergoing a tectonic shift...</p>
            <h3>The Vertical Integration Thesis</h3>
            <p>Agents that can handle specific vertical tasks (Legal, HR, Medical) are outperforming generalist LLMs...</p>
            <h3>What This Means for You</h3>
            <p>If you run an agency, you need to pick a niche and build proprietary tooling...</p>
        `
    },
    {
        id: '2',
        slug: 'react-server-components-ai',
        title: 'Building AI Interfaces with React Server Components',
        excerpt: 'How to leverage RSCs for streaming generative UI and reducing hydration errors in Next.js 15+ applications.',
        category: 'Engineering',
        author: 'Sarah Jenkins',
        date: 'Jan 10, 2026',
        image: '/images/card-react.png',
        content: `
            <p>Streaming UI is the UX paradigm of the AI era. Users expect instant feedback...</p>
        `
    },
    {
        id: '3',
        slug: 'viral-loops-automation',
        title: 'Automating Viral Loops: A Case Study',
        excerpt: 'How we used n8n and GPT-5 to generate 100k unique landing pages and drive organic traffic.',
        category: 'Growth',
        author: 'Mike Ross',
        date: 'Jan 08, 2026',
        image: '/images/card-viral.png',
        content: `
            <p>Programmatic SEO is not new, but AI has made it indistinguishable from human-written production...</p>
        `
    },
    {
        id: '4',
        slug: 'email-infrastructure',
        title: 'Zero-Inbox Infrastructure for Founders',
        excerpt: 'Stop checking email. Build an AI clearinghouse that categorizes, drafts, and archives for you.',
        category: 'Productivity',
        author: 'Alex Chen',
        date: 'Jan 05, 2026',
        image: '/images/card-viral.png',
        content: `
            <p>Email is the biggest time-sink for modern founders...</p>
        `
    },
    {
        id: '5',
        slug: 'saas-pricing-psychology',
        title: 'AI-Driven Dynamic Pricing Models',
        excerpt: 'Using reinforcement learning to optimize SaaS pricing tiers in real-time based on user behavior.',
        category: 'Sales',
        author: 'Jessica Wu',
        date: 'Jan 02, 2026',
        image: '/images/card-strategy.png',
        content: `
            <p>Fixed pricing is leaving money on the table...</p>
        `
    },
    {
        id: '6',
        slug: 'hiring-autonomous-agents',
        title: 'Hiring Your First autonomous Employee',
        excerpt: 'A guide to onboarding, managing, and evaluating AI agents as part of your core team.',
        category: 'HR',
        author: 'Mike Ross',
        date: 'Dec 28, 2025',
        image: '/images/card-strategy.png',
        content: `
            <p>The workforce of tomorrow is hybrid: Humans + Agents...</p>
        `
    }
];
