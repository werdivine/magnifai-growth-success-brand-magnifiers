import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Code, Globe, Smartphone, Gauge, Shield, ArrowRight } from 'lucide-react';
import styles from '../services.module.css';

export default function DevelopmentPage() {
    return (
        <>
            <Header />
            <main className={styles.servicePage} style={{ '--accent-color': '#f59e0b', '--accent-light': '#fbbf24', '--icon-bg': 'rgba(245, 158, 11, 0.1)', '--icon-color': '#f59e0b' } as React.CSSProperties}>

                {/* HERO */}
                <section className={styles.heroSection}>
                    <span className={styles.eyebrow}>Web Development Services</span>
                    <h1 className={styles.heroTitle}>
                        Websites That Work as Hard as You Do
                    </h1>
                    <p className={styles.heroDescription}>
                        Fast, beautiful, and built to convert. Modern web applications using the latest technology stack.
                    </p>
                    <Link href="/contact" className={styles.ctaButton}>
                        Start Your Project <ArrowRight size={20} />
                    </Link>
                </section>

                {/* WHAT WE DO */}
                <section className={styles.sectionDark}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>Development Services</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>From landing pages to full-stack applications.</p>

                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Globe size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Marketing Websites</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    High-converting landing pages and corporate sites. SEO-optimized, blazing fast.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Code size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Web Applications</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Custom dashboards, SaaS products, and internal tools. React, Next.js, Node.js.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Smartphone size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>E-Commerce</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Shopify, WooCommerce, or custom checkout experiences. Payment integration included.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Gauge size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Performance Optimization</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Speed audits, Core Web Vitals fixes, and infrastructure upgrades for existing sites.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Shield size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Maintenance & Support</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Ongoing updates, security patches, and feature additions. Peace of mind included.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* TECH STACK */}
                <section className={styles.sectionLight}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#0f172a', textAlign: 'center' }}>Our Tech Stack</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#64748b', textAlign: 'center', margin: '0 auto 3rem' }}>Modern tools for modern businesses.</p>

                        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', maxWidth: '800px', margin: '0 auto' }}>
                            {['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Vercel', 'AWS', 'Stripe', 'Shopify', 'WordPress', 'Tailwind CSS', 'Prisma'].map((tech) => (
                                <span key={tech} style={{
                                    padding: '0.75rem 1.5rem',
                                    background: '#f1f5f9',
                                    borderRadius: '9999px',
                                    fontWeight: 600,
                                    color: '#334155',
                                    fontSize: '0.9rem'
                                }}>
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section className={styles.processSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Development Process</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>Transparent, collaborative, on-time.</p>

                        <div className={styles.processGrid}>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>01</div>
                                <h3 className={styles.stepTitle}>Discovery</h3>
                                <p className={styles.stepDescription}>Requirements gathering, wireframes, and technical planning.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>02</div>
                                <h3 className={styles.stepTitle}>Design</h3>
                                <p className={styles.stepDescription}>UI mockups, design system, and client approval.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>03</div>
                                <h3 className={styles.stepTitle}>Development</h3>
                                <p className={styles.stepDescription}>Agile sprints with weekly demos. You see progress live.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>04</div>
                                <h3 className={styles.stepTitle}>Launch</h3>
                                <p className={styles.stepDescription}>QA testing, deployment, and post-launch support.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Project Pricing</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>Fixed-price projects with clear deliverables.</p>

                        <div className={styles.pricingGrid}>
                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Landing Page</h3>
                                <div className={styles.pricingPrice}>$3,500</div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Single Page Design</li>
                                    <li>Mobile Responsive</li>
                                    <li>Contact Form</li>
                                    <li>SEO Basics</li>
                                    <li>2 Revision Rounds</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButton}>Get Started</Link>
                            </div>

                            <div className={styles.pricingCardFeatured}>
                                <h3 className={styles.pricingName}>Business Website</h3>
                                <div className={styles.pricingPrice}>$10,000</div>
                                <ul className={styles.pricingFeatures}>
                                    <li>5-10 Pages</li>
                                    <li>CMS Integration</li>
                                    <li>Blog Setup</li>
                                    <li>Analytics Dashboard</li>
                                    <li>30-Day Support</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButtonPrimary}>Most Popular</Link>
                            </div>

                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Custom Application</h3>
                                <div className={styles.pricingPrice}>$25,000+</div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Full-Stack Development</li>
                                    <li>User Authentication</li>
                                    <li>API Integrations</li>
                                    <li>Database Design</li>
                                    <li>Ongoing Maintenance</li>
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
