import Link from 'next/link';
import styles from './FeaturedTools.module.css';

const TOOLS = [
    {
        icon: '🚀',
        label: 'NEW',
        labelColor: '#22d3ee',
        labelBg: 'rgba(34,211,238,0.12)',
        labelBorder: 'rgba(34,211,238,0.3)',
        title: 'Telegram Growth Engine',
        description: '1,284 leads scraped this week. Fully automated AI outreach at scale.',
        href: '/telegram-growth',
        accent: 'rgba(34,211,238,0.15)',
        accentBorder: 'rgba(34,211,238,0.25)',
        glow: 'rgba(34,211,238,0.12)',
    },
    {
        icon: '🤖',
        label: 'CORE',
        labelColor: '#a78bfa',
        labelBg: 'rgba(139,92,246,0.12)',
        labelBorder: 'rgba(139,92,246,0.3)',
        title: 'AI Automation Suite',
        description: 'Custom AI agents that handle outreach, booking, and support 24/7.',
        href: '/services/ai-automation',
        accent: 'rgba(139,92,246,0.15)',
        accentBorder: 'rgba(139,92,246,0.25)',
        glow: 'rgba(139,92,246,0.12)',
    },
    {
        icon: '📊',
        label: 'FREE',
        labelColor: '#34d399',
        labelBg: 'rgba(52,211,153,0.12)',
        labelBorder: 'rgba(52,211,153,0.3)',
        title: 'ROI Calculator',
        description: 'Project your automation ROI with our proprietary growth models.',
        href: '/tools/roi',
        accent: 'rgba(52,211,153,0.12)',
        accentBorder: 'rgba(52,211,153,0.25)',
        glow: 'rgba(52,211,153,0.1)',
    },
    {
        icon: '✨',
        label: 'FREE',
        labelColor: '#f59e0b',
        labelBg: 'rgba(245,158,11,0.12)',
        labelBorder: 'rgba(245,158,11,0.3)',
        title: 'Free Growth Audit',
        description: '47-point checklist to find what\'s killing your conversions right now.',
        href: '/free-audit',
        accent: 'rgba(245,158,11,0.12)',
        accentBorder: 'rgba(245,158,11,0.25)',
        glow: 'rgba(245,158,11,0.08)',
    },
    {
        icon: '📖',
        label: 'HUB',
        labelColor: '#818cf8',
        labelBg: 'rgba(99,102,241,0.12)',
        labelBorder: 'rgba(99,102,241,0.3)',
        title: 'Resource & Content Hub',
        description: 'Playbooks, guides, and templates trusted by 500+ scaling agencies.',
        href: '/resources',
        accent: 'rgba(99,102,241,0.12)',
        accentBorder: 'rgba(99,102,241,0.25)',
        glow: 'rgba(99,102,241,0.1)',
    },
    {
        icon: '🔍',
        label: 'AI',
        labelColor: '#fb7185',
        labelBg: 'rgba(251,113,133,0.12)',
        labelBorder: 'rgba(251,113,133,0.3)',
        title: 'AI Tool Directory',
        description: 'Curated index of the best AI tools for agencies — rated and reviewed.',
        href: '/directory',
        accent: 'rgba(251,113,133,0.12)',
        accentBorder: 'rgba(251,113,133,0.25)',
        glow: 'rgba(251,113,133,0.08)',
    },
];

export default function FeaturedTools() {
    return (
        <section className={styles.section}>
            <div className={styles.inner}>
                <div className={styles.header}>
                    <p className={styles.eyebrow}>What We Offer</p>
                    <h2 className={styles.title}>
                        Tools &amp; Services Built to Scale You
                    </h2>
                    <p className={styles.subtitle}>
                        From AI outreach engines to free audits — everything you need to dominate your market.
                    </p>
                </div>

                <div className={styles.grid}>
                    {TOOLS.map((tool) => (
                        <Link key={tool.href} href={tool.href} className={styles.card}>
                            <div className={styles.cardGlow} style={{ background: `radial-gradient(circle at 50% 0%, ${tool.glow} 0%, transparent 70%)` }} />
                            <div className={styles.cardTop}>
                                <span className={styles.cardIcon}>{tool.icon}</span>
                                <span className={styles.cardLabel} style={{
                                    color: tool.labelColor,
                                    background: tool.labelBg,
                                    border: `1px solid ${tool.labelBorder}`,
                                }}>
                                    {tool.label}
                                </span>
                            </div>
                            <h3 className={styles.cardTitle}>{tool.title}</h3>
                            <p className={styles.cardDesc}>{tool.description}</p>
                            <span className={styles.cardCta} style={{ color: tool.labelColor }}>
                                Explore →
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
