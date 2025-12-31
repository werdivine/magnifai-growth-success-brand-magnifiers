'use client';

import Section from './Section';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import styles from './MagazineGrid.module.css';

const ARTICLES = [
    { id: 1, title: 'How AI is Revolutionizing Small Business Marketing', category: 'AI Strategy', readTime: '5 min', image: '/images/blog-ai-marketing-smb.jpg' },
    { id: 2, title: 'The Complete Guide to Social Media Automation', category: 'Automation', readTime: '8 min', image: '/images/blog-social-automation.jpg' },
    { id: 3, title: 'Building a Brand That Stands Out in 2025', category: 'Branding', readTime: '6 min', image: '/images/blog-branding.jpg' },
    { id: 4, title: '10 AI Tools Every Entrepreneur Should Know', category: 'Tools', readTime: '7 min', image: '/images/blog-ai-tools.jpg' },
    { id: 5, title: 'From Zero to Hero: A Startup Marketing Playbook', category: 'Case Study', readTime: '12 min', image: '/images/blog-startup-playbook.jpg' },
    { id: 6, title: 'Why Your Website Isn\'t Converting (And How to Fix It)', category: 'Conversion', readTime: '9 min', image: 'linear-gradient(135deg, #14b8a6 0%, #2dd4bf 100%)' }
];

export default function MagazineGrid() {
    return (
        <Section theme="light" className={styles.section}>
            <div className={styles.header}>
                <div>
                    <span className={styles.label}>Insights &amp; Resources</span>
                    <h2 className={styles.title}>Learn. Grow. <br /> Dominate.</h2>
                </div>
                <Link href="/insights" className={styles.viewAllLink}>
                    View All Articles
                </Link>
            </div>

            <div className={styles.grid}>
                {ARTICLES.map((article) => (
                    <Link key={article.id} href="/insights" className={styles.articleCard}>
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
                            <span>{article.readTime} read</span>
                            <ArrowUpRight size={16} />
                        </div>
                    </Link>
                ))}
            </div>
        </Section>
    )
}
