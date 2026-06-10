'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { BentoGrid as Grid, BentoItem } from '@/components/BentoGrid';
import { Bot, Zap, Globe, Database, Cpu, Layers } from 'lucide-react';
import styles from '@/app/homev2/homev2.module.css';

export type BentoGridProps = SliceComponentProps<Content.BentoGridSlice>;

const IconMap: Record<string, any> = {
    Bot, Zap, Globe, Database, Cpu, Layers
};

const BentoGridSlice = ({ slice }: BentoGridProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const items = slice.items as any[];
    return (
        <section className={styles.sectionDark} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                {primary.title && <h2 className={styles.sectionTitle}>{String(primary.title || '')}</h2>}
                {primary.subtitle && <p className={styles.sectionSubtitle}>{String(primary.subtitle || '')}</p>}

                <Grid>
                    {items.map((item, i) => {
                        const Icon = IconMap[item.icon_name as string] || Bot;
                        return (
                            <BentoItem
                                key={i}
                                title={String(item.item_title || '')}
                                description={String(item.item_description || '')}
                                icon={<Icon size={32} />}
                                span={(item.span as 1 | 2) || 1}
                            />
                        );
                    })}
                </Grid>
            </div>
        </section>
    );
};

export default BentoGridSlice;
