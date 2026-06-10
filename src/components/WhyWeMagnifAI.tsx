'use client';

import { motion } from 'framer-motion';
import { Zap, TrendingUp, BarChart2, ShieldCheck, MessageSquare, Code } from 'lucide-react';

export default function WhyWeMagnifAI({ isColumn = false }: { isColumn?: boolean }) {
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

    const content = (
        <div style={{ width: '100%', position: 'relative', zIndex: 10 }}>
            {/* Header */}
            <div style={{ textAlign: isColumn ? 'left' : 'center', marginBottom: isColumn ? '2rem' : '4rem' }}>
                <h2 style={{
                    fontSize: isColumn ? '1.5rem' : 'clamp(2.25rem, 4.5vw, 3.25rem)',
                    fontFamily: 'var(--font-inter)',
                    fontWeight: 900,
                    lineHeight: 1.1,
                    marginBottom: '1rem',
                    color: '#fff'
                }}>
                    Why WeMagnifAI?
                </h2>
                <p style={{ color: '#94a3b8', fontSize: isColumn ? '0.95rem' : '1.05rem', maxWidth: isColumn ? '100%' : '500px', margin: isColumn ? '0' : '0 auto' }}>
                    The core architectural pillars that build market authority and compound digital growth.
                </p>
            </div>

            {/* 3x2 Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: isColumn ? 'repeat(auto-fit, minmax(220px, 1fr))' : 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '1.25rem'
            }}>
                {cards.map((card) => (
                    <div
                        key={card.title}
                        className="liquid-glass"
                        style={{
                            padding: isColumn ? '1.25rem' : '2rem',
                            borderRadius: '16px',
                            background: 'rgba(3, 3, 8, 0.8)',
                            border: '1px solid rgba(59, 130, 246, 0.2)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.8rem',
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
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
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
                                fontSize: '1.05rem',
                                fontWeight: 700,
                                marginBottom: '0.4rem'
                            }}>
                                {card.title}
                            </h3>
                            <p style={{
                                color: '#cbd5e1',
                                fontSize: '0.82rem',
                                lineHeight: 1.5
                            }}>
                                {card.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (isColumn) {
        return (
            <div className="bg-indigo-glass" style={{
                borderRadius: '20px',
                padding: '2.5rem',
                position: 'relative',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.6), inset 0 0 20px rgba(59, 130, 246, 0.1)'
            }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #3b82f6, transparent)' }} />
                {content}
            </div>
        );
    }

    return (
        <section id="why-us" style={{
            padding: '80px 2rem',
            background: 'radial-gradient(circle at center, #060613 0%, #030308 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            {content}
        </section>
    );
}
