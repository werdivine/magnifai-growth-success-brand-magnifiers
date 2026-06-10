'use client';

import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Download } from 'lucide-react';
import Link from 'next/link';

export default function PlaybookBanner({ isColumn = false }: { isColumn?: boolean }) {
    const sponsors = ['THILERS', 'OGERTUM AI', 'TECHNOGY', 'DATAFLOW', 'AI VENTURES'];

    const content = (
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isColumn ? 'repeat(auto-fit, minmax(240px, 1fr))' : 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: isColumn ? '2rem' : '3rem',
                alignItems: 'center'
            }}>
                
                {/* LEFT PANEL: 3D Animated Book Cover */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    perspective: '1000px'
                }}>
                    <div style={{
                        position: 'relative',
                        width: isColumn ? '200px' : '260px',
                        height: isColumn ? '280px' : '360px',
                        borderRadius: '16px',
                        background: 'linear-gradient(145deg, #161233 0%, #06050d 100%)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        boxShadow: '-20px 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(139, 92, 246, 0.1)',
                        transform: 'rotateY(15deg) rotateX(10deg)',
                        transition: 'all 0.5s ease',
                        cursor: 'pointer',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        padding: isColumn ? '1.5rem' : '2.5rem'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1.05)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.9), 0 0 60px rgba(139, 92, 246, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'rotateY(15deg) rotateX(10deg)';
                        e.currentTarget.style.boxShadow = '-20px 20px 50px rgba(0,0,0,0.8), 0 0 40px rgba(139, 92, 246, 0.1)';
                    }}
                    >
                        {/* Shiny overlay */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '-50%',
                            width: '200%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.03), transparent)',
                            transform: 'rotate(45deg)'
                        }} />

                        {/* Book Spine border line */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            bottom: 0,
                            width: '8px',
                            background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)',
                            borderRight: '1px solid rgba(255,255,255,0.05)'
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{
                                fontSize: '0.65rem',
                                fontWeight: 800,
                                color: '#c4b5fd',
                                letterSpacing: '0.15em',
                                textTransform: 'uppercase'
                            }}>WeMagnifAI</span>
                            <BookOpen size={16} color="#c4b5fd" />
                        </div>

                        <div style={{ margin: isColumn ? '1.5rem 0 0.75rem' : '3rem 0 1.5rem' }}>
                            <h3 style={{
                                fontFamily: 'var(--font-playfair)',
                                fontWeight: 900,
                                fontSize: isColumn ? '1.4rem' : '2rem',
                                lineHeight: 1.1,
                                color: '#fff',
                                marginBottom: '0.5rem'
                            }}>
                                The 2026<br />AI Growth<br />Playbook
                            </h3>
                            <p style={{ color: '#22d3ee', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                                EDITION V3.4
                            </p>
                        </div>

                        <div style={{
                            fontSize: '0.65rem',
                            color: '#94a3b8',
                            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                            paddingTop: '0.75rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <span>COMPLEMENTARY GUIDE</span>
                            <span>PDF</span>
                        </div>
                    </div>
                </div>

                {/* RIGHT PANEL: Description & Download CTA */}
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '4px 16px',
                        borderRadius: '9999px',
                        background: 'rgba(217, 70, 239, 0.15)',
                        border: '1px solid rgba(217, 70, 239, 0.3)',
                        marginBottom: '1.25rem'
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d946ef', display: 'inline-block' }} />
                        <span style={{ color: '#f472b6', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>EXPERT KNOWLEDGE</span>
                    </div>

                    <h2 className="glow-text" style={{
                        fontSize: isColumn ? '1.8rem' : 'clamp(2.25rem, 4.5vw, 3.25rem)',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '1.25rem',
                        color: '#fff'
                    }}>
                        The 2026 AI<br />Growth Playbook
                    </h2>

                    <p style={{ color: '#cbd5e1', fontSize: isColumn ? '0.92rem' : '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Yes, the traditional content is broken. In this guide, we detail the exact 12 workflow formulas we deploy for scaling agencies. Master generative engine indexing, AEO strategies, and automated PR filters.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                        {[
                            'The "Legacy" funnel replacement schemas',
                            'GEO / AEO semantic maps for 2026',
                            'VSC state databases synchronization blueprints',
                            '4 custom autonomous scrapers setup'
                        ].map((bullet) => (
                            <div key={bullet} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#e2e8f0', fontSize: '0.85rem' }}>
                                <span style={{ color: '#d946ef', fontWeight: 800 }}>•</span>
                                {bullet}
                            </div>
                        ))}
                    </div>

                    {/* Action Link */}
                    <Link href="/lead-magnets/website-audit-checklist" style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '14px 28px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #d946ef 0%, #8b5cf6 100%)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1rem',
                        textDecoration: 'none',
                        boxShadow: '0 10px 30px rgba(217,70,239,0.3)',
                        transition: 'transform 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >
                        <Download size={18} />
                        Download Playbook (PDF)
                    </Link>
                </div>

            </div>

            {/* Brands/Partners Logo strip under playbook */}
            <div style={{
                marginTop: isColumn ? '3rem' : '5rem',
                paddingTop: '2rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: isColumn ? '1.5rem' : '2.5rem'
            }}>
                {sponsors.map((brand) => (
                    <div
                        key={brand}
                        style={{
                            color: '#475569',
                            fontSize: isColumn ? '0.9rem' : '1.1rem',
                            fontWeight: 800,
                            letterSpacing: '0.25em',
                            transition: 'color 0.3s ease',
                            cursor: 'default'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.color = '#94a3b8'}
                        onMouseLeave={(e) => e.currentTarget.style.color = '#475569'}
                    >
                        {brand}
                    </div>
                ))}
            </div>
        </div>
    );

    if (isColumn) {
        return (
            <div className="bg-pink-glass" style={{
                borderRadius: '20px',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(217, 70, 239, 0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #d946ef, transparent)' }} />
                {content}
            </div>
        );
    }

    return (
        <section id="playbook" style={{
            padding: '80px 2rem',
            background: 'radial-gradient(circle at center, #050512 0%, #030308 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {content}
        </section>
    );
}
