'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import Section from '@/components/Section';
import styles from '@/components/ProblemSection.module.css';
import { XCircle } from 'lucide-react';

export type ProblemSectionProps = SliceComponentProps<Content.ProblemSectionSlice>;

const ProblemSectionSlice = ({ slice }: ProblemSectionProps) => {
    return (
        <Section theme="light" className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.grid}>
                <div className={styles.left}>
                    <h2 className={styles.heading}>
                        {slice.primary.heading_start} <span className={styles.strikethrough}>{slice.primary.heading_strikethrough}</span>.
                    </h2>
                    <p className={styles.lead}>{slice.primary.lead}</p>
                </div>

                <div className={styles.right}>
                    {slice.items.map((item, i) => (
                        <div key={i} className={styles.card}>
                            <XCircle size={32} color="#ef4444" />
                            <h3>{item.title}</h3>
                            <p>{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default ProblemSectionSlice;
