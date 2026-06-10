'use client';

import clsx from 'clsx';
import styles from './Section.module.css';

interface SectionProps {
    variant?: 'midnight' | 'void' | 'glass' | 'mesh' | 'neon' | 'transparent';
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ variant = 'midnight', children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={clsx(styles.section, className)}
            data-variant={variant}
        >
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}
