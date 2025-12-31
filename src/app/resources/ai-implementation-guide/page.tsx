'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GatedAccess from '@/components/GatedAccess';
import styles from './page.module.css';
import { BookOpen, Download, ArrowRight, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function AIImplementationGuide() {
    const [isGatedOpen, setIsGatedOpen] = useState(false);

    const handleDownload = () => {
        setIsGatedOpen(true);
    };

    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* HERO */}
                <div className={styles.hero}>
                    <div className={styles.badge}>
                        <BookOpen size={16} style={{ marginRight: 8 }} />
                        Pillar Guide 2026
                    </div>
                    <h1 className={styles.title}>The Complete AI Implementation Roadmap</h1>
                    <p className={styles.subtitle}>
                        A step-by-step framework to moving from &quot;experimentation&quot; to enterprise-grade AI deployment.
                        Used by 500+ companies to scale profitably.
                    </p>
                    <div className={styles.meta}>
                        <span>Last Updated: Dec 2025</span>
                        <span>Read Time: 15 mins</span>
                    </div>
                </div>

                <div className={styles.contentWrapper}>
                    {/* ARTICLE CONTENT */}
                    <article className={styles.article}>
                        <div className={styles.glassBox}>
                            <strong>Executive Summary:</strong> Most AI projects fail (87%) because they start with tools, not problems. This guide reverses that process, showing you how to audit workflows, identify high-impact use cases, and pilot your first agent swarm in 30 days.
                        </div>

                        <h2 id="phase-1">Phase 1: The Audit & Strategy</h2>
                        <p>Before buying a single ChatGPT Team seat, you need to map your &quot;Manual Friction Points&quot;. We call this the MFP Audit.</p>
                        <p>Look for tasks that use the <strong>3 R&apos;s</strong>:</p>
                        <ul>
                            <li><strong>Repetitive:</strong> Done more than 3x/week</li>
                            <li><strong>Rule-Based:</strong> Requires logic, not empathy</li>
                            <li><strong>Readable:</strong> Input/Output is text or data</li>
                        </ul>

                        <h2 id="phase-2">Phase 2: Pilot Selection</h2>
                        <p>Don&apos;t try to automate everything. Pick ONE high-impact workflow.</p>
                        <div className={styles.glassBox} style={{ borderColor: '#ec4899', borderLeftColor: '#ec4899' }}>
                            <div style={{ display: 'flex', alignItems: 'center', color: '#ec4899', marginBottom: '1rem', fontWeight: 600 }}>
                                <AlertTriangle size={20} style={{ marginRight: 8 }} />
                                Common Pitfall
                            </div>
                            Most founders try to replace a whole person (e.g., &quot;AI Sales Rep&quot;). Instead, replace a TASK (e.g., &quot;AI Lead Qualifier&quot;).
                        </div>

                        <h2 id="phase-3">Phase 3: The Tech Stack</h2>
                        <p>For 2026, the stack has simplified. You don&apos;t need 20 subscriptions.</p>
                        <ul>
                            <li><strong>LLM Layer:</strong> OpenAI / Anthropic (via API)</li>
                            <li><strong>Orchestration:</strong> Make.com / n8n</li>
                            <li><strong>Database:</strong> Pinecone / Supabase (for context)</li>
                        </ul>

                        <h2 id="phase-4">Phase 4: Scaling & Governance</h2>
                        <p>Once your pilot works, duplicate the logic to other departments.</p>

                        <div style={{ marginTop: '4rem', padding: '2rem', background: 'var(--bg-secondary)', borderRadius: '1rem', border: '1px solid var(--primary)' }}>
                            <h3 style={{ marginTop: 0 }}>Ready to Build This?</h3>
                            <p>Get our complete 80-page PDF with checklists, prompt libraries, and vendor comparisons.</p>
                            <button className={styles.downloadBtn} onClick={handleDownload} style={{ width: 'fit-content', padding: '1rem 2rem' }}>
                                Download Full Roadmap PDF <Download size={18} />
                            </button>
                        </div>
                    </article>

                    {/* SIDEBAR */}
                    <aside className={styles.sidebar}>
                        <div className={styles.toc}>
                            <div className={styles.tocTitle}>Table of Contents</div>
                            <ul className={styles.tocList}>
                                <li><Link href="#phase-1" className={styles.tocLink}>Phase 1: Audit & Strategy</Link></li>
                                <li><Link href="#phase-2" className={styles.tocLink}>Phase 2: Pilot Selection</Link></li>
                                <li><Link href="#phase-3" className={styles.tocLink}>Phase 3: The Tech Stack</Link></li>
                                <li><Link href="#phase-4" className={styles.tocLink}>Phase 4: Scaling</Link></li>
                            </ul>
                        </div>

                        <div className={styles.downloadCard}>
                            <div className={styles.downloadTitle}>Save This Guide</div>
                            <p className={styles.downloadDesc}>Get the PDF version + 3 bonus checklists.</p>
                            <button className={styles.downloadBtn} onClick={handleDownload}>
                                Download PDF <Download size={16} />
                            </button>
                        </div>
                    </aside>
                </div>
            </main>
            <Footer />

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={(email) => {
                    setIsGatedOpen(false);
                    alert(`Guide sent to ${email}!`);
                }}
                resourceName="AI Implementation Roadmap"
                title="Get the Complete Roadmap"
            />
        </>
    );
}
