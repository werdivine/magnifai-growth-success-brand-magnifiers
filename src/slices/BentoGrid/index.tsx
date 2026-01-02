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
    return (
        <section className={styles.sectionDark} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                {slice.primary.title && <h2 className={styles.sectionTitle}>{slice.primary.title}</h2>}
                {slice.primary.subtitle && <p className={styles.sectionSubtitle}>{slice.primary.subtitle}</p>}

                <Grid>
                    {slice.items.map((item, i) => {
                        const Icon = IconMap[item.icon_name as string] || Bot;
                        return (
                            <BentoItem
                                key={i}
                                title={item.item_title || ''}
                                description={item.item_description || ''}
                                icon={<Icon size={32} />}
                                span={item.span || 1}
                            />
                        );
                    })}
                </Grid>
            </div>
        </section>
    );
};

export default BentoGridSlice;
