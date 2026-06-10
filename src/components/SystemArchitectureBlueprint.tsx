'use client';

import { motion } from 'framer-motion';
import { Cpu, ArrowRightLeft, Database, Terminal, UserCheck } from 'lucide-react';

export default function SystemArchitectureBlueprint() {
    return (
        <section id="architecture" style={{
            padding: '80px 2rem',
            background: 'radial-gradient(circle at center, #050512 0%, #030308 100%)',
            position: 'relative',
            overflow: 'hidden',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 10 }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                    <h2 className="glow-text" style={{
                        fontSize: '2.5rem',
                        fontFamily: 'var(--font-playfair)',
                        fontWeight: 950,
                        marginBottom: '1rem',
                        color: '#fff'
                    }}>
                        System Architecture
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
                        A modular, distributed architecture engineered for automated, low-latency B2B outreach and processing.
                    </p>
                </div>

                {/* Blueprint Diagram Panel */}
                <div className="liquid-glass" style={{
                    padding: '3rem 2rem',
                    borderRadius: '24px',
                    background: 'rgba(8, 8, 22, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                    minHeight: '400px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    
                    {/* SVG Flow Lines Behind Nodes */}
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        pointerEvents: 'none'
                    }}>
                        <svg width="100%" height="100%" viewBox="0 0 800 350" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
                            {/* Lines from Left Nodes to Brain */}
                            <path d="M 180 80 H 300 Q 400 80 400 175" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" className="flowing-path" />
                            <path d="M 180 270 H 300 Q 400 270 400 175" stroke="rgba(34, 211, 238, 0.4)" strokeWidth="2" className="flowing-path" />
                            
                            {/* Lines from Brain to Right Nodes */}
                            <path d="M 400 175 Q 400 80 500 80 H 620" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" className="flowing-path" />
                            <path d="M 400 175 Q 400 270 500 270 H 620" stroke="rgba(139, 92, 246, 0.4)" strokeWidth="2" className="flowing-path" />
                        </svg>
                    </div>

                    {/* Nodes Layout */}
                    <div style={{
                        position: 'relative',
                        zIndex: 5,
                        width: '100%',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        alignItems: 'center',
                        justifyItems: 'center',
                        gap: '2rem'
                    }}>
                        
                        {/* LEFT WING: Ingest & Interfaces */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
                            {/* User Interactions */}
                            <div className="liquid-glass" style={{
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 211, 238, 0.2)',
                                background: 'rgba(8, 12, 32, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <UserCheck size={24} color="#22d3ee" />
                                <div>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>Interactions</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>User touchpoints & chat</p>
                                </div>
                            </div>
                            
                            {/* Data Scrapers */}
                            <div className="liquid-glass" style={{
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(34, 211, 238, 0.2)',
                                background: 'rgba(8, 12, 32, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <Database size={24} color="#22d3ee" />
                                <div>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>Scrapers</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Continuous leads gathering</p>
                                </div>
                            </div>
                        </div>

                        {/* CENTER: AI Orchestration Core */}
                        <div style={{ position: 'relative' }}>
                            {/* Outer pulsing ring */}
                            <div className="glow-circle" style={{
                                width: '110px',
                                height: '110px',
                                borderRadius: '50%',
                                border: '2px solid rgba(139, 92, 246, 0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(12, 13, 29, 0.8) 100%)'
                            }}>
                                <Cpu size={44} color="#a78bfa" />
                            </div>
                            {/* Inner Brain text tag */}
                            <div style={{
                                position: 'absolute',
                                bottom: '-30px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                background: 'linear-gradient(135deg, #8b5cf6, #3b82f6)',
                                padding: '4px 14px',
                                borderRadius: '9999px',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: '#fff',
                                boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)'
                            }}>
                                AI CORE
                            </div>
                        </div>

                        {/* RIGHT WING: Outbound Engines & Integrations */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem', width: '100%' }}>
                            {/* Sequence Engine */}
                            <div className="liquid-glass" style={{
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                background: 'rgba(8, 12, 32, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <Terminal size={24} color="#c4b5fd" />
                                <div>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>Sequences</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Auto scoring & DMs</p>
                                </div>
                            </div>
                            
                            {/* CRM Synchronizer */}
                            <div className="liquid-glass" style={{
                                padding: '1.25rem',
                                borderRadius: '16px',
                                border: '1px solid rgba(139, 92, 246, 0.2)',
                                background: 'rgba(8, 12, 32, 0.8)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem'
                            }}>
                                <ArrowRightLeft size={24} color="#c4b5fd" />
                                <div>
                                    <h4 style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 700 }}>CRM Sync</h4>
                                    <p style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Hubspot automatic updates</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
