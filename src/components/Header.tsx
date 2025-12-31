import Link from 'next/link';
import styles from './Header.module.css';
import ThemeToggle from './ThemeToggle';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <Link href="/" className={styles.logo}>
                    <div className={styles.logoIcon}></div>
                    <span className={styles.logoText}>WeMagnifAI</span>
                </Link>

                <nav className={styles.nav}>
                    <Link href="/directory" className={styles.link}>Directory</Link>
                    <Link href="/resources" className={styles.link}>Resources</Link>
                    <Link href="/agency" className={styles.link}>Agency</Link>
                </nav>

                <div className={styles.actions}>
                    <ThemeToggle />
                    <Link href="/login" className={styles.loginBtn}>Login</Link>
                    <Link href="/submit" className={styles.submitBtn}>Submit Tool</Link>
                </div>
            </div>
        </header>
    )
}
