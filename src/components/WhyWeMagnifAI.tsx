'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, BarChart2, ShieldCheck, MessageSquare, Code } from 'lucide-react';

export default function WhyWeMagnifAI() {
    const cards = [
        {
            title: 'Instant Execution',
            desc: 'Your automations run without human delay. Scraping, scoring, and follow-ups are triggered instantly.',
            icon: <Zap size={20} color="#22d3ee" />,
            glow: 'rgba(34, 211, 238, 0.15)'
        },
        {
            title: 'ROI Focused',
            desc: 'Every pipeline is tuned to generate revenue. Track pipeline value, conversions, and client acquisition cost.',
            icon: <TrendingUp size={20} color="#8b5cf6" />,
            glow: 'rgba(139, 92, 246, 0.15)'
        },
        {
            title: 'System Scale',
            desc: 'Deploy multiple autonomous worker agents. Handle spikes in lead volume without hiring more staff.',
            icon: <BarChart2 size={20} color="#d946ef" />,
            glow: 'rgba(217, 70, 239, 0.15)'
        },
        {
            title: 'Brand Strategy',
            desc: 'Automate content distribution and outreach while maintaining your exact brand voice guidelines.',
            icon: <ShieldCheck size={20} color="#34d399" />,
            glow: 'rgba(52, 211, 153, 0.15)'
        },
        {
            title: 'Social Proof',
            desc: 'Drive authority. Automatically monitor mention signals and leverage automated digital PR engines.',
            icon: <MessageSquare size={20} color="#3b82f6" />,
            glow: 'rgba(59, 130, 246, 0.15)'
        },
        {
            title: 'Custom Solutions',
            desc: 'Have unique flows? We code custom LLM prompts, database bridges, and tailored CRM hooks.',
            icon: <Code size={20} color="#f59e0b" />,
            glow: 'rgba(245, 158, 11, 0.15)'
        }
    ];

    return (
        <section id="why-us" style={{
            padding: '80px 2rem',
            background: 'radial-gradient(circle at center, #060613 0%, #030308 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="glow-text" style={{
                        fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        marginBottom: '1rem',
                        color: '#fff'
                    }}>
                        Why WeMagnifAI?
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '500px', margin: '0 auto' }}>
                        The core architectural pillars that build market authority and compound digital growth.
                    </p>
                </div>

                {/* 3x2 Grid */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem'
                }}>
                    {cards.map((card) => (
                        <div
                            key={card.title}
                            className="liquid-glass"
                            style={{
                                padding: '2rem',
                                borderRadius: '20px',
                                background: 'rgba(12, 13, 29, 0.4)',
                                border: '1px solid rgba(255, 255, 255, 0.05)',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '1.25rem',
                                transition: 'all 0.3s ease',
                                position: 'relative',
                                overflow: 'hidden'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-6px)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}
                        >
                            {/* Accent lighting for each card */}
                            <div style={{
                                position: 'absolute',
                                top: '-30px',
                                right: '-30px',
                                width: '100px',
                                height: '100px',
                                background: card.glow,
                                filter: 'blur(30px)',
                                borderRadius: '50%',
                                pointerEvents: 'none'
                            }} />

                            {/* Icon panel */}
                            <div style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '10px',
                                background: card.glow,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexShrink: 0
                            }}>
                                {card.icon}
                            </div>

                            <div>
                                <h3 style={{
                                    color: '#fff',
                                    fontSize: '1.15rem',
                                    fontWeight: 700,
                                    marginBottom: '0.5rem'
                                }}>
                                    {card.title}
                                </h3>
                                <p style={{
                                    color: '#94a3b8',
                                    fontSize: '0.88rem',
                                    lineHeight: 1.6
                                }}>
                                    {card.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
