import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Agency() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <div className={styles.hero}>
                    <h1 className={styles.title}>Automate Your Growth.</h1>
                    <p className={styles.subtitle}>We build custom AI agents and workflows for high-growth companies. From lead gen to operations.</p>
                    <Link href="#contact" className={styles.cta}>
                        Book Consultation <ArrowRight size={18} style={{ marginLeft: 8 }} />
                    </Link>
                </div>
                <div className={styles.servicesGrid}>
                    <div className={styles.card}>
                        <h3>Custom LLM Agents</h3>
                        <p>Tailored bots trained on your data to handle support, sales, and internal queries.</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Workflow Automation</h3>
                        <p>Seamless integrations with Zapier and Make to eliminate manual grunt work.</p>
                    </div>
                    <div className={styles.card}>
                        <h3>SEO Domination</h3>
                        <p>AI-at-scale content strategy that captures thousands of keywords.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
