'use client';

import { useState } from 'react';
import { ArrowRight, Calendar, Mail, CheckCircle } from 'lucide-react';
import styles from './InlineCTA.module.css';
import clsx from 'clsx';

interface InlineCTAProps {
    variant: 'audit' | 'consultation' | 'newsletter';
}

const CTA_CONFIG = {
    audit: {
        headline: 'Get Your Free AI Readiness Audit',
        subtext: 'Discover how AI can transform your business. Our experts will analyze your operations and provide actionable recommendations.',
        buttonText: 'Claim Free Audit',
        icon: CheckCircle,
    },
    consultation: {
        headline: 'Book a 15-Min Strategy Call',
        subtext: 'Talk directly with our team. No sales pitch, just real advice on how to scale your business with automation.',
        buttonText: 'Schedule Now',
        icon: Calendar,
    },
    newsletter: {
        headline: 'Get The AI Edge Weekly',
        subtext: 'Join 5,000+ entrepreneurs getting actionable AI tips, prompts, and case studies every Friday.',
        buttonText: 'Subscribe Free',
        icon: Mail,
    },
};

export default function InlineCTA({ variant }: InlineCTAProps) {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const config = CTA_CONFIG[variant];
    const Icon = config.icon;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            // In production, this would send to your email service
            console.log('Email submitted:', email);
            setSubmitted(true);
        }
    };

    if (submitted) {
        return (
            <div className={clsx(styles.ctaBlock, styles[variant])}>
                <CheckCircle size={48} color="#fff" style={{ marginBottom: '1rem' }} />
                <h3 className={styles.headline}>You&apos;re In!</h3>
                <p className={styles.subtext}>Check your inbox for next steps.</p>
            </div>
        );
    }

    if (variant === 'newsletter') {
        return (
            <div className={clsx(styles.ctaBlock, styles[variant])}>
                <h3 className={styles.headline}>{config.headline}</h3>
                <p className={styles.subtext}>{config.subtext}</p>
                <form onSubmit={handleSubmit} className={styles.emailForm}>
                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.emailInput}
                        required
                    />
                    <button type="submit" className={styles.ctaButton}>
                        <Icon size={20} /> {config.buttonText}
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className={clsx(styles.ctaBlock, styles[variant])}>
            <h3 className={styles.headline}>{config.headline}</h3>
            <p className={styles.subtext}>{config.subtext}</p>
            <button className={styles.ctaButton} onClick={() => setSubmitted(true)}>
                <Icon size={20} /> {config.buttonText} <ArrowRight size={20} />
            </button>
        </div>
    );
}
