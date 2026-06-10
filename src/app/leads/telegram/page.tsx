'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/FadeIn';
import styles from '@/app/page.module.css';

export default function TelegramLeadPage() {
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
                    background: 'radial-gradient(circle at center, #0a192f 0%, #06060f 100%)',
                    textAlign: 'center'
                }}>
                    <FadeIn>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '6px 18px',
                            background: 'rgba(34,211,238,0.1)',
                            border: '1px solid rgba(34,211,238,0.3)',
                            borderRadius: '9999px',
                            color: '#22d3ee',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '2rem'
                        }}>
                            New Release: v2.4.1
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 7vw, 5rem)',
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(to bottom, #fff 0%, #94a3b8 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Telegram Growth<br />Engine
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#94a3b8',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.6
                        }}>
                            The most advanced AI-powered lead extraction and outreach system for Telegram. Scrape, score, and close at scale.
                        </p>
                        <form 
                            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap' }} 
                            onSubmit={(e) => { e.preventDefault(); alert('Redirecting to Telegram Engine Dashboard...'); }}
                        >
                            <input 
                                type="email" 
                                placeholder="Enter your work email..." 
                                required 
                                style={{ flex: '1 1 300px', padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '1.1rem', minWidth: '250px' }} 
                            />
                            <button 
                                type="submit" 
                                style={{ padding: '1.25rem 2.5rem', borderRadius: '14px', background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)', color: '#fff', fontWeight: 800, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(34,211,238,0.3)', flex: '1 1 auto', whiteSpace: 'nowrap' }}
                            >
                                Get Instant Access
                            </button>
                        </form>
                        <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
                            🔒 Secure access. Join 2,500+ top-tier agencies currently scaling.
                        </p>
                    </FadeIn>
                </section>
            </main>
            <Footer />
        </>
    );
}
