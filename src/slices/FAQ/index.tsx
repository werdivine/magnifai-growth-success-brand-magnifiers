'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { useState } from 'react';
import styles from '@/components/FAQ.module.css';
import { Plus, Minus } from 'lucide-react';

export type FAQProps = SliceComponentProps<Content.FaqSlice>;

const FAQSlice = ({ slice }: FAQProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                {slice.primary.title && <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '3rem', color: 'white' }}>{slice.primary.title}</h2>}
                {slice.items.map((item, i) => (
                    <div key={i} className={styles.item}>
                        <button className={styles.question} onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                            {item.question}
                            {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                        </button>
                        <div className={`${styles.answer} ${openIndex === i ? styles.open : ''}`}>
                            {item.answer}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default FAQSlice;
