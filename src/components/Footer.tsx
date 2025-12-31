import styles from './Footer.module.css';
import { Twitter, Linkedin, Github, Mail } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.topSection}>
                    <div className={styles.brand}>
                        <h3 className={styles.logo}>WeMagnifAI</h3>
                        <p className={styles.tagline}>Magnifying Growth, Success, and AI Innovation</p>
                        <div className={styles.social}>
                            <a href="#" aria-label="Twitter"><Twitter size={20} /></a>
                            <a href="#" aria-label="LinkedIn"><Linkedin size={20} /></a>
                            <a href="#" aria-label="GitHub"><Github size={20} /></a>
                            <a href="#" aria-label="Email"><Mail size={20} /></a>
                        </div>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linkColumn}>
                            <h4>Product</h4>
                            <Link href="/directory">AI Directory</Link>
                            <Link href="/resources">Resources</Link>
                            <Link href="/tools">Tools</Link>
                            <Link href="/prompts">Prompts</Link>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Services</h4>
                            <Link href="/agency">Agency</Link>
                            <Link href="/consulting">Consulting</Link>
                            <Link href="/automation">Automation</Link>
                            <Link href="/design">Creative</Link>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Company</h4>
                            <Link href="/about">About</Link>
                            <Link href="/blog">Blog</Link>
                            <Link href="/careers">Careers</Link>
                            <Link href="/contact">Contact</Link>
                        </div>

                        <div className={styles.linkColumn}>
                            <h4>Legal</h4>
                            <Link href="/privacy">Privacy</Link>
                            <Link href="/terms">Terms</Link>
                            <Link href="/cookies">Cookies</Link>
                            <Link href="/security">Security</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.divider}></div>

                <div className={styles.bottomSection}>
                    <p className={styles.copyright}>&copy; 2025 WeMagnifAI. All rights reserved.</p>
                    <p className={styles.built}>Built with ❤️ and AI in San Francisco</p>
                </div>
            </div>
        </footer>
    )
}
