'use client';

import styles from './IntelligenceBrief.module.css';
import { INSIGHT_BRIEFS } from '@/data/insightsData';
import blogData from '@/data/blog.json';
import { Newspaper } from 'lucide-react';

export default function IntelligenceBrief() {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <div style={{ padding: '0.8rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '14px', color: 'var(--brand-primary)' }}>
                    <Newspaper size={28} />
                </div>
                <div>
                    <h2 style={{ fontSize: '2.5rem', margin: 0, fontFamily: 'var(--font-playfair)', fontWeight: 900, color: 'var(--text-primary)' }}>Intelligence Brief</h2>
                    <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem' }}>Signals from the bleeding edge of AI.</p>
                </div>
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
