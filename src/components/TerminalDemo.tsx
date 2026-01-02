'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './TerminalDemo.module.css';

const TerminalDemo = () => {
    const [lines, setLines] = useState<any[]>([]);

    const script = React.useMemo(() => [
        { type: 'command', text: '> initializing growth_engine --mode=aggressive', delay: 500 },
        { type: 'info', text: 'ℹ analyzing competitive landscape...', delay: 1000 },
        { type: 'success', text: '✔ identified 14 high-value opportunities', delay: 1500 },
        { type: 'info', text: 'ℹ deploying ai_agents...', delay: 2000 },
        { type: 'process', text: '→ generating_content: "Why AI Matters"...', delay: 2500 },
        { type: 'process', text: '→ optimizing_seo: ranks #3 for "best digital agency"...', delay: 3200 },
        { type: 'success', text: '✔ leads_generated: 12 in last 24h', delay: 4000 },
        { type: 'command', text: '> await client_booking()', delay: 4500 },
    ], []);

    const startedRef = useRef(false);

    useEffect(() => {
        if (startedRef.current) return;
        startedRef.current = true;

        let currentIndex = 0;

        const runScript = async () => {
            if (currentIndex >= script.length) return;

            const step = script[currentIndex];
            await new Promise(r => setTimeout(r, step.delay));

            setLines(prev => [...prev, step]);
            currentIndex++;
            runScript();
        };

        runScript();
    }, [script]);

    return (
        <div className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={styles.terminalTitle}>ai-growth-engine — bash — 80x24</div>
            </div>
            <div className={styles.terminalBody}>
                {lines.map((line, i) => (
                    <div key={i} className={styles.line}>
                        <span className={styles.lineNumber}>{(i + 1).toString().padStart(2, '0')}</span>
                        <span className={
                            line.type === 'success' ? styles.success :
                                line.type === 'info' ? styles.info :
                                    line.type === 'command' ? styles.command :
                                        styles.warning
                        }>
                            {line.text}
                        </span>
                    </div>
                ))}
                <div className={styles.line}>
                    <span className={styles.lineNumber}>{(lines.length + 1).toString().padStart(2, '0')}</span>
                    <span className={styles.cursor}></span>
                </div>
            </div>
        </div>
    );
};

export default TerminalDemo;
