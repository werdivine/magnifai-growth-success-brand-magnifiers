import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowRight, Clock, User, TrendingUp } from 'lucide-react';

export default function InsightsHub() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh' }}>

                {/* HERO SECTION */}
                <div className={styles.heroSection}>
                    <div className={styles.heroGrid}>
                        {/* PRIMARY FEATURE */}
                        <div className={styles.featuredCard}>
                            <div className={styles.overlay}></div>
                            <div className={styles.featuredContent}>
                                <span className={styles.featuredTag}>Featured Playbook</span>
                                <h1 className={styles.featuredTitle}>The Complete AI Implementation Roadmap (2026 Edition)</h1>
                                <p className={styles.featuredExcerpt}>
                                    Most implementations fail due to &quot;Tool Fixation&quot;. Here is the exact 4-phase audit framework we use to deploy agents that actually cut costs.
                                </p>
                                <Link href="/resources/ai-implementation-guide" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    padding: '1rem 2rem',
                                    background: '#fff',
                                    color: '#000',
                                    fontWeight: 700,
                                    borderRadius: '0.5rem',
                                    textDecoration: 'none'
                                }}>
                                    Read the Deep Dive <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>

                        {/* SECONDARY TRENDING */}
                        <div className={styles.trendingList}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-playfair)', fontSize: '1.25rem' }}>
                                <TrendingUp size={20} /> Trending Now
                            </div>

                            <div className={styles.trendingCard}>
                                <div className={styles.trendingContext}>Strategy</div>
                                <h3 className={styles.trendingTitle}>Why &quot;AI Sales Reps&quot; Are Killing Your Conversion Rates</h3>
                            </div>
                            <div className={styles.trendingCard}>
                                <div className={styles.trendingContext}>Tools</div>
                                <h3 className={styles.trendingTitle}>GPT-5 Preparation Checklist: 5 Data Streams to Clean Now</h3>
                            </div>
                            <div className={styles.trendingCard}>
                                <div className={styles.trendingContext}>Automation</div>
                                <h3 className={styles.trendingTitle}>The &quot;Zero-Inbox&quot; Agent Workflow (Make.com Template)</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* FEED SECTION */}
                <div className={styles.feedSection}>
                    <div className={styles.sectionHeader}>
                        <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-playfair)', color: '#fff', margin: 0 }}>Latest Insights</h2>
                        <Link href="/insights/archive" style={{ color: 'var(--text-muted)' }}>View Archive</Link>
                    </div>

                    <div className={styles.feedGrid}>
                        {/* Article 1 */}
                        <article className={styles.articleCard}>
                            <div className={styles.articleMeta}>
                                <span><Clock size={14} style={{ display: 'inline', marginRight: 4 }} /> 8 min read</span>
                                <span><User size={14} style={{ display: 'inline', marginRight: 4 }} /> Sarah Chen</span>
                            </div>
                            <h3 className={styles.articleTitle}>How AI is Revolutionizing Small Business Marketing</h3>
                            <p className={styles.articleDesc}>
                                The landscape of small business marketing has fundamentally shifted. What once required teams of specialists can now be accomplished by a solo entrepreneur.
                            </p>
                            <Link href="/insights/ai-marketing" className={styles.readMore}>
                                Read Article <ArrowRight size={16} />
                            </Link>
                        </article>

                        {/* Article 2 */}
                        <article className={styles.articleCard}>
                            <div className={styles.articleMeta}>
                                <span><Clock size={14} style={{ display: 'inline', marginRight: 4 }} /> 8 min read</span>
                                <span><User size={14} style={{ display: 'inline', marginRight: 4 }} /> Sarah Jenkins</span>
                            </div>
                            <h3 className={styles.articleTitle}>Content at Scale without the &quot;Robotic&quot; Tone</h3>
                            <p className={styles.articleDesc}>
                                How to train a Claude 3.5 instance on your brand voice using &quot;Few-Shot Prompting&quot; techniques.
                            </p>
                            <Link href="/prompts" className={styles.readMore}>
                                See Prompts <ArrowRight size={16} />
                            </Link>
                        </article>

                        {/* Article 3 */}
                        <article className={styles.articleCard}>
                            <div className={styles.articleMeta}>
                                <span><Clock size={14} style={{ display: 'inline', marginRight: 4 }} /> 12 min read</span>
                                <span><User size={14} style={{ display: 'inline', marginRight: 4 }} /> Dev Team</span>
                            </div>
                            <h3 className={styles.articleTitle}>Building Your First Customer Service Swarm</h3>
                            <p className={styles.articleDesc}>
                                A technical deep dive into chaining OpenAI Assistants API for handling Tier 1 support tickets.
                            </p>
                            <Link href="#" className={styles.readMore}>
                                Read Tutorial <ArrowRight size={16} />
                            </Link>
                        </article>
                    </div>
                </div>

            </main>
            <Footer />
        </>
    );
}
