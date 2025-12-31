'use client';

import { useState } from 'react';
import styles from './ROICalculator.module.css';
import GatedAccess from './GatedAccess';
import { DollarSign, Clock, ArrowRight } from 'lucide-react';

export default function ROICalculator() {
    const [hours, setHours] = useState(10);
    const [rate, setRate] = useState(50);
    const [isGatedOpen, setIsGatedOpen] = useState(false);

    // Simple logic: Assume AI saves 40% of time
    const weeklySavings = hours * rate * 0.4;
    const yearlySavings = weeklySavings * 52;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3 className={styles.title}>AI Savings Estimator</h3>
                <p className={styles.description}>See how much you could save by automating manual workflows.</p>
            </div>

            <div className={styles.grid}>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Weekly Manual Hours</label>
                    <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(Number(e.target.value))}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.label}>Hourly Cost ($)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(Number(e.target.value))}
                        className={styles.input}
                    />
                </div>
            </div>

            <div className={styles.resultBox}>
                <div className={styles.resultLabel}>Potential Yearly Savings</div>
                <div className={styles.resultValue}>
                    ${yearlySavings.toLocaleString()}
                </div>
            </div>

            <button className={styles.fullReportBtn} onClick={() => setIsGatedOpen(true)}>
                Get Detailed ROI Report <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8 }} />
            </button>

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={(email) => {
                    setIsGatedOpen(false);
                    // Redirect logic would go here
                    alert(`Success! Full report sent to ${email}`);
                }}
                resourceName="ROI Analysis"
            />
        </div>
    );
}
