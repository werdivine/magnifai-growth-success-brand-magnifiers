import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Megaphone, Target, TrendingUp, BarChart3, Mail, ArrowRight } from 'lucide-react';
import styles from '../services.module.css';

export default function MarketingPage() {
    return (
        <>
            <Header />
            <main className={styles.servicePage} style={{ '--accent-color': '#6366f1', '--accent-light': '#818cf8', '--icon-bg': 'rgba(99, 102, 241, 0.1)', '--icon-color': '#6366f1' } as React.CSSProperties}>

                {/* HERO */}
                <section className={styles.heroSection}>
                    <span className={styles.eyebrow}>Digital Marketing Services</span>
                    <h1 className={styles.heroTitle}>
                        Marketing That Actually Moves Needles
                    </h1>
                    <p className={styles.heroDescription}>
                        Data-driven campaigns that turn strangers into customers. SEO, paid ads, content, and automation working in perfect harmony.
                    </p>
                    <Link href="/contact" className={styles.ctaButton}>
                        Book Your Strategy Call <ArrowRight size={20} />
                    </Link>
                </section>

                {/* WHAT WE DO */}
                <section className={styles.sectionDark}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Our Marketing Stack</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>Full-funnel expertise from awareness to conversion.</p>

                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Target size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>SEO & Content</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Rank for keywords that matter. AI-assisted content creation at scale without sacrificing quality.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><BarChart3 size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Paid Advertising</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Google Ads, Meta Ads, LinkedIn. ROAS-focused campaigns with continuous optimization.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Mail size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Email Marketing</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Automated sequences that nurture leads while you sleep. Personalization at scale.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Megaphone size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Social Media</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Strategic content calendars, community management, and influencer partnerships.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><TrendingUp size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Growth Analytics</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Custom dashboards, attribution modeling, and actionable insights to guide decisions.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section className={styles.processSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Our Process</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>Systematic growth, not random tactics.</p>

                        <div className={styles.processGrid}>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>01</div>
                                <h3 className={styles.stepTitle}>Audit</h3>
                                <p className={styles.stepDescription}>Analyze current performance, competitors, and opportunities.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>02</div>
                                <h3 className={styles.stepTitle}>Strategy</h3>
                                <p className={styles.stepDescription}>Build a roadmap with clear KPIs and channel priorities.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>03</div>
                                <h3 className={styles.stepTitle}>Execute</h3>
                                <p className={styles.stepDescription}>Launch campaigns, create content, optimize continuously.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>04</div>
                                <h3 className={styles.stepTitle}>Scale</h3>
                                <p className={styles.stepDescription}>Double down on winners, cut losers, expand reach.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Marketing Retainers</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>Ongoing partnership for sustainable growth.</p>

                        <div className={styles.pricingGrid}>
                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Foundation</h3>
                                <div className={styles.pricingPrice}>$3,000 <span>/month</span></div>
                                <ul className={styles.pricingFeatures}>
                                    <li>SEO Strategy & Execution</li>
                                    <li>4 Blog Posts/Month</li>
                                    <li>Social Media Management</li>
                                    <li>Monthly Reporting</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButton}>Get Started</Link>
                            </div>

                            <div className={styles.pricingCardFeatured}>
                                <h3 className={styles.pricingName}>Accelerator</h3>
                                <div className={styles.pricingPrice}>$7,500 <span>/month</span></div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Everything in Foundation</li>
                                    <li>Paid Ad Management</li>
                                    <li>Email Automation Setup</li>
                                    <li>Conversion Optimization</li>
                                    <li>Weekly Strategy Calls</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButtonPrimary}>Most Popular</Link>
                            </div>

                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Enterprise</h3>
                                <div className={styles.pricingPrice}>$15,000+ <span>/month</span></div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Full Marketing Team</li>
                                    <li>Multi-Channel Campaigns</li>
                                    <li>Advanced Analytics</li>
                                    <li>Dedicated Account Manager</li>
                                    <li>24/7 Support</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButton}>Contact Us</Link>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
