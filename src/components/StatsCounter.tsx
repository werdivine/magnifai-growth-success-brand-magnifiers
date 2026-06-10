'use client';

import { useEffect, useRef } from 'react';
import styles from './StatsCounter.module.css';
import { useInView, animate } from 'framer-motion';

interface StatItem {
    value: string;
    label: string;
}

interface StatsCounterProps {
    items?: StatItem[];
}

export default function StatsCounter({ items }: StatsCounterProps) {
    const defaultItems = [
        { value: "4x", label: "Faster Execution" },
        { value: "98%", label: "Open Rates" },
        { value: "24/7", label: "AI Operation" },
        { value: "< 7 Days", label: "To Launch" }
    ];

    const displayItems = items || defaultItems;
    const counterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    useEffect(() => {
        if (!isInView) return;
        
        displayItems.forEach((item, index) => {
            const el = counterRefs.current[index];
            if (!el) return;
            
            const targetStr = item.value;
            const targetNum = parseInt(targetStr.replace(/[^0-9]/g, '')) || 0;
            const hasPlus = targetStr.includes('+');
            const hasPercent = targetStr.includes('%');
            const hasK = targetStr.toLowerCase().includes('k') || targetStr.toLowerCase().includes('m') || targetStr.toLowerCase().includes('x');
            const prefix = targetStr.startsWith('$') ? '$' : targetStr.startsWith('<') ? '< ' : '';
            
            // Reconstruct the non-numeric part
            let suffix = '';
            if (hasPercent) suffix = '%';
            else if (hasK) suffix = targetStr.replace(/[^a-zA-Z]/g, '');
            else if (hasPlus) suffix = '+';

            animate(0, targetNum, {
                duration: 2,
                ease: 'easeOut',
                onUpdate: (latest) => {
                    if (el) {
                        el.textContent = `${prefix}${Math.floor(latest)}${suffix}`;
                    }
                }
            });
        });
    }, [isInView, displayItems]);

    return (
        <div ref={ref} className={styles.metricsStrip}>
            {displayItems.map((item, index) => (
                <div key={index} className={styles.metricItem}>
                    <span 
                        ref={el => { counterRefs.current[index] = el; }} 
                        className={styles.metricValue}
                    >
                        0
                    </span>
                    <span className={styles.metricLabel}>{item.label}</span>
                </div>
            ))}
        </div>
    );
}
