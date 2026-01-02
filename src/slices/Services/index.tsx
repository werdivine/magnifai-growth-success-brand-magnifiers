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
    return (
        <section className={styles.section} data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
            <div className={styles.container}>
                <div className={styles.header}>
                    {slice.primary.eyebrow && <span className={styles.eyebrow}>{slice.primary.eyebrow}</span>}
                    {slice.primary.title && <h2 className={styles.title}>{slice.primary.title}</h2>}
                    {slice.primary.subtitle && <p className={styles.subtitle}>{slice.primary.subtitle}</p>}
                </div>

                <div className={styles.grid}>
                    {slice.items.map((item, i) => {
                        const Icon = IconMap[item.icon_name as string] || Bot;
                        return (
                            <PrismicNextLink key={i} field={item.link_url} className={styles.card}>
                                <div className={styles.iconWrapper}>
                                    <Icon size={24} />
                                </div>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardDescription}>{item.description}</p>
                                <div className={styles.cardLink}>
                                    {item.link_label} <ArrowRight size={16} />
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
