'use client';

import styles from './Testimonials.module.css';
import { motion } from 'framer-motion';

interface TestimonialsProps {
    title?: string;
    reviews?: { text: string; name: string; role: string }[];
}

export default function Testimonials({ title, reviews }: TestimonialsProps) {
    const defaultReviews = [
        { text: "The ROI calculator alone saved us 40 hours of implementation time. The gated content is gold.", name: "Sarah Jenkins", role: "CTO at TechFlow" },
        { text: "WeMagnifAI is the only agency I trust. Their 'Agency Grade' results are a game changer.", name: "Mike Ross", role: "Founder, ScaleAI" },
        { text: "Detailed breakdowns and actual code snippets in the paid reports. Worth every penny.", name: "Elena K.", role: "Lead Engineer" },
    ];

    const displayReviews = reviews || defaultReviews;
    const displayTitle = title || "Success Stories";

    return (
        <section className={styles.section}>
            <motion.h2 
                style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '4rem', color: 'white' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                {displayTitle}
            </motion.h2>
            <div className={styles.scroller}>
                {displayReviews.map((r, i) => (
                    <motion.div 
                        key={i} 
                        className={`${styles.card} liquid-glass`}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.2, duration: 0.6 }}
                        whileHover={{ y: -10 }}
                    >
                        <p className={styles.text}>&ldquo;{r.text}&rdquo;</p>
                        <div className={styles.author}>
                            <div className={styles.avatar}></div>
                            <div>
                                <span className={styles.name}>{r.name}</span>
                                <span className={styles.role}>{r.role}</span>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
