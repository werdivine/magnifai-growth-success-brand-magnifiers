import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';
import Link from 'next/link';
import { CheckCircle, Zap, TrendingUp, Clock, ArrowRight } from 'lucide-react';

export default function AIAutomationService() {
    return (
        <>
            <Header />
            <main style={{ minHeight: '100vh' }}>

                {/* HERO */}
                <section className={styles.hero}>
                    <div className={styles.heroTag}>Agency Service</div>
                    <h1 className={styles.heroTitle}>We Build the Machine That <span>Runs Your Business.</span></h1>
                    <p className={styles.heroDesc}>
                        Stop renting generic AI tools. We build custom, autonomous agent swarms that handle your Marketing, Sales, and Ops 24/7.
                    </p>
                    <div className={styles.ctaGroup}>
                        <Link href="#pricing" className={styles.ctaPrimary}>View Plans</Link>
                        <Link href="/insights" className={styles.ctaSecondary}>Read Our Strategy</Link>
                    </div>
                </section>

                {/* CONCEPT / DIAGRAM */}
                <section className={styles.diagramSection}>
                    <div className={styles.diagramContainer}>
                        <div>
                            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>From &quot;Chaos&quot; to &quot;Clockwork&quot;</h2>
                            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                                Most agencies sell &quot;tasks&quot;. We sell &quot;systems&quot;. We map your entire operational workflow, identify the bottlenecks, and deploy custom Make.com + OpenAI swarms to eliminate them.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0 }}>
                                {[
                                    'Zero-Touch Lead Qualification',
                                    'Autonomous Content Research & Drafting',
                                    '24/7 Customer Support Triage',
                                    'Automated Invoicing & Follow-up'
                                ].map((item, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff', marginBottom: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.5rem' }}>
                                        <CheckCircle size={20} color="var(--primary)" /> {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className={styles.diagramBox}>
                            {/* Abstract representation of a workflow */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', opacity: 0.8 }}>
                                <div style={{ padding: '1rem 2rem', border: '1px solid #fff', borderRadius: '0.5rem', color: '#fff' }}>Input: New Lead (Typeform)</div>
                                <ArrowRight style={{ transform: 'rotate(90deg)' }} color="#64748b" />
                                <div style={{ display: 'flex', gap: '2rem' }}>
                                    <div style={{ padding: '1rem', background: 'var(--primary-glow)', border: '1px solid var(--primary)', borderRadius: '0.5rem', color: '#fff' }}>AI Qualifier (GPT-4)</div>
                                    <div style={{ padding: '1rem', background: 'var(--secondary-glow)', border: '1px solid var(--secondary)', borderRadius: '0.5rem', color: '#fff' }}>CRM Update (Hubspot)</div>
                                </div>
                                <ArrowRight style={{ transform: 'rotate(90deg)' }} color="#64748b" />
                                <div style={{ padding: '1rem 2rem', border: '1px solid #fff', borderRadius: '0.5rem', color: '#fff' }}>Output: Booked Call in Calendly</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CASE STUDY METRICS */}
                <section className={styles.caseStudySection}>
                    <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                        <h2 style={{ fontSize: '2.5rem', color: '#fff' }}>The &quot;Compound Effect&quot; of Automation</h2>
                        <p style={{ color: '#94a3b8' }}>Real results from our Client Portfolio (Q3 2025)</p>
                    </div>

                    <div className={styles.metricGrid}>
                        <div className={styles.metricCard}>
                            <Clock size={32} color="var(--primary)" style={{ marginBottom: '1rem' }} />
                            <div className={styles.metricValue}>40h+</div>
                            <div className={styles.metricLabel}>Weekly Admin Saved</div>
                        </div>
                        <div className={styles.metricCard}>
                            <TrendingUp size={32} color="var(--secondary)" style={{ marginBottom: '1rem' }} />
                            <div className={styles.metricValue}>3.5x</div>
                            <div className={styles.metricLabel}>Lead Response Speed</div>
                        </div>
                        <div className={styles.metricCard}>
                            <Zap size={32} color="var(--accent)" style={{ marginBottom: '1rem' }} />
                            <div className={styles.metricValue}>$12k</div>
                            <div className={styles.metricLabel}>Monthly OpEx Reduced</div>
                        </div>
                    </div>
                </section>

                {/* CTA / PRICING TEASER */}
                <section id="pricing" className={styles.pricingSection}>
                    <div className={styles.pricingCard}>
                        <h3 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-playfair)' }}>Custom Workflow Audit</h3>
                        <p style={{ color: '#94a3b8', marginBottom: '2rem', lineHeight: 1.6 }}>
                            We don&apos;t sell &quot;packages&quot; off the shelf. We start with a deep-dive audit of your business processes.
                        </p>
                        <div style={{ fontSize: '3rem', fontWeight: 700, color: '#fff', marginBottom: '2rem' }}>
                            $497 <span style={{ fontSize: '1rem', fontWeight: 400, color: '#64748b' }}>/ One-time</span>
                        </div>
                        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem', color: '#e2e8f0' }}>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} /> Full MFP Analysis</li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} /> Custom Architecture Map</li>
                            <li style={{ marginBottom: '0.5rem', display: 'flex', gap: '0.5rem' }}><CheckCircle size={16} /> ROI Projection Model</li>
                        </ul>
                        <button style={{ width: '100%', padding: '1rem', background: '#fff', border: 'none', borderRadius: '0.5rem', fontWeight: 700, fontSize: '1rem', cursor: 'pointer' }}>
                            Book Audit Call
                        </button>
                        <p style={{ fontSize: '0.85rem', color: '#64748b', textAlign: 'center', marginTop: '1rem' }}>
                            100% Money-back guarantee if we can&apos;t find $5k/mo in savings.
                        </p>
                    </div>
                </section>

            </main>
            <Footer />
        </>
    );
}
