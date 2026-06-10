import styles from './FreeEbookSection.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { Download, ChevronRight } from 'lucide-react';
import { FadeIn } from './FadeIn';

export default function FreeEbookSection() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.badge}>
                        <span className={styles.badgePulse}></span>
                        Free Growth Resource
                    </div>
                    <h2 className={styles.title}>
                        The 2026 AI<br />Growth Playbook
                    </h2>
                    <p className={styles.description}>
                        Stop guessing your strategy. Our 45-page playbook reveals the exact AI frameworks we use to scale agencies to £100k+ months. 
                    </p>
                    <ul className={styles.list}>
                        <li><ChevronRight size={16} /> The "Agentic Swarm" Outreach Framework</li>
                        <li><ChevronRight size={16} /> 24 High-Conversion AI Prompts</li>
                        <li><ChevronRight size={16} /> Tech Stack Architecture for 2026</li>
                    </ul>
                    <div className={styles.ctaWrapper}>
                        <Link href="/lead-magnets/ai-growth-playbook" className={styles.primaryBtn}>
                            <Download size={18} /> Download Free Playbook
                        </Link>
                        <span className={styles.meta}>PDF · 14.2 MB · 4,200+ Downloads</span>
                    </div>
                </div>
                <div className={styles.imageWrapper}>
                    <div className={styles.imageGlow}></div>
                    <Image 
                        src="/images/ebook-cover.png" 
                        alt="2026 AI Growth Playbook" 
                        width={400} 
                        height={550} 
                        className={styles.image}
                    />
                </div>
            </div>
        </section>
    );
}
