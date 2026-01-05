'use client';

import { Palette, Megaphone, Bot, Code, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Section from './Section';
import styles from './ServicesGrid.module.css';

const SERVICES = [
    {
        title: 'Creative Design',
        description: 'Brand identity, UI/UX design, and visual storytelling that captivates your audience.',
        icon: Palette,
        href: '/services/creative',
        accentColor: '#ec4899',
        iconBg: 'rgba(236, 72, 153, 0.1)',
    },
    {
        title: 'Digital Marketing',
        description: 'SEO, paid ads, and content strategies that drive traffic and conversions.',
        icon: Megaphone,
        href: '/services/marketing',
        accentColor: '#6366f1',
        iconBg: 'rgba(99, 102, 241, 0.1)',
    },
    {
        title: 'AI Automation',
        description: 'Custom AI agents and workflows that run your operations 24/7.',
        icon: Bot,
        href: '/services/ai-automation',
        accentColor: '#10b981',
        iconBg: 'rgba(16, 185, 129, 0.1)',
    },
    {
        title: 'Web Development',
        description: 'Fast, scalable websites and apps built with modern technology.',
        icon: Code,
        href: '/services/development',
        accentColor: '#f59e0b',
        iconBg: 'rgba(245, 158, 11, 0.1)',
    },
];

interface ServicesGridProps {
    eyebrow?: string;
    title?: string;
    subtitle?: string;
    items?: {
        title: string;
        description: string;
        iconName?: string;
        href: string;
    }[];
}

export default function ServicesGrid({ eyebrow, title, subtitle, items }: ServicesGridProps) {
    const displayEyebrow = eyebrow || "What We Do";
    const displayTitle = title || "Services Built for Growth";
    const displaySubtitle = subtitle || "Full-stack creative and technical solutions to help you dominate your market.";

    // If items provided, map icon name to component. If not, use static default.
    const displayServices = items && items.length > 0 ? items.map(item => {
        let icon = Code;
        if (item.iconName === 'Palette') icon = Palette;
        if (item.iconName === 'Megaphone') icon = Megaphone;
        if (item.iconName === 'Bot') icon = Bot;
        if (item.iconName === 'Code') icon = Code;

        return {
            ...item,
            icon,
            accentColor: '#6366f1', // Default accent
            iconBg: 'rgba(99, 102, 241, 0.1)'
        };
    }) : SERVICES;

    return (
        <Section theme="dark" className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <span className={styles.eyebrow}>{displayEyebrow}</span>
                    <h2 className={styles.title}>{displayTitle}</h2>
                    <p className={styles.subtitle}>
                        {displaySubtitle}
                    </p>
                </div>

                <div className={styles.grid}>
                    {displayServices.map((service, idx) => {
                        const Icon = service.icon;
                        return (
                            <Link
                                key={idx}
                                href={service.href}
                                className={styles.card}
                                style={{
                                    // @ts-ignore
                                    '--accent-color': service.accentColor || '#6366f1',
                                    '--icon-bg': service.iconBg || 'rgba(99, 102, 241, 0.1)',
                                    '--icon-color': service.accentColor || '#6366f1',
                                }}
                            >
                                <div className={styles.iconWrapper}>
                                    <Icon size={28} />
                                </div>
                                <h3 className={styles.cardTitle}>{service.title}</h3>
                                <p className={styles.cardDescription}>{service.description}</p>
                                <div className={styles.cardLink}>
                                    Learn More <ArrowRight size={16} />
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </Section>
    );
}
