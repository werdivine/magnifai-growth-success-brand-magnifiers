import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getBlogPosts } from '@/lib/blog';
import styles from './Blog.module.css';
import { ArrowRight } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function BlogIndex() {
    const posts = getBlogPosts();
    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.main}>
                <div className={styles.heroSection}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>The Growth Engine Log</h1>
                        <p className={styles.subtitle}>Insights, strategies, and blueprints for the AI-first economy.</p>
                    </div>
                </div>

                <div className={styles.gridContainer}>
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.id} className={styles.card}>
                            <div className={styles.cardImage}>
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className={styles.categoryTag}>{post.category}</div>
                            </div>
                            <div className={styles.cardContent}>
                                <div className={styles.meta}>
                                    <span>{post.date}</span> &bull; <span>{post.author}</span>
                                </div>
                                <h3 className={styles.cardTitle}>{post.title}</h3>
                                <p className={styles.cardExcerpt}>{post.excerpt}</p>
                                <div className={styles.readMore}>
                                    Read Article <ArrowRight size={16} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className={styles.backgroundGlow} />
            </main>
            <Footer />
        </div>
    );
}
