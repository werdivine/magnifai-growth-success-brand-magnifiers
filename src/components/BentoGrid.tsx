'use client';

import React, { ReactNode, useRef } from 'react';
import styles from './BentoGrid.module.css';
import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';

interface BentoItemProps {
    title: string;
    description: string;
    className?: string;
    icon?: ReactNode;
    span?: 1 | 2;
    index?: number;
}

export function BentoGrid({ children }: { children: ReactNode }) {
    let idx = 0;
    const items = React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
            return React.cloneElement(child, { index: idx++ } as any);
        }
        return child;
    });

    return <div className={styles.grid}>{items}</div>;
}

export function BentoItem({ title, description, className, icon, span = 1, index = 0 }: BentoItemProps) {
    const spanClass = span === 2 ? styles.span2 : '';
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ 
                delay: index * 0.15, 
                duration: 0.6,
                ease: "easeOut"
            }}
            whileHover={{ 
                y: -10,
                boxShadow: '0 25px 50px -12px rgba(124, 58, 237, 0.25)',
                transition: { duration: 0.3 }
            }}
            className={cn(styles.card, spanClass, className)}
        >
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </motion.div>
    );
}
