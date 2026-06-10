'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import styles from '@/components/StatsCounter.module.css';

export type StatsCounterProps = SliceComponentProps<Content.StatsCounterSlice>;

const StatsCounterSlice = ({ slice }: StatsCounterProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const items = slice.items as any[];
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.grid}>
                {items.map((stat, i) => (
                    <div key={i} className={styles.stat}>
                        <div className={styles.number}>
                            <span>{String(stat.number || '')}</span>
                        </div>
                        <div className={styles.label}>{String(stat.label || '')}</div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default StatsCounterSlice;
