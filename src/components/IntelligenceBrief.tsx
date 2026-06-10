'use client';

import styles from './IntelligenceBrief.module.css';
import { INSIGHT_BRIEFS } from '@/data/insightsData';
import blogData from '@/data/blog.json';
import { Newspaper } from 'lucide-react';

export default function IntelligenceBrief() {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.5rem', background: 'rgba(139,92,246,0.15)', borderRadius: '10px', color: '#a78bfa', display: 'flex' }}>
                    <Newspaper size={18} />
                </div>
                <h2 style={{ fontSize: '1.25rem', margin: 0, fontFamily: 'var(--font-inter)', fontWeight: 800, color: '#ffffff' }}>
                    Intelligence Brief
                </h2>
            </div>

            <div className={styles.briefGrid}>
                {blogData.articles.slice(0, 3).map((brief) => (
                    <div key={brief.id} className={styles.briefCard}>
                        <div className={styles.meta}>
                            <span className={styles.category}>{brief.category}</span>
                            <span>{brief.date}</span>
                        </div>
                        <h3>{brief.title}</h3>
                        <p>{brief.snippet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
