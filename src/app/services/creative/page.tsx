import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { Palette, Brush, Eye, Layout, Sparkles, ArrowRight, Check } from 'lucide-react';
import styles from '../services.module.css';

export default function CreativeDesignPage() {
    return (
        <>
            <Header />
            <main className={styles.servicePage} style={{ '--accent-color': '#ec4899', '--accent-light': '#f472b6', '--icon-bg': 'rgba(236, 72, 153, 0.1)', '--icon-color': '#ec4899' } as React.CSSProperties}>

                {/* HERO */}
                <section className={styles.heroSection}>
                    <span className={styles.eyebrow}>Creative Design Services</span>
                    <h1 className={styles.heroTitle}>
                        Brands That Command Attention
                    </h1>
                    <p className={styles.heroDescription}>
                        From logo to landing page, we craft visual identities that make your audience stop scrolling and start engaging.
                    </p>
                    <Link href="/contact" className={styles.ctaButton}>
                        Start Your Brand Transformation <ArrowRight size={20} />
                    </Link>
                </section>

                {/* WHAT WE DO */}
                <section className={styles.sectionDark}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff' }}>What We Create</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8' }}>Full-spectrum creative services for modern brands.</p>

                        <div className={styles.featuresGrid}>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Palette size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Brand Identity</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Logo design, color systems, typography, and complete brand guidelines that set you apart.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Layout size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>UI/UX Design</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    User-centered interfaces that convert visitors into customers. Mobile-first, accessibility-focused.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Brush size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Marketing Collateral</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Pitch decks, social graphics, email templates, and sales assets that close deals.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Eye size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>Visual Storytelling</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Infographics, data visualizations, and motion graphics that explain complex ideas simply.
                                </p>
                            </div>
                            <div className={styles.featureCard}>
                                <div className={styles.featureIcon}><Sparkles size={28} /></div>
                                <h3 className={styles.featureTitle} style={{ color: '#fff' }}>AI-Enhanced Design</h3>
                                <p className={styles.featureDescription} style={{ color: '#94a3b8' }}>
                                    Leverage AI tools for rapid prototyping and iteration while maintaining human creative direction.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PROCESS */}
                <section className={styles.processSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Our Process</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>From concept to delivery in 4 strategic phases.</p>

                        <div className={styles.processGrid}>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>01</div>
                                <h3 className={styles.stepTitle}>Discovery</h3>
                                <p className={styles.stepDescription}>Deep dive into your brand, audience, and competitive landscape.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>02</div>
                                <h3 className={styles.stepTitle}>Strategy</h3>
                                <p className={styles.stepDescription}>Define visual direction, mood boards, and design principles.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>03</div>
                                <h3 className={styles.stepTitle}>Creation</h3>
                                <p className={styles.stepDescription}>Design, iterate, and refine until pixel-perfect.</p>
                            </div>
                            <div className={styles.processStep}>
                                <div className={styles.stepNumber}>04</div>
                                <h3 className={styles.stepTitle}>Delivery</h3>
                                <p className={styles.stepDescription}>Full asset handoff with brand guidelines and implementation support.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* PRICING */}
                <section className={styles.pricingSection}>
                    <div className={styles.container}>
                        <h2 className={styles.sectionTitle} style={{ color: '#fff', textAlign: 'center' }}>Investment Tiers</h2>
                        <p className={styles.sectionSubtitle} style={{ color: '#94a3b8', textAlign: 'center', margin: '0 auto 3rem' }}>Flexible packages for every stage of growth.</p>

                        <div className={styles.pricingGrid}>
                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Starter</h3>
                                <div className={styles.pricingPrice}>$2,500 <span>/project</span></div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Logo Design (3 concepts)</li>
                                    <li>Color Palette</li>
                                    <li>Typography Selection</li>
                                    <li>Basic Brand Guide</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButton}>Get Started</Link>
                            </div>

                            <div className={styles.pricingCardFeatured}>
                                <h3 className={styles.pricingName}>Growth</h3>
                                <div className={styles.pricingPrice}>$7,500 <span>/project</span></div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Everything in Starter</li>
                                    <li>Website UI Design</li>
                                    <li>Social Media Templates</li>
                                    <li>Pitch Deck Design</li>
                                    <li>30-Day Support</li>
                                </ul>
                                <Link href="/contact" className={styles.pricingButtonPrimary}>Most Popular</Link>
                            </div>

                            <div className={styles.pricingCard}>
                                <h3 className={styles.pricingName}>Enterprise</h3>
                                <div className={styles.pricingPrice}>Custom</div>
                                <ul className={styles.pricingFeatures}>
                                    <li>Full Brand Overhaul</li>
                                    <li>Multi-Platform Design</li>
                                    <li>Motion Graphics</li>
                                    <li>Ongoing Retainer</li>
                                    <li>Priority Support</li>
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
