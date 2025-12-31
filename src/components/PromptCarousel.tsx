'use client';

import { Terminal, Copy, ArrowRight } from 'lucide-react';
import Section from './Section';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PromptCarousel.module.css';

const PROMPTS = [
    { id: 1, title: 'Strategic Planning Agent', color: '#6366f1', type: 'Strategy', image: '/images/card-strategy.png' },
    { id: 2, title: 'React Component Architect', color: '#ec4899', type: 'Coding', image: '/images/card-react.png' },
    { id: 3, title: 'Viral Hook Generator', color: '#10b981', type: 'Marketing', image: '/images/card-viral.png' },
    { id: 4, title: 'SaaS Pricing Optimizer', color: '#f59e0b', type: 'Sales', image: '/images/card-strategy.png' },
    { id: 5, title: 'Email Responder AI', color: '#14b8a6', type: 'Productivity', image: '/images/card-viral.png' },
    { id: 6, title: 'Hiring Assistant', color: '#8b5cf6', type: 'HR', image: '/images/card-strategy.png' },
];

export default function PromptCarousel() {
    return (
        <Section theme="gradient" className={styles.section}>
            <div className={styles.header}>
                <h2 className={styles.title}>Steal Our Brain</h2>
                <p className={styles.subtitle}>50+ Battle-tested prompts. No fluff.</p>
            </div>

            <div className={styles.carouselContainer}>
                {PROMPTS.map((prompt) => (
                    <Link
                        key={prompt.id}
                        href={`/prompts`}
                        className={styles.card}
                        style={{
                            boxShadow: `0 20px 50px -10px ${prompt.color}40`,
                        }}
                    >
                        <div className={styles.cardImage}>
                            <Image
                                src={prompt.image}
                                alt={prompt.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                style={{ objectFit: 'cover', objectPosition: 'center' }}
                                quality={90}
                            />
                            <div className={styles.cardOverlay}></div>
                        </div>

                        <div className={styles.cardContentWrapper}>
                            <div>
                                <div className={styles.cardTag} style={{ background: `${prompt.color}20`, color: prompt.color }}>
                                    <Terminal size={12} /> {prompt.type}
                                </div>
                                <h3 className={styles.cardTitle}>{prompt.title}</h3>
                            </div>

                            <div style={{ width: '100%', marginTop: '1rem' }}>
                                <div className={styles.progressBarContainer}>
                                    <div
                                        className={styles.progressBarFill}
                                        style={{ background: prompt.color, width: '70%' }}
                                    />
                                </div>
                                <div className={styles.cardFooter}>
                                    <span className={styles.modelTag}>GPT-4o Optimized</span>
                                    <Copy size={18} className={styles.copyIcon} />
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            <div className={styles.footerLink}>
                <Link href="/prompts" className={styles.link}>
                    Access Full Library <ArrowRight size={20} />
                </Link>
            </div>
        </Section>
    )
}
