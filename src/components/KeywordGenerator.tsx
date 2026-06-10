'use client';

import { useState } from 'react';
import styles from './KeywordGenerator.module.css';
import GatedAccess from './GatedAccess';
import { Search, Lock } from 'lucide-react';

export default function KeywordGenerator() {
    const [topic, setTopic] = useState('');
    const [showResults, setShowResults] = useState(false);
    const [isGatedOpen, setIsGatedOpen] = useState(false);

    const handleSearch = () => {
        if (topic) setShowResults(true);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>AI Keyword Generator</h3>
            <p className={styles.description}>Find easy-to-rank keywords for your niche.</p>

            <div className={styles.searchBox}>
                <input
                    type="text"
                    placeholder="Enter topic (e.g. 'AI Marketing')"
                    className={styles.input}
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                />
                <button className={styles.searchBtn} onClick={handleSearch}>
                    <Search size={20} />
                </button>
            </div>

            {showResults && (
                <div className={styles.results}>
                    <div className={styles.keyword}>
                        <span>best ai tools for {topic || 'marketing'}</span>
                        <span className={styles.kd}>KD 12</span>
                    </div>
                    <div className={styles.keyword}>
                        <span>{topic || 'ai'} agency pricing</span>
                        <span className={styles.kd}>KD 24</span>
                    </div>
                    {/* Locked items */}
                    <div className={styles.keyword + ' ' + styles.blur}>
                        <span>XXXXXXXXXXXXXXXXXXXX</span>
                        <span>KD ??</span>
                    </div>
                    <div className={styles.keyword + ' ' + styles.blur}>
                        <span>XXXXXXXXXXXXXXXXXXXX</span>
                        <span>KD ??</span>
                    </div>
                </div>
            )}

            {showResults && (
                <button className={styles.unlockBtn} onClick={() => setIsGatedOpen(true)}>
                    <Lock size={16} style={{ display: 'inline', marginRight: 8, verticalAlign: 'middle' }} />
                    Unlock 50+ Keywords
                </button>
            )}

            <GatedAccess
                isOpen={isGatedOpen}
                onClose={() => setIsGatedOpen(false)}
                onUnlock={() => setIsGatedOpen(false)}
                resourceName="Keyword Report"
            />
        </div>
    );
}
