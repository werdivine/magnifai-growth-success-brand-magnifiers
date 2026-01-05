'use client';

import { Content } from '@prismicio/client';
import { SliceComponentProps, PrismicRichText } from '@prismicio/react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';
import Link from 'next/link';
import styles from '@/app/homev2/homev2.module.css'; // Reusing existing styles
import TerminalDemo from '@/components/TerminalDemo';
import { PrismicNextLink } from '@prismicio/next';

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps) => {
    // Use type assertions to work around stale Prismic type definitions
    const primary = slice.primary as any;
    return (
        <section
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className={styles.heroSection}
        >
            <div className={styles.heroContent}>
                {/* Badge */}
                {primary.badge_text && (
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5 }}
                        className={styles.badge}
                    >
                        <Zap size={14} className="text-yellow-400" />
                        <span>{String(primary.badge_text || '')}</span>
                    </motion.div>
                )}

                {/* Title */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={styles.heroTitle}
                >
                    <PrismicRichText field={primary.title} />
                </motion.div>

                {/* Description */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    initial={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={styles.heroDescription}
                >
                    <PrismicRichText field={primary.description} />
                </motion.div>

                {/* CTAs */}
                <div className={styles.ctaGroup}>
                    <PrismicNextLink field={primary.primary_cta_link} className={styles.primaryCta}>
                        {String(primary.primary_cta_label || 'Start')}
                    </PrismicNextLink>

                    <PrismicNextLink field={primary.secondary_cta_link} className={styles.secondaryCta}>
                        {String(primary.secondary_cta_label || 'Learn More')}
                    </PrismicNextLink>
                </div>

                {/* Terminal (Hardcoded for now as part of Hero layout) */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <TerminalDemo />
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
