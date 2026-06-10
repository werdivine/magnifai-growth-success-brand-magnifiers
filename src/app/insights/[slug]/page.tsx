import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogPost, getBlogPosts, convertMarkdownToHtml } from '@/lib/blog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './BlogPost.module.css';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export const dynamic = 'force-dynamic';

export default async function InsightsPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const htmlContent = convertMarkdownToHtml(post.content);

    return (
        <div className={styles.pageWrapper}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Article",
                        "headline": post.title,
                        "image": [ `https://wemagnifai.com${post.image}` ],
                        "datePublished": post.date,
                        "dateModified": post.date,
                        "author": [{
                            "@type": "Person",
                            "name": post.author,
                            "url": "https://wemagnifai.com/about"
                        }],
                        "publisher": {
                            "@id": "https://wemagnifai.com/#organization"
                        },
                        "description": post.excerpt
                    })
                }}
            />
            <Header />
            <main className={styles.main}>
                <div className={styles.heroImageWrapper}>
                    <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className={styles.heroImage}
                        priority
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <div className={styles.container}>
                            <Link href="/insights" className={styles.backLink}>
                                <ArrowLeft size={16} /> Back to Insights
                            </Link>
                            <div className={styles.categoryTag}>
                                <Tag size={12} /> {post.category}
                            </div>
                            <h1 className={styles.title}>{post.title}</h1>
                            <div className={styles.meta}>
                                <div className={styles.metaItem}>
                                    <User size={16} /> {post.author}
                                </div>
                                <div className={styles.metaItem}>
                                    <Calendar size={16} /> {post.date}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.contentContainer}>
                    <div className={styles.excerpt}>
                        {post.excerpt}
                    </div>
                    <div
                        className={styles.prose}
                        dangerouslySetInnerHTML={{ __html: htmlContent }}
                    />

                    <div className={styles.divider} />

                    <div className={styles.cta}>
                        <h3>Want to implement this?</h3>
                        <p>We build these systems for clients every day.</p>
                        <Link href="/contact" className={styles.ctaButton}>
                            Book a Strategy Call
                        </Link>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
