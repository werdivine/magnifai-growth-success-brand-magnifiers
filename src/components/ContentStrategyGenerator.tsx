'use client';

import { useState } from 'react';
import styles from './ContentStrategyGenerator.module.css';
import { Sparkles, Send, CheckCircle2, Copy, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContentStrategyGenerator() {
    const [step, setStep] = useState(1);
    const [niche, setNiche] = useState('');
    const [audience, setAudience] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState<null | any>(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        // Simulate AI generation
        setTimeout(() => {
            setResult({
                pillar: `Authority in ${niche}`,
                topics: [
                    { title: `The Future of ${niche} in 2026`, type: 'Deep Dive Blog' },
                    { title: `7 AI Hacks for ${audience}`, type: 'Viral Carousel' },
                    { title: `Why most ${niche} pros fail`, type: 'Controversial Opinion' }
                ],
                frequency: '3x Weekly',
                cta: `Download our ${niche} Roadmap`
            });
            setIsGenerating(false);
            setStep(3);
        }, 2000);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.iconBox}>
                    <Sparkles className={styles.icon} />
                </div>
                <h3>AI Content Strategy Generator</h3>
                <p>Generate a high-converting content plan for your brand in seconds.</p>
            </div>

            <div className={styles.card}>
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div 
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={styles.step}
                        >
                            <label>What is your niche?</label>
                            <input 
                                type="text" 
                                placeholder="e.g. SaaS, Real Estate, E-commerce" 
                                value={niche}
                                onChange={(e) => setNiche(e.target.value)}
                            />
                            <button 
                                disabled={!niche}
                                onClick={() => setStep(2)}
                                className={styles.nextBtn}
                            >
                                Next Step
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div 
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className={styles.step}
                        >
                            <label>Who is your target audience?</label>
                            <input 
                                type="text" 
                                placeholder="e.g. SMB Owners, CMOs, Developers" 
                                value={audience}
                                onChange={(e) => setAudience(e.target.value)}
                            />
                            <div className={styles.btnGroup}>
                                <button onClick={() => setStep(1)} className={styles.backBtn}>Back</button>
                                <button 
                                    disabled={!audience || isGenerating}
                                    onClick={handleGenerate}
                                    className={styles.generateBtn}
                                >
                                    {isGenerating ? <RefreshCw className={styles.spin} /> : 'Generate Strategy'}
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && result && (
                        <motion.div 
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.resultContainer}
                        >
                            <div className={styles.resultHeader}>
                                <CheckCircle2 className={styles.checkIcon} />
                                <h4>Strategy Generated</h4>
                            </div>
                            
                            <div className={styles.resultBody}>
                                <div className={styles.resultItem}>
                                    <span>Core Pillar:</span>
                                    <strong>{result.pillar}</strong>
                                </div>
                                <div className={styles.topicsList}>
                                    {result.topics.map((topic: any, i: number) => (
                                        <div key={i} className={styles.topicCard}>
                                            <div className={styles.topicType}>{topic.type}</div>
                                            <div className={styles.topicTitle}>{topic.title}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button onClick={() => setStep(1)} className={styles.resetBtn}>
                                <RefreshCw size={16} /> Generate Another
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
