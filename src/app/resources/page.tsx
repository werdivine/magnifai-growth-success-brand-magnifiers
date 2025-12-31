import Header from '@/components/Header';
import Footer from '@/components/Footer';
import styles from './page.module.css';

export default function Resources() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <h1 className={styles.title}>Resources & Insights</h1>
                <div className={styles.grid}>
                    <div className={styles.article}>
                        <div className={styles.imagePlaceholder}></div>
                        <h2>Top 10 AI Agents for Sales</h2>
                        <p>How to automate your outbound in 2026.</p>
                    </div>
                    <div className={styles.article}>
                        <div className={styles.imagePlaceholder}></div>
                        <h2>The Future of SEO</h2>
                        <p>Why organic search is evolving into answer engines.</p>
                    </div>
                    <div className={styles.article}>
                        <div className={styles.imagePlaceholder}></div>
                        <h2>Building a Custom LLM</h2>
                        <p>A guide for non-technical founders.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
