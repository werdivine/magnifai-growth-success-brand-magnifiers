'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps } from '@prismicio/react';
import { PrismicNextLink } from '@prismicio/next';
import { Bot, Zap, Globe, Database, Cpu, Layers, ArrowRight } from 'lucide-react';
import styles from '@/components/ServicesGrid.module.css';

export type ServicesProps = SliceComponentProps<Content.ServicesSlice>;

const IconMap: Record<string, any> = {
    Bot, Zap, Globe, Database, Cpu, Layers
};

const ServicesSlice = ({ slice }: ServicesProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    const items = slice.items as any[];
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                <div className={styles.header}>
                    {primary.eyebrow && <span className={styles.eyebrow}>{String(primary.eyebrow || '')}</span>}
                    {primary.title && <h2 className={styles.title}>{String(primary.title || '')}</h2>}
                    {primary.subtitle && <p className={styles.subtitle}>{String(primary.subtitle || '')}</p>}
                </div>

                <div className={styles.grid}>
                    {items.map((item, i) => {
                        const Icon = IconMap[item.icon_name as string] || Bot;
                        return (
                            <PrismicNextLink key={i} field={item.link_url} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={24} />
                                </div>
                                <h3 className={styles.cardTitle}>{String(item.title || '')}</h3>
                                <p className={styles.cardDescription}>{String(item.description || '')}</p>
                                <div className={styles.cardLink}>
                                    {String(item.link_label || '')} <ArrowRight size={16} />
                                </div>
                            </PrismicNextLink>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ServicesSlice;
