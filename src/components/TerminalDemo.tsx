'use client';

import React, { useEffect } from 'react';
import styles from './TerminalDemo.module.css';
import { useAnimate, stagger } from 'framer-motion';

const TerminalDemo = () => {
    const [scope, animate] = useAnimate();

    const script = React.useMemo(() => [
        { type: 'command', text: '> initializing growth_engine --mode=aggressive' },
        { type: 'info', text: 'ℹ analyzing competitive landscape...' },
        { type: 'success', text: '✔ identified 14 high-value opportunities' },
        { type: 'info', text: 'ℹ deploying ai_agents...' },
        { type: 'process', text: '→ generating_content: "Why AI Matters"...' },
        { type: 'process', text: '→ optimizing_seo: ranks #3 for "best digital agency"...' },
        { type: 'success', text: '✔ leads_generated: 12 in last 24h' },
        { type: 'command', text: '> await client_booking()' },
    ], []);

    useEffect(() => {
        if (!scope.current) return;

        animate(
            'div[data-terminal-line]',
            { opacity: [0, 1], y: [15, 0] },
            { 
                duration: 0.4,
                delay: stagger(0.2, { startDelay: 0.5 }),
                ease: "easeOut"
            }
        );
    }, [scope, animate]);

    return (
        <div ref={scope} className={styles.terminalWindow}>
            <div className={styles.terminalHeader}>
                <div className={styles.dots}>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                    <div className={styles.dot}></div>
                </div>
                <div className={styles.terminalTitle}>ai-growth-engine — bash — 80x24</div>
            </div>
            <div className={styles.terminalBody}>
                {script.map((line, i) => (
                    <div key={i} data-terminal-line className={styles.line} style={{ opacity: 0, transform: 'translateY(15px)' }}>
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
                <div data-terminal-line className={styles.line} style={{ opacity: 0, transform: 'translateY(15px)' }}>
                    <span className={styles.lineNumber}>{(script.length + 1).toString().padStart(2, '0')}</span>
                    <span className={styles.cursor}></span>
                </div>
            </div>
        </div>
    );
};

export default TerminalDemo;
