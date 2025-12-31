'use client';

import styles from './ResourceFeed.module.css';
import { ArrowRight, Terminal, FileText, Zap } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ResourceFeed() {
    return (
        <div className={styles.feedContainer}>
            <div className={styles.feedHeader}>
                <h2>Latest from the OS</h2>
                <Link href="/insights">View All <ArrowRight size={16} /></Link>
            </div>

            <div className={styles.grid}>
                {/* Card 1: Prompt */}
                <Link href="/prompts" className={styles.card}>
                    <div className={styles.thumbnail}>
                        <Image
                            src="/images/card-strategic-planning.jpg"
                            alt="Strategic Planning"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.iconTag}>
                            <div className={styles.icon} style={{ color: '#818cf8', background: 'rgba(99,102,241,0.1)' }}><Terminal size={20} /></div>
                            <span className={styles.tag}>Prompt</span>
                        </div>
                        <div className={styles.content}>
                            <h3>Strategic Planning Agent</h3>
                            <p>McKinsey-level quarterly planning prompt for GPT-4.</p>
                        </div>
                    </div>
                </Link>

                {/* Card 2: Insight */}
                <Link href="/insights" className={styles.card}>
                    <div className={styles.icon} style={{ color: '#f472b6', background: 'rgba(236,72,153,0.1)' }}><FileText size={20} /></div>
                    <div className={styles.content}>
                        <span className={styles.tag}>Guide</span>
                        <h3>The &quot;Zero-Inbox&quot; Workflow</h3>
                        <p>Automating email triage with Make.com and OpenAI.</p>
                    </div>
                </Link>

                {/* Card 3: Tool */}
                <Link href="/tools/roi" className={styles.card}>
                    <div className={styles.thumbnail}>
                        <Image
                            src="/images/card-roi-calculator.jpg"
                            alt="ROI Calculator"
                            fill
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.iconTag}>
                            <div className={styles.icon} style={{ color: '#34d399', background: 'rgba(52,211,153,0.1)' }}><Zap size={20} /></div>
                            <span className={styles.tag}>Tool</span>
                        </div>
                        <div className={styles.content}>
                            <h3>ROI Calculator</h3>
                            <p>Project your annual savings from AI automation.</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
