'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import styles from '@/components/Testimonials.module.css';

export type TestimonialsProps = SliceComponentProps<Content.TestimonialsSlice>;

const TestimonialsSlice = ({ slice }: TestimonialsProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const items = slice.items as any[];
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {primary.title && <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: 'white' }}>{String(primary.title || '')}</h2>}
            <div className={styles.scroller}>
                {items.map((item, i) => (
                    <div key={i} className={styles.card}>
                        <p className={styles.text}>&ldquo;{String(item.quote || '')}&rdquo;</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}></div>
                            <div>
                                <span className={styles.name}>{String(item.name || '')}</span>
                                <span className={styles.role}>{String(item.role || '')}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TestimonialsSlice;
