'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface FloatingCommandBarProps {
    variant?: 'solutions' | 'pipelines';
}

interface TabItem {
    label: string;
    href: string;
    highlight?: boolean;
    primary?: boolean;
}

export default function FloatingCommandBar({ variant = 'solutions' }: FloatingCommandBarProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    const solutionsTabs: TabItem[] = [
        { label: 'SOLUTIONS', href: '#solutions' },
        { label: 'PLATFORM', href: '#platform' },
        { label: 'SERVICES', href: '/services' },
        { label: 'ABOUT US', href: '/agency' },
        { label: 'RESOURCES', href: '/resources' },
        { label: 'GET STARTED', href: '#booking', highlight: true }
    ];

    const pipelinesTabs: TabItem[] = [
        { label: 'Explore Pipelines', href: '#solutions' },
        { label: 'LAUNCH AI WORKSPACE', href: '/leads/telegram', primary: true },
        { label: 'View Documentation', href: '/resources' }
    ];

    const tabs = variant === 'solutions' ? solutionsTabs : pipelinesTabs;

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            margin: '2rem 0',
            position: 'relative',
            zIndex: 30
        }}>
            <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                background: 'rgba(12, 13, 29, 0.4)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '9999px',
                padding: '6px',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 30px rgba(34, 211, 238, 0.05)',
                gap: '4px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Neon bottom glow line */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: '10%',
                    right: '10%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.4), rgba(139, 92, 246, 0.4), transparent)',
                    filter: 'blur(1px)'
                }} />

                {tabs.map((tab, idx) => {
                    const isSelected = activeIndex === idx;
                    
                    // Specific highlight color for SOLUTIONS variant (cyan active pill)
                    const isSolutionsMain = variant === 'solutions' && idx === 0;

                    return (
                        <Link
                            key={tab.label}
                            href={tab.href}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                padding: '10px 20px',
                                borderRadius: '9999px',
                                fontSize: '0.85rem',
                                fontWeight: 700,
                                textDecoration: 'none',
                                letterSpacing: '0.05em',
                                position: 'relative',
                                transition: 'color 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), transform 0.2s',
                                color: tab.primary
                                    ? '#fff'
                                    : (isSelected 
                                        ? (isSolutionsMain ? '#030308' : '#fff') 
                                        : 'rgba(255, 255, 255, 0.6)'),
                                background: tab.primary 
                                    ? 'linear-gradient(135deg, #22d3ee 0%, #8b5cf6 100%)' 
                                    : 'transparent',
                                border: tab.primary ? '1px solid rgba(255,255,255,0.2)' : 'none',
                                cursor: 'pointer',
                                zIndex: 2
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-1px)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                            }}
                        >
                            {/* Capsule Background Sliding Transition (Framer Motion) */}
                            {isSelected && !tab.primary && (
                                <motion.div
                                    layoutId={`floating-pill-${variant}`}
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        borderRadius: '9999px',
                                        background: isSolutionsMain 
                                            ? 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)' 
                                            : 'rgba(255, 255, 255, 0.08)',
                                        border: isSolutionsMain ? 'none' : '1px solid rgba(255, 255, 255, 0.06)',
                                        boxShadow: isSolutionsMain ? '0 4px 15px rgba(34, 211, 238, 0.3)' : 'none',
                                        zIndex: -1
                                    }}
                                />
                            )}
                            {tab.label}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
