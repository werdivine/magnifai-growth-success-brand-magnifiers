'use client';

import { useState } from 'react';
import { X, Lock } from 'lucide-react';
import styles from './GatedAccess.module.css';

interface GatedAccessProps {
    isOpen: boolean;
    onClose: () => void;
    onUnlock: (email: string) => void;
    title?: string;
    resourceName?: string;
}

export default function GatedAccess({
    isOpen,
    onClose,
    onUnlock,
    title = "Unlock Full Report",
    resourceName = "this advanced tool"
}: GatedAccessProps) {
    const [email, setEmail] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            onUnlock(email);
            // Simulate local storage persistence
            localStorage.setItem('wemagnifai_lead_email', email);
        }
    };

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>
                <button className={styles.closeBtn} onClick={onClose}>
                    <X size={24} />
                </button>

                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem', color: '#6366f1' }}>
                    <Lock size={48} />
                </div>

                <h2 className={styles.title}>{title}</h2>
                <p className={styles.subtitle}>
                    Enter your email to access the comprehensive version of {resourceName}.
                </p>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="name@company.com"
                        className={styles.input}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className={styles.submitBtn}>
                        Unlock Access
                    </button>
                </form>

                <p className={styles.guarantee}>
                    We respect your inbox. No spam, ever.
                </p>
            </div>
        </div>
    );
}
