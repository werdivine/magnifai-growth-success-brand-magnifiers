'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { FadeIn } from '@/components/FadeIn';
import styles from '@/app/page.module.css';
import Image from 'next/image';

export default function PlaybookLeadPage() {
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
                    background: 'radial-gradient(circle at center, #06060f 0%, #000 100%)',
                    textAlign: 'center'
                }}>
                    <FadeIn>
                        <div style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '6px 18px',
                            background: 'rgba(255,255,255,0.05)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '9999px',
                            color: '#fff',
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            marginBottom: '2rem'
                        }}>
                            Free Resource · 4,200+ Downloads
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(3rem, 7vw, 5rem)',
                            fontFamily: 'var(--font-playfair)',
                            fontWeight: 900,
                            lineHeight: 1.1,
                            marginBottom: '1.5rem',
                            background: 'linear-gradient(to bottom, #fff 0%, #64748b 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            The 2026 AI<br />Growth Playbook
                        </h1>
                        <p style={{
                            fontSize: '1.25rem',
                            color: '#94a3b8',
                            maxWidth: '700px',
                            margin: '0 auto 3rem',
                            lineHeight: 1.6
                        }}>
                            45 pages of pure tactical intelligence. Learn the exact agentic swarms we use to scale agencies to £100k+ months in 2026.
                        </p>
                        <form 
                            style={{ display: 'flex', gap: '1rem', justifyContent: 'center', width: '100%', maxWidth: '600px', margin: '0 auto', flexWrap: 'wrap', marginBottom: '4rem' }} 
                            onSubmit={(e) => { e.preventDefault(); alert('Sending PDF to your inbox...'); }}
                        >
                            <input 
                                type="email" 
                                placeholder="Where should we send the playbook?" 
                                required 
                                style={{ flex: '1 1 300px', padding: '1.25rem 1.5rem', borderRadius: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', outline: 'none', fontSize: '1.1rem', minWidth: '250px' }} 
                            />
                            <button 
                                type="submit" 
                                style={{ padding: '1.25rem 2.5rem', borderRadius: '14px', background: '#fff', color: '#000', fontWeight: 800, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 20px 40px rgba(255,255,255,0.2)', flex: '1 1 auto', whiteSpace: 'nowrap' }}
                            >
                                Send Me The Strategy
                            </button>
                        </form>
                        
                        <div style={{
                            position: 'relative',
                            width: '300px',
                            height: '400px',
                            margin: '0 auto',
                            boxShadow: '0 50px 100px -20px rgba(0,0,0,0.5)',
                            borderRadius: '8px',
                            overflow: 'hidden',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                             {/* Placeholder for Ebook Image */}
                             <div style={{
                                 width: '100%',
                                 height: '100%',
                                 background: 'linear-gradient(45deg, #0f172a 0%, #1e293b 100%)',
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 color: '#fff',
                                 padding: '2rem',
                                 textAlign: 'center'
                             }}>
                                 <div>
                                     <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>AI Growth Playbook</h3>
                                     <p style={{ fontSize: '0.8rem', opacity: 0.6 }}>2026 Edition</p>
                                 </div>
                             </div>
                        </div>
                    </FadeIn>
                </section>
            </main>
            <Footer />
        </>
    );
}
