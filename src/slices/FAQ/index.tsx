'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { useState } from 'react';
import styles from '@/components/FAQ.module.css';
import { Plus, Minus } from 'lucide-react';

export type FAQProps = SliceComponentProps<Content.FAQSlice>;

const FAQSlice = ({ slice }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const items = slice.items as any[];

    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                {primary.title && <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'white' }}>{primary.title}</h2>}
                {items.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <button className={styles.question} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                            <span>{String(item.question || '')}</span>
                            {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                        </button>
                        <div className={`${styles.answer} ${openIndex === i ? styles.open : ''}`}>
                            <span>{String(item.answer || '')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSlice;
