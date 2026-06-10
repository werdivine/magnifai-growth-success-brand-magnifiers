import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import NewsletterInline from '@/components/NewsletterInline';
import { resources, featuredResources, categories } from '@/content/resources-data';
import type { Metadata } from 'next';
import styles from './page.module.css';
import { FadeIn } from '@/components/FadeIn';

export const metadata: Metadata = {
    title: 'Resource Hub | WeMagnifAI',
    description: 'Free guides, templates, and tools for B2B engineering and growth.',
};

const categoryIcons: Record<string, string> = {
    Guide: '📖', Template: '📋', Calculator: '🧮', Comparison: '⚖️', 'Case Study': '📁', Insight: '💡',
};

const categoryColors: Record<string, string> = {
    Guide: '#818cf8', Template: '#34d399', Calculator: '#fbbf24', Comparison: '#f472b6', 'Case Study': '#60a5fa', Insight: '#a78bfa',
};

export default function ResourcesHub() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* HERO */}
                <section className={styles.heroSection}>
                    <div className={styles.heroContainer}>
                        <div className={styles.badge}>📚 Free Resource Library</div>
                        <h1 className={styles.heroTitle}>
                            Frameworks for<br />
                            <span>Digital Dominance</span>
                        </h1>
                        <p className={styles.heroDescription}>
                            Proprietary guides and tools built for high-scale agencies and B2B growth teams. No paywalls. No fluff. Strictly engineered for results.
                        </p>
                        <div className={styles.resourceStats}>
                            20+ High-Value Resources · Updated Monthly
                        </div>
                    </div>
                </section>

                {/* FEATURED */}
                <section className={styles.featuredSection}>
                    <div className={styles.sectionContainer}>
                        <h2 className={styles.sectionTitle}>Featured Systems</h2>
                        <div className={styles.featuredGrid}>
                            {featuredResources.map(resource => (
                                <Link key={resource.id} href={resource.href} className={styles.featuredCard}>
                                    <div className={styles.cardIcon}>{resource.icon}</div>
                                    <div className={styles.categoryBadge} style={{ 
                                        background: `${categoryColors[resource.category]}20`,
                                        color: categoryColors[resource.category],
                                        borderColor: `${categoryColors[resource.category]}40`
                                    }}>
                                        {categoryIcons[resource.category]} {resource.category}
                                    </div>
                                    <h3 className={styles.cardTitle}>{resource.title}</h3>
                                    <p className={styles.cardDesc}>{resource.description}</p>
                                    <div className={styles.cardMeta}>
                                        <span className={styles.readTime}>🕐 {resource.readTime}</span>
                                        <span className={styles.actionLink}>Access Now →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NEWSLETTER */}
                <FadeIn>
                    <section className={styles.newsletterSection}>
                        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                            <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
                                Growth Intelligence
                            </h2>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
                                Get our latest frameworks and tool updates delivered weekly to your inbox.
                            </p>
                            <NewsletterInline />
                        </div>
                    </section>
                </FadeIn>

                {/* ALL RESOURCES */}
                <section className={styles.filterSection}>
                    <div className={styles.sectionContainer}>
                        <div className={styles.tabs}>
                            <div className={`${styles.tab} ${styles.active}`}>All Categories</div>
                            {categories.map(cat => (
                                <div key={cat} className={styles.tab}>{cat}</div>
                            ))}
                        </div>

                        {categories.map(cat => {
                            const catResources = resources.filter(r => r.category === cat);
                            return (
                                <div key={cat} className={styles.categoryGroup}>
                                    <div className={styles.categoryHeader}>
                                        <h3 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-playfair)', color: 'var(--text-primary)' }}>{cat}s</h3>
                                        <div style={{ flexGrow: 1, height: '1px', background: 'var(--glass-border)' }}></div>
                                        <span style={{ color: categoryColors[cat], fontWeight: 700, fontSize: '0.8rem' }}>{catResources.length} ITEMS</span>
                                    </div>
                                    <div className={styles.resourceGrid}>
                                        {catResources.map(resource => (
                                            <Link key={resource.id} href={resource.href} className={styles.featuredCard} style={{ padding: '1.5rem' }}>
                                                <div className={styles.cardIcon} style={{ fontSize: '2rem' }}>{resource.icon}</div>
                                                <h4 className={styles.cardTitle} style={{ fontSize: '1.1rem' }}>{resource.title}</h4>
                                                <p className={styles.cardDesc} style={{ fontSize: '0.9rem' }}>{resource.description}</p>
                                                <div className={styles.cardMeta} style={{ paddingTop: '1rem' }}>
                                                    <span className={styles.readTime}>🕐 {resource.readTime}</span>
                                                    <span className={styles.actionLink}>Open →</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section style={{ padding: '100px 2rem', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', textAlign: 'center' }}>
                    <div style={{ maxWidth: '700px', margin: '0 auto' }}>
                        <h2 className={styles.sectionTitle}>Can't find what you need?</h2>
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>
                            Our engineering team builds bespoke AI tools and strategy playbooks for agencies doing £50k+/mo.
                        </p>
                        <Link href="/book" style={{
                            display: 'inline-flex', padding: '1rem 2.5rem', borderRadius: '12px', background: 'var(--brand-primary)', color: '#fff', fontWeight: 700, textDecoration: 'none'
                        }}>Book a System Audit</Link>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
