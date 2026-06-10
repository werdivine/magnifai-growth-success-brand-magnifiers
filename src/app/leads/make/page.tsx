'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/FadeIn';
import styles from '@/app/page.module.css';

export default function MakeLeadPage() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <section style={{
                    minHeight: '80vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '6rem 2rem',
                    background: 'radial-gradient(circle at center, #1a0a2e 0%, #06060f 100%)',
                    textAlign: 'center'
                }}>
                    <FadeIn>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '6px 18px',
                            background: 'rgba(139,92,246,0.1)',
                            border: '1px solid rgba(139,92,246,0.3)',
                            borderRadius: '9999px',
                            color: '#a78bfa',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '2rem'
                        }}>
                            Workflow Mastery
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 7vw, 5rem)',
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(to bottom, #fff 0%, #8b5cf6 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Make.com<br />Automation Hub
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#94a3b8',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.6
                        }}>
                            Pre-built blueprints for 2026 agentic workflows. One-click deployments for complex multi-app orchestrations.
                        </p>
                        <form 
                            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap' }} 
                            onSubmit={(e) => { e.preventDefault(); alert('Redirecting to Make.com Blueprint Library...'); }}
                        >
                            <input 
                                type="email" 
                                placeholder="Enter your work email..." 
                                required 
                                style={{ flex: '1 1 300px', padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '1.1rem', minWidth: '250px' }} 
                            />
                            <button 
                                type="submit" 
                                style={{ padding: '1.25rem 2.5rem', borderRadius: '14px', background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', color: '#fff', fontWeight: 800, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(139,92,246,0.3)', flex: '1 1 auto', whiteSpace: 'nowrap' }}
                            >
                                Download Blueprints
                            </button>
                        </form>
                        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                            ⚡ Instant 1-click deployment. No coding required.
                        </p>
                    </FadeIn>
                </section>
            </main>
            <Footer />
        </>
    );
}
