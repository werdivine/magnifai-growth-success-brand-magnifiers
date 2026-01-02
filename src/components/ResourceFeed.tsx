'use client';

import styles from './ResourceFeed.module.css';
import { ArrowRight, Terminal, FileText, Zap, Layout, Settings } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { RESOURCES } from '@/data/resourcesData';

const typeIcons = {
    'Prompt': Terminal,
    'Guide': FileText,
    'Tool': Zap,
    'Template': Layout,
};

const typeColors = {
    'Prompt': { color: '#818cf8', bg: 'rgba(99,102,241,0.1)' },
    'Guide': { color: '#f472b6', bg: 'rgba(236,72,153,0.1)' },
    'Tool': { color: '#34d399', bg: 'rgba(52,211,153,0.1)' },
    'Template': { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
};

export default function ResourceFeed() {
    return (
        <div className={styles.feedContainer}>
            <div className={styles.feedHeader}>
                <h2>Latest from the OS</h2>
                <Link href="/resources">View All <ArrowRight size={16} /></Link>
            </div>

            <div className={styles.grid}>
                {RESOURCES.slice(0, 3).map((resource) => {
                    const Icon = typeIcons[resource.type] || Settings;
                    const colors = typeColors[resource.type] || { color: '#fff', bg: 'rgba(255,255,255,0.1)' };

                    return (
                        <Link key={resource.id} href={resource.link} className={styles.card}>
                            <div className={styles.thumbnail}>
                                {resource.image.startsWith('/') ? (
                                    <Image
                                        src={resource.image}
                                        alt={resource.title}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div style={{ background: resource.image, width: '100%', height: '100%' }}></div>
                                )}
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.iconTag}>
                                    <div className={styles.icon} style={{ color: colors.color, background: colors.bg }}>
                                        <Icon size={20} />
                                    </div>
                                    <span className={styles.tag}>{resource.type}</span>
                                </div>
                                <div className={styles.content}>
                                    <h3>{resource.title}</h3>
                                    <p>{resource.description}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
