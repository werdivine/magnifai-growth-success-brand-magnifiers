'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './LeadCapture.module.css';

export default function LeadCapture() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/thank-you');
    };

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Join the Growth Circle</h2>
                <p className={styles.subtext}>Get exclusive AI tools and agency secrets delivered weekly.</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="enter@email.com"
                        className={styles.input}
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Joining...' : 'Subscribe'}
                    </button>
                </form>
            </div>
        </section>
    );
}
