"use client";

import React, { useState, useEffect } from 'react';
import styles from './homev2.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ArrowRight, CheckCircle, Zap, TrendingUp, Code2, Layers, Cpu, Globe, Bot, Database } from 'lucide-react';
import Link from 'next/link';
import TrustedBy from '@/components/TrustedBy';
import ServicesGrid from '@/components/ServicesGrid';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';

// Terminal Simulation Component
const TerminalDemo = () => {
    const [lines, setLines] = useState<any[]>([]);

    const script = [
        { type: 'command', text: '> initializing growth_engine --mode=aggressive', delay: 500 },
        { type: 'info', text: 'ℹ analyzing competitive landscape...', delay: 1000 },
        { type: 'success', text: '✔ identified 14 high-value opportunities', delay: 1500 },
        { type: 'info', text: 'ℹ deploying ai_agents...', delay: 2000 },
        { type: 'process', text: '→ generating_content: "Why AI Matters"...', delay: 2500 },
        { type: 'process', text: '→ optimizing_seo: ranks #3 for "best digital agency"...', delay: 3200 },
        { type: 'success', text: '✔ leads_generated: 12 in last 24h', delay: 4000 },
        { type: 'command', text: '> await client_booking()', delay: 4500 },
    ];

    const startedRef = React.useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        let currentIndex = 0;

        const runScript = async () => {
            if (currentIndex >= script.length) return;

            const step = script[currentIndex];
            await new Promise(r => setTimeout(r, step.delay));

            setLines(prev => [...prev, step]);
            currentIndex++;
            runScript();
        };

        runScript();
    }, []);

    return (
        <div className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={styles.terminalTitle}>ai-growth-engine — bash — 80x24</div>
            </div>
            <div className={styles.terminalBody}>
                {lines.map((line, i) => (
                    <div key={i} className={styles.line}>
                        <span className={styles.lineNumber}>{(i + 1).toString().padStart(2, '0')}</span>
                        <span className={
                            line.type === 'success' ? styles.success :
                                line.type === 'info' ? styles.info :
                                    line.type === 'command' ? styles.command :
                                        styles.warning
                        }>
                            {line.text}
                        </span>
                    </div>
                ))}
                <div className={styles.line}>
                    <span className={styles.lineNumber}>{(lines.length + 1).toString().padStart(2, '0')}</span>
                    <span className={styles.cursor}></span>
                </div>
            </div>
        </div>
    );
};

export default function HomeV2() {
    return (
        <main className={styles.main}>
            {/* Hero Section */}
            <section className={styles.heroSection}>
                <div className={styles.heroContent}>
// Hero Content Animations
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className={styles.badge}
                    >
                        <Zap size={14} className="text-yellow-400" />
                        <span>v2.0.0 Now Live</span>
                    </motion.div>

                    <motion.h1
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={styles.heroTitle}
                    >
                        The Growth Engine<br />For Scaling Agencies
                    </motion.h1>

                    <motion.p
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={styles.heroDescription}
                    >
                        Stop relying on luck. We build automated AI pipelines that specifically target, nurture, and close your ideal clients. No fluff. Just code & revenue.
                    </motion.p>

                    <div className={styles.ctaGroup}>
                        <Link href="/book" className={styles.primaryCta}>
                            Start Growth Engine
                        </Link>
                        <Link href="/case-studies" className={styles.secondaryCta}>
                            View System Architecture
                        </Link>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        <TerminalDemo />
                    </motion.div>
                </div>
            </section>

            {/* Metrics Strip */}
            <div className={styles.metricsStrip}>
                <div className={styles.metricItem}>
                    <span className={styles.metricValue}>4x</span>
                    <span className={styles.metricLabel}>Faster Execution</span>
                </div>
                <div className={styles.metricItem}>
                    <span className={styles.metricValue}>98%</span>
                    <span className={styles.metricLabel}>Open Rates</span>
                </div>
                <div className={styles.metricItem}>
                    <span className={styles.metricValue}>24/7</span>
                    <span className={styles.metricLabel}>AI Operation</span>
                </div>
                <div className={styles.metricItem}>
                    <span className={styles.metricValue}>&lt; 7 Days</span>
                    <span className={styles.metricLabel}>To Launch</span>
                </div>
            </div>

            {/* Trusted By Section */}
            <TrustedBy />

            {/* Architecture Section (Bento Grid) */}
            <section className={styles.sectionDark}>
                <div className={styles.container}>
                    <h2 className={styles.sectionTitle}>System Architecture</h2>
                    <p className={styles.sectionSubtitle}>
                        A modular, scalable ecosystem designed for complete market dominance.
                    </p>
                    <BentoGrid>
                        <BentoItem
                            title="AI Agents Swarm"
                            description="Autonomous agents that handle outreach, booking, and support 24/7 without human intervention."
                            icon={<Bot size={32} />}
                            span={2}
                        />
                        <BentoItem
                            title="Visual Intelligence"
                            description="Generative UI that adapts to user behavior in real-time."
                            icon={<Zap size={32} />}
                        />
                        <BentoItem
                            title="Global CDN"
                            description="Edge-deployed content delivery for sub-100ms load times worldwide."
                            icon={<Globe size={32} />}
                        />
                        <BentoItem
                            title="Data Lake"
                            description="Centralized intelligence gathering from every interaction point."
                            icon={<Database size={32} />}
                            span={2}
                        />
                    </BentoGrid>
                </div>
            </section>

            {/* Services Grid */}
            <ServicesGrid />

            {/* Testimonials */}
            <Testimonials />

            {/* Footer */}
            <Footer />


        </main>
    );
}
