'use client';

import styles from './IntelligenceBrief.module.css';
import { INSIGHT_BRIEFS } from '@/data/insightsData';
import { Newspaper } from 'lucide-react';

export default function IntelligenceBrief() {
    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(99,102,241,0.1)', borderRadius: '12px', color: '#6366f1' }}>
                    <Newspaper size={24} />
                </div>
                <div>
                    <h2 style={{ fontSize: '2rem', margin: 0, fontFamily: 'var(--font-playfair)' }}>Intelligence Brief</h2>
                    <p style={{ color: '#94a3b8', margin: 0 }}>Signals from the bleeding edge of AI.</p>
                </div>
            </div>

            <div className={styles.briefGrid}>
                {INSIGHT_BRIEFS.map((brief) => (
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
