import { ReactNode } from 'react';
import styles from './BentoGrid.module.css';
import { cn } from '@/lib/utils';

interface BentoItemProps {
    title: string;
    description: string;
    className?: string; // For span2 etc from module
    icon?: ReactNode;
    span?: 1 | 2;
}

export function BentoGrid({ children }: { children: ReactNode }) {
    return <div className={styles.grid}>{children}</div>;
}

export function BentoItem({ title, description, className, icon, span = 1 }: BentoItemProps) {
    // Map span prop to style class if needed, or just allow className injection
    const spanClass = span === 2 ? styles.span2 : '';

    return (
        <div className={cn(styles.card, spanClass, className)}>
            {icon && <div className={styles.iconWrapper}>{icon}</div>}
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
        </div>
    );
}
