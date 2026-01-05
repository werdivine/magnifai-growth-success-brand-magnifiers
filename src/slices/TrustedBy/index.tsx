'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import styles from '@/components/TrustedBy.module.css';

export type TrustedByProps = SliceComponentProps<Content.TrustedBySlice>;

const TrustedBySlice = ({ slice }: TrustedByProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const items = slice.items as any[];
    const logos = items.map(item => item.company_name).filter(Boolean);
    // Duplicate for infinite scroll effect if not enough logos
    const displayLogos = logos.length > 0 ? [...logos, ...logos, ...logos] : [];

    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {primary.title && <h4 className={styles.title}>{String(primary.title || '')}</h4>}
            <div className={styles.scroller}>
                {displayLogos.map((logo, i) => (
                    <div key={i} className={styles.logo}>{String(logo || '')}</div>
                ))}
            </div>
        </section>
    );
};

export default TrustedBySlice;
