'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, CheckCircle, Gift } from 'lucide-react';
import styles from './LeadCaptureModal.module.css';

interface LeadCaptureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: (email: string) => void;
    title?: string;
    subtitle?: string;
    ctaText?: string;
    source: string;
    benefits?: string[];
}

export default function LeadCaptureModal({
    isOpen,
    onClose,
    onSuccess,
    title = "Unlock Your Results",
    subtitle = "Enter your email to get instant access",
    ctaText = "Get Instant Access",
    source,
    benefits = [
        "Personalized recommendations",
        "Actionable insights",
        "No spam, ever"
    ]
}: LeadCaptureModalProps) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            setLoading(false);
            return;
        }

        try {
            // Store in localStorage for now
            const leads = JSON.parse(localStorage.getItem('wemagnifai_leads') || '[]');
            leads.push({
                email,
                source,
                timestamp: new Date().toISOString()
            });
            localStorage.setItem('wemagnifai_leads', JSON.stringify(leads));
            localStorage.setItem('wemagnifai_user_email', email);

            // Simulate network delay for UX
            await new Promise(resolve => setTimeout(resolve, 800));

            setSuccess(true);
            setTimeout(() => {
                onSuccess(email);
            }, 1500);
        } catch {
            setError('Something went wrong. Please try again.');
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                    <X size={20} />
                </button>

                {!success ? (
                    <>
                        <div className={styles.iconWrapper}>
                            <Gift size={40} />
                        </div>

                        <h2 className={styles.title}>{title}</h2>
                        <p className={styles.subtitle}>{subtitle}</p>

                        <ul className={styles.benefits}>
                            {benefits.map((benefit, i) => (
                                <li key={i}>
                                    <CheckCircle size={16} />
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <form className={styles.form} onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="Enter your best email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                disabled={loading}
                            />
                            {error && <p className={styles.error}>{error}</p>}
                            <button
                                type="submit"
                                className={styles.submitBtn}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className={styles.loader}></span>
                                ) : (
                                    <>
                                        <Sparkles size={18} />
                                        {ctaText}
                                    </>
                                )}
                            </button>
                        </form>

                        <p className={styles.privacy}>
                            🔒 Your data is safe. Unsubscribe anytime.
                        </p>
                    </>
                ) : (
                    <div className={styles.successState}>
                        <div className={styles.successIcon}>
                            <CheckCircle size={48} />
                        </div>
                        <h3>You&apos;re In! 🎉</h3>
                        <p>Loading your personalized results...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
