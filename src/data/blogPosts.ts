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
        id: '7',
        slug: 'agentic-workflows-2026',
        title: 'Agentic Workflows: Beyond Simple Prompting',
        excerpt: 'Why the chain-of-thought is being replaced by autonomous agent swarms in enterprise environments.',
        category: 'Architecture',
        author: 'Antigravity Alpha',
        date: 'Jan 15, 2026',
        image: '/images/card-agentic.png',
        content: `
            <p>In 2026, we no longer talk about "prompts." We talk about "agent protocols."</p>
            <h3>The Swarm Model</h3>
            <p>Enterprises are shifting from single-turn LLM calls to multi-agent swarms where specialized nodes handle research, execution, and validation autonomously.</p>
        `
    },
    {
        id: '8',
        slug: 'local-llm-privacy',
        title: 'The Sovereign Cloud: Running LLMs Locally',
        excerpt: 'How to deploy Llama 4 and Mistral Large on edge hardware for 100% data privacy and zero latency.',
        category: 'Cybersecurity',
        author: 'Sarah Jenkins',
        date: 'Jan 14, 2026',
        image: '/images/card-local-ai.png',
        content: `
            <p>Privacy is the next luxury good. For businesses handling PII, the public cloud is a vulnerability.</p>
        `
    },
    {
        id: '9',
        slug: 'ai-first-branding',
        title: 'Psychographics of AI-First Branding',
        excerpt: 'Why "Human-Made" is becoming a premium tag and how to blend AI efficiency with human soul.',
        category: 'Branding',
        author: 'Marcus Aurelius',
        date: 'Jan 13, 2026',
        image: '/images/card-branding-ai.png',
        content: `
            <p>The uncanny valley is closing. Branding must now pivot towards "Verified Biological Intent."</p>
        `
    },
    {
        id: '10',
        slug: 'token-economics-marketing',
        title: 'Token Economics: Funding Your Marketing via DAO',
        excerpt: 'A deep dive into how Web3 and AI are merging to create autonomous marketing budgets.',
        category: 'Finance',
        author: 'Jessica Wu',
        date: 'Jan 12, 2026',
        image: '/images/card-finance.png',
        content: `
            <p>Programmable money meets programmable marketing. The results are explosive.</p>
        `
    }
];
