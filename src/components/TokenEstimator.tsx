'use client';

import { useState } from 'react';
import styles from './TokenEstimator.module.css';
import GatedAccess from './GatedAccess';
import { ArrowRight, Cpu } from 'lucide-react';

export default function TokenEstimator() {
    const [tokens, setTokens] = useState(1000000); // 1M tokens default
    const [isGatedOpen, setIsGatedOpen] = useState(false);

    // Simplified pricing logic (per 1M input tokens)
    const prices = {
        gpt4: 30,
        claude35: 3,
        llama3: 0.5
    };

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ padding: 10, background: 'rgba(99, 102, 241, 0.1)', borderRadius: 10, color: '#6366f1' }}>
                    <Cpu size={24} />
                </div>
                <div>
                    <h3 className={styles.title}>LLM Token Estimator</h3>
                    <p className={styles.description}>Compare API costs for {tokens.toLocaleString()} tokens.</p>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <div className={styles.label}>
                    <span>Volume</span>
                    <span>{(tokens / 1000000).toFixed(1)}M Tokens</span>
                </div>
                <input
                    type="range"
                    min="100000"
                    max="10000000"
                    step="100000"
                    value={tokens}
                    onChange={(e) => setTokens(Number(e.target.value))}
                    className={styles.range}
                />
            </div>

            <div className={styles.comparison}>
                <div className={styles.row}>
                    <span className={styles.modelName}>GPT-4o</span>
                    <span className={styles.cost}>${((tokens / 1000000) * prices.gpt4).toFixed(2)}</span>
                </div>
                <div className={styles.row}>
                    <span className={styles.modelName}>Claude 3.5 Sonnet</span>
                    <span className={styles.cost}>${((tokens / 1000000) * prices.claude35).toFixed(2)}</span>
                </div>
                <div className={styles.row + ' ' + styles.highlight}>
                    <span className={styles.modelName}>Llama 3 (Self-Hosted)</span>
                    <span className={styles.cost}>${((tokens / 1000000) * prices.llama3).toFixed(2)}</span>
                </div>
            </div>

            <button className={styles.fullReportBtn} onClick={() => setIsGatedOpen(true)}>
                Analyze 15+ Models <ArrowRight size={16} style={{ display: 'inline', marginLeft: 8 }} />
            </button>

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={() => setIsGatedOpen(false)}
                resourceName="Cost Analysis Report"
            />
        </div>
    );
}
