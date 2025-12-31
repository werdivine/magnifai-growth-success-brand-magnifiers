import styles from './ValueProp.module.css';
import { Target, TrendingUp, Users } from 'lucide-react';

export default function ValueProp() {
    return (
        <section className={styles.section}>
            <h2 className={styles.heading}>Why WeMagnifAI?</h2>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <Target className={styles.icon} size={32} />
                    <h3 className={styles.cardTitle}>Curated Precision</h3>
                    <p className={styles.cardDesc}>We don&apos;t list everything. We only list what works. Every tool is manually verified.</p>
                </div>
                <div className={styles.card}>
                    <TrendingUp className={styles.icon} size={32} />
                    <h3 className={styles.cardTitle}>ROI Focused</h3>
                    <p className={styles.cardDesc}>Our frameworks are designed to save you money and generate leads, not just look cool.</p>
                </div>
                <div className={styles.card}>
                    <Users className={styles.icon} size={32} />
                    <h3 className={styles.cardTitle}>Agency Grade</h3>
                    <p className={styles.cardDesc}>Use the same workflows we use to scale 8-figure brands.</p>
                </div>
            </div>
        </section>
    );
}
