'use client';

import { FadeIn } from './FadeIn';
import Link from 'next/link';

export default function TelegramTeaser() {
    return (
        <FadeIn>
            <section style={{
                padding: '80px 2rem',
                borderTop: '1px solid rgba(var(--foreground-rgb), 0.06)',
                background: 'linear-gradient(135deg, var(--bg-secondary) 0%, #0d1a2e 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Glow */}
                <div style={{ position: 'absolute', top: '0', right: '0', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%)', zIndex: 0 }} />

                <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                        gap: '2.5rem',
                        alignItems: 'center',
                    }}>
                        <div>
                            <div style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '4px 16px',
                                borderRadius: '9999px',
                                background: 'rgba(6,182,212,0.15)',
                                border: '1px solid rgba(6,182,212,0.3)',
                                marginBottom: '1rem',
                            }}>
                                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', boxShadow: '0 0 10px #22d3ee' }} />
                                <span style={{ color: '#22d3ee', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>New Product · Live Now</span>
                            </div>
                            <h2 style={{
                                color: 'var(--foreground)',
                                fontSize: 'clamp(2rem, 4vw, 3.25rem)',
                                fontFamily: 'var(--font-playfair)',
                                fontWeight: 900,
                                lineHeight: 1.05,
                                margin: '0 0 1rem',
                            }}>
                                New: Telegram Growth Engine — Now Live
                            </h2>
                            <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '500px' }}>
                                1,284 leads scraped this week across 47 groups. Fully automated. No more manual outreach or high payrolls.
                            </p>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                gap: '0.75rem',
                                marginBottom: '1.75rem',
                            }}>
                                {['AI Group Discovery', 'GPT-4o Content Engine', 'Lead Scoring', '3-Step DM Sequences'].map(item => (
                                    <div key={item} style={{
                                        background: 'rgba(var(--foreground-rgb), 0.05)',
                                        border: '1px solid rgba(var(--foreground-rgb), 0.08)',
                                        borderRadius: '0.85rem',
                                        padding: '0.85rem 1rem',
                                        color: '#e2e8f0',
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span style={{ color: '#22d3ee' }}>✓</span> {item}
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                                <Link href="/telegram-growth" style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    padding: '1rem 1.75rem', borderRadius: '0.8rem',
                                    background: 'linear-gradient(135deg, #22d3ee, #8b5cf6)',
                                    color: '#fff', fontWeight: 800, textDecoration: 'none',
                                    boxShadow: '0 10px 20px -5px rgba(34,211,238,0.3)',
                                    transition: 'transform 0.2s'
                                }}>See How It Works →</Link>
                                <Link href="/telegram-dashboard" style={{
                                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                                    padding: '1rem 1.75rem', borderRadius: '0.8rem',
                                    background: 'rgba(255,255,255,0.05)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    color: '#fff', fontWeight: 700, textDecoration: 'none',
                                }}>View Live Dashboard</Link>
                            </div>
                        </div>
                        <div style={{
                            background: 'rgba(15,23,42,0.6)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '1.5rem',
                            padding: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
                        }}>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                                gap: '1.25rem',
                            }}>
                                {[
                                    { label: 'Groups Active', value: '47', icon: '🔍' },
                                    { label: 'Leads Scraped', value: '1,284', icon: '👤' },
                                    { label: 'DMs Sent', value: '612', icon: '✉️' },
                                    { label: 'Total Pipeline', value: '£142k', icon: '💰' },
                                ].map((stat, i) => (
                                    <div key={stat.label} style={{
                                        background: 'rgba(255,255,255,0.03)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: '12px',
                                        padding: '1.25rem',
                                        textAlign: 'center'
                                    }}>
                                        <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                                        <div style={{ color: i < 2 ? '#22d3ee' : '#34d399', fontSize: '1.75rem', fontWeight: 900, marginBottom: '0.25rem', letterSpacing: '-0.02em' }}>{stat.value}</div>
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </FadeIn>
    );
}
