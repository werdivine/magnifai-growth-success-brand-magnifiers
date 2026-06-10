'use client';
import { useState } from 'react';
import styles from './LeadMagnet.module.css';
import { ArrowRight, Download } from 'lucide-react';
import GatedAccess from './GatedAccess';

export default function LeadMagnet() {
    const [isGatedOpen, setIsGatedOpen] = useState(false);

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <span className={styles.badge}>New Release</span>
                    <h2 className={styles.heading}>The State of AI Agents 2026</h2>
                    <p className={styles.sub}>
                        A 50-page deep dive into the 12 most profitable agent frameworks used by top agencies.
                        Includes code snippets and blueprint diagrams.
                    </p>
                    <button
                        style={{
                            background: 'white',
                            color: 'black',
                            border: 'none',
                            padding: '1rem 2rem',
                            borderRadius: '999px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onClick={() => setIsGatedOpen(true)}
                    >
                        <Download size={20} />
                        Download Free Report
                    </button>
                </div>

                <div style={{ perspective: '1000px' }}>
                    <div className={styles.bookMockup}>
                        <div style={{ textAlign: 'center', color: 'white' }}>
                            <div style={{ fontSize: '3rem', fontWeight: 800, lineHeight: 1 }}>2026</div>
                            <div style={{ fontSize: '1.25rem', letterSpacing: '0.1em' }}>REPORT</div>
                        </div>
                    </div>
                </div>
            </div>

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={() => setIsGatedOpen(false)}
                resourceName="2026 State of AI Report"
            />
        </section>
    );
}
