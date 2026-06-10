export type PageContent = {
    title: string;
    subtitle: string;
    content: string; // HTML or Markdown-like string
};

export const FOOTER_PAGES: Record<string, PageContent> = {
    // --- COMPANY ---
    'about': {
        title: 'About WeMagnifAI',
        subtitle: 'Magnifying Growth through Artificial Intelligence',
        content: `
            <p>WeMagnifAI is a next-generation growth engine designed for the AI era. We believe that the future of business belongs to those who can effectively leverage artificial intelligence to magnify their output, creativity, and strategic impact.</p>
            <h3>Our Mission</h3>
            <p>To democratize access to enterprise-grade AI strategies, making them accessible, actionable, and profitable for SMBs and ambitious entrepreneurs.</p>
            <h3>The Team</h3>
            <p>We are a collective of AI architects, growth hackers, and creative technologists based in San Francisco. We don't just build tools; we build ecosystems for success.</p>
        `
    },
    'careers': {
        title: 'Join the Vortex',
        subtitle: 'Build the future of AI Growth',
        content: `
            <p>We are always looking for exceptional talent to join our mission. If you are obsessed with LLMs, React Server Components, or Growth Engineering, we want to hear from you.</p>
            <h3>Open Positions</h3>
            <ul>
                <li><strong>Senior Full Stack Engineer (Next.js/AI)</strong> - Remote / SF</li>
                <li><strong>Growth Marketing Lead</strong> - Remote</li>
                <li><strong>AI Prompt Engineer</strong> - Contract</li>
            </ul>
            <p>Send your portfolio and GitHub to careers@wemagnifai.com</p>
        `
    },
    'contact': {
        title: 'Contact Us',
        subtitle: 'Let\'s start a conversation',
        content: `
            <p>Have a question about our agency services, tools, or partnership opportunities?</p>
            <h3>Get in Touch</h3>
            <p><strong>Email:</strong> hello@wemagnifai.com</p>
            <p><strong>Twitter:</strong> @WeMagnifAI</p>
            <p><strong>Office:</strong> 548 Market St, San Francisco, CA 94104</p>
        `
    },

    // --- SERVICES ---
    'agency': {
        title: 'AI Growth Agency',
        subtitle: 'Done-For-You AI Implementation',
        content: `
            <p>Stop guessing and start dominating. Our agency division provides bespoke AI implementation services for high-growth companies.</p>
            <h3>Our Services</h3>
            <ul>
                <li><strong>AI Workflow Automation:</strong> We replace manual drudgery with autonomous agents.</li>
                <li><strong>Custom LLM Integration:</strong> Fine-tuned models trained on your proprietary data.</li>
                <li><strong>Growth Infrastructure:</strong> scalable marketing stacks built on Next.js and Supabase.</li>
            </ul>
        `
    },
    'consulting': {
        title: 'Strategic Consulting',
        subtitle: 'Expert Guidance for the AI Transformation',
        content: `
            <p>Navigating the AI landscape is overwhelming. We provide clarity.</p>
            <p>Our consulting packages are designed for C-Suite executives and Founders who need to make high-stakes technology decisions. We audit your current stack, identify high-leverage AI opportunities, and provide a roadmap for implementation.</p>
        `
    },
    'automation': {
        title: 'Workflow Automation',
        subtitle: 'Reclaim 20+ Hours Per Week',
        content: `
            <p>Time is your most valuable asset. We build "Invisible Machines" that run your business in the background.</p>
            <p>Using tools like Make.com, n8n, and custom Python scripts, we automate:</p>
            <ul>
                <li>Lead Qualification & Outreach</li>
                <li>Content Distribution</li>
                <li>Customer Onboarding</li>
                <li>Financial Reporting</li>
            </ul>
        `
    },
    'design': {
        title: 'Creative & Design',
        subtitle: 'World-Class Aesthetics for AI Brands',
        content: `
            <p>In a world of generated content, design is your differentiator. We craft premium, human-centric design systems that stand out.</p>
            <p>From 3D web experiences (Three.js/R3F) to brand identity systems, we ensure your visual presence matches your technological ambition.</p>
        `
    },

    // --- LEGAL ---
    'privacy': {
        title: 'Privacy Policy',
        subtitle: 'Last Updated: January 1, 2026',
        content: `
            <p>Your privacy is important to us. This policy outlines how WeMagnifAI collects, uses, and protects your data.</p>
            <h3>Data Collection</h3>
            <p>We collect basic analytics data to improve our services. We do not sell your personal data to third parties.</p>
            <h3>AI Logic</h3>
            <p>Data submitted to our AI tools is processed via secure APIs (OpenAI/Anthropic). We do not use user data to train our foundational models without explicit consent.</p>
        `
    },
    'terms': {
        title: 'Terms of Service',
        subtitle: 'The Rules of the Game',
        content: `
            <p>By using WeMagnifAI, you agree to these terms.</p>
            <h3>Usage</h3>
            <p>Our tools are for lawful purposes only. You may not use our agents to generate spam, malware, or harmful content.</p>
            <h3>Liability</h3>
            <p>WeMagnifAI provides tools "as is". We are not liable for business decisions made based on AI output. Always verify critical information.</p>
        `
    },
    'cookies': {
        title: 'Cookie Policy',
        subtitle: 'How we use browser storage',
        content: `
            <p>We use cookies to maintain your login session and preferences. We use minimal tracking cookies for analytics (Vercel Analytics). You can disable cookies in your browser settings, but some features of the App may break.</p>
        `
    },
    'security': {
        title: 'Security',
        subtitle: 'Enterprise-Grade Protection',
        content: `
            <p>Security is built into our DNA.</p>
            <ul>
                <li><strong>Encryption:</strong> All data is encrypted at rest and in transit (TLS 1.3).</li>
                <li><strong>Auth:</strong> We use industry-standard authentication (Supabase/NextAuth).</li>
                <li><strong>Compliance:</strong> We adhere to GDPR and CCPA best practices.</li>
            </ul>
            <p>To report a vulnerability, email security@wemagnifai.com</p>
        `
    }
};
