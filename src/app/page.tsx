import Header from '@/components/Header';
import { BentoGrid, BentoItem } from '@/components/BentoGrid';
import styles from './page.module.css';
import { Bot, Zap, Globe, Database } from 'lucide-react';
import TrustedBy from '@/components/TrustedBy';
import Testimonials from '@/components/Testimonials';
import Link from 'next/link';
import Footer from '@/components/Footer';
import ServicesGrid from '@/components/ServicesGrid';
import TerminalDemo from '@/components/TerminalDemo';

import { SliceZone } from "@prismicio/react";
import { createClient } from "@/lib/prismic";
import { components } from "@/slices";

import { Render } from '@measured/puck'
import { config } from '@/lib/puck-config'
import fs from 'fs'
import path from 'path'

// Try to load content: Puck -> Prismic -> Static Fallback
async function getPageData() {
    // 1. Try Puck Local Data
    try {
        const DATA_FILE = path.join(process.cwd(), 'src/content/puck-data.json')
        if (fs.existsSync(DATA_FILE)) {
            const fileContent = fs.readFileSync(DATA_FILE, 'utf-8')
            const puckData = JSON.parse(fileContent)
            // Only use Puck if it has actual content
            if (puckData.content && puckData.content.length > 0) {
                return { type: 'puck' as const, data: puckData }
            }
        }
    } catch (e) {
        console.error('Puck load failed', e)
    }

    // 2. Try Prismic (only if explicitly enabled)
    if (process.env.ENABLE_PRISMIC === 'true') {
        try {
            const client = createClient();
            const page = await client.getSingle("homepage" as any);
            return { type: 'prismic' as const, page };
        } catch (error) {
            console.log('Prismic unavailable, using static fallback');
        }
    }

    // 3. Static fallback
    return { type: 'static' as const, page: null };
}

export default async function Home() {
    const data = await getPageData();

    // If Puck content is available, render it
    if (data.type === 'puck') {
        return (
            <>
                <Header />
                <main className={styles.main}>
                    <Render config={config} data={data.data} />
                </main>
                <Footer />
            </>
        );
    }

    // If Prismic content is available, use SliceZone
    if (data.type === 'prismic' && data.page) {
        return (
            <>
                <Header />
                <main className={styles.main}>
                    <SliceZone slices={data.page.data.slices} components={components} />
                </main>
                <Footer />
            </>
        );
    }

    // Static fallback homepage
    return (
        <>
            <Header />
            <main className={styles.main}>
                {/* Hero Section */}
                <section className={styles.heroSection}>
                    <div className={styles.heroContent}>
                        <div className={styles.badge}>
                            <Zap size={14} />
                            <span>v2.0.0 Now Live</span>
                        </div>

                        <h1 className={styles.heroTitle}>
                            The Growth Engine<br />For Scaling Agencies
                        </h1>

                        <p className={styles.heroDescription}>
                            Stop relying on luck. We build automated AI pipelines that specifically target, nurture, and close your ideal clients. No fluff. Just code &amp; revenue.
                        </p>

                        <div className={styles.ctaGroup}>
                            <Link href="/book" className={styles.primaryCta}>
                                Start Growth Engine
                            </Link>
                            <Link href="/case-studies" className={styles.secondaryCta}>
                                View System Architecture
                            </Link>
                        </div>

                        <TerminalDemo />
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

                {/* Trusted By */}
                <TrustedBy />

                {/* Architecture Section */}
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
            </main>
            <Footer />
        </>
    );
}

export async function generateMetadata() {
    if (process.env.ENABLE_PRISMIC === 'true') {
        try {
            const client = createClient();
            const page = await client.getSingle("homepage" as any);
            return {
                title: page.data.meta_title || 'WeMagnifAI - The AI Growth Engine',
                description: page.data.meta_description || 'We build automated AI pipelines that target, nurture, and close your ideal clients.',
            };
        } catch {
            // Fall through to default
        }
    }
    return {
        title: 'WeMagnifAI - The AI Growth Engine',
        description: 'We build automated AI pipelines that target, nurture, and close your ideal clients.',
    };
}
