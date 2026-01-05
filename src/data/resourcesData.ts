export type Resource = {
    id: string;
    title: string;
    description: string;
    image: string;
    type: 'Prompt' | 'Guide' | 'Tool' | 'Template';
    link: string;
};

export const RESOURCES: Resource[] = [
    {
        id: 'r1',
        title: 'Strategic Planning Agent',
        description: 'McKinsey-level quarterly planning prompt for GPT-4 / Claude 3.5.',
        image: '/images/card-strategy.png', // Fallback for res-strategic
        type: 'Prompt',
        link: '/prompts/strategic-planning'
    },
    {
        id: 'r2',
        title: 'The "Zero-Inbox" Workflow',
        description: 'Automating email triage with Make.com and OpenAI.',
        image: '/images/card-zero-inbox.jpg', // Exists
        type: 'Guide',
        link: '/insights/zero-inbox'
    },
    {
        id: 'r3',
        title: 'ROI Calculator',
        description: 'Project your annual savings from AI automation.',
        image: '/images/card-roi-calculator.jpg', // Exists
        type: 'Tool',
        link: '/tools/roi'
    },
    {
        id: 'r4',
        title: 'Agency OS Notion Template',
        description: 'The master system for scaling an AI-first service business.',
        image: '/images/card-strategic-planning.jpg', // Fallback for res-notion
        type: 'Template',
        link: '/resources/agency-os'
    },
    {
        id: 'r5',
        title: 'Legal-Agent Deployment Kit',
        description: 'A pre-built framework for deploying legal research agents.',
        image: '/images/blog-automation.png', // Fallback for res-legal
        type: 'Tool',
        link: '/tools/legal-kit'
    }
];
