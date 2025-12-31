import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <h3 className={styles.logo}>WeMagnifAI</h3>
                    <p>Magnifying Growth, Success, and AI Innovation</p>
                </div>
                <div className={styles.links}>
                    <a href="#">Privacy</a>
                    <a href="#">Terms</a>
                    <a href="#">Twitter</a>
                </div>
            </div>
            <div className={styles.copy}>&copy; 2025 WeMagnifAI. All rights reserved.</div>
        </footer>
    )
}
