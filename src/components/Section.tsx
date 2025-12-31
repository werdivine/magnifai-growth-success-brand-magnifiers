'use client';

import clsx from 'clsx';
import styles from './Section.module.css';

interface SectionProps {
    theme?: 'dark' | 'light' | 'gradient';
    children: React.ReactNode;
    className?: string;
    id?: string;
}

export default function Section({ theme = 'dark', children, className, id }: SectionProps) {
    return (
        <section
            id={id}
            className={clsx(styles.section, className)}
            data-theme={theme}
        >
            <div className={styles.container}>
                {children}
            </div>
        </section>
    );
}
