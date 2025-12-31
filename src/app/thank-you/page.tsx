import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import styles from './page.module.css';

export default function ThankYouPage() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <div className={styles.card}>
                    <CheckCircle className={styles.icon} size={64} />
                    <h1 className={styles.title}>You&apos;re In!</h1>
                    <p className={styles.description}>
                        Thanks for joining the WeMagnifAI Growth Circle.
                        Your first audit resources are on their way to your inbox.
                    </p>
                    <div className={styles.actions}>
                        <Link href="/" className={styles.button}>
                            <ArrowLeft size={20} /> Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
