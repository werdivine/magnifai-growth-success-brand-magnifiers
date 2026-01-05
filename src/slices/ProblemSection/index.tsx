'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Section from '@/components/Section';
import styles from '@/components/ProblemSection.module.css';
import { XCircle } from 'lucide-react';

export type ProblemSectionProps = SliceComponentProps<Content.ProblemSectionSlice>;

const ProblemSectionSlice = ({ slice }: ProblemSectionProps) => {
    // Use type assertion to work around stale Prismic type definitions
    const primary = slice.primary as any;
    return (
        <Section theme="light" className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <h2 className={styles.heading}>
                        {String(primary.heading_start || '')} <span className={styles.strikethrough}>{String(primary.heading_strikethrough || '')}</span>.
                    </h2>
                    <p className={styles.lead}>{String(primary.lead || '')}</p>
                </div>

                <div className={styles.right}>
                    {(slice.items as any[]).map((item, i) => (
                        <div key={i} className={styles.card}>
                            <XCircle size={32} color="#ef4444" />
                            <h3>{String(item.title || '')}</h3>
                            <p>{String(item.description || '')}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default ProblemSectionSlice;
