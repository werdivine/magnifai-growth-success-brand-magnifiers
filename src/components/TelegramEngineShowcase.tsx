'use client';

import { motion } from 'framer-motion';
import { Send, Check, Shield, Compass, Cpu, Target } from 'lucide-react';
import Link from 'next/link';

export default function TelegramEngineShowcase({ isColumn = false }: { isColumn?: boolean }) {
    const content = (
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
            <div style={{
                display: 'grid',
                gridTemplateColumns: isColumn ? '1fr' : 'repeat(auto-fit, minmax(320px, 1fr))',
                gap: isColumn ? '2.5rem' : '3.5rem',
                alignItems: 'center'
            }}>
                
                {/* LEFT PANEL: Copy & CTAs */}
                <div>
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '4px 16px',
                        borderRadius: '9999px',
                        background: 'rgba(34, 211, 238, 0.15)',
                        border: '1px solid rgba(34, 211, 238, 0.3)',
                        marginBottom: '1.25rem'
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22d3ee', display: 'inline-block', boxShadow: '0 0 10px #22d3ee' }} />
                        <span style={{ color: '#22d3ee', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em' }}>AI MARKETING ENGINE</span>
                    </div>
                    
                    <h2 style={{
                        fontSize: isColumn ? '2rem' : 'clamp(2.25rem, 5vw, 3.25rem)',
                        fontFamily: 'var(--font-inter)',
                        fontWeight: 900,
                        lineHeight: 1.05,
                        margin: '0 0 1.25rem',
                        color: '#fff'
                    }}>
                        New: Telegram<br />Growth Engine — Now
                    </h2>
                    
                    <p style={{ color: '#cbd5e1', fontSize: isColumn ? '0.92rem' : '1.05rem', lineHeight: 1.7, marginBottom: '2rem' }}>
                        Since building custom client acquisition loops, we customized them to scrape, index, score, and engage prospective agencies autonomously. Run continuous growth workflows at 10x lower cost.
                    </p>

                    {/* Interactive Feature List */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '1rem',
                        marginBottom: '2.5rem'
                    }}>
                        {[
                            { label: 'Scrape Groups', icon: <Compass size={14} color="#22d3ee" /> },
                            { label: 'GPT-4o Sequence', icon: <Cpu size={14} color="#22d3ee" /> },
                            { label: 'Lead Scoring', icon: <Target size={14} color="#22d3ee" /> },
                            { label: 'Autonomous DMs', icon: <Shield size={14} color="#22d3ee" /> }
                        ].map((item) => (
                            <div key={item.label} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.6rem',
                                background: 'rgba(255, 255, 255, 0.03)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                borderRadius: '12px',
                                padding: '0.8rem 1rem',
                                color: '#e2e8f0',
                                fontSize: '0.8rem',
                                fontWeight: 600
                            }}>
                                {item.icon}
                                {item.label}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        <Link href="/leads/telegram" className="shimmer-btn" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '14px 28px',
                            borderRadius: '12px',
                            background: 'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '1rem',
                            textDecoration: 'none',
                            position: 'relative',
                            boxShadow: '0 10px 30px rgba(34,211,238,0.3)'
                        }}>
                            Start Building with AI
                        </Link>
                        <Link href="/services" style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '14px 28px',
                            borderRadius: '12px',
                            background: 'rgba(255, 255, 255, 0.03)',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            color: '#fff',
                            fontWeight: 700,
                            fontSize: '1rem',
                            textDecoration: 'none',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
                        >
                            View Our Services
                        </Link>
                    </div>
                </div>

                {/* RIGHT PANEL: Stats Grid + Floating 3D Graphic */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    alignItems: 'center',
                    width: '100%'
                }}>
                    {/* Stats Grid */}
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                        gap: '1rem',
                        width: '100%'
                    }}>
                        {[
                            { val: '29', label: 'Scrapers Deploy' },
                            { val: '1,500+', label: 'Active Leads' },
                            { val: '386', label: 'DMs Processed' },
                            { val: '31.8%', label: 'Conversion Lift' }
                        ].map((stat, idx) => (
                            <div key={stat.label} style={{
                                padding: '1rem',
                                borderRadius: '16px',
                                textAlign: 'center',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                background: 'rgba(3, 3, 8, 0.8)'
                            }}>
                                <div style={{
                                    color: idx % 2 === 0 ? '#22d3ee' : '#c4b5fd',
                                    fontSize: '1.5rem',
                                    fontWeight: 900,
                                    marginBottom: '0.25rem',
                                    letterSpacing: '-0.02em'
                                }}>{stat.val}</div>
                                <div style={{ color: '#94a3b8', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Floating 3D Holographic Platform Visual */}
                    <div style={{
                        position: 'relative',
                        width: '280px',
                        height: '180px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '0.5rem'
                    }}>
                        {/* Hologram Rings */}
                        <div className="rotate-slow" style={{
                            position: 'absolute',
                            width: '180px',
                            height: '180px',
                            border: '1px dashed rgba(34, 211, 238, 0.2)',
                            borderRadius: '50%',
                            transform: 'rotateX(75deg)'
                        }} />
                        <div className="rotate-slow" style={{
                            position: 'absolute',
                            width: '140px',
                            height: '140px',
                            border: '2px solid rgba(139, 92, 246, 0.3)',
                            borderRadius: '50%',
                            transform: 'rotateX(75deg) rotate(45deg)'
                        }} />

                        {/* Base Glowing Platform */}
                        <div style={{
                            position: 'absolute',
                            width: '110px',
                            height: '110px',
                            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.4) 0%, transparent 70%)',
                            borderRadius: '50%',
                            transform: 'rotateX(75deg)',
                            boxShadow: '0 10px 40px rgba(34, 211, 238, 0.6)'
                        }} />

                        {/* Floating Telegram Envelope Logo */}
                        <div className="float-3d" style={{
                            position: 'relative',
                            width: '60px',
                            height: '60px',
                            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 20px 40px rgba(34, 211, 238, 0.5), inset 0 2px 2px rgba(255,255,255,0.4)',
                            zIndex: 5
                        }}>
                            <Send size={28} color="#fff" style={{ transform: 'translateX(-2px) translateY(1px)' }} />
                        </div>

                        {/* Particle Rays emanating upwards */}
                        <div style={{
                            position: 'absolute',
                            bottom: '40px',
                            width: '2px',
                            height: '60px',
                            background: 'linear-gradient(to top, rgba(34, 211, 238, 0.8), transparent)',
                            filter: 'blur(1px)'
                        }} />
                    </div>

                </div>

            </div>
        </div>
    );

    if (isColumn) {
        return (
            <div style={{
                background: '#080812',
                border: '1px solid rgba(139, 92, 246, 0.4)',
                borderRadius: '20px',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(139, 92, 246, 0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #8b5cf6, transparent)' }} />
                {content}
            </div>
        );
    }

    return (
        <section style={{
            padding: '80px 2rem',
            background: 'linear-gradient(135deg, #04040d 0%, #0c0d24 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {/* Ambient Cyan backlighting */}
            <div style={{
                position: 'absolute',
                top: '50%',
                right: '-10%',
                width: '450px',
                height: '450px',
                background: 'radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%)',
                filter: 'blur(50px)',
                pointerEvents: 'none'
            }} />
            {content}
        </section>
    );
}
