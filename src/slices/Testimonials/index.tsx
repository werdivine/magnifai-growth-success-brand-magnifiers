'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import styles from '@/components/Testimonials.module.css';

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const TestimonialsSlice = ({ slice }: TestimonialsProps) => {
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {slice.primary.title && <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: 'white' }}>{slice.primary.title}</h2>}
            <div className={styles.scroller}>
                {slice.items.map((item, i) => (
                    <div key={i} className={styles.card}>
                        <p className={styles.text}>&ldquo;{item.quote}&rdquo;</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}></div>
                            <div>
                                <span className={styles.name}>{item.name}</span>
                                <span className={styles.role}>{item.role}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSlice;
