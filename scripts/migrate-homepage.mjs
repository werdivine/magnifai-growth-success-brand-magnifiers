/**
 * Prismic Content Migration Script (Simple Version)
 * 
 * This script creates a Homepage document in Prismic using the Document API.
 * 
 * Usage: 
 * 1. Set your write token: $env:PRISMIC_WRITE_TOKEN="your-token"
 * 2. Run: node scripts/migrate-homepage.mjs
 */

const repositoryName = 'wemagnifai-growth-seo-brand-marketing';
const writeToken = process.env.PRISMIC_WRITE_TOKEN;

if (!writeToken) {
    console.error('❌ Error: PRISMIC_WRITE_TOKEN environment variable is required');
    console.log('\nTo get your write token:');
    console.log('1. Go to https://wemagnifai-growth-seo-brand-marketing.prismic.io/settings/apps/');
    console.log('2. Click "Create App" (or open existing one)');
    console.log('3. Enable "Content API Write" permission');
    console.log('4. Copy the "Permanent access token"');
    console.log('5. Run: $env:PRISMIC_WRITE_TOKEN="your-token-here"');
    console.log('6. Then run this script again');
    process.exit(1);
}

// Homepage document content
const homepageDocument = {
    title: 'Homepage',
    type: 'homepage',
    lang: 'en-us',
    data: {
        meta_title: 'WeMagnifAI - The AI Growth Engine',
        meta_description: 'We build automated AI pipelines that target, nurture, and close your ideal clients.',
        slices: [
            // Hero
            {
                slice_type: 'hero',
                slice_label: null,
                primary: {
                    badge_text: 'v2.0.0 Now Live',
                    title: [{ type: 'heading1', text: 'The Growth Engine For Scaling Agencies', spans: [] }],
                    description: [{ type: 'paragraph', text: 'Stop relying on luck. We build automated AI pipelines that specifically target, nurture, and close your ideal clients. No fluff. Just code & revenue.', spans: [] }],
                    primary_cta_label: 'Start Growth Engine',
                    primary_cta_link: { link_type: 'Web', url: '/book' },
                    secondary_cta_label: 'View System Architecture',
                    secondary_cta_link: { link_type: 'Web', url: '/case-studies' },
                },
                items: []
            },
            // Stats Counter
            {
                slice_type: 'stats_counter',
                slice_label: null,
                primary: {},
                items: [
                    { number: '4x', label: 'Faster Execution' },
                    { number: '98%', label: 'Open Rates' },
                    { number: '24/7', label: 'AI Operation' },
                    { number: '< 7 Days', label: 'To Launch' },
                ]
            },
            // Trusted By
            {
                slice_type: 'trusted_by',
                slice_label: null,
                primary: { title: 'Trusted by Industry Leaders' },
                items: [
                    { company_name: 'TechCorp' },
                    { company_name: 'Innovate Inc' },
                    { company_name: 'Digital Dynamics' },
                    { company_name: 'AI Ventures' },
                    { company_name: 'Growth Labs' },
                ]
            },
            // Bento Grid
            {
                slice_type: 'bento_grid',
                slice_label: null,
                primary: {
                    title: 'System Architecture',
                    subtitle: 'A modular, scalable ecosystem designed for complete market dominance.'
                },
                items: [
                    { icon_name: 'Bot', item_title: 'AI Agents Swarm', item_description: 'Autonomous agents that handle outreach, booking, and support 24/7.', span: 2 },
                    { icon_name: 'Zap', item_title: 'Visual Intelligence', item_description: 'Generative UI that adapts to user behavior in real-time.', span: 1 },
                    { icon_name: 'Globe', item_title: 'Global CDN', item_description: 'Edge-deployed content delivery for sub-100ms load times.', span: 1 },
                    { icon_name: 'Database', item_title: 'Data Lake', item_description: 'Centralized intelligence gathering from every interaction.', span: 2 },
                ]
            },
            // Services
            {
                slice_type: 'services',
                slice_label: null,
                primary: {
                    eyebrow: 'WHAT WE BUILD',
                    title: 'Full-Stack AI Solutions',
                    subtitle: 'From strategy to deployment, we handle the entire pipeline.'
                },
                items: [
                    { icon_name: 'Bot', title: 'AI Agent Development', description: 'Custom autonomous agents for sales, support, and operations.', link_label: 'Learn More', link_url: { link_type: 'Web', url: '/services' } },
                    { icon_name: 'Zap', title: 'Automation Systems', description: 'End-to-end workflow automation that scales with your business.', link_label: 'Learn More', link_url: { link_type: 'Web', url: '/services' } },
                    { icon_name: 'Globe', title: 'Growth Marketing', description: 'Data-driven campaigns that convert prospects into clients.', link_label: 'Learn More', link_url: { link_type: 'Web', url: '/services' } },
                ]
            },
            // Testimonials
            {
                slice_type: 'testimonials',
                slice_label: null,
                primary: { title: 'What Our Clients Say' },
                items: [
                    { quote: 'WeMagnifAI transformed our lead generation. We went from 5 leads/month to 50+ qualified prospects.', name: 'Sarah Chen', role: 'CEO, TechStart Agency' },
                    { quote: 'The AI agents they built handle 80% of our customer inquiries automatically. Game changer.', name: 'Marcus Johnson', role: 'Founder, Digital Growth Co' },
                    { quote: 'Best investment we made this year. ROI was visible within the first month.', name: 'Emily Rodriguez', role: 'CMO, ScaleUp Studios' },
                ]
            },
            // FAQ
            {
                slice_type: 'faq',
                slice_label: null,
                primary: { title: 'Frequently Asked Questions' },
                items: [
                    { question: 'How quickly can you deploy an AI agent?', answer: 'Most AI agents are deployed within 7-14 days, depending on complexity.' },
                    { question: 'Do I need technical knowledge?', answer: 'No. We handle all the technical complexity. You get a simple dashboard to monitor results.' },
                    { question: 'What makes WeMagnifAI different?', answer: 'We build custom AI systems, not templates. Every solution is engineered specifically for your business.' },
                ]
            },
        ]
    }
};

async function createHomepage() {
    console.log('🚀 Creating Homepage document in Prismic...\n');

    const apiUrl = `https://migration.prismic.io/documents`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${writeToken}`,
                'Content-Type': 'application/json',
                'x-api-key': writeToken,
                'repository': repositoryName,
            },
            body: JSON.stringify(homepageDocument)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const result = await response.json();
        console.log('✅ Homepage created successfully!');
        console.log(`   Document ID: ${result.id}`);
        console.log('\n📝 Next steps:');
        console.log('1. Go to https://wemagnifai-growth-seo-brand-marketing.prismic.io');
        console.log('2. Open the Homepage document');
        console.log('3. Click "Publish" to make it live');
        console.log('4. Refresh your Next.js app');

    } catch (error) {
        console.error('❌ Failed to create document:', error.message);

        if (error.message.includes('401') || error.message.includes('403')) {
            console.log('\n💡 Authentication issue. Please check your write token.');
        }
    }
}

createHomepage();
