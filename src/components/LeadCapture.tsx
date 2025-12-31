'use client';

import styles from './LeadCapture.module.css';

export default function LeadCapture() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Join the Growth Circle</h2>
                <p className={styles.subtext}>Get exclusive AI tools and agency secrets delivered weekly.</p>
                <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
                    <input type="email" placeholder="enter@email.com" className={styles.input} required />
                    <button type="submit" className={styles.button}>Subscribe</button>
                </form>
            </div>
        </section>
    )
}
