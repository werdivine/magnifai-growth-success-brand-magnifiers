'use client';

import Section from './Section';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './MagazineGrid.module.css';
import { BLOG_POSTS } from '@/data/blogPosts';

export default function MagazineGrid() {
    // Show top 6 most recent posts
    const recentPosts = BLOG_POSTS.slice(0, 6);

    return (
        <Section theme="light" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>Insights &amp; Resources</span>
                    <h2 className={styles.title}>Learn. Grow. <br /> Dominate.</h2>
                </div>
                <Link href="/blog" className={styles.viewAllLink}>
                    View All Articles
                </Link>
            </div>

            <div className={styles.grid}>
                {recentPosts.map((article) => (
                    <Link key={article.id} href={`/blog/${article.slug}`} className={styles.articleCard}>
                        <div className={styles.imageContainer}>
                            {article.image.startsWith('/') ? (
                                <Image
                                    src={article.image}
                                    alt={article.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                            ) : (
                                <div className={styles.imageFill} style={{ background: article.image }}></div>
                            )}
                            <div className={styles.categoryTag}>
                                {article.category}
                            </div>
                        </div>
                        <h3 className={styles.articleTitle}>
                            {article.title}
                        </h3>
                        <div className={styles.metaRow}>
                            <span>{article.date}</span>
                            <ArrowUpRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    )
}
