'use client';

import { notFound } from 'next/navigation';
import { FOOTER_PAGES } from '@/data/footerPages';
import styles from './FooterPage.module.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function FooterPage({ slug }: { slug: string }) {
    const pageData = FOOTER_PAGES[slug];

    if (!pageData) {
        notFound();
    }

    return (
        <div className={styles.pageWrapper}>
            <Header />
            <main className={styles.main}>
                <div className={styles.heroSection}>
                    <div className={styles.container}>
                        <h1 className={styles.title}>{pageData.title}</h1>
                        <p className={styles.subtitle}>{pageData.subtitle}</p>
                    </div>
                </div>
                <div className={styles.contentSection}>
                    <div className={styles.container}>
                        <div
                            className={styles.prose}
                            dangerouslySetInnerHTML={{ __html: pageData.content }}
                        />
                    </div>
                </div>
                {/* Decorative Elements */}
                <div className={styles.backgroundGlow} />
            </main>
            <Footer />
        </div>
    );
}
