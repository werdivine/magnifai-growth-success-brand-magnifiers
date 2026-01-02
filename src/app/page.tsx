'use client';

import Header from '@/components/Header';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';
import LeadCapture from '@/components/LeadCapture';
import styles from './page.module.css';
import { Bot, Zap, Globe, Rocket, Shield, ArrowRight, TrendingUp, Target, Terminal, BookOpen, ChevronRight } from 'lucide-react';
import TrustedBy from '@/components/TrustedBy';
import ValueProp from '@/components/ValueProp';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import Footer from '@/components/Footer';
import BookingWidget from '@/components/BookingWidget';
import ResourceFeed from '@/components/ResourceFeed';
import PromptCarousel from '@/components/PromptCarousel';
import MagazineGrid from '@/components/MagazineGrid';
import ROICalculator from '@/components/ROICalculator';
import FAQ from '@/components/FAQ';
import Section from '@/components/Section';
import ProblemSection from '@/components/ProblemSection';
// New Components
import InlineCTA from '@/components/InlineCTA';
import StatsCounter from '@/components/StatsCounter';
import ServicesGrid from '@/components/ServicesGrid';
import AIQuiz from '@/components/AIQuiz';
import IntelligenceBrief from '@/components/IntelligenceBrief';
import TerminalDemo from '@/components/TerminalDemo';
import { motion } from 'framer-motion';

export default function Home() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* 1. HERO (Dark Theme) - PREMIUM UPGRADED */}
                <Section theme="dark" className={styles.heroSection}>
                    <div className={styles.glowOrb1}></div>
                    <div className={styles.heroGrid}>
                        <motion.div
                            className={styles.heroContent}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.badge}>
                                <span className={styles.pulsingDot}></span> Now Accepting New Clients
                            </div>
                            <h1 className={styles.heroTitle}>
                                Your Creative &amp; Digital
                                <br />
                                <span className={styles.gradient}>Growth Partner</span>
                            </h1>

                            <p className={styles.heroDescription}>
                                We help SMBs and entrepreneurs scale with AI-powered digital marketing, creative design, and automation services that deliver real results.
                            </p>

                            <div className={styles.trustStrip}>
                                <span>Trusted by 500+ Businesses:</span>
                                <div className={styles.logoRow}>
                                    <div className={styles.logoBox}>StartupX</div>
                                    <div className={styles.logoBox}>ScaleUp</div>
                                    <div className={styles.logoBox}>GrowthCo</div>
                                </div>
                            </div>

                            <div style={{ marginTop: '3rem' }}>
                                <TerminalDemo />
                            </div>
                        </motion.div>

                        <motion.div
                            className={styles.heroFormWrapper}
                            initial={{ opacity: 0, x: 30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <BookingWidget />
                        </motion.div>
                    </div>
                </Section>

                {/* 2. TRUSTED BY + STATS (Dark Theme) */}
                <TrustedBy />
                <StatsCounter />

                {/* 3. PROBLEM (Light Theme) */}
                <ProblemSection />

                {/* 4. CTA: FREE AUDIT (After Problem) */}
                <Section theme="dark">
                    <InlineCTA variant="audit" />
                </Section>

                {/* 5. SERVICES GRID (Dark Theme) */}
                <ServicesGrid />

                {/* 6. PROMPT CAROUSEL (Vivid Theme) */}
                <PromptCarousel />

                {/* 7. INTELLIGENCE BRIEF (Dark Theme) */}
                <Section theme="dark">
                    <IntelligenceBrief />
                </Section>

                {/* 8. RESOURCE FEED (Dark Theme) */}
                <Section theme="dark">
                    <h2 className={styles.sectionTitleCenter}>The Sovereign Archives</h2>
                    <p style={{ textAlign: 'center', color: '#94a3b8', marginTop: '-2.5rem', marginBottom: '3rem' }}>
                        Specialized internal tooling, prompt libraries, and deployment frameworks.
                    </p>
                    <ResourceFeed />
                </Section>

                {/* 9. AI READINESS QUIZ (Dark Theme) */}
                <Section theme="dark">
                    <AIQuiz />
                </Section>

                {/* 9. MAGAZINE GRID (Light Theme) */}
                <MagazineGrid />

                {/* 10. CTA: NEWSLETTER (After Magazine Grid) */}
                <Section theme="dark">
                    <InlineCTA variant="newsletter" />
                </Section>

                {/* 11. VALUE PROP (Dark Theme) */}
                <Section theme="dark">
                    <ValueProp />
                </Section>

                {/* 12. CTA: CONSULTATION (After Value Prop) */}
                <Section theme="dark">
                    <InlineCTA variant="consultation" />
                </Section>

                {/* 13. ROI TOOL (Light Theme) */}
                <Section theme="light">
                    <h2 style={{ textAlign: 'center', fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: '#000', marginBottom: '1rem', lineHeight: 1 }}>Calculate Your Upside</h2>
                    <p style={{ textAlign: 'center', color: '#475569', fontSize: '1.25rem', marginBottom: '3rem' }}>Don&apos;t guess. Use our proprietary models to project your automation ROI.</p>
                    <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '3rem', borderRadius: '1.5rem', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)' }}>
                        <ROICalculator />
                    </div>
                </Section>

                {/* 14. FAQ (Light Theme) */}
                <Section theme="light">
                    <h2 style={{ textAlign: 'center', fontSize: '3.5rem', fontFamily: 'var(--font-playfair)', color: '#000', marginBottom: '4rem' }}>Frequently Asked Questions</h2>
                    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <FAQ />
                    </div>
                </Section>

                {/* 15. TESTIMONIALS (Dark Theme) */}
                <Testimonials />

                {/* 16. FINAL CTA */}
                <LeadCapture />
            </main>
            <Footer />
        </>
    );
}
