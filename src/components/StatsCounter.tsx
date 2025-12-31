'use client';

import styles from './StatsCounter.module.css';

const STATS = [
    { number: '500+', label: 'Happy Clients' },
    { number: '$2M+', label: 'Revenue Generated' },
    { number: '50+', label: 'AI Automations' },
    { number: '98%', label: 'Client Retention' },
];

export default function StatsCounter() {
    return (
        <section className={styles.section}>
            <div className={styles.grid}>
                {STATS.map((stat, i) => (
                    <div key={i} className={styles.stat}>
                        <div className={styles.number}>
                            <span>{stat.number}</span>
                        </div>
                        <div className={styles.label}>{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
