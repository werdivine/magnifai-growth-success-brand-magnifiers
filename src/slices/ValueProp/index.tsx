'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import styles from '@/components/ValueProp.module.css';
import { Target, TrendingUp, Users, Zap, Shield, BookOpen } from 'lucide-react';

export type ValuePropProps = SliceComponentProps<Content.ValuePropSlice>;

const IconMap: Record<string, any> = { Target, TrendingUp, Users, Zap, Shield, BookOpen };

const ValuePropSlice = ({ slice }: ValuePropProps) => {
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            {slice.primary.title && <h2 className={styles.heading}>{slice.primary.title}</h2>}
            <div className={styles.grid}>
                {slice.items.map((item, i) => {
                    const Icon = IconMap[item.icon_name as string] || Target;
                    return (
                        <div key={i} className={styles.card}>
                            <Icon className={styles.icon} size={32} />
                            <h3 className={styles.cardTitle}>{item.title}</h3>
                            <p className={styles.cardDesc}>{item.description}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ValuePropSlice;
