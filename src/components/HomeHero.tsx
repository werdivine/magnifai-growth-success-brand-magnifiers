'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import TerminalDemo from './TerminalDemo';
import styles from './HomeHero.module.css';
import { cn } from '@/lib/utils';


interface HomeHeroProps {
    badgeText?: string;
    title?: string;
    description?: string;
    primaryCtaText?: string;
    primaryCtaLink?: string;
    secondaryCtaText?: string;
    secondaryCtaLink?: string;
}

export default function HomeHero({
    badgeText = "v2.0.0 Now Live",
    title = "The Growth Engine For Scaling Agencies",
    description = "Stop relying on luck. We build automated AI pipelines that specifically target, nurture, and close your ideal clients. No fluff. Just code & revenue.",
    primaryCtaText = "Start Growth Engine",
    primaryCtaLink = "/book",
    secondaryCtaText = "View System Architecture",
    secondaryCtaLink = "/case-studies"
}: HomeHeroProps) {
    return (
        <section className={styles.heroSection}>
            <div className={styles.heroContent}>
                <div className={styles.badge}>
                    <Zap size={14} />
                    <span>{badgeText}</span>
                </div>

                <h1 className={styles.heroTitle} dangerouslySetInnerHTML={{ __html: title.replace(/\n/g, '<br/>') }} />

                <p className={styles.heroDescription}>
                    {description}
                </p>

                <div className={styles.ctaGroup}>
                    <Link href={primaryCtaLink} className={cn(styles.primaryCta, "shimmer-btn")}>
                        {primaryCtaText}
                    </Link>
                    <Link href={secondaryCtaLink} className={styles.secondaryCta}>
                        {secondaryCtaText}
                    </Link>
                </div>

                {/* --- PREMIUM FLOATING TOOLS BAND --- */}
                <div 
                    className="liquid-glass"
                    style={{
                        position: 'relative',
                        width: '100%',
                        maxWidth: '1200px',
                        margin: '4rem auto 0',
                        padding: '2.5rem 2rem',
                        borderRadius: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '1.5rem',
                        overflow: 'hidden'
                    }}
                >
                    {/* Background glow orb for the tools band */}
                    <div className="orb orb-purple" style={{ top: '-100px', left: '20%', opacity: 0.1 }} />
                    <div className="orb orb-blue" style={{ bottom: '-100px', right: '20%', opacity: 0.1 }} />
                    
                    <span style={{color: 'var(--text-secondary)', zIndex: 1, fontWeight: 800, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.2em'}}>
                        Essential Growth Automations
                    </span>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap', zIndex: 1, width: '100%' }}>
                        
                        <Link href="/leads/telegram" style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '1rem 2rem', borderRadius: '16px',
                            background: 'linear-gradient(135deg, #22d3ee 0%, #3b82f6 100%)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: '#fff', fontWeight: 800, fontSize: '1.1rem', textDecoration: 'none', position: 'relative', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', boxShadow: '0 10px 30px rgba(34,211,238,0.4)', flex: '1 1 250px', justifyContent: 'center'
                        }}>
                            <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#fff', display: 'inline-block', boxShadow: '0 0 15px #fff', animation: 'pulse 2s infinite' }} />
                            Telegram Engine (Live)
                        </Link>

                        <Link href="/leads/hubspot" className="liquid-glass" style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '1rem 2rem', borderRadius: '16px',
                            color: 'var(--text-primary)', fontWeight: 700, fontSize: '1.1rem', textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', flex: '1 1 250px', justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>🟠</span> HubSpot Integrator
                        </Link>

                        <Link href="/leads/make" className="liquid-glass" style={{
                            display: 'flex', alignItems: 'center', gap: '0.75rem',
                            padding: '1rem 2rem', borderRadius: '16px',
                            color: 'var(--text-primary)', fontWeight: 700, textDecoration: 'none', transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', flex: '1 1 250px', justifyContent: 'center'
                        }}>
                            <span style={{ fontSize: '1.2rem' }}>⚡</span> Make.com Automation
                        </Link>
                    </div>
                
                    <div style={{ width: '100%', marginTop: '1rem', position: 'relative', zIndex: 1 }}>
                        <TerminalDemo />
                    </div>
                </div>
            </div>
        </section>
    );
}
