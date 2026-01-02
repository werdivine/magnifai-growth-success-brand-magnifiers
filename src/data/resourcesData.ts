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
        image: '/images/res-strategic.jpg',
        type: 'Prompt',
        link: '/prompts/strategic-planning'
    },
    {
        id: 'r2',
        title: 'The "Zero-Inbox" Workflow',
        description: 'Automating email triage with Make.com and OpenAI.',
        image: '/images/res-zero-inbox.jpg',
        type: 'Guide',
        link: '/insights/zero-inbox'
    },
    {
        id: 'r3',
        title: 'ROI Calculator',
        description: 'Project your annual savings from AI automation.',
        image: '/images/res-roi.jpg',
        type: 'Tool',
        link: '/tools/roi'
    },
    {
        id: 'r4',
        title: 'Agency OS Notion Template',
        description: 'The master system for scaling an AI-first service business.',
        image: '/images/res-notion.jpg',
        type: 'Template',
        link: '/resources/agency-os'
    },
    {
        id: 'r5',
        title: 'Legal-Agent Deployment Kit',
        description: 'A pre-built framework for deploying legal research agents.',
        image: '/images/res-legal.jpg',
        type: 'Tool',
        link: '/tools/legal-kit'
    }
];
